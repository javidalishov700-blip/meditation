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
  /** Set when status is 'unavailable': product_not_found | unknown_result */
  reason?: string
  transaction?: {
    productId: string
    purchaseDate: number
    expiresAt?: number
  }
}

/** Which App Store the device is signed in to. `available: false` means none. */
export type NativeStorefront = {
  available: boolean
  countryCode?: string
  id?: string
}

export interface StoreKitNativePlugin {
  getProducts(options: { productIds: string[] }): Promise<{ products: NativeProduct[]; requested?: number }>
  purchase(options: { productId: string }): Promise<NativePurchaseResult>
  restorePurchases(): Promise<NativeEntitlement>
  getEntitlement(): Promise<NativeEntitlement>
  getStorefront(): Promise<NativeStorefront>
  addListener(
    eventName: 'entitlementUpdate',
    listenerFunc: (entitlement: NativeEntitlement) => void,
  ): Promise<PluginListenerHandle>
}

export declare const StoreKitNative: StoreKitNativePlugin
