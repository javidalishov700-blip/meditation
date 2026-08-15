import { Link } from 'react-router-dom'
import { NATURE_SCENES } from '../lib/audio'
import { stories, sleepLab } from '../lib/library'
import { useEntitlement } from '../lib/entitlement-store'
import { canAccess } from '../lib/entitlement'
import { Card, FoldList, Kicker, ProChip } from '../components/ui'
import { useI18n } from '../lib/i18n'

export function Sleep() {
  const { pro } = useEntitlement()
  const { t } = useI18n()
  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('sleep_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>

      <section className="mt-10">
        <Kicker>{t('cat_stories')}</Kicker>
        <div className="mt-4">
          <FoldList
            items={stories}
            preview={1}
            getKey={(s) => s.id}
            render={(s) => {
              const open = canAccess('story', s.id)
              return (
                <Link to={open ? `/session/story/${s.id}` : '/paywall'} className="block">
                  <Card>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-2xl">{s.title}</p>
                        <p className="mt-1 text-sm text-mute">
                          {s.subtitle} · {t('min_n', { n: s.minutes })}
                        </p>
                      </div>
                      {open ? null : <ProChip />}
                    </div>
                  </Card>
                </Link>
              )
            }}
          />
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center gap-2">
          <Kicker>{t('lab_k')}</Kicker>
          {!pro ? <ProChip /> : null}
        </div>
        <div className="mt-4">
          <FoldList
            items={sleepLab}
            preview={1}
            getKey={(d) => d.id}
            render={(d) => {
              const i = sleepLab.findIndex((x) => x.id === d.id)
              return (
                <Link
                  to={pro ? `/session/sleeplab/${d.id}` : '/paywall'}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.06] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{d.title}</p>
                    <p className="text-xs text-mute">{d.subtitle}</p>
                  </div>
                  {pro ? <span className="text-xs text-mute">{i + 1}/7</span> : <ProChip />}
                </Link>
              )
            }}
          />
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center gap-2">
          <Kicker>{t('cat_nature')}</Kicker>
          {!pro ? <ProChip /> : null}
        </div>
        <div className="mt-4">
          <FoldList
            items={NATURE_SCENES}
            preview={2}
            getKey={(n) => n.id}
            className="grid grid-cols-2 gap-2"
            render={(n) => (
              <Link
                to={pro ? `/session/nature/${n.id}` : '/paywall'}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <p className="font-medium">{n.title}</p>
                <p className="mt-1 text-xs text-mute">{n.subtitle}</p>
              </Link>
            )}
          />
        </div>
      </section>
    </div>
  )
}
