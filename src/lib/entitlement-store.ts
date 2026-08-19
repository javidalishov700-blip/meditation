import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { onAppResume } from './device'
import { isDemoPro, readProInfo, setPro as persistPro, STEADY_PRO_EVENT } from './entitlement'
import { clearTrial, isTrialActive, startTrial as beginTrial, trialUntil } from './onboard'
import { refreshStoreEntitlement } from './purchases'

type EntitlementCtx = {
  pro: boolean
  demo: boolean
  trial: boolean
  trialEndsAt: number
  proProductId?: string
  proExpiresAt?: number
  unlockDemo: () => void
  lockDemo: () => void
  startTrial: () => void
  refresh: () => void
}

const Ctx = createContext<EntitlementCtx | null>(null)

function snap() {
  const demo = isDemoPro()
  const trial = isTrialActive()
  const info = demo ? readProInfo() : {}
  return {
    pro: demo || trial,
    demo,
    trial: trial && !demo,
    trialEndsAt: trialUntil(),
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
      unlockDemo: () => {
        persistPro(true)
        setState(snap())
      },
      lockDemo: () => {
        persistPro(false)
        clearTrial()
        setState(snap())
      },
      startTrial: () => {
        beginTrial()
        setState(snap())
      },
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
