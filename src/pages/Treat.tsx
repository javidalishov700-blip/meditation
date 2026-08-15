import { Link, useNavigate, useParams } from 'react-router-dom'
import { programs } from '../lib/content'
import { canAccess } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { treatments, type Door } from '../lib/treatments'
import { Card, Kicker, LegalNote, ProChip } from '../components/ui'

export function Treat() {
  const { door } = useParams()
  const navigate = useNavigate()
  const { pro } = useEntitlement()
  const active = (treatments.find((d) => d.id === door) ?? treatments[0]) as Door
  const program = programs.find((p) => p.id === active.id)!

  return (
    <div className="pb-8">
      <Kicker>Tedavi sekmeleri</Kicker>
      <h1 className="mt-2 font-display text-3xl leading-tight">Başa çıkma kapıları</h1>
      <p className="mt-2 text-sm text-mute">
        Dört ayrı oda. Panik dalgadır, anksiyete yarındır, derealizasyon dünyadır, depersonalizasyon bedendir. Tıbbi
        teşhis değil.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {treatments.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => navigate(`/treat/${d.id}`)}
            className={`rounded-2xl border px-3 py-3 text-left ${
              d.id === active.id ? 'border-rose-300/50 bg-rose-400/15' : 'border-white/10 bg-white/5'
            }`}
          >
            <p className="text-[10px] uppercase tracking-wider text-mute">{d.short}</p>
            <p className="font-display text-lg">{d.title}</p>
          </button>
        ))}
      </div>

      <div className="mt-8" style={{ boxShadow: `inset 0 0 80px ${active.accent}18` }}>
        <Card>
          <Kicker>{active.kicker}</Kicker>
          <h2 className="mt-2 font-display text-3xl">{active.title}</h2>
          <p className="mt-3 text-base text-cream/90">{active.promise}</p>
          <p className="mt-4 text-sm leading-6 text-lilac">{active.distinct}</p>
          <div className="mt-5 space-y-3">
            {active.body.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-6 text-mute">
                {p}
              </p>
            ))}
          </div>
        </Card>
      </div>

      <section className="mt-8">
        <Kicker>Araçlar</Kicker>
        <div className="mt-3 space-y-2">
          {active.tools.map((t) => (
            <Card key={t.title} className="p-4">
              <p className="font-medium">{t.title}</p>
              <p className="mt-1 text-sm text-mute">{t.body}</p>
            </Card>
          ))}
        </div>
        {active.id === 'panic' ? (
          <Link to="/sos" className="mt-3 block rounded-2xl border border-rose-300/40 bg-rose-500/10 px-4 py-3 text-sm">
            SOS’u aç — bu kapının kriz yatağı, kilitlenmez
          </Link>
        ) : null}
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Kicker>{program.title}</Kicker>
          {program.freeDays === 0 && !pro ? <ProChip /> : null}
        </div>
        <div className="mt-3 space-y-2">
          {program.days.map((d) => {
            const open = pro || canAccess('program', active.id, { day: d.day })
            const to = open
              ? `/session/program/${active.id}?day=${d.day}`
              : '/paywall'
            return (
              <Link
                key={d.day}
                to={to}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-xs text-mute">Gün {d.day} · {d.minutes} dk</p>
                  <p className="font-medium">{d.title}</p>
                  <p className="text-xs text-mute">{d.summary}</p>
                </div>
                {open ? <span className="text-rose-200">→</span> : <ProChip />}
              </Link>
            )
          })}
        </div>
      </section>

      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}