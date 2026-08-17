import { readOnboard, type HoursId } from './onboard'
import { readJson, writeJson } from './storage'

export const STEADY_SLEEP_EVENT = 'steady-sleep'

export const SLEEP_HOUR_CHOICES = [6, 7, 8, 9] as const

export const DAY_MIN = 24 * 60
export const SLEEP_SNAP = 5
export const MIN_SLEEP_MIN = 60
export const MAX_SLEEP_MIN = 16 * 60

export type SleepPlan = {
  hours: number
  wakeHour: number
  wakeMinute: number
  bedHour: number
  bedMinute: number
}

export type SleepTone = 'good' | 'time' | 'late'

const DEFAULT: SleepPlan = {
  hours: 8,
  wakeHour: 7,
  wakeMinute: 0,
  bedHour: 23,
  bedMinute: 0,
}

export function wrapMins(n: number): number {
  return ((Math.round(n) % DAY_MIN) + DAY_MIN) % DAY_MIN
}

export function snapMins(n: number): number {
  return wrapMins(Math.round(n / SLEEP_SNAP) * SLEEP_SNAP)
}

export function spanMins(bed: number, wake: number): number {
  const d = wrapMins(wake - bed)
  return d === 0 ? DAY_MIN : d
}

export function clampSpan(mins: number): number {
  return Math.min(MAX_SLEEP_MIN, Math.max(MIN_SLEEP_MIN, mins))
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

function hoursFromSpan(mins: number): number {
  return Math.round((clampSpan(mins) / 60) * 100) / 100
}

export function emitSleepChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(STEADY_SLEEP_EVENT))
}

export function wakeMins(plan: Pick<SleepPlan, 'wakeHour' | 'wakeMinute'>): number {
  return wrapMins(plan.wakeHour * 60 + plan.wakeMinute)
}

export function bedMins(plan: Pick<SleepPlan, 'bedHour' | 'bedMinute' | 'hours' | 'wakeHour' | 'wakeMinute'>): number {
  if (Number.isFinite(plan.bedHour) && Number.isFinite(plan.bedMinute)) {
    return wrapMins(plan.bedHour * 60 + plan.bedMinute)
  }
  return wrapMins(wakeMins(plan) - Math.round((plan.hours || DEFAULT.hours) * 60))
}

export function nightMinutes(plan: SleepPlan): number {
  return spanMins(bedMins(plan), wakeMins(plan))
}

export function planFromMins(bed: number, wake: number): SleepPlan {
  const b = snapMins(bed)
  const w = snapMins(wake)
  const span = clampSpan(spanMins(b, w))
  const wakeFixed = snapMins(b + span)
  return {
    hours: hoursFromSpan(span),
    bedHour: Math.floor(b / 60),
    bedMinute: b % 60,
    wakeHour: Math.floor(wakeFixed / 60),
    wakeMinute: wakeFixed % 60,
  }
}

/** Move one handle; keep the other still, clamp to min/max night length. */
export function moveSleepHandle(plan: SleepPlan, which: 'bed' | 'wake', mins: number): SleepPlan {
  const bed = bedMins(plan)
  const wake = wakeMins(plan)
  const next = snapMins(mins)
  if (which === 'bed') {
    const span = spanMins(next, wake)
    if (span < MIN_SLEEP_MIN) return planFromMins(wake - MIN_SLEEP_MIN, wake)
    if (span > MAX_SLEEP_MIN) return planFromMins(wake - MAX_SLEEP_MIN, wake)
    return planFromMins(next, wake)
  }
  const span = spanMins(bed, next)
  if (span < MIN_SLEEP_MIN) return planFromMins(bed, bed + MIN_SLEEP_MIN)
  if (span > MAX_SLEEP_MIN) return planFromMins(bed, bed + MAX_SLEEP_MIN)
  return planFromMins(bed, next)
}

export function readSleepPlan(): SleepPlan {
  const raw = readJson<Partial<SleepPlan> | null>('sleep.plan', null)
  const wakeHour = clampHour(raw?.wakeHour ?? DEFAULT.wakeHour)
  const wakeMinute = clampMinute(raw?.wakeMinute ?? DEFAULT.wakeMinute)
  const hasBed = raw != null && (raw.bedHour != null || raw.bedMinute != null)
  if (hasBed) {
    return planFromMins(
      clampHour(raw.bedHour ?? DEFAULT.bedHour) * 60 + clampMinute(raw.bedMinute ?? DEFAULT.bedMinute),
      wakeHour * 60 + wakeMinute,
    )
  }
  const legacyHours = SLEEP_HOUR_CHOICES.includes(raw?.hours as (typeof SLEEP_HOUR_CHOICES)[number])
    ? (raw?.hours as number)
    : hoursFromOnboard(readOnboard().hours)
  return planFromMins(wakeHour * 60 + wakeMinute - legacyHours * 60, wakeHour * 60 + wakeMinute)
}

export function writeSleepPlan(next: SleepPlan) {
  const plan = planFromMins(bedMins(next), wakeMins(next))
  writeJson('sleep.plan', plan)
  emitSleepChange()
}

export function minsOfDate(d: Date): number {
  return d.getHours() * 60 + d.getMinutes()
}

export function sleepTone(plan: SleepPlan, now = new Date()): SleepTone {
  const nowM = minsOfDate(now)
  const bed = bedMins(plan)
  const afterBed = wrapMins(nowM - bed)
  const night = nightMinutes(plan)
  if (afterBed <= 25) return 'time'
  if (afterBed < night) return 'late'
  const untilBed = wrapMins(bed - nowM)
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

export function durationLabelParts(mins: number): { h: number; m: number } {
  const n = clampSpan(mins)
  return { h: Math.floor(n / 60), m: n % 60 }
}
