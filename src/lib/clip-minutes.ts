import type { LocaleId } from './locales'
import { VOICE_SECONDS } from './voice-durations'

/**
 * Minutes to show for a narrated clip in this language: the real length of
 * the baked audio, rounded, so a card never promises more than it plays.
 * Falls back to the hand-written number when there is no audio for it.
 */
export function clipMinutes(clipId: string, locale: LocaleId, fallback: number): number {
  const sec = VOICE_SECONDS[`${locale}:${clipId}`]
  return sec ? Math.max(1, Math.round(sec / 60)) : fallback
}

/** Average real minutes per day across a program's days. */
export function programDayMinutes(programId: string, days: number[], locale: LocaleId, fallback: number): number {
  const known = days.map((d) => VOICE_SECONDS[`${locale}:prog:${programId}-${d}`]).filter((s): s is number => Boolean(s))
  if (!known.length) return fallback
  return Math.max(1, Math.round(known.reduce((a, s) => a + s, 0) / known.length / 60))
}
