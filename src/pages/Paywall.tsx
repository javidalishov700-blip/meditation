import { useNavigate } from 'react-router-dom'
import { Card, GhostButton, Kicker, LegalNote, PrimaryButton } from '../components/ui'
import { PLANS } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { useI18n } from '../lib/i18n'

export function Paywall() {
  const { pro, unlockDemo } = useEntitlement()
  const navigate = useNavigate()
  const { t } = useI18n()
  const planLabel = { week: t('pay_week'), month: t('pay_month'), year: t('pay_year') }

  return (
    <div className="pb-8">
      <Kicker>{t('pay_kicker')}</Kicker>
      <h1 className="mt-2 font-display text-3xl">{t('pay_title')}</h1>
      <p className="mt-2 text-sm text-mute">{t('pay_sub')}</p>

      {pro ? (
        <Card className="mt-6 border-orchid/40">
          <p className="font-display text-2xl">{t('pay_on')}</p>
          <GhostButton className="mt-4" onClick={() => navigate(-1)}>
            {t('pay_back')}
          </GhostButton>
        </Card>
      ) : null}

      <div className="mt-6 space-y-3">
        {PLANS.map((p) => (
          <Card key={p.id} className={p.featured ? 'border-rose-300/40' : ''}>
            <div className="flex items-baseline justify-between">
              <p className="font-display text-2xl">{planLabel[p.id]}</p>
              {p.featured ? (
                <span className="text-[10px] uppercase tracking-wider text-rose-200">{t('pay_featured')}</span>
              ) : null}
            </div>
            <p className="mt-2 font-display text-3xl">
              {p.price}
              <span className="text-base text-mute"> {p.period}</span>
            </p>
            <p className="mt-1 text-xs text-mute">{p.id === 'year' ? t('pay_year_note') : t('pay_note')}</p>
          </Card>
        ))}
      </div>

      <PrimaryButton
        className="mt-6"
        onClick={() => {
          unlockDemo()
          navigate(-1)
        }}
      >
        {t('pay_open')}
      </PrimaryButton>
      <p className="mt-3 text-center text-xs text-mute">{t('pay_stripe')}</p>

      <section className="mt-10 grid gap-4">
        <Card>
          <Kicker>{t('pay_free_k')}</Kicker>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            <li>· SOS</li>
            <li>· 174 Hz · {t('min_n', { n: 3 })}</li>
            <li>· {t('cat_stories')} / {t('cat_write')} / {t('cat_breath')}</li>
            <li>· {t('door_panic')} · {t('day_n', { n: 1 })}</li>
            <li>· {t('cat_clarity')} · {t('cat_quotes')}</li>
          </ul>
        </Card>
        <Card>
          <Kicker>{t('pay_pro_k')}</Kicker>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            <li>· {t('door_anxiety')} / {t('door_dr')} / {t('door_dp')}</li>
            <li>· {t('lab_k')} · {t('cat_nature')}</li>
            <li>· {t('cat_meditate')} · {t('cat_tones')}</li>
            <li>· {t('me_history')}</li>
          </ul>
        </Card>
      </section>

      <div className="mt-8">
        <LegalNote />
      </div>
    </div>
  )
}
