import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { audio } from '../lib/audio'
import { formatDuration } from '../lib/format'
import { addPassed } from '../lib/passed'
import { pick, SOS_SENTENCES, TAP_SENTENCES } from '../lib/phrases'
import { speak, speakCue, stopSpeak } from '../lib/speech'
import { CrisisLink, GhostButton, Kicker, PrimaryButton } from '../components/ui'

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'phrase' | 'tap' | 'done'

export function Sos() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('idle')
  const [label, setLabel] = useState('Hazır')
  const [seconds, setSeconds] = useState(0)
  const [taps, setTaps] = useState(0)
  const [sentence, setSentence] = useState(() => pick(TAP_SENTENCES))
  const [livePhrase, setLivePhrase] = useState('')
  const started = useRef(0)
  const running = useRef(false)
  const cycle = useRef(0)

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
      const t = window.setTimeout(resolve, ms)
      const check = window.setInterval(() => {
        if (!running.current) {
          window.clearTimeout(t)
          window.clearInterval(check)
          resolve()
        }
      }, 80)
      window.setTimeout(() => window.clearInterval(check), ms + 20)
    })
  }

  async function loop() {
    while (running.current) {
      setPhase('inhale')
      setLabel('Nefes al')
      speakCue('Nefes al')
      await wait(4000)
      if (!running.current) return
      setPhase('hold')
      setLabel('Tut')
      speakCue('Tut')
      await wait(2000)
      if (!running.current) return
      setPhase('exhale')
      setLabel('Ver')
      speakCue('Ver')
      await wait(6000)
      if (!running.current) return
      cycle.current += 1
      if (cycle.current % 3 === 0) {
        const line = pick(SOS_SENTENCES)
        setPhase('phrase')
        setLabel('Cümle')
        setLivePhrase(line)
        speak(line, { rate: 0.9 })
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
    setSentence(pick(TAP_SENTENCES))
    try {
      navigator.vibrate?.(40)
    } catch {
      /* ignore */
    }
    await audio.playSosBed()
    speakCue('Nefes al')
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
    setLabel('Geçti')
    speak(sentence, { rate: 0.88 })
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
      speak('Bırakıyorum. Küçük bir şükran yeter. Nefes alabildiğim için.', { rate: 0.9 })
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
            Geri
          </button>
          <CrisisLink />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Kicker>Kilitlenmez</Kicker>
          <h1 className="mt-3 font-display text-4xl">Dalga geldiyse bas</h1>
          <p className="mt-3 max-w-xs text-sm text-mute">
            174 Hz ve kahverengi gürültü. Sesli al / tut / ver. Arada kısa şimdiki zaman cümleleri. Kitap alıntısı yok.
          </p>
          <button
            type="button"
            onClick={() => void start()}
            className="orb-pulse mt-10 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 via-fuchsia-500 to-violet-900 shadow-[0_0_90px_rgba(244,114,182,0.6)]"
          >
            <span className="font-display text-4xl">SOS</span>
          </button>
        </div>
        <p className="text-center text-[11px] text-mute">Tıbbi acil: 112. Steady tedavi değildir.</p>
      </div>
    )
  }

  if (phase === 'tap') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <Kicker>Dalga indi</Kicker>
        <p className="mt-2 text-sm text-mute">{formatDuration(seconds)}</p>
        <h1 className="mt-6 font-display text-3xl leading-tight">{sentence}</h1>
        <p className="mt-3 text-sm text-mute">Bu cümleye on kez dokun. {taps}/10</p>
        <button
          type="button"
          onClick={tap}
          className="mt-10 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-rose-200 to-fuchsia-600 text-lg font-medium shadow-[0_0_70px_rgba(244,114,182,0.5)]"
        >
          Dokun
        </button>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <Kicker>Bırakış · şükran</Kicker>
        <h1 className="mt-4 font-display text-3xl">Geçti. Sen buradasın.</h1>
        <p className="mt-3 max-w-sm text-sm text-mute">
          Süre kaydedildi. Geçmiş listesi Pro’dadır; bu dalga yine de yazıldı. Küçük şükran yeter: nefes, yer, oda.
        </p>
        <div className="mt-8 w-full max-w-xs space-y-3">
          <PrimaryButton onClick={() => navigate('/')}>Ana iskeleye dön</PrimaryButton>
          <Link to="/me" className="block text-sm text-rose-200">
            Geçti geçmişi
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mute">{formatDuration(seconds)}</p>
        <CrisisLink />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-rose-300/90 via-fuchsia-600 to-violet-950 shadow-[0_0_80px_rgba(244,114,182,0.45)] transition-transform duration-[1100ms] ease-in-out"
          style={{ transform: `scale(${scale})` }}
        >
          <span className="font-display text-3xl">{label}</span>
        </div>
        {livePhrase ? (
          <p className="mt-8 max-w-xs text-center font-display text-xl leading-snug text-rose-100">{livePhrase}</p>
        ) : (
          <p className="mt-8 text-sm text-mute">Dalga inince Geçti.</p>
        )}
      </div>
      <PrimaryButton onClick={passed}>Geçti</PrimaryButton>
      <GhostButton className="mt-3 w-full" onClick={() => { running.current = false; audio.stop(); stopSpeak(); navigate('/') }}>
        Sesleri durdur
      </GhostButton>
    </div>
  )
}
