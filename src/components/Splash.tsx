import { useEffect, useRef, useState } from 'react'
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
  const { t, meta } = useI18n()
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
    try {
      window.speechSynthesis?.cancel()
    } catch {
      /* ignore */
    }
    onDoneRef.current()
  }

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!reduce && typeof window.speechSynthesis !== 'undefined') {
      try {
        const u = new SpeechSynthesisUtterance(`${line} ${more}`)
        u.lang = meta.bcp47
        u.rate = 0.9
        u.pitch = 1
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(u)
      } catch {
        /* autoplay blocked */
      }
    }
    const hold = reduce ? 1100 : 4200
    const fade = reduce ? 280 : 640
    const a = window.setTimeout(() => setOut(true), hold)
    const b = window.setTimeout(finish, hold + fade)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      try {
        window.speechSynthesis?.cancel()
      } catch {
        /* ignore */
      }
    }
  }, [line, more, meta.bcp47])

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
