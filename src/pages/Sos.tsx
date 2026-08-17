import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { audio, SOS_DEFAULT_BED, isBedId } from '../lib/audio'
import { formatDuration } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { addPassed } from '../lib/passed'
import { sosSentences, tapSentences } from '../lib/sosPhrases'
import { speak, speakCue, speechSnap, stopSpeak } from '../lib/speech'
import { readJson, writeJson } from '../lib/storage'
import { GhostButton, PrimaryButton } from '../components/ui'
import { BedPicker } from '../components/BedPicker'
import { useWakeLock } from '../lib/wake'
import type { StringKey } from '../lib/strings'

type Phase = 'idle' | 'ground' | 'feet' | 'inhale' | 'hold' | 'exhale' | 'phrase' | 'tap' | 'done'

const OBJ_KEYS = ['sos_obj_1', 'sos_obj_2', 'sos_obj_3'] as const satisfies readonly StringKey[]

const COLORS: { key: StringKey; hex: string }[] = [
  { key: 'sos_c_red', hex: '#e11d48' },
  { key: 'sos_c_blue', hex: '#3b82f6' },
  { key: 'sos_c_green', hex: '#22c55e' },
  { key: 'sos_c_yellow', hex: '#eab308' },
  { key: 'sos_c_white', hex: '#f8fafc' },
  { key: 'sos_c_black', hex: '#171717' },
  { key: 'sos_c_wood', hex: '#b45309' },
  { key: 'sos_c_gray', hex: '#6b7280' },
]

function buzz(ms = 28) {
  try {
    navigator.vibrate?.(ms)
  } catch {
    /* ignore */
  }
}

function randomIndex(n: number) {
  return Math.max(0, Math.floor(Math.random() * Math.max(1, n)))
}

function readSosBed() {
  const v = readJson<string | null>('sos.bed', null)
  return v && isBedId(v) ? v : SOS_DEFAULT_BED
}

function MuteVoiceBtn({
  muted,
  onToggle,
  labeled = false,
}: {
  muted: boolean
  onToggle: () => void
  labeled?: boolean
}) {
  const { t } = useI18n()
  const label = muted ? t('sos_voice_on') : t('sos_voice_mute')
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={muted}
      aria-label={label}
      className={`flex items-center gap-2 rounded-full border border-white/12 bg-black/35 ${
        labeled ? 'px-4 py-2.5 text-sm' : 'h-10 w-10 justify-center'
      }`}
    >
      <MuteGlyph muted={muted} />
      {labeled ? <span>{label}</span> : null}
    </button>
  )
}

function MuteGlyph({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10v4h3.2L12 18V6L7.2 10H4Z" />
      {muted ? (
        <path d="M16 9.5 20.5 14.5M20.5 9.5 16 14.5" />
      ) : (
        <path d="M16 9.2a4.2 4.2 0 0 1 0 5.6M18.4 7a7 7 0 0 1 0 10" />
      )}
    </svg>
  )
}

