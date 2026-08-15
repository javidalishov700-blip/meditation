import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LangPicker } from '../components/LangPicker'
import { VoicePicker } from '../components/VoicePicker'
import { Card, GhostButton, LegalNote } from '../components/ui'
import { MoodHistory } from '../components/MoodHistory'
import { activityStats, applyFreeze, canApplyFreeze, freezeLeft, monthTitle, weekdayLetters } from '../lib/activity'
import { useEntitlement } from '../lib/entitlement-store'
import { formatClock, formatDuration } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { resetOnboard } from '../lib/onboard'
import { readPassed } from '../lib/passed'
import { SKILLS, skillUnlocked } from '../lib/skills'
import { readTheme, writeTheme, type ThemeId } from '../lib/theme'

export function Me() {
  const { t, locale } = useI18n()
  const { pro, demo, trial, trialEndsAt, lockDemo } = useEntitlement()
  const [settings, setSettings] = useState(false)
  const [theme, setTheme] = useState<ThemeId>(() => readTheme())
  const [left, setLeft] = useState(() => freezeLeft())
  const [canFreeze, setCanFreeze] = useState(() => canApplyFreeze())
  const [froze, setFroze] = useState(false)
  const history = readPassed()
  const stats = activityStats()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const first = new Date(year, month, 1)
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const letters = weekdayLetters(locale)
  const ms = trialEndsAt - Date.now()
  const tier = demo
    ? t('me_pro')
    : trial && ms > 0
      ? ms < 86_400_000
        ? t('me_trial_today')
        : t('me_trial', { n: Math.ceil(ms / 86_400_000) })
      : t('me_free')

  return (
    <div className="pb-8">
      <header className="flex items-center justify-between pt-2">
        <h1 className="text-[2rem] font-semibold tracking-tight">{t('me_title')}</h1>
        <button
          type="button"
          aria-label={t('me_settings')}
          onClick={() => setSettings((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.7.9 1.1 1.6 1.1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
          </svg>
        </button>
      </header>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7B61FF] to-[#2a1650] text-xl font-semibold">
          S
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/8 px-2.5 py-1 text-xs text-white/85">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C4B5FD]" fill="currentColor">
            <path d="M12 2.4 13.7 8h5.8l-4.7 3.4 1.8 5.6L12 13.8 7.4 17l1.8-5.6L4.5 8h5.8L12 2.4Z" />
          </svg>
          {t('level_badge')}
        </span>
      </div>

      <Card className="mt-6 overflow-hidden !p-0">
        <img src="/covers/cover-freeze.png" alt="" className="h-36 w-full object-cover keep-dark" />
        <div className="p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('freeze_title')}</p>
          <p className="mt-1 text-lg font-semibold">{t('freeze_left', { n: left })}</p>
          {froze ? <p className="mt-2 text-sm text-mute">{t('freeze_ok')}</p> : null}
          {canFreeze ? (
            <GhostButton
              className="mt-4"
              onClick={() => {
                if (!applyFreeze()) return
                setLeft(freezeLeft())
                setCanFreeze(canApplyFreeze())
                setFroze(true)
              }}
            >
              {t('freeze_use')}
            </GhostButton>
          ) : left <= 0 ? (
            <p className="mt-2 text-sm text-mute">{t('freeze_used')}</p>
          ) : null}
        </div>
      </Card>

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
        <h2 className="text-[1.35rem] font-semibold tracking-tight">{t('skills_title')}</h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {SKILLS.map((s) => {
            const on = skillUnlocked(s.id)
            return (
              <div key={s.id} className={`surface overflow-hidden rounded-[1.2rem] p-2 text-center ${on ? '' : 'opacity-55'}`}>
                <img src={s.image} alt="" className={`mx-auto h-16 w-16 rounded-full object-cover ${on ? '' : 'grayscale'}`} />
                <p className="mt-2 text-[11px] font-medium leading-tight">{t(s.key)}</p>
                {on ? null : <p className="mt-1 text-[9px] leading-4 text-mute">{t('skill_locked')}</p>}
              </div>
            )
          })}
        </div>
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

      <Card className="mt-4">
        <VoicePicker />
      </Card>
      <Card className="mt-3">
        <LangPicker />
      </Card>

      {settings ? (
        <>
          <Card className="mt-3">
            <p className="text-xs text-white/40">{t('theme')}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(['dark', 'light'] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    writeTheme(id)
                    setTheme(id)
                  }}
                  className={`rounded-2xl px-3 py-3 text-sm ${theme === id ? 'bg-[#7B61FF] text-white' : 'bg-white/8'}`}
                >
                  {id === 'dark' ? t('theme_dark') : t('theme_light')}
                </button>
              ))}
            </div>
          </Card>
          <Card className="mt-3">
            <p className="text-xs text-white/40">{t('me_tier')}</p>
            <p className="mt-1 text-xl font-semibold">{tier}</p>
            {demo || trial ? (
              <GhostButton className="mt-4" onClick={lockDemo}>
                {t('me_demo_off')}
              </GhostButton>
            ) : (
              <Link to="/paywall" className="mt-4 inline-block text-sm text-[#C4B5FD]">
                {t('me_vitrine')}
              </Link>
            )}
          </Card>
          <Card className="mt-3">
            <p className="text-xs text-white/40">{t('me_history')}</p>
            {!pro ? (
              <p className="mt-3 text-sm text-white/45">{t('me_history_locked')}</p>
            ) : history.length === 0 ? (
              <p className="mt-3 text-sm text-white/45">{t('me_history_empty')}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {history.map((h) => (
                  <li key={h.id} className="rounded-2xl bg-black/30 px-3 py-2 text-sm">
                    <p>{formatClock(h.endedAt, locale)}</p>
                    <p className="text-white/45">
                      {formatDuration(h.seconds, locale)} · {t('taps_n', { n: h.taps })}
                    </p>
                    <p className="mt-1">{h.sentence}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <GhostButton className="mt-6" onClick={() => resetOnboard()}>
            {t('me_ob_replay')}
          </GhostButton>
        </>
      ) : null}

      <div className="mt-10">
        <LegalNote />
      </div>
    </div>
  )
}
