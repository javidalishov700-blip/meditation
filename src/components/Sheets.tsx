import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { hrefFor, itemTitle, resolveFavorite, searchCatalog, searchQuotes } from '../lib/catalog'
import { LangPicker } from './LangPicker'
import { readFavorites, STEADY_FAV_EVENT, toggleFavorite, type FavItem } from '../lib/favorites'
import { useI18n } from '../lib/i18n'
import { MOODS, MOOD_KEYS, readMood, writeMood, type MoodId } from '../lib/mood'

function portal(node: ReactNode) {
  if (typeof document === 'undefined') return null
  return createPortal(node, document.body)
}

function SheetFrame({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const { t } = useI18n()
  if (!open) return null
  return portal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 px-5 py-[max(1.25rem,env(safe-area-inset-top))]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[min(36rem,calc(100svh-6rem))] overflow-y-auto overscroll-none rounded-[1.6rem] border border-white/12 bg-[#1C1C1E] px-5 py-5 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-semibold">{title}</p>
          <button type="button" className="shrink-0 rounded-full px-3 py-1 text-sm text-white/70" onClick={onClose}>
            {t('close')}
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
  )
}

export function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useI18n()
  const [q, setQ] = useState('')
  const items = useMemo(() => (q.trim() ? searchCatalog(q, locale) : []), [q, locale])
  const lines = useMemo(() => (q.trim() ? searchQuotes(q, locale) : []), [q, locale])

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  if (!open) return null
  return portal(
    <div className="fixed inset-0 z-[80] bg-black px-5 pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="mx-auto flex h-full max-h-[100svh] max-w-lg flex-col">
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('search_ph')}
            className="h-12 flex-1 rounded-full bg-[#1C1C1E] px-5 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button type="button" className="px-2 text-sm text-white/60" onClick={onClose}>
            {t('close')}
          </button>
        </div>
        <div className="mt-5 flex-1 overflow-y-auto overscroll-none pb-10">
          {q.trim() && items.length === 0 && lines.length === 0 ? (
            <p className="text-sm text-white/70">{t('no_results')}</p>
          ) : null}
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.to}>
                <Link
                  to={hrefFor(item)}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl bg-[#1C1C1E] p-2"
                >
                  <img src={item.cover} alt="" className="h-14 w-11 rounded-xl object-cover" />
                  <span className="text-sm font-medium">{itemTitle(item, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
          {lines.length ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-white/35">{t('quotes_title')}</p>
              <ul className="mt-2 space-y-2">
                {lines.map((quote) => (
                  <li key={quote.id}>
                    <Link to="/quotes" onClick={onClose} className="block rounded-2xl bg-[#1C1C1E] p-4">
                      <p className="text-sm leading-6 text-white/90">{quote.text[locale]}</p>
                      <p className="mt-2 text-xs text-white/40">{quote.author}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
  )
}

export function LangSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  return (
    <SheetFrame open={open} onClose={onClose} title={t('lang_now')}>
      <LangPicker onPick={onClose} />
    </SheetFrame>
  )
}

export function MoodSheet({
  open,
  onClose,
  onPick,
}: {
  open: boolean
  onClose: () => void
  onPick: (id: MoodId) => void
}) {
  const { t } = useI18n()
  const current = readMood()
  return (
    <SheetFrame open={open} onClose={onClose} title={t('mood_check')}>
      <div className="grid grid-cols-1 gap-2">
        {MOODS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              writeMood(id)
              onPick(id)
              onClose()
            }}
            className={`rounded-2xl px-4 py-3.5 text-left text-sm ${
              current === id ? 'bg-[#7B61FF] text-white' : 'bg-white/6 text-white/90'
            }`}
          >
            {t(MOOD_KEYS[id])}
          </button>
        ))}
      </div>
    </SheetFrame>
  )
}

export function FavSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useI18n()
  const [items, setItems] = useState<FavItem[]>([])

  useEffect(() => {
    const sync = () => setItems(readFavorites().map((f) => resolveFavorite(f, locale)))
    if (open) sync()
    window.addEventListener(STEADY_FAV_EVENT, sync)
    return () => window.removeEventListener(STEADY_FAV_EVENT, sync)
  }, [open, locale])

  return (
    <SheetFrame open={open} onClose={onClose} title={t('favorites')}>
      {items.length === 0 ? (
        <p className="text-sm leading-6 text-white/75">{t('fav_empty')}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((f) => (
            <li key={f.to}>
              <div className="flex items-center gap-2 rounded-2xl bg-white/6 p-2">
                <Link to={f.to} onClick={onClose} className="flex min-w-0 flex-1 items-center gap-3">
                  {f.cover ? (
                    <img src={f.cover} alt="" className="h-14 w-11 shrink-0 rounded-xl object-cover" />
                  ) : (
                    <span className="h-14 w-11 shrink-0 rounded-xl bg-white/10" />
                  )}
                  <span className="truncate text-sm font-medium text-white">{f.title || t('favorites')}</span>
                </Link>
                <button
                  type="button"
                  aria-label={t('favorites')}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#F472B6]"
                  onClick={() => toggleFavorite(f)}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 19s-7-4.4-7-9.1A4 4 0 0 1 12 7a4 4 0 0 1 7 2.9C19 14.6 12 19 12 19Z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </SheetFrame>
  )
}

/** Whether the user has closed the upgrade banner for good. */
export function premiumBannerHidden(): boolean {
  try {
    return localStorage.getItem('steady.bannerOff') === '1'
  } catch {
    return false
  }
}

/**
 * The banner is fixed, so the scroll container has to reserve room for it —
 * which means Layout, not this component, owns the dismissed flag. Keeping the
 * state here would leave the reserved strip behind after a dismiss, as a band
 * of empty space under the content.
 */
export function PremiumBanner({ onDismiss }: { onDismiss: () => void }) {
  const { t } = useI18n()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(4.6rem+env(safe-area-inset-bottom))] z-[42] flex justify-center px-4">
      <Link
        to="/paywall"
        className="pointer-events-auto flex w-full max-w-lg items-center gap-2 rounded-full bg-[#7B61FF] px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_28px_rgba(123,97,255,0.35)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
          <path d="M12 2.4 13.7 8h5.8l-4.7 3.4 1.8 5.6L12 13.8 7.4 17l1.8-5.6L4.5 8h5.8L12 2.4Z" />
        </svg>
        <span className="min-w-0 flex-1 leading-snug">{t('premium_banner')}</span>
        <button
          type="button"
          aria-label={t('close')}
          className="shrink-0 rounded-full p-1 text-white/90"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            try {
              localStorage.setItem('steady.bannerOff', '1')
            } catch {
              /* private mode */
            }
            onDismiss()
          }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </Link>
    </div>
  )
}

export function CircleIconBtn({
  onClick,
  to,
  label,
  children,
}: {
  onClick?: () => void
  to?: string
  label: string
  children: ReactNode
}) {
  const className =
    'flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white/90 backdrop-blur-md'
  if (to) {
    return (
      <Link to={to} aria-label={label} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export function QuickTile({
  icon,
  label,
  onClick,
  to,
}: {
  icon: ReactNode
  label: string
  onClick?: () => void
  to?: string
}) {
  const className =
    'flex h-[4.6rem] w-[6.6rem] shrink-0 flex-col items-start justify-between rounded-[1.15rem] bg-[#1C1C1E] p-3 text-left'
  const inner = (
    <>
      <span className="text-white/80">{icon}</span>
      <span className="text-[12px] font-medium text-white/90">{label}</span>
    </>
  )
  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  )
}
