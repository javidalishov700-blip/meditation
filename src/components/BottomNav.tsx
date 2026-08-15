import { NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../lib/i18n'

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" />
    </svg>
  )
}
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" />
    </svg>
  )
}
function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
    </svg>
  )
}
function MeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <circle cx="12" cy="9" r="3" />
      <path d="M6 19c1.2-2.5 3.2-4 6-4s4.8 1.5 6 4" />
    </svg>
  )
}

function tabActive(path: string, tab: 'home' | 'discover' | 'sleep' | 'me') {
  if (tab === 'home') return path === '/'
  if (tab === 'me') return path === '/me' || path === '/paywall'
  if (tab === 'sleep') return path === '/sleep' || path.startsWith('/session/story') || path.startsWith('/session/nature') || path.startsWith('/session/sleeplab')
  return (
    path === '/discover' ||
    path.startsWith('/treat') ||
    path === '/practice' ||
    path === '/more' ||
    path === '/quotes' ||
    path === '/sounds' ||
    path.startsWith('/session/')
  )
}

export function BottomNav() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const items = [
    { to: '/', tab: 'home' as const, label: t('nav_home'), icon: HomeIcon },
    { to: '/discover', tab: 'discover' as const, label: t('nav_discover'), icon: GridIcon },
    { to: '/sleep', tab: 'sleep' as const, label: t('nav_sleep'), icon: MoonIcon },
    { to: '/me', tab: 'me' as const, label: t('nav_me'), icon: MeIcon },
  ]
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.04] bg-ink/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-lg grid-cols-4 px-4 pt-2">
        {items.map((item) => {
          const active = tabActive(pathname, item.tab)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 py-2 text-[10px] tracking-wide ${
                active ? 'text-rose-200/90' : 'text-mute/80'
              }`}
            >
              <item.icon active={active} />
              {item.label}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
