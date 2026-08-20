import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { onAppResume } from './device'
import { hasStoreEntitlement, readProInfo, STEADY_PRO_EVENT } from './entitlement'
import { refreshStoreEntitlement } from './purchases'

type EntitlementCtx = {
  /** Content-gating flag. A StoreKit entitlement only. */
  pro: boolean
  /** A subscription StoreKit confirmed for this Apple ID. Same value as `pro`; kept as
   * its own name for call sites that mean "paid", not "unlocked". */
  store: boolean
  proProductId?: string
  proExpiresAt?: number
  refresh: () => void
}

const Ctx = createContext<EntitlementCtx | null>(null)

function snap() {
  const store = hasStoreEntitlement()
  const info = store ? readProInfo() : {}
  return {
    pro: store,
    store,
    proProductId: info.productId,
    proExpiresAt: info.expiresAt,
  }
}

export function EntitlementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(snap)
  useEffect(() => {
    const sync = () => setState(snap())
    window.addEventListener(STEADY_PRO_EVENT, sync)
    let offResume = () => undefined as void
    void onAppResume(() => {
      void refreshStoreEntitlement().then(sync)
    }).then((release) => {
      offResume = release
    })
    void refreshStoreEntitlement().then(sync)
    return () => {
      window.removeEventListener(STEADY_PRO_EVENT, sync)
      offResume()
    }
  }, [])
  const value = useMemo<EntitlementCtx>(
    () => ({
      ...state,
      refresh: () => setState(snap()),
    }),
    [state],
  )
  return createElement(Ctx.Provider, { value }, children)
}

export function useEntitlement(): EntitlementCtx {
  const v = useContext(Ctx)
  if (!v) throw new Error('EntitlementProvider missing')
  return v
}
