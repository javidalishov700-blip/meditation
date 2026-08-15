import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { audio, NATURE_SCENES, TIMER_MINUTES, TONES } from '../lib/audio'
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
import { Card, GhostButton, Kicker, LegalNote, PrimaryButton } from '../components/ui'

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
    <div className="pb-8">
      <Link to="/sounds" className="text-sm text-mute">
        {t('cat_tones')}
      </Link>
      <Kicker>{tone.hz} Hz</Kicker>
      <h1 className="mt-2 font-display text-3xl">{tone.title}</h1>
      <p className="mt-2 text-sm text-mute">{t('no_file')}</p>
      {expired ? (
        <Card className="mt-8">
          <p className="font-display text-2xl">{t('trial_done')}</p>
          <p className="mt-2 text-sm text-mute">{t('trial_done_sub')}</p>
          <Link to="/paywall" className="mt-4 inline-block text-sm text-rose-200">
            {t('me_vitrine')}
          </Link>
        </Card>
      ) : (
        <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 py-10 text-center">
          <div className="scene-tone pointer-events-none absolute inset-0" />
          <button
            type="button"
            onClick={async () => {
              if (on) {
                audio.stop()
                setOn(false)
                return
              }
              await audio.playTone(tone.hz, tone.title)
              setOn(true)
            }}
            className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-700 font-display text-xl shadow-[0_0_60px_rgba(192,132,252,0.4)]"
          >
            {on ? t('stop') : t('play')}
          </button>
          {!pro && tone.trialSeconds ? (
            <p className="relative mt-4 text-sm text-mute">
              {t('remaining')}: {t('sec_n', { n: left })}
            </p>
          ) : (
            <p className="relative mt-4 text-sm text-mute">{on ? t('playing') : t('ready')}</p>
          )}
        </div>
      )}
      <div className="mt-10">
        <LegalNote compact />
      </div>
    </div>
  )
}

function NatureSession({ id }: { id: string }) {
  const { t } = useI18n()
  const scene = NATURE_SCENES.find((s) => s.id === id)
  const [minutes, setMinutes] = useState<(typeof TIMER_MINUTES)[number]>(30)
  const [on, setOn] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => () => audio.stop(0.5), [])
  if (!scene) return <Navigate to="/sleep" replace />

  return (
    <div className="pb-8">
      <Link to="/sleep" className="text-sm text-mute">
        {t('nav_sleep')}
      </Link>
      <Kicker>{t('nature_k')}</Kicker>
      <h1 className="mt-2 font-display text-3xl">{scene.title}</h1>
      <p className="mt-2 text-sm text-mute">{scene.subtitle}. {t('no_file')}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {TIMER_MINUTES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMinutes(m)}
            className={`rounded-full px-4 py-2 text-sm ${
              minutes === m ? 'bg-rose-400/30 text-cream' : 'border border-white/10 text-mute'
            }`}
          >
            {t('min_n', { n: m })}
          </button>
        ))}
      </div>
      {done ? (
        <p className="mt-8 text-sm text-mute">{t('timer_done')}</p>
      ) : null}
      <PrimaryButton
        className="mt-8"
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
        {on ? t('stop') : t('start_min', { n: minutes })}
      </PrimaryButton>
    </div>
  )
}

function BreathSession({ id }: { id: string }) {
  const b = breathById(id)
  const { t, meta } = useI18n()
  const [phase, setPhase] = useState(t('ready'))
  const [on, setOn] = useState(false)
  const running = useRef(false)

  useEffect(() => () => { running.current = false; stopSpeak() }, [])
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
    <div className="pb-8">
      <Link to="/practice" className="text-sm text-mute">
        {t('nav_more')}
      </Link>
      <Kicker>{t('breath_k')}</Kicker>
      <h1 className="mt-2 font-display text-3xl">{b.label}</h1>
      <p className="mt-2 text-sm text-mute">{b.subtitle}</p>
      <div className="mt-10 flex flex-col items-center">
        <div
          className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 to-violet-800 font-display text-xl transition-transform duration-1000"
          style={{ transform: `scale(${scale})` }}
        >
          {phase}
        </div>
        <PrimaryButton
          className="mt-8 max-w-xs"
          onClick={() => {
            if (on) {
              running.current = false
              stopSpeak()
              setOn(false)
              setPhase(t('stop'))
              return
            }
            running.current = true
            setOn(true)
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
  const { t } = useI18n()
  const d = programDay(id, day)
  if (!d) return <Navigate to="/treat" replace />
  return <ScriptView kicker={`${t('program')} · ${t('day_n', { n: day })}`} item={d} />
}

function TextSession({ kind, id }: { kind: SessionKind; id: string }) {
  const { t } = useI18n()
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
  const kickers: Record<string, string> = {
    story: t('cat_stories'),
    writing: t('cat_write'),
    meditation: t('cat_meditate'),
    sleeplab: t('lab_k'),
    clarity: t('home_clarity'),
    extra: t('nav_more'),
  }
  return <ScriptView kicker={kickers[kind] ?? ''} item={item} />
}

function ScriptView({
  kicker,
  item,
}: {
  kicker: string
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

  const script = [body, sentence && `Cümle: ${sentence}`, scene && `Sahne: ${scene}`, release, gratitude, nightSeed && `Gece tohumu: ${nightSeed}`]
    .filter(Boolean)
    .join('\n\n')

  useEffect(() => () => stopSpeak(), [])

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
      <Kicker>{kicker}</Kicker>
      <h1 className="mt-2 font-display text-3xl leading-tight">{title}</h1>
      {summary ? <p className="mt-2 text-sm text-mute">{summary}</p> : null}

      {'blocks' in item
        ? item.blocks.map((b) => (
            <Card key={b.title} className="mt-4">
              <p className="text-[11px] uppercase tracking-wider text-rose-200">{b.kicker}</p>
              <p className="mt-1 font-display text-xl">{b.title}</p>
              <p className="mt-2 text-sm leading-6 text-cream/85">{b.body}</p>
            </Card>
          ))
        : (
            <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-cream/85">{body}</p>
          )}

      {sentence ? (
        <Card className="mt-6 border-rose-300/25">
          <Kicker>{t('sentence')}</Kicker>
          <p className="mt-2 font-display text-2xl leading-snug">{sentence}</p>
        </Card>
      ) : null}
      {scene ? (
        <Card className="mt-3">
          <Kicker>{t('scene')}</Kicker>
          <p className="mt-2 text-sm leading-6">{scene}</p>
        </Card>
      ) : null}
      {release ? (
        <p className="mt-4 text-sm text-mute">
          {t('release')}: {release}
        </p>
      ) : null}
      {gratitude ? (
        <p className="mt-2 text-sm text-mute">
          {t('gratitude')}: {gratitude}
        </p>
      ) : null}
      {nightSeed ? (
        <Card className="mt-4">
          <Kicker>{t('night_seed')}</Kicker>
          <p className="mt-2 font-display text-xl">{nightSeed}</p>
        </Card>
      ) : null}

      <PrimaryButton
        className="mt-8"
        onClick={() => {
          if (speaking) {
            stopSpeak()
            setSpeaking(false)
            return
          }
          setSpeaking(true)
          speak(script, { onend: () => setSpeaking(false), lang: meta.bcp47 })
        }}
      >
        {speaking ? t('speak_stop') : t('speak')}
      </PrimaryButton>
      <GhostButton
        className="mt-3 w-full"
        onClick={() => {
          stopSpeak()
          setSpeaking(false)
        }}
      >
        {t('leave')}
      </GhostButton>
      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
