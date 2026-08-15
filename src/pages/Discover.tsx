import { useState } from 'react'
import { CoverCard, ChipRow, Rail } from '../components/CoverCard'
import { CircleIconBtn, SearchSheet } from '../components/Sheets'
import { groupItems, hrefFor, itemTitle } from '../lib/catalog'
import { useI18n } from '../lib/i18n'

export function Discover() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState(false)
  const [chip, setChip] = useState('start')
  const start = groupItems('start')
  const programs = groupItems('programs')
  const sleep = groupItems('sleep')

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

      <ChipRow
        active={chip}
        onPick={setChip}
        items={[
          {
            id: 'start',
            label: t('start_med'),
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 4c-2 3-5 5-5 9a5 5 0 0 0 10 0c0-4-3-6-5-9Z" />
              </svg>
            ),
          },
          {
            id: 'programs',
            label: t('programs'),
            icon: (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M8 5h12v14H8A3 3 0 0 1 5 16V8a3 3 0 0 1 3-3Z" />
              </svg>
            ),
          },
        ]}
      />

      <Rail title={t('start_med')} toAll="/practice">
        {(chip === 'programs' ? programs : start).map((item, i) => (
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

      <Rail title={t('programs')} toAll="/treat">
        {programs.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.4}
          />
        ))}
      </Rail>

      <Rail title={t('cat_stories')} toAll="/sleep">
        {sleep.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.2}
          />
        ))}
      </Rail>

      <SearchSheet open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
