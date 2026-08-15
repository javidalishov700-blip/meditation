import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { audio, NATURE_SCENES, sceneBlurb, sceneName, TIMER_MINUTES, TONES } from '../lib/audio'
import { programDay } from '../lib/content'
import { canAccess } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import {
  breathById,
  clarityById,
  extraById,
  meditationById,
  sleepLabById,
  storyById,
  writingById,
} from '../lib/library'
import { useI18n } from '../lib/i18n'
import { speak, speakCue, stopSpeak } from '../lib/speech'
import { readJson, writeJson } from '../lib/storage'
import type { BreathPattern, LibraryItem, ProgramDay, SessionKind } from '../lib/types'
import { Card, FoldList, PrimaryButton } from '../components/ui'
import { useWakeLock } from '../lib/wake'

function isKind(s: string | undefined): s is SessionKind {
  return (
    s === 'program' ||
    s === 'story' ||
    s === 'writing' ||
    s === 'breath' ||
    s === 'meditation' ||
    s === 'sleeplab' ||
    s === 'tone' ||
    s === 'nature' ||
    s === 'clarity' ||
    s === 'extra'
  )
}

export function Session() {
  const { kind, id } = useParams()
  const [params] = useSearchParams()
  const day = Number(params.get('day') || '1')
  if (!isKind(kind) || !id) return <Navigate to="/" replace />
  if (!canAccess(kind, id, { day })) return <Navigate to="/paywall" replace />

  if (kind === 'tone') return <ToneSession id={id} />
  if (kind === 'nature') return <NatureSession id={id} />
  if (kind === 'breath') return <BreathSession id={id} />
  if (kind === 'program') return <ProgramSession id={id} day={day} />
  return <TextSession kind={kind} id={id} />
}

