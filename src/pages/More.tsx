import { Link } from 'react-router-dom'
import { LegalNote, ProChip } from '../components/ui'
import { canAccess } from '../lib/entitlement'
import { extras } from '../lib/library'
import { useI18n } from '../lib/i18n'
import type { StringKey } from '../lib/strings'

const extraKeys: Record<string, StringKey> = {
  ground54321: 'more_ground',
  values: 'more_values',
  'kind-friend': 'more_kind',
  'ten-steps': 'more_walk',
  'tension-drop': 'more_tension',
  'morning-light': 'more_morning',
}

export function More() {
  const { t } = useI18n()
  const links: { to: string; label: string; open: boolean }[] = [
    { to: '/sos', label: t('cat_sos'), open: true },
    { to: '/quotes', label: t('cat_quotes'), open: true },
    { to: '/session/tone/174', label: '174 Hz', open: true },
    { to: '/session/breath/wave', label: t('cat_breath'), open: true },
    { to: canAccess('breath', 'box') ? '/session/breath/box' : '/paywall', label: '4-4-4-4', open: canAccess('breath', 'box') },
    { to: canAccess('breath', '478') ? '/session/breath/478' : '/paywall', label: '4-7-8', open: canAccess('breath', '478') },
    { to: canAccess('breath', 'sigh') ? '/session/breath/sigh' : '/paywall', label: t('cat_breath'), open: canAccess('breath', 'sigh') },
    { to: canAccess('writing', 'worry-window') ? '/session/writing/worry-window' : '/paywall', label: t('more_worry'), open: canAccess('writing', 'worry-window') },
    { to: canAccess('writing', 'gratitude-small') ? '/session/writing/gratitude-small' : '/paywall', label: t('more_gratitude'), open: canAccess('writing', 'gratitude-small') },
    { to: canAccess('meditation', 'body-drop') ? '/session/meditation/body-drop' : '/paywall', label: t('more_bodyscan'), open: canAccess('meditation', 'body-drop') },
    { to: canAccess('meditation', 'seed-only') ? '/session/meditation/seed-only' : '/paywall', label: t('more_seed'), open: canAccess('meditation', 'seed-only') },
    { to: '/treat', label: t('cat_cope'), open: true },
    { to: '/sleep', label: t('nav_sleep'), open: true },
    { to: '/sounds', label: t('cat_tones'), open: true },
  ]

  return (
    <div className="pb-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose-300/85">{t('nav_more')}</p>
      <h1 className="mt-2 font-display text-3xl">{t('more_title')}</h1>
      <p className="mt-2 text-sm text-mute">{t('more_sub')}</p>

      <div className="mt-6 space-y-2">
        {extras.map((e) => {
          const open = canAccess('extra', e.id)
          const label = extraKeys[e.id] ? t(extraKeys[e.id]!) : e.title
          return (
            <Link
              key={e.id}
              to={open ? `/session/extra/${e.id}` : '/paywall'}
              className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
            >
              <span className="text-sm font-medium">{label}</span>
              {open ? <span className="text-xs text-mute">{t('min_n', { n: e.minutes })}</span> : <ProChip />}
            </Link>
          )
        })}
        {links.map((l) => (
          <Link
            key={l.to + l.label}
            to={l.to}
            className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
          >
            <span className="text-sm font-medium">{l.label}</span>
            {l.open ? <span className="text-rose-200">→</span> : <ProChip />}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <LegalNote compact />
      </div>
    </div>
  )
}
