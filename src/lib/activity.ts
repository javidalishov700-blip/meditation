import { localeMeta, type LocaleId } from './locales'
import { readPassed } from './passed'
import { readJson, readStringList, writeJson } from './storage'

export type ActivityStats = {
  totalMinutes: number
  activeDays: number
  currentStreak: number
  longestStreak: number
  days: Set<string>
}

export function dayKey(ts: number): string {
  const d = new Date(ts)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

export function addDays(key: string, n: number): string {
  const [y, m, d] = key.split('-').map(Number)
  const dt = new Date(y!, m!, d! + n)
  return dayKey(dt.getTime())
}

export function weekKey(now = Date.now()): string {
  const d = new Date(now)
  const offset = (d.getDay() + 6) % 7
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - offset)
  return dayKey(monday.getTime())
}

export function readSessionDays(): string[] {
  return readStringList('sessionDays')
}

export function readSessionKinds(): string[] {
  return readStringList('sessionKinds')
}

export function readSessionIds(): string[] {
  return readStringList('sessionIds')
}

export function markSession(kind: string, id?: string, now = Date.now()) {
  const key = dayKey(now)
  const days = readSessionDays()
  if (!days.includes(key)) writeJson('sessionDays', [key, ...days].slice(0, 400))
  const kinds = readSessionKinds()
  if (!kinds.includes(kind)) writeJson('sessionKinds', [...kinds, kind])
  if (id) {
    const ids = readSessionIds()
    if (!ids.includes(id)) writeJson('sessionIds', [...ids, id].slice(0, 400))
  }
  void import('./unlock-notify').then((m) => m.announceSkillUnlocks())
}

type FreezeState = { week: string; used: number; days: string[] }

function readFreeze(): FreezeState {
  const v = readJson<unknown>('freeze', null)
  if (!v || typeof v !== 'object') return { week: '', used: 0, days: [] }
  const o = v as Record<string, unknown>
  return {
    week: typeof o.week === 'string' ? o.week : '',
    used: typeof o.used === 'number' ? o.used : 0,
    days: Array.isArray(o.days) ? o.days.filter((x): x is string => typeof x === 'string') : [],
  }
}

export function freezeDays(now = Date.now()): string[] {
  const st = readFreeze()
  return st.week === weekKey(now) ? st.days : []
}

export function freezeLeft(now = Date.now()): number {
  const st = readFreeze()
  const w = weekKey(now)
  if (st.week !== w) return 1
  return Math.max(0, 1 - st.used)
}

function rawActiveDays(): Set<string> {
  const sos = readPassed().map((r) => dayKey(r.endedAt))
  return new Set([...sos, ...readSessionDays()])
}

export function canApplyFreeze(now = Date.now()): boolean {
  if (freezeLeft(now) <= 0) return false
  const yesterday = addDays(dayKey(now), -1)
  return !rawActiveDays().has(yesterday) && !freezeDays(now).includes(yesterday)
}

export function applyFreeze(now = Date.now()): boolean {
  if (!canApplyFreeze(now)) return false
  const w = weekKey(now)
  const yesterday = addDays(dayKey(now), -1)
  const st = readFreeze()
  const days = st.week === w ? st.days : []
  writeJson('freeze', { week: w, used: 1, days: [...days, yesterday] })
  return true
}

export function activityStats(now = Date.now()): ActivityStats {
  const days = new Set([...rawActiveDays(), ...freezeDays(now)])
  const rows = readPassed()
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
  let guard = 0
  while (days.has(cursor) && guard < 400) {
    current += 1
    guard += 1
    const next = addDays(cursor, -1)
    if (next === cursor) break
    cursor = next
  }

  return { totalMinutes, activeDays: days.size, currentStreak: current, longestStreak: longest, days }
}

export function weekdayLetters(locale: LocaleId): string[] {
  try {
    const bcp = localeMeta(locale).bcp47
    const fmt = new Intl.DateTimeFormat(bcp, { weekday: 'narrow' })
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2026, 7, 3 + i))))
  } catch {
    return ['P', 'S', 'Ç', 'P', 'C', 'C', 'P']
  }
}

export function monthTitle(year: number, month: number, locale: LocaleId): string {
  try {
    const bcp = localeMeta(locale).bcp47
    return new Intl.DateTimeFormat(bcp, { month: 'long', year: 'numeric' }).format(new Date(year, month, 1))
  } catch {
    return `${year}-${month + 1}`
  }
}

export function formatLongDate(now: Date, locale: LocaleId): string {
  const bcp = localeMeta(locale).bcp47
  return new Intl.DateTimeFormat(bcp, { weekday: 'long', day: 'numeric', month: 'short' }).format(now)
}
