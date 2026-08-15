import { useI18n } from '../lib/i18n'
import type { LocaleId } from '../lib/locales'

export function LangPicker() {
  const { locale, setLocale, locales, t } = useI18n()
  return (
    <label className="block">
      <span className="text-xs text-mute">{t('home_lang')}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as LocaleId)}
        className="mt-3 w-full appearance-none rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-cream"
      >
        {locales.map((l) => (
          <option key={l.id} value={l.id}>
            {l.native}
          </option>
        ))}
      </select>
    </label>
  )
}
