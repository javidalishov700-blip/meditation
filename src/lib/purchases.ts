import { isNativeApp } from './device'
import { setPro } from './entitlement'
import type { LocaleId } from './locales'
import type { PlanId } from './types'

/**
 * A system alert on top of the on-screen panel — belt and suspenders. The
 * panel can be missed if it renders below the fold or the user looks away
 * mid-tap; a blocking native dialog with StoreKit's exact words cannot be.
 * Only fires on genuine failures (never cancel/pending), and only in the
 * native app — the web preview has no StoreKit to report on.
 */
export async function alertStoreError(title: string, message: string) {
  if (!isNativeApp()) return
  try {
    const { Dialog } = await import('@capacitor/dialog')
    await Dialog.alert({ title, message })
  } catch {
    /* Dialog plugin unavailable — the on-screen panel still has the message. */
  }
}

/** App Store Connect product ids. Mirror of store/app-store-products.json */
export const STORE_PRODUCTS: Record<PlanId, string> = {
  week: 'app.steady.pro.weekly',
  month: 'app.steady.pro.monthly',
  year: 'app.steady.pro.yearly',
}

export type StorePlan = {
  id: PlanId
  price: string
  productId: string
}

export type PurchaseResult = 'ok' | 'cancelled' | 'pending' | 'unavailable' | 'timeout'

const PLAN_ORDER: PlanId[] = ['week', 'month', 'year']

/**
 * If StoreKit never answers, the caller must still get a result — a button that
 * waits forever is worse than one that reports a problem. Nothing is lost by
 * giving up early: a purchase that lands later still arrives through the
 * Transaction.updates listener and unlocks Pro on its own.
 *
 * The purchase budget covers presenting Apple's sheet, not the user reading it:
 * once the sheet is up StoreKit has already answered. Keep it short enough that
 * a sheet which never appears reports itself in seconds rather than minutes.
 *
 * The catalogue budget is the opposite problem: a first `Product.products(for:)`
 * in the sandbox routinely takes far longer than a warm production one — it may
 * have to settle the storefront and the sandbox account before it answers. An
 * 8s budget gave up while Apple was still working and reported it as a failure,
 * which reads exactly like a broken catalogue. Wait long enough that a timeout
 * here means something is genuinely wrong.
 */
const PURCHASE_TIMEOUT_MS = 25_000
const QUERY_TIMEOUT_MS = 30_000
/** Short on purpose: this one runs after a failure, so it must not add a long wait. */
const STOREFRONT_TIMEOUT_MS = 6_000

let listening = false
let lastError: string | null = null

/** Why the last store call failed, for the paywall to show instead of a dead end. */
export function lastStoreError(): string | null {
  return lastError
}

/**
 * Everything the paywall needs to explain itself when a purchase goes nowhere.
 * Without this the screen can only report failures the user triggered, so a
 * product catalogue that never loaded stays invisible behind fallback prices.
 */
export type StoreStage = 'idle' | 'loading-products' | 'products-ok' | 'products-empty' | 'purchasing' | 'done'

export type StoreStatus = {
  /** False in a browser: StoreKit cannot be reached at all. */
  native: boolean
  stage: StoreStage
  /** How many of the three products the App Store actually returned. */
  productCount: number
  /** Verbatim message from the last failed StoreKit call. */
  error: string | null
  /** Verbatim outcome of the last purchase attempt. */
  lastResult: PurchaseResult | null
}

const status: StoreStatus = {
  native: false,
  stage: 'idle',
  productCount: 0,
  error: null,
  lastResult: null,
}

const statusListeners = new Set<() => void>()

export function subscribeStoreStatus(fn: () => void): () => void {
  statusListeners.add(fn)
  return () => {
    statusListeners.delete(fn)
  }
}

export function storeStatus(): StoreStatus {
  return { ...status, native: isNativeApp() }
}

function setStatus(patch: Partial<StoreStatus>) {
  Object.assign(status, patch)
  status.error = lastError
  statusListeners.forEach((fn) => fn())
}

function settleWithin<T>(work: Promise<T>, ms: number, onGiveUp: T): Promise<T> {
  return new Promise<T>((resolve) => {
    let settled = false
    const finish = (value: T) => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      resolve(value)
    }
    const timer = window.setTimeout(() => finish(onGiveUp), ms)
    work.then(finish, (err: unknown) => {
      lastError = err instanceof Error ? err.message : String(err ?? '')
      finish(onGiveUp)
    })
  })
}

export function iapConfigured(): boolean {
  return isNativeApp()
}

export function legalPath(page: 'privacy' | 'terms'): string {
  return `/legal/${page}`
}

export function legalUrl(page: 'privacy' | 'terms', lang?: LocaleId): string {
  const origin = (import.meta.env.VITE_LEGAL_ORIGIN as string | undefined)?.replace(/\/$/, '') || ''
  const path = `/legal/${page}.html`
  const q = lang ? `?lang=${encodeURIComponent(lang)}` : ''
  return `${origin}${path}${q}`
}

export function planIdOf(productId: string): PlanId | null {
  for (const [id, sku] of Object.entries(STORE_PRODUCTS) as [PlanId, string][]) {
    if (productId === sku) return id
  }
  return null
}

async function nativePlugin() {
  const { StoreKitNative } = await import('capacitor-storekit-native')
  return StoreKitNative
}

type NativeEntitlement = { active: boolean; productId?: string; expiresAt?: number }

function applyEntitlement(entitlement: NativeEntitlement): boolean {
  setPro(entitlement.active, { productId: entitlement.productId, expiresAt: entitlement.expiresAt })
  return entitlement.active
}

