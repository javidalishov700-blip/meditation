import { useI18n } from '../lib/i18n'
import { isNativeApp, openPhoneLanguageSettings } from '../lib/device'
import { GhostButton } from './ui'
import type { LocaleId } from '../lib/locales'

export function LangPicker({ onPick }: { onPick?: () => void }) {
  const { locale, setLocale, locales, t, meta, followDevice, source } = useI18n()
  const native = isNativeApp()

  async function openPhone() {
    await openPhoneLanguageSettings().catch(() => false)
    onPick?.()
  }

  return (
    <div>
      <p className="text-xs text-mute">{t('home_lang')}</p>
      <p className="mt-2 text-sm leading-6 text-white/55">{t('lang_pick_hint')}</p>
      <p className="mt-3 text-sm text-white/80">{t('lang_now_device', { n: meta.native })}</p>
      <p className="mt-6 text-xs text-mute">{t('lang_browser')}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            followDevice()
            onPick?.()
          }}
          className={`lang-chip rounded-full px-3.5 py-2 text-sm ${
            source === 'device'
              ? 'bg-[#7B61FF] text-white shadow-[0_0_18px_rgba(123,97,255,0.28)]'
              : 'bg-white/[0.05] text-cream/85'
          }`}
        >
          {t('lang_follow')}
        </button>
        {locales.map((l) => {
          const on = source === 'manual' && locale === l.id
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
      {native ? (
        <GhostButton className="mt-4 w-full" onClick={() => void openPhone()}>
          {t('lang_phone')}
        </GhostButton>
      ) : null}
    </div>
  )
}
