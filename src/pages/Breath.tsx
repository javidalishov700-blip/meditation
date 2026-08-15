import { useNavigate } from 'react-router-dom'
import { BreathHero, BreathList } from '../components/BreathPick'
import { useI18n } from '../lib/i18n'

export function Breath() {
  const { t } = useI18n()
  const navigate = useNavigate()
  return (
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
      <div className="mt-4">
        <BreathHero />
      </div>
      <h1 className="mt-6 text-center font-display text-[1.75rem] leading-tight">{t('breath_pick_title')}</h1>
      <p className="mt-2 text-center text-sm leading-6 text-mute">{t('breath_pick_sub')}</p>
      <div className="mt-8">
        <BreathList />
      </div>
    </div>
  )
}
