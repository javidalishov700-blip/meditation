import { useState, type ReactNode } from 'react'
import { CatalogGrid, ChipRow } from '../components/CoverCard'
import { CircleIconBtn, SearchSheet } from '../components/Sheets'
import { SOUND_TAB_IDS } from '../lib/catalog'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

type SoundTab = keyof typeof SOUND_TAB_IDS

const TABS: { id: SoundTab; label: StringKey; icon: ReactNode }[] = [
  {
    id: 'all',
    label: 'all_sounds',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 12v4M9 8v12M13 5v14M17 9v8M21 11v4" />
      </svg>
    ),
  },
  {
    id: 'music',
    label: 'all_music',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 18V6l10-2v12" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="16" r="2" />
      </svg>
    ),
  },
  {
    id: 'trending',
    label: 'trending',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 16l5-5 4 4 7-8" />
      </svg>
    ),
  },
  {
    id: 'focus',
    label: 'focus_mode',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
      </svg>
    ),
  },
  {
    id: 'sleep_music',
    label: 'sleep_music',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
      </svg>
    ),
  },
  {
    id: 'rain',
    label: 'rain_sounds',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 18v2M12 16v4M16 18v2M7 10a5 5 0 0 1 10 1c3 0 4 2 4 3.5S20 18 17 18H8c-3 0-4-2.2-4-3.8S5 10 8 10Z" />
      </svg>
    ),
  },
  {
    id: 'mystical',
    label: 'mystical',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4.5 13.4 9h4.8l-3.9 2.8 1.5 4.7L12 13.8 8.2 16.5l1.5-4.7L5.8 9h4.8L12 4.5Z" />
      </svg>
    ),
  },
  {
    id: 'radio',
    label: 'music_radio',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="8" width="16" height="11" rx="2" />
        <path d="m8 8 8-4" />
        <circle cx="9" cy="14" r="1.4" />
        <path d="M13 12h4M13 16h3" />
      </svg>
    ),
  },
  {
    id: 'meditative',
    label: 'meditative_music',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    id: 'nature',
    label: 'nature_sounds',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20V10" />
        <path d="M12 14c-4-1-6-4-7-8 5 0 8 2 9 5" />
        <path d="M12 13c4-1 6-4 7-8-5 0-8 2-9 5" />
      </svg>
    ),
  },
]

export function Sounds() {
  const { t } = useI18n()
  const [search, setSearch] = useState(false)
  const [tab, setTab] = useState<SoundTab>('all')

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

      <ChipRow active={tab} onPick={(id) => setTab(id as SoundTab)} items={TABS.map((c) => ({ id: c.id, label: t(c.label), icon: c.icon }))} />

      <h2 className="mt-7 text-[1.35rem] font-semibold tracking-tight">{t(TABS.find((c) => c.id === tab)!.label)}</h2>
      <CatalogGrid ids={SOUND_TAB_IDS[tab]} />

      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
