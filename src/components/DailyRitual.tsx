import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { dayKey, todayKinds } from '../lib/activity'
import { useI18n } from '../lib/i18n'
import { moodForDay } from '../lib/mood'
import type { StringKey } from '../lib/strings'

type Step = {
  key: StringKey
  done: boolean
  tone: string
  icon: ReactNode
  to?: string
  onClick?: () => void
}

/**
 * Three small things a day — name the mood, one breath, one session — with a
 * ring that fills as they land. Everything it reads is already recorded on the
 * phone, so there is nothing to set up and nothing leaves the device.
 */
export function DailyRitual({ onMood, sessionTo }: { onMood: () => void; sessionTo: string }) {
  const { t } = useI18n()
  const today = dayKey(Date.now())
  const kinds = todayKinds()
  const steps: Step[] = [
    {
      key: 'ritual_mood',
      done: moodForDay(today) != null,
      tone: 'from-[#F472B6] to-[#DB2777]',
      onClick: onMood,
      icon: (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8.5 14.2c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8M9.2 10h.01M14.8 10h.01" />
        </>
      ),
    },
    {
      key: 'ritual_breath',
      done: kinds.includes('breath'),
      tone: 'from-[#38BDF8] to-[#2563EB]',
      to: '/breath',
      icon: <path d="M3 14c3-8 7-8 9-8s6 0 9 8M6 18c2-3.5 4-4.5 6-4.5s4 1 6 4.5" />,
    },
    {
      key: 'ritual_session',
      done: kinds.some((k) => k !== 'breath'),
      tone: 'from-[#A78BFA] to-[#6D28D9]',
      to: sessionTo,
      icon: <path d="M8 5.5v13l10-6.5-10-6.5Z" />,
    },
  ]
  const done = steps.filter((s) => s.done).length
  const all = done === steps.length
  const R = 26
  const C = 2 * Math.PI * R

  return (
    <section className={`ritual mt-6 rounded-[1.5rem] p-4 ${all ? 'ritual-all' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="relative h-[4.25rem] w-[4.25rem] shrink-0">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
            <defs>
              <linearGradient id="ritual-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="55%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r={R} fill="none" stroke="currentColor" strokeWidth="6" className="text-white/[0.09]" />
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="url(#ritual-ring)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - done / steps.length)}
              className="ritual-arc"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-[15px] font-semibold tabular-nums text-cream">
            {all ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#86EFAC]" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M5 12.5 10 17l9-9" />
              </svg>
            ) : (
              `${done}/${steps.length}`
            )}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[1.15rem] font-semibold tracking-tight text-cream">{t('ritual_title')}</p>
          <p className="mt-0.5 text-[13px] leading-5 text-white/55">{all ? t('ritual_done') : t('ritual_sub')}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {steps.map((s) => {
          const inner = (
            <>
              <span
                className={`keep-dark flex h-9 w-9 items-center justify-center rounded-full text-white ${
                  s.done ? 'bg-gradient-to-br from-[#4ADE80] to-[#16A34A]' : `bg-gradient-to-br ${s.tone}`
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill={s.key === 'ritual_session' && !s.done ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {s.done ? <path d="M5 12.5 10 17l9-9" /> : s.icon}
                </svg>
              </span>
              <span className={`mt-2 block text-[12px] font-medium leading-4 ${s.done ? 'text-white/45 line-through decoration-white/30' : 'text-cream'}`}>
                {t(s.key)}
              </span>
            </>
          )
          const cls = 'flex flex-col items-start rounded-[1.1rem] bg-white/[0.05] p-3 text-left active:scale-[0.98] transition-transform'
          return s.to ? (
            <Link key={s.key} to={s.to} className={cls}>
              {inner}
            </Link>
          ) : (
            <button key={s.key} type="button" onClick={s.onClick} className={cls}>
              {inner}
            </button>
          )
        })}
      </div>
    </section>
  )
}
