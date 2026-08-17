import { useEffect, useState } from 'react'
import { Card } from './ui'
import { formatHm } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { patchOnboard, readOnboard, requestNotify } from '../lib/onboard'
import {
  SLEEP_HOUR_CHOICES,
  bedMins,
  readSleepPlan,
  sleepTone,
  writeSleepPlan,
  type SleepPlan,
  type SleepTone,
} from '../lib/sleep-plan'

const TONE_KEY: Record<SleepTone, 'sleep_tone_good' | 'sleep_tone_time' | 'sleep_tone_late'> = {
  good: 'sleep_tone_good',
  time: 'sleep_tone_time',
  late: 'sleep_tone_late',
}

const TONE_CLASS: Record<SleepTone, string> = {
  good: 'text-emerald-200',
  time: 'text-[#E9D5FF]',
  late: 'text-amber-100',
}

function stepWake(plan: SleepPlan, deltaMin: number): SleepPlan {
  const total = (plan.wakeHour * 60 + plan.wakeMinute + deltaMin + 1440) % 1440
  return { ...plan, wakeHour: Math.floor(total / 60), wakeMinute: total % 60 }
}

export function SleepClock() {
  const { t, locale } = useI18n()
  const [plan, setPlan] = useState<SleepPlan>(() => readSleepPlan())
  const [remind, setRemind] = useState(() => readOnboard().remindSleep)
  const [tone, setTone] = useState<SleepTone>(() => sleepTone(plan))
  const bed = bedMins(plan)

  useEffect(() => {
    const tick = () => setTone(sleepTone(readSleepPlan()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [plan.hours, plan.wakeHour, plan.wakeMinute])

  function save(next: SleepPlan) {
    writeSleepPlan(next)
    setPlan(next)
    setTone(sleepTone(next))
  }

  const wakeLabel = formatHm(plan.wakeHour * 60 + plan.wakeMinute, locale)

  return (
    <Card className="mt-4">
      <p className="text-center text-[11px] uppercase tracking-[0.14em] text-mute">{t('sleep_bed')}</p>
      <p className={`mt-3 text-center font-display text-[2.35rem] leading-none tabular-nums ${TONE_CLASS[tone]}`}>
        {formatHm(bed, locale)}
      </p>
      <p className="mt-2 text-center text-sm leading-5 text-mute">{t(TONE_KEY[tone], { t: formatHm(bed, locale) })}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/6 px-2 py-3">
          <p className="text-center text-[11px] text-mute">{t('sleep_wake')}</p>
          <div className="mt-2 flex items-center justify-between gap-1">
            <button
              type="button"
              aria-label="-15"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-lg text-white/80"
              onClick={() => save(stepWake(plan, -15))}
            >
              −
            </button>
            <p className="min-w-0 flex-1 text-center font-display text-lg tabular-nums text-cream">{wakeLabel}</p>
            <button
              type="button"
              aria-label="+15"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-lg text-white/80"
              onClick={() => save(stepWake(plan, 15))}
            >
              +
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-white/6 px-2 py-3">
          <p className="text-center text-[11px] text-mute">{t('sleep_need')}</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {SLEEP_HOUR_CHOICES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => save({ ...plan, hours: n })}
                className={`rounded-full py-1.5 text-xs tabular-nums ${
                  plan.hours === n ? 'bg-[#7B61FF] text-white' : 'bg-white/8 text-white/70'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={remind}
        onClick={() => {
          const v = !remind
          setRemind(v)
          patchOnboard({ remindSleep: v })
          if (v) void requestNotify()
        }}
        className="mt-4 flex w-full items-center gap-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-cream">{t('ob_rem_sleep')}</span>
          <span className="mt-1 block text-xs leading-5 text-mute">{t('ob_rem_sleep_h')}</span>
        </span>
        <span className={`relative h-7 w-12 shrink-0 rounded-full ${remind ? 'bg-[#7B61FF]' : 'bg-white/15'}`}>
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              remind ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </span>
      </button>
    </Card>
  )
}
