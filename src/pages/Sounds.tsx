import { Link } from 'react-router-dom'
import { TONES } from '../lib/audio'
import { canAccess } from '../lib/entitlement'
import { FoldList, LegalNote, ProChip } from '../components/ui'
import { useI18n } from '../lib/i18n'

export function Sounds() {
  const { t } = useI18n()
  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('tones_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>

      <div className="mt-10">
        <FoldList
          items={TONES}
          preview={3}
          getKey={(tone) => tone.id}
          render={(tone) => {
            const open = canAccess('tone', tone.id)
            return (
              <Link
                to={open || tone.trialSeconds ? `/session/tone/${tone.id}` : '/paywall'}
                className="flex items-center justify-between rounded-2xl border border-white/[0.06] px-4 py-3"
              >
                <div>
                  <p className="font-medium">{tone.title}</p>
                  <p className="mt-0.5 text-xs text-mute">{tone.subtitle}</p>
                </div>
                {open || tone.trialSeconds ? (
                  <span className="text-xs text-mute">
                    {tone.trialSeconds && !open ? t('home_trial') : ''}
                  </span>
                ) : (
                  <ProChip />
                )}
              </Link>
            )
          }}
        />
      </div>

      <div className="mt-16">
        <LegalNote compact />
      </div>
    </div>
  )
}
