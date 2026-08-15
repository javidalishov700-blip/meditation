import { useNavigate } from 'react-router-dom'
import { FREE_LIST, PLANS, PRO_LIST } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { Card, GhostButton, Kicker, LegalNote, PrimaryButton } from '../components/ui'

export function Paywall() {
  const { pro, unlockDemo } = useEntitlement()
  const navigate = useNavigate()

  return (
    <div className="pb-8">
      <Kicker>Vitrin</Kicker>
      <h1 className="mt-2 font-display text-3xl">Pro, asıl iskele</h1>
      <p className="mt-2 text-sm text-mute">
        Ücretsiz katman dar tutulur. SOS kriz anında kilitlenmez. Ödeme Stripe ile sonra bağlanacak; şimdilik cihaz
        içi demo.
      </p>

      {pro ? (
        <Card className="mt-6 border-orchid/40">
          <p className="font-display text-2xl">Pro bu cihazda açık</p>
          <p className="mt-2 text-sm text-mute">Stripe henüz yok. Demo kilidi Me sayfasından kapatılabilir.</p>
          <GhostButton className="mt-4" onClick={() => navigate(-1)}>
            Geri dön
          </GhostButton>
        </Card>
      ) : null}

      <div className="mt-6 space-y-3">
        {PLANS.map((p) => (
          <Card key={p.id} className={p.featured ? 'border-rose-300/40' : ''}>
            <div className="flex items-baseline justify-between">
              <p className="font-display text-2xl">{p.label}</p>
              {p.featured ? <span className="text-[10px] uppercase tracking-wider text-rose-200">önerilen</span> : null}
            </div>
            <p className="mt-2 font-display text-3xl">
              {p.price}
              <span className="text-base text-mute">{p.period}</span>
            </p>
            <p className="mt-1 text-xs text-mute">{p.note}</p>
          </Card>
        ))}
      </div>

      <PrimaryButton
        className="mt-6"
        onClick={() => {
          unlockDemo()
          navigate(-1)
        }}
      >
        Cihazda Pro’yu aç
      </PrimaryButton>
      <p className="mt-3 text-center text-xs text-mute">Stripe sonra. Bu buton yalnızca yerel vitrin demosu.</p>

      <section className="mt-10 grid gap-4">
        <Card>
          <Kicker>Ücretsiz</Kicker>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            {FREE_LIST.map((x) => (
              <li key={x}>· {x}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <Kicker>Pro</Kicker>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            {PRO_LIST.map((x) => (
              <li key={x}>· {x}</li>
            ))}
          </ul>
        </Card>
      </section>

      <div className="mt-8">
        <LegalNote />
      </div>
    </div>
  )
}
