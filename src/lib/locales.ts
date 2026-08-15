export const LOCALE_IDS = ['tr', 'en', 'es', 'fr', 'de', 'it'] as const

export type LocaleId = (typeof LOCALE_IDS)[number]

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
  { id: 'en', native: 'English', bcp47: 'en-US', dir: 'ltr', emergency: '112 / 911', tel: '112' },
  { id: 'es', native: 'Español', bcp47: 'es-ES', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'fr', native: 'Français', bcp47: 'fr-FR', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'de', native: 'Deutsch', bcp47: 'de-DE', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'it', native: 'Italiano', bcp47: 'it-IT', dir: 'ltr', emergency: '112', tel: '112' },
]

export function localeMeta(id: string): LocaleMeta {
  return LOCALES.find((l) => l.id === id) ?? LOCALES[1]!
}

export function detectLocale(): LocaleId {
  const raw = (navigator.language || 'en').toLowerCase()
  const short = raw.slice(0, 2)
  if (short === 'tr' || short === 'az') return 'tr'
  if (short === 'es') return 'es'
  if (short === 'fr') return 'fr'
  if (short === 'de') return 'de'
  if (short === 'it') return 'it'
  if (short === 'en') return 'en'
  return 'en'
}

/**
 * Packing:
 * - 6 slots: tr|en|es|fr|de|it
 * - 16 slots (legacy): tr|en|az|ru|es|fr|de|it|…
 */
const LEGACY_SLOT: Record<LocaleId, number> = {
  tr: 0,
  en: 1,
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
    out[id] = (id === 'tr' ? parts[0] : parts[1] || parts[0] || '').trim()
  })
  return out
}

export function pickLocale<T>(map: Partial<Record<LocaleId, T>>, locale: LocaleId, fallback: T): T {
  if (map[locale] != null) return map[locale] as T
  if (map.en != null) return map.en as T
  if (map.tr != null) return map.tr as T
  return fallback
}
