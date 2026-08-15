import { Link } from 'react-router-dom'
import { ProChip } from '../components/ui'
import { canAccess } from '../lib/entitlement'
import { locLibrary } from '../lib/copy'
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
  'three-objects': 'more_objects',
  'room-sound': 'more_room',
}

export function More() {
  const { t, locale } = useI18n()
  return (
    <div className="pb-8">
      <h1 className="mt-6 font-display text-3xl">{t('more_title')}</h1>
      <p className="mt-3 text-sm leading-7 text-mute">{t('disc_calm')}</p>
      <div className="mt-8 space-y-3">
        {extras.map((e) => {
          const open = canAccess('extra', e.id)
          const located = locLibrary(e, locale)
          const label = extraKeys[e.id] ? t(extraKeys[e.id]!) : located.title
          return (
            <Link
              key={e.id}
              to={open ? `/session/extra/${e.id}` : '/paywall'}
              className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4"
            >
              <span className="text-sm">{label}</span>
              {open ? <span className="text-xs text-mute">{t('min_n', { n: e.minutes })}</span> : <ProChip />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
