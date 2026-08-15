import { useState, type ReactNode } from 'react'
import { CatalogGrid, ChipRow } from '../components/CoverCard'
import { CircleIconBtn, SearchSheet } from '../components/Sheets'
import { SLEEP_TAB_IDS } from '../lib/catalog'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

type Tab = keyof typeof SLEEP_TAB_IDS

const TABS: { id: Tab; label: StringKey; icon: ReactNode }[] = [
  {
    id: 'sleep_med',
    label: 'sleep_med',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
      </svg>
    ),
  },
  {
    id: 'viz',
    label: 'viz_med',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 4.5 13.4 9h4.8l-3.9 2.8 1.5 4.7L12 13.8 8.2 16.5l1.5-4.7L5.8 9h4.8L12 4.5Z" />
      </svg>
    ),
  },
  {
    id: 'stories',
    label: 'sleep_stories',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 5h11v14H8A2 2 0 0 1 6 17V5Z" />
      </svg>
    ),
  },
  {
    id: 'sleep_sounds',
    label: 'sleep_sounds',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 12v4M9 8v12M13 5v14M17 9v8" />
      </svg>
    ),
  },
  {
    id: 'sleep_music',
    label: 'sleep_music',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 18V6l10-2v12" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="16" r="2" />
      </svg>
    ),
  },
  {
    id: 'kids',
    label: 'for_kids',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="3" />
        <path d="M6 19c1-3 3.2-5 6-5s5 2 6 5" />
      </svg>
    ),
  },
  {
    id: 'myth',
    label: 'myth_stories',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 18V8l4 3 4-5 4 5 4-3v10H4Z" />
      </svg>
    ),
  },
  {
    id: 'instrumental',
    label: 'instrumental',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 16c2-6 4-8 8-8s6 2 8 8" />
      </svg>
    ),
  },
  {
    id: 'noise',
    label: 'noise',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 12h2l2-4 3 8 3-10 2 6h4" />
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
    id: 'more',
    label: 'more_sleep',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="6" cy="12" r="1.4" />
        <circle cx="12" cy="12" r="1.4" />
        <circle cx="18" cy="12" r="1.4" />
      </svg>
    ),
  },
]

export function Sleep() {
  const { t } = useI18n()
  const [search, setSearch] = useState(false)
  const [tab, setTab] = useState<Tab>('sleep_med')

  return (
    <div className="pb-8">
      <header className="flex items-center justify-between pt-2">
        <h1 className="text-[2rem] font-semibold tracking-tight">{t('sleep_title')}</h1>
        <CircleIconBtn onClick={() => setSearch(true)} label={t('search')}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </CircleIconBtn>
      </header>

      <ChipRow active={tab} onPick={(id) => setTab(id as Tab)} items={TABS.map((c) => ({ id: c.id, label: t(c.label), icon: c.icon }))} />

      <h2 className="mt-7 text-[1.35rem] font-semibold tracking-tight">{t(TABS.find((c) => c.id === tab)!.label)}</h2>
      <CatalogGrid ids={SLEEP_TAB_IDS[tab]} />

      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
