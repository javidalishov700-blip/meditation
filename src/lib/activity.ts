import { localeMeta, type LocaleId } from './locales'
import { readPassed } from './passed'

export type ActivityStats = {
  totalMinutes: number
  activeDays: number
  currentStreak: number
  longestStreak: number
  days: Set<string>
}

function dayKey(ts: number): string {
  const d = new Date(ts)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

function addDays(key: string, n: number): string {
  const [y, m, d] = key.split('-').map(Number)
  const dt = new Date(y!, m!, d! + n)
  return dayKey(dt.getTime())
}

export function activityStats(now = Date.now()): ActivityStats {
  const rows = readPassed()
  const days = new Set(rows.map((r) => dayKey(r.endedAt)))
  const totalMinutes = Math.round(rows.reduce((s, r) => s + r.seconds, 0) / 60)
  const sorted = [...days].sort((a, b) => {
    const [ay, am, ad] = a.split('-').map(Number)
    const [by, bm, bd] = b.split('-').map(Number)
    return new Date(ay!, am!, ad!).getTime() - new Date(by!, bm!, bd!).getTime()
  })

  let longest = 0
  let run = 0
  let prev: string | null = null
  for (const k of sorted) {
    if (prev && k === addDays(prev, 1)) run += 1
    else run = 1
    longest = Math.max(longest, run)
    prev = k
  }

  let current = 0
  let cursor = dayKey(now)
  if (!days.has(cursor)) cursor = addDays(cursor, -1)
  while (days.has(cursor)) {
    current += 1
    cursor = addDays(cursor, -1)
  }

  return { totalMinutes, activeDays: days.size, currentStreak: current, longestStreak: longest, days }
}

export function weekdayLetters(locale: LocaleId): string[] {
  const bcp = localeMeta(locale).bcp47
  const fmt = new Intl.DateTimeFormat(bcp, { weekday: 'narrow' })
  // Monday-first week, anchored to 2026-08-03 (Monday)
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2026, 7, 3 + i))))
}

export function monthTitle(year: number, month: number, locale: LocaleId): string {
  const bcp = localeMeta(locale).bcp47
  return new Intl.DateTimeFormat(bcp, { month: 'long', year: 'numeric' }).format(new Date(year, month, 1))
}

export function formatLongDate(now: Date, locale: LocaleId): string {
  const bcp = localeMeta(locale).bcp47
  return new Intl.DateTimeFormat(bcp, { weekday: 'long', day: 'numeric', month: 'short' }).format(now)
}
