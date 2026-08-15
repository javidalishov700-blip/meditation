import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { audio, sceneName } from '../lib/audio'
import { locMedPath } from '../lib/copy'
import { formatMmSs } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { markSession } from '../lib/activity'
import { completedSteps, markMedStep, pathPercent, stepUnlocked } from '../lib/med-progress'
import { MED_ALIAS, meditationById, pathMinutes } from '../lib/library'
import { seekSpeakTo, speak, speechClipId, speechSnap, stopSpeak, togglePause, writeVoiceVolume } from '../lib/speech'
import { readJson, writeJson } from '../lib/storage'
import { useWakeLock } from '../lib/wake'
import { PrimaryButton } from '../components/ui'
import { CalmField } from '../components/CalmField'
import { SessionStage } from '../components/SessionStage'
import { useSpeech } from '../components/VoicePlayer'
import type { MedPath, MedStep } from '../lib/types'

const MED_BEDS = [
  'rain',
  'ocean',
  'forest',
  'birds',
  'night',
  'fire',
  'river',
  'bowl',
  'drone',
  'ohm',
  'waves',
  'piano',
  'harp',
  'swell',
  'crystal',
  'brown',
  'chime',
] as const

const SKIP = 15

function readBed(fallback: string) {
  const v = readJson<string | null>('med.bed', null)
  return v && MED_BEDS.includes(v as (typeof MED_BEDS)[number]) ? v : fallback
}

export function MeditationSession({ id }: { id: string }) {
  const alias = MED_ALIAS[id]
  if (alias) {
    return <Navigate to={`/session/meditation/${alias.path}?step=${alias.step}`} replace />
  }
  const raw = meditationById(id)
  if (!raw) return <Navigate to="/practice" replace />
  return <MeditationBody path={raw} />
}

