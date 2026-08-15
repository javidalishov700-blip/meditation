import { useState } from 'react'
import { CoverCard, ChipRow, Rail } from '../components/CoverCard'
import { CircleIconBtn, SearchSheet } from '../components/Sheets'
import { groupItems, hrefFor } from '../lib/catalog'
import { useI18n } from '../lib/i18n'

export function Sleep() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState(false)
  const [chip, setChip] = useState('sleep')
  const sleep = groupItems('sleep')
  const viz = groupItems('viz')

  return (
    <div className="pb-8">
      <header className="flex items-center justify-between pt-2">
        <h1 className="text-[2rem] font-semibold tracking-tight">{t('sleep_title')}</h1>
        <div className="flex gap-2">
          <CircleIconBtn onClick={() => setSearch(true)} label={t('search')}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </CircleIconBtn>
        </div>
      </header>

      <ChipRow
        active={chip}
        onPick={setChip}
        items={[
          {
            id: 'sleep',
            label: t('sleep_med'),
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
              </svg>
            ),
          },
          {
            id: 'viz',
            label: t('viz_med'),
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 4.5 13.4 9h4.8l-3.9 2.8 1.5 4.7L12 13.8 8.2 16.5l1.5-4.7L5.8 9h4.8L12 4.5Z" />
              </svg>
            ),
          },
        ]}
      />

      <Rail title={t('sleep_med')} toAll="/sleep">
        {(chip === 'viz' ? viz : sleep).map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={item.title[locale]}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i}
          />
        ))}
      </Rail>

      <Rail title={t('viz_med')}>
        {viz.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={item.title[locale]}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.5}
          />
        ))}
      </Rail>

      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
