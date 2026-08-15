import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLock } from '../lib/lock'
import { PrimaryButton } from './ui'

export function PinPad({
  onComplete,
  title,
  hint,
}: {
  onComplete: (pin: string) => void
  title?: string
  hint?: string
}) {
  const [digits, setDigits] = useState('')
  function press(d: string) {
    if (digits.length >= 4) return
    const next = digits + d
    setDigits(next)
    if (next.length === 4) {
      onComplete(next)
      setDigits('')
    }
  }
  function back() {
    setDigits((s) => s.slice(0, -1))
  }
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '←']
  return (
    <div className="mx-auto w-full max-w-xs">
      {title ? <h2 className="font-display text-center text-2xl">{title}</h2> : null}
      {hint ? <p className="mt-2 text-center text-sm text-mute">{hint}</p> : null}
      <div className="mt-8 flex justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-full border ${
              i < digits.length ? 'border-rose-300 bg-rose-300' : 'border-white/30'
            }`}
          />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3">
        {keys.map((k, i) =>
          k === '' ? (
            <span key={i} />
          ) : (
            <button
              key={k + i}
              type="button"
              onClick={() => (k === '←' ? back() : press(k))}
              className="h-16 rounded-2xl bg-white/5 text-xl text-cream"
            >
              {k}
            </button>
          ),
        )}
      </div>
    </div>
  )
}

export function LockScreen() {
  const { tryUnlock, setSosBypass } = useLock()
  const navigate = useNavigate()
  const [err, setErr] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-ink px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(3rem+env(safe-area-inset-top))]">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-rose-300/80">Steady kilitli</p>
        <p className="mt-3 font-display text-3xl">Dört hane</p>
      </div>
      <PinPad
        hint={err ? 'Eşleşmedi. Yeniden dene.' : 'Uygulama kilidi'}
        onComplete={async (pin) => {
          const ok = await tryUnlock(pin)
          setErr(!ok)
        }}
      />
      <div className="w-full max-w-xs space-y-3">
        <PrimaryButton
          onClick={() => {
            setSosBypass(true)
            navigate('/sos')
          }}
        >
          SOS — kilitten açılır
        </PrimaryButton>
        <p className="text-center text-[11px] text-mute">Krizde 112. Kilit SOS’u kapatmaz.</p>
      </div>
    </div>
  )
}
