import { Link } from 'react-router-dom'
import { ProChip } from './ui'
import type { ReactNode } from 'react'

export function CategoryTile({
  to,
  title,
  hint,
  glow,
  icon,
  locked,
}: {
  to: string
  title: string
  hint?: string
  glow: string
  icon: ReactNode
  locked?: boolean
}) {
  return (
    <Link
      to={to}
      className="relative flex min-h-[7.2rem] flex-col justify-between overflow-hidden rounded-[1.6rem] border border-white/10 p-4"
      style={{ background: `linear-gradient(165deg, ${glow}55, rgba(18,8,20,0.65))` }}
    >
      <div className="text-cream/90">{icon}</div>
      <div>
        <p className="font-display text-xl leading-tight">{title}</p>
        {hint ? <p className="mt-1 text-[11px] text-cream/70">{hint}</p> : null}
      </div>
      {locked ? (
        <span className="absolute right-3 top-3">
          <ProChip />
        </span>
      ) : null}
    </Link>
  )
}

export function TileIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d={d} />
    </svg>
  )
}
