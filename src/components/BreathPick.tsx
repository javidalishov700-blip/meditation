import { Link } from 'react-router-dom'
import { locBreath } from '../lib/copy'
import { canAccess } from '../lib/entitlement'
import { useI18n } from '../lib/i18n'
import { breaths } from '../lib/library'
import type { StringKey } from '../lib/strings'

const FOCUS: Record<string, StringKey> = {
  wave: 'breath_focus_wave',
  box: 'breath_focus_box',
  '478': 'breath_focus_478',
  sigh: 'breath_focus_sigh',
  equal: 'breath_focus_equal',
  count8: 'breath_focus_count8',
}

const ICON: Record<string, { bg: string; path: string }> = {
  wave: { bg: 'bg-emerald-500/20', path: 'M4 14c2.5-5 5-5 8-5s5.5 0 8 5' },
  box: { bg: 'bg-sky-400/20', path: 'M12 4 20 12 12 20 4 12Z' },
  '478': { bg: 'bg-[#7B61FF]/25', path: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z' },
  sigh: { bg: 'bg-fuchsia-400/20', path: 'M12 5 13.4 9.2 18 9.4 14.6 12.4 16 16.8 12 14.4 8 16.8 9.4 12.4 6 9.4 10.6 9.2Z' },
  equal: { bg: 'bg-teal-400/20', path: 'M6 9h12M6 15h12' },
  count8: { bg: 'bg-amber-400/20', path: 'M5 12c3-6 6-6 7-6s4 0 7 6c-3 6-6 6-7 6s-4 0-7-6Z' },
}

function LockMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="6" y="11" width="12" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    </span>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/45" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function BreathList() {
  const { t, locale } = useI18n()
  return (
    <ul className="space-y-2.5">
      {breaths.map((raw) => {
        const b = locBreath(raw, locale)
        const open = canAccess('breath', b.id)
        const icon = ICON[b.id] ?? ICON.wave!
        return (
          <li key={b.id}>
            <Link
              to={open ? `/session/breath/${b.id}` : '/paywall'}
              className="flex items-center gap-3 rounded-[1.2rem] bg-[#1C1C1E] px-4 py-3.5"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${icon.bg}`}>
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d={icon.path} />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium">{t(FOCUS[b.id] ?? 'breathing')}</span>
                <span className="mt-0.5 block text-xs text-mute">{b.label}</span>
              </span>
              {open ? <Chevron /> : <LockMark />}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function BreathHero() {
  return (
    <div className="breath-hero mx-auto" aria-hidden>
      <span className="breath-orb" />
      <span className="breath-ring" />
    </div>
  )
}
