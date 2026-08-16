import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, LegalNote } from '../components/ui'
import { MoodHistory } from '../components/MoodHistory'
import { SkillGrid } from '../components/SkillGrid'
import { activityStats, applyFreeze, canApplyFreeze, freezeLeft, monthTitle, weekdayLetters } from '../lib/activity'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'

export function Me() {
  const { t, locale } = useI18n()
  const { pro } = useEntitlement()
  const [left, setLeft] = useState(() => freezeLeft())
  const [canFreeze, setCanFreeze] = useState(() => canApplyFreeze())
  const [froze, setFroze] = useState(false)
  const stats = activityStats()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const first = new Date(year, month, 1)
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const letters = weekdayLetters(locale)

  return (
    <div className="pb-8">
      <header className="flex items-center justify-between pt-2">
        <h1 className="text-[2rem] font-semibold tracking-tight">{t('me_title')}</h1>
        <Link
          to="/me/settings"
          aria-label={t('me_settings')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.7.9 1.1 1.6 1.1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
          </svg>
        </Link>
      </header>

      <div className="mt-6 flex items-center gap-3">
        <img src="/favicon.svg" alt="" className="h-16 w-16 rounded-[1.15rem]" />
        <span className="inline-flex items-center gap-1 rounded-full bg-white/8 px-2.5 py-1 text-xs text-white/85">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4B5FD]" fill="currentColor">
            <path d="M12 2.4 13.7 8h5.8l-4.7 3.4 1.8 5.6L12 13.8 7.4 17l1.8-5.6L4.5 8h5.8L12 2.4Z" />
          </svg>
          {t('level_badge')}
        </span>
      </div>

      <button
        type="button"
        disabled={!canFreeze}
        onClick={() => {
          if (!applyFreeze()) return
          setLeft(freezeLeft())
          setCanFreeze(canApplyFreeze())
          setFroze(true)
        }}
        className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] py-1.5 pl-1.5 pr-3 text-left disabled:opacity-70"
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.55rem] bg-[#9BD7FF]/25">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#C8EEFF]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="6" y="6" width="12" height="12" rx="2.2" />
            <path d="M12 7.5v9M8.5 12h7M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" opacity="0.55" />
          </svg>
          <svg viewBox="0 0 24 24" className="absolute h-3 w-3 text-amber-200" fill="currentColor">
            <path d="M13 3 7.5 12h5L11 21l6.5-10h-5L13 3Z" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-medium leading-none">{t('freeze_title')}</span>
          <span className="mt-1 block text-[11px] leading-none text-white/45">
            {froze ? t('freeze_ok') : canFreeze ? t('freeze_use') : left <= 0 ? t('freeze_used') : t('freeze_left', { n: left })}
          </span>
        </span>
      </button>

      {!pro ? (
        <Link to="/paywall" className="mt-3 block overflow-hidden rounded-[1.35rem] surface">
          <p className="px-5 py-4 text-sm font-medium leading-6">{t('premium_banner')}</p>
        </Link>
      ) : null}

      <Card className="mt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">{t('personal_stats')}</p>
            <p className="mt-1 text-xs text-white/40">{t('last_30')}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-2xl font-semibold">
              <span className="text-[#9B87FF]">◷</span>
              {stats.totalMinutes}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">{t('total_min')}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-2xl font-semibold">
              <span className="text-[#9B87FF]">▣</span>
              {stats.activeDays}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">{t('active_days')}</p>
          </div>
        </div>
      </Card>

      <Card className="mt-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-semibold">
              <span className="mr-1 text-[#9B87FF]">⚡</span>
              {stats.currentStreak}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">{t('current_streak')}</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">
              <span className="mr-1 text-amber-300">⚡</span>
              {stats.longestStreak}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/40">{t('longest_streak')}</p>
          </div>
        </div>
      </Card>

      <MoodHistory />

      <section className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="text-[1.35rem] font-semibold tracking-tight">{t('skills_title')}</h2>
          <Link to="/me/skills" className="text-sm text-white/45">
            {t('view_all_short')}
          </Link>
        </div>
        <SkillGrid limit={6} />
      </section>

      <Card className="mt-6">
        <p className="font-medium capitalize">{monthTitle(year, month, locale)}</p>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-white/35">
          {letters.map((d, i) => (
            <span key={`${d}-${i}`}>{d}</span>
          ))}
        </div>
        <div className="mt-2 h-px bg-white/8" />
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-sm">
          {Array.from({ length: startPad }).map((_, i) => (
            <span key={`p${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const key = `${year}-${month}-${day}`
            const on = stats.days.has(key)
            const today = day === now.getDate()
            return (
              <span
                key={key}
                className={`flex h-8 items-center justify-center rounded-full ${
                  on ? 'bg-[#7B61FF]/80 text-white' : today ? 'text-white' : 'text-white/45'
                }`}
              >
                {day}
              </span>
            )
          })}
        </div>
      </Card>

      <div className="mt-10">
        <LegalNote />
      </div>
    </div>
  )
}
