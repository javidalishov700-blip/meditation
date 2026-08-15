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

export function readMood(): MoodId | null {
  const v = readJson<string | null>('mood', null)
  return MOODS.includes(v as MoodId) ? (v as MoodId) : null
}

export function writeMood(id: MoodId | null) {
  writeJson('mood', id)
}
