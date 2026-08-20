import { isNativeApp } from './device'
import { setPro } from './entitlement'
import type { LocaleId } from './locales'
import type { PlanId } from './types'

/** App Store Connect product ids. Mirror of store/app-store-products.json */
export const STORE_PRODUCTS: Record<PlanId, string> = {
  week: 'app.steady.calm.weekly',
  month: 'app.steady.calm.monthly',
  year: 'app.steady.calm.yearly',
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
 */
const PURCHASE_TIMEOUT_MS = 25_000
const QUERY_TIMEOUT_MS = 8_000

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
    if (!out.length) lastError = 'App Store returned 0 products for these ids'
    return out.length ? out : null
  }
  const plans = await settleWithin(read(), QUERY_TIMEOUT_MS, null)
  if (!plans && !lastError) lastError = `Product lookup gave up after ${QUERY_TIMEOUT_MS / 1000}s`
  setStatus({
    stage: plans ? 'products-ok' : 'products-empty',
    productCount: plans?.length ?? 0,
  })
  return plans
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
  setStatus({ stage: 'done', lastResult: outcome })
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
