import { useEffect } from 'react'

export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !('wakeLock' in navigator)) return
    let lock: WakeLockSentinel | null = null
    let gone = false

    const grab = async () => {
      if (gone || document.visibilityState !== 'visible') return
      try {
        lock = await navigator.wakeLock.request('screen')
      } catch {
        /* unsupported, denied, or unfocused */
      }
    }

    void grab()
    const onVis = () => {
      if (document.visibilityState === 'visible') void grab()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      gone = true
      document.removeEventListener('visibilitychange', onVis)
      void lock?.release()
    }
  }, [active])
}
