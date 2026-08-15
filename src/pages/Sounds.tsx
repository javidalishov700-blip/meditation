import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CoverCard, ChipRow, Rail } from '../components/CoverCard'
import { CircleIconBtn, SearchSheet } from '../components/Sheets'
import { groupItems, hrefFor, itemTitle, ITEMS } from '../lib/catalog'
import { canAccess } from '../lib/entitlement'
import { useI18n } from '../lib/i18n'

const FRESH_IDS = [
  'nat-storm',
  'nat-river',
  'nat-birds',
  'nat-cafe',
  'nat-snow',
  'nat-bowl',
  'nat-fan',
  'nat-waves',
  'nat-piano',
  'nat-forest',
  'nat-fire',
]

export function Sounds() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState(false)
  const [chip, setChip] = useState('sounds')
  const sounds = groupItems('sounds')
  const music = groupItems('music')
  const fresh = FRESH_IDS.map((id) => ITEMS.find((i) => i.id === id)).filter((i): i is (typeof ITEMS)[number] => Boolean(i))
  const rainOpen = canAccess('nature', 'rain')
  const timerTo = canAccess('tone', '174') ? '/session/tone/174' : '/paywall'
  const row = chip === 'music' ? music : chip === 'trend' ? fresh : sounds

  return (
    <div className="pb-8">
      <header className="relative flex items-center justify-center pt-2">
        <h1 className="text-[1.35rem] font-medium tracking-tight">{t('nav_sounds')}</h1>
        <span className="absolute right-0">
          <CircleIconBtn onClick={() => setSearch(true)} label={t('search')}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </CircleIconBtn>
        </span>
      </header>

      <ChipRow
        active={chip}
        onPick={setChip}
        items={[
          {
            id: 'sounds',
            label: t('all_sounds'),
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 12v3M10 8v11M14 5v14M18 9v8" />
              </svg>
            ),
          },
          {
            id: 'music',
            label: t('all_music'),
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 18V6l10-2v12" />
                <circle cx="7" cy="18" r="2.4" />
                <circle cx="17" cy="16" r="2.4" />
              </svg>
            ),
          },
          {
            id: 'trend',
            label: t('trending'),
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 4.5 13.4 9h4.8l-3.9 2.8 1.5 4.7L12 13.8 8.2 16.5l1.5-4.7L5.8 9h4.8L12 4.5Z" />
              </svg>
            ),
          },
        ]}
      />

      <Rail title={chip === 'music' ? t('all_music') : chip === 'trend' ? t('new_sounds') : t('all_sounds')}>
        {chip === 'sounds' ? (
          <Link
            to={timerTo}
            className="relative h-[15.6rem] w-[10.6rem] shrink-0 overflow-hidden rounded-[1.45rem] bg-[#0b1b33]"
          >
            <div className="timer-ring absolute left-1/2 top-[42%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-white/95 backdrop-blur-md">
              {t('relaxing')}
            </span>
            <p className="absolute inset-x-3 bottom-3 text-[15px] font-semibold text-white">{t('timer')}</p>
          </Link>
        ) : null}
        {chip === 'sounds' ? (
          <CoverCard
            to={rainOpen ? '/session/nature/storm' : '/paywall'}
            cover="/covers/cover-clouds.png"
            title={t('thunder_rain')}
            badge="sound"
            locked={!rainOpen}
          />
        ) : null}
        {row.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i}
          />
        ))}
      </Rail>

      <Rail title={t('new_sounds')} toAll="/sounds">
        {fresh.map((item, i) => (
          <CoverCard
            key={`f-${item.id}`}
            to={hrefFor(item)}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 0.8}
            wide={i % 4 === 0}
          />
        ))}
      </Rail>

      <Rail title={t('all_music')} toAll="/sounds">
        {music.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.3}
          />
        ))}
      </Rail>

      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
