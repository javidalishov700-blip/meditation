import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LangPicker } from '../components/LangPicker'
import { PrimaryButton, Switch } from '../components/ui'
import { audio } from '../lib/audio'
import { useEntitlement } from '../lib/entitlement-store'
import { useEmergencyLine } from '../lib/emergency'
import { useI18n } from '../lib/i18n'
import { writeRemindTrial } from '../lib/remind'
import { PLANS, displayPlanPrice } from '../lib/entitlement'
import {
  completeOnboard,
  onboardHighLoad,
  requestNotify,
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
import type { PlanId } from '../lib/types'

const PERIOD: Record<PlanId, 'pay_period_week' | 'pay_period_month' | 'pay_period_year'> = {
  week: 'pay_period_week',
  month: 'pay_period_month',
  year: 'pay_period_year',
}

const STEPS = [
  'lang',
  'bring',
  'agree1',
  'agree2',
  'hope',
  'part',
  'hours',
  'sleep',
  'wake',
  'fall',
  'medex',
  'need',
  'often',
  'risk',
  'analyze',
  'plan',
  'remind',
  'trial',
] as const
type Step = (typeof STEPS)[number]

const PCT: Record<Step, number> = {
  lang: 8,
  bring: 18,
  agree1: 28,
  agree2: 36,
  hope: 47,
  part: 53,
  hours: 60,
  sleep: 67,
  wake: 73,
  fall: 78,
  medex: 83,
  need: 87,
  often: 90,
  risk: 91,
  analyze: 93,
  plan: 96,
  remind: 98,
  trial: 100,
}

const BRING: { id: BringId; label: StringKey; icon: string }[] = [
  { id: 'wave', label: 'ob_bring_wave', icon: 'M3 15c4-7 14-7 18 0' },
  { id: 'worry', label: 'ob_bring_worry', icon: 'M12 7v5l3.2 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z' },
  { id: 'sleep', label: 'ob_bring_sleep', icon: 'M18 13a7 7 0 0 1-8.2 6.9A7 7 0 1 1 18 13Z' },
  { id: 'world', label: 'ob_bring_world', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3.2 3 14.8 0 18M12 3C9 6.2 9 17.8 12 21' },
  { id: 'self', label: 'ob_bring_self', icon: 'M12 12a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 12 12ZM5.2 20c1.5-3.2 4.2-4.8 6.8-4.8s5.3 1.6 6.8 4.8' },
]

const NEED: { id: NeedId; label: StringKey; icon: string }[] = [
  { id: 'stop', label: 'ob_need_stop', icon: 'M8 8h8v8H8Z' },
  { id: 'sleep', label: 'ob_need_sleep', icon: 'M18 13a7 7 0 0 1-8.2 6.9A7 7 0 1 1 18 13Z' },
  { id: 'sentence', label: 'ob_need_sentence', icon: 'M5 8h14M5 12h10M5 16h12' },
  { id: 'breath', label: 'ob_need_breath', icon: 'M3 15c4-8 14-8 18 0' },
]

const OFTEN: { id: FreqId; label: StringKey }[] = [
  { id: 'rarely', label: 'ob_often_rare' },
  { id: 'sometimes', label: 'ob_often_some' },
  { id: 'often', label: 'ob_often_most' },
  { id: 'always', label: 'ob_often_always' },
]

const SLEEP: { id: FreqId; label: StringKey }[] = [
  { id: 'rarely', label: 'ob_freq_never' },
  { id: 'sometimes', label: 'ob_freq_some' },
  { id: 'often', label: 'ob_freq_often' },
  { id: 'always', label: 'ob_freq_always' },
]

const HOURS: { id: HoursId; label: StringKey }[] = [
  { id: 'lt6', label: 'ob_h_lt6' },
  { id: 'h67', label: 'ob_h_67' },
  { id: 'h78', label: 'ob_h_78' },
  { id: 'h89', label: 'ob_h_89' },
  { id: 'h9', label: 'ob_h_9' },
]

const WAKE: { id: WakeId; label: StringKey }[] = [
  { id: 'every', label: 'ob_wake_every' },
  { id: 'most', label: 'ob_wake_most' },
  { id: 'sometimes', label: 'ob_wake_some' },
  { id: 'rarely', label: 'ob_wake_rare' },
]

const FALL: { id: FallId; label: StringKey; icon: string }[] = [
  { id: 'meditate', label: 'ob_fall_med', icon: 'M12 4v4M8 20c1.2-4 2.8-6 4-6s2.8 2 4 6M9 11h6' },
  { id: 'story', label: 'ob_fall_story', icon: 'M5 5h10a4 4 0 0 1 4 4v11H9a4 4 0 0 0-4 4V5Z' },
  { id: 'nature', label: 'ob_fall_nature', icon: 'M4 16c2-6 6-9 8-9s6 3 8 9M8 20h8' },
]

const MEDEX: { id: MedexId; label: StringKey }[] = [
  { id: 'none', label: 'ob_medex_none' },
  { id: 'some', label: 'ob_medex_some' },
  { id: 'skip', label: 'ob_medex_skip' },
]

const PLAN: StringKey[] = ['ob_p1', 'ob_p2', 'ob_p3', 'ob_p4', 'ob_p5']

const FOOTLESS: Step[] = ['part', 'agree1', 'agree2']

export function Onboard({ onDone }: { onDone: () => void }) {
  const { t, locale } = useI18n()
  const { startTrial } = useEntitlement()
  const emergency = useEmergencyLine()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('lang')
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<OnboardAnswers>({
    fall: [],
    remindQuote: false,
    remindSleep: false,
    remindTrial: true,
  })
  const [planN, setPlanN] = useState(0)
  const [picked, setPicked] = useState<PlanId>('month')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => audio.stop(0.8), [])

  // The shell div isn't recreated between steps, only its child, so it keeps
  // whatever scrollTop the previous step was left at unless reset here. Layout
  // effect, not a regular one: it must land before paint or the old scroll
  // position flashes for a frame and then snaps to 0, reading as a jump.
  useLayoutEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
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
    }, 580)
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

  function next() {
    const i = STEPS.indexOf(step)
    let n = STEPS[i + 1]
    if (n === 'risk' && !onboardHighLoad(answers)) n = STEPS[i + 2]
    if (n) go(n, 1)
  }

  function finish(withTrial: boolean, toPaywall = false) {
    if (withTrial) startTrial()
    writeRemindTrial(answers.remindTrial)
    void requestNotify()
    completeOnboard(answers)
    audio.stop(0.8)
    onDone()
    navigate(toPaywall ? '/paywall' : '/', { replace: true })
  }

  const pct = PCT[step]
  const canGo =
    step === 'lang' ||
    step === 'hope' ||
    step === 'analyze' ||
    (step === 'plan' && planN >= PLAN.length) ||
    step === 'remind' ||
    step === 'trial' ||
    step === 'risk' ||
    (step === 'bring' && Boolean(answers.bring)) ||
    (step === 'need' && Boolean(answers.need)) ||
    (step === 'often' && Boolean(answers.often)) ||
    (step === 'sleep' && Boolean(answers.sleepHard)) ||
    (step === 'hours' && Boolean(answers.hours)) ||
    (step === 'wake' && Boolean(answers.wake)) ||
    (step === 'fall' && answers.fall.length > 0) ||
    (step === 'medex' && Boolean(answers.medex))

  function pickAgree(key: 'agree1' | 'agree2', value: AgreeId) {
    warm()
    setAnswers((a) => ({ ...a, [key]: value }))
    window.setTimeout(() => next(), 220)
  }

  return (
    <div
      ref={scrollRef}
      className="app-scroll ob-shell relative z-10 mx-auto flex h-full max-w-lg flex-col overflow-y-auto overscroll-none px-5 pb-[max(1.35rem,env(safe-area-inset-bottom))] pt-[max(0.7rem,env(safe-area-inset-top))]"
      onPointerDown={warm}
    >
      <div className="ob-glow" aria-hidden />
      <header className="relative z-10 pt-8">
        <div className="flex items-end justify-between gap-3 pr-14">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/12">
            <div className="h-full rounded-full bg-white transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[11px] tabular-nums text-mute">{pct}%</span>
        </div>
      </header>

      <div key={`${step}-${locale}`} className={`relative z-10 flex min-h-0 flex-1 flex-col ${dir < 0 ? 'ob-in-back' : 'ob-in'}`}>
        {step === 'lang' ? (
          <Screen title={t('ob_welcome')} sub={t('ob_welcome_sub')} kicker={t('ob_welcome_k')}>
            <div className="mt-8">
              <LangPicker onPick={warm} />
            </div>
          </Screen>
        ) : null}

        {step === 'bring' ? (
          <Screen title={t('ob_bring')} sub={t('ob_bring_sub')}>
            <Choices>
              {BRING.map((o) => (
                <Choice
                  key={o.id}
                  icon={o.icon}
                  label={t(o.label)}
                  on={answers.bring === o.id}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({ ...a, bring: o.id }))
                  }}
                />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'agree1' ? (
          <Agree
            quote={t('ob_ag1')}
            storm
            title={t('ob_agree')}
            sub={t('ob_agree_sub')}
            yes={t('ob_yes')}
            no={t('ob_no')}
            onYes={() => pickAgree('agree1', 'yes')}
            onNo={() => pickAgree('agree1', 'no')}
          />
        ) : null}

        {step === 'agree2' ? (
          <Agree
            quote={t('ob_ag2')}
            title={t('ob_agree')}
            sub={t('ob_agree_sub')}
            yes={t('ob_yes')}
            no={t('ob_no')}
            onYes={() => pickAgree('agree2', 'yes')}
            onNo={() => pickAgree('agree2', 'no')}
          />
        ) : null}

        {step === 'hope' ? (
          <Screen title={t('ob_hope')}>
            <div className="mt-7 space-y-3">
              <HopeCard tone="before" title={t('ob_before')} lines={[t('ob_b1'), t('ob_b2'), t('ob_b3'), t('ob_b4'), t('ob_b5')]} />
              <div className="flex justify-center text-[#9B87FF]">↓</div>
              <HopeCard tone="after" title={t('ob_after')} lines={[t('ob_a1'), t('ob_a2'), t('ob_a3'), t('ob_a4'), t('ob_a5')]} />
            </div>
          </Screen>
        ) : null}

        {step === 'part' ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="rounded-full bg-[#7B61FF]/18 px-3.5 py-1 text-xs tracking-[0.16em] text-[#C4B5FD]">{t('ob_part')}</p>
            <h1 className="mt-5 font-display text-5xl">{t('ob_part_title')}</h1>
          </div>
        ) : null}

        {step === 'hours' ? (
          <Screen title={t('ob_hours')} sub={t('ob_hours_sub')}>
            <Choices>
              {HOURS.map((o) => (
                <Choice
                  key={o.id}
                  label={t(o.label)}
                  on={answers.hours === o.id}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({ ...a, hours: o.id }))
                  }}
                />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'sleep' ? (
          <Screen title={t('ob_sleep_q')} sub={t('ob_sleep_sub')}>
            <Choices>
              {SLEEP.map((o) => (
                <Choice
                  key={o.id}
                  label={t(o.label)}
                  on={answers.sleepHard === o.id}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({ ...a, sleepHard: o.id }))
                  }}
                />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'wake' ? (
          <Screen title={t('ob_wake')}>
            <Choices>
              {WAKE.map((o) => (
                <Choice
                  key={o.id}
                  label={t(o.label)}
                  on={answers.wake === o.id}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({ ...a, wake: o.id }))
                  }}
                />
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
                  icon={o.icon}
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
                <Choice
                  key={o.id}
                  label={t(o.label)}
                  on={answers.medex === o.id}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({ ...a, medex: o.id }))
                  }}
                />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'need' ? (
          <Screen title={t('ob_need')} sub={t('ob_need_sub')}>
            <Choices>
              {NEED.map((o) => (
                <Choice
                  key={o.id}
                  icon={o.icon}
                  label={t(o.label)}
                  on={answers.need === o.id}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({ ...a, need: o.id }))
                  }}
                />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'often' ? (
          <Screen title={t('ob_often')} sub={t('ob_often_sub')}>
            <Choices>
              {OFTEN.map((o) => (
                <Choice
                  key={o.id}
                  label={t(o.label)}
                  on={answers.often === o.id}
                  onPick={() => {
                    warm()
                    setAnswers((a) => ({ ...a, often: o.id }))
                  }}
                />
              ))}
            </Choices>
          </Screen>
        ) : null}

        {step === 'risk' ? (
          <Screen title={t('ob_risk')} sub={t('ob_risk_sub')}>
            <div className="mt-8 space-y-3">
              <a
                href={`tel:${emergency.tel}`}
                className="flex w-full items-center justify-between rounded-[1.15rem] bg-[#1C1C1E] px-4 py-[1.05rem] text-left"
              >
                <span className="text-[15px] text-cream">{t('ob_risk_tel', { n: emergency.tel })}</span>
                <span className="text-sm tabular-nums text-[#C4B5FD]">{emergency.tel}</span>
              </a>
              <p className="px-1 text-sm leading-6 text-mute">{t('ob_risk_sos')}</p>
              {emergency.source === 'default' ? (
                <p className="px-1 text-xs leading-5 text-mute">{t('crisis_alts')}</p>
              ) : (
                <p className="px-1 text-xs leading-5 text-mute">{t('crisis_guess')}</p>
              )}
            </div>
          </Screen>
        ) : null}

        {step === 'analyze' ? (
          <Screen title={t('ob_analyze')} sub={t('ob_analyze_sub')}>
            <div className="mt-8 space-y-3">
              <Metric
                color="sky"
                title={t('ob_an_rest')}
                to={t('ob_an_rest_to')}
                widths={['28%', '46%', '70%']}
              />
              <Metric
                color="violet"
                title={t('ob_an_land')}
                from="∞"
                to={t('ob_an_land_to')}
                widths={['36%', '58%', '78%']}
              />
            </div>
          </Screen>
        ) : null}

        {step === 'plan' ? (
          <Screen title={t('ob_plan')} sub={t('ob_plan_sub')}>
            <ul className="mt-10 space-y-4">
              {PLAN.map((key, i) => (
                <li key={key} className={`flex items-start gap-3 text-sm leading-6 ${i < planN ? 'text-cream' : 'text-mute/45'}`}>
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      i < planN ? 'bg-[#7B61FF]/30 text-[#E9D5FF]' : 'border border-white/15'
                    }`}
                  >
                    {i < planN ? '✓' : ''}
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

        {step === 'trial' ? (
          <Screen title={t('pay_more')} sub={t('pay_direct')}>
            {/* The plans are the point of this screen, same as the paywall itself:
                large, compact rows. The free trial is a small link below, not a button. */}
            <div className="mt-7 space-y-2.5">
              {PLANS.map((p) => {
                const on = picked === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPicked(p.id)}
                    className={`flex w-full items-center gap-3 rounded-[1.2rem] px-4 py-3.5 text-left transition ${
                      on ? 'bg-white/[0.10] ring-2 ring-[#7B61FF]' : 'surface'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        on ? 'border-[#7B61FF] bg-[#7B61FF]' : 'border-white/25'
                      }`}
                    >
                      {on ? (
                        <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12.5 10 17l9-9" />
                        </svg>
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-lg leading-none">{t(p.id === 'week' ? 'pay_week' : p.id === 'month' ? 'pay_month' : 'pay_year')}</span>
                        {p.featured ? (
                          <span className="rounded-full bg-[#7B61FF]/25 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[#C4B5FD]">
                            {t('pay_featured')}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-mute">{t(p.id === 'year' ? 'pay_year_note' : 'pay_note')}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block font-display text-xl leading-none tabular-nums text-white">{displayPlanPrice(p.id)}</span>
                      <span className="mt-1 block text-[11px] text-mute">{t(PERIOD[p.id])}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Screen>
        ) : null}
      </div>

      {FOOTLESS.includes(step) ? null : (
        <div className="relative z-10 pt-5">
          {step === 'trial' ? (
            <>
              <PrimaryButton
                onClick={() => {
                  warm()
                  finish(false, true)
                }}
              >
                {t('ob_continue')}
              </PrimaryButton>
              {/* Secondary, on purpose: the trial is an alternative, not the offer. */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-xs text-mute underline underline-offset-4"
                  onClick={() => {
                    warm()
                    finish(true)
                  }}
                >
                  {t('ob_cta')}
                </button>
                <p className="mt-2 text-[11px] leading-5 text-mute">{t('ob_price')}</p>
              </div>
              <button type="button" className="mt-4 w-full text-center text-sm text-mute" onClick={() => finish(false)}>
                {t('ob_skip')}
              </button>
            </>
          ) : (
            <PrimaryButton
              disabled={!canGo}
              onClick={() => {
                warm()
                next()
              }}
            >
              {t('ob_continue')}
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  )
}

function Screen({
  title,
  sub,
  kicker,
  children,
}: {
  title: string
  sub?: string
  kicker?: string
  children: ReactNode
}) {
  return (
    <div className="flex-1 overflow-y-auto pt-7">
      {kicker ? <p className="text-[11px] tracking-[0.16em] text-[#C4B5FD]/70">{kicker}</p> : null}
      <h1 className={`${kicker ? 'mt-3' : ''} text-center font-display text-[1.75rem] leading-tight`}>{title}</h1>
      {sub ? <p className="mt-3 text-center text-sm leading-7 text-mute">{sub}</p> : null}
      {children}
    </div>
  )
}

function Choices({ children }: { children: ReactNode }) {
  return <div className="mt-7 space-y-2.5">{children}</div>
}

function Choice({
  label,
  on,
  onPick,
  icon,
}: {
  label: string
  on: boolean
  onPick: () => void
  icon?: string
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`flex w-full items-center gap-3 rounded-[1.15rem] px-4 py-[1.05rem] text-left transition-colors ${
        on ? 'bg-[#2A2438] ring-1 ring-[#7B61FF]/55' : 'bg-[#1C1C1E]'
      }`}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#B8A4FF]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      ) : null}
      <span className="min-w-0 flex-1 text-[15px] text-cream">{label}</span>
      <span className={`h-[18px] w-[18px] shrink-0 rounded-[4px] border ${on ? 'border-[#7B61FF] bg-[#7B61FF]' : 'border-white/22'}`} />
    </button>
  )
}

function HopeCard({ tone, title, lines }: { tone: 'before' | 'after'; title: string; lines: string[] }) {
  const mark = tone === 'after'
  return (
    <div className="rounded-[1.35rem] bg-[#1C1C1E] p-4">
      <p className={`text-xs ${mark ? 'text-[#C4B5FD]' : 'text-mute'}`}>{title}</p>
      <ul className="mt-3 space-y-2">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm leading-6 text-cream/90">
            <span className={mark ? 'text-[#9B87FF]' : 'text-mute/70'}>{mark ? '✓' : '×'}</span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Metric({
  color,
  title,
  from = '0',
  to,
  widths,
}: {
  color: 'sky' | 'violet'
  title: string
  from?: string
  to: string
  widths: [string, string, string]
}) {
  const bar = color === 'sky' ? 'bg-sky-400' : 'bg-[#9B87FF]'
  const label = color === 'sky' ? 'text-sky-300' : 'text-[#C4B5FD]'
  return (
    <div className="rounded-[1.35rem] bg-[#1C1C1E] p-4">
      <p className={`text-sm font-medium ${label}`}>{title}</p>
      <div className="mt-4 h-px bg-white/8" />
      <div className="mt-4 flex items-end gap-1.5">
        {widths.map((w, i) => (
          <span
            key={w}
            className={`h-2.5 rounded-full ${bar} ${i === 2 ? 'opacity-100' : i === 1 ? 'opacity-70' : 'opacity-40'}`}
            style={{ width: w }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-mute">
        <span>{from}</span>
        <span className={label}>→ {to}</span>
      </div>
    </div>
  )
}

function Agree({
  title,
  sub,
  quote,
  yes,
  no,
  storm,
  onYes,
  onNo,
}: {
  title: string
  sub: string
  quote: string
  yes: string
  no: string
  storm?: boolean
  onYes: () => void
  onNo: () => void
}) {
  return (
    <div className="flex flex-1 flex-col pt-6">
      <h1 className="text-center font-display text-[1.65rem] leading-tight">{title}</h1>
      <p className="mt-3 text-center text-sm text-mute">{sub}</p>
      <div className="mt-7 flex-1 rounded-[1.6rem] bg-[#1C1C1E] px-5 py-6">
        <p className="text-center font-display text-xl leading-snug text-cream/95">“{quote}”</p>
        <div className={`ob-illus mx-auto mt-8 ${storm ? 'ob-illus-storm' : 'ob-illus-soft'}`} aria-hidden />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button type="button" onClick={onYes} className="rounded-[1.15rem] bg-[#1C1C1E] py-4 text-sm font-medium tracking-wide">
          {yes}
        </button>
        <button type="button" onClick={onNo} className="rounded-[1.15rem] bg-[#1C1C1E] py-4 text-sm font-medium tracking-wide">
          {no}
        </button>
      </div>
    </div>
  )
}

