import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LangPicker } from '../components/LangPicker'
import { PrimaryButton, Switch } from '../components/ui'
import { audio } from '../lib/audio'
import { useEmergencyLine } from '../lib/emergency'
import { useI18n } from '../lib/i18n'
import {
  completeOnboard,
  onboardHighLoad,
  requestNotify,
  suggestedPath,
  type AgreeId,
  type BringId,
  type FallId,
  type FreqId,
  type HoursId,
  type MedexId,
  type NeedId,
  type OnboardAnswers,
  type WakeId,
} from '../lib/onboard'
import type { StringKey } from '../lib/strings'

const STEPS = [
  'lang',
  'name',
  'bring',
  'agree1',
  'agree2',
  'hope',
  'breathe',
  'part',
  'hours',
  'sleep',
  'wake',
  'fall',
  'medex',
  'need',
  'often',
  'risk',
  'profile',
  'plan',
  'remind',
  'ready',
] as const
type Step = (typeof STEPS)[number]

/** Three chapters for the progress bar: who you are, your nights, your plan. */
const SECTIONS: { key: StringKey; steps: Step[] }[] = [
  { key: 'ob_sec_you', steps: ['lang', 'name', 'bring', 'agree1', 'agree2', 'hope', 'breathe'] },
  { key: 'ob_sec_night', steps: ['part', 'hours', 'sleep', 'wake', 'fall'] },
  { key: 'ob_sec_plan', steps: ['medex', 'need', 'often', 'risk', 'profile', 'plan', 'remind', 'ready'] },
]

/** Screens that leave on their own (a tap on an answer, a timer) and need no Continue button. */
const AUTO: Step[] = ['bring', 'agree1', 'agree2', 'part', 'hours', 'sleep', 'wake', 'medex', 'need', 'often']

/** Never land on these when going back: one is a timed interstitial, one an animation. */
const BACK_SKIP: Step[] = ['part', 'plan']

type Opt<T> = { id: T; label: StringKey; icon?: string; tone?: string; level?: number }

