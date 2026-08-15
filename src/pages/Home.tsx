import { Link } from 'react-router-dom'
import { Card, Kicker, LegalNote } from '../components/ui'
import { greeting } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { todaysQuote } from '../lib/quotes'

export function Home() {
  const { t, locale } = useI18n()
  const quote = todaysQuote()
  return (
    <div className="pb-4">
      <header className="pt-6">
        <Kicker>Steady</Kicker>
        <p className="mt-8 text-sm text-mute">{greeting(undefined, locale)}</p>
        <h1 className="mt-3 font-display text-[2.4rem] leading-[1.1] tracking-tight">{t('home_headline')}</h1>
        <p className="mt-4 max-w-[15rem] text-sm leading-7 text-mute">{t('home_calm')}</p>
      </header>

      <Link to="/sos" className="mt-16 flex flex-col items-center text-center">
        <div className="orb-pulse flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose-200/85 via-fuchsia-800/55 to-violet-950 shadow-[0_0_36px_rgba(244,114,182,0.16)]">
          <span className="font-display text-2xl text-cream">SOS</span>
        </div>
      </Link>

      <Link to="/quotes" className="mt-16 block">
        <Card>
          <Kicker>{t('home_quote')}</Kicker>
          <p className="mt-3 font-display text-xl leading-snug text-cream/90">{quote.text[locale]}</p>
          <p className="mt-4 text-xs text-mute">{quote.author}</p>
        </Card>
      </Link>

      <div className="mt-20">
        <LegalNote compact />
      </div>
    </div>
  )
}
