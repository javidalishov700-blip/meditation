import { useEffect, useRef, useState } from 'react'
import { audio } from '../lib/audio'
import { useI18n } from '../lib/i18n'

const KEY = 'steady.intro'

export function needsIntro(): boolean {
  try {
    return sessionStorage.getItem(KEY) !== '1'
  } catch {
    return true
  }
}

function markIntro() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}

export function Splash({ onDone }: { onDone: () => void }) {
  const { t } = useI18n()
  const [out, setOut] = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const finished = useRef(false)
  const line = t('splash_line')
  const more = t('splash_more')

  function finish() {
    if (finished.current) return
    finished.current = true
    markIntro()
    audio.stopIntroSfx()
    onDoneRef.current()
  }

  useEffect(() => {
    void audio.playIntroSfx()
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const hold = reduce ? 1100 : 2800
    const fade = reduce ? 280 : 560
    const a = window.setTimeout(() => setOut(true), hold)
    const b = window.setTimeout(finish, hold + fade)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      audio.stopIntroSfx()
    }
  }, [])

  return (
    <button
      type="button"
      className={`splash ${out ? 'splash-out' : ''}`}
      onClick={finish}
      aria-label={`${line} ${more}`}
    >
      <span className="splash-glow" aria-hidden />
      <img src="/favicon.svg" alt="" className="splash-mark" width={112} height={112} />
      <span className="splash-name">Steady</span>
      <span className="splash-line">{line}</span>
      <span className="splash-tag">{more}</span>
    </button>
  )
}
