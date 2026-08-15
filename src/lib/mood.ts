import { readJson, writeJson } from './storage'
import type { StringKey } from './strings'

export const MOODS = ['calm', 'tense', 'sleepless', 'wave', 'distant'] as const
export type MoodId = (typeof MOODS)[number]

export const MOOD_KEYS: Record<MoodId, StringKey> = {
  calm: 'mood_calm',
  tense: 'mood_tense',
  sleepless: 'mood_sleepless',
  wave: 'mood_wave',
  distant: 'mood_distant',
}

export type MoodEntry = { day: string; mood: MoodId; at: number }

function todayKey(now = Date.now()): string {
  const d = new Date(now)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

export function readMood(): MoodId | null {
  const v = readJson<string | null>('mood', null)
  return MOODS.includes(v as MoodId) ? (v as MoodId) : null
}

export function readMoodHistory(): MoodEntry[] {
  return readJson<MoodEntry[]>('moodHistory', [])
}

export function writeMood(id: MoodId | null) {
  writeJson('mood', id)
  if (!id) return
  const day = todayKey()
  const prev = readMoodHistory().filter((e) => e.day !== day)
  writeJson('moodHistory', [{ day, mood: id, at: Date.now() }, ...prev].slice(0, 120))
}

export function moodForDay(day: string): MoodId | null {
  return readMoodHistory().find((e) => e.day === day)?.mood ?? null
}

export function lastMoodDays(n = 14, now = Date.now()): { day: string; mood: MoodId | null }[] {
  const d = new Date(now)
  d.setHours(12, 0, 0, 0)
  const rows: { day: string; mood: MoodId | null }[] = []
  for (let i = n - 1; i >= 0; i--) {
    const x = new Date(d)
    x.setDate(d.getDate() - i)
    const key = `${x.getFullYear()}-${x.getMonth()}-${x.getDate()}`
    rows.push({ day: key, mood: moodForDay(key) })
  }
  return rows
}
