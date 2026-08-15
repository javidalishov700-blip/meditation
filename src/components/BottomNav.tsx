import { NavLink } from 'react-router-dom'
import { useI18n } from '../lib/i18n'

const items = [
  { to: '/', labelKey: 'nav_home' as const, icon: HomeIcon },
  { to: '/discover', labelKey: 'nav_discover' as const, icon: GridIcon },
  { to: '/sleep', labelKey: 'nav_sleep' as const, icon: MoonIcon },
  { to: '/more', labelKey: 'nav_more' as const, icon: MoreIcon },
  { to: '/me', labelKey: 'nav_me' as const, icon: MeIcon },
]

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" />
    </svg>
  )
}
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" />
    </svg>
  )
}
function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
    </svg>
  )
}
function MoreIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
function MeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <circle cx="12" cy="9" r="3" />
      <path d="M6 19c1.2-2.5 3.2-4 6-4s4.8 1.5 6 4" />
    </svg>
  )
}

export function BottomNav() {
  const { t } = useI18n()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-lg grid-cols-5 px-2 pt-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2 text-[10px] tracking-wide ${
                isActive ? 'text-rose-200' : 'text-mute'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon active={isActive} />
                {t(item.labelKey)}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
