import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LangPicker } from '../components/LangPicker'
import { PinPad } from '../components/LockScreen'
import { Card, GhostButton, Kicker, LegalNote, PrimaryButton, ProChip } from '../components/ui'
import { useEntitlement } from '../lib/entitlement-store'
import { formatClock, formatDuration } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { useLock } from '../lib/lock'
import { readPassed } from '../lib/passed'

export function Me() {
  const { t, locale } = useI18n()
  const { pro, lockDemo } = useEntitlement()
  const { hasPin, setupPin, clearPin, lockNow } = useLock()
  const [pinMode, setPinMode] = useState<'off' | 'set' | 'confirm'>('off')
  const [first, setFirst] = useState('')
  const [msg, setMsg] = useState('')
  const history = readPassed()

  return (
    <div className="pb-8">
      <Kicker>{t('nav_me')}</Kicker>
      <h1 className="mt-2 font-display text-3xl">{t('me_title')}</h1>
      <p className="mt-2 text-sm text-mute">{t('me_sub')}</p>

      <Card className="mt-6">
        <LangPicker />
      </Card>

      <Card className="mt-4">
        <p className="text-xs uppercase tracking-wider text-mute">{t('me_tier')}</p>
        <p className="mt-1 font-display text-2xl">{pro ? t('me_pro') : t('me_free')}</p>
        {pro ? (
          <GhostButton className="mt-4" onClick={lockDemo}>
            {t('me_demo_off')}
          </GhostButton>
        ) : (
          <Link to="/paywall" className="mt-4 inline-block text-sm text-rose-200">
            {t('me_vitrine')}
          </Link>
        )}
      </Card>

      <Card className="mt-4">
        <Kicker>{t('me_pin')}</Kicker>
        <p className="mt-2 text-sm text-mute">{t('me_pin_body')}</p>
        {hasPin ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <GhostButton onClick={lockNow}>{t('me_lock_now')}</GhostButton>
            <GhostButton onClick={clearPin}>{t('me_lock_off')}</GhostButton>
          </div>
        ) : pinMode === 'off' ? (
          <PrimaryButton className="mt-4" onClick={() => setPinMode('set')}>
            {t('me_lock_set')}
          </PrimaryButton>
        ) : (
          <div className="mt-6">
            <PinPad
              title={pinMode === 'set' ? t('me_pin_new') : t('me_pin_again')}
              hint={msg}
              onComplete={(pin) => {
                if (pinMode === 'set') {
                  setFirst(pin)
                  setPinMode('confirm')
                  setMsg(t('me_pin_match'))
                  return
                }
                if (pin !== first) {
                  setMsg(t('me_pin_fail'))
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
          <Kicker>{t('me_history')}</Kicker>
          {!pro ? <ProChip /> : null}
        </div>
        {!pro ? (
          <div className="mt-3">
            <p className="text-sm text-mute">
              {t('me_history_locked')} {t('waves_hidden', { n: history.length })}
            </p>
            <Link to="/paywall" className="mt-3 inline-block text-sm text-rose-200">
              {t('list_open')}
            </Link>
          </div>
        ) : history.length === 0 ? (
          <p className="mt-3 text-sm text-mute">{t('me_history_empty')}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {history.map((h) => (
              <li key={h.id} className="rounded-2xl border border-white/10 px-3 py-2 text-sm">
                <p>{formatClock(h.endedAt, locale)}</p>
                <p className="text-mute">
                  {formatDuration(h.seconds, locale)} · {t('taps_n', { n: h.taps })}
                </p>
                <p className="mt-1 text-rose-100">{h.sentence}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="mt-4">
        <Kicker>{t('me_approach').split('.')[0]}</Kicker>
        <p className="mt-2 text-sm leading-6 text-mute">{t('me_approach')}</p>
      </Card>

      <div className="mt-8">
        <LegalNote />
      </div>
    </div>
  )
}
