import type { ReactNode } from 'react'
import { Switch } from './ui'
import { useI18n } from '../lib/i18n'
import { legalUrl } from '../lib/purchases'
import type { StringKey } from '../lib/strings'

const STEPS: { title: StringKey; sub?: StringKey; tone: 'done' | 'now' | 'soon' | 'end'; mark: string }[] = [
  { title: 'ob_tl1', tone: 'done', mark: '✓' },
  { title: 'ob_tl2', sub: 'ob_tl2s', tone: 'now', mark: '○' },
  { title: 'ob_tl3', sub: 'ob_tl3s', tone: 'soon', mark: '○' },
  { title: 'ob_tl4', sub: 'ob_tl4s', tone: 'end', mark: '★' },
]

const TONE: Record<(typeof STEPS)[number]['tone'], string> = {
  done: 'bg-emerald-400/20 text-emerald-200',
  now: 'bg-[#7B61FF]/30 text-[#E9D5FF]',
  soon: 'bg-sky-400/15 text-sky-200',
  end: 'bg-amber-400/15 text-amber-100',
}

export function TrialTimeline({
  remind,
  onRemind,
}: {
  remind: boolean
  onRemind: (value: boolean) => void
}) {
  const { t } = useI18n()
  return (
    <div>
      <ol className="mt-2">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative flex gap-3 pb-5 last:pb-0">
            {i < STEPS.length - 1 ? (
              <span className="absolute left-[15px] top-8 bottom-0 w-px bg-white/10" aria-hidden />
            ) : null}
            <span
              className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.7rem] text-sm ${TONE[step.tone]}`}
            >
              {step.mark}
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="block text-sm font-medium text-cream">{t(step.title)}</span>
              {step.sub ? <span className="mt-1 block text-xs leading-5 text-mute">{t(step.sub)}</span> : null}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-2">
        <Switch on={remind} label={t('ob_rem_trial')} hint={t('ob_rem_trial_h')} onChange={onRemind} />
      </div>
    </div>
  )
}

const INC: { key: StringKey; bg: string; path: string }[] = [
  { key: 'pay_inc_sos', bg: 'bg-[#7B61FF]/25', path: 'M12 8v5M12 16h.01M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z' },
  { key: 'pay_inc_one', bg: 'bg-emerald-500/20', path: 'M3 14c3-8 7-8 9-8s6 0 9 8' },
  { key: 'pay_inc_sleep', bg: 'bg-amber-400/20', path: 'M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z' },
  { key: 'pay_inc_offline', bg: 'bg-fuchsia-400/20', path: 'M12 4v10m0 0-3.5-3.5M12 14l3.5-3.5M5 18h14' },
  { key: 'pay_inc_doors', bg: 'bg-sky-400/20', path: 'M6 4h9l3 3v13H6Z' },
]

export function IncludedList() {
  const { t } = useI18n()
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('pay_included')}</p>
      <ul className="mt-4 space-y-3">
        {INC.map((row) => (
          <li key={row.key} className="flex items-center gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${row.bg}`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d={row.path} />
              </svg>
            </span>
            <span className="text-sm leading-6 text-cream/90">{t(row.key)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LegalRow({ onRestore }: { onRestore: () => void }) {
  const { t, locale } = useI18n()
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-mute">
      <a href={legalUrl('privacy', locale)} target="_blank" rel="noreferrer">
        {t('pay_privacy')}
      </a>
      <a href={legalUrl('terms', locale)} target="_blank" rel="noreferrer">
        {t('pay_terms')}
      </a>
      <button type="button" onClick={onRestore}>
        {t('pay_restore')}
      </button>
    </div>
  )
}

export function OfferWash({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-5 -top-6 h-52 bg-gradient-to-b from-[#3b1d6e]/45 to-transparent"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  )
}
