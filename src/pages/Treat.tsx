import { Link, useNavigate, useParams } from 'react-router-dom'
import { programs } from '../lib/content'
import { canAccess } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { treatments, type Door } from '../lib/treatments'
import { Card, FoldList, Kicker, ProChip } from '../components/ui'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

const doorKey: Record<string, StringKey> = {
  panic: 'door_panic',
  anxiety: 'door_anxiety',
  derealization: 'door_dr',
  depersonalization: 'door_dp',
}

export function Treat() {
  const { door } = useParams()
  const navigate = useNavigate()
  const { pro } = useEntitlement()
  const { t } = useI18n()
  const active = (treatments.find((d) => d.id === door) ?? treatments[0]) as Door
  const program = programs.find((p) => p.id === active.id)!

  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl leading-tight">{t('treat_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>

      <div className="mt-10 grid grid-cols-2 gap-2">
        {treatments.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => navigate(`/treat/${d.id}`)}
            className={`rounded-2xl border px-3 py-3 text-left ${
              d.id === active.id ? 'border-white/18 bg-white/[0.05]' : 'border-white/[0.06] bg-transparent'
            }`}
          >
            <p className="font-display text-lg">{t(doorKey[d.id]!)}</p>
          </button>
        ))}
      </div>

      <Card className="mt-8">
        <p className="text-sm leading-7 text-mute">{active.promise}</p>
        {active.id === 'panic' ? (
          <Link to="/sos" className="mt-5 inline-block text-sm text-rose-200/80">
            SOS
          </Link>
        ) : null}
      </Card>

      <section className="mt-12">
        <Kicker>{t('program')}</Kicker>
        <div className="mt-4">
          <FoldList
            items={program.days}
            preview={1}
            getKey={(d) => String(d.day)}
            render={(d) => {
              const open = pro || canAccess('program', active.id, { day: d.day })
              const to = open ? `/session/program/${active.id}?day=${d.day}` : '/paywall'
              return (
                <Link
                  to={to}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.06] px-4 py-3"
                >
                  <div>
                    <p className="text-xs text-mute">{t('day_n', { n: d.day })}</p>
                    <p className="font-medium">{d.title}</p>
                  </div>
                  {open ? <span className="text-mute">→</span> : <ProChip />}
                </Link>
              )
            }}
          />
        </div>
      </section>
    </div>
  )
}
