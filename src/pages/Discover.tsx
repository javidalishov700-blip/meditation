import { useState, type ReactNode } from 'react'
import { CatalogGrid, ChipRow } from '../components/CoverCard'
import { CircleIconBtn, SearchSheet } from '../components/Sheets'
import { EXPLORE_TAB_IDS } from '../lib/catalog'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

type Tab = keyof typeof EXPLORE_TAB_IDS

const TABS: { id: Tab; label: StringKey; icon: ReactNode }[] = [
  {
    id: 'start',
    label: 'start_med',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4c-2 3-5 5-5 9a5 5 0 0 0 10 0c0-4-3-6-5-9Z" />
      </svg>
    ),
  },
  {
    id: 'programs',
    label: 'programs',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 5h12v14H8A3 3 0 0 1 5 16V8a3 3 0 0 1 3-3Z" />
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
    id: 'quick',
    label: 'chip_quick',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    id: 'talks',
    label: 'chip_talks',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 7h10v8H8l-3 3V7Z" />
        <path d="M15 9h4v7l-2.5-2H15" />
      </svg>
    ),
  },
  {
    id: 'work',
    label: 'chip_work',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="8" width="16" height="11" rx="2" />
        <path d="M9 8V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V8" />
      </svg>
    ),
  },
  {
    id: 'exercises',
    label: 'chip_exercises',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 14c3-8 7-8 9-8s6 0 9 8" />
      </svg>
    ),
  },
  {
    id: 'newsletter',
    label: 'chip_newsletter',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h16v12H4Z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    id: 'journeys',
    label: 'chip_journeys',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 19c4-2 6-8 7-14 2 5 5 9 7 14" />
      </svg>
    ),
  },
  {
    id: 'guide',
    label: 'chip_guide',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 4h9l3 3v13H6Z" />
        <path d="M9 10h6M9 14h4" />
      </svg>
    ),
  },
  {
    id: 'podcast',
    label: 'chip_podcast',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="10" r="3" />
        <path d="M8 10a4 4 0 0 0 8 0M12 13v5M9 18h6" />
      </svg>
    ),
  },
]

export function Discover() {
  const { t } = useI18n()
  const [search, setSearch] = useState(false)
  const [tab, setTab] = useState<Tab>('start')

  return (
    <div className="pb-8">
      <header className="flex items-center justify-between pt-2">
        <h1 className="text-[2rem] font-semibold tracking-tight">{t('disc_title')}</h1>
        <CircleIconBtn onClick={() => setSearch(true)} label={t('search')}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </CircleIconBtn>
      </header>

      <ChipRow active={tab} onPick={(id) => setTab(id as Tab)} items={TABS.map((c) => ({ id: c.id, label: t(c.label), icon: c.icon }))} />

      <h2 className="mt-7 text-[1.35rem] font-semibold tracking-tight">{t(TABS.find((c) => c.id === tab)!.label)}</h2>
      <CatalogGrid ids={EXPLORE_TAB_IDS[tab]} />

      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
