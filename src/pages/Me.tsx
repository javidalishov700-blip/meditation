import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Card, LegalNote } from '../components/ui'
import { MoodHistory } from '../components/MoodHistory'
import { SkillGrid } from '../components/SkillGrid'
import { activityStats, applyFreeze, canApplyFreeze, freezeLeft, isFrozenDay, monthTitle, STREAK_BADGES, weekdayLetters } from '../lib/activity'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'

export function Me() {
  const { t, locale } = useI18n()
  const { store } = useEntitlement()
  const [left, setLeft] = useState(() => freezeLeft())
  // Nothing to save for someone who has not started yet — don't light up the restore button.
  const [canFreeze, setCanFreeze] = useState(() => canApplyFreeze() && activityStats().activeDays > 0)
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

      {!store ? (
        <Link
          to="/paywall"
          className="keep-dark mt-4 flex items-center gap-3.5 overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#DB2777] px-4 py-4 shadow-[0_12px_32px_rgba(124,58,237,0.35)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-white/20 text-white">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
              <path d="M12 2.8 13.9 9l6.3 1.9-6.3 1.9L12 19l-1.9-6.2-6.3-1.9L10.1 9 12 2.8ZM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold leading-5 text-white">{t('me_upgrade')}</span>
            <span className="mt-0.5 block text-[12px] leading-4 text-white/85">{t('premium_banner')}</span>
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/90" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      ) : null}

      <div className="mt-6 flex items-end justify-between">
        <p className="text-[1.15rem] font-semibold tracking-tight">{t('personal_stats')}</p>
        <p className="text-xs text-white/45">{t('last_30')}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <StatTile
          value={stats.totalMinutes}
          label={t('total_min')}
          tone="from-[#A78BFA] to-[#6D28D9]"
          icon={
            <>
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 7.5V12l3 2" />
            </>
          }
        />
        <StatTile
          value={stats.activeDays}
          label={t('active_days')}
          tone="from-[#38BDF8] to-[#2563EB]"
          icon={
            <>
              <rect x="4" y="5" width="16" height="15" rx="2.5" />
              <path d="M4 10h16M8.5 3v4M15.5 3v4" />
            </>
          }
        />
        <StatTile
          value={stats.currentStreak}
          label={t('current_streak')}
          tone="from-[#FBBF24] to-[#F97316]"
          icon={<path d="M13 3 6 13h6l-1 8 8-12h-6l0-6Z" />}
        />
        <StatTile
          value={stats.longestStreak}
          label={t('longest_streak')}
          tone="from-[#F472B6] to-[#DB2777]"
          icon={<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4.5a2.5 2.5 0 0 0 2.6 3.4M17 6h2.5a2.5 2.5 0 0 1-2.6 3.4" />}
        />
      </div>

      <Card className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">{t('streak_badges')}</p>
        <div className="mt-3 grid grid-cols-6 gap-1.5">
          {STREAK_BADGES.map((b, i) => {
            const on = stats.longestStreak >= b.days
            return (
              <div key={b.days} className="text-center">
                <span
                  className={`medal mx-auto flex h-11 w-11 items-center justify-center rounded-full text-[12px] font-bold tabular-nums ${
                    on ? `medal-on medal-${i} keep-dark text-white` : 'border border-dashed border-white/20 bg-white/[0.04] text-white/55'
                  }`}
                >
                  {b.days}
                </span>
                <p className={`mt-1.5 text-[9px] leading-tight ${on ? 'text-cream' : 'text-white/45'}`}>{t(b.key)}</p>
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

function StatTile({ value, label, tone, icon }: { value: number; label: string; tone: string; icon: ReactNode }) {
  return (
    <div className="surface flex items-center gap-3 rounded-[1.2rem] border border-white/[0.06] px-3.5 py-3">
      <span className={`keep-dark flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] bg-gradient-to-br ${tone} text-white`}>
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[1.45rem] font-semibold leading-none tabular-nums">{value}</span>
        <span className="mt-1 block truncate text-[9.5px] font-medium uppercase tracking-[0.1em] text-white/50">{label}</span>
      </span>
    </div>
  )
}
