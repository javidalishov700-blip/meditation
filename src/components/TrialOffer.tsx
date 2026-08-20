import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n'
import { legalPath } from '../lib/purchases'
import type { StringKey } from '../lib/strings'

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
  const { t } = useI18n()
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-mute">
      <Link to={legalPath('privacy')}>{t('pay_privacy')}</Link>
      <Link to={legalPath('terms')}>{t('pay_terms')}</Link>
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
