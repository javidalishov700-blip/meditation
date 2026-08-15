import { Link } from 'react-router-dom'
import { TONES } from '../lib/audio'
import { canAccess } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { Card, Kicker, LegalNote, ProChip } from '../components/ui'

export function Sounds() {
  const { pro } = useEntitlement()
  return (
    <div className="pb-8">
      <Kicker>Tonlar</Kicker>
      <h1 className="mt-2 font-display text-3xl">Yatak frekansları</h1>
      <p className="mt-2 text-sm text-mute">
        Web Audio osilatörü. İyileştirme iddiası yok. SOS ile aynı 174 Hz zemin ücretsiz 3 dakikalık denemedir; diğer
        tonlar Pro.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {TONES.map((t) => {
          const open = canAccess('tone', t.id)
          return (
            <Link
              key={t.id}
              to={open || t.trialSeconds ? `/session/tone/${t.id}` : '/paywall'}
              className="relative flex aspect-square flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-center"
            >
              <p className="font-display text-2xl">{t.title}</p>
              <p className="mt-1 max-w-[9rem] text-[11px] text-mute">{t.subtitle}</p>
              {!pro && !t.trialSeconds ? (
                <span className="mt-2">
                  <ProChip />
                </span>
              ) : t.trialSeconds ? (
                <p className="mt-2 text-[10px] uppercase tracking-wider text-rose-200">3 dk deneme</p>
              ) : null}
            </Link>
          )
        })}
      </div>

      <Link to="/sleep" className="mt-8 block">
        <Card>
          <p className="text-sm font-medium">Doğa sahneleri uykuda</p>
          <p className="mt-1 text-xs text-mute">Yağmur, koy, çam, köz, rüzgâr, kır gecesi · Pro · timer 15–60</p>
        </Card>
      </Link>

      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
