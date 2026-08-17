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

  const wakeValue = `${String(plan.wakeHour).padStart(2, '0')}:${String(plan.wakeMinute).padStart(2, '0')}`

  return (
    <Card className="mt-6">
      <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('sleep_clock')}</p>
      <p className={`mt-3 font-display text-2xl leading-snug ${TONE_CLASS[tone]}`}>
        {t(TONE_KEY[tone], { t: formatHm(bed, locale) })}
      </p>
      <p className="mt-2 text-sm text-mute">
        {t('sleep_bed')}: {formatHm(bed, locale)} · {t('sleep_hours_n', { n: plan.hours })}
      </p>

      <label className="mt-5 block">
        <span className="text-xs text-mute">{t('sleep_wake')}</span>
        <input
          type="time"
          value={wakeValue}
          onChange={(e) => {
            const raw = e.target.value
            if (!raw) return
            const [h, m] = raw.split(':').map(Number)
            save({ ...plan, wakeHour: h ?? 7, wakeMinute: m ?? 0 })
          }}
          className="mt-1.5 w-full rounded-2xl bg-white/8 px-3 py-3 text-sm text-white/90"
        />
      </label>

      <p className="mt-4 text-xs text-mute">{t('sleep_hours_want')}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {SLEEP_HOUR_CHOICES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => save({ ...plan, hours: n })}
            className={`rounded-full px-3 py-1.5 text-xs ${
              plan.hours === n ? 'bg-white/10 text-cream' : 'text-mute'
            }`}
          >
            {t('sleep_hours_n', { n })}
          </button>
        ))}
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
        className="mt-5 flex w-full items-center gap-3 text-left"
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
