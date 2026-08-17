import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { hrefFor, itemTitle, itemsById, type BadgeKind } from '../lib/catalog'
import { isFavorite, STEADY_FAV_EVENT, toggleFavorite } from '../lib/favorites'
import { audio } from '../lib/audio'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

const BADGE_KEY: Record<BadgeKind, StringKey> = {
  journey: 'chip_journey',
  program: 'chip_program',
  sleep: 'chip_sleep',
  music: 'chip_music',
  sound: 'chip_sound',
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export function CoverCard({
  to,
  cover,
  title,
  minutes,
  badge,
  locked,
  wide = false,
  fill = false,
  kenDelay = 0,
  favTo,
}: {
  to: string
  cover: string
  title: string
  minutes?: number
  badge?: BadgeKind
  locked?: boolean
  wide?: boolean
  fill?: boolean
  kenDelay?: number
  favTo?: string
}) {
  const { t } = useI18n()
  const [flash, setFlash] = useState(false)
  const [broken, setBroken] = useState(false)
  const favKey = favTo || to
  const [saved, setSaved] = useState(() => isFavorite(favKey))

  useEffect(() => {
    const sync = () => setSaved(isFavorite(favKey))
    sync()
    window.addEventListener(STEADY_FAV_EVENT, sync)
    return () => window.removeEventListener(STEADY_FAV_EVENT, sync)
  }, [favKey])

  function save() {
    toggleFavorite({ to: favKey, title, cover })
    setFlash(true)
    window.setTimeout(() => setFlash(false), 1400)
  }

  const box = fill
    ? 'aspect-[3/4] w-full'
    : wide
      ? 'h-[10.5rem] w-[16.5rem] shrink-0 snap-start'
      : 'h-[15.6rem] w-[10.6rem] shrink-0 snap-start'

  return (
    <div className={`cover-card keep-dark relative overflow-hidden rounded-[1.45rem] ${box}`}>
      <Link
        to={to}
        className="absolute inset-0 block touch-manipulation"
        onPointerDown={() => audio.unlock()}
        onContextMenu={(e) => {
          e.preventDefault()
          save()
        }}
      >
        {broken ? (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4c3a78] via-[#2a1650] to-[#120c1c]" />
        ) : (
          <img
            src={cover}
            alt=""
            draggable={false}
            className="cover-ken pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ animationDelay: `${kenDelay}s` }}
            onError={() => setBroken(true)}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
        {badge ? (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center rounded-full bg-black/35 px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-white/95 backdrop-blur-md">
            {t(BADGE_KEY[badge])}
          </span>
        ) : null}
        {locked ? (
          <span className="absolute right-12 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 backdrop-blur-md">
            <LockIcon />
          </span>
        ) : null}
        <div className="pointer-events-none absolute inset-x-3 bottom-3">
          {minutes != null ? (
            <p className="mb-1 flex items-center gap-1 text-[11px] text-white/80">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l2.5 1.5" />
              </svg>
              {t('min_n', { n: minutes })}
            </p>
          ) : null}
          <p className="text-[15px] font-semibold leading-snug text-white">{title}</p>
        </div>
        {flash ? (
          <span className="absolute inset-x-3 top-12 rounded-full bg-black/55 py-1 text-center text-[11px] text-white backdrop-blur-md">
            {saved ? t('saved') : t('favorites')}
          </span>
        ) : null}
      </Link>
      <button
        type="button"
        aria-label={t('favorites')}
        aria-pressed={saved}
        className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md ${
          saved ? 'bg-black/45 text-[#F472B6]' : 'bg-black/35 text-white/90'
        }`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          save()
        }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7">
          <path d="M12 19s-7-4.4-7-9.1A4 4 0 0 1 12 7a4 4 0 0 1 7 2.9C19 14.6 12 19 12 19Z" />
        </svg>
      </button>
    </div>
  )
}

export function Rail({
  title,
  toAll,
  children,
}: {
  title: string
  toAll?: string
  children: ReactNode
}) {
  const { t } = useI18n()
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between">
        <h2 className="text-[1.35rem] font-semibold tracking-tight">{title}</h2>
        {toAll ? (
          <Link to={toAll} className="text-sm text-white/45">
            {t('view_all_short')}
          </Link>
        ) : null}
      </div>
      <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-1 snap-x snap-mandatory hide-scroll">
        {children}
      </div>
    </section>
  )
}

export function CatalogGrid({ ids }: { ids: readonly string[] | string[] }) {
  const { locale } = useI18n()
  const row = itemsById([...ids])
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {row.map((item, i) => (
        <CoverCard
          key={item.id}
          to={hrefFor(item)}
          favTo={item.to}
          cover={item.cover}
          title={itemTitle(item, locale)}
          minutes={item.minutes}
          badge={item.badge}
          locked={hrefFor(item) === '/paywall'}
          kenDelay={i * 0.4}
          fill
        />
      ))}
    </div>
  )
}

export function ChipRow({
  items,
  active,
  onPick,
}: {
  items: { id: string; label: string; icon: ReactNode }[]
  active: string
  onPick: (id: string) => void
}) {
  return (
    <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 hide-scroll">
      {items.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onPick(c.id)}
          className={`chip inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm ${
            active === c.id ? 'chip-on' : 'chip-off'
          }`}
        >
          {c.icon}
          {c.label}
        </button>
      ))}
    </div>
  )
}
