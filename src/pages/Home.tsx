import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CoverCard, Rail } from '../components/CoverCard'
import { DailyRitual } from '../components/DailyRitual'
import { SkyScene, skyPhase, type SkyPhase } from '../components/SkyScene'
import { CircleIconBtn, FavSheet, MoodSheet, QuickTile, SearchSheet } from '../components/Sheets'
import { MoodHistory } from '../components/MoodHistory'
import { BREATH_RAIL_IDS, CLARITY_COVER, SOUND_RAIL_IDS, hrefFor, itemMinutes, itemTitle, itemsById, nowIds } from '../lib/catalog'
import { locLibrary } from '../lib/copy'
import { todaysClarity } from '../lib/library'
import { activityStats, canApplyFreeze, formatLongDate } from '../lib/activity'
import { isPro, quoteFree } from '../lib/entitlement'
import { useI18n } from '../lib/i18n'
import { MOOD_KEYS, MOOD_TINT, readMood, type MoodId } from '../lib/mood'
import { readOnboard } from '../lib/onboard'
import { quotes } from '../lib/quotes'
import { isLoading, isSpeaking, speak, stopSpeak, subscribeSpeak } from '../lib/speech'
import { readDim, writeDim } from '../lib/theme'

const GREET: Record<SkyPhase, 'greet_morning' | 'greet_day' | 'greet_evening' | 'greet_night'> = {
  dawn: 'greet_morning',
  day: 'greet_day',
  dusk: 'greet_evening',
  night: 'greet_night',
}

