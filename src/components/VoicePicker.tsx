import { useI18n } from '../lib/i18n'
import { sampleLine, speak, stopSpeak } from '../lib/speech'
import { VoicePlayer } from './VoicePlayer'

export function VoicePicker() {
  const { t, meta } = useI18n()

  return (
    <div>
      <p className="text-xs text-mute">{t('voice')}</p>
      <p className="mt-2 text-sm leading-6 text-white/55">{t('voice_hint')}</p>
      <button
        type="button"
        className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white"
        onClick={() => {
          stopSpeak()
          speak(sampleLine(meta.bcp47), { lang: meta.bcp47, mode: 'calm', clipId: 'sample' })
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
