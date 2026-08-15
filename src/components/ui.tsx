import { Fragment, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n'

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium tracking-[0.14em] text-rose-200/45">{children}</p>
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
          className="mt-3 text-sm text-mute/80"
          onClick={() => setAll((v) => !v)}
        >
          {all ? t('see_less') : t('see_all')}
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
    <div className={`rounded-3xl border border-white/[0.07] bg-white/[0.03] p-5 ${className}`}>{children}</div>
  )
}

export function LegalNote({ compact = false }: { compact?: boolean }) {
  const { t, meta } = useI18n()
  return (
    <p className={`text-mute/80 ${compact ? 'text-[11px] leading-5' : 'text-xs leading-5'}`}>
      {compact
        ? `${t('crisis')}: ${meta.emergency} · ${t('legal_short')}`
        : `${t('legal_full')} ${t('crisis')}: ${meta.emergency}.`}
    </p>
  )
}

export function CrisisLink() {
  const { t, meta } = useI18n()
  return (
    <a
      href={`tel:${meta.tel}`}
      className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-100"
    >
      {t('crisis')} {meta.emergency}
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
      className={`w-full rounded-full bg-gradient-to-r from-rose-300 to-fuchsia-400/90 px-5 py-3.5 text-sm font-semibold text-ink shadow-[0_0_20px_rgba(244,114,182,0.18)] disabled:opacity-40 ${className}`}
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
