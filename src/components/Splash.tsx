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
  const { t } = useI18n()
  const [out, setOut] = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const finished = useRef(false)

  function finish() {
    if (finished.current) return
    finished.current = true
    markIntro()
    onDoneRef.current()
  }

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const hold = reduce ? 700 : 2000
    const fade = reduce ? 280 : 560
    const a = window.setTimeout(() => setOut(true), hold)
    const b = window.setTimeout(finish, hold + fade)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [])

  return (
    <button type="button" className={`splash ${out ? 'splash-out' : ''}`} onClick={finish} aria-label="Steady">
      <span className="splash-glow" aria-hidden />
      <img src="/favicon.svg" alt="" className="splash-mark" width={96} height={96} />
      <span className="splash-name">Steady</span>
      <span className="splash-tag">{t('splash_tag')}</span>
    </button>
  )
}
