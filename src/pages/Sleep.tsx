import { Link } from 'react-router-dom'
import { NATURE_SCENES, TIMER_MINUTES } from '../lib/audio'
import { stories, sleepLab } from '../lib/library'
import { useEntitlement } from '../lib/entitlement-store'
import { canAccess } from '../lib/entitlement'
import { Card, Kicker, LegalNote, ProChip } from '../components/ui'
import { useI18n } from '../lib/i18n'

export function Sleep() {
  const { pro } = useEntitlement()
  const { t } = useI18n()
  return (
    <div className="pb-8">
      <Kicker>{t('nav_sleep')}</Kicker>
      <h1 className="mt-2 font-display text-3xl">{t('sleep_title')}</h1>
      <p className="mt-2 text-sm text-mute">{t('sleep_sub')}</p>

      <section className="mt-8">
        <Kicker>{t('cat_stories')}</Kicker>
        <div className="mt-3 space-y-3">
          {stories.map((s) => {
            const open = canAccess('story', s.id)
            return (
              <Link
                key={s.id}
                to={open ? `/session/story/${s.id}` : '/paywall'}
                className="block"
              >
                <Card>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-rose-200">{s.minutes} dk · sesli okuma</p>
                      <p className="mt-1 font-display text-2xl">{s.title}</p>
                      <p className="mt-1 text-sm text-mute">{s.subtitle}</p>
                    </div>
                    {open ? null : <ProChip />}
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Kicker>{t('lab_k')}</Kicker>
          {!pro ? <ProChip /> : null}
        </div>
        <p className="mt-2 text-sm text-mute">
          CBT-I tarzı iskelet: yatak iş yeri değil, kalkış çipası, mahkeme yok, iniş ritüeli, gece tohumu. Teşhis
          koymaz.
        </p>
        <div className="mt-3 space-y-2">
          {sleepLab.map((d, i) => (
            <Link
              key={d.id}
              to={pro ? `/session/sleeplab/${d.id}` : '/paywall'}
              className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{d.title}</p>
                <p className="text-xs text-mute">{d.subtitle}</p>
              </div>
              {pro ? <span className="text-xs text-mute">{i + 1}/7</span> : <ProChip />}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Kicker>{t('cat_nature')}</Kicker>
          {!pro ? <ProChip /> : null}
        </div>
        <p className="mt-2 text-xs text-mute">15 / 30 / 45 / 60 dk. Sahne seç, süre oturumda ayarlanır.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {NATURE_SCENES.map((n) => (
            <Link
              key={n.id}
              to={pro ? `/session/nature/${n.id}` : '/paywall'}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="font-medium">{n.title}</p>
              <p className="mt-1 text-xs text-mute">{n.subtitle}</p>
            </Link>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {TIMER_MINUTES.map((m) => (
            <span key={m} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mute">
              {m} dk
            </span>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
