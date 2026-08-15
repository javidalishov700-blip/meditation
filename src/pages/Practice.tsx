import { Link } from 'react-router-dom'
import { breaths, meditations, todaysClarity, writings } from '../lib/library'
import { canAccess } from '../lib/entitlement'
import { Card, Kicker, LegalNote, ProChip } from '../components/ui'

export function Practice() {
  const today = todaysClarity()
  return (
    <div className="pb-8">
      <Kicker>Pratik</Kicker>
      <h1 className="mt-2 font-display text-3xl">Gündüz masası</h1>
      <p className="mt-2 text-sm text-mute">
        Netlik, meditasyon, nefes, yazı. Çoğu Pro. Ücretsiz: günün netliği, bir nefes, bir yazı.
      </p>

      <Link to={`/session/clarity/${today.id}`}>
        <Card className="mt-8 border-rose-300/25">
          <Kicker>Günün zihinsel netliği</Kicker>
          <p className="mt-2 font-display text-2xl">{today.title}</p>
          <p className="mt-1 text-sm text-mute">{today.subtitle} · {today.minutes} dk · açık</p>
        </Card>
      </Link>

      <section className="mt-8">
        <Kicker>Nefes</Kicker>
        <div className="mt-3 space-y-2">
          {breaths.map((b) => {
            const open = canAccess('breath', b.id)
            return (
              <Link
                key={b.id}
                to={open ? `/session/breath/${b.id}` : '/paywall'}
                className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{b.label}</p>
                  <p className="text-xs text-mute">{b.subtitle}</p>
                </div>
                {open ? <span className="text-xs text-mute">{b.minutes} dk</span> : <ProChip />}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-8">
        <Kicker>Meditasyon</Kicker>
        <p className="mt-1 text-xs text-mute">Rahat beden, cümle, sahne, bırakış, şükran. Kitap alıntısı yok.</p>
        <div className="mt-3 space-y-2">
          {meditations.map((m) => {
            const open = canAccess('meditation', m.id)
            return (
              <Link
                key={m.id}
                to={open ? `/session/meditation/${m.id}` : '/paywall'}
                className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{m.title}</p>
                  <p className="text-xs text-mute">{m.subtitle}</p>
                </div>
                {open ? <span className="text-xs text-mute">{m.minutes} dk</span> : <ProChip />}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-8">
        <Kicker>Yazılar</Kicker>
        <div className="mt-3 space-y-2">
          {writings.map((w) => {
            const open = canAccess('writing', w.id)
            return (
              <Link
                key={w.id}
                to={open ? `/session/writing/${w.id}` : '/paywall'}
                className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{w.title}</p>
                  <p className="text-xs text-mute">{w.subtitle}</p>
                </div>
                {open ? <span className="text-xs text-mute">{w.minutes} dk</span> : <ProChip />}
              </Link>
            )
          })}
        </div>
      </section>

      <Link to="/sounds" className="mt-8 block rounded-2xl border border-white/10 px-4 py-3 text-sm">
        Tonlar ve 174 Hz denemesi →
      </Link>

      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
