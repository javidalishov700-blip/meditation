import { useMemo } from 'react'

export type SkyPhase = 'dawn' | 'day' | 'dusk' | 'night'

export function skyPhase(hour = new Date().getHours()): SkyPhase {
  if (hour >= 5 && hour < 10) return 'dawn'
  if (hour >= 10 && hour < 17) return 'day'
  if (hour >= 17 && hour < 21) return 'dusk'
  return 'night'
}

/**
 * A living sky drawn in CSS and SVG instead of a flat picture: it follows the
 * clock (dawn, day, dusk, night), the aurora drifts, the stars breathe, and the
 * ridges are layered so the scene has depth. No image to load, so it is there
 * on the first frame.
 */
export function SkyScene({ phase }: { phase?: SkyPhase }) {
  const p = useMemo(() => phase ?? skyPhase(), [phase])
  return (
    <div className={`sky sky-${p}`} aria-hidden>
      <span className="sky-aurora sky-aurora-a" />
      <span className="sky-aurora sky-aurora-b" />
      {p === 'night' || p === 'dusk' ? <span className="sky-stars" /> : null}
      <span className="sky-orb" />
      <span className="sky-cloud sky-cloud-a" />
      <span className="sky-cloud sky-cloud-b" />
      <svg className="sky-ridges" viewBox="0 0 400 170" preserveAspectRatio="none">
        <path
          className="sky-ridge-3"
          d="M0 92 L38 70 L70 84 L112 52 L150 78 L188 60 L226 86 L268 48 L306 74 L348 58 L400 80 V170 H0 Z"
        />
        <path
          className="sky-ridge-2"
          d="M0 118 C40 100 70 96 104 106 C142 117 168 92 206 96 C244 100 266 118 302 112 C338 106 368 94 400 104 V170 H0 Z"
        />
        <path
          className="sky-ridge-1"
          d="M0 146 C52 128 96 126 148 134 C196 142 236 124 290 126 C336 128 370 140 400 134 V170 H0 Z"
        />
      </svg>
      <span className="sky-mist" />
    </div>
  )
}
