import { Link } from 'react-router-dom'
import { ProChip } from './ui'
import type { ReactNode } from 'react'

export function CategoryTile({
  to,
  title,
  hint,
  icon,
  locked,
}: {
  to: string
  title: string
  hint?: string
  icon: ReactNode
  locked?: boolean
}) {
  return (
    <Link
      to={to}
      className="relative flex min-h-[6.2rem] flex-col justify-between rounded-[1.35rem] bg-[#1C1C1E] p-4"
    >
      <div className="text-lilac/70">{icon}</div>
      <div>
        <p className="font-display text-lg leading-tight text-cream/95">{title}</p>
        {hint ? <p className="mt-1 text-[11px] text-mute">{hint}</p> : null}
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
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d={d} />
    </svg>
  )
}