function ToneSession({ id }: { id: string }) {
  const { pro } = useEntitlement()
  const { t } = useI18n()
  const tone = TONES.find((t) => t.id === id)
  const trialCap = tone?.trialSeconds ?? 0
  const usedKey = `trial.${id}`
  const usedRef = useRef(readJson<number>(usedKey, 0))
  const [on, setOn] = useState(false)
  const [left, setLeft] = useState(() => Math.max(0, Math.ceil(trialCap - usedRef.current)))
  const [expired, setExpired] = useState(() => !pro && trialCap > 0 && usedRef.current >= trialCap)
  useWakeLock(on)

  useEffect(() => () => audio.stop(0.4), [])

  useEffect(() => {
    if (!on || pro || !trialCap) return
    const start = Date.now()
    const base = usedRef.current
    const idn = window.setInterval(() => {
      const total = base + (Date.now() - start) / 1000
      const rem = Math.max(0, trialCap - total)
      setLeft(Math.ceil(rem))
      if (rem <= 0) {
        usedRef.current = trialCap
        writeJson(usedKey, trialCap)
        audio.stop(1)
        setOn(false)
        setExpired(true)
      }
    }, 250)
    return () => {
      window.clearInterval(idn)
      const total = Math.min(trialCap, base + (Date.now() - start) / 1000)
      usedRef.current = total
      writeJson(usedKey, total)
      setLeft(Math.ceil(Math.max(0, trialCap - total)))
    }
  }, [on, pro, trialCap, usedKey])

  if (!tone) return <Navigate to="/sounds" replace />

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col pb-4">
      <Link to="/sounds" className="text-sm text-mute">
        {t('back')}
      </Link>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl">{tone.title}</h1>
        {expired ? (
          <Card className="mt-10 text-start">
            <p className="font-display text-2xl">{t('trial_done')}</p>
            <p className="mt-2 text-sm text-mute">{t('trial_done_sub')}</p>
            <Link to="/paywall" className="mt-4 inline-block text-sm text-rose-200">
              {t('me_vitrine')}
            </Link>
          </Card>
        ) : (
          <>
            <button
              type="button"
              onClick={async () => {
                if (on) {
                  audio.stop()
                  setOn(false)
                  return
                }
                await audio.playTone(tone.hz, tone.title, tone.id)
                setOn(true)
              }}
              className="halo-wrap mt-12 h-44 w-44"
            >
              <span className="halo halo-a" />
              <span className="halo halo-b" />
              <span className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-violet-300/80 to-fuchsia-900 font-display text-xl shadow-[0_0_40px_rgba(167,139,250,0.2)]">
                {on ? t('stop') : t('play')}
              </span>
            </button>
            <p className="mt-8 text-sm text-mute">
              {!pro && tone.trialSeconds ? `${t('remaining')}: ${t('sec_n', { n: left })}` : on ? t('playing') : t('ready')}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function NatureSession({ id }: { id: string }) {
  const { t, locale } = useI18n()
  const scene = NATURE_SCENES.find((s) => s.id === id)
  const [minutes, setMinutes] = useState<(typeof TIMER_MINUTES)[number]>(30)
  const [on, setOn] = useState(false)
  const [done, setDone] = useState(false)
  useWakeLock(on)

  useEffect(() => () => audio.stop(0.5), [])
  if (!scene) return <Navigate to="/sleep" replace />

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col pb-4">
      <Link to="/sleep" className="text-sm text-mute">
        {t('back')}
      </Link>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl">{sceneName(scene.id, locale)}</h1>
        <p className="mt-3 text-sm text-mute">{sceneBlurb(scene.id, locale)}</p>
        <button
          type="button"
          className="halo-wrap mt-12 h-44 w-44"
          onClick={async () => {
            if (on) {
              audio.stop()
              setOn(false)
              return
            }
            setDone(false)
            await audio.playNature(scene.id)
            audio.setTimer(minutes, () => {
              setOn(false)
              setDone(true)
            })
            setOn(true)
          }}
        >
          <span className="halo halo-a" />
          <span className="halo halo-b" />
          <span className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-indigo-200/80 to-violet-950 font-display text-lg">
            {on ? t('stop') : t('play')}
          </span>
        </button>
        <div className="mt-10 flex gap-2">
          {TIMER_MINUTES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMinutes(m)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                minutes === m ? 'bg-white/10 text-cream' : 'text-mute'
              }`}
            >
              {t('min_n', { n: m })}
            </button>
          ))}
        </div>
        {done ? <p className="mt-6 text-sm text-mute">{t('timer_done')}</p> : null}
      </div>
    </div>
  )
}

function BreathSession({ id }: { id: string }) {
  const b = breathById(id)
  const { t, meta } = useI18n()
  const [phase, setPhase] = useState(t('ready'))
  const [on, setOn] = useState(false)
  const running = useRef(false)
  useWakeLock(on)

  useEffect(
    () => () => {
      running.current = false
      stopSpeak()
      audio.stop(0.4)
    },
    [],
  )
  if (!b) return <Navigate to="/practice" replace />

  function wait(ms: number) {
    return new Promise<void>((resolve) => {
      const timeout = window.setTimeout(resolve, ms)
      const c = window.setInterval(() => {
        if (!running.current) {
          window.clearTimeout(timeout)
          window.clearInterval(c)
          resolve()
        }
      }, 80)
      window.setTimeout(() => window.clearInterval(c), ms + 20)
    })
  }

  async function loop(pat: BreathPattern) {
    const inn = t('sos_in')
    const hold = t('sos_hold')
    const out = t('sos_out')
    for (let i = 0; i < pat.cycles && running.current; i++) {
      setPhase(inn)
      speakCue(inn, meta.bcp47)
      await wait(pat.inhale * 1000)
      if (pat.hold1 && running.current) {
        setPhase(hold)
        speakCue(hold, meta.bcp47)
        await wait(pat.hold1 * 1000)
      }
      if (!running.current) return
      setPhase(out)
      speakCue(out, meta.bcp47)
      await wait(pat.exhale * 1000)
      if (pat.hold2 && running.current) {
        setPhase(hold)
        await wait(pat.hold2 * 1000)
      }
    }
    running.current = false
    setOn(false)
    setPhase(t('leave'))
    speak(t('sos_thanks'), { lang: meta.bcp47 })
  }

  const scale = phase === t('sos_in') ? 1.1 : phase === t('sos_out') ? 0.88 : 1

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col pb-4">
      <Link to="/practice" className="text-sm text-mute">
        {t('back')}
      </Link>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl">{b.label}</h1>
        <div
          className="halo-wrap mt-12 h-52 w-52"
          style={{ transform: `scale(${scale})`, transition: 'transform 1s ease' }}
        >
          <span className="halo halo-a" />
          <span className="halo halo-b" />
          <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/85 to-violet-950 font-display text-2xl">
            {phase}
          </div>
        </div>
        <PrimaryButton
          className="mt-12 max-w-xs"
          onClick={() => {
            if (on) {
              running.current = false
              stopSpeak()
              audio.stop(0.4)
              setOn(false)
              setPhase(t('stop'))
              return
            }
            running.current = true
            setOn(true)
            void audio.playPad()
            void loop(b)
          }}
        >
          {on ? t('stop') : t('voice_start')}
        </PrimaryButton>
      </div>
    </div>
  )
}

function ProgramSession({ id, day }: { id: string; day: number }) {
  const d = programDay(id, day)
  if (!d) return <Navigate to="/treat" replace />
  return <ScriptView item={d} />
}

function TextSession({ kind, id }: { kind: SessionKind; id: string }) {
  const item: LibraryItem | undefined = useMemo(() => {
    if (kind === 'story') return storyById(id)
    if (kind === 'writing') return writingById(id)
    if (kind === 'meditation') return meditationById(id)
    if (kind === 'sleeplab') return sleepLabById(id)
    if (kind === 'clarity') return clarityById(id)
    if (kind === 'extra') return extraById(id)
    return undefined
  }, [kind, id])
  if (!item) return <Navigate to="/" replace />
  return <ScriptView item={item} />
}

function ScriptView({
  item,
}: {
  item: LibraryItem | ProgramDay
}) {
  const { t, meta } = useI18n()
  const [speaking, setSpeaking] = useState(false)
  const title = 'title' in item ? item.title : ''
  const body =
    'body' in item && typeof item.body === 'string'
      ? item.body
      : 'blocks' in item
        ? item.blocks.map((b) => `${b.title}. ${b.body}`).join('\n\n')
        : ''
  const sentence = 'sentence' in item ? item.sentence : undefined
  const scene = 'scene' in item ? item.scene : undefined
  const release = 'release' in item ? item.release : undefined
  const gratitude = 'gratitude' in item ? item.gratitude : undefined
  const nightSeed = 'nightSeed' in item ? item.nightSeed : undefined
  const summary = 'summary' in item ? item.summary : 'subtitle' in item ? item.subtitle : ''

  const extras = [
    scene ? { id: 'scene', label: t('scene'), text: scene } : null,
    release ? { id: 'release', label: t('release'), text: release } : null,
    gratitude ? { id: 'gratitude', label: t('gratitude'), text: gratitude } : null,
    nightSeed ? { id: 'seed', label: t('night_seed'), text: nightSeed } : null,
  ].filter((x): x is { id: string; label: string; text: string } => Boolean(x))

  const script = [body, sentence, ...extras.map((x) => x.text)].filter(Boolean).join('\n\n')

  useEffect(() => {
    void audio.playPad()
    return () => {
      stopSpeak()
      audio.stop(0.5)
    }
  }, [])
  useWakeLock(speaking)

  return (
    <div className="pb-8">
      <button
        type="button"
        className="text-sm text-mute"
        onClick={() => {
          stopSpeak()
          window.history.back()
        }}
      >
        {t('back')}
      </button>
      <h1 className="mt-6 font-display text-3xl leading-tight">{title}</h1>
      {summary ? <p className="mt-3 text-sm leading-7 text-mute">{summary}</p> : null}

      {'blocks' in item ? (
        <div className="mt-8">
          <FoldList
            items={item.blocks.map((b, i) => ({ ...b, id: `${i}` }))}
            preview={1}
            getKey={(b) => b.id}
            className="space-y-3"
            render={(b) => (
              <Card>
                <p className="font-display text-xl">{b.title}</p>
                <p className="mt-2 text-sm leading-7 text-cream/85">{b.body}</p>
              </Card>
            )}
          />
        </div>
      ) : (
        <p className="mt-8 whitespace-pre-wrap text-[15px] leading-8 text-cream/88">{body}</p>
      )}

      {sentence ? (
        <Card className="mt-8">
          <p className="font-display text-2xl italic leading-snug">{sentence}</p>
        </Card>
      ) : null}

      {extras.length ? (
        <div className="mt-6">
          <FoldList
            items={extras}
            preview={0}
            getKey={(x) => x.id}
            render={(x) => (
              <p className="text-sm leading-7 text-mute">
                {x.label}. {x.text}
              </p>
            )}
          />
        </div>
      ) : null}

      <PrimaryButton
        className="mt-10"
        onClick={() => {
          if (speaking) {
            stopSpeak()
            setSpeaking(false)
            return
          }
          if (!audio.playing) void audio.playPad()
          setSpeaking(true)
          speak(script, { onend: () => setSpeaking(false), lang: meta.bcp47 })
        }}
      >
        {speaking ? t('speak_stop') : t('speak')}
      </PrimaryButton>
    </div>
  )
}
