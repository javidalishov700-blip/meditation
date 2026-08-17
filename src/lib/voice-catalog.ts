import { locDay, locLibrary, locMedPath } from './copy'
import { programs } from './content'
import { clarity, extras, meditations, sleepLab, stories, writings } from './library'
import { LOCALE_IDS, VOICE_LANGS, type LocaleId } from './locales'
import { quotes } from './quotes'
import { sosSentences, tapSentences } from './sosPhrases'
import { translate, type StringKey } from './strings'
import type { LibraryItem } from './types'
import { VOICE_SAMPLE } from './voice-lines'

export type VoiceClip = {
  id: string
  locale: LocaleId
  text: string
}

const SOS_UI: StringKey[] = [
  'sos_in',
  'sos_hold',
  'sos_out',
  'sos_ground_sub',
  'sos_obj_1',
  'sos_obj_2',
  'sos_obj_3',
  'sos_c_red',
  'sos_c_blue',
  'sos_c_green',
  'sos_c_yellow',
  'sos_c_white',
  'sos_c_black',
  'sos_c_wood',
  'sos_c_gray',
  'sos_feet',
  'sos_then_breath',
  'sos_thanks',
  'sos_passed',
]

function libraryItems(): LibraryItem[] {
  return [...stories, ...writings, ...sleepLab, ...clarity, ...extras]
}

function push(out: VoiceClip[], locale: LocaleId, id: string, text: string) {
  const clean = text.trim()
  if (!clean) return
  out.push({ id, locale, text: clean })
}

export function listVoiceClips(): VoiceClip[] {
  const out: VoiceClip[] = []
  for (const locale of LOCALE_IDS) {
    const sample = VOICE_SAMPLE[locale]?.trim()
    if (sample) push(out, locale, 'sample', sample)

    for (const key of SOS_UI) {
      push(out, locale, `ui:${key}`, translate(key, locale))
    }
    sosSentences(locale).forEach((line, i) => push(out, locale, `sos:wave:${i}`, line))
    tapSentences(locale).forEach((line, i) => push(out, locale, `sos:tap:${i}`, line))
  }

  for (const locale of VOICE_LANGS) {
    for (const q of quotes) {
      push(out, locale, `quote:${q.id}`, q.text[locale] || q.text.en || q.text.tr)
    }

    for (const path of meditations) {
      const loc = locMedPath(path, locale)
      for (const step of loc.steps) {
        push(out, locale, `med:${step.id}`, step.body)
      }
    }

    for (const raw of libraryItems()) {
      const item = locLibrary(raw, locale)
      const parts = [item.body, item.sentence, item.nightSeed].filter(Boolean).join('\n\n')
      push(out, locale, `lib:${item.id}`, parts)
    }

    for (const prog of programs) {
      for (const d of prog.days) {
        const loc = locDay(prog.id, d, locale)
        const blocks = loc.blocks.map((b) => `${b.title}. ${b.body}`).join('\n\n')
        const parts = [
          loc.summary,
          blocks,
          loc.sentence,
          loc.scene,
          loc.release,
          loc.gratitude,
          loc.nightSeed,
        ]
          .filter(Boolean)
          .join('\n\n')
        push(out, locale, `prog:${prog.id}-${d.day}`, parts)
      }
    }
  }
  return out
}
