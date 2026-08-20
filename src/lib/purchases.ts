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
 */
const PURCHASE_TIMEOUT_MS = 90_000
const QUERY_TIMEOUT_MS = 20_000

let listening = false
let lastError: string | null = null

/** Why the last store call failed, for the paywall to show instead of a dead end. */
export function lastStoreError(): string | null {
  return lastError
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
  if (!iapConfigured()) return null
  void ensureListener()
  lastError = null
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
    if (!out.length) lastError = 'App Store returned no products for these ids'
    return out.length ? out : null
  }
  return settleWithin(read(), QUERY_TIMEOUT_MS, null)
}

export async function purchasePlan(id: PlanId): Promise<PurchaseResult> {
  if (!iapConfigured()) return 'unavailable'
  void ensureListener()
  lastError = null
  const run = async (): Promise<PurchaseResult> => {
    const plugin = await nativePlugin()
    const result = await plugin.purchase({ productId: STORE_PRODUCTS[id] })
    if (result.status === 'purchased') {
      setPro(true, { productId: result.transaction?.productId, expiresAt: result.transaction?.expiresAt })
      return 'ok'
    }
    if (result.status === 'cancelled') return 'cancelled'
    if (result.status === 'pending') return 'pending'
    return 'unavailable'
  }
  return settleWithin(run(), PURCHASE_TIMEOUT_MS, 'timeout')
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
