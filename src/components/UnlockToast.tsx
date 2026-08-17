import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { subscribeUnlockToast, type UnlockCopy } from '../lib/unlock-notify'
import type { SkillId } from '../lib/skills'

type Toast = UnlockCopy & { id: SkillId; key: number }

export function UnlockToast() {
  const [items, setItems] = useState<Toast[]>([])
  useEffect(() => {
    return subscribeUnlockToast((msg) => {
      const key = Date.now()
      setItems((prev) => [...prev, { ...msg, key }])
      window.setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.key !== key))
      }, 4200)
    })
  }, [])
  if (!items.length) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-[520] flex flex-col items-center gap-2 px-5">
      {items.map((item) => (
        <Link
          key={item.key}
          to="/me/skills"
          className="pointer-events-auto w-full max-w-lg rounded-[1.1rem] border border-white/12 bg-[#1a1228]/95 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <p className="text-sm font-medium text-white">{item.title}</p>
          <p className="mt-0.5 text-xs text-white/55">{item.text}</p>
        </Link>
      ))}
    </div>
  )
}
