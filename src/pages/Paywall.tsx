import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IncludedList, LegalRow, OfferWash } from '../components/TrialOffer'
import { Card, GhostButton, LegalNote, PrimaryButton } from '../components/ui'
import { FREE_KEYS, PLANS, PRO_KEYS, displayPlanPrice } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { formatDate } from '../lib/format'
import { useI18n } from '../lib/i18n'
import {
  alertStoreError,
  iapConfigured,
  lastStoreError,
  loadStorePlans,
  planIdOf,
  purchasePlan,
  refreshStoreEntitlement,
  restoreStorePurchases,
  storeStatus,
  subscribeStoreStatus,
  type StorePlan,
} from '../lib/purchases'
import type { PlanId } from '../lib/types'

const PERIOD: Record<PlanId, 'pay_period_week' | 'pay_period_month' | 'pay_period_year'> = {
  week: 'pay_period_week',
  month: 'pay_period_month',
  year: 'pay_period_year',
}

export function Paywall() {
  const { store: storePro, proProductId, proExpiresAt, refresh } = useEntitlement()
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const [restored, setRestored] = useState('')
  const [fail, setFail] = useState('')
  const [store, setStore] = useState<StorePlan[] | null>(null)
  const [picked, setPicked] = useState<PlanId>('month')
  const [busy, setBusy] = useState<PlanId | 'restore' | null>(null)
  const [status, setStatus] = useState(storeStatus)
  const paid = storePro
  const native = iapConfigured()
  const planLabel = { week: t('pay_week'), month: t('pay_month'), year: t('pay_year') }
  const planHint = { week: t('pay_note'), month: t('pay_note'), year: t('pay_year_note') }

  useEffect(() => {
    let alive = true
    const offStatus = subscribeStoreStatus(() => {
      if (alive) setStatus(storeStatus())
    })
    void loadStorePlans().then((plans) => {
      if (alive) setStore(plans)
    })
    void refreshStoreEntitlement().then(() => {
      if (alive) refresh()
    })
    return () => {
      alive = false
      offStatus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function restore() {
    setBusy('restore')
    setFail('')
    try {
      if (!native) {
        setRestored(t('pay_restore_none'))
        return
      }
      const ok = await restoreStorePurchases()
      refresh()
      setRestored(ok ? t('pay_restore_ok') : t('pay_restore_none'))
    } finally {
      setBusy(null)
    }
  }

  /**
   * Straight to StoreKit. Nothing here can grant Pro on its own, and the button
   * always comes back — the finally runs even if the store call throws, and
   * purchasePlan itself gives up rather than hanging.
   *
   * Every branch ends in something on screen. A tap that produces neither a
   * sheet nor a message is indistinguishable from a broken build, so even the
   * "nothing went wrong" outcomes (cancelled, already-on) say so, and failures
   * carry StoreKit's own words rather than a generic line.
   */
  async function buy(id: PlanId) {
    setBusy(id)
    setFail('')
    setRestored('')
    try {
      if (!native) {
        setFail(t('pay_web_only'))
        return
      }
      // The catalogue never loaded, so this purchase cannot succeed. Say so now
      // rather than parking the user in front of a spinner for the whole
      // StoreKit timeout — a long silence is what makes a failure look like a
      // dead button.
      const before = storeStatus()
      if (before.stage === 'products-empty') {
        const why = before.error
        setFail(why ? `${t('pay_store_unreachable')} — ${why}` : t('pay_store_unreachable'))
        void alertStoreError('StoreKit: no products loaded', why ?? 'Unknown error')
        return
      }
      const result = await purchasePlan(id)
      const why = lastStoreError()
      const withWhy = (line: string) => (why ? `${line} — ${why}` : line)
      if (result === 'ok') {
        refresh()
        setRestored(t('pay_restore_ok'))
      } else if (result === 'cancelled') {
        setFail(t('pay_buy_cancelled'))
      } else if (result === 'pending') {
        setFail(t('pay_buy_pending'))
      } else if (result === 'timeout') {
        setFail(withWhy(t('pay_buy_timeout')))
      } else {
        setFail(withWhy(t('pay_buy_fail')))
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err ?? '')
      setFail(message ? `${t('pay_buy_fail')} — ${message}` : t('pay_buy_fail'))
      void alertStoreError('StoreKit: unexpected error', message || 'Unknown error')
    } finally {
      setBusy(null)
    }
  }

  function priceOf(id: PlanId) {
    const live = store?.find((p) => p.id === id)?.price?.trim()
    if (live && /\d/.test(live)) return live
    return displayPlanPrice(id)
  }

  /** Back if there is somewhere to go back to, home otherwise — never a dead end. */
  function leave() {
    if (window.history.length > 1) navigate(-1)
    else navigate('/', { replace: true })
  }

  return (
    <OfferWash>
      <div className="pb-8">
        <button
          type="button"
          aria-label={t('close')}
          onClick={leave}
          className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/8"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <h1 className="mt-4 font-display text-[1.7rem] leading-tight">{paid ? t('pay_on') : t('pay_more')}</h1>
        <p className="mt-2 text-[13px] leading-6 text-mute">{paid ? t('pay_sub') : t('pay_direct')}</p>

        {paid && native && proProductId ? (
          <Card className="mt-5">
            <p className="text-sm text-cream">
              {t('pay_active_plan', { plan: planLabel[planIdOf(proProductId) ?? 'month'] })}
            </p>
            {proExpiresAt ? (
              <p className="mt-1 text-xs text-mute">
                {t('pay_active_until', { expires: formatDate(proExpiresAt * 1000, locale) })}
              </p>
            ) : null}
          </Card>
        ) : null}

        {paid ? (
          <>
            <GhostButton className="mt-8 w-full" onClick={leave}>
              {t('pay_back')}
            </GhostButton>
            {native ? (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  disabled={busy != null}
                  onClick={() => void restore()}
                  className="text-sm text-cream/70 underline underline-offset-2"
                >
                  {busy === 'restore' ? t('pay_loading') : t('pay_recheck')}
                </button>
                <p className="mt-2 text-xs leading-5 text-mute">{t('pay_recheck_h')}</p>
              </div>
            ) : null}
          </>
        ) : (
          <>
            {/* The plans are the point of this screen: compact rows so all three
                and the buy button land above the fold on a phone. */}
            <div className="mt-5 space-y-2.5">
              {PLANS.map((p) => {
                const on = picked === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPicked(p.id)}
                    className={`flex w-full items-center gap-3 rounded-[1.2rem] px-4 py-3.5 text-left transition ${
                      on ? 'bg-white/[0.10] ring-2 ring-[#7B61FF]' : 'surface'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        on ? 'border-[#7B61FF] bg-[#7B61FF]' : 'border-white/25'
                      }`}
                    >
                      {on ? (
                        <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12.5 10 17l9-9" />
                        </svg>
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-lg leading-none">{planLabel[p.id]}</span>
                        {p.featured ? (
                          <span className="rounded-full bg-[#7B61FF]/25 px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[#C4B5FD]">
                            {t('pay_featured')}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-mute">{planHint[p.id]}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block font-display text-xl leading-none tabular-nums text-white">
                        {priceOf(p.id)}
                      </span>
                      <span className="mt-1 block text-[11px] text-mute">{t(PERIOD[p.id])}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <PrimaryButton className="mt-4" disabled={busy != null} onClick={() => void buy(picked)}>
              {busy === picked
                ? t('pay_loading')
                : t('pay_continue', { n: `${planLabel[picked]} · ${priceOf(picked)}` })}
            </PrimaryButton>

            {/* Said before the user taps, not after. If the catalogue never
                loaded the fallback prices above are cosmetic and no purchase
                can succeed, so the screen has to admit that up front — and
                carry StoreKit's own words, so a failure is diagnosable from a
                screenshot alone. */}
            {native && (status.stage === 'loading-products' || status.stage === 'purchasing') ? (
              <p className="mt-3 text-center text-xs text-mute">
                {status.stage === 'purchasing' ? t('pay_buy_waiting') : t('pay_store_checking')}
              </p>
            ) : null}

            {/* One problem panel, never two. A tap while the catalogue is empty
                would otherwise print the same sentence a second time. */}
            {(() => {
              const catalogueDown = native && status.stage === 'products-empty'
              if (!fail && !catalogueDown) return null
              const headline = fail || t('pay_store_unreachable')
              const detail = status.error && !headline.includes(status.error) ? status.error : ''
              return (
                <div className="mt-3 rounded-[1rem] border border-amber-300/30 bg-amber-300/10 px-4 py-3">
                  <p className="text-sm leading-6 text-amber-100">{headline}</p>
                  {detail ? (
                    <p className="mt-2 break-words font-mono text-[11px] leading-4 text-amber-200/80">{detail}</p>
                  ) : null}
                  {status.lastResult ? (
                    <p className="mt-2 font-mono text-[11px] leading-4 text-amber-200/70">
                      StoreKit: {status.lastResult} · {status.productCount} product(s)
                    </p>
                  ) : null}
                  {catalogueDown ? (
                    <button
                      type="button"
                      className="mt-3 text-sm text-amber-100 underline underline-offset-4"
                      onClick={() => {
                        setFail('')
                        void loadStorePlans().then(setStore)
                      }}
                    >
                      {t('pay_retry')}
                    </button>
                  ) : null}
                </div>
              )
            })()}

            {native ? (
              <p className="mt-4 text-center text-[11px] leading-5 text-mute">{t('pay_iap')}</p>
            ) : (
              <p className="mt-4 text-center text-[11px] leading-5 text-mute">{t('pay_web_only')}</p>
            )}

            <Card className="mt-6">
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
