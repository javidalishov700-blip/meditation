import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, GhostButton, Kicker, LegalNote, PrimaryButton, ProChip } from '../components/ui'
import { isPro, quoteFree } from '../lib/entitlement'
import { useI18n } from '../lib/i18n'
import { quotes, type Quote } from '../lib/quotes'
import { speak, stopSpeak } from '../lib/speech'

export function Quotes() {
  const { t, locale, meta } = useI18n()
  const navigate = useNavigate()
  const [open, setOpen] = useState<Quote | null>(null)
  const pro = isPro()

  return (
    <div className="pb-8">
      <Kicker>{t('cat_quotes')}</Kicker>
      <h1 className="mt-2 font-display text-3xl">{t('quotes_title')}</h1>
      <p className="mt-2 text-sm leading-6 text-mute">{t('quotes_sub')}</p>

      <div className="mt-6 space-y-3">
        {quotes.map((q) => {
          const allowed = pro || quoteFree(q.id)
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                if (!allowed) {
                  navigate('/paywall')
                  return
                }
                stopSpeak()
                setOpen(q)
              }}
              className="w-full text-start"
            >
              <Card className="relative">
                <p className="text-[10px] uppercase tracking-wider text-rose-200">
                  {q.kind === 'pd' ? t('quotes_pd') : t('quotes_essence')}
                </p>
                <p className="mt-2 font-display text-xl leading-snug">
                  {allowed ? q.text[locale] : '········'}
                </p>
                <p className="mt-3 text-xs text-mute">
                  {q.author}
                  {q.work ? ` · ${q.work}` : ''}
                </p>
                {!allowed ? (
                  <span className="absolute right-4 top-4">
                    <ProChip />
                  </span>
                ) : (
                  <p className="mt-2 text-xs text-rose-200">{t('quotes_tap')}</p>
                )}
              </Card>
            </button>
          )
        })}
      </div>
      {!pro ? (
        <Link to="/paywall" className="mt-4 block text-sm text-rose-200">
          {t('me_vitrine')}
        </Link>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink/95 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(2.5rem+env(safe-area-inset-top))]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-rose-200">
            {open.kind === 'pd' ? t('quotes_pd') : t('quotes_essence')}
          </p>
          <p className="mt-6 font-display text-3xl leading-snug">{open.text[locale]}</p>
          <p className="mt-6 text-sm text-mute">
            {open.author}
            {open.work ? ` · ${open.work}` : ''}
          </p>
          <div className="mt-auto space-y-3">
            <PrimaryButton
              onClick={() => speak(open.text[locale], { lang: meta.bcp47 })}
            >
              {t('quotes_listen')}
            </PrimaryButton>
            <GhostButton
              className="w-full"
              onClick={() => {
                stopSpeak()
                setOpen(null)
              }}
            >
              {t('quotes_close')}
            </GhostButton>
          </div>
        </div>
      ) : null}

      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
