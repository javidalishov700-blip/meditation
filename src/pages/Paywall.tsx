import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IncludedList, LegalRow, OfferWash } from '../components/TrialOffer'
import { LegalNote, PrimaryButton } from '../components/ui'
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
  const { t, locale, meta } = useI18n()
  const [restored, setRestored] = useState('')
  const [fail, setFail] = useState('')
  const [store, setStore] = useState<StorePlan[] | null>(null)
  const [picked, setPicked] = useState<PlanId>('month')
  const [busy, setBusy] = useState<PlanId | 'restore' | null>(null)
  const [status, setStatus] = useState(storeStatus)
  const paid = storePro
  const native = iapConfigured()
  const planLabel = { week: t('pay_week'), month: t('pay_month'), year: t('pay_year') }

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

  /** Yearly against twelve months, from the App Store's own numbers only. */
  const yearDeal = (() => {
    const year = store?.find((p) => p.id === 'year')
    const month = store?.find((p) => p.id === 'month')
    if (!year?.amount || !year.currency) return null
    let perMonth = ''
    try {
      perMonth = new Intl.NumberFormat(meta.bcp47, { style: 'currency', currency: year.currency }).format(year.amount / 12)
    } catch {
      perMonth = ''
    }
    const save =
      month?.amount && month.currency === year.currency ? Math.round((1 - year.amount / (month.amount * 12)) * 100) : 0
    return { perMonth, save: save >= 5 ? save : 0 }
  })()

  const closeBtn = (
    <button
      type="button"
      aria-label={t('close')}
      onClick={leave}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.07] text-white/90 backdrop-blur-md"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  )

  return (
    <OfferWash>
      <div className="pb-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start">
          <span className="justify-self-start">{closeBtn}</span>
          <div className="pro-hero">
            <span className="pro-halo" />
            <span className="pro-ring" />
            <img src="/favicon.svg" alt="" className="pro-mark" />
          </div>
          {!paid ? (
            <button
              type="button"
              disabled={busy != null}
              onClick={() => void restore()}
              className="justify-self-end rounded-full px-1 py-2 text-[13px] text-white/60"
            >
              {busy === 'restore' ? t('pay_loading') : t('pay_restore')}
            </button>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-2 text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
            Steady Pro
          </span>
          <h1 className="mt-2.5 font-display text-[1.7rem] font-semibold leading-tight tracking-tight text-white">
            {paid ? t('pay_on') : t('pay_hero')}
          </h1>
          <p className="mx-auto mt-1.5 max-w-[21rem] text-[14px] leading-[1.35rem] text-white/70">
            {paid ? t('pay_sub') : t('pay_hero_sub')}
          </p>
        </div>

        {paid && native && proProductId ? (
          <div className="mt-6 rounded-[1.25rem] border border-white/[0.12] bg-white/[0.06] p-5">
            <p className="text-sm text-white">
              {t('pay_active_plan', { plan: planLabel[planIdOf(proProductId) ?? 'month'] })}
            </p>
            {proExpiresAt ? (
              <p className="mt-1 text-xs text-white/60">
                {t('pay_active_until', { expires: formatDate(proExpiresAt * 1000, locale) })}
              </p>
            ) : null}
          </div>
        ) : null}

        {paid ? (
          <>
            <PrimaryButton className="mt-8" onClick={leave}>
              {t('pay_back')}
            </PrimaryButton>
            {native ? (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  disabled={busy != null}
                  onClick={() => void restore()}
                  className="text-sm text-white/70 underline underline-offset-2"
                >
                  {busy === 'restore' ? t('pay_loading') : t('pay_recheck')}
                </button>
                <p className="mt-2 text-xs leading-5 text-white/50">{t('pay_recheck_h')}</p>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="mt-6 space-y-3" role="radiogroup">
              {PLANS.map((p) => {
                const on = picked === p.id
                const best = p.id === 'year'
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setPicked(p.id)}
                    className={`plan-card relative flex w-full items-center gap-3 rounded-[1.2rem] border px-4 py-3.5 text-left transition ${
                      on ? 'plan-on border-transparent' : 'border-white/[0.1] bg-white/[0.045]'
                    }`}
                  >
                    {best || p.featured ? (
                      <span
                        className={`absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white ${
                          best ? 'bg-gradient-to-r from-[#F59E0B] to-[#EC4899]' : 'bg-[#7B61FF]'
                        }`}
                      >
                        {best ? t('pay_best') : t('pay_featured')}
                      </span>
                    ) : null}
                    <span
                      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
                        on ? 'border-white bg-white' : 'border-white/30'
                      }`}
                    >
                      {on ? (
                        <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#6D28D9]" fill="none" stroke="currentColor" strokeWidth="3.4">
                          <path d="M5 12.5 10 17l9-9" />
                        </svg>
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[17px] font-medium leading-tight text-white">{planLabel[p.id]}</span>
                      {best && yearDeal && (yearDeal.perMonth || yearDeal.save) ? (
                        <span className="mt-1 block text-[12px] leading-4 text-white/70">
                          {yearDeal.perMonth ? t('pay_per_month', { p: yearDeal.perMonth }) : null}
                          {yearDeal.perMonth && yearDeal.save ? ' · ' : null}
                          {yearDeal.save ? (
                            <span className="font-semibold text-[#FCD34D]">{t('pay_save', { n: yearDeal.save })}</span>
                          ) : null}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block font-display text-[19px] font-semibold leading-none tabular-nums text-white">
                        {priceOf(p.id)}
                      </span>
                      <span className="mt-1 block text-[11px] text-white/60">{t(PERIOD[p.id])}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Said before the user taps, not after. If the catalogue never
                loaded the fallback prices above are cosmetic and no purchase
                can succeed, so the screen has to admit that up front — and
                carry StoreKit's own words, so a failure is diagnosable from a
                screenshot alone. */}
            {native && (status.stage === 'loading-products' || status.stage === 'purchasing') ? (
              <p className="mt-3 text-center text-xs text-white/60">
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

            <p className="mt-4 text-[11px] leading-[1.15rem] text-white/45">{native ? t('pay_iap') : t('pay_web_only')}</p>

            <div className="mt-7 rounded-[1.35rem] border border-white/[0.1] bg-white/[0.045] p-4 backdrop-blur-md">
              <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">{t('pay_included')}</p>
              <IncludedList />
            </div>

            <section className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">{t('pay_compare')}</p>
              <div className="mt-3 overflow-hidden rounded-[1.25rem] border border-white/[0.1] bg-white/[0.04]">
                <div className="grid grid-cols-[1fr_3.6rem_3.6rem] items-center border-b border-white/[0.08] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60">
                  <span />
                  <span className="text-center">{t('pay_free_k')}</span>
                  <span className="text-center text-[#E9D5FF]">Pro</span>
                </div>
                {[...FREE_KEYS.map((key) => ({ key, free: true })), ...PRO_KEYS.map((key) => ({ key, free: false }))].map(
                  (row) => (
                    <div
                      key={row.key}
                      className="grid grid-cols-[1fr_3.6rem_3.6rem] items-center border-b border-white/[0.06] px-4 py-2.5 last:border-b-0"
                    >
                      <span className="pr-2 text-[13px] leading-5 text-white/85">{t(row.key)}</span>
                      <span className="flex justify-center">
                        {row.free ? <Tick muted /> : <span className="h-px w-3 bg-white/30" />}
                      </span>
                      <span className="flex justify-center">
                        <Tick />
                      </span>
                    </div>
                  ),
                )}
              </div>
            </section>
          </>
        )}

        <div className="mt-8">
          {restored ? <p className="mb-3 text-center text-xs text-white/70">{restored}</p> : null}
          <p className="text-[11px] leading-5 text-white/45">{t('legal_terms')}</p>
        </div>

        <div className="mt-6">
          <LegalNote compact />
        </div>

        {!paid ? <div className="h-[calc(8.75rem+env(safe-area-inset-bottom))]" aria-hidden /> : null}
      </div>

      {!paid ? (
        <div className="pay-dock fixed inset-x-0 bottom-0 z-30 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-6">
          <div className="mx-auto max-w-lg">
            <button
              type="button"
              disabled={busy != null}
              onClick={() => void buy(picked)}
              className="pay-cta relative w-full overflow-hidden rounded-full px-5 py-[1.05rem] text-[15px] font-semibold tracking-[0.02em] text-white disabled:opacity-60"
            >
              <span className="relative z-10">
                {busy === picked
                  ? t('pay_loading')
                  : t('pay_continue', { n: `${planLabel[picked]} · ${priceOf(picked)}` })}
              </span>
            </button>
            <p className="mt-2 text-center text-[11px] text-white/55">{t('pay_cancel_any')}</p>
            <div className="mt-1.5">
              <LegalRow />
            </div>
          </div>
        </div>
      ) : null}
    </OfferWash>
  )
}

function Tick({ muted = false }: { muted?: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-full ${
        muted ? 'bg-white/[0.12] text-white/80' : 'bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.2">
        <path d="M5 12.5 10 17l9-9" />
      </svg>
    </span>
  )
}
