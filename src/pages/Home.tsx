import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CoverCard, Rail } from '../components/CoverCard'
import { CircleIconBtn, FavSheet, LangSheet, MoodSheet, QuickTile, SearchSheet } from '../components/Sheets'
import { MoodHistory } from '../components/MoodHistory'
import { Presence } from '../components/Presence'
import { BREATH_RAIL_IDS, HERO_COVERS, SOUND_RAIL_IDS, hrefFor, itemTitle, itemsById, nowIds } from '../lib/catalog'
import { activityStats } from '../lib/activity'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'
import { MOOD_KEYS, readMood, type MoodId } from '../lib/mood'
import { quotes } from '../lib/quotes'
import { isLoading, isSpeaking, speak, stopSpeak, subscribeSpeak } from '../lib/speech'

function readDim() {
  try {
    return localStorage.getItem('steady.dim') === '1'
  } catch {
    return false
  }
}

function writeDim(on: boolean) {
  try {
    localStorage.setItem('steady.dim', on ? '1' : '0')
  } catch {
    /* ignore */
  }
  document.documentElement.classList.toggle('dim', on)
}

export function Home() {
  const { t, locale, meta } = useI18n()
  const { trial, trialEndsAt } = useEntitlement()
  const [slide, setSlide] = useState(0)
  const [search, setSearch] = useState(false)
  const [moodOpen, setMoodOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [mood, setMood] = useState<MoodId | null>(() => readMood())
  const [dim, setDim] = useState(() => readDim())
  const [reading, setReading] = useState(() => isSpeaking() || isLoading())
  const stats = activityStats()

  const start = Math.floor(Date.now() / 86_400_000) % quotes.length
  const slides = [0, 1, 2, 3, 4].map((i) => quotes[(start + i) % quotes.length]!)

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 8000)
    return () => window.clearInterval(id)
  }, [slides.length])

  useEffect(() => subscribeSpeak(() => setReading(isSpeaking() || isLoading())), [])

  const ms = trialEndsAt - Date.now()
  const trialLine =
    trial && ms > 0
      ? ms < 86_400_000
        ? t('me_trial_today')
        : t('me_trial', { n: Math.ceil(ms / 86_400_000) })
      : null

  const now = itemsById(nowIds(mood, new Date().getHours()))
  const sounds = itemsById([...SOUND_RAIL_IDS])
  const breaths = itemsById([...BREATH_RAIL_IDS])

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
          <button
            type="button"
            onClick={() => setLangOpen(true)}
            className="mt-2 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/85"
            aria-label={t('lang_now')}
          >
            {meta.native}
          </button>
          {trialLine ? <p className="mt-1 text-[11px] text-[#C4B5FD]/80">{trialLine}</p> : null}
        </div>
        <div className="flex items-center gap-2 pt-1">
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

      <section className="relative mt-5 overflow-hidden rounded-[1.6rem] keep-dark">
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
          to="/sos"
          label={t('sos_short')}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v5M12 16h.01" />
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
          to="/session/extra/three-objects"
          label={t('more_objects')}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="4" y="4" width="6" height="6" rx="1.2" />
              <rect x="14" y="4" width="6" height="6" rx="1.2" />
              <rect x="9" y="14" width="6" height="6" rx="1.2" />
            </svg>
          }
        />
        <QuickTile
          label={t('favorites')}
          onClick={() => setFavOpen(true)}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 19s-7-4.4-7-9.1A4 4 0 0 1 12 7a4 4 0 0 1 7 2.9C19 14.6 12 19 12 19Z" />
            </svg>
          }
        />
      </div>

      <Rail title={t('now_rail')}>
        {now.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i * 1.2}
            wide={i === 0}
          />
        ))}
      </Rail>

      <MoodHistory />

      <Rail title={t('breath_rail')} toAll="/practice">
        {breaths.map((item, i) => (
          <CoverCard
            key={item.id}
            to={hrefFor(item)}
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
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
            cover={item.cover}
            title={itemTitle(item, locale)}
            minutes={item.minutes}
            badge={item.badge}
            locked={hrefFor(item) === '/paywall'}
            kenDelay={i}
          />
        ))}
      </Rail>

      <Presence />

      <SearchSheet open={search} onClose={() => setSearch(false)} />
      <MoodSheet open={moodOpen} onClose={() => setMoodOpen(false)} onPick={setMood} />
      <LangSheet open={langOpen} onClose={() => setLangOpen(false)} />
      <FavSheet open={favOpen} onClose={() => setFavOpen(false)} />
    </div>
  )
}
