import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LangPicker } from '../components/LangPicker'
import { PrimaryButton, Switch } from '../components/ui'
import { audio } from '../lib/audio'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'
import {
  completeOnboard,
  requestNotify,
  type BringId,
  type FreqId,
  type NeedId,
  type OnboardAnswers,
} from '../lib/onboard'
import type { StringKey } from '../lib/strings'

const STEPS = ['lang', 'bring', 'need', 'often', 'part', 'sleep', 'hope', 'plan', 'remind', 'trial'] as const
type Step = (typeof STEPS)[number]

const PCT: Record<Step, number> = {
  lang: 8,
  bring: 28,
  need: 42,
  often: 53,
  part: 60,
  sleep: 70,
  hope: 80,
  plan: 90,
  remind: 97,
  trial: 100,
}

const BRING: { id: BringId; label: StringKey; icon: string }[] = [
  { id: 'wave', label: 'ob_bring_wave', icon: 'M4 14c4-6 8-6 12 0' },
  { id: 'worry', label: 'ob_bring_worry', icon: 'M12 7v5l3 2' },
  { id: 'sleep', label: 'ob_bring_sleep', icon: 'M18 13a7 7 0 0 1-8 7 7 7 0 1 1 8-7Z' },
  { id: 'world', label: 'ob_bring_world', icon: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-8 8h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4c-2.5 2.8-2.5 13.2 0 16' },
  { id: 'self', label: 'ob_bring_self', icon: 'M12 12a3 3 0 1 0-0.01-6A3 3 0 0 0 12 12Zm-7 8c1.4-3 4-4.5 7-4.5S17.6 17 19 20' },
]

const NEED: { id: NeedId; label: StringKey; icon: string }[] = [
  { id: 'stop', label: 'ob_need_stop', icon: 'M8 8h8v8H8Z' },
  { id: 'sleep', label: 'ob_need_sleep', icon: 'M18 13a7 7 0 0 1-8 7 7 7 0 1 1 8-7Z' },
  { id: 'sentence', label: 'ob_need_sentence', icon: 'M6 8h12M6 12h8M6 16h10' },
  { id: 'breath', label: 'ob_need_breath', icon: 'M4 14c3-8 13-8 16 0' },
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

const PLAN: StringKey[] = ['ob_p1', 'ob_p2', 'ob_p3', 'ob_p4', 'ob_p5']

export function Onboard({ onDone }: { onDone: () => void }) {
  const { t } = useI18n()
  const { startTrial } = useEntitlement()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('lang')
  const [answers, setAnswers] = useState<OnboardAnswers>({
    remindQuote: false,
    remindSleep: false,
    remindTrial: true,
  })
  const [planN, setPlanN] = useState(0)

  useEffect(() => () => audio.stop(0.8), [])

  useEffect(() => {
    if (step !== 'part') return
    const id = window.setTimeout(() => setStep('sleep'), 1700)
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
    }, 620)
    return () => window.clearInterval(id)
  }, [step])

  function warm() {
    if (!audio.playing) void audio.playPad()
  }

  function next() {
    const i = STEPS.indexOf(step)
    const n = STEPS[i + 1]
    if (n) setStep(n)
  }

  function finish(withTrial: boolean) {
    if (withTrial) startTrial()
    completeOnboard(answers)
    audio.stop(0.8)
    onDone()
    navigate('/', { replace: true })
  }

  const pct = PCT[step]
  const canGo =
    step === 'lang' ||
    step === 'part' ||
    step === 'hope' ||
    (step === 'plan' && planN >= PLAN.length) ||
    step === 'remind' ||
    step === 'trial' ||
    (step === 'bring' && answers.bring) ||
    (step === 'need' && answers.need) ||
    (step === 'often' && answers.often) ||
    (step === 'sleep' && answers.sleepHard)

  return (
    <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.9rem,env(safe-area-inset-top))]">
      <header className="pt-8">
        <div className="flex items-end justify-between gap-3 pr-14">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[11px] text-mute">{pct}%</span>
        </div>
      </header>

      <div key={step} className="page-enter flex min-h-0 flex-1 flex-col">
        {step === 'lang' ? (
          <Screen title={t('ob_welcome')} sub={t('ob_welcome_sub')} kicker={t('ob_welcome_k')}>
            <div className="mt-10">
              <LangPicker />
            </div>
          </Screen>
        ) : null}

        {step === 'bring' ? (
          <Screen title={t('ob_bring')} sub={t('ob_bring_sub')}>
            <div className="mt-8 space-y-2">
              {BRING.map((o) => (
                <Choice
                  key={o.id}
                  icon={o.icon}
                  label={t(o.label)}
                  on={answers.bring === o.id}
                  onPick={() => setAnswers((a) => ({ ...a, bring: o.id }))}
                />
              ))}
            </div>
          </Screen>
        ) : null}

        {step === 'need' ? (
          <Screen title={t('ob_need')} sub={t('ob_need_sub')}>
            <div className="mt-8 space-y-2">
              {NEED.map((o) => (
                <Choice
                  key={o.id}
                  icon={o.icon}
                  label={t(o.label)}
                  on={answers.need === o.id}
                  onPick={() => setAnswers((a) => ({ ...a, need: o.id }))}
                />
              ))}
            </div>
          </Screen>
        ) : null}

        {step === 'often' ? (
          <Screen title={t('ob_often')} sub={t('ob_often_sub')}>
            <div className="mt-8 space-y-2">
              {OFTEN.map((o) => (
                <Choice
                  key={o.id}
                  label={t(o.label)}
                  on={answers.often === o.id}
                  onPick={() => setAnswers((a) => ({ ...a, often: o.id }))}
                />
              ))}
            </div>
          </Screen>
        ) : null}

        {step === 'part' ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="rounded-full bg-violet-400/15 px-3 py-1 text-xs tracking-wide text-violet-200/80">{t('ob_part')}</p>
            <h1 className="mt-5 font-display text-5xl">{t('ob_part_title')}</h1>
          </div>
        ) : null}

        {step === 'sleep' ? (
          <Screen title={t('ob_sleep_q')} sub={t('ob_sleep_sub')}>
            <div className="mt-8 space-y-2">
              {SLEEP.map((o) => (
                <Choice
                  key={o.id}
                  label={t(o.label)}
                  on={answers.sleepHard === o.id}
                  onPick={() => setAnswers((a) => ({ ...a, sleepHard: o.id }))}
                />
              ))}
            </div>
          </Screen>
        ) : null}

        {step === 'hope' ? (
          <Screen title={t('ob_hope')}>
            <div className="mt-8 space-y-3">
              <HopeCard tone="before" title={t('ob_before')} lines={[t('ob_b1'), t('ob_b2'), t('ob_b3'), t('ob_b4'), t('ob_b5')]} />
              <div className="flex justify-center text-fuchsia-300/70">↓</div>
              <HopeCard tone="after" title={t('ob_after')} lines={[t('ob_a1'), t('ob_a2'), t('ob_a3'), t('ob_a4'), t('ob_a5')]} />
            </div>
          </Screen>
        ) : null}

        {step === 'plan' ? (
          <Screen title={t('ob_plan')} sub={t('ob_plan_sub')}>
            <ul className="mt-10 space-y-4">
              {PLAN.map((key, i) => (
                <li key={key} className={`flex items-start gap-3 text-sm leading-6 ${i < planN ? 'text-cream' : 'text-mute/50'}`}>
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      i < planN ? 'bg-fuchsia-400/25 text-fuchsia-100' : 'border border-white/15'
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
                  setAnswers((a) => ({ ...a, remindQuote: v }))
                  if (v) void requestNotify()
                }}
              />
              <Switch
                on={answers.remindSleep}
                label={t('ob_rem_sleep')}
                hint={t('ob_rem_sleep_h')}
                onChange={(v) => {
                  setAnswers((a) => ({ ...a, remindSleep: v }))
                  if (v) void requestNotify()
                }}
              />
            </div>
          </Screen>
        ) : null}

        {step === 'trial' ? (
          <Screen title={t('ob_trial')} sub={t('ob_trial_sub')}>
            <ol className="mt-8 space-y-5">
              <TimeRow done icon="✓" title={t('ob_tl1')} />
              <TimeRow icon="○" title={t('ob_tl2')} sub={t('ob_tl2s')} />
              <TimeRow icon="◌" title={t('ob_tl3')} sub={t('ob_tl3s')} />
              <TimeRow icon="★" title={t('ob_tl4')} sub={t('ob_tl4s')} />
            </ol>
            <div className="mt-8">
              <Switch
                on={answers.remindTrial}
                label={t('ob_rem_trial')}
                onChange={(v) => {
                  setAnswers((a) => ({ ...a, remindTrial: v }))
                  if (v) void requestNotify()
                }}
              />
            </div>
          </Screen>
        ) : null}
      </div>

      {step === 'part' ? null : (
        <div className="pt-6">
          {step === 'trial' ? (
            <>
              <PrimaryButton
                disabled={!canGo}
                onClick={() => {
                  warm()
                  finish(true)
                }}
              >
                {t('ob_cta')}
              </PrimaryButton>
              <p className="mt-3 text-center text-[11px] leading-5 text-mute">{t('ob_price')}</p>
              <button type="button" className="mt-3 w-full text-center text-sm text-mute" onClick={() => finish(false)}>
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
    <div className="flex-1 overflow-y-auto pt-8">
      {kicker ? <p className="text-[11px] tracking-[0.14em] text-rose-200/45">{kicker}</p> : null}
      <h1 className={`${kicker ? 'mt-4' : ''} font-display text-[1.85rem] leading-tight`}>{title}</h1>
      {sub ? <p className="mt-3 text-sm leading-7 text-mute">{sub}</p> : null}
      {children}
    </div>
  )
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
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left ${
        on ? 'border-fuchsia-300/35 bg-white/[0.06]' : 'border-white/[0.07] bg-white/[0.03]'
      }`}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-violet-200/80" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d={icon} />
        </svg>
      ) : null}
      <span className="min-w-0 flex-1 text-sm text-cream">{label}</span>
      <span className={`h-4 w-4 shrink-0 rounded-[4px] border ${on ? 'border-fuchsia-300 bg-fuchsia-400/80' : 'border-white/25'}`} />
    </button>
  )
}

function HopeCard({ tone, title, lines }: { tone: 'before' | 'after'; title: string; lines: string[] }) {
  const mark = tone === 'after'
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-4">
      <p className={`text-xs ${mark ? 'text-fuchsia-200/70' : 'text-mute'}`}>{title}</p>
      <ul className="mt-3 space-y-2">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm leading-6 text-cream/90">
            <span className={mark ? 'text-fuchsia-300' : 'text-mute/70'}>{mark ? '✓' : '×'}</span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TimeRow({ icon, title, sub, done }: { icon: string; title: string; sub?: string; done?: boolean }) {
  return (
    <li className="flex gap-3">
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${
          done ? 'bg-emerald-400/20 text-emerald-200' : 'bg-white/[0.05] text-violet-100/80'
        }`}
      >
        {icon}
      </span>
      <span>
        <span className="block text-sm text-cream">{title}</span>
        {sub ? <span className="mt-1 block text-xs leading-5 text-mute">{sub}</span> : null}
      </span>
    </li>
  )
}
