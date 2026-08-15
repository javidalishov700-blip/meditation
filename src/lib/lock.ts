import { createContext, createElement, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { hashPin, readJson, removeKey, writeJson } from './storage'

type LockCtx = {
  hasPin: boolean
  unlocked: boolean
  sosBypass: boolean
  setSosBypass: (v: boolean) => void
  setupPin: (pin: string) => Promise<void>
  clearPin: () => void
  tryUnlock: (pin: string) => Promise<boolean>
  lockNow: () => void
}

const Ctx = createContext<LockCtx | null>(null)

export function LockProvider({ children }: { children: ReactNode }) {
  const [hasPin, setHasPin] = useState(() => Boolean(readJson<string | null>('pinHash', null)))
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('steady.unlocked') === '1')
  const [sosBypass, setSosBypass] = useState(false)

  const setupPin = useCallback(async (pin: string) => {
    const hash = await hashPin(pin)
    writeJson('pinHash', hash)
    setHasPin(true)
    setUnlocked(true)
    sessionStorage.setItem('steady.unlocked', '1')
  }, [])

  const clearPin = useCallback(() => {
    removeKey('pinHash')
    setHasPin(false)
    setUnlocked(true)
    sessionStorage.removeItem('steady.unlocked')
  }, [])

  const tryUnlock = useCallback(async (pin: string) => {
    const stored = readJson<string | null>('pinHash', null)
    if (!stored) return true
    const hash = await hashPin(pin)
    if (hash !== stored) return false
    setUnlocked(true)
    setSosBypass(false)
    sessionStorage.setItem('steady.unlocked', '1')
    return true
  }, [])

  const lockNow = useCallback(() => {
    setUnlocked(false)
    setSosBypass(false)
    sessionStorage.removeItem('steady.unlocked')
  }, [])

  const value = useMemo<LockCtx>(
    () => ({
      hasPin,
      unlocked: !hasPin || unlocked,
      sosBypass,
      setSosBypass,
      setupPin,
      clearPin,
      tryUnlock,
      lockNow,
    }),
    [hasPin, unlocked, sosBypass, setupPin, clearPin, tryUnlock, lockNow],
  )
  return createElement(Ctx.Provider, { value }, children)
}

export function useLock(): LockCtx {
  const v = useContext(Ctx)
  if (!v) throw new Error('LockProvider missing')
  return v
}
