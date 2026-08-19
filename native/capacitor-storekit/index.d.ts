import type { PluginListenerHandle } from '@capacitor/core'

export type NativeProduct = {
  id: string
  displayName: string
  description: string
  priceString: string
  price: number
  currencyCode: string
  subscriptionPeriod?: string
}

export type NativeEntitlement = {
  active: boolean
  productId?: string
  expiresAt?: number
}

export type NativePurchaseStatus = 'purchased' | 'cancelled' | 'pending' | 'unavailable'

export type NativePurchaseResult = {
  status: NativePurchaseStatus
  transaction?: {
    productId: string
    purchaseDate: number
    expiresAt?: number
  }
}

export interface StoreKitNativePlugin {
  getProducts(options: { productIds: string[] }): Promise<{ products: NativeProduct[] }>
  purchase(options: { productId: string }): Promise<NativePurchaseResult>
  restorePurchases(): Promise<NativeEntitlement>
  getEntitlement(): Promise<NativeEntitlement>
  addListener(
    eventName: 'entitlementUpdate',
    listenerFunc: (entitlement: NativeEntitlement) => void,
  ): Promise<PluginListenerHandle>
}

export declare const StoreKitNative: StoreKitNativePlugin
