import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from 'react'
import { isPro, setPro as persistPro } from './entitlement'

type EntitlementCtx = {
  pro: boolean
  unlockDemo: () => void
  lockDemo: () => void
}

const Ctx = createContext<EntitlementCtx | null>(null)

export function EntitlementProvider({ children }: { children: ReactNode }) {
  const [pro, setPro] = useState(() => isPro())
  const value = useMemo<EntitlementCtx>(
    () => ({
      pro,
      unlockDemo: () => {
        persistPro(true)
        setPro(true)
      },
      lockDemo: () => {
        persistPro(false)
        setPro(false)
      },
    }),
    [pro],
  )
  return createElement(Ctx.Provider, { value }, children)
}

export function useEntitlement(): EntitlementCtx {
  const v = useContext(Ctx)
  if (!v) throw new Error('EntitlementProvider missing')
  return v
}
