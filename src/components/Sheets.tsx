import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { hrefFor, itemTitle, searchCatalog, searchQuotes } from '../lib/catalog'
import { LangPicker } from './LangPicker'
import { readFavorites, type FavItem } from '../lib/favorites'
import { useI18n } from '../lib/i18n'
import { MOODS, MOOD_KEYS, readMood, writeMood, type MoodId } from '../lib/mood'

export function SearchSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useI18n()
  const [q, setQ] = useState('')
  const items = useMemo(() => (q.trim() ? searchCatalog(q, locale) : []), [q, locale])
  const lines = useMemo(() => (q.trim() ? searchQuotes(q, locale) : []), [q, locale])

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] bg-black/92 px-5 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-lg flex-col">
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
        <div className="mt-5 flex-1 overflow-y-auto pb-10">
          {q.trim() && items.length === 0 && lines.length === 0 ? (
            <p className="text-sm text-white/45">{t('no_results')}</p>
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
    </div>
  )
}

export function LangSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55" onClick={onClose}>
      <div
        className="sheet-up w-full max-w-lg rounded-t-[1.6rem] bg-[#1C1C1E] px-5 pb-[max(1.4rem,env(safe-area-inset-bottom))] pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
        <p className="text-lg font-semibold">{t('lang_now')}</p>
        <div className="mt-4">
          <LangPicker onPick={onClose} />
        </div>
      </div>
    </div>
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
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55" onClick={onClose}>
      <div
        className="sheet-up w-full max-w-lg rounded-t-[1.6rem] bg-[#1C1C1E] px-5 pb-[max(1.4rem,env(safe-area-inset-bottom))] pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
        <p className="text-lg font-semibold">{t('mood_check')}</p>
        <div className="mt-4 grid grid-cols-1 gap-2">
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
      </div>
    </div>
  )
}

export function FavSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const [items, setItems] = useState<FavItem[]>([])
  useEffect(() => {
    if (open) setItems(readFavorites())
  }, [open])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55" onClick={onClose}>
      <div
        className="sheet-up max-h-[78dvh] w-full max-w-lg overflow-y-auto rounded-t-[1.6rem] bg-[#1C1C1E] px-5 pb-[max(1.4rem,env(safe-area-inset-bottom))] pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
        <p className="text-lg font-semibold">{t('favorites')}</p>
        {items.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-white/45">{t('fav_empty')}</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {items.map((f) => (
              <li key={f.to}>
                <Link to={f.to} onClick={onClose} className="flex items-center gap-3 rounded-2xl bg-black/30 p-2">
                  <img src={f.cover} alt="" className="h-14 w-11 rounded-xl object-cover" />
                  <span className="text-sm font-medium">{f.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function PremiumBanner() {
  const { t } = useI18n()
  const [hidden, setHidden] = useState(() => localStorage.getItem('steady.bannerOff') === '1')
  if (hidden) return null
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
            localStorage.setItem('steady.bannerOff', '1')
            setHidden(true)
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
  children: React.ReactNode
}) {
  const className =
    'flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/90'
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
  icon: React.ReactNode
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
