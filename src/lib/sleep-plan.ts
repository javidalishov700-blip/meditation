import { readOnboard, type HoursId } from './onboard'
import { readJson, writeJson } from './storage'

export const STEADY_SLEEP_EVENT = 'steady-sleep'

export const SLEEP_HOUR_CHOICES = [6, 7, 8, 9] as const

export type SleepPlan = {
  hours: number
  wakeHour: number
  wakeMinute: number
}

export type SleepTone = 'good' | 'time' | 'late'

const DAY = 24 * 60
const DEFAULT: SleepPlan = { hours: 8, wakeHour: 7, wakeMinute: 0 }

function clampHours(n: number): number {
  if (SLEEP_HOUR_CHOICES.includes(n as (typeof SLEEP_HOUR_CHOICES)[number])) return n
  return DEFAULT.hours
}

function clampHour(n: number): number {
  if (!Number.isFinite(n)) return DEFAULT.wakeHour
  return Math.min(23, Math.max(0, Math.round(n)))
}

function clampMinute(n: number): number {
  if (!Number.isFinite(n)) return 0
  return Math.min(59, Math.max(0, Math.round(n)))
}

function hoursFromOnboard(id?: HoursId): number {
  if (id === 'lt6' || id === 'h67') return 7
  if (id === 'h9') return 9
  return 8
}

export function emitSleepChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(STEADY_SLEEP_EVENT))
}

export function readSleepPlan(): SleepPlan {
  const raw = readJson<Partial<SleepPlan> | null>('sleep.plan', null)
  return {
    hours: clampHours(raw?.hours ?? hoursFromOnboard(readOnboard().hours)),
    wakeHour: clampHour(raw?.wakeHour ?? DEFAULT.wakeHour),
    wakeMinute: clampMinute(raw?.wakeMinute ?? DEFAULT.wakeMinute),
  }
}

export function writeSleepPlan(next: SleepPlan) {
  const plan: SleepPlan = {
    hours: clampHours(next.hours),
    wakeHour: clampHour(next.wakeHour),
    wakeMinute: clampMinute(next.wakeMinute),
  }
  writeJson('sleep.plan', plan)
  emitSleepChange()
}

export function minsOfDate(d: Date): number {
  return d.getHours() * 60 + d.getMinutes()
}

export function wakeMins(plan: SleepPlan): number {
  return plan.wakeHour * 60 + plan.wakeMinute
}

export function bedMins(plan: SleepPlan): number {
  return (wakeMins(plan) - plan.hours * 60 + DAY) % DAY
}

export function sleepTone(plan: SleepPlan, now = new Date()): SleepTone {
  const nowM = minsOfDate(now)
  const bed = bedMins(plan)
  const afterBed = (nowM - bed + DAY) % DAY
  const night = plan.hours * 60
  if (afterBed <= 25) return 'time'
  if (afterBed < night) return 'late'
  const untilBed = (bed - nowM + DAY) % DAY
  if (untilBed <= 40) return 'time'
  return 'good'
}

/** Wake-morning this night belongs to, as YYYY-MM-DD. */
export function nightId(plan: SleepPlan, now = new Date()): string {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (minsOfDate(now) >= wakeMins(plan)) d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function nextBedtimeDate(plan: SleepPlan, now = new Date()): Date {
  const bed = bedMins(plan)
  const d = new Date(now)
  d.setSeconds(0, 0)
  d.setHours(Math.floor(bed / 60), bed % 60, 0, 0)
  if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 1)
  return d
}
