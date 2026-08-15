import { useI18n } from '../lib/i18n'
import type { LocaleId } from '../lib/locales'

export function LangPicker({ onPick }: { onPick?: () => void }) {
  const { locale, setLocale, locales, t } = useI18n()
  return (
    <div>
      <p className="text-xs text-mute">{t('home_lang')}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {locales.map((l) => {
          const on = locale === l.id
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setLocale(l.id as LocaleId)
                onPick?.()
              }}
              className={`lang-chip rounded-full px-3.5 py-2 text-sm ${
                on
                  ? 'bg-[#7B61FF] text-white shadow-[0_0_18px_rgba(123,97,255,0.28)]'
                  : 'bg-white/[0.05] text-cream/85'
              }`}
            >
              {l.native}
            </button>
          )
        })}
      </div>
    </div>
  )
}
