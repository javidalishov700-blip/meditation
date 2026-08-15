import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CoverCard, Rail } from '../components/CoverCard'
import { CircleIconBtn, FavSheet, MoodSheet, QuickTile, SearchSheet } from '../components/Sheets'
import {
  FOR_YOU_IDS,
  HERO_COVERS,
  ITEMS,
  TONIGHT_IDS,
  groupItems,
  hrefFor,
  itemsById,
} from '../lib/catalog'
import { activityStats, formatLongDate } from '../lib/activity'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'
import { MOOD_KEYS, readMood, type MoodId } from '../lib/mood'
import { quotes } from '../lib/quotes'
import { isSpeaking, speak, stopSpeak, subscribeSpeak } from '../lib/speech'

export function Home() {
  const { t, locale, meta } = useI18n()
  const { trial, trialEndsAt } = useEntitlement()
  const [slide, setSlide] = useState(0)
  const [search, setSearch] = useState(false)
  const [moodOpen, setMoodOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [mood, setMood] = useState<MoodId | null>(() => readMood())
  const [reading, setReading] = useState(() => isSpeaking())
  const stats = activityStats()

  const start = Math.floor(Date.now() / 86_400_000) % quotes.length
  const slides = [0, 1, 2, 3, 4].map((i) => quotes[(start + i) % quotes.length]!)

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 8000)
    return () => window.clearInterval(id)
  }, [slides.length])

  useEffect(() => subscribeSpeak(() => setReading(isSpeaking())), [])

  const ms = trialEndsAt - Date.now()
  const trialLine =
    trial && ms > 0
      ? ms < 86_400_000
        ? t('me_trial_today')
        : t('me_trial', { n: Math.ceil(ms / 86_400_000) })
      : null

  const daily = ITEMS.filter((i) =>
    ['story-lighthouse', 'breath-wave', 'med-body', 'write-wave', 'nat-rain', 'nat-piano'].includes(i.id),
  )
  const tonight = itemsById([...TONIGHT_IDS])
  const forYou = itemsById(
    mood ? FOR_YOU_IDS[mood] ?? FOR_YOU_IDS.calm! : ['nat-rain', 'story-lighthouse', 'breath-wave', 'nat-piano', 'med-body', 'nat-ocean'],
  )
  const programs = groupItems('programs')

  return (
    <div className="pb-6">
      <header className="flex items-start justify-between gap-3 pt-2">
        <div>
          <p className="text-[11px] tracking-[0.16em] text-[#C4B5FD]/75">{t('home_kicker')}</p>
          <p className="mt-1 text-[1.65rem] font-semibold leading-none tracking-tight">{t('hello')}</p>
          <button type="button" onClick={() => setMoodOpen(true)} className="mt-2 flex items-center gap-1 text-sm text-white/55">
            {mood ? t(MOOD_KEYS[mood]) : t('mood_check')}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 10l5 5 5-5" />
            </svg>
          </button>
          {trialLine ? <p className="mt-1 text-[11px] text-[#C4B5FD]/80">{trialLine}</p> : null}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="relative">
            <CircleIconBtn to="/me" label={t('current_streak')}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M13 3 6 13h6l-1 8 8-12h-6l0-6Z" />
              </svg>
            </CircleIconBtn>
            <span className="absolute -right-0.5 -top-0.5 min-w-[1rem] rounded-full bg-white/15 px-1 text-center text-[9px] text-white">
              {stats.currentStreak}
            </span>
          </div>
          <CircleIconBtn onClick={() => setSearch(true)} label={t('search')}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </CircleIconBtn>
        </div>
      </header>

      <section className="relative mt-5 overflow-hidden rounded-[1.6rem]">
        {slides.map((line, i) => (
          <div
            key={line.id}
            className={`relative ${i === slide ? 'block' : 'hidden'}`}
            style={{ minHeight: '15.2rem' }}
          >
            <img
              src={HERO_COVERS[i % HERO_COVERS.length]!}
              alt=""
              className="cover-ken absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/28 to-black/10" />
            <div className="relative flex min-h-[15.2rem] flex-col justify-end px-5 pb-9 pt-10">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">{t('home_quote')}</p>
              <p className="mt-2 max-w-[19rem] text-[1.05rem] font-medium leading-snug text-white">{line.text[locale]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/18 px-3.5 py-1.5 text-[12px] text-white backdrop-blur-md"
                  onClick={() => {
                    if (reading) {
                      stopSpeak()
                      return
                    }
                    speak(line.text[locale], { lang: meta.bcp47 })
                  }}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                    <path d="M4 9v6h4l5 4V5L8 9H4Zm13.5 3a5.5 5.5 0 0 0-3-4.9v9.8a5.5 5.5 0 0 0 3-4.9Z" />
                  </svg>
                  {reading ? t('speak_stop') : t('listen')}
                </button>
                <Link
                  to="/quotes"
                  className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] text-white backdrop-blur-md"
                >
                  {t('view_details')}
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute inset-x-5 bottom-3 flex gap-1.5">
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
          label={t('favorites')}
          onClick={() => setFavOpen(true)}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 19s-7-4.4-7-9.1A4 4 0 0 1 12 7a4 4 0 0 1 7 2.9C19 14.6 12 19 12 19Z" />
            </svg>
          }
        />
        <QuickTile
          label={t('mood_check')}
          onClick={() => setMoodOpen(true)}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 6h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9l-4 3V6Z" />
              <path d="M9 11h.01M12 11h.01M15 11h.01" />
            </svg>
          }
        />
        <QuickTile
          to="/session/breath/wave"
          label={t('breathing')}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 14c3-8 7-8 9-8s6 0 9 8" />
            </svg>
          }
        />
        <QuickTile
          to="/sleep"
          label={t('nav_sleep')}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
            </svg>
          }
        />
        <QuickTile
          to="/sounds"
          label={t('nav_sounds')}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12v4M9 8v12M13 5v14M17 9v8" />
            </svg>
          }
        />
        <QuickTile
          to="/sos"
          label={t('sos_short')}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
          }
        />
      </div>

      <section className="mt-8">
        <h2 className="text-[1.45rem] font-semibold tracking-tight">{t('daily_rec')}</h2>
        <p className="mt-1 text-sm text-white/40">{formatLongDate(new Date(), locale)}</p>
        <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 hide-scroll snap-x snap-mandatory">
          {daily.map((item, i) => (
            <CoverCard
              key={item.id}
              to={hrefFor(item)}
              cover={item.cover}
              title={item.title[locale]}
              minutes={item.minutes}
              badge={item.badge}
              locked={hrefFor(item) === '/paywall'}
              kenDelay={i * 2}
            />
          ))}
        </div>
      </section>

      <Rail title={t('for_you')}>
        {forYou.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={item.title[locale]}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.2}
            wide={i === 0}
          />
        ))}
      </Rail>
      <p className="-mt-2 text-sm text-white/35">{t('for_you_sub')}</p>

      <Rail title={t('tonight')} toAll="/sounds">
        {tonight.map((item, i) => (
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
      <p className="-mt-2 text-sm text-white/35">{t('tonight_sub')}</p>

      <Rail title={t('programs')} toAll="/treat">
        {programs.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={item.title[locale]}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.4}
          />
        ))}
      </Rail>

      <SearchSheet open={search} onClose={() => setSearch(false)} />
      <MoodSheet open={moodOpen} onClose={() => setMoodOpen(false)} onPick={setMood} />
      <FavSheet open={favOpen} onClose={() => setFavOpen(false)} />
    </div>
  )
}
