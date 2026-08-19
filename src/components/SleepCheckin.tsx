import { useState } from 'react'
import { Card, GhostButton, PrimaryButton } from './ui'
import { formatHm } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { durationLabelParts, wrapMins, type SleepPlan } from '../lib/sleep-plan'
import {
  defaultLogTimes,
  lastSleepLogDays,
  loggedMinutes,
  sleepLogForDay,
  SLEEP_FEELS,
  todaySleepDay,
  writeSleepLogEntry,
  type SleepFeel,
} from '../lib/sleep-log'

const FEEL_KEY: Record<SleepFeel, 'sleep_feel_good' | 'sleep_feel_okay' | 'sleep_feel_rough'> = {
  good: 'sleep_feel_good',
  okay: 'sleep_feel_okay',
  rough: 'sleep_feel_rough',
}

const FEEL_DOT: Record<SleepFeel, string> = {
  good: 'bg-emerald-400',
  okay: 'bg-amber-300',
  rough: 'bg-rose-400',
}

function hhmm(mins: number): string {
  const m = wrapMins(mins)
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

function minsOf(hhmmVal: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmmVal)
  if (!match) return null
  const h = Number(match[1])
  const m = Number(match[2])
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null
  return wrapMins(h * 60 + m)
}

export function SleepCheckin({ plan }: { plan: SleepPlan }) {
  const { t, locale } = useI18n()
  const today = todaySleepDay()
  const existing = sleepLogForDay(today)
  const [editing, setEditing] = useState(!existing)
  const defaults = defaultLogTimes(plan)
  const [bedVal, setBedVal] = useState(() => hhmm(existing?.bedMin ?? defaults.bedMin))
  const [wakeVal, setWakeVal] = useState(() => hhmm(existing?.wakeMin ?? defaults.wakeMin))
  const [feel, setFeel] = useState<SleepFeel | null>(existing?.feel ?? null)

  function startEdit() {
    const cur = sleepLogForDay(today)
    setBedVal(hhmm(cur?.bedMin ?? defaults.bedMin))
    setWakeVal(hhmm(cur?.wakeMin ?? defaults.wakeMin))
    setFeel(cur?.feel ?? null)
    setEditing(true)
  }

  function save() {
    const bedMin = minsOf(bedVal)
    const wakeMin = minsOf(wakeVal)
    if (bedMin == null || wakeMin == null || !feel) return
    writeSleepLogEntry({ day: today, bedMin, wakeMin, feel })
    setEditing(false)
  }

  const saved = !editing ? sleepLogForDay(today) : null
  const days = lastSleepLogDays(14)

  return (
    <Card className="mt-4">
      <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('sleep_log_title')}</p>

      {editing ? (
        <>
          <p className="mt-2 text-sm leading-6 text-mute">{t('sleep_log_sub')}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.1em] text-mute">{t('sleep_bed')}</span>
              <input
                type="time"
                value={bedVal}
                onChange={(e) => setBedVal(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl bg-white/8 px-3 text-base tabular-nums text-white outline-none"
              />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.1em] text-mute">{t('sleep_wake')}</span>
              <input
                type="time"
                value={wakeVal}
                onChange={(e) => setWakeVal(e.target.value)}
                className="mt-1 h-11 w-full rounded-xl bg-white/8 px-3 text-base tabular-nums text-white outline-none"
              />
            </label>
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-[0.1em] text-mute">{t('sleep_log_feel')}</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {SLEEP_FEELS.map((id) => {
              const on = feel === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFeel(id)}
                  className={`flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs ${
                    on ? 'bg-[#7B61FF] text-white' : 'bg-white/8 text-cream/80'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${FEEL_DOT[id]}`} />
                  {t(FEEL_KEY[id])}
                </button>
              )
            })}
          </div>

          <PrimaryButton className="mt-4" disabled={!feel} onClick={save}>
            {t('sleep_log_save')}
          </PrimaryButton>
        </>
      ) : saved ? (
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-cream">
              {formatHm(saved.bedMin, locale)} – {formatHm(saved.wakeMin, locale)}
            </p>
            <p className="mt-1 text-xs text-mute">
              {t('sleep_log_slept', durationLabelParts(loggedMinutes(saved)))} ·{' '}
              <span className="inline-flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${FEEL_DOT[saved.feel]}`} />
                {t(FEEL_KEY[saved.feel])}
              </span>
            </p>
          </div>
          <GhostButton onClick={startEdit}>{t('sleep_log_edit')}</GhostButton>
        </div>
      ) : null}

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('sleep_log_history')}</p>
        <div className="mt-3 flex gap-1.5">
          {days.map((d) => (
            <span
              key={d.day}
              title={
                d.entry
                  ? `${formatHm(d.entry.bedMin, locale)}–${formatHm(d.entry.wakeMin, locale)} · ${t(FEEL_KEY[d.entry.feel])}`
                  : ''
              }
              className={`h-7 flex-1 rounded-full ${d.entry ? FEEL_DOT[d.entry.feel] : 'bg-white/10 mood-empty'}`}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
