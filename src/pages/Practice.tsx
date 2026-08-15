import { Link } from 'react-router-dom'
import { breaths, meditations, todaysClarity, writings } from '../lib/library'
import { canAccess } from '../lib/entitlement'
import { Card, FoldList, Kicker, LegalNote, ProChip } from '../components/ui'
import { useI18n } from '../lib/i18n'

export function Practice() {
  const today = todaysClarity()
  const { t } = useI18n()
  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('practice_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>

      <Link to={`/session/clarity/${today.id}`}>
        <Card className="mt-10">
          <Kicker>{t('cat_clarity')}</Kicker>
          <p className="mt-2 font-display text-2xl">{today.title}</p>
          <p className="mt-1 text-sm text-mute">
            {today.subtitle} · {t('min_n', { n: today.minutes })} · {t('home_free')}
          </p>
        </Card>
      </Link>

      <section className="mt-12">
        <Kicker>{t('cat_breath')}</Kicker>
        <div className="mt-4">
          <FoldList
            items={breaths}
            preview={1}
            getKey={(b) => b.id}
            render={(b) => {
              const open = canAccess('breath', b.id)
              return (
                <Link
                  to={open ? `/session/breath/${b.id}` : '/paywall'}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.06] px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{b.label}</p>
                    <p className="text-xs text-mute">{b.subtitle}</p>
                  </div>
                  {open ? <span className="text-xs text-mute">{t('min_n', { n: b.minutes })}</span> : <ProChip />}
                </Link>
              )
            }}
          />
        </div>
      </section>

      <section className="mt-12">
        <Kicker>{t('cat_meditate')}</Kicker>
        <div className="mt-4">
          <FoldList
            items={meditations}
            preview={1}
            getKey={(m) => m.id}
            render={(m) => {
              const open = canAccess('meditation', m.id)
              return (
                <Link
                  to={open ? `/session/meditation/${m.id}` : '/paywall'}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.06] px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <p className="text-xs text-mute">{m.subtitle}</p>
                  </div>
                  {open ? <span className="text-xs text-mute">{t('min_n', { n: m.minutes })}</span> : <ProChip />}
                </Link>
              )
            }}
          />
        </div>
      </section>

      <section className="mt-12">
        <Kicker>{t('cat_write')}</Kicker>
        <div className="mt-4">
          <FoldList
            items={writings}
            preview={1}
            getKey={(w) => w.id}
            render={(w) => {
              const open = canAccess('writing', w.id)
              return (
                <Link
                  to={open ? `/session/writing/${w.id}` : '/paywall'}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.06] px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{w.title}</p>
                    <p className="text-xs text-mute">{w.subtitle}</p>
                  </div>
                  {open ? <span className="text-xs text-mute">{t('min_n', { n: w.minutes })}</span> : <ProChip />}
                </Link>
              )
            }}
          />
        </div>
      </section>

      <div className="mt-16">
        <LegalNote compact />
      </div>
    </div>
  )
}
