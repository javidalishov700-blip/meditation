import { Link } from 'react-router-dom'
import { CategoryTile, TileIcon } from '../components/CategoryTile'
import { LangPicker } from '../components/LangPicker'
import { Card, CrisisLink, Kicker, LegalNote } from '../components/ui'
import { useEntitlement } from '../lib/entitlement-store'
import { greeting } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { todaysClarity } from '../lib/library'
import { todaysQuote } from '../lib/quotes'

export function Home() {
  const { pro } = useEntitlement()
  const { t, locale } = useI18n()
  const clarity = todaysClarity()
  const quote = todaysQuote()
  return (
    <div className="pb-6">
      <header className="flex items-start justify-between gap-3 pt-2">
        <div className="min-w-0">
          <Kicker>{t('home_kicker')}</Kicker>
          <p className="mt-3 text-sm text-mute">{greeting(undefined, locale)}</p>
          <h1 className="mt-1 font-display text-[2.05rem] leading-[1.08] tracking-tight">{t('home_headline')}</h1>
          <p className="mt-3 text-sm leading-6 text-mute">{t('home_sub')}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <LangPicker compact />
          <CrisisLink />
          {pro ? (
            <span className="text-[10px] uppercase tracking-widest text-orchid">Pro</span>
          ) : (
            <Link to="/paywall" className="text-[10px] uppercase tracking-widest text-rose-200">
              Pro
            </Link>
          )}
        </div>
      </header>

      <Link
        to="/sos"
        className="relative mt-8 block overflow-hidden rounded-[2.2rem] border border-rose-300/25 bg-gradient-to-b from-rose-500/25 via-fuchsia-700/10 to-transparent px-6 py-9 text-center"
      >
        <div className="orb-pulse mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 via-fuchsia-500 to-violet-900 shadow-[0_0_80px_rgba(244,114,182,0.55)]">
          <span className="font-display text-3xl text-cream">SOS</span>
        </div>
        <p className="mt-5 font-display text-xl">{t('home_sos')}</p>
        <p className="mt-1 text-sm text-mute">{t('home_sos_sub')}</p>
      </Link>

      <section className="mt-9">
        <Kicker>{t('home_now')}</Kicker>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Link to="/session/tone/174" className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-wider text-rose-200">{t('home_trial')}</p>
            <p className="mt-1 text-sm font-medium">174 Hz</p>
            <p className="text-[11px] text-mute">{t('min_n', { n: 3 })}</p>
          </Link>
          <Link to={`/session/clarity/${clarity.id}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-wider text-rose-200">{t('home_clarity')}</p>
            <p className="mt-1 text-sm font-medium">{clarity.title}</p>
            <p className="text-[11px] text-mute">{t('min_n', { n: 3 })}</p>
          </Link>
          <Link to="/quotes" className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-wider text-rose-200">{t('home_quote')}</p>
            <p className="mt-1 line-clamp-2 text-sm font-medium">{quote.author}</p>
            <p className="text-[11px] text-mute">{t('quotes_tap')}</p>
          </Link>
        </div>
      </section>

      <section className="mt-9">
        <div className="flex items-end justify-between">
          <Kicker>{t('nav_discover')}</Kicker>
          <Link to="/discover" className="text-xs text-rose-200">
            {t('disc_title')}
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <CategoryTile
            to="/sleep"
            title={t('cat_stories')}
            glow="#4c1d95"
            icon={<TileIcon d="M4 6h11a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 3V6Z" />}
          />
          <CategoryTile
            to="/quotes"
            title={t('cat_quotes')}
            glow="#c2410c"
            icon={<TileIcon d="M7 8h5v6H8a3 3 0 0 1-3-3V8h2Zm8 0h5v6h-4a3 3 0 0 1-3-3V8h2Z" />}
          />
          <CategoryTile
            to="/practice"
            title={t('cat_meditate')}
            glow="#5b21b6"
            icon={<TileIcon d="M12 4v16M8 8c2 2 6 2 8 0M8 16c2-2 6-2 8 0" />}
          />
          <CategoryTile
            to="/more"
            title={t('cat_more')}
            glow="#3f3f46"
            icon={<TileIcon d="M12 5v14M5 12h14" />}
          />
        </div>
      </section>

      <section className="mt-9">
        <Kicker>{t('home_night')}</Kicker>
        <Link to="/session/story/lighthouse">
          <Card className="relative mt-3 overflow-hidden">
            <div className="scene-night pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative">
              <p className="text-xs text-rose-200">{t('home_story_free')}</p>
              <p className="mt-1 font-display text-2xl">Kıyı Feneri</p>
            </div>
          </Card>
        </Link>
      </section>

      <div className="mt-10">
        <LegalNote />
      </div>
    </div>
  )
}
