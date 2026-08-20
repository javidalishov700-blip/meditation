import { Purchases, PURCHASES_ERROR_CODE } from '@revenuecat/purchases-capacitor'
import type { CustomerInfo, PurchasesPackage } from '@revenuecat/purchases-capacitor'
import { isNativeApp } from './device'
import { setPro } from './entitlement'
import type { LocaleId } from './locales'
import type { PlanId } from './types'

/**
 * A system alert on top of the on-screen panel — belt and suspenders. The
 * panel can be missed if it renders below the fold or the user looks away
 * mid-tap; a blocking native dialog with the store's exact words cannot be.
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

/**
 * App Store Connect product ids, referenced from the RevenueCat "Steady Pro"
 * offering. Mirror of store/app-store-products.json.
 */
export const STORE_PRODUCTS: Record<PlanId, string> = {
  week: 'app.steady.pro.weekly',
  month: 'app.steady.pro.monthly',
  year: 'app.steady.pro.yearly',
}

/**
 * RevenueCat entitlement identifier, exactly as created in the RevenueCat
 * dashboard (Product catalog → Entitlements). Not a code choice — RevenueCat
 * project entitlement identifiers are fixed once created.
 */
const ENTITLEMENT_ID = 'Steady - Panic & Calm Pro'

export type StorePlan = {
  id: PlanId
  price: string
  productId: string
}

export type PurchaseResult = 'ok' | 'cancelled' | 'pending' | 'unavailable' | 'timeout'

const PLAN_ORDER: PlanId[] = ['week', 'month', 'year']

/**
 * If RevenueCat never answers, the caller must still get a result — a button that
 * waits forever is worse than one that reports a problem. Nothing is lost by
 * giving up early: a purchase that lands later still arrives through the
 * customer-info listener and unlocks Pro on its own.
 *
 * The purchase budget covers presenting the store's sheet, not the user reading it:
 * once the sheet is up the store has already answered. Keep it short enough that
 * a sheet which never appears reports itself in seconds rather than minutes.
 */
const PURCHASE_TIMEOUT_MS = 25_000
const QUERY_TIMEOUT_MS = 8_000

let configured = false
let listening = false
let lastError: string | null = null

/** The package backing each plan in the last successfully loaded offering. */
const packageCache = new Map<PlanId, PurchasesPackage>()

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
  /** False in a browser: the store cannot be reached at all. */
  native: boolean
  stage: StoreStage
  /** How many of the three products the offering actually returned. */
  productCount: number
  /** Verbatim message from the last failed store call. */
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

/** Configures the RevenueCat SDK exactly once, lazily, on first native use. */
async function ensureConfigured() {
  if (configured || !iapConfigured()) return
  const apiKey = import.meta.env.VITE_REVENUECAT_API_KEY as string | undefined
  if (!apiKey) throw new Error('VITE_REVENUECAT_API_KEY is not set at build time')
  await Purchases.configure({ apiKey })
  configured = true
}

/** Mirrors RevenueCat's verdict onto the on-device entitlement cache. */
function applyCustomerInfo(info: CustomerInfo): boolean {
  const ent = info.entitlements.active[ENTITLEMENT_ID]
  setPro(Boolean(ent), {
    productId: ent?.productIdentifier,
    expiresAt: ent?.expirationDateMillis != null ? ent.expirationDateMillis / 1000 : undefined,
  })
  return Boolean(ent)
}

async function ensureListener() {
  if (listening || !iapConfigured()) return
  listening = true
  await ensureConfigured()
  await Purchases.addCustomerInfoUpdateListener((info) => {
    applyCustomerInfo(info)
  })
}

