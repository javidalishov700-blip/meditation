import { useI18n } from '../lib/i18n'

const FIGURES = [
  { x: 18, delay: 0, scale: 1 },
  { x: 38, delay: 0.7, scale: 0.92 },
  { x: 56, delay: 1.4, scale: 1.08 },
  { x: 76, delay: 0.35, scale: 0.86 },
  { x: 96, delay: 1.1, scale: 1 },
  { x: 116, delay: 1.8, scale: 0.94 },
  { x: 134, delay: 0.55, scale: 1.04 },
]

function Sit({ x, delay, scale }: { x: number; delay: number; scale: number }) {
  return (
    <g className="sit-fig" style={{ animationDelay: `${delay}s` }} transform={`translate(${x} 28) scale(${scale})`}>
      <ellipse cx="12" cy="34" rx="10" ry="3.2" fill="currentColor" opacity="0.18" />
      <circle cx="12" cy="8" r="4.2" fill="currentColor" />
      <path
        d="M4.5 16c2.2-3.2 13.8-3.2 16 0 1.2 1.8 1.4 6.4-1 10.2-1.6 2.6-5.2 4.4-7 4.4s-5.4-1.8-7-4.4c-2.4-3.8-2.2-8.4-1-10.2Z"
        fill="currentColor"
      />
    </g>
  )
}

export function Presence() {
  const { t } = useI18n()
  return (
    <section className="mt-10 overflow-hidden rounded-[1.6rem] surface">
      <div className="relative">
        <img src="/covers/cover-presence.png" alt="" className="h-36 w-full object-cover keep-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 keep-dark" />
        <svg viewBox="0 0 160 70" className="absolute inset-x-4 bottom-2 h-16 text-white/90 keep-dark" aria-hidden>
          {FIGURES.map((f) => (
            <Sit key={f.x} {...f} />
          ))}
        </svg>
      </div>
      <div className="px-4 pb-4 pt-3">
        <p className="text-[15px] font-semibold leading-snug">{t('presence_now')}</p>
        <p className="mt-1 text-[12px] leading-5 text-mute">{t('presence_sub')}</p>
      </div>
    </section>
  )
}
