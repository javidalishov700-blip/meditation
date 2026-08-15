import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { audio } from '../lib/audio'
import { formatDuration } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { addPassed } from '../lib/passed'
import { pick } from '../lib/phrases'
import { sosSentences, tapSentences } from '../lib/sosPhrases'
import { speak, speakCue, stopSpeak } from '../lib/speech'
import { CrisisLink, GhostButton, Kicker, PrimaryButton } from '../components/ui'

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'phrase' | 'tap' | 'done'

export function Sos() {
  const navigate = useNavigate()
  const { t, locale, meta } = useI18n()
  const [phase, setPhase] = useState<Phase>('idle')
  const [label, setLabel] = useState(t('sos_ready'))
  const [seconds, setSeconds] = useState(0)
  const [taps, setTaps] = useState(0)
  const [sentence, setSentence] = useState(() => pick(tapSentences(locale)))
  const [livePhrase, setLivePhrase] = useState('')
  const started = useRef(0)
  const running = useRef(false)
  const cycle = useRef(0)
  const lang = meta.bcp47

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
      speakCue(inn, lang)
      await wait(4000)
      if (!running.current) return
      setPhase('hold')
      setLabel(hold)
      speakCue(hold, lang)
      await wait(2000)
      if (!running.current) return
      setPhase('exhale')
      setLabel(out)
      speakCue(out, lang)
      await wait(6000)
      if (!running.current) return
      cycle.current += 1
      if (cycle.current % 3 === 0) {
        const line = pick(sosSentences(locale))
        setPhase('phrase')
        setLabel(lineK)
        setLivePhrase(line)
        speak(line, { rate: 0.9, lang })
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
    setSentence(pick(tapSentences(locale)))
    try {
      navigator.vibrate?.(40)
    } catch {
      /* ignore */
    }
    await audio.playSosBed()
    speakCue(t('sos_in'), lang)
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
    speak(sentence, { rate: 0.88, lang })
  }

  function tap() {
    const n = taps + 1
    setTaps(n)
    try {
      navigator.vibrate?.(12)
    } catch {
      /* ignore */
    }
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
      speak(t('sos_thanks'), { rate: 0.9, lang })
      setPhase('done')
    }
  }

  const scale =
    phase === 'inhale' ? 1.12 : phase === 'hold' ? 1.12 : phase === 'exhale' ? 0.86 : 1

  if (phase === 'idle') {
    return (
      <div className="flex min-h-dvh flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <button type="button" className="text-sm text-mute" onClick={() => navigate(-1)}>
            {t('back')}
          </button>
          <CrisisLink />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="font-display text-4xl">{t('sos_title')}</h1>
          <p className="mt-3 max-w-[14rem] text-sm leading-7 text-mute">{t('sos_sub')}</p>
          <button
            type="button"
            onClick={() => void start()}
            className="orb-pulse mt-12 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/90 via-fuchsia-700/70 to-violet-950 shadow-[0_0_48px_rgba(244,114,182,0.22)]"
          >
            <span className="font-display text-4xl">SOS</span>
          </button>
        </div>
        <p className="text-center text-[11px] text-mute">
          {t('crisis')}: {meta.emergency}. {t('not_medical')}
        </p>
      </div>
    )
  }

  if (phase === 'tap') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <Kicker>{t('sos_passed')}</Kicker>
        <p className="mt-2 text-sm text-mute">{formatDuration(seconds, locale)}</p>
        <h1 className="mt-6 font-display text-3xl leading-tight">{sentence}</h1>
        <p className="mt-3 text-sm text-mute">
          {t('sos_tap')} {taps}/10
        </p>
        <button
          type="button"
          onClick={tap}
          className="mt-10 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/90 to-fuchsia-800/80 text-lg font-medium shadow-[0_0_40px_rgba(244,114,182,0.2)]"
        >
          {t('sos_tap_btn')}
        </button>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <Kicker>
          {t('release')} · {t('gratitude')}
        </Kicker>
        <h1 className="mt-4 font-display text-3xl">{t('sos_done')}</h1>
        <p className="mt-3 max-w-sm text-sm text-mute">{t('me_history_locked')}</p>
        <div className="mt-8 w-full max-w-xs space-y-3">
          <PrimaryButton onClick={() => navigate('/')}>{t('sos_back')}</PrimaryButton>
          <Link to="/me" className="block text-sm text-rose-200">
            {t('me_history')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mute">{formatDuration(seconds, locale)}</p>
        <CrisisLink />
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
