import { useI18n } from '../lib/i18n'
import { sampleLine, speak, stopSpeak, writeTtsVoice, type TtsVoice } from '../lib/speech'
import { VoicePlayer, useSpeech } from './VoicePlayer'

export function VoicePicker() {
  const { t, meta } = useI18n()
  const { voice } = useSpeech()

  function pick(next: TtsVoice) {
    writeTtsVoice(next)
  }

  return (
    <div>
      <p className="text-xs text-mute">{t('voice')}</p>
      <p className="mt-2 text-sm leading-6 text-white/55">{t('voice_hint')}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(['nova', 'shimmer'] as const).map((id) => {
          const on = voice === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => pick(id)}
              className={`lang-chip rounded-full px-3.5 py-2 text-sm ${
                on
                  ? 'bg-[#7B61FF] text-white shadow-[0_0_18px_rgba(123,97,255,0.28)]'
                  : 'bg-white/[0.05] text-cream/85'
              }`}
            >
              {id === 'nova' ? t('voice_nova') : t('voice_shimmer')}
            </button>
          )
        })}
      </div>
      <button
        type="button"
        className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white"
        onClick={() => {
          stopSpeak()
          speak(sampleLine(meta.bcp47), { lang: meta.bcp47, mode: 'calm' })
        }}
      >
        {t('voice_try')}
      </button>
      <div className="mt-4">
        <VoicePlayer />
      </div>
    </div>
  )
}
