import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IncludedList, LegalRow, OfferWash, TrialTimeline } from '../components/TrialOffer'
import { Card, GhostButton, LegalNote, PrimaryButton } from '../components/ui'
import { FREE_KEYS, PLANS, PRO_KEYS, isDemoPro } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'
import { isTrialActive, requestNotify, trialUsed } from '../lib/onboard'
import { readRemindTrial, writeRemindTrial } from '../lib/remind'

export function Paywall() {
  const { demo, trial, unlockDemo, startTrial, refresh } = useEntitlement()
  const navigate = useNavigate()
  const { t } = useI18n()
  const [remind, setRemind] = useState(() => readRemindTrial())
  const [legal, setLegal] = useState<'none' | 'privacy' | 'terms'>('none')
  const [restored, setRestored] = useState('')
  const used = trialUsed()
  const offer = !used && !demo
  const live = trial && !demo
  const shop = used && !trial && !demo
  const planLabel = { week: t('pay_week'), month: t('pay_month'), year: t('pay_year') }

  function setRemindOn(value: boolean) {
    setRemind(value)
    writeRemindTrial(value)
    if (value) void requestNotify()
  }

  function restore() {
    refresh()
    setRestored(isDemoPro() || isTrialActive() ? t('pay_restore_ok') : t('pay_restore_none'))
  }

  return (
    <OfferWash>
      <div className="pb-8">
        <button
          type="button"
          aria-label={t('close')}
          onClick={() => navigate(-1)}
          className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/8"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <h1 className="mt-5 font-display text-3xl">{demo ? t('pay_on') : shop ? t('pay_title') : t('ob_trial')}</h1>
        <p className="mt-3 text-sm leading-7 text-mute">{offer || live ? t('ob_trial_sub') : t('pay_sub')}</p>

        {offer || live ? (
          <div className="mt-8">
            <TrialTimeline remind={remind} onRemind={setRemindOn} />
          </div>
        ) : null}

        <Card className="mt-8">
          <IncludedList />
        </Card>

        {offer ? (
          <>
            <PrimaryButton
              className="mt-8"
              onClick={() => {
                startTrial()
                if (remind) void requestNotify()
                navigate(-1)
              }}
            >
              {t('ob_cta')}
            </PrimaryButton>
            <p className="mt-3 text-center text-xs leading-5 text-mute">{t('ob_price')}</p>
          </>
        ) : live || demo ? (
          <GhostButton className="mt-8 w-full" onClick={() => navigate(-1)}>
            {t('pay_back')}
          </GhostButton>
        ) : (
          <>
            <div className="mt-8 space-y-3">
              {PLANS.map((p) => (
                <Card key={p.id} className={p.featured ? 'border-white/14' : ''}>
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-2xl">{planLabel[p.id]}</p>
                    {p.featured ? <span className="text-xs text-mute">{t('pay_featured')}</span> : null}
                  </div>
                  <p className="mt-2 font-display text-3xl">
                    {p.price}
                    <span className="text-base text-mute"> {p.period}</span>
                  </p>
                </Card>
              ))}
            </div>
            <Card className="mt-4">
              <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('pay_free_k')}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {FREE_KEYS.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </Card>
            <Card className="mt-3">
              <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('pay_pro_k')}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {PRO_KEYS.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
            </Card>
            <PrimaryButton className="mt-8" onClick={() => unlockDemo()}>
              {t('pay_open')}
            </PrimaryButton>
            <p className="mt-3 text-center text-xs leading-5 text-mute">{t('pay_stripe')}</p>
          </>
        )}

        <div className="mt-8">
          <LegalRow
            onPrivacy={() => setLegal(legal === 'privacy' ? 'none' : 'privacy')}
            onTerms={() => setLegal(legal === 'terms' ? 'none' : 'terms')}
            onRestore={restore}
          />
          {restored ? <p className="mt-3 text-center text-xs text-mute">{restored}</p> : null}
          {legal === 'privacy' ? <p className="mt-4 text-xs leading-5 text-mute">{t('legal_full')}</p> : null}
          {legal === 'terms' ? <p className="mt-4 text-xs leading-5 text-mute">{t('pay_stripe')}</p> : null}
        </div>

        <div className="mt-10">
          <LegalNote />
        </div>
      </div>
    </OfferWash>
  )
}
