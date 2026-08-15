import { useSyncExternalStore } from 'react'
import { useI18n } from '../lib/i18n'
import {
  speechSnap,
  subscribeSpeak,
  stopSpeak,
  togglePause,
  writeVoiceVolume,
} from '../lib/speech'

export function useSpeech() {
  return useSyncExternalStore(subscribeSpeak, speechSnap, speechSnap)
}

export function VoicePlayer({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()
  const snap = useSpeech()
  const active = snap.speaking || snap.loading
  const err =
    snap.error === 'missing_key' ? t('tts_missing') : snap.error ? t('tts_fail') : null

  return (
    <div className={`rounded-[1.35rem] border border-white/10 bg-black/35 px-4 py-3 ${compact ? '' : 'backdrop-blur-md'}`}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={!active && !snap.paused}
          onClick={(e) => {
            e.stopPropagation()
            if (!active && !snap.paused) return
            togglePause()
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7B61FF] text-white disabled:bg-white/10 disabled:text-white/30"
          aria-label={snap.paused ? t('play') : t('stop')}
        >
          {snap.loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : snap.paused || !snap.speaking ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M8 5.5v13l11-6.5L8 5.5Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M7 6h3.2v12H7V6Zm6.8 0H17v12h-3.2V6Z" />
            </svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
            {snap.loading ? t('voice_loading') : snap.paused ? t('ready') : snap.speaking ? t('playing') : t('voice')}
          </p>
          <label className="mt-2 flex items-center gap-2 text-xs text-white/50">
            <span>{t('vol_voice')}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={snap.volume}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => writeVoiceVolume(Number(e.target.value))}
              className="steady-range flex-1"
            />
          </label>
        </div>
        {active ? (
          <button
            type="button"
            className="text-xs text-white/40"
            onClick={(e) => {
              e.stopPropagation()
              stopSpeak()
            }}
          >
            {t('speak_stop')}
          </button>
        ) : null}
      </div>
      {err ? <p className="mt-2 text-xs leading-5 text-rose-200/80">{err}</p> : null}
    </div>
  )
}
