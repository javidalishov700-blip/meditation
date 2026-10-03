import { Fragment, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEmergencyLine } from '../lib/emergency'
import { useI18n } from '../lib/i18n'

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="kicker text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C4B5FD]/85">{children}</p>
  )
}

export function FoldList<T>({
  items,
  preview = 1,
  getKey,
  render,
  className = 'space-y-2',
}: {
  items: T[]
  preview?: number
  getKey: (item: T) => string
  render: (item: T) => ReactNode
  className?: string
}) {
  const [all, setAll] = useState(false)
  const { t } = useI18n()
  const shown = all ? items : items.slice(0, preview)
  if (items.length === 0) return null
  return (
    <div>
      <div className={className}>
        {shown.map((item) => (
          <Fragment key={getKey(item)}>{render(item)}</Fragment>
        ))}
      </div>
      {items.length > preview ? (
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-cream/90"
          onClick={() => setAll((v) => !v)}
        >
          {all ? t('see_less') : t('see_all')}
          <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${all ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m7 10 5 5 5-5" />
          </svg>
        </button>
      ) : null}
    </div>
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
    <div className={`surface rounded-[1.35rem] p-5 ${className}`}>{children}</div>
  )
}

export function LegalNote({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()
  const line = useEmergencyLine()
  const guess = line.source === 'default' ? t('crisis_alts') : t('crisis_guess')
  return (
    <p className={`text-mute/80 ${compact ? 'text-[11px] leading-5' : 'text-xs leading-5'}`}>
      {compact
        ? `${t('crisis')}: ${line.tel} · ${t('legal_short')}`
        : `${t('legal_full')} ${t('crisis')}: ${line.tel}. ${guess}`}
    </p>
  )
}

/**
 * Only where someone in the middle of an attack lands. Floating over every
 * screen it collided with headers and close buttons, and the number is still
 * one tap away in Settings and in the footnote on each page.
 */
const CRISIS_ROUTES = ['/sos', '/treat']

export function CrisisChip() {
  const { t } = useI18n()
  const line = useEmergencyLine()
  const { pathname } = useLocation()
  if (!CRISIS_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) return null
  return (
    <a
      href={`tel:${line.tel}`}
      aria-label={`${t('crisis')} ${line.tel}`}
      className="fixed right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.45rem,env(safe-area-inset-top))] z-[500] flex h-7 items-center gap-1 rounded-full border border-white/10 bg-ink/45 px-2.5 text-[11px] text-cream/70 backdrop-blur-md"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6.6 4.2h2.8l1.2 3.6-2 1.2a13 13 0 0 0 6.4 6.4l1.2-2 3.6 1.2v2.8A15.5 15.5 0 0 1 6.6 4.2Z" />
      </svg>
      {line.tel}
    </a>
  )
}

export function ProChip() {
  const { t } = useI18n()
  return (
    <span className="rounded-full bg-orchid/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-orchid">
      {t('me_pro')}
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
      className={`btn-primary w-full rounded-full px-5 py-[1.05rem] text-[15px] font-semibold tracking-[0.01em] transition-transform active:scale-[0.985] ${className}`}
    >
      {children}
    </button>
  )
}

export function Switch({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean
  onChange: (value: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex w-full items-center gap-3 rounded-[1.35rem] surface px-4 py-4 text-left"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-cream">{label}</span>
        {hint ? <span className="mt-1 block text-xs leading-5 text-mute">{hint}</span> : null}
      </span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full ${on ? 'bg-[#7B61FF]' : 'bg-white/15'}`}>
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            on ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </span>
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
