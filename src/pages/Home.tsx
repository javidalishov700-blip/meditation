import { Link } from 'react-router-dom'
import { Card, Kicker } from '../components/ui'
import { useEntitlement } from '../lib/entitlement-store'
import { greeting } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { readOnboard, suggestedPath } from '../lib/onboard'
import { todaysQuote } from '../lib/quotes'

export function Home() {
  const { t, locale } = useI18n()
  const { trial, trialEndsAt } = useEntitlement()
  const quote = todaysQuote()
  const path = suggestedPath(readOnboard())
  const ms = trialEndsAt - Date.now()
  const trialLine =
    trial && ms > 0
      ? ms < 86_400_000
        ? t('me_trial_today')
        : t('me_trial', { n: Math.ceil(ms / 86_400_000) })
      : null

  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col pb-4">
      <header className="pt-8">
        <Kicker>Steady</Kicker>
        <p className="mt-10 text-sm text-mute">{greeting(undefined, locale)}</p>
        <h1 className="mt-3 font-display text-[2.5rem] leading-[1.08] tracking-tight">{t('home_headline')}</h1>
        <p className="mt-5 max-w-[14rem] text-sm leading-7 text-mute">{t('home_calm')}</p>
        {trialLine ? <p className="mt-3 text-xs text-rose-200/60">{trialLine}</p> : null}
      </header>

      <div className="flex flex-1 items-center justify-center py-8">
        <Link to="/sos" className="halo-wrap h-40 w-40">
          <span className="halo halo-a" />
          <span className="halo halo-b" />
          <span className="orb-pulse relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/80 via-fuchsia-900/50 to-violet-950 shadow-[0_0_40px_rgba(244,114,182,0.14)]">
            <span className="font-display text-2xl text-cream">SOS</span>
          </span>
        </Link>
      </div>

      <Link to={path.to} className="mb-3 block">
        <Card>
          <p className="font-display text-xl">{t(path.title)}</p>
          <p className="mt-2 text-sm leading-6 text-mute">{t(path.sub)}</p>
        </Card>
      </Link>

      <Link to="/quotes" className="block">
        <Card>
          <Kicker>{t('home_quote')}</Kicker>
          <p className="mt-3 font-display text-xl italic leading-snug text-cream/90">{quote.text[locale]}</p>
          <p className="mt-4 text-xs text-mute">{quote.author}</p>
        </Card>
      </Link>
    </div>
  )
}
