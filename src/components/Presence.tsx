import { useEffect, useState } from 'react'
import { useI18n } from '../lib/i18n'

const FACES = [
  '/covers/face-1.png',
  '/covers/face-2.png',
  '/covers/face-3.png',
  '/covers/face-4.png',
  '/covers/face-5.png',
  '/covers/face-6.png',
]

export function presenceCount(now = Date.now()): number {
  const d = new Date(now)
  const h = d.getHours()
  const m = d.getMinutes()
  const s = d.getSeconds()
  const base = h >= 21 || h < 6 ? 842 : h >= 18 ? 671 : h >= 12 && h < 14 ? 508 : h >= 8 && h < 10 ? 394 : 286
  const wave = Math.sin((m * 60 + s) / 95) * 28
  const tick = Math.floor(s / 5) % 6
  return Math.max(64, Math.round(base + wave + tick * 2 + (m % 13)))
}

export function Presence() {
  const { t, meta } = useI18n()
  const [n, setN] = useState(() => presenceCount())

  useEffect(() => {
    const id = window.setInterval(() => setN(presenceCount()), 3500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="mt-8 flex justify-center">
      <div
        className="keep-dark pointer-events-none inline-flex max-w-full items-center gap-2 rounded-full bg-black/78 py-1.5 pl-1.5 pr-3.5 shadow-[0_10px_32px_rgba(0,0,0,0.38)] backdrop-blur-md"
        role="status"
      >
        <span className="flex -space-x-2.5">
          {FACES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="face-breathe h-8 w-8 rounded-full object-cover ring-[1.5px] ring-black/80"
              style={{ animationDelay: `${i * 0.45}s`, zIndex: FACES.length - i }}
            />
          ))}
        </span>
        <span className="relative ml-1 flex h-2.5 w-2.5">
          <span className="live-ping absolute inset-0 rounded-full bg-emerald-400/80" />
          <span className="relative m-auto h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[13px] font-medium tracking-tight text-white">
          {t('presence_live', { n: n.toLocaleString(meta.bcp47) })}
        </span>
      </div>
    </div>
  )
}
