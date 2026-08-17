import { isNativeApp } from './device'
import { setPro } from './entitlement'
import type { PlanId } from './types'

/** App Store Connect product ids. Mirror of store/app-store-products.json */
export const STORE_PRODUCTS: Record<PlanId, string> = {
  week: 'app.steady.calm.weekly',
  month: 'app.steady.calm.monthly',
  year: 'app.steady.calm.yearly',
}

export const PRO_ENTITLEMENT = 'pro'
export const PRO_OFFERING = 'default'

export type StorePlan = {
  id: PlanId
  price: string
  productId: string
}

export type PurchaseResult = 'ok' | 'cancelled' | 'unavailable'

const PLAN_ORDER: PlanId[] = ['week', 'month', 'year']

let configured = false
const packages = new Map<PlanId, unknown>()
const products = new Map<PlanId, unknown>()

function iosKey(): string {
  return (import.meta.env.VITE_REVENUECAT_IOS_KEY as string | undefined)?.trim() || ''
}

export function iapConfigured(): boolean {
  return isNativeApp() && Boolean(iosKey())
}

export function legalUrl(page: 'privacy' | 'terms'): string {
  const origin = (import.meta.env.VITE_LEGAL_ORIGIN as string | undefined)?.replace(/\/$/, '') || ''
  const path = `/legal/${page}.html`
  return origin ? `${origin}${path}` : path
}

async function ensure(): Promise<boolean> {
  if (!iapConfigured()) return false
  if (configured) return true
  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor')
    await Purchases.configure({ apiKey: iosKey() })
    configured = true
    void Purchases.addCustomerInfoUpdateListener((info) => {
      setPro(hasPro(info))
    })
    return true
  } catch {
    return false
  }
}

function planIdOf(blob: string, productId?: string): PlanId | null {
  if (productId) {
    for (const [id, sku] of Object.entries(STORE_PRODUCTS) as [PlanId, string][]) {
      if (productId === sku) return id
    }
  }
  const n = blob.toLowerCase()
  if (n.includes('week')) return 'week'
  if (n.includes('year') || n.includes('annual')) return 'year'
  if (n.includes('month')) return 'month'
  return null
}

function hasPro(info: {
  entitlements?: { active?: Record<string, unknown> }
  activeSubscriptions?: string[]
}): boolean {
  const active = info.entitlements?.active || {}
  if (active[PRO_ENTITLEMENT]) return true
  if (Object.keys(active).length > 0) return true
  const skus = Object.values(STORE_PRODUCTS)
  return (info.activeSubscriptions || []).some((id) => skus.includes(id))
}

function cancelled(err: unknown): boolean {
  const e = err as { code?: number | string; userCancelled?: boolean; message?: string }
  if (e.userCancelled) return true
  const code = String(e.code ?? '')
  if (code === '1' || code === 'PURCHASE_CANCELLED' || code.includes('CANCEL')) return true
  return /cancel/i.test(e.message || '')
}

function rememberPlan(id: PlanId, price: string, productId: string, pkg?: unknown, product?: unknown): StorePlan {
  if (pkg) packages.set(id, pkg)
  if (product) products.set(id, product)
  return { id, price, productId }
}

export async function loadStorePlans(): Promise<StorePlan[] | null> {
  if (!(await ensure())) return null
  const { Purchases } = await import('@revenuecat/purchases-capacitor')
  const found = new Map<PlanId, StorePlan>()
  try {
    const offerings = await Purchases.getOfferings()
    const current =
      offerings.current ||
      offerings.all?.[PRO_OFFERING] ||
      Object.values(offerings.all || {})[0] ||
      null
    for (const pkg of current?.availablePackages || []) {
      const productId = pkg.product?.identifier || ''
      const id = planIdOf(`${pkg.identifier || ''} ${productId} ${pkg.packageType || ''}`, productId)
      if (!id) continue
      found.set(id, rememberPlan(id, pkg.product.priceString, productId, pkg, pkg.product))
    }
  } catch {
    /* offerings can be empty; products still buy */
  }
  if (found.size < PLAN_ORDER.length) {
    try {
      const { products: list } = await Purchases.getProducts({
        productIdentifiers: PLAN_ORDER.map((id) => STORE_PRODUCTS[id]),
      })
      for (const product of list || []) {
        const id = planIdOf(product.identifier, product.identifier)
        if (!id || found.has(id)) continue
        found.set(id, rememberPlan(id, product.priceString, product.identifier, undefined, product))
      }
    } catch {
      /* keep whatever offerings returned */
    }
  }
  const out = PLAN_ORDER.map((id) => found.get(id)).filter((p): p is StorePlan => Boolean(p))
  return out.length ? out : null
}

export async function purchasePlan(id: PlanId): Promise<PurchaseResult> {
  if (!(await ensure())) return 'unavailable'
  if (!packages.has(id) && !products.has(id)) await loadStorePlans()
  const { Purchases } = await import('@revenuecat/purchases-capacitor')
  try {
    const pkg = packages.get(id)
    const product = products.get(id)
    const result = pkg
      ? await Purchases.purchasePackage({ aPackage: pkg as never })
      : product
        ? await Purchases.purchaseStoreProduct({ product: product as never })
        : null
    if (!result) return 'unavailable'
    if (hasPro(result.customerInfo)) {
      setPro(true)
      return 'ok'
    }
    setPro(true)
    return 'ok'
  } catch (err) {
    if (cancelled(err)) return 'cancelled'
    return 'unavailable'
  }
}

export async function restoreStorePurchases(): Promise<boolean> {
  if (!(await ensure())) return false
  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor')
    const { customerInfo } = await Purchases.restorePurchases()
    const ok = hasPro(customerInfo)
    setPro(ok)
    return ok
  } catch {
    return false
  }
}

export async function refreshStoreEntitlement(): Promise<boolean> {
  if (!(await ensure())) return false
  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor')
    const { customerInfo } = await Purchases.getCustomerInfo()
    const ok = hasPro(customerInfo)
    setPro(ok)
    return ok
  } catch {
    return false
  }
}
