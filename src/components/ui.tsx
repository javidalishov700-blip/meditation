import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CRISIS, LEGAL } from '../lib/phrases'

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose-300/85">{children}</p>
  )
}

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.045] p-5 ${className}`}>{children}</div>
  )
}

export function LegalNote({ compact = false }: { compact?: boolean }) {
  return (
    <p className={`text-mute/80 ${compact ? 'text-[11px] leading-5' : 'text-xs leading-5'}`}>
      {compact ? CRISIS + ' · Tıbbi tedavi değildir.' : LEGAL}
    </p>
  )
}

export function CrisisLink() {
  return (
    <a
      href="tel:112"
      className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-100"
    >
      Acil 112
    </a>
  )
}

export function ProChip() {
  return (
    <span className="rounded-full bg-orchid/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-orchid">
      Pro
    </span>
  )
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-500 px-5 py-3.5 text-sm font-semibold text-ink shadow-[0_0_32px_rgba(244,114,182,0.35)] disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  )
}

export function GhostButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border border-white/15 px-4 py-2.5 text-sm text-cream/90 ${className}`}
    >
      {children}
    </button>
  )
}

export function LockedLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="mt-3 inline-flex items-center gap-2 text-sm text-rose-200"
    >
      {label} <ProChip />
    </Link>
  )
}
