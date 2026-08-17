import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, LegalNote } from '../components/ui'
import { MoodHistory } from '../components/MoodHistory'
import { SkillGrid } from '../components/SkillGrid'
import { activityStats, applyFreeze, canApplyFreeze, freezeLeft, isFrozenDay, monthTitle, STREAK_BADGES, weekdayLetters } from '../lib/activity'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'

export function Me() {
  const { t, locale } = useI18n()
  const { pro } = useEntitlement()
  const [left, setLeft] = useState(() => freezeLeft())
  const [canFreeze, setCanFreeze] = useState(() => canApplyFreeze())
  const [froze, setFroze] = useState<'ok' | 'used' | 'none' | null>(null)
  const [stats, setStats] = useState(() => activityStats())
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

        <p className="mt-5 text-[10px] uppercase tracking-[0.12em] text-white/40">{t('streak_badges')}</p>
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {STREAK_BADGES.map((b) => {
            const on = stats.longestStreak >= b.days
            return (
              <div key={b.days} className={`text-center ${on ? '' : 'opacity-40'}`}>
                <span
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums ${
                    on
                      ? 'border-amber-200/50 bg-amber-300/20 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                      : 'border-white/12 bg-white/[0.04] text-white/45'
                  }`}
                >
                  {b.days}
                </span>
                <p className="mt-1 text-[9px] leading-tight text-mute">{t(b.key)}</p>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            if (applyFreeze()) {
              setLeft(freezeLeft())
              setCanFreeze(canApplyFreeze())
              setStats(activityStats())
              setFroze('ok')
              return
            }
            setFroze(freezeLeft() <= 0 ? 'used' : 'none')
          }}
          className={`mt-5 flex w-full items-center gap-2 rounded-[1.05rem] border px-3 py-2.5 text-left ${
            froze === 'ok'
              ? 'border-amber-200/45 bg-amber-200/12'
              : canFreeze
                ? 'border-[#9BD7FF]/55 bg-[#9BD7FF]/14 shadow-[0_0_16px_rgba(155,215,255,0.28)]'
                : 'border-white/10 bg-white/[0.04]'
          }`}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              froze === 'ok' ? 'bg-amber-200/25' : 'bg-[#9BD7FF]/20'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#C8EEFF]" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-medium leading-none">{t('freeze_title')}</span>
            <span className="mt-1 block text-[11px] leading-4 text-white/50">
              {froze === 'ok'
                ? t('freeze_ok')
                : froze === 'used'
                  ? t('freeze_used')
                  : froze === 'none'
                    ? t('freeze_none')
                    : canFreeze
                      ? t('freeze_use')
                      : left <= 0
                        ? t('freeze_used')
                        : t('freeze_left')}
            </span>
          </span>
        </button>
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
            const frozen = isFrozenDay(key)
            const today = day === now.getDate()
            return (
              <span
                key={key}
                className={`flex h-8 items-center justify-center rounded-full ${
                  frozen
                    ? 'bg-[#9BD7FF]/35 text-white'
                    : on
                      ? 'bg-[#7B61FF]/80 text-white'
                      : today
                        ? 'text-white'
                        : 'text-white/45'
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
