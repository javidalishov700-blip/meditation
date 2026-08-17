import { localeMeta, type LocaleId } from './locales'
import { translate } from './strings'

export function formatDuration(seconds: number, locale: LocaleId = 'en'): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  if (m <= 0) return translate('sec_n', locale, { n: r })
  return `${translate('min_n', locale, { n: m })} ${String(r).padStart(2, '0')}`
}

export function formatMmSs(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export function formatClock(ts: number, locale: LocaleId = 'en'): string {
  const bcp = localeMeta(locale).bcp47
  return new Date(ts).toLocaleString(bcp, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatHm(minutes: number, locale: LocaleId = 'en'): string {
  const m = ((minutes % 1440) + 1440) % 1440
  const d = new Date()
  d.setHours(Math.floor(m / 60), m % 60, 0, 0)
  return d.toLocaleTimeString(localeMeta(locale).bcp47, { hour: '2-digit', minute: '2-digit' })
}

export function greeting(now = new Date(), locale: LocaleId = 'en'): string {
  const h = now.getHours()
  if (h < 6) return translate('greet_night', locale)
  if (h < 12) return translate('greet_morn', locale)
  if (h < 18) return translate('greet_day', locale)
  return translate('greet_eve', locale)
}
