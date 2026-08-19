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

export type PurchaseResult = 'ok' | 'cancelled' | 'pending' | 'unavailable'

const PLAN_ORDER: PlanId[] = ['week', 'month', 'year']

let listening = false

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

function planIdOf(productId: string): PlanId | null {
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
  setPro(entitlement.active)
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
  try {
    const plugin = await nativePlugin()
    const { products } = await plugin.getProducts({ productIds: Object.values(STORE_PRODUCTS) })
    const found = new Map<PlanId, StorePlan>()
    for (const product of products || []) {
      const id = planIdOf(product.id)
      if (!id) continue
      found.set(id, { id, price: product.priceString, productId: product.id })
    }
    const out = PLAN_ORDER.map((id) => found.get(id)).filter((p): p is StorePlan => Boolean(p))
    return out.length ? out : null
  } catch {
    return null
  }
}

export async function purchasePlan(id: PlanId): Promise<PurchaseResult> {
  if (!iapConfigured()) return 'unavailable'
  void ensureListener()
  try {
    const plugin = await nativePlugin()
    const result = await plugin.purchase({ productId: STORE_PRODUCTS[id] })
    if (result.status === 'purchased') {
      setPro(true)
      return 'ok'
    }
    if (result.status === 'cancelled') return 'cancelled'
    if (result.status === 'pending') return 'pending'
    return 'unavailable'
  } catch {
    return 'unavailable'
  }
}

export async function restoreStorePurchases(): Promise<boolean> {
  if (!iapConfigured()) return false
  void ensureListener()
  try {
    const plugin = await nativePlugin()
    return applyEntitlement(await plugin.restorePurchases())
  } catch {
    return false
  }
}

export async function refreshStoreEntitlement(): Promise<boolean> {
  if (!iapConfigured()) return false
  void ensureListener()
  try {
    const plugin = await nativePlugin()
    return applyEntitlement(await plugin.getEntitlement())
  } catch {
    return false
  }
}
