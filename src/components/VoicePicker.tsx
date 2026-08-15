import { useEffect, useState } from 'react'
import { useI18n } from '../lib/i18n'
import {
  listVoices,
  readVoiceUri,
  sampleLine,
  speak,
  stopSpeak,
  warmVoices,
  writeVoiceUri,
} from '../lib/speech'

export function VoicePicker() {
  const { t, meta } = useI18n()
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => listVoices(meta.bcp47))
  const [uri, setUri] = useState<string | null>(() => readVoiceUri(meta.bcp47))

  useEffect(() => {
    warmVoices()
    const sync = () => {
      setVoices(listVoices(meta.bcp47))
      setUri(readVoiceUri(meta.bcp47))
    }
    sync()
    window.speechSynthesis?.addEventListener?.('voiceschanged', sync)
    return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', sync)
  }, [meta.bcp47])

  function pick(next: string | null) {
    writeVoiceUri(meta.bcp47, next)
    setUri(next)
  }

  const shown = voices.slice(0, 8)

  return (
    <div>
      <p className="text-xs text-mute">{t('voice')}</p>
      <p className="mt-2 text-sm leading-6 text-white/55">{t('voice_hint')}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => pick(null)}
          className={`lang-chip rounded-full px-3.5 py-2 text-sm ${
            uri == null
              ? 'bg-[#7B61FF] text-white shadow-[0_0_18px_rgba(123,97,255,0.28)]'
              : 'bg-white/[0.05] text-cream/85'
          }`}
        >
          {t('voice_auto')}
        </button>
        {shown.map((v) => {
          const on = uri === v.voiceURI
          return (
            <button
              key={v.voiceURI}
              type="button"
              onClick={() => pick(v.voiceURI)}
              className={`lang-chip rounded-full px-3.5 py-2 text-sm ${
                on
                  ? 'bg-[#7B61FF] text-white shadow-[0_0_18px_rgba(123,97,255,0.28)]'
                  : 'bg-white/[0.05] text-cream/85'
              }`}
            >
              {v.name.replace(/Google |Microsoft |Desktop /gi, '').trim()}
            </button>
          )
        })}
      </div>
      {shown.length === 0 ? <p className="mt-3 text-sm text-white/45">{t('voice_none')}</p> : null}
      <button
        type="button"
        className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white"
        onClick={() => {
          stopSpeak()
          speak(sampleLine(meta.bcp47), { lang: meta.bcp47 })
        }}
      >
        {t('voice_try')}
      </button>
    </div>
  )
}
