import { Link } from 'react-router-dom'
import { todaysClarity } from '../lib/library'
import { treatments } from '../lib/treatments'
import { greeting } from '../lib/format'
import { useEntitlement } from '../lib/entitlement-store'
import { Card, CrisisLink, Kicker, LegalNote, ProChip } from '../components/ui'

export function Home() {
  const { pro } = useEntitlement()
  const clarity = todaysClarity()
  return (
    <div className="pb-6">
      <header className="flex items-start justify-between pt-2">
        <div>
          <Kicker>Steady</Kicker>
          <h1 className="mt-2 font-display text-[2.15rem] leading-[1.05] tracking-tight">
            {greeting()}.
            <span className="block text-rose-200/90">Dalga gelince burada kal.</span>
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <CrisisLink />
          {pro ? (
            <span className="text-[10px] uppercase tracking-widest text-orchid">Pro açık</span>
          ) : (
            <Link to="/paywall" className="text-[10px] uppercase tracking-widest text-rose-200">
              Pro vitrin
            </Link>
          )}
        </div>
      </header>

      <Link
        to="/sos"
        className="relative mt-10 block overflow-hidden rounded-[2.2rem] border border-rose-300/25 bg-gradient-to-b from-rose-500/25 via-fuchsia-700/10 to-transparent px-6 py-10 text-center"
      >
        <div className="orb-pulse mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 via-fuchsia-500 to-violet-900 shadow-[0_0_80px_rgba(244,114,182,0.55)]">
          <span className="font-display text-3xl text-cream">SOS</span>
        </div>
        <p className="mt-6 font-display text-xl">Kriz yatağı</p>
        <p className="mt-1 text-sm text-mute">174 Hz · kahverengi gürültü · sesli nefes · kilitlenmez</p>
      </Link>

      <section className="mt-10">
        <Kicker>Şimdi</Kicker>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Link to="/session/tone/174" className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-wider text-rose-200">Deneme</p>
            <p className="mt-1 text-sm font-medium">174 Hz</p>
            <p className="text-[11px] text-mute">3 dakika</p>
          </Link>
          <Link to={`/session/clarity/${clarity.id}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-wider text-rose-200">Netlik</p>
            <p className="mt-1 text-sm font-medium">{clarity.title}</p>
            <p className="text-[11px] text-mute">3 dakika</p>
          </Link>
          <Link to="/session/program/panic?day=1" className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[10px] uppercase tracking-wider text-rose-200">Panik</p>
            <p className="mt-1 text-sm font-medium">1. gün</p>
            <p className="text-[11px] text-mute">ücretsiz</p>
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <Kicker>Dört kapı</Kicker>
          <Link to="/treat" className="text-xs text-rose-200">
            Tedavi sekmeleri
          </Link>
        </div>
        <p className="mt-2 text-xs text-mute">Başa çıkma araçları. Teşhis veya tedavi iddiası yok. DP ≠ DR.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {treatments.map((d) => (
            <Link
              key={d.id}
              to={`/treat/${d.id}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
              style={{ boxShadow: `inset 0 0 40px ${d.accent}22` }}
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-mute">{d.short}</p>
              <p className="mt-1 font-display text-xl">{d.title}</p>
              <p className="mt-2 text-xs leading-5 text-mute">{d.promise}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <Kicker>Gece</Kicker>
        <Link to="/session/story/lighthouse">
          <Card className="mt-3">
            <p className="text-xs text-rose-200">Ücretsiz hikâye · sesli okuma</p>
            <p className="mt-1 font-display text-2xl">Kıyı Feneri</p>
            <p className="mt-2 text-sm text-mute">Ege’de bir nöbet. Kayıtlı ses dosyası yok — tarayıcı okur.</p>
          </Card>
        </Link>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Link to="/sleep" className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm font-medium">Uyku</p>
            <p className="mt-1 text-xs text-mute">Hikâye, lab, doğa</p>
            {!pro ? <span className="mt-2 inline-block"><ProChip /></span> : null}
          </Link>
          <Link to="/sounds" className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm font-medium">Tonlar</p>
            <p className="mt-1 text-xs text-mute">174 Hz ve diğerleri</p>
          </Link>
        </div>
      </section>

      <div className="mt-10">
        <LegalNote />
      </div>
    </div>
  )
}
