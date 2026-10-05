import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { subscribeUnlockToast, type UnlockCopy } from '../lib/unlock-notify'
import type { SkillId } from '../lib/skills'

type Toast = UnlockCopy & { id: SkillId; key: number }

let seq = 0

function isListening() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('session-listen')
}

/**
 * Skill unlocks show one at a time, and wait while a session player is open
 * so they never cover its controls or break a meditation.
 */
export function UnlockToast() {
  const [queue, setQueue] = useState<Toast[]>([])
  const [listening, setListening] = useState(isListening)

  useEffect(() => subscribeUnlockToast((msg) => setQueue((prev) => [...prev, { ...msg, key: ++seq }])), [])

  useEffect(() => {
    const el = document.documentElement
    const obs = new MutationObserver(() => setListening(isListening()))
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const current = listening ? undefined : queue[0]
  const currentKey = current?.key
  useEffect(() => {
    if (currentKey == null) return
    const tmr = window.setTimeout(() => setQueue((prev) => prev.filter((x) => x.key !== currentKey)), 3600)
    return () => window.clearTimeout(tmr)
  }, [currentKey])

  if (!current) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-[520] flex flex-col items-center px-5">
      <Link
        key={current.key}
        to="/me/skills"
        className="pointer-events-auto w-full max-w-lg rounded-[1.1rem] border border-white/12 bg-[#1a1228]/95 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
      >
        <p className="text-sm font-medium text-white">{current.title}</p>
        <p className="mt-0.5 text-xs text-white/55">{current.text}</p>
      </Link>
    </div>
  )
}
