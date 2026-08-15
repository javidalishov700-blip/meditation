import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from 'react'
import { isDemoPro, setPro as persistPro } from './entitlement'
import { clearTrial, isTrialActive, startTrial as beginTrial, trialUntil } from './onboard'

type EntitlementCtx = {
  pro: boolean
  demo: boolean
  trial: boolean
  trialEndsAt: number
  unlockDemo: () => void
  lockDemo: () => void
  startTrial: () => void
  refresh: () => void
}

const Ctx = createContext<EntitlementCtx | null>(null)

function snap() {
  const demo = isDemoPro()
  const trial = isTrialActive()
  return { pro: demo || trial, demo, trial: trial && !demo, trialEndsAt: trialUntil() }
}

export function EntitlementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(snap)
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
