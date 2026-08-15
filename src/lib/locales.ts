export const LOCALE_IDS = [
  'tr',
  'en',
  'az',
  'ru',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'ar',
  'nl',
  'pl',
  'uk',
  'ja',
  'fa',
  'zh',
] as const

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
  { id: 'az', native: 'Azərbaycan', bcp47: 'az-AZ', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'ru', native: 'Русский', bcp47: 'ru-RU', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'es', native: 'Español', bcp47: 'es-ES', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'fr', native: 'Français', bcp47: 'fr-FR', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'de', native: 'Deutsch', bcp47: 'de-DE', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'it', native: 'Italiano', bcp47: 'it-IT', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'pt', native: 'Português', bcp47: 'pt-PT', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'ar', native: 'العربية', bcp47: 'ar-SA', dir: 'rtl', emergency: '911 / 112', tel: '112' },
  { id: 'nl', native: 'Nederlands', bcp47: 'nl-NL', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'pl', native: 'Polski', bcp47: 'pl-PL', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'uk', native: 'Українська', bcp47: 'uk-UA', dir: 'ltr', emergency: '112', tel: '112' },
  { id: 'ja', native: '日本語', bcp47: 'ja-JP', dir: 'ltr', emergency: '119 / 110', tel: '119' },
  { id: 'fa', native: 'فارسی', bcp47: 'fa-IR', dir: 'rtl', emergency: '115 / 125', tel: '115' },
  { id: 'zh', native: '中文', bcp47: 'zh-CN', dir: 'ltr', emergency: '120', tel: '120' },
]

export function localeMeta(id: string): LocaleMeta {
  return LOCALES.find((l) => l.id === id) ?? LOCALES[1]!
}

export function detectLocale(): LocaleId {
  const raw = (navigator.language || 'en').toLowerCase()
  const short = raw.slice(0, 2)
  if (raw.startsWith('zh')) return 'zh'
  if (short === 'az') return 'az'
  if (short === 'uk') return 'uk'
  if (short === 'fa') return 'fa'
  if (short === 'ar') return 'ar'
  if (short === 'ja') return 'ja'
  if (short === 'tr') return 'tr'
  if (short === 'ru') return 'ru'
  if (short === 'es') return 'es'
  if (short === 'fr') return 'fr'
  if (short === 'de') return 'de'
  if (short === 'it') return 'it'
  if (short === 'pt') return 'pt'
  if (short === 'nl') return 'nl'
  if (short === 'pl') return 'pl'
  return 'en'
}

/** Pipe order: tr|en|az|ru|es|fr|de|it|pt|ar|nl|pl|uk|ja|fa|zh */
export function R(packed: string): Record<LocaleId, string> {
  const parts = packed.split('|')
  const out = {} as Record<LocaleId, string>
  LOCALE_IDS.forEach((id, i) => {
    out[id] = (parts[i] || parts[1] || parts[0] || '').trim()
  })
  return out
}

export function pickLocale<T>(map: Partial<Record<LocaleId, T>>, locale: LocaleId, fallback: T): T {
  if (map[locale] != null) return map[locale] as T
  if ((locale === 'az' || locale === 'tr') && map.tr != null) return map.tr as T
  if (map.en != null) return map.en as T
  return fallback
}