const BRING: Opt<BringId>[] = [
  { id: 'wave', label: 'ob_bring_wave', tone: 'tint-coral', icon: 'M3 12h4l2-5 4 10 2-5h6' },
  { id: 'worry', label: 'ob_bring_worry', tone: 'tint-violet', icon: 'M12 7v5l3.2 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z' },
  { id: 'sleep', label: 'ob_bring_sleep', tone: 'tint-iris', icon: 'M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z' },
  { id: 'world', label: 'ob_bring_world', tone: 'tint-sky', icon: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z' },
  { id: 'self', label: 'ob_bring_self', tone: 'tint-teal', icon: 'M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5' },
]

const NEED: Opt<NeedId>[] = [
  { id: 'stop', label: 'ob_need_stop', tone: 'tint-coral', icon: 'M9 7v10M15 7v10' },
  { id: 'sleep', label: 'ob_need_sleep', tone: 'tint-iris', icon: 'M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z' },
  { id: 'sentence', label: 'ob_need_sentence', tone: 'tint-amber', icon: 'M5 8h14M5 12h10M5 16h12' },
  { id: 'breath', label: 'ob_need_breath', tone: 'tint-sky', icon: 'M3 14c3-8 7-8 9-8s6 0 9 8M6 18c2-3.5 4-4.5 6-4.5s4 1 6 4.5' },
]

const OFTEN: Opt<FreqId>[] = [
  { id: 'rarely', label: 'ob_often_rare', level: 1 },
  { id: 'sometimes', label: 'ob_often_some', level: 2 },
  { id: 'often', label: 'ob_often_most', level: 3 },
  { id: 'always', label: 'ob_often_always', level: 4 },
]

const SLEEP: Opt<FreqId>[] = [
  { id: 'rarely', label: 'ob_freq_never', level: 1 },
  { id: 'sometimes', label: 'ob_freq_some', level: 2 },
  { id: 'often', label: 'ob_freq_often', level: 3 },
  { id: 'always', label: 'ob_freq_always', level: 4 },
]

const HOURS: Opt<HoursId>[] = [
  { id: 'lt6', label: 'ob_h_lt6', level: 1 },
  { id: 'h67', label: 'ob_h_67', level: 2 },
  { id: 'h78', label: 'ob_h_78', level: 3 },
  { id: 'h89', label: 'ob_h_89', level: 4 },
  { id: 'h9', label: 'ob_h_9', level: 5 },
]

const WAKE: Opt<WakeId>[] = [
  { id: 'every', label: 'ob_wake_every', level: 4 },
  { id: 'most', label: 'ob_wake_most', level: 3 },
  { id: 'sometimes', label: 'ob_wake_some', level: 2 },
  { id: 'rarely', label: 'ob_wake_rare', level: 1 },
]

const FALL: Opt<FallId>[] = [
  { id: 'meditate', label: 'ob_fall_med', tone: 'tint-violet', icon: 'M12 5.5a2 2 0 1 0 0 .01M8 20c1.2-4 2.8-6 4-6s2.8 2 4 6M6 13l6-2 6 2' },
  { id: 'story', label: 'ob_fall_story', tone: 'tint-amber', icon: 'M4 5.5c2.5-1 5.5-1 8 .8 2.5-1.8 5.5-1.8 8-.8V19c-2.5-1-5.5-1-8 .8-2.5-1.8-5.5-1.8-8-.8V5.5ZM12 6.3v13.5' },
  { id: 'nature', label: 'ob_fall_nature', tone: 'tint-green', icon: 'M4 18c2-7 6-10 8-10s6 3 8 10M12 8V4M8 20h8' },
]

const MEDEX: Opt<MedexId>[] = [
  { id: 'none', label: 'ob_medex_none', tone: 'tint-sky', icon: 'M12 20V10M12 10c0-3 2-5 5-5 0 3-2 5-5 5ZM12 13c0-2.5-1.7-4-4-4 0 2.5 1.7 4 4 4Z' },
  { id: 'some', label: 'ob_medex_some', tone: 'tint-violet', icon: 'M12 5.5a2 2 0 1 0 0 .01M8 20c1.2-4 2.8-6 4-6s2.8 2 4 6M6 13l6-2 6 2' },
  { id: 'skip', label: 'ob_medex_skip', tone: 'tint-gray', icon: 'M5 12h14M13 6l6 6-6 6' },
]

const PLAN: StringKey[] = ['ob_p1', 'ob_p2', 'ob_p3', 'ob_p4', 'ob_p5']

const BREATH_IN_MS = 4000
const BREATH_OUT_MS = 6000

export function Onboard({ onDone }: { onDone: () => void }) {
  const { t, locale } = useI18n()
  const emergency = useEmergencyLine()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('lang')
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<OnboardAnswers>({
    fall: [],
    remindQuote: false,
    remindSleep: false,
  })
  const [planN, setPlanN] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const leaving = useRef(false)

  useEffect(() => () => audio.stop(0.8), [])

  // The shell div isn't recreated between steps, only its child, so it keeps
  // whatever scrollTop the previous step was left at unless reset here. Layout
  // effect, not a regular one: it must land before paint or the old scroll
  // position flashes for a frame and then snaps to 0, reading as a jump.
  useLayoutEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
    leaving.current = false
  }, [step])

  useEffect(() => {
    if (step !== 'part') return
    const id = window.setTimeout(() => {
      setDir(1)
      setStep('hours')
    }, 1600)
    return () => window.clearTimeout(id)
  }, [step])

  useEffect(() => {
    if (step !== 'plan') return
    setPlanN(0)
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setPlanN(n)
      if (n >= PLAN.length) window.clearInterval(id)
    }, 560)
    return () => window.clearInterval(id)
  }, [step])

  function warm() {
    audio.unlock()
    void audio.playOnboard()
  }

  function go(next: Step, d: number) {
    setDir(d)
    setStep(next)
  }

  /** Takes the answers explicitly: a pick and its auto-advance happen in one tick, before state settles. */
  function advance(a: OnboardAnswers = answers) {
    const i = STEPS.indexOf(step)
    let n = STEPS[i + 1]
    if (n === 'risk' && !onboardHighLoad(a)) n = STEPS[i + 2]
    if (n) go(n, 1)
  }

  function back() {
    let i = STEPS.indexOf(step) - 1
    while (i > 0 && (BACK_SKIP.includes(STEPS[i]!) || (STEPS[i] === 'risk' && !onboardHighLoad(answers)))) i -= 1
    if (i >= 0) go(STEPS[i]!, -1)
  }

  /** Single-choice answer: record it and move on, so one tap is one step. */
  function pick<K extends keyof OnboardAnswers>(key: K, value: OnboardAnswers[K]) {
    if (leaving.current) return
    warm()
    const next = { ...answers, [key]: value }
    setAnswers(next)
    leaving.current = true
    window.setTimeout(() => advance(next), 260)
  }

  function finish(to: string) {
    void requestNotify()
    completeOnboard({ ...answers, name: answers.name?.trim() || undefined })
    audio.stop(0.8)
    onDone()
    navigate(to, { replace: true })
  }

  const section = SECTIONS.findIndex((s) => s.steps.includes(step))
  const within = SECTIONS[section]!.steps
  const sectionPct = ((within.indexOf(step) + 1) / within.length) * 100
  const path = suggestedPath(answers)
  const name = answers.name?.trim()

  const canGo =
    step === 'lang' ||
    step === 'name' ||
    step === 'hope' ||
    step === 'breathe' ||
    step === 'risk' ||
    step === 'profile' ||
    (step === 'plan' && planN >= PLAN.length) ||
    step === 'remind' ||
    (step === 'fall' && answers.fall.length > 0)

  return (
    <div
      ref={scrollRef}
      className="app-scroll ob-shell relative z-10 mx-auto flex h-full max-w-lg flex-col overflow-y-auto overscroll-none px-5 pb-[max(1.35rem,env(safe-area-inset-bottom))] pt-[max(0.7rem,env(safe-area-inset-top))]"
      onPointerDown={warm}
    >
      <div className="ob-glow" aria-hidden />

      {step !== 'lang' && step !== 'part' ? (
        <header className="relative z-10 flex items-center gap-3 pt-3">
          <button
            type="button"
            aria-label={t('back')}
            onClick={back}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/85"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <div className="flex flex-1 gap-1.5">
            {SECTIONS.map((s, i) => (
              <span key={s.key} className="h-[4px] flex-1 overflow-hidden rounded-full bg-white/[0.12]">
                <span
                  className="block h-full rounded-full bg-[#FFE3C2] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: i < section ? '100%' : i === section ? `${sectionPct}%` : '0%' }}
                />
              </span>
            ))}
          </div>
          <span className="w-12 shrink-0 text-right text-[12px] font-medium text-white/60">{t(SECTIONS[section]!.key)}</span>
        </header>
      ) : null}

      <div key={`${step}-${locale}`} className={`relative z-10 flex min-h-0 flex-1 flex-col ${dir < 0 ? 'ob-in-back' : 'ob-in'}`}>
        {step === 'lang' ? (
          <div className="flex flex-1 flex-col pt-10">
            <div className="flex flex-col items-center text-center">
              <div className="pro-hero">
                <span className="pro-halo" />
                <span className="pro-ring" />
                <img src="/favicon.svg" alt="" className="pro-mark" />
              </div>
              <p className="mt-4 font-display text-[15px] font-semibold uppercase tracking-[0.3em] text-[#FFE3C2]">Steady</p>
              <h1 className="mt-4 font-display text-[2.1rem] font-semibold leading-tight tracking-tight">{t('ob_hello_title')}</h1>
              <p className="mt-3 max-w-[21rem] text-[15px] leading-6 text-white/70">{t('ob_hello_sub')}</p>
            </div>
            <div className="mt-8 rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{t('ob_lang_k')}</p>
              <div className="mt-3">
                <LangPicker compact onPick={warm} />
              </div>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12px] text-white/50">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor">
                <path d="M8 10V8a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 18 11.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5v-7A1.5 1.5 0 0 1 7.5 10H8Zm2 0h4V8a2 2 0 1 0-4 0v2Z" />
              </svg>
              {t('ob_welcome_sub')}
            </p>
          </div>
        ) : null}

        {step === 'name' ? (
          <Screen title={t('ob_name')} sub={t('ob_name_sub')}>
            <input
              value={answers.name ?? ''}
              onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value.slice(0, 24) }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') advance()
              }}
              placeholder={t('ob_name_ph')}
              autoComplete="given-name"
              enterKeyHint="next"
              className="mt-8 h-14 w-full rounded-[1.1rem] border border-white/[0.12] bg-white/[0.06] px-5 text-center font-display text-[1.35rem] text-white outline-none placeholder:text-white/30 focus:border-[#FFE3C2]/60"
            />
            {!name ? (
              <button type="button" className="mx-auto mt-4 block text-[14px] text-white/55" onClick={() => advance()}>
                {t('ob_name_skip')}
              </button>
            ) : null}
          </Screen>
        ) : null}

        {step === 'bring' ? (
          <Screen title={t('ob_bring')} sub={t('ob_bring_sub')}>
            <Choices>
              {BRING.map((o) => (
                <Choice key={o.id} opt={o} label={t(o.label)} on={answers.bring === o.id} onPick={() => pick('bring', o.id)} />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'agree1' || step === 'agree2' ? (
          <Agree
            title={t('ob_agree')}
            sub={t('ob_agree_sub')}
            quote={t(step === 'agree1' ? 'ob_ag1' : 'ob_ag2')}
            storm={step === 'agree1'}
            picked={answers[step]}
            yes={t('ob_yes')}
            no={t('ob_no')}
            onPick={(v: AgreeId) => pick(step, v)}
          />
        ) : null}

        {step === 'hope' ? (
          <Screen title={t('ob_hope')}>
            <div className="mt-7 space-y-3">
              <HopeCard tone="before" title={t('ob_before')} lines={[t('ob_b1'), t('ob_b2'), t('ob_b3'), t('ob_b4'), t('ob_b5')]} />
              <div className="flex justify-center text-[#FFE3C2]/70">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </div>
              <HopeCard tone="after" title={t('ob_after')} lines={[t('ob_a1'), t('ob_a2'), t('ob_a3'), t('ob_a4'), t('ob_a5')]} />
            </div>
          </Screen>
        ) : null}

        {step === 'breathe' ? <Breathe /> : null}

        {step === 'part' ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="tint tint-iris flex h-16 w-16 items-center justify-center rounded-full">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z" />
              </svg>
            </span>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FFE3C2]/80">{t('ob_part')}</p>
            <h1 className="mt-3 font-display text-5xl font-semibold">{t('ob_part_title')}</h1>
          </div>
        ) : null}

        {step === 'hours' ? (
          <Screen title={t('ob_hours')} sub={t('ob_hours_sub')}>
            <Choices>
              {HOURS.map((o) => (
                <Choice key={o.id} opt={o} max={5} label={t(o.label)} on={answers.hours === o.id} onPick={() => pick('hours', o.id)} />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'sleep' ? (
          <Screen title={t('ob_sleep_q')} sub={t('ob_sleep_sub')}>
            <Choices>
              {SLEEP.map((o) => (
                <Choice key={o.id} opt={o} label={t(o.label)} on={answers.sleepHard === o.id} onPick={() => pick('sleepHard', o.id)} />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'wake' ? (
          <Screen title={t('ob_wake')}>
            <Choices>
              {WAKE.map((o) => (
                <Choice key={o.id} opt={o} label={t(o.label)} on={answers.wake === o.id} onPick={() => pick('wake', o.id)} />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'fall' ? (
          <Screen title={t('ob_fall')} sub={t('ob_fall_sub')}>
            <Choices>
              {FALL.map((o) => (
                <Choice
                  key={o.id}
                  opt={o}
                  multi
                  label={t(o.label)}
                  on={answers.fall.includes(o.id)}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({
                      ...a,
                      fall: a.fall.includes(o.id) ? a.fall.filter((x) => x !== o.id) : [...a.fall, o.id],
                    }))
                  }}
                />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'medex' ? (
          <Screen title={t('ob_medex')} sub={t('ob_medex_sub')}>
            <Choices>
              {MEDEX.map((o) => (
                <Choice key={o.id} opt={o} label={t(o.label)} on={answers.medex === o.id} onPick={() => pick('medex', o.id)} />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'need' ? (
          <Screen title={t('ob_need')} sub={t('ob_need_sub')}>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {NEED.map((o) => (
                <Tile key={o.id} opt={o} label={t(o.label)} on={answers.need === o.id} onPick={() => pick('need', o.id)} />
              ))}
            </div>
          </Screen>
        ) : null}

        {step === 'often' ? (
          <Screen title={t('ob_often')} sub={t('ob_often_sub')}>
            <Choices>
              {OFTEN.map((o) => (
                <Choice key={o.id} opt={o} label={t(o.label)} on={answers.often === o.id} onPick={() => pick('often', o.id)} />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'risk' ? (
          <Screen title={t('ob_risk')} sub={t('ob_risk_sub')}>
            <div className="mt-8 space-y-3">
              <a
                href={`tel:${emergency.tel}`}
                className="flex w-full items-center gap-3 rounded-[1.2rem] border border-[#F29A8E]/35 bg-[#F29A8E]/10 px-4 py-4 text-left"
              >
                <span className="tint tint-coral flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                    <path d="M6.6 3.5h2.6c.5 0 .9.3 1 .8l.9 3.1c.1.4 0 .9-.4 1.1l-1.7 1.2a12.5 12.5 0 0 0 5.3 5.3l1.2-1.7c.3-.4.7-.5 1.1-.4l3.1.9c.5.1.8.5.8 1v2.6c0 1-.8 1.7-1.8 1.7A15.6 15.6 0 0 1 4.9 5.3c0-1 .7-1.8 1.7-1.8Z" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-medium text-white">{t('ob_risk_tel', { n: emergency.tel })}</span>
              </a>
              <p className="px-1 text-sm leading-6 text-white/65">{t('ob_risk_sos')}</p>
              <p className="px-1 text-xs leading-5 text-white/45">{emergency.source === 'default' ? t('crisis_alts') : t('crisis_guess')}</p>
            </div>
          </Screen>
        ) : null}

        {step === 'profile' ? (
          <Screen title={t('ob_profile')} sub={t('ob_profile_sub')}>
            <div className="mt-7 overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04]">
              {[
                answers.bring ? { k: 'ob_pf_focus' as StringKey, v: t(BRING.find((o) => o.id === answers.bring)!.label) } : null,
                answers.hours ? { k: 'ob_pf_sleep' as StringKey, v: t(HOURS.find((o) => o.id === answers.hours)!.label) } : null,
                answers.need ? { k: 'ob_pf_need' as StringKey, v: t(NEED.find((o) => o.id === answers.need)!.label) } : null,
                answers.often ? { k: 'ob_pf_often' as StringKey, v: t(OFTEN.find((o) => o.id === answers.often)!.label) } : null,
              ]
                .filter((r): r is { k: StringKey; v: string } => Boolean(r))
                .map((r) => (
                  <div key={r.k} className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3.5 last:border-b-0">
                    <span className="text-[13px] text-white/55">{t(r.k)}</span>
                    <span className="text-right text-[15px] font-medium text-white">{r.v}</span>
                  </div>
                ))}
            </div>
            <div className="mt-4 rounded-[1.35rem] border border-[#FFE3C2]/25 bg-[#FFE3C2]/[0.07] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFE3C2]/80">{t('ob_pf_first')}</p>
              <p className="mt-2 font-display text-[1.25rem] font-semibold text-white">{t(path.title)}</p>
              <p className="mt-1 text-[14px] text-white/65">{t(path.sub)}</p>
            </div>
          </Screen>
        ) : null}

        {step === 'plan' ? (
          <Screen title={t('ob_plan')} sub={t('ob_plan_sub')}>
            <div className="mt-8 flex justify-center">
              <PlanRing value={planN / PLAN.length} />
            </div>
            <ul className="mt-8 space-y-3.5">
              {PLAN.map((key, i) => (
                <li
                  key={key}
                  className={`flex items-center gap-3 text-[15px] transition-colors duration-500 ${i < planN ? 'text-white' : 'text-white/35'}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                      i < planN ? 'bg-[#FFE3C2] text-[#2A1A3A]' : 'border border-white/20'
                    }`}
                  >
                    {i < planN ? (
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.4">
                        <path d="M5 12.5 10 17l9-9" />
                      </svg>
                    ) : null}
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </Screen>
        ) : null}

        {step === 'remind' ? (
          <Screen title={t('ob_remind')} sub={t('ob_remind_sub')}>
            <div className="mt-8 space-y-3">
              <Switch
                on={answers.remindQuote}
                label={t('ob_rem_quote')}
                hint={t('ob_rem_quote_h')}
                onChange={(v) => {
                  warm()
                  setAnswers((a) => ({ ...a, remindQuote: v }))
                  if (v) void requestNotify()
                }}
              />
              <Switch
                on={answers.remindSleep}
                label={t('ob_rem_sleep')}
                hint={t('ob_rem_sleep_h')}
                onChange={(v) => {
                  warm()
                  setAnswers((a) => ({ ...a, remindSleep: v }))
                  if (v) void requestNotify()
                }}
              />
            </div>
          </Screen>
        ) : null}

        {step === 'ready' ? (
          <div className="flex flex-1 flex-col pt-6">
            <div className="text-center">
              <img src="/favicon.svg" alt="" className="mx-auto h-16 w-16 rounded-[1.1rem] shadow-[0_14px_36px_rgba(246,181,142,0.25)]" />
              <h1 className="mt-5 font-display text-[2rem] font-semibold leading-tight tracking-tight">
                {name ? t('ob_ready_name', { n: name }) : t('ob_ready')}
              </h1>
              <p className="mx-auto mt-2 max-w-[21rem] text-[14px] leading-6 text-white/65">{t('ob_ready_sub')}</p>
            </div>
            <button
              type="button"
              onClick={() => finish(path.to)}
              className="mt-6 flex items-center gap-3 rounded-[1.3rem] border border-[#FFE3C2]/25 bg-[#FFE3C2]/[0.07] p-4 text-left"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFE3C2]/80">{t('ob_pf_first')}</span>
                <span className="mt-1 block font-display text-[1.1rem] font-semibold text-white">{t(path.title)}</span>
                <span className="mt-0.5 block text-[13px] text-white/60">{t(path.sub)}</span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#FFE3C2]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      {AUTO.includes(step) ? null : (
        <div className="relative z-10 pt-5">
          {step === 'ready' ? (
            <>
              <PrimaryButton
                onClick={() => {
                  warm()
                  finish('/paywall')
                }}
              >
                {t('ob_see_pro')}
              </PrimaryButton>
              <button type="button" className="mt-3 w-full py-2 text-center text-[15px] text-white/70" onClick={() => finish('/')}>
                {t('ob_start_free')}
              </button>
            </>
          ) : (
            <PrimaryButton
              disabled={!canGo}
              onClick={() => {
                warm()
                advance()
              }}
            >
              {step === 'lang' ? t('ob_start') : t('ob_continue')}
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  )
}

function Screen({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <div className="flex-1 pt-8">
      <h1 className="font-display text-[1.85rem] font-semibold leading-[1.18] tracking-tight">{title}</h1>
      {sub ? <p className="mt-2.5 text-[15px] leading-6 text-white/60">{sub}</p> : null}
      {children}
    </div>
  )
}

function Choices({ children }: { children: ReactNode }) {
  return <div className="mt-7 space-y-2.5">{children}</div>
}

/** Bars for frequency answers: how much, at a glance, without reading. */
function Level({ n, max = 4, on }: { n: number; max?: number; on: boolean }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-end justify-center gap-[3px] rounded-[0.8rem] bg-white/[0.06] pb-2">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-[3.5px] rounded-full transition-colors ${i < n ? (on ? 'bg-[#FFE3C2]' : 'bg-white/70') : 'bg-white/[0.16]'}`}
          style={{ height: `${6 + i * (14 / Math.max(1, max - 1))}px` }}
        />
      ))}
    </span>
  )
}

function Choice<T>({
  opt,
  label,
  on,
  onPick,
  multi = false,
  max,
}: {
  opt: Opt<T>
  label: string
  on: boolean
  onPick: () => void
  multi?: boolean
  max?: number
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={on}
      className={`flex w-full items-center gap-3 rounded-[1.2rem] border px-3.5 py-3 text-left transition-[background-color,border-color,transform] duration-200 active:scale-[0.985] ${
        on ? 'border-[#FFE3C2]/70 bg-[#FFE3C2]/[0.09]' : 'border-white/[0.08] bg-white/[0.045]'
      }`}
    >
      {opt.icon ? (
        <span className={`tint ${opt.tone ?? 'tint-gray'} flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.8rem]`}>
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d={opt.icon} />
          </svg>
        </span>
      ) : opt.level ? (
        <Level n={opt.level} max={max} on={on} />
      ) : null}
      <span className="min-w-0 flex-1 text-[16px] leading-6 text-white">{label}</span>
      <span
        className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center border-2 transition-colors ${multi ? 'rounded-[6px]' : 'rounded-full'} ${
          on ? 'border-[#FFE3C2] bg-[#FFE3C2] text-[#2A1A3A]' : 'border-white/25'
        }`}
      >
        {on ? (
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.6">
            <path d="M5 12.5 10 17l9-9" />
          </svg>
        ) : null}
      </span>
    </button>
  )
}

/** Big square choice, for a handful of short answers that read better as a grid. */
function Tile<T>({ opt, label, on, onPick }: { opt: Opt<T>; label: string; on: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={on}
      className={`flex min-h-[7.5rem] flex-col items-start justify-between rounded-[1.35rem] border p-4 text-left transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] ${
        on ? 'border-[#FFE3C2]/70 bg-[#FFE3C2]/[0.09]' : 'border-white/[0.08] bg-white/[0.045]'
      }`}
    >
      <span className={`tint ${opt.tone ?? 'tint-gray'} flex h-11 w-11 items-center justify-center rounded-[0.9rem]`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d={opt.icon} />
        </svg>
      </span>
      <span className="mt-4 text-[16px] font-medium leading-5 text-white">{label}</span>
    </button>
  )
}

function HopeCard({ tone, title, lines }: { tone: 'before' | 'after'; title: string; lines: string[] }) {
  const after = tone === 'after'
  return (
    <div className={`rounded-[1.35rem] border p-4 ${after ? 'border-[#FFE3C2]/30 bg-[#FFE3C2]/[0.07]' : 'border-white/[0.07] bg-white/[0.035]'}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${after ? 'text-[#FFE3C2]' : 'text-white/45'}`}>{title}</p>
      <ul className="mt-3 space-y-2">
        {lines.map((line) => (
          <li key={line} className={`flex items-start gap-2.5 text-[14px] leading-6 ${after ? 'text-white' : 'text-white/55'}`}>
            <span
              className={`mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                after ? 'bg-[#FFE3C2] text-[#2A1A3A]' : 'bg-white/[0.08] text-white/45'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.6">
                <path d={after ? 'M5 12.5 10 17l9-9' : 'M7 7l10 10M17 7 7 17'} />
              </svg>
            </span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Agree({
  title,
  sub,
  quote,
  storm,
  picked,
  yes,
  no,
  onPick,
}: {
  title: string
  sub: string
  quote: string
  storm: boolean
  picked?: AgreeId
  yes: string
  no: string
  onPick: (v: AgreeId) => void
}) {
  return (
    <div className="flex flex-1 flex-col pt-8">
      <h1 className="font-display text-[1.85rem] font-semibold leading-tight tracking-tight">{title}</h1>
      <p className="mt-2.5 text-[15px] text-white/60">{sub}</p>
      <div className={`ob-quote relative mt-7 flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-[1.6rem] p-6 ${storm ? 'ob-quote-storm' : 'ob-quote-soft'}`}>
        <span className="font-display text-[4rem] leading-none text-[#FFE3C2]/60" aria-hidden>
          “
        </span>
        <p className="-mt-4 font-display text-[1.45rem] font-medium italic leading-snug text-white">{quote}</p>
        <svg viewBox="0 0 320 90" className="mt-8 h-20 w-full" fill="none" aria-hidden>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              className="ob-wave"
              style={{ animationDelay: `${i * -1.4}s`, opacity: 0.85 - i * 0.25 }}
              d={`M0 ${45 + i * 14} C 40 ${storm ? 15 + i * 14 : 35 + i * 14}, 80 ${storm ? 75 + i * 10 : 55 + i * 10}, 160 ${45 + i * 12} S 280 ${storm ? 20 + i * 12 : 38 + i * 12}, 320 ${45 + i * 12}`}
              stroke={storm ? '#F29A8E' : '#86B8FF'}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {(['yes', 'no'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onPick(v)}
            className={`rounded-[1.2rem] border py-4 text-[16px] font-medium transition-colors ${
              picked === v ? 'border-[#FFE3C2]/70 bg-[#FFE3C2]/[0.12] text-white' : 'border-white/[0.1] bg-white/[0.05] text-white/90'
            }`}
          >
            {v === 'yes' ? yes : no}
          </button>
        ))}
      </div>
    </div>
  )
}

/** A first taste of the app itself: one guided breath, before any plan or price. */
function Breathe() {
  const { t } = useI18n()
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const [rounds, setRounds] = useState(0)

  useEffect(() => {
    let alive = true
    let timer = 0
    const run = (p: 'in' | 'out') => {
      if (!alive) return
      setPhase(p)
      timer = window.setTimeout(
        () => {
          if (p === 'out') setRounds((r) => r + 1)
          run(p === 'in' ? 'out' : 'in')
        },
        p === 'in' ? BREATH_IN_MS : BREATH_OUT_MS,
      )
    }
    run('in')
    return () => {
      alive = false
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col pt-8">
      <h1 className="font-display text-[1.85rem] font-semibold leading-tight tracking-tight">{t('ob_breathe')}</h1>
      <p className="mt-2.5 text-[15px] leading-6 text-white/60">{t('ob_breathe_sub')}</p>
      <div className="flex flex-1 flex-col items-center justify-center py-8">
        <div className="relative flex h-60 w-60 items-center justify-center">
          <span className="ob-breath-glow absolute -inset-8 rounded-full" />
          <span className="absolute inset-0 rounded-full border border-[#FFE3C2]/15" />
          <span className="absolute inset-[14%] rounded-full border border-[#FFE3C2]/10" />
          <span
            className="ob-breath-orb absolute inset-[22%] rounded-full"
            style={{
              transform: `scale(${phase === 'in' ? 1.32 : 0.82})`,
              transitionDuration: `${phase === 'in' ? BREATH_IN_MS : BREATH_OUT_MS}ms`,
            }}
          />
          <span className="relative font-display text-[1.35rem] font-semibold text-[#2A1A3A]">
            {phase === 'in' ? t('sos_in') : t('sos_out')}
          </span>
        </div>
        <div className="mt-6 flex gap-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i < rounds ? 'bg-[#FFE3C2]' : 'bg-white/15'}`} />
          ))}
        </div>
        <p className={`mt-5 min-h-[1.5rem] text-center text-[14px] text-white/70 transition-opacity duration-700 ${rounds >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          {t('ob_breathe_done')}
        </p>
      </div>
    </div>
  )
}

function PlanRing({ value }: { value: number }) {
  const R = 44
  const C = 2 * Math.PI * R
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="#FFE3C2"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - value)}
          style={{ transition: 'stroke-dashoffset 0.55s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[1.6rem] font-semibold tabular-nums">
        {Math.round(value * 100)}%
      </span>
    </div>
  )
}
