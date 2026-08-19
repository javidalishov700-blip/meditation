import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IncludedList, LegalRow, OfferWash, TrialTimeline } from '../components/TrialOffer'
import { Card, GhostButton, LegalNote, PrimaryButton } from '../components/ui'
import { FREE_KEYS, PLANS, PRO_KEYS, displayPlanPrice, isDemoPro } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'
import { isTrialActive, requestNotify, trialUsed } from '../lib/onboard'
import {
  iapConfigured,
  loadStorePlans,
  purchasePlan,
  refreshStoreEntitlement,
  restoreStorePurchases,
  type StorePlan,
} from '../lib/purchases'
import { readRemindTrial, writeRemindTrial } from '../lib/remind'
import type { PlanId } from '../lib/types'

const PERIOD: Record<PlanId, 'pay_period_week' | 'pay_period_month' | 'pay_period_year'> = {
  week: 'pay_period_week',
  month: 'pay_period_month',
  year: 'pay_period_year',
}

export function Paywall() {
  const { demo, trial, unlockDemo, startTrial, refresh } = useEntitlement()
  const navigate = useNavigate()
  const { t } = useI18n()
  const [remind, setRemind] = useState(() => readRemindTrial())
  const [restored, setRestored] = useState('')
  const [fail, setFail] = useState('')
  const [store, setStore] = useState<StorePlan[] | null>(null)
  const [picked, setPicked] = useState<PlanId>('month')
  const [busy, setBusy] = useState<PlanId | 'restore' | 'trial' | null>(null)
  const used = trialUsed()
  const offer = !used && !demo
  const live = trial && !demo
  const paid = demo
  const native = iapConfigured()
  const planLabel = { week: t('pay_week'), month: t('pay_month'), year: t('pay_year') }
  const planHint = { week: t('pay_note'), month: t('pay_note'), year: t('pay_year_note') }

  useEffect(() => {
    let alive = true
    void loadStorePlans().then((plans) => {
      if (alive) setStore(plans)
    })
    void refreshStoreEntitlement().then(() => {
      if (alive) refresh()
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setRemindOn(value: boolean) {
    setRemind(value)
    writeRemindTrial(value)
    if (value) void requestNotify()
  }

  async function restore() {
    setBusy('restore')
    setFail('')
    if (native) {
      const ok = await restoreStorePurchases()
      refresh()
      setRestored(ok ? t('pay_restore_ok') : t('pay_restore_none'))
    } else {
      refresh()
      setRestored(isDemoPro() || isTrialActive() ? t('pay_restore_ok') : t('pay_restore_none'))
    }
    setBusy(null)
  }

  async function buy(id: PlanId) {
    setBusy(id)
    setFail('')
    if (!native) {
      unlockDemo()
      setBusy(null)
      return
    }
    const result = await purchasePlan(id)
    if (result === 'ok') refresh()
    if (result === 'unavailable') setFail(t('pay_buy_fail'))
    if (result === 'pending') setFail(t('pay_buy_pending'))
    setBusy(null)
  }

  function priceOf(id: PlanId) {
    const live = store?.find((p) => p.id === id)?.price?.trim()
    if (live && /\d/.test(live)) return live
    return displayPlanPrice(id)
  }

  function beginTrialDay() {
    setBusy('trial')
    startTrial()
    if (remind) void requestNotify()
    setBusy(null)
    navigate(-1)
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

        <h1 className="mt-5 font-display text-3xl">{paid ? t('pay_on') : t('pay_more')}</h1>
        <p className="mt-3 text-sm leading-7 text-mute">{paid ? t('pay_sub') : t('pay_direct')}</p>

        {paid ? (
          <GhostButton className="mt-8 w-full" onClick={() => navigate(-1)}>
            {t('pay_back')}
          </GhostButton>
        ) : (
          <>
            <div className="mt-8 space-y-3">
              {PLANS.map((p) => {
                const on = picked === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPicked(p.id)}
                    className={`w-full rounded-[1.35rem] text-left ${on ? 'ring-2 ring-[#7B61FF] ring-offset-2 ring-offset-black' : ''}`}
                  >
                    <Card className={on || p.featured ? 'border border-white/14' : ''}>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-2xl">{planLabel[p.id]}</p>
                        {p.featured ? <span className="text-xs text-mute">{t('pay_featured')}</span> : null}
                      </div>
                      <p className="mt-2 font-display text-3xl tabular-nums text-white">
                        {priceOf(p.id)}
                        <span className="text-base font-sans text-mute"> {t(PERIOD[p.id])}</span>
                      </p>
                      <p className="mt-1 text-xs leading-5 text-mute">{planHint[p.id]}</p>
                    </Card>
                  </button>
                )
              })}
            </div>

            <PrimaryButton className="mt-6" disabled={busy != null} onClick={() => void buy(picked)}>
              {busy === picked
                ? t('pay_loading')
                : t('pay_continue', { n: `${planLabel[picked]} · ${priceOf(picked)}` })}
            </PrimaryButton>

            {fail ? <p className="mt-4 text-center text-sm text-amber-100">{fail}</p> : null}

            {native ? (
              <p className="mt-5 text-center text-xs leading-5 text-mute">{t('pay_iap')}</p>
            ) : (
              <p className="mt-3 text-center text-xs leading-5 text-mute">{t('pay_stripe')}</p>
            )}

            {offer || live ? (
              <div className="mt-10">
                <p className="text-center text-sm text-white/70">{t('pay_or_trial')}</p>
                {live ? (
                  <p className="mt-3 text-center text-sm text-mute">{t('me_trial_today')}</p>
                ) : (
                  <>
                    <div className="mt-5">
                      <TrialTimeline remind={remind} onRemind={setRemindOn} />
                    </div>
                    <GhostButton className="mt-6 w-full" onClick={beginTrialDay}>
                      {t('ob_cta')}
                    </GhostButton>
                    <p className="mt-3 text-center text-xs leading-5 text-mute">{t('ob_price')}</p>
                  </>
                )}
              </div>
            ) : null}

            <Card className="mt-8">
              <IncludedList />
            </Card>
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
          </>
        )}

        <div className="mt-8">
          <LegalRow onRestore={() => void restore()} />
          {restored ? <p className="mt-3 text-center text-xs text-mute">{restored}</p> : null}
          <p className="mt-4 text-xs leading-5 text-mute">{t('legal_terms')}</p>
        </div>

        <div className="mt-10">
          <LegalNote />
        </div>
      </div>
    </OfferWash>
  )
}
