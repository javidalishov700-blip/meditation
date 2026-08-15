import { Link } from 'react-router-dom'
import { LangPicker } from '../components/LangPicker'
import { Card, GhostButton, LegalNote, ProChip } from '../components/ui'
import { useEntitlement } from '../lib/entitlement-store'
import { formatClock, formatDuration } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { readPassed } from '../lib/passed'

export function Me() {
  const { t, locale } = useI18n()
  const { pro, lockDemo } = useEntitlement()
  const history = readPassed()

  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('me_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('me_sub')}</p>

      <Card className="mt-8">
        <LangPicker />
      </Card>

      <Card className="mt-4">
        <p className="text-xs text-mute">{t('me_tier')}</p>
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
        <div className="flex items-center gap-2">
          <p className="text-xs text-mute">{t('me_history')}</p>
          {!pro ? <ProChip /> : null}
        </div>
        {!pro ? (
          <p className="mt-3 text-sm text-mute">{t('me_history_locked')}</p>
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

      <div className="mt-10">
        <LegalNote />
      </div>
    </div>
  )
}
