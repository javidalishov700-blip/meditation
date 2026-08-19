import { bedMins, spanMins, wakeMins, wrapMins, type SleepPlan } from './sleep-plan'
import { readRecordList, writeJson } from './storage'

export const SLEEP_FEELS = ['good', 'okay', 'rough'] as const
export type SleepFeel = (typeof SLEEP_FEELS)[number]

export type SleepLogEntry = { day: string; bedMin: number; wakeMin: number; feel: SleepFeel; at: number }

const KEY = 'sleepLog'

export function todaySleepDay(now = Date.now()): string {
  const d = new Date(now)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function readSleepLog(): SleepLogEntry[] {
  return readRecordList<SleepLogEntry>(KEY)
}

export function sleepLogForDay(day: string): SleepLogEntry | null {
  return readSleepLog().find((e) => e.day === day) ?? null
}

export function writeSleepLogEntry(entry: { day: string; bedMin: number; wakeMin: number; feel: SleepFeel }) {
  const prev = readSleepLog().filter((e) => e.day !== entry.day)
  const all = [{ ...entry, at: Date.now() }, ...prev].slice(0, 180)
  writeJson(KEY, all)
  return all
}

export function lastSleepLogDays(n = 14, now = Date.now()): { day: string; entry: SleepLogEntry | null }[] {
  const d = new Date(now)
  d.setHours(12, 0, 0, 0)
  const rows: { day: string; entry: SleepLogEntry | null }[] = []
  for (let i = n - 1; i >= 0; i--) {
    const x = new Date(d)
    x.setDate(d.getDate() - i)
    const key = todaySleepDay(x.getTime())
    rows.push({ day: key, entry: sleepLogForDay(key) })
  }
  return rows
}

/** Actual minutes slept for one entry, wrapping past midnight. */
export function loggedMinutes(entry: Pick<SleepLogEntry, 'bedMin' | 'wakeMin'>): number {
  return spanMins(wrapMins(entry.bedMin), wrapMins(entry.wakeMin))
}

/** Sensible defaults for the check-in inputs, from the plan the user already set. */
export function defaultLogTimes(plan: SleepPlan): { bedMin: number; wakeMin: number } {
  return { bedMin: bedMins(plan), wakeMin: wakeMins(plan) }
}
