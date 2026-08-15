import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, FoldList, GhostButton, PrimaryButton, ProChip } from '../components/ui'
import { audio } from '../lib/audio'
import { isPro, quoteFree } from '../lib/entitlement'
import { useI18n } from '../lib/i18n'
import { quotes, type Quote } from '../lib/quotes'
import { isLoading, isSpeaking, speak, stopSpeak, subscribeSpeak } from '../lib/speech'

export function Quotes() {
  const { t, locale, meta } = useI18n()
  const navigate = useNavigate()
  const [open, setOpen] = useState<Quote | null>(null)
  const [reading, setReading] = useState(() => isSpeaking() || isLoading())
  const pro = isPro()
  useEffect(() => subscribeSpeak(() => setReading(isSpeaking() || isLoading())), [])

  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('quotes_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>

      <div className="mt-10">
        <FoldList
          items={quotes}
          preview={3}
          getKey={(q) => q.id}
          className="space-y-3"
          render={(q) => {
            const allowed = pro || quoteFree(q.id)
            return (
              <button
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
                  <p className="font-display text-xl leading-snug">
                    {allowed ? q.text[locale] : '········'}
                  </p>
                  <p className="mt-3 text-xs text-mute">{q.author}</p>
                  {!allowed ? (
                    <span className="absolute right-4 top-4">
                      <ProChip />
                    </span>
                  ) : null}
                </Card>
              </button>
            )
          }}
        />
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(2.5rem+env(safe-area-inset-top))]">
          <p className="mt-10 font-display text-3xl leading-snug">{open.text[locale]}</p>
          <p className="mt-6 text-sm text-mute">{open.author}</p>
          <div className="mt-auto space-y-3">
            <PrimaryButton
              onClick={() => {
                if (reading) {
                  stopSpeak()
                  return
                }
                speak(open.text[locale], { lang: meta.bcp47 })
              }}
            >
              {reading ? (isLoading() ? t('voice_loading') : t('speak_stop')) : t('quotes_listen')}
            </PrimaryButton>
            <GhostButton
              className="w-full"
              onClick={() => {
                stopSpeak()
                audio.stop(0.4)
                setOpen(null)
              }}
            >
              {t('quotes_close')}
            </GhostButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}