async function ensureListener() {
  if (listening || !iapConfigured()) return
  listening = true
  const plugin = await nativePlugin()
  void plugin.addListener('entitlementUpdate', (entitlement: NativeEntitlement) => {
    applyEntitlement(entitlement)
  })
}

export async function loadStorePlans(): Promise<StorePlan[] | null> {
  if (!iapConfigured()) {
    lastError = 'Not running in the native app — StoreKit is unreachable'
    setStatus({ stage: 'products-empty', productCount: 0 })
    return null
  }
  void ensureListener()
  lastError = null
  setStatus({ stage: 'loading-products', productCount: 0 })
  // An empty catalogue and an unanswered request look identical on screen unless
  // the panel says which happened: Apple answers "no such product" in a second or
  // two, so a slow empty result means the request never landed, not that the ids
  // are wrong. Carry the elapsed time and the ids asked for, so one screenshot of
  // the failure is enough to tell the two apart.
  const started = Date.now()
  const read = async () => {
    const plugin = await nativePlugin()
    const { products } = await plugin.getProducts({ productIds: Object.values(STORE_PRODUCTS) })
    const found = new Map<PlanId, StorePlan>()
    for (const product of products || []) {
      const id = planIdOf(product.id)
      if (!id) continue
      found.set(id, { id, price: product.priceString, productId: product.id })
    }
    const out = PLAN_ORDER.map((id) => found.get(id)).filter((p): p is StorePlan => Boolean(p))
    if (!out.length) {
      const secs = ((Date.now() - started) / 1000).toFixed(1)
      lastError = `App Store answered in ${secs}s with 0 of 3 products for ${Object.values(STORE_PRODUCTS).join(', ')}`
    }
    return out.length ? out : null
  }
  const plans = await settleWithin(read(), QUERY_TIMEOUT_MS, null)
  if (!plans && !lastError) {
    lastError = `No answer from the App Store in ${QUERY_TIMEOUT_MS / 1000}s for ${Object.values(STORE_PRODUCTS).join(', ')}`
  }
  // Only when something went wrong, and only then: a failed catalogue says nothing
  // about whether the device can reach a store at all, and that is the difference
  // between a problem in App Store Connect and a problem on this phone.
  if (!plans) lastError = `${lastError} · ${await describeStorefront()}`
  setStatus({
    stage: plans ? 'products-ok' : 'products-empty',
    productCount: plans?.length ?? 0,
  })
  if (!plans) void alertStoreError('StoreKit: getProducts failed', lastError ?? 'Unknown error')
  return plans
}

/** One short phrase for the failure panel: which store this device is signed in to. */
async function describeStorefront(): Promise<string> {
  const probe = async () => {
    const plugin = await nativePlugin()
    const front = await plugin.getStorefront()
    if (!front.available) return 'storefront: none (no App Store account on this device)'
    return `storefront: ${front.countryCode ?? 'unknown'}`
  }
  return settleWithin(probe(), STOREFRONT_TIMEOUT_MS, 'storefront: no answer (StoreKit cannot reach the App Store)')
}

export async function purchasePlan(id: PlanId): Promise<PurchaseResult> {
  if (!iapConfigured()) {
    lastError = 'Not running in the native app — StoreKit is unreachable'
    setStatus({ stage: 'done', lastResult: 'unavailable' })
    return 'unavailable'
  }
  void ensureListener()
  lastError = null
  setStatus({ stage: 'purchasing', lastResult: null })
  const run = async (): Promise<PurchaseResult> => {
    const plugin = await nativePlugin()
    const result = await plugin.purchase({ productId: STORE_PRODUCTS[id] })
    if (result.status === 'purchased') {
      setPro(true, { productId: result.transaction?.productId, expiresAt: result.transaction?.expiresAt })
      return 'ok'
    }
    if (result.status === 'cancelled') return 'cancelled'
    if (result.status === 'pending') return 'pending'
    // The plugin explains an unavailable result — surface it rather than dropping it.
    if (result.reason) lastError = `${STORE_PRODUCTS[id]}: ${result.reason}`
    return 'unavailable'
  }
  const outcome = await settleWithin(run(), PURCHASE_TIMEOUT_MS, 'timeout')
  if (outcome === 'timeout' && !lastError) {
    lastError = `No answer from StoreKit within ${PURCHASE_TIMEOUT_MS / 1000}s`
  }
  // A purchase and a product lookup fail at the same place, so the same question
  // applies here: can this device reach a store at all?
  if (outcome === 'timeout' || outcome === 'unavailable') {
    lastError = `${lastError} · ${await describeStorefront()}`
  }
  setStatus({ stage: 'done', lastResult: outcome })
  // cancelled/pending are expected outcomes, not failures — no alert for those.
  if (outcome === 'timeout' || outcome === 'unavailable') {
    void alertStoreError('StoreKit: purchase failed', lastError ?? `result: ${outcome}`)
  }
  return outcome
}

export async function restoreStorePurchases(): Promise<boolean> {
  if (!iapConfigured()) return false
  void ensureListener()
  lastError = null
  const run = async () => {
    const plugin = await nativePlugin()
    return applyEntitlement(await plugin.restorePurchases())
  }
  return settleWithin(run(), PURCHASE_TIMEOUT_MS, false)
}

export async function refreshStoreEntitlement(): Promise<boolean> {
  if (!iapConfigured()) return false
  void ensureListener()
  const run = async () => {
    const plugin = await nativePlugin()
    return applyEntitlement(await plugin.getEntitlement())
  }
  return settleWithin(run(), QUERY_TIMEOUT_MS, false)
}
