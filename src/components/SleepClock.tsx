import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Card } from './ui'
import { formatHm } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { patchOnboard, readOnboard, requestNotify } from '../lib/onboard'
import {
  bedMins,
  durationLabelParts,
  moveSleepHandle,
  nightMinutes,
  readSleepPlan,
  sleepTone,
  wakeMins,
  writeSleepPlan,
  type SleepPlan,
  type SleepTone,
} from '../lib/sleep-plan'

const TONE_KEY: Record<SleepTone, 'sleep_tone_good' | 'sleep_tone_time' | 'sleep_tone_late'> = {
  good: 'sleep_tone_good',
  time: 'sleep_tone_time',
  late: 'sleep_tone_late',
}

const TONE_CLASS: Record<SleepTone, string> = {
  good: 'text-emerald-200',
  time: 'text-[#E9D5FF]',
  late: 'text-amber-100',
}

const SIZE = 280
const CX = SIZE / 2
const CY = SIZE / 2
const R_TRACK = 108
const R_NUM = 82
const R_TICK_IN = 96
const R_TICK_OUT = 102
const DAY = 24 * 60

function angle(mins: number): number {
  return (mins / DAY) * Math.PI * 2 - Math.PI / 2
}

function xy(r: number, mins: number): { x: number; y: number } {
  const a = angle(mins)
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) }
}

function arcPath(from: number, to: number): string {
  const start = xy(R_TRACK, from)
  const end = xy(R_TRACK, to)
  let span = (to - from + DAY) % DAY
  if (span === 0) span = DAY
  const large = span > DAY / 2 ? 1 : 0
  return `M ${start.x} ${start.y} A ${R_TRACK} ${R_TRACK} 0 ${large} 1 ${end.x} ${end.y}`
}

