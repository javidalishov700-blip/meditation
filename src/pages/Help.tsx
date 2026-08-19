import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Card } from '../components/ui'
import { useI18n } from '../lib/i18n'
import { legalPath } from '../lib/purchases'
import { supportId } from '../lib/pin'

const TOPICS = [
  { id: 'about', title: 'help_about', body: 'help_about_b' },
  { id: 'membership', title: 'help_member', body: 'help_member_b' },
  { id: 'cancel', title: 'help_cancel', body: 'help_cancel_b' },
  { id: 'refund', title: 'help_refund', body: 'help_refund_b' },
  { id: 'tech', title: 'help_tech', body: 'help_tech_b' },
  { id: 'guide', title: 'help_guide', body: 'help_guide_b' },
  { id: 'contact', title: 'help_contact', body: 'help_contact_b' },
] as const

type TopicId = (typeof TOPICS)[number]['id']

function isTopic(value: string | undefined): value is TopicId {
  return Boolean(value && TOPICS.some((x) => x.id === value))
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function Header({ title, backTo }: { title: string; backTo: string }) {
  const { t } = useI18n()
  return (
    <header className="relative flex items-center justify-center pt-2">
      <Link
        to={backTo}
        aria-label={t('back')}
        className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/80"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 5 8 12l7 7" />
        </svg>
      </Link>
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
    </header>
  )
}

export function Help() {
  const { t } = useI18n()
  const { topic } = useParams()
  const helpId = supportId()
  const [q, setQ] = useState('')
  const [copied, setCopied] = useState(false)
  const invalid = Boolean(topic && !isTopic(topic))
  const current = isTopic(topic) ? TOPICS.find((x) => x.id === topic) : undefined
  const needle = q.trim().toLocaleLowerCase()
  const rows = useMemo(() => {
    if (!needle) return [...TOPICS]
    return TOPICS.filter((row) => {
      const blob = `${t(row.title)} ${t(row.body)}`.toLocaleLowerCase()
      return blob.includes(needle)
    })
  }, [needle, t])

  async function copyId() {
    try {
      await navigator.clipboard.writeText(`#${helpId}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      /* ignore */
    }
  }

  if (invalid) return <Navigate to="/me/settings/help" replace />

  if (current) {
    return (
      <div className="pb-8">
        <Header title={t(current.title)} backTo="/me/settings/help" />
        <Card className="mt-6">
          <p className="text-sm leading-6 text-mute">{t(current.body)}</p>
          {current.id === 'contact' ? (
            <a
              href="mailto:javidalishov700@gmail.com"
              className="mt-4 inline-flex items-center rounded-full bg-white/8 px-3 py-1.5 text-sm text-white/85"
            >
              javidalishov700@gmail.com
            </a>
          ) : null}
          {current.id === 'tech' || current.id === 'contact' ? (
            <>
              <button
                type="button"
                onClick={() => void copyId()}
                className="mt-4 inline-flex items-center rounded-full bg-white/8 px-3 py-1.5 font-mono text-sm text-white/85"
              >
                #{helpId}
              </button>
              {copied ? <p className="mt-2 text-xs text-mute">{t('me_copied')}</p> : null}
            </>
          ) : null}
        </Card>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <Header title={t('me_help')} backTo="/me/settings" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('help_search')}
        className="mt-6 h-12 w-full rounded-full bg-white/8 px-5 text-sm text-white outline-none placeholder:text-white/35"
      />
      <div className="mt-3 overflow-hidden rounded-[1.35rem] surface">
        {rows.map((row, i) => (
          <div key={row.id}>
            {i ? <div className="mx-4 h-px bg-white/[0.07]" /> : null}
            <Link to={`/me/settings/help/${row.id}`} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
              <span className="min-w-0 flex-1 text-sm text-cream">{t(row.title)}</span>
              <Chevron />
            </Link>
          </div>
        ))}
        {!rows.length ? <p className="px-4 py-4 text-sm text-mute">{t('no_results')}</p> : null}
      </div>
      <div className="mt-3 overflow-hidden rounded-[1.35rem] surface">
        <Link to={legalPath('terms')} className="flex w-full items-center gap-3 px-4 py-3.5">
          <span className="min-w-0 flex-1 text-sm text-cream">{t('pay_terms')}</span>
          <Chevron />
        </Link>
        <div className="mx-4 h-px bg-white/[0.07]" />
        <Link to={legalPath('privacy')} className="flex w-full items-center gap-3 px-4 py-3.5">
          <span className="min-w-0 flex-1 text-sm text-cream">{t('pay_privacy')}</span>
          <Chevron />
        </Link>
      </div>
      <p className="mt-4 text-xs leading-5 text-mute">{t('me_help_body')}</p>
    </div>
  )
}
