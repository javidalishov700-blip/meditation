export const LOCALE_IDS = ['tr', 'en', 'es', 'fr', 'de', 'it', 'az', 'ru'] as const

export type LocaleId = (typeof LOCALE_IDS)[number]

/** Languages we bake to MP3 for the store. */
export const VOICE_LANGS = ['tr', 'az', 'en', 'ru', 'es', 'fr'] as const
export type VoiceLang = (typeof VOICE_LANGS)[number]

export type LocaleMeta = {
  id: LocaleId
  native: string
  bcp47: string
  dir: 'ltr' | 'rtl'
  emergency: string
  tel: string
}

export const LOCALES: LocaleMeta[] = [
  { id: 'tr', native: 'Türkçe', bcp47: 'tr-TR', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'az', native: 'Azərbaycan', bcp47: 'az-AZ', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'en', native: 'English', bcp47: 'en-US', dir: 'ltr', emergency: '112 / 911', tel: '112' },
  { id: 'ru', native: 'Русский', bcp47: 'ru-RU', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'es', native: 'Español', bcp47: 'es-ES', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'fr', native: 'Français', bcp47: 'fr-FR', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'de', native: 'Deutsch', bcp47: 'de-DE', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'it', native: 'Italiano', bcp47: 'it-IT', dir: 'ltr', emergency: '112', tel: '112' },
]

export function localeMeta(id: string): LocaleMeta {
  return LOCALES.find((l) => l.id === id) ?? LOCALES[2]!
}

export function isVoiceLang(id: string): id is VoiceLang {
  return (VOICE_LANGS as readonly string[]).includes(id)
}

function matchLocale(raw: string): LocaleId | null {
  const short = (raw || '').slice(0, 2).toLowerCase()
  if (short === 'tr') return 'tr'
  if (short === 'az') return 'az'
  if (short === 'ru') return 'ru'
  if (short === 'es') return 'es'
  if (short === 'fr') return 'fr'
  if (short === 'de') return 'de'
  if (short === 'it') return 'it'
  if (short === 'en') return 'en'
  return null
}

export function detectLocale(): LocaleId {
  if (typeof navigator === 'undefined') return 'en'
  const listed = [...(navigator.languages || []), navigator.language]
  for (const raw of listed) {
    const hit = matchLocale(raw)
    if (hit) return hit
  }
  return 'en'
}

/**
 * Packing:
 * - 6 slots: tr|en|es|fr|de|it  (az→tr, ru→en)
 * - 8 slots: tr|en|az|ru|es|fr|de|it
 * - 16 slots (legacy): tr|en|az|ru|es|fr|de|it|…
 */
const LEGACY_SLOT: Record<LocaleId, number> = {
  tr: 0,
  en: 1,
  az: 2,
  ru: 3,
  es: 4,
  fr: 5,
  de: 6,
  it: 7,
}

const COMPACT_SLOT: Record<LocaleId, number> = {
  tr: 0,
  en: 1,
  es: 2,
  fr: 3,
  de: 4,
  it: 5,
  az: 0,
  ru: 1,
}

export function R(packed: string): Record<LocaleId, string> {
  const parts = packed.split('|')
  const out = {} as Record<LocaleId, string>
  const table = parts.length === 6 ? COMPACT_SLOT : parts.length >= 8 ? LEGACY_SLOT : null
  LOCALE_IDS.forEach((id) => {
    if (table) {
      out[id] = (parts[table[id]] || parts[1] || parts[0] || '').trim()
      return
    }
    out[id] = (id === 'tr' || id === 'az' ? parts[0] : parts[1] || parts[0] || '').trim()
  })
  return out
}

export function pickLocale<T>(map: Partial<Record<LocaleId, T>>, locale: LocaleId, fallback: T): T {
  if (map[locale] != null) return map[locale] as T
  if (locale === 'az' && map.tr != null) return map.tr as T
  if (locale === 'ru' && map.en != null) return map.en as T
  if (map.en != null) return map.en as T
  if (map.tr != null) return map.tr as T
  return fallback
}