export function Home() {
  const { t, locale, meta } = useI18n()
  const navigate = useNavigate()
  const pro = isPro()
  const [slide, setSlide] = useState(0)
  const [search, setSearch] = useState(false)
  const [moodOpen, setMoodOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [mood, setMood] = useState<MoodId | null>(() => readMood())
  const [dim, setDim] = useState(() => readDim())
  const [reading, setReading] = useState(() => isSpeaking() || isLoading())
  const stats = activityStats()
  const [phase] = useState(() => skyPhase())
  const name = readOnboard().name?.trim()
  // A freeze is only worth offering to someone who had a streak to save.
  const restoreStreak = canApplyFreeze() && stats.activeDays > 0

  const start = Math.floor(Date.now() / 86_400_000) % quotes.length
  const slides = [0, 1, 2, 3, 4].map((i) => quotes[(start + i) % quotes.length]!)

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 8000)
    return () => window.clearInterval(id)
  }, [slides.length])

  useEffect(() => subscribeSpeak(() => setReading(isSpeaking() || isLoading())), [])

  const now = itemsById(nowIds(mood, new Date().getHours()))
  const sounds = itemsById([...SOUND_RAIL_IDS])
  const breaths = itemsById([...BREATH_RAIL_IDS])
  const today = locLibrary(todaysClarity(), locale)

  return (
    <div className="pb-6">
      <section className="keep-dark relative -mx-5 -mt-[calc(2.15rem+env(safe-area-inset-top))] min-h-[26.5rem] overflow-hidden rounded-b-[1.85rem]">
        <SkyScene phase={phase} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />

        <header className="relative z-10 flex items-center justify-between gap-3 px-5 pt-[calc(1.6rem+env(safe-area-inset-top))]">
          <p className="min-w-0 truncate text-[13px] font-medium tracking-[0.02em] text-white/80">
            {t(GREET[phase])} · <span className="capitalize">{formatLongDate(new Date(), locale)}</span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <CircleIconBtn
              label={t('dim')}
              onClick={() => {
                const next = !dim
                writeDim(next)
                setDim(next)
              }}
            >
              <svg viewBox="0 0 24 24" className={`h-4 w-4 ${dim ? 'text-[#C4B5FD]' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
              </svg>
            </CircleIconBtn>
            <div className="relative">
              <CircleIconBtn to="/me" label={t('current_streak')}>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 ${restoreStreak ? 'text-[#9BD7FF]' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M13 3 6 13h6l-1 8 8-12h-6l0-6Z" />
                </svg>
              </CircleIconBtn>
              {stats.currentStreak > 0 || restoreStreak ? (
                <span
                  className={`absolute -right-0.5 -top-0.5 min-w-[1.1rem] rounded-full px-1 text-center text-[10px] font-semibold leading-[1.1rem] ${
                    restoreStreak ? 'bg-[#9BD7FF] text-black' : 'bg-gradient-to-br from-[#FBBF24] to-[#F97316] text-black'
                  }`}
                >
                  {stats.currentStreak}
                </span>
              ) : null}
            </div>
            <CircleIconBtn onClick={() => setSearch(true)} label={t('search')}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
            </CircleIconBtn>
          </div>
        </header>

        <div className="relative z-10 px-5 pt-5">
          <h1 className="font-display text-[2.15rem] font-semibold leading-tight tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
            {name ? t('hello_name', { n: name }) : t('hello')}
          </h1>
          <button
            type="button"
            onClick={() => setMoodOpen(true)}
            className="mt-4 flex w-full max-w-[17.5rem] items-center gap-3 rounded-[1.1rem] border border-white/15 bg-white/[0.11] px-3 py-2.5 text-left backdrop-blur-md"
          >
            <span className={`tint ${mood ? MOOD_TINT[mood] : 'tint-peach'} flex h-9 w-9 shrink-0 items-center justify-center rounded-full`}>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M8.5 14.2c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8M9.2 10h.01M14.8 10h.01" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11.5px] leading-4 text-white/70">{t('mood_today')}</span>
              <span className="block truncate text-[15px] font-medium leading-5 text-white">{mood ? t(MOOD_KEYS[mood]) : t('mood_ask')}</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/70" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="relative z-10 px-5 pb-11 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">{t('home_quote')}</p>
          <p key={slides[slide]!.id} className="sheet-up mt-2 max-w-[20rem] font-display text-[1.3rem] font-medium leading-snug text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
            {slides[slide]!.text[locale]}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#1e1b4b] shadow-[0_8px_22px_rgba(0,0,0,0.25)]"
              onClick={() => {
                const line = slides[slide]!
                if (reading) {
                  stopSpeak()
                  return
                }
                if (!pro && !quoteFree(line.id)) {
                  navigate('/paywall')
                  return
                }
                speak(line.text[locale], { lang: meta.bcp47, clipId: `quote:${line.id}` })
              }}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M4 9v6h4l5 4V5L8 9H4Zm13.5 3a5.5 5.5 0 0 0-3-4.9v9.8a5.5 5.5 0 0 0 3-4.9Z" />
              </svg>
              {reading ? (isLoading() ? t('voice_loading') : t('speak_stop')) : t('listen')}
            </button>
            <Link
              to="/quotes"
              className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-md"
            >
              {t('view_details')}
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-3 z-10 flex gap-1.5">
          {slides.map((line, i) => (
            <button
              key={line.id}
              type="button"
              aria-label={line.author}
              onClick={() => setSlide(i)}
              className={`hero-seg flex-1 ${i === slide ? 'on' : ''}`}
            />
          ))}
        </div>
      </section>

      <div className="-mx-5 mt-5 flex gap-2.5 overflow-x-auto px-5 hide-scroll">
        <QuickTile
          tone="tint-coral"
          to="/sos"
          label={t('sos_short')}
          icon={
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
          }
        />
        <QuickTile
          tone="tint-sky"
          to="/breath"
          label={t('breathing')}
          icon={
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 14c3-8 7-8 9-8s6 0 9 8" />
            </svg>
          }
        />
        <QuickTile
          tone="tint-amber"
          to="/session/extra/three-objects"
          label={t('more_objects')}
          icon={
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="6" height="6" rx="1.2" />
              <rect x="14" y="4" width="6" height="6" rx="1.2" />
              <rect x="9" y="14" width="6" height="6" rx="1.2" />
            </svg>
          }
        />
        <QuickTile
          tone="tint-pink"
          label={t('favorites')}
          onClick={() => setFavOpen(true)}
          icon={
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19s-7-4.4-7-9.1A4 4 0 0 1 12 7a4 4 0 0 1 7 2.9C19 14.6 12 19 12 19Z" />
            </svg>
          }
        />
        <QuickTile
          tone="tint-violet"
          to="/treat"
          label={t('treat_title')}
          icon={
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="3.5" width="12" height="17" rx="1.4" />
              <path d="M14.5 12h.01" />
            </svg>
          }
        />
      </div>

      <DailyRitual onMood={() => setMoodOpen(true)} sessionTo={`/session/clarity/${today.id}`} />

      <section className="mt-8">
        <h2 className="text-[1.35rem] font-semibold tracking-tight">{t('cat_clarity')}</h2>
        <div className="mt-4">
          <CoverCard
            to={`/session/clarity/${today.id}`}
            cover={CLARITY_COVER}
            title={today.title}
            minutes={today.minutes}
            fill
          />
        </div>
      </section>

      <Rail title={t('now_rail')}>
        {now.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            favTo={item.to}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={itemMinutes(item, locale)}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.2}
            wide={i === 0}
          />
        ))}
      </Rail>

      <MoodHistory />

      <Rail title={t('breath_rail')} toAll="/breath">
        {breaths.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            favTo={item.to}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={itemMinutes(item, locale)}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 0.8}
          />
        ))}
      </Rail>

      <Rail title={t('nav_sounds')} toAll="/sounds">
        {sounds.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            favTo={item.to}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={itemMinutes(item, locale)}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i}
          />
        ))}
      </Rail>

      <SearchSheet open={search} onClose={() => setSearch(false)} />
      <MoodSheet open={moodOpen} onClose={() => setMoodOpen(false)} onPick={setMood} />
      <FavSheet open={favOpen} onClose={() => setFavOpen(false)} />
    </div>
  )
}
