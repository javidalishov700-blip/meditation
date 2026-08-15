import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PinPad } from '../components/LockScreen'
import { Card, GhostButton, Kicker, LegalNote, PrimaryButton, ProChip } from '../components/ui'
import { useEntitlement } from '../lib/entitlement-store'
import { formatClock, formatDuration } from '../lib/format'
import { useLock } from '../lib/lock'
import { readPassed } from '../lib/passed'

export function Me() {
  const { pro, lockDemo } = useEntitlement()
  const { hasPin, setupPin, clearPin, lockNow } = useLock()
  const [pinMode, setPinMode] = useState<'off' | 'set' | 'confirm'>('off')
  const [first, setFirst] = useState('')
  const [msg, setMsg] = useState('')
  const history = readPassed()

  return (
    <div className="pb-8">
      <Kicker>Ben</Kicker>
      <h1 className="mt-2 font-display text-3xl">Sessiz hesap</h1>
      <p className="mt-2 text-sm text-mute">Hesap yok, sağlık senkronu yok, saat yok. Her şey bu cihazda.</p>

      <Card className="mt-6">
        <p className="text-xs uppercase tracking-wider text-mute">Katman</p>
        <p className="mt-1 font-display text-2xl">{pro ? 'Pro (cihaz demosu)' : 'Ücretsiz — dar'}</p>
        {pro ? (
          <GhostButton className="mt-4" onClick={lockDemo}>
            Demo Pro’yu kapat
          </GhostButton>
        ) : (
          <Link to="/paywall" className="mt-4 inline-block text-sm text-rose-200">
            Vitrini aç
          </Link>
        )}
      </Card>

      <Card className="mt-4">
        <Kicker>Dört haneli kilit</Kicker>
        <p className="mt-2 text-sm text-mute">
          SOS kilit ekranından da açılır. Kilit, kriz yatağını kapatmaz. PIN yalnızca bu tarayıcıda, özetlenmiş olarak
          durur.
        </p>
        {hasPin ? (
          <div className="mt-4 flex gap-2">
            <GhostButton onClick={lockNow}>Şimdi kilitle</GhostButton>
            <GhostButton onClick={clearPin}>Kilit kaldır</GhostButton>
          </div>
        ) : pinMode === 'off' ? (
          <PrimaryButton className="mt-4" onClick={() => setPinMode('set')}>
            Kilit kur
          </PrimaryButton>
        ) : (
          <div className="mt-6">
            <PinPad
              title={pinMode === 'set' ? 'Yeni PIN' : 'Yeniden gir'}
              hint={msg}
              onComplete={(pin) => {
                if (pinMode === 'set') {
                  setFirst(pin)
                  setPinMode('confirm')
                  setMsg('Onay için aynı dört hane')
                  return
                }
                if (pin !== first) {
                  setMsg('Eşleşmedi. Baştan.')
                  setPinMode('set')
                  setFirst('')
                  return
                }
                void setupPin(pin).then(() => {
                  setPinMode('off')
                  setMsg('')
                })
              }}
            />
          </div>
        )}
      </Card>

      <Card className="mt-4">
        <div className="flex items-center gap-2">
          <Kicker>Geçti geçmişi</Kicker>
          {!pro ? <ProChip /> : null}
        </div>
        {!pro ? (
          <div className="mt-3">
            <p className="text-sm text-mute">
              Kayıtlar tutulur, liste Pro’dadır. {history.length} dalga bu cihazda gizli duruyor.
            </p>
            <Link to="/paywall" className="mt-3 inline-block text-sm text-rose-200">
              Listeyi aç
            </Link>
          </div>
        ) : history.length === 0 ? (
          <p className="mt-3 text-sm text-mute">Henüz Geçti yok. SOS, süre yazar.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {history.map((h) => (
              <li key={h.id} className="rounded-2xl border border-white/10 px-3 py-2 text-sm">
                <p>{formatClock(h.endedAt)}</p>
                <p className="text-mute">
                  {formatDuration(h.seconds)} · {h.taps} dokunuş
                </p>
                <p className="mt-1 text-rose-100">{h.sentence}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="mt-4">
        <Kicker>Yaklaşım</Kicker>
        <p className="mt-2 text-sm leading-6 text-mute">
          Rahat beden. Kısa şimdiki zaman olumlu cümle. Zihinsel sahne. Gece tohumu. Bırakış. Şükran. Bir kitap metninden
          alıntı yok; yalnızca bu iskelet.
        </p>
      </Card>

      <div className="mt-8">
        <LegalNote />
      </div>
    </div>
  )
}
