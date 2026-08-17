import { useState, useSyncExternalStore, type ReactNode } from 'react'
import { useI18n } from '../lib/i18n'
import { formatMmSs } from '../lib/format'
import {
  speechSnap,
  subscribeSpeak,
  stopSpeak,
  togglePause,
  writeVoiceVolume,
  seekSpeakBy,
  seekSpeakTo,
} from '../lib/speech'

export function useSpeech() {
  return useSyncExternalStore(subscribeSpeak, speechSnap, speechSnap)
}

export function VoicePlayer({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()
  const snap = useSpeech()
  const [drag, setDrag] = useState<number | null>(null)
  const active = snap.speaking || snap.loading || snap.paused
  const err =
    snap.error === 'voice_missing' ? t('tts_missing') : snap.error ? t('tts_fail') : null
  const shownMs = drag ?? snap.elapsedMs
  const dur = Math.max(1, snap.durationMs)

  return (
    <div className={`rounded-[1.35rem] border border-white/10 bg-black/35 px-4 py-3 ${compact ? '' : 'backdrop-blur-md'}`}>
      <div className="flex items-center gap-2">
        <IconButton
          disabled={!active}
          label={t('skip_back')}
          onClick={() => seekSpeakBy(-15000)}
        >
          <SkipGlyph back />
        </IconButton>
        <button
          type="button"
          disabled={!active}
          onClick={(e) => {
            e.stopPropagation()
            if (!active) return
            togglePause()
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7B61FF] text-white disabled:bg-white/10 disabled:text-white/30"
          aria-label={snap.paused ? t('play') : t('pause')}
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
        <IconButton
          disabled={!active}
          label={t('skip_fwd')}
          onClick={() => seekSpeakBy(15000)}
        >
          <SkipGlyph />
        </IconButton>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
            {snap.loading ? t('voice_loading') : snap.paused ? t('pause') : snap.speaking ? t('playing') : t('voice')}
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
      {active && snap.durationMs > 0 ? (
        <div className="mt-3">
          <div className="flex justify-between text-[11px] tabular-nums text-white/45">
            <span>{formatMmSs(shownMs / 1000)}</span>
            <span>{formatMmSs(dur / 1000)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={dur}
            step={250}
            value={Math.min(shownMs, dur)}
            className="steady-range mt-1 w-full"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={() => {
              setDrag(snap.elapsedMs)
            }}
            onPointerUp={(e) => {
              const n = Number((e.currentTarget as HTMLInputElement).value)
              setDrag(null)
              seekSpeakTo(n)
            }}
            onChange={(e) => {
              setDrag(Number(e.target.value))
            }}
          />
        </div>
      ) : null}
      {err ? <p className="mt-2 text-xs leading-5 text-rose-200/80">{err}</p> : null}
    </div>
  )
}

function IconButton({
  disabled,
  label,
  onClick,
  children,
}: {
  disabled: boolean
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        if (disabled) return
        onClick()
      }}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/80 disabled:text-white/25"
    >
      {children}
    </button>
  )
}

function SkipGlyph({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${back ? 'scale-x-[-1]' : ''}`} fill="currentColor">
      <path d="M5 6.5v11l8.5-5.5L5 6.5Zm8.2 0v11L21.7 12 13.2 6.5Z" />
    </svg>
  )
}
