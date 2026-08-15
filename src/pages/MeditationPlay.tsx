import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { audio } from '../lib/audio'
import { locMedPath } from '../lib/copy'
import { formatMmSs } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { markSession } from '../lib/activity'
import { completedSteps, markMedStep, pathPercent, stepUnlocked } from '../lib/med-progress'
import { MED_ALIAS, meditationById, pathMinutes } from '../lib/library'
import { speak, stopSpeak } from '../lib/speech'
import { useWakeLock } from '../lib/wake'
import { PrimaryButton } from '../components/ui'
import type { MedPath, MedStep } from '../lib/types'

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
  const { t, locale } = useI18n()
  const path = locMedPath(raw, locale)
  const [params, setParams] = useSearchParams()
  const stepId = params.get('step')
  const step = path.steps.find((s) => s.id === stepId) ?? null
  const done = completedSteps(path.id)
  const pct = pathPercent(path)

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
        onExit={() => {
          params.delete('step')
          setParams(params, { replace: true })
        }}
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
  const { t, meta } = useI18n()
  const total = step.minutes * 60
  const [elapsed, setElapsed] = useState(0)
  const [chrome, setChrome] = useState(false)
  const [ended, setEnded] = useState(false)
  const [hint, setHint] = useState(true)
  const started = useRef(0)
  const done = useRef(false)

  useWakeLock(true)

  useEffect(() => {
    const hide = window.setTimeout(() => setHint(false), 4500)
    return () => window.clearTimeout(hide)
  }, [step.id])

  useEffect(() => {
    done.current = false
    started.current = Date.now()
    markSession('meditation', path.id)
    const fillMs = total * 1000
    void audio.playNature(step.bed)
    speak(step.body, {
      lang: meta.bcp47,
      mode: 'calm',
      fillMs,
    })
    const tick = window.setInterval(() => {
      const s = Math.min(total, Math.floor((Date.now() - started.current) / 1000))
      setElapsed(s)
      if (s >= total && !done.current) {
        done.current = true
        stopSpeak()
        audio.stop(1.6)
        markMedStep(path.id, step.id)
        setEnded(true)
      }
    }, 200)
    return () => {
      window.clearInterval(tick)
      stopSpeak()
      audio.stop(0.4)
    }
  }, [path.id, step.id, step.bed, step.body, total, meta.bcp47])

  const frac = elapsed / total
  const pct = pathPercent(path, { stepId: step.id, frac })

  if (ended) {
    const next = path.steps[index + 1]
    return (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
        <p className="font-display text-4xl text-white/80">{t('med_done')}</p>
        <p className="mt-3 text-sm text-white/40">{t('med_pct', { n: pathPercent(path) })}</p>
        {next ? (
          <PrimaryButton className="mt-10 max-w-xs" onClick={() => onNext(next.id)}>
            {next.title}
          </PrimaryButton>
        ) : null}
        <button type="button" className="mt-4 text-sm text-mute" onClick={onExit}>
          {t('back')}
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      className="fixed inset-0 z-40 cursor-default bg-transparent"
      onClick={() => setChrome((v) => !v)}
      aria-label={t('med_tap')}
    >
      {chrome ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-6xl tabular-nums text-white" style={{ opacity: 0.2 }}>
            {formatMmSs(elapsed)}
          </p>
          <p className="mt-6 text-sm tabular-nums text-white" style={{ opacity: 0.2 }}>
            {t('med_pct', { n: pct })}
          </p>
          <div className="pointer-events-auto mt-16">
            <button
              type="button"
              className="text-sm text-white/25"
              onClick={(e) => {
                e.stopPropagation()
                stopSpeak()
                audio.stop(0.4)
                onExit()
              }}
            >
              {t('back')}
            </button>
          </div>
        </div>
      ) : hint ? (
        <p className="absolute inset-x-0 top-[42%] text-center text-sm text-white" style={{ opacity: 0.2 }}>
          {t('med_tap')}
        </p>
      ) : null}
    </button>
  )
}