export async function loadStorePlans(): Promise<StorePlan[] | null> {
  if (!iapConfigured()) {
    lastError = 'Not running in the native app — the store is unreachable'
    setStatus({ stage: 'products-empty', productCount: 0 })
    return null
  }
  void ensureListener()
  lastError = null
  setStatus({ stage: 'loading-products', productCount: 0 })
  const read = async () => {
    await ensureConfigured()
    const offerings = await Purchases.getOfferings()
    const offering = offerings.current ?? Object.values(offerings.all)[0]
    if (!offering) {
      lastError = 'RevenueCat returned no offerings'
      return null
    }
    packageCache.clear()
    const found = new Map<PlanId, StorePlan>()
    for (const pkg of offering.availablePackages) {
      const id = planIdOf(pkg.product.identifier)
      if (!id) continue
      packageCache.set(id, pkg)
      found.set(id, { id, price: pkg.product.priceString, productId: pkg.product.identifier })
    }
    const out = PLAN_ORDER.map((id) => found.get(id)).filter((p): p is StorePlan => Boolean(p))
    if (!out.length) lastError = 'RevenueCat offering has 0 matching products'
    return out.length ? out : null
  }
  const plans = await settleWithin(read(), QUERY_TIMEOUT_MS, null)
  if (!plans && !lastError) lastError = `Product lookup gave up after ${QUERY_TIMEOUT_MS / 1000}s`
  setStatus({
    stage: plans ? 'products-ok' : 'products-empty',
    productCount: plans?.length ?? 0,
  })
  if (!plans) void alertStoreError('Store: getOfferings failed', lastError ?? 'Unknown error')
  return plans
}

export async function purchasePlan(id: PlanId): Promise<PurchaseResult> {
  if (!iapConfigured()) {
    lastError = 'Not running in the native app — the store is unreachable'
    setStatus({ stage: 'done', lastResult: 'unavailable' })
    return 'unavailable'
  }
  void ensureListener()
  lastError = null
  setStatus({ stage: 'purchasing', lastResult: null })
  const run = async (): Promise<PurchaseResult> => {
    await ensureConfigured()
    const pkg = packageCache.get(id)
    if (!pkg) {
      lastError = `${STORE_PRODUCTS[id]}: package not found in the loaded offering`
      return 'unavailable'
    }
    try {
      const result = await Purchases.purchasePackage({ aPackage: pkg })
      applyCustomerInfo(result.customerInfo)
      return 'ok'
    } catch (err) {
      const e = err as { code?: PURCHASES_ERROR_CODE; message?: string; userCancelled?: boolean | null }
      if (e.userCancelled || e.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) return 'cancelled'
      if (e.code === PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR) return 'pending'
      lastError = `${STORE_PRODUCTS[id]}: ${e.message ?? 'purchase failed'}`
      return 'unavailable'
    }
  }
  const outcome = await settleWithin(run(), PURCHASE_TIMEOUT_MS, 'timeout')
  if (outcome === 'timeout' && !lastError) {
    lastError = `No answer from the store within ${PURCHASE_TIMEOUT_MS / 1000}s`
  }
  setStatus({ stage: 'done', lastResult: outcome })
  // cancelled/pending are expected outcomes, not failures — no alert for those.
  if (outcome === 'timeout' || outcome === 'unavailable') {
    void alertStoreError('Store: purchase failed', lastError ?? `result: ${outcome}`)
  }
  return outcome
}

export async function restoreStorePurchases(): Promise<boolean> {
  if (!iapConfigured()) return false
  void ensureListener()
  lastError = null
  const run = async () => {
    await ensureConfigured()
    const { customerInfo } = await Purchases.restorePurchases()
    return applyCustomerInfo(customerInfo)
  }
  return settleWithin(run(), PURCHASE_TIMEOUT_MS, false)
}

export async function refreshStoreEntitlement(): Promise<boolean> {
  if (!iapConfigured()) return false
  void ensureListener()
  const run = async () => {
    await ensureConfigured()
    const { customerInfo } = await Purchases.getCustomerInfo()
    return applyCustomerInfo(customerInfo)
  }
  return settleWithin(run(), QUERY_TIMEOUT_MS, false)
}
