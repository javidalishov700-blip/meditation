import { Link } from 'react-router-dom'
import { Card, Kicker } from '../components/ui'
import { greeting } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { todaysQuote } from '../lib/quotes'

export function Home() {
  const { t, locale } = useI18n()
  const quote = todaysQuote()
  return (
    <div className="flex min-h-[calc(100dvh-7rem)] flex-col pb-4">
      <header className="pt-8">
        <Kicker>Steady</Kicker>
        <p className="mt-10 text-sm text-mute">{greeting(undefined, locale)}</p>
        <h1 className="mt-3 font-display text-[2.5rem] leading-[1.08] tracking-tight">{t('home_headline')}</h1>
        <p className="mt-5 max-w-[14rem] text-sm leading-7 text-mute">{t('home_calm')}</p>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
        <Link to="/sos" className="halo-wrap h-40 w-40">
          <span className="halo halo-a" />
          <span className="halo halo-b" />
          <span className="orb-pulse relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/80 via-fuchsia-900/50 to-violet-950 shadow-[0_0_40px_rgba(244,114,182,0.14)]">
            <span className="font-display text-2xl text-cream">SOS</span>
          </span>
        </Link>
      </div>

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
