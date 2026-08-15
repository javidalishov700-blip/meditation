import { useState, type ReactNode } from 'react'
import { CoverCard, ChipRow } from '../components/CoverCard'
import { CircleIconBtn, SearchSheet } from '../components/Sheets'
import { SOUND_TAB_IDS, hrefFor, itemTitle, itemsById } from '../lib/catalog'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

type SoundTab = keyof typeof SOUND_TAB_IDS

const TABS: { id: SoundTab; label: StringKey; icon: ReactNode }[] = [
  {
    id: 'natural',
    label: 'tab_natural',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20V10" />
        <path d="M12 14c-4-1-6-4-7-8 5 0 8 2 9 5" />
        <path d="M12 13c4-1 6-4 7-8-5 0-8 2-9 5" />
      </svg>
    ),
  },
  {
    id: 'meditation',
    label: 'tab_meditation',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    id: 'tones',
    label: 'tab_tones',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 14c3-8 7-8 9-8s6 0 9 8" />
      </svg>
    ),
  },
  {
    id: 'indoor',
    label: 'tab_indoor',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 11 12 4l8 7v9H4Z" />
      </svg>
    ),
  },
]

export function Sounds() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState(false)
  const [tab, setTab] = useState<SoundTab>('natural')
  const row = itemsById([...SOUND_TAB_IDS[tab]])

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
        active={tab}
        onPick={(id) => setTab(id as SoundTab)}
        items={TABS.map((c) => ({ id: c.id, label: t(c.label), icon: c.icon }))}
      />

      <h2 className="mt-7 text-[1.35rem] font-semibold tracking-tight">{t(TABS.find((c) => c.id === tab)!.label)}</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {row.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
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

      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