function MeditationBody({ path: raw }: { path: MedPath }) {
  const { t, locale, meta } = useI18n()
  const path = locMedPath(raw, locale)
  const [params, setParams] = useSearchParams()
  const stepId = params.get('step')
  const step = path.steps.find((s) => s.id === stepId) ?? null
  const done = completedSteps(path.id)
  const pct = pathPercent(path)

  useEffect(
    () => () => {
      stopSpeak()
      audio.stop(0.4)
    },
    [],
  )

  function closeStep() {
    stopSpeak()
    audio.stop(0.4)
    const next = new URLSearchParams(params)
    next.delete('step')
    setParams(next, { replace: true })
  }

  if (step) {
    const idx = path.steps.findIndex((s) => s.id === step.id)
    if (!stepUnlocked(path, idx)) {
      return <Navigate to={`/session/meditation/${path.id}`} replace />
    }
    return (
      <MeditationPlayer
        key={step.id}
        path={path}
        step={step}
        index={idx}
        onExit={closeStep}
        onNext={(nextId) => setParams({ step: nextId })}
      />
    )
  }

  return (
    <div className="pb-8">
      <Link to="/practice" className="text-sm text-mute">
        {t('back')}
      </Link>
      <h1 className="mt-6 font-display text-3xl leading-tight">{path.title}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{path.subtitle}</p>
      <p className="mt-4 text-sm text-white/55">{t('med_pct', { n: pct })}</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-[#7B61FF]" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-8 space-y-3">
        {path.steps.map((s, i) => {
          const open = stepUnlocked(path, i)
          const finished = done.includes(s.id)
          return (
            <li key={s.id}>
              <button
                type="button"
                disabled={!open}
                onClick={() => {
                  if (!open) return
                  const clipId = `med:${s.id}`
                  const fillMs = s.minutes * 60 * 1000
                  const bedId = readBed(s.bed)
                  audio.unlock()
                  void audio.playNature(bedId).then(() => {
                    if (speechClipId() === clipId && !speechSnap().paused) audio.hushForVoice()
                  })
                  speak(s.body, {
                    lang: meta.bcp47,
                    mode: 'calm',
                    fillMs,
                    clipId,
                  })
                  setParams({ step: s.id })
                }}
                className={`flex w-full items-center justify-between rounded-2xl border border-white/[0.06] px-4 py-4 text-start ${
                  open ? 'bg-white/[0.04]' : 'opacity-40'
                }`}
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                    {t('med_step', { n: i + 1 })}
                  </p>
                  <p className="mt-1 font-display text-xl">{s.title}</p>
                  <p className="mt-1 text-xs text-mute">{t('min_n', { n: s.minutes })}</p>
                </div>
                <span className="text-xs text-white/45">
                  {!open ? t('med_locked') : finished ? t('med_done') : ''}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 text-xs text-white/35">{t('min_n', { n: pathMinutes(path) })}</p>
    </div>
  )
}

function MeditationPlayer({
  path,
  step,
  index,
  onExit,
  onNext,
}: {
  path: MedPath
  step: MedStep
  index: number
  onExit: () => void
  onNext: (stepId: string) => void
}) {
  const { t, meta, locale } = useI18n()
  const snap = useSpeech()
  const total = Math.max(0, (step.minutes || 0) * 60)
  const [elapsed, setElapsed] = useState(0)
  const [ended, setEnded] = useState(false)
  const [bed, setBed] = useState(() => readBed(step.bed))
  const [bedVol, setBedVol] = useState(() => audio.getBedLevel())
  const [bedsOpen, setBedsOpen] = useState(false)
  const [exitArmed, setExitArmed] = useState(false)
  const elapsedRef = useRef(0)
  const stampRef = useRef(Date.now())
  const pausedRef = useRef(false)
  const dragRef = useRef(false)
  const done = useRef(false)

  useWakeLock(true)

  useEffect(() => {
    const tmr = window.setTimeout(() => setExitArmed(true), 500)
    return () => window.clearTimeout(tmr)
  }, [step.id])

  useEffect(() => {
    pausedRef.current = snap.paused
    stampRef.current = Date.now()
  }, [snap.paused])

  useEffect(() => {
    done.current = false
    elapsedRef.current = 0
    stampRef.current = Date.now()
    pausedRef.current = false
    markSession('meditation', path.id)
    const fillMs = total * 1000
    const clipId = `med:${step.id}`
    const live = speechSnap()
    const keep =
      speechClipId() === clipId && (live.speaking || live.loading || live.paused)
    if (!keep) {
      audio.unlock()
      void audio.playNature(bed)
      speak(step.body, {
        lang: meta.bcp47,
        mode: 'calm',
        fillMs,
        clipId,
      })
    }
    const tick = window.setInterval(() => {
      pausedRef.current = speechSnap().paused
      if (!pausedRef.current && !dragRef.current) {
        const now = Date.now()
        elapsedRef.current += (now - stampRef.current) / 1000
        stampRef.current = now
      } else {
        stampRef.current = Date.now()
      }
      const s = Math.min(total || 0, Math.max(0, elapsedRef.current))
      setElapsed(s)
      if (total > 0 && s >= total && !done.current) finish()
    }, 200)
    return () => window.clearInterval(tick)
  }, [path.id, step.id, total, meta.bcp47])

  function finish() {
    if (done.current) return
    done.current = true
    stopSpeak()
    audio.stop(1.6)
    markMedStep(path.id, step.id)
    setEnded(true)
  }

  function toggleOrResume() {
    if (!snap.speaking && !snap.loading && !snap.paused) {
      audio.unlock()
      speak(step.body, {
        lang: meta.bcp47,
        mode: 'calm',
        fillMs: total * 1000,
        startMs: elapsedRef.current * 1000,
        clipId: `med:${step.id}`,
      })
      return
    }
    togglePause()
  }

  function applyTime(sec: number, voice = true) {
    const next = Math.max(0, Math.min(total, sec))
    elapsedRef.current = next
    stampRef.current = Date.now()
    setElapsed(next)
    if (total > 0 && next >= total) {
      finish()
      return
    }
    if (voice) seekSpeakTo(next * 1000)
  }

  function skip(delta: number) {
    applyTime(elapsedRef.current + delta)
  }

  async function changeBed(id: string) {
    writeJson('med.bed', id)
    setBed(id)
    await audio.playNature(id)
    if (!snap.paused) audio.hushForVoice()
  }

  const frac = total ? elapsed / total : 0
  const pct = pathPercent(path, { stepId: step.id, frac })
  const err = snap.error === 'voice_missing' ? t('tts_missing') : snap.error ? t('tts_fail') : null

  if (ended) {
    const next = path.steps[index + 1]
    return (
      <SessionStage>
        <CalmField paused progress={1} />
        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-4xl text-white/80">{t('med_done')}</p>
          <p className="mt-3 text-sm text-white/40">{t('med_pct', { n: pathPercent(path) })}</p>
          {next ? (
            <PrimaryButton className="mt-10 max-w-xs" onClick={() => onNext(next.id)}>
              {next.title}
            </PrimaryButton>
          ) : null}
          <button type="button" className="mt-4 text-sm text-white/50" onClick={onExit}>
            {t('back')}
          </button>
        </div>
      </SessionStage>
    )
  }

  return (
    <SessionStage>
      <CalmField paused={snap.paused} progress={frac} />

      <button
        type="button"
        className="absolute left-4 z-20 rounded-full bg-white/15 px-3.5 py-1.5 text-sm text-white"
        style={{
          top: 'max(1rem, env(safe-area-inset-top))',
          pointerEvents: exitArmed ? 'auto' : 'none',
        }}
        onClick={onExit}
      >
        {t('back')}
      </button>
      <p
        className="pointer-events-none absolute inset-x-16 z-20 truncate text-center text-sm text-white/80"
        style={{ top: 'max(1.15rem, calc(env(safe-area-inset-top) + 0.35rem))' }}
      >
        {step.title}
      </p>
      <p
        className="pointer-events-none absolute inset-x-10 z-20 text-center text-[11px] uppercase tracking-[0.14em] text-white/45"
        style={{ top: 'max(3.1rem, calc(env(safe-area-inset-top) + 2.15rem))' }}
      >
        {sceneName(bed, locale)}
        {snap.loading ? ` · ${t('voice_loading')}` : ''}
      </p>

      <button
        type="button"
        className="absolute left-1/2 z-20 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{ top: '38%' }}
        onClick={() => toggleOrResume()}
        aria-label={snap.paused ? t('play') : t('pause')}
      >
        {snap.loading ? (
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/25 border-t-white" />
        ) : snap.paused || !snap.speaking ? (
          <svg viewBox="0 0 24 24" className="h-14 w-14 text-white/90" fill="currentColor">
            <path d="M8 5.5v13l11-6.5L8 5.5Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-14 w-14 text-white/90" fill="currentColor">
            <path d="M7 6h3.2v12H7V6Zm6.8 0H17v12h-3.2V6Z" />
          </svg>
        )}
      </button>

      {err ? (
        <p
          className="absolute inset-x-8 z-20 text-center text-sm leading-6 text-rose-100/90"
          style={{ top: '58%' }}
        >
          {err}
        </p>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0b0612] via-[#0b0612]/85 to-transparent px-5 pb-[max(1.1rem,env(safe-area-inset-bottom))] pt-16">
        <div className="mx-auto max-w-lg">
          <div className="flex items-end justify-between text-sm tabular-nums text-white/70">
            <span>{formatMmSs(elapsed)}</span>
            <span>{formatMmSs(total)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.max(1, total)}
            step={1}
            value={Math.round(elapsed)}
            aria-label={t('med_tap')}
            className="steady-range mt-2 w-full"
            onPointerDown={() => {
              dragRef.current = true
            }}
            onPointerUp={() => {
              dragRef.current = false
              applyTime(elapsedRef.current)
            }}
            onPointerCancel={() => {
              dragRef.current = false
              applyTime(elapsedRef.current)
            }}
            onChange={(e) => {
              const n = Number(e.target.value)
              elapsedRef.current = n
              setElapsed(n)
              if (!dragRef.current) applyTime(n)
            }}
          />

          <div className="mt-4 flex items-center justify-center gap-8">
            <button type="button" className="flex flex-col items-center text-white/80" onClick={() => skip(-SKIP)} aria-label={t('skip_back')}>
              <SkipIcon dir="back" />
              <span className="mt-1 text-[11px] tabular-nums">15</span>
            </button>
            <button
              type="button"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7B61FF] text-white shadow-[0_0_28px_rgba(123,97,255,0.35)]"
              onClick={() => toggleOrResume()}
              aria-label={snap.paused ? t('play') : t('pause')}
            >
              {snap.loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : snap.paused ? (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                  <path d="M7 6h3.2v12H7V6Zm6.8 0H17v12h-3.2V6Z" />
                </svg>
              )}
            </button>
            <button type="button" className="flex flex-col items-center text-white/80" onClick={() => skip(SKIP)} aria-label={t('skip_fwd')}>
              <SkipIcon dir="fwd" />
              <span className="mt-1 text-[11px] tabular-nums">15</span>
            </button>
          </div>

          <button
            type="button"
            className="mb-2 mt-4 text-[11px] uppercase tracking-[0.14em] text-white/40"
            onClick={() => setBedsOpen((v) => !v)}
          >
            {t('bed_pick')}: {sceneName(bed, locale)}
          </button>
          {bedsOpen ? (
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1 hide-scroll">
              {MED_BEDS.map((id) => {
                const on = bed === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => void changeBed(id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${
                      on ? 'bg-[#7B61FF] text-white' : 'bg-white/8 text-white/70'
                    }`}
                  >
                    {sceneName(id, locale)}
                  </button>
                )
              })}
            </div>
          ) : null}
          <label className="mb-2 flex items-center gap-2 text-xs text-white/50">
            <span className="w-14">{t('vol_bed')}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={bedVol}
              onChange={(e) => {
                const n = Number(e.target.value)
                setBedVol(n)
                audio.setBedLevel(n)
                if (!snap.paused) audio.hushForVoice()
              }}
              className="steady-range flex-1"
            />
          </label>
          <label className="flex items-center gap-2 text-xs text-white/50">
            <span className="w-14">{t('vol_voice')}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={snap.volume}
              onChange={(e) => writeVoiceVolume(Number(e.target.value))}
              className="steady-range flex-1"
            />
          </label>
          <p className="mt-2 text-center text-[11px] text-white/30">{t('med_pct', { n: pct })}</p>
        </div>
      </div>
    </SessionStage>
  )
}

function SkipIcon({ dir }: { dir: 'back' | 'fwd' }) {
  const flip = dir === 'back' ? 'scale-x-[-1]' : ''
  return (
    <svg viewBox="0 0 24 24" className={`h-7 w-7 ${flip}`} fill="currentColor">
      <path d="M5 6.5v11l8.5-5.5L5 6.5Zm8.2 0v11L21.7 12 13.2 6.5Z" />
    </svg>
  )
}
