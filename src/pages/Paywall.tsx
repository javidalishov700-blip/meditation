import { useNavigate } from 'react-router-dom'
import { Card, GhostButton, LegalNote, PrimaryButton } from '../components/ui'
import { FREE_KEYS, PLANS, PRO_KEYS } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'

export function Paywall() {
  const { pro, unlockDemo } = useEntitlement()
  const navigate = useNavigate()
  const { t } = useI18n()
  const planLabel = { week: t('pay_week'), month: t('pay_month'), year: t('pay_year') }

  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('pay_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('pay_sub')}</p>

      {pro ? (
        <Card className="mt-8">
          <p className="font-display text-2xl">{t('pay_on')}</p>
          <GhostButton className="mt-4" onClick={() => navigate(-1)}>
            {t('pay_back')}
          </GhostButton>
        </Card>
      ) : null}

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

      <Card className="mt-8">
        <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('pay_free_k')}</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-cream/90">
          {FREE_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </Card>
      <Card className="mt-3">
        <p className="text-xs uppercase tracking-[0.12em] text-mute">{t('pay_pro_k')}</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-cream/90">
          {PRO_KEYS.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      </Card>

      <PrimaryButton
        className="mt-8"
        onClick={() => {
          unlockDemo()
          navigate(-1)
        }}
      >
        {t('pay_open')}
      </PrimaryButton>
      <p className="mt-3 text-center text-xs leading-5 text-mute">{t('pay_stripe')}</p>

      <div className="mt-12">
        <LegalNote />
      </div>
    </div>
  )
}
