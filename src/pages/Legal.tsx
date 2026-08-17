import { useNavigate, useParams } from 'react-router-dom'
import type { MouseEvent } from 'react'
import { openExternalUrl } from '../lib/device'
import { useI18n } from '../lib/i18n'
import type { LocaleId } from '../lib/locales'
import {
  LEGAL_PRIVACY,
  LEGAL_PRIVACY_META,
  LEGAL_PRIVACY_TITLE,
  LEGAL_TERMS,
  LEGAL_TERMS_META,
  LEGAL_TERMS_TITLE,
} from '../lib/legal-html'
import { legalPath } from '../lib/purchases'

function isLegalPage(value: string | undefined): value is 'privacy' | 'terms' {
  return value === 'privacy' || value === 'terms'
}

export function Legal() {
  const { page } = useParams()
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const kind = isLegalPage(page) ? page : 'privacy'
  const title = pick(kind === 'terms' ? LEGAL_TERMS_TITLE : LEGAL_PRIVACY_TITLE, locale)
  const meta = pick(kind === 'terms' ? LEGAL_TERMS_META : LEGAL_PRIVACY_META, locale)
  const body = pick(kind === 'terms' ? LEGAL_TERMS : LEGAL_PRIVACY, locale)

  function onClick(e: MouseEvent<HTMLElement>) {
    const a = (e.target as HTMLElement).closest('a')
    if (!a) return
    const href = a.getAttribute('href') || ''
    if (href.includes('privacy.html') || href.endsWith('/privacy') || href.includes('/legal/privacy')) {
      e.preventDefault()
      navigate(legalPath('privacy'))
      return
    }
    if (href.includes('terms.html') || href.endsWith('/terms') || href.includes('/legal/terms')) {
      e.preventDefault()
      navigate(legalPath('terms'))
      return
    }
    if (/^https?:\/\//i.test(href)) {
      e.preventDefault()
      void openExternalUrl(href)
    }
  }

  return (
    <div className="pb-10">
      <header className="relative flex items-center justify-center pt-2">
        <button
          type="button"
          aria-label={t('back')}
          onClick={() => navigate(-1)}
          className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <h1 className="max-w-[70%] text-center text-lg font-semibold tracking-tight">{title}</h1>
      </header>
      <p className="mt-5 text-xs leading-5 text-mute">{meta}</p>
      <article className="legal-doc mt-4" onClick={onClick} dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

function pick(map: Record<LocaleId, string>, locale: LocaleId): string {
  return map[locale] || map.en || map.tr
}
