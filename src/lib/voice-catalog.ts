import { locLibrary, locMedPath } from './copy'
import { clarity, extras, meditations, sleepLab, stories, writings } from './library'
import { VOICE_LANGS, type VoiceLang } from './locales'
import type { LibraryItem } from './types'
import { VOICE_SAMPLE } from './voice-lines'

export type VoiceClip = {
  id: string
  locale: VoiceLang
  text: string
}

function libraryItems(): LibraryItem[] {
  return [...stories, ...writings, ...sleepLab, ...clarity, ...extras]
}

export function listVoiceClips(): VoiceClip[] {
  const out: VoiceClip[] = []
  for (const locale of VOICE_LANGS) {
    const sample = VOICE_SAMPLE[locale]?.trim()
    if (sample) out.push({ id: 'sample', locale, text: sample })
    for (const path of meditations) {
      const loc = locMedPath(path, locale)
      for (const step of loc.steps) {
        const text = step.body.trim()
        if (!text) continue
        out.push({ id: `med:${step.id}`, locale, text })
      }
    }
    for (const raw of libraryItems()) {
      const item = locLibrary(raw, locale)
      const parts = [item.body, item.sentence, item.nightSeed].filter(Boolean).join('\n\n').trim()
      if (!parts) continue
      out.push({ id: `lib:${item.id}`, locale, text: parts })
    }
  }
  return out
}
