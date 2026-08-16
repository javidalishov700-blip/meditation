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

export type StorePlan = {
  id: PlanId
  price: string
  productId: string
}

let configured = false
const packages = new Map<PlanId, unknown>()

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
    return true
  } catch {
    return false
  }
}

function planIdOf(pkg: { identifier?: string; product?: { identifier?: string } }): PlanId | null {
  const blob = `${pkg.identifier || ''} ${pkg.product?.identifier || ''}`.toLowerCase()
  if (blob.includes('week')) return 'week'
  if (blob.includes('year') || blob.includes('annual')) return 'year'
  if (blob.includes('month')) return 'month'
  const product = pkg.product?.identifier
  for (const [id, sku] of Object.entries(STORE_PRODUCTS) as [PlanId, string][]) {
    if (product === sku) return id
  }
  return null
}

function hasPro(info: { entitlements?: { active?: Record<string, unknown> } }): boolean {
  return Boolean(info.entitlements?.active?.[PRO_ENTITLEMENT])
}

export async function loadStorePlans(): Promise<StorePlan[] | null> {
  if (!(await ensure())) return null
  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor')
    const { current } = await Purchases.getOfferings()
    if (!current?.availablePackages?.length) return null
    packages.clear()
    const out: StorePlan[] = []
    for (const pkg of current.availablePackages) {
      const id = planIdOf(pkg)
      if (!id) continue
      packages.set(id, pkg)
      out.push({
        id,
        price: pkg.product.priceString,
        productId: pkg.product.identifier,
      })
    }
    return out.length ? out : null
  } catch {
    return null
  }
}

export async function purchasePlan(id: PlanId): Promise<'ok' | 'cancelled' | 'unavailable'> {
  const pkg = packages.get(id)
  if (!pkg || !(await ensure())) return 'unavailable'
  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor')
    const result = await Purchases.purchasePackage({ aPackage: pkg as never })
    if (hasPro(result.customerInfo)) {
      setPro(true)
      return 'ok'
    }
    return 'unavailable'
  } catch (err) {
    const code = (err as { code?: number | string }).code
    if (code === 1 || code === 'PURCHASE_CANCELLED' || String(code).includes('CANCEL')) return 'cancelled'
    return 'unavailable'
  }
}

export async function restoreStorePurchases(): Promise<boolean> {
  if (!(await ensure())) return false
  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor')
    const { customerInfo } = await Purchases.restorePurchases()
    const ok = hasPro(customerInfo)
    if (ok) setPro(true)
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
