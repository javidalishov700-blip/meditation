import { useI18n } from '../lib/i18n'
import type { LocaleId } from '../lib/locales'

export function LangPicker({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, locales, t } = useI18n()
  if (compact) {
    return (
      <label className="block">
        <span className="sr-only">{t('home_lang')}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as LocaleId)}
          className="rounded-full border border-white/15 bg-ink/60 px-3 py-1.5 text-[11px] text-cream"
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
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose-300/85">{t('home_lang')}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {locales.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLocale(l.id)}
            className={`rounded-2xl border px-3 py-2.5 text-left text-sm ${
              l.id === locale ? 'border-rose-300/50 bg-rose-400/20' : 'border-white/10 bg-white/5'
            }`}
          >
            {l.native}
          </button>
        ))}
      </div>
    </div>
  )
}
