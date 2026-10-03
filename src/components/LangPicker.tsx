import { useI18n } from '../lib/i18n'
import { isNativeApp, openPhoneLanguageSettings } from '../lib/device'
import { GhostButton } from './ui'
import type { LocaleId } from '../lib/locales'

/** `compact` drops the explanations, for first launch where the screen already says what this is. */
export function LangPicker({ onPick, compact = false }: { onPick?: () => void; compact?: boolean }) {
  const { locale, setLocale, locales, t, meta, followDevice, source } = useI18n()
  const native = isNativeApp()

  async function openPhone() {
    await openPhoneLanguageSettings().catch(() => false)
    onPick?.()
  }

  return (
    <div>
      {compact ? null : (
        <>
          <p className="text-xs text-mute">{t('home_lang')}</p>
          <p className="mt-2 text-sm leading-6 text-white/55">{t('lang_pick_hint')}</p>
          <p className="mt-3 text-sm text-white/80">{t('lang_now_device', { n: meta.native })}</p>
          <p className="mt-6 text-xs text-mute">{t('lang_browser')}</p>
        </>
      )}
      <div className={`${compact ? '' : 'mt-3'} flex flex-wrap gap-2`}>
        <button
          type="button"
          onClick={() => {
            followDevice()
            onPick?.()
          }}
          className={`lang-chip rounded-full px-3.5 py-2 text-sm ${
            source === 'device'
              ? 'bg-[#FFE3C2] font-medium text-[#1d1428]'
              : 'bg-white/[0.06] text-cream/85'
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
                  ? 'bg-[#FFE3C2] font-medium text-[#1d1428]'
                  : 'bg-white/[0.06] text-cream/85'
              }`}
            >
              {l.native}
            </button>
          )
        })}
      </div>
      {native && !compact ? (
        <GhostButton className="mt-4 w-full" onClick={() => void openPhone()}>
          {t('lang_phone')}
        </GhostButton>
      ) : null}
    </div>
  )
}