function pointerMins(clientX: number, clientY: number, el: SVGSVGElement): number {
  const rect = el.getBoundingClientRect()
  const x = clientX - (rect.left + rect.width / 2)
  const y = clientY - (rect.top + rect.height / 2)
  let rad = Math.atan2(x, -y)
  if (rad < 0) rad += Math.PI * 2
  return (rad / (Math.PI * 2)) * DAY
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function pickHandle(svg: SVGSVGElement, clientX: number, clientY: number, plan: SleepPlan): 'bed' | 'wake' {
  const rect = svg.getBoundingClientRect()
  const scale = SIZE / rect.width
  const p = {
    x: (clientX - rect.left) * scale,
    y: (clientY - rect.top) * scale,
  }
  const bed = xy(R_TRACK, bedMins(plan))
  const wake = xy(R_TRACK, wakeMins(plan))
  return dist(p, bed) <= dist(p, wake) ? 'bed' : 'wake'
}

export function SleepClock() {
  const { t, locale } = useI18n()
  const [plan, setPlan] = useState<SleepPlan>(() => readSleepPlan())
  const [remind, setRemind] = useState(() => readOnboard().remindSleep)
  const [tone, setTone] = useState<SleepTone>(() => sleepTone(plan))
  const [drag, setDrag] = useState<'bed' | 'wake' | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragRef = useRef<'bed' | 'wake' | null>(null)
  const planRef = useRef(plan)
  planRef.current = plan

  const bed = bedMins(plan)
  const wake = wakeMins(plan)
  const night = nightMinutes(plan)
  const parts = durationLabelParts(night)
  const bedPt = xy(R_TRACK, bed)
  const wakePt = xy(R_TRACK, wake)

  useEffect(() => {
    const tick = () => setTone(sleepTone(readSleepPlan()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [plan.bedHour, plan.bedMinute, plan.wakeHour, plan.wakeMinute])

  function save(next: SleepPlan) {
    writeSleepPlan(next)
    setPlan(next)
    setTone(sleepTone(next))
  }

  function onDown(e: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current
    if (!svg) return
    e.preventDefault()
    svg.setPointerCapture(e.pointerId)
    const which = pickHandle(svg, e.clientX, e.clientY, planRef.current)
    dragRef.current = which
    setDrag(which)
    const next = moveSleepHandle(planRef.current, which, pointerMins(e.clientX, e.clientY, svg))
    save(next)
  }

  function onMove(e: PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current
    const which = dragRef.current
    if (!svg || !which) return
    e.preventDefault()
    save(moveSleepHandle(planRef.current, which, pointerMins(e.clientX, e.clientY, svg)))
  }

  function onUp(e: PointerEvent<SVGSVGElement>) {
    dragRef.current = null
    setDrag(null)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }

  const center =
    parts.m === 0 ? t('sleep_center_h', { n: parts.h }) : t('sleep_center_hm', { h: parts.h, m: parts.m })

  return (
    <Card className="mt-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-amber-200/90">
            <MoonIcon />
            {t('sleep_bed')}
          </p>
          <p className={`mt-1 font-display text-[1.65rem] leading-none tabular-nums ${TONE_CLASS[tone]}`}>
            {formatHm(bed, locale)}
          </p>
        </div>
        <div className="text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-amber-200/90">
            <BellIcon />
            {t('sleep_wake')}
          </p>
          <p className="mt-1 font-display text-[1.65rem] leading-none tabular-nums text-cream">
            {formatHm(wake, locale)}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-2 w-full max-w-[320px] select-none" style={{ touchAction: 'none' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-auto w-full"
          style={{ touchAction: 'none', userSelect: 'none' }}
          role="slider"
          aria-label={t('sleep_clock')}
          aria-valuemin={0}
          aria-valuemax={DAY - 5}
          aria-valuenow={drag === 'wake' ? wake : bed}
          aria-valuetext={`${t('sleep_bed')} ${formatHm(bed, locale)} · ${t('sleep_wake')} ${formatHm(wake, locale)}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onContextMenu={(e) => e.preventDefault()}
        >
          <defs>
            <linearGradient id="sleep-arc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A524" />
              <stop offset="100%" stopColor="#F6D36B" />
            </linearGradient>
          </defs>
          <circle cx={CX} cy={CY} r={R_TRACK} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="22" />
          {Array.from({ length: 48 }, (_, i) => {
            const mins = i * 30
            const inner = i % 2 === 0 ? R_TICK_IN : R_TICK_IN + 2
            const a = xy(inner, mins)
            const b = xy(R_TICK_OUT, mins)
            return (
              <line
                key={mins}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth={i % 2 === 0 ? 1.6 : 1}
              />
            )
          })}
          {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((hour) => {
            const p = xy(R_NUM, hour * 60)
            const label = hour % 12 === 0 ? '12' : String(hour % 12)
            return (
              <text
                key={hour}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.88)"
                fontSize="13"
                fontWeight="600"
                style={{ pointerEvents: 'none' }}
              >
                {label}
              </text>
            )
          })}
          <path
            d={arcPath(bed, wake)}
            fill="none"
            stroke="url(#sleep-arc)"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#F7F4EE"
            fontSize="22"
            fontWeight="650"
            letterSpacing="0.04em"
            style={{ pointerEvents: 'none' }}
          >
            {center}
          </text>
          <Handle cx={bedPt.x} cy={bedPt.y} active={drag === 'bed'} kind="bed" />
          <Handle cx={wakePt.x} cy={wakePt.y} active={drag === 'wake'} kind="wake" />
        </svg>
      </div>

      <p className={`mt-1 text-center text-sm leading-5 ${TONE_CLASS[tone]}`}>
        {t(TONE_KEY[tone], { t: formatHm(bed, locale) })}
      </p>
      <p className="mt-1 text-center text-xs text-mute">{t('sleep_drag')}</p>

      <button
        type="button"
        role="switch"
        aria-checked={remind}
        onClick={() => {
          const v = !remind
          setRemind(v)
          patchOnboard({ remindSleep: v })
          if (v) void requestNotify()
        }}
        className="mt-4 flex w-full items-center gap-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-cream">{t('ob_rem_sleep')}</span>
          <span className="mt-1 block text-xs leading-5 text-mute">{t('ob_rem_sleep_h')}</span>
        </span>
        <span className={`relative h-7 w-12 shrink-0 rounded-full ${remind ? 'bg-[#7B61FF]' : 'bg-white/15'}`}>
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              remind ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </span>
      </button>
    </Card>
  )
}

function Handle({
  cx,
  cy,
  active,
  kind,
}: {
  cx: number
  cy: number
  active: boolean
  kind: 'bed' | 'wake'
}) {
  return (
    <g transform={`translate(${cx} ${cy})`} style={{ pointerEvents: 'none' }}>
      <circle r={active ? 17 : 16} fill="#1a140c" stroke="#F5A524" strokeWidth="2.2" />
      {kind === 'bed' ? (
        <path
          d="M-4.2 -1.2a5.4 5.4 0 1 0 6.6 6.4 4.4 4.4 0 0 1-6.6-6.4Z"
          fill="#F5A524"
        />
      ) : (
        <g fill="none" stroke="#F5A524" strokeWidth="1.7" strokeLinecap="round">
          <path d="M-3.2 -2.2h6.4v5.2a3.2 3.2 0 0 1-6.4 0Z" />
          <path d="M0 -4.4v2.2M-2.2 5.4h4.4" />
        </g>
      )}
    </g>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M11.2 10.4A5.2 5.2 0 0 1 6.1 3.6 4.6 4.6 0 1 0 11.2 10.4Z" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4.2 6.2a3.8 3.8 0 0 1 7.6 0v3.2l.8 1.4H3.4l.8-1.4V6.2Z" />
      <path d="M6.4 11.8a1.6 1.6 0 0 0 3.2 0" />
    </svg>
  )
}