export function Sos() {
  const navigate = useNavigate()
  const { t, locale, meta } = useI18n()
  const [phase, setPhase] = useState<Phase>('idle')
  const [label, setLabel] = useState(t('sos_ready'))
  const [seconds, setSeconds] = useState(0)
  const [taps, setTaps] = useState(0)
  const [sentence, setSentence] = useState(() => tapSentences(locale)[0] || '')
  const [tapIdx, setTapIdx] = useState(0)
  const [livePhrase, setLivePhrase] = useState('')
  const [obj, setObj] = useState(0)
  const [color, setColor] = useState<StringKey | null>(null)
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)
  const [muted, setMuted] = useState(() => readJson('sos.voiceMuted', false))
  const [bed, setBed] = useState(readSosBed)
  const started = useRef(0)
  const running = useRef(false)
  const cycle = useRef(0)
  const mutedRef = useRef(muted)
  mutedRef.current = muted
  const lang = meta.bcp47

  function toggleMute() {
    const next = !muted
    setMuted(next)
    writeJson('sos.voiceMuted', next)
    if (next) stopSpeak()
  }

  function say(text: string, clipId: string) {
    if (mutedRef.current) return
    speak(text, { lang, clipId })
  }

  function cue(text: string, clipId: string) {
    if (mutedRef.current) return
    speakCue(text, lang, clipId)
  }

  async function pickBed(id: string) {
    audio.unlock()
    writeJson('sos.bed', id)
    setBed(id)
    if (phase === 'tap' || phase === 'done') return
    await audio.playBed(id)
    const live = speechSnap()
    if (live.speaking || live.loading) audio.hushForVoice()
  }
  useWakeLock(phase !== 'idle' && phase !== 'done')

  useEffect(() => {
    return () => {
      running.current = false
      audio.stop(0.4)
      stopSpeak()
    }
  }, [])

  useEffect(() => {
    if (phase === 'idle' || phase === 'tap' || phase === 'done') return
    const id = window.setInterval(() => {
      setSeconds(Math.floor((Date.now() - started.current) / 1000))
    }, 250)
    return () => window.clearInterval(id)
  }, [phase])

  function wait(ms: number) {
    return new Promise<void>((resolve) => {
      const timeout = window.setTimeout(resolve, ms)
      const check = window.setInterval(() => {
        if (!running.current) {
          window.clearTimeout(timeout)
          window.clearInterval(check)
          resolve()
        }
      }, 80)
      window.setTimeout(() => window.clearInterval(check), ms + 20)
    })
  }

  async function loop() {
    const inn = t('sos_in')
    const hold = t('sos_hold')
    const out = t('sos_out')
    const lineK = t('sos_line')
    while (running.current) {
      setPhase('inhale')
      setLabel(inn)
      cue(inn, 'ui:sos_in')
      void audio.playBreathPhase('in', 4)
      await wait(4000)
      if (!running.current) return
      audio.stopBreath()
      setPhase('hold')
      setLabel(hold)
      cue(hold, 'ui:sos_hold')
      await wait(2000)
      if (!running.current) return
      setPhase('exhale')
      setLabel(out)
      cue(out, 'ui:sos_out')
      void audio.playBreathPhase('out', 6)
      await wait(6000)
      if (!running.current) return
      audio.stopBreath()
      cycle.current += 1
      if (cycle.current % 3 === 0) {
        const waves = sosSentences(locale)
        const i = randomIndex(waves.length)
        const line = waves[i] || ''
        setPhase('phrase')
        setLabel(lineK)
        setLivePhrase(line)
        say(line, `sos:wave:${i}`)
        await wait(4200)
        setLivePhrase('')
      }
    }
  }

  async function start() {
    started.current = Date.now()
    running.current = true
    cycle.current = 0
    setSeconds(0)
    setTaps(0)
    setObj(0)
    setColor(null)
    setLeft(false)
    setRight(false)
    const taps = tapSentences(locale)
    const ti = randomIndex(taps.length)
    setTapIdx(ti)
    setSentence(taps[ti] || '')
    buzz(40)
    audio.unlock()
    await audio.playBed(bed)
    setPhase('ground')
    say(t('sos_ground_sub'), 'ui:sos_ground_sub')
  }

  function beginBreath() {
    running.current = true
    void loop()
  }

  function passed() {
    running.current = false
    audio.stop(1.2)
    stopSpeak()
    const ended = Date.now()
    const secs = Math.max(1, Math.floor((ended - (started.current || ended)) / 1000))
    setSeconds(secs)
    setPhase('tap')
    setLabel(t('sos_passed'))
    say(sentence, `sos:tap:${tapIdx}`)
  }

  function tap() {
    const n = taps + 1
    setTaps(n)
    buzz(12)
    if (n >= 10) {
      addPassed({
        id: `${started.current}`,
        startedAt: started.current,
        endedAt: Date.now(),
        seconds,
        taps: n,
        sentence,
      })
      stopSpeak()
      say(t('sos_thanks'), 'ui:sos_thanks')
      setPhase('done')
    }
  }

  const scale =
    phase === 'inhale' ? 1.12 : phase === 'hold' ? 1.12 : phase === 'exhale' ? 0.86 : 1

  if (phase === 'idle') {
    return (
      <div className="relative z-10 flex min-h-dvh flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <button type="button" className="text-sm text-mute" onClick={() => navigate(-1)} aria-label={t('back')}>
            {t('back')}
          </button>
          <MuteVoiceBtn muted={muted} onToggle={toggleMute} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="font-display text-4xl">{t('sos_title')}</h1>
          <p className="mt-3 max-w-[16rem] text-sm leading-7 text-mute">{t('sos_sub')}</p>
          <button
            type="button"
            onClick={() => void start()}
            className="halo-wrap mt-14 h-48 w-48"
            aria-label={t('sos_title')}
          >
            <span className="halo halo-a" />
            <span className="halo halo-b" />
            <span className="orb-pulse relative z-10 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/90 via-fuchsia-800/60 to-violet-950 shadow-[0_0_40px_rgba(244,114,182,0.18)]">
              <span className="font-display text-4xl">SOS</span>
            </span>
          </button>
          <div className="mt-8 w-full max-w-xs">
            <BedPicker value={bed} onChange={(id) => void pickBed(id)} />
          </div>
          <div className="mt-4">
            <MuteVoiceBtn muted={muted} onToggle={toggleMute} labeled />
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'ground') {
    const prompt = t(OBJ_KEYS[obj]!)
    return (
      <div className="relative z-10 flex min-h-dvh flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-mute">
            {formatDuration(seconds, locale)} · {obj + 1}/3
          </p>
          <MuteVoiceBtn muted={muted} onToggle={toggleMute} />
        </div>
        <div className="mt-3">
          <BedPicker value={bed} onChange={(id) => void pickBed(id)} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.16em] text-rose-200/70">{t('sos_ground')}</p>
          <h1 className="mt-3 max-w-xs font-display text-3xl leading-tight">{prompt}</h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-mute">{t('sos_ground_sub')}</p>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {COLORS.map((c) => {
              const on = color === c.key
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => {
                    setColor(c.key)
                    buzz(18)
                    say(t(c.key), `ui:${c.key}`)
                  }}
                  className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl border ${
                    on ? 'border-white scale-105' : 'border-white/15'
                  }`}
                  style={{ background: c.hex }}
                  aria-label={t(c.key)}
                >
                  <span className={`text-[9px] font-medium ${c.key === 'sos_c_white' || c.key === 'sos_c_yellow' ? 'text-black/80' : 'text-white/90'}`}>
                    {t(c.key)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        <PrimaryButton
          disabled={!color}
          onClick={() => {
            if (!color) return
            buzz(32)
            if (obj >= 2) {
              setPhase('feet')
              setLeft(false)
              setRight(false)
              say(t('sos_feet'), 'ui:sos_feet')
              return
            }
            setObj((n) => n + 1)
            setColor(null)
            say(t(OBJ_KEYS[obj + 1]!), `ui:${OBJ_KEYS[obj + 1]!}`)
          }}
        >
          {t('sos_touched')}
        </PrimaryButton>
        <GhostButton
          className="mt-3 w-full"
          onClick={() => {
            running.current = false
            audio.stop()
            stopSpeak()
            navigate('/')
          }}
        >
          {t('sos_stop')}
        </GhostButton>
      </div>
    )
  }

  if (phase === 'feet') {
    return (
      <div className="relative z-10 flex min-h-dvh flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-mute">{formatDuration(seconds, locale)}</p>
          <MuteVoiceBtn muted={muted} onToggle={toggleMute} />
        </div>
        <div className="mt-3">
          <BedPicker value={bed} onChange={(id) => void pickBed(id)} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="max-w-xs font-display text-3xl leading-tight">{t('sos_feet')}</h1>
          <div className="mt-10 flex gap-4">
            <button
              type="button"
              aria-label={t('sos_left')}
              onClick={() => {
                setLeft(true)
                buzz(24)
              }}
              className={`flex h-36 w-28 flex-col items-center justify-end rounded-[2.2rem] pb-6 text-sm ${
                left ? 'bg-rose-300/90 text-violet-950' : 'bg-white/8 text-cream'
              }`}
            >
              {t('sos_left')}
            </button>
            <button
              type="button"
              aria-label={t('sos_right')}
              onClick={() => {
                setRight(true)
                buzz(24)
              }}
              className={`flex h-36 w-28 flex-col items-center justify-end rounded-[2.2rem] pb-6 text-sm ${
                right ? 'bg-rose-300/90 text-violet-950' : 'bg-white/8 text-cream'
              }`}
            >
              {t('sos_right')}
            </button>
          </div>
        </div>
        <PrimaryButton
          disabled={!left || !right}
          onClick={() => {
            buzz(40)
            say(t('sos_then_breath'), 'ui:sos_then_breath')
            beginBreath()
          }}
        >
          {t('sos_feet_btn')}
        </PrimaryButton>
        <GhostButton
          className="mt-3 w-full"
          onClick={() => {
            running.current = false
            audio.stop()
            stopSpeak()
            navigate('/')
          }}
        >
          {t('sos_stop')}
        </GhostButton>
      </div>
    )
  }

  if (phase === 'tap') {
    return (
      <div className="relative z-10 flex min-h-dvh flex-col items-center px-6 pt-[calc(1.25rem+env(safe-area-inset-top))] text-center">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-mute">{formatDuration(seconds, locale)}</p>
          <MuteVoiceBtn muted={muted} onToggle={toggleMute} />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mt-8 font-display text-3xl leading-tight">{sentence}</h1>
          <p className="mt-4 text-sm text-mute">{taps}/10</p>
          <button
            type="button"
            onClick={tap}
            aria-label={t('sos_tap_btn')}
            className="mt-10 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/90 to-fuchsia-800/80 text-lg font-medium shadow-[0_0_40px_rgba(244,114,182,0.2)]"
          >
            {t('sos_tap_btn')}
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl">{t('sos_done')}</h1>
        <div className="mt-10 w-full max-w-xs">
          <PrimaryButton onClick={() => navigate('/')}>{t('sos_back')}</PrimaryButton>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 flex min-h-dvh flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mute">{formatDuration(seconds, locale)}</p>
        <MuteVoiceBtn muted={muted} onToggle={toggleMute} />
      </div>
      <div className="mt-3">
        <BedPicker value={bed} onChange={(id) => void pickBed(id)} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/85 via-fuchsia-800/70 to-violet-950 shadow-[0_0_40px_rgba(244,114,182,0.2)] transition-transform duration-[1100ms] ease-in-out"
          style={{ transform: `scale(${scale})` }}
        >
          <span className="font-display text-3xl">{label}</span>
        </div>
        {livePhrase ? (
          <p className="mt-8 max-w-xs text-center font-display text-xl leading-snug text-rose-100">{livePhrase}</p>
        ) : (
          <p className="mt-8 text-sm text-mute">{t('sos_wave_in')}</p>
        )}
      </div>
      <PrimaryButton onClick={passed}>{t('sos_passed')}</PrimaryButton>
      <GhostButton
        className="mt-3 w-full"
        onClick={() => {
          running.current = false
          audio.stop()
          stopSpeak()
          navigate('/')
        }}
      >
        {t('sos_stop')}
      </GhostButton>
    </div>
  )
}
