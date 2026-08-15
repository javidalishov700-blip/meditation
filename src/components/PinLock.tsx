import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../lib/i18n'
import { checkPin, clearPin, hasPin, lockNow, needsLock, setPin, subscribePin, unlockSession } from '../lib/pin'
import { GhostButton } from './ui'

export function PinPad({
  title,
  hint,
  error,
  onComplete,
}: {
  title: string
  hint?: string
  error?: string
  onComplete: (pin: string) => void
}) {
  const { t } = useI18n()
  const [digits, setDigits] = useState('')

  function push(n: string) {
    const next = (digits + n).slice(0, 4)
    setDigits(next)
    if (next.length === 4) {
      onComplete(next)
      setDigits('')
    }
  }

  return (
    <div className="mt-5">
      <p className="text-sm font-medium">{title}</p>
      {hint ? <p className="mt-1 text-xs leading-5 text-mute">{hint}</p> : null}
      <div className="mt-4 flex justify-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-full ${i < digits.length ? 'bg-[#C4B5FD]' : 'bg-white/18'}`}
          />
        ))}
      </div>
      {error ? <p className="mt-3 text-center text-sm text-rose-200">{error}</p> : null}
      <div className="mx-auto mt-6 grid max-w-[16rem] grid-cols-3 gap-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key) =>
          key === '' ? (
            <span key="pad-empty" />
          ) : (
            <button
              key={key}
              type="button"
              aria-label={key === '⌫' ? t('back') : key}
              onClick={() => {
                if (key === '⌫') setDigits((d) => d.slice(0, -1))
                else push(key)
              }}
              className="flex h-14 items-center justify-center rounded-2xl bg-white/8 text-lg font-medium"
            >
              {key}
            </button>
          ),
        )}
      </div>
    </div>
  )
}

export function LockScreen() {
  const { t } = useI18n()
  const [error, setError] = useState('')

  return (
    <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-10 pt-[max(3.5rem,env(safe-area-inset-top))]">
      <h1 className="font-display text-3xl">{t('sos_lock_title')}</h1>
      <p className="mt-3 text-sm leading-6 text-mute">{t('me_pin_body')}</p>
      <PinPad
        title={t('sos_four')}
        error={error}
        onComplete={async (pin) => {
          const ok = await checkPin(pin)
          if (!ok) {
            setError(t('me_pin_wrong'))
            return
          }
          setError('')
          unlockSession()
        }}
      />
      <Link
        to="/sos"
        className="mt-8 flex items-center justify-center rounded-full bg-[#7B61FF] px-5 py-[1.05rem] text-sm font-semibold tracking-[0.06em] text-white"
      >
        {t('sos_open_lock')}
      </Link>
      <p className="mt-4 text-center text-xs leading-5 text-mute">{t('sos_wave_in')}</p>
    </div>
  )
}

export function PinGate({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [locked, setLocked] = useState(() => needsLock())

  useEffect(() => subscribePin(() => setLocked(needsLock())), [])

  if (locked && pathname !== '/sos') return <LockScreen />
  return children
}

export function PinSettings() {
  const { t } = useI18n()
  const [on, setOn] = useState(() => hasPin())
  const [mode, setMode] = useState<'idle' | 'set1' | 'set2' | 'remove'>('idle')
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')

  useEffect(() => subscribePin(() => setOn(hasPin())), [])

  return (
    <div>
      <p className="text-xs text-white/40">{t('me_pin')}</p>
      <p className="mt-2 text-sm leading-6 text-mute">{t('me_pin_body')}</p>
      {on ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <GhostButton onClick={() => lockNow()}>{t('me_lock_now')}</GhostButton>
          <GhostButton
            onClick={() => {
              setError('')
              setMode('remove')
            }}
          >
            {t('me_lock_off')}
          </GhostButton>
        </div>
      ) : (
        <GhostButton
          className="mt-4"
          onClick={() => {
            setError('')
            setDraft('')
            setMode('set1')
          }}
        >
          {t('me_lock_set')}
        </GhostButton>
      )}
      {mode === 'set1' ? (
        <PinPad
          title={t('me_pin_new')}
          hint={t('sos_four')}
          error={error}
          onComplete={(pin) => {
            setDraft(pin)
            setError('')
            setMode('set2')
          }}
        />
      ) : null}
      {mode === 'set2' ? (
        <PinPad
          title={t('me_pin_again')}
          hint={t('me_pin_match')}
          error={error}
          onComplete={async (pin) => {
            if (pin !== draft) {
              setError(t('me_pin_fail'))
              setDraft('')
              setMode('set1')
              return
            }
            await setPin(pin)
            setMode('idle')
            setOn(true)
          }}
        />
      ) : null}
      {mode === 'remove' ? (
        <PinPad
          title={t('me_lock_off')}
          hint={t('sos_four')}
          error={error}
          onComplete={async (pin) => {
            const ok = await checkPin(pin)
            if (!ok) {
              setError(t('me_pin_wrong'))
              return
            }
            clearPin()
            setMode('idle')
            setOn(false)
          }}
        />
      ) : null}
    </div>
  )
}
