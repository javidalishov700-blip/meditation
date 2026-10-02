import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../lib/i18n'
import { legalPath } from '../lib/purchases'
import type { StringKey } from '../lib/strings'

const INC: { key: StringKey; tone: string; path: string }[] = [
  { key: 'pay_inc_sos', tone: 'from-[#8B5CF6] to-[#6D28D9]', path: 'M12 8v5M12 16h.01M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z' },
  { key: 'pay_inc_doors', tone: 'from-[#38BDF8] to-[#2563EB]', path: 'M6 4h9l3 3v13H6ZM14.5 12.5h.01' },
  { key: 'pay_inc_sleep', tone: 'from-[#FBBF24] to-[#F97316]', path: 'M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z' },
  { key: 'pay_inc_one', tone: 'from-[#34D399] to-[#059669]', path: 'M3 14c3-8 7-8 9-8s6 0 9 8' },
  { key: 'pay_inc_offline', tone: 'from-[#F472B6] to-[#DB2777]', path: 'M12 4v10m0 0-3.5-3.5M12 14l3.5-3.5M5 18h14' },
]

export function IncludedList() {
  const { t } = useI18n()
  return (
    <ul className="space-y-2.5">
      {INC.map((row) => (
        <li key={row.key} className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.8rem] bg-gradient-to-br ${row.tone} shadow-[0_6px_18px_rgba(0,0,0,0.35)]`}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d={row.path} />
            </svg>
          </span>
          <span className="min-w-0 flex-1 text-[14px] leading-5 text-white/90">{t(row.key)}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalRow({ onRestore }: { onRestore?: () => void }) {
  const { t } = useI18n()
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-white/50">
      <Link to={legalPath('privacy')} className="underline-offset-2 hover:underline">
        {t('pay_privacy')}
      </Link>
      <span aria-hidden>·</span>
      <Link to={legalPath('terms')} className="underline-offset-2 hover:underline">
        {t('pay_terms')}
      </Link>
      {onRestore ? (
        <>
          <span aria-hidden>·</span>
          <button type="button" onClick={onRestore}>
            {t('pay_restore')}
          </button>
        </>
      ) : null}
    </div>
  )
}

/**
 * A full-bleed night sky pinned to the screen, not to the content: it starts at
 * the very top edge, under the status bar, so there is no seam where the safe
 * area ends and the page begins.
 */
export function OfferWash({ children }: { children: ReactNode }) {
  return (
    <div className="keep-dark relative">
      <div className="pay-sky" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  )
}
