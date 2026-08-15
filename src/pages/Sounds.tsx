import { Link } from 'react-router-dom'
import { TONES } from '../lib/audio'
import { canAccess } from '../lib/entitlement'
import { useEntitlement } from '../lib/entitlement-store'
import { Card, Kicker, LegalNote, ProChip } from '../components/ui'
import { useI18n } from '../lib/i18n'

export function Sounds() {
  const { pro } = useEntitlement()
  const { t } = useI18n()
  return (
    <div className="pb-8">
      <Kicker>{t('cat_tones')}</Kicker>
      <h1 className="mt-2 font-display text-3xl">{t('tones_title')}</h1>
      <p className="mt-2 text-sm text-mute">{t('no_file')}</p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {TONES.map((tone) => {
          const open = canAccess('tone', tone.id)
          return (
            <Link
              key={tone.id}
              to={open || tone.trialSeconds ? `/session/tone/${tone.id}` : '/paywall'}
              className="relative flex aspect-square flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-center"
            >
              <p className="font-display text-2xl">{tone.title}</p>
              <p className="mt-1 max-w-[9rem] text-[11px] text-mute">{tone.subtitle}</p>
              {!pro && !tone.trialSeconds ? (
                <span className="mt-2">
                  <ProChip />
                </span>
              ) : tone.trialSeconds ? (
                <p className="mt-2 text-[10px] uppercase tracking-wider text-rose-200">{t('home_trial')}</p>
              ) : null}
            </Link>
          )
        })}
      </div>

      <Link to="/sleep" className="mt-8 block">
        <Card>
          <p className="text-sm font-medium">{t('cat_nature')}</p>
          <p className="mt-1 text-xs text-mute">Yağmur, koy, çam, köz, rüzgâr, kır gecesi · Pro · timer 15–60</p>
        </Card>
      </Link>

      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
