import { NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../lib/i18n'

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={active ? 1.85 : 1.55}>
      <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" />
    </svg>
  )
}
function ExploreIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={active ? 1.85 : 1.55}>
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <path d="M16.2 4.8 19 7l-2.8 2.2M14.5 7H19M15.2 14.2l5.3 1.4-3.8 3.9" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" />
    </svg>
  )
}
function MoonIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={active ? 1.85 : 1.55}>
      <path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5Z" />
      <path d="M16.2 4.4l.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4.4-1.2Z" />
    </svg>
  )
}
function WaveIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={active ? 1.85 : 1.55}>
      <path d="M5 12v4M9 8v12M13 5v14M17 9v8M21 11v4" />
    </svg>
  )
}
function MeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={active ? 1.85 : 1.55}>
      <circle cx="12" cy="9" r="3" />
      <path d="M6 19c1.2-2.5 3.2-4 6-4s4.8 1.5 6 4" />
    </svg>
  )
}

function tabActive(path: string, tab: 'home' | 'discover' | 'sleep' | 'sounds' | 'me') {
  if (tab === 'home') return path === '/'
  if (tab === 'me') return path === '/me' || path.startsWith('/me/') || path === '/paywall'
  if (tab === 'sounds') return path === '/sounds' || path.startsWith('/session/tone')
  if (tab === 'sleep') {
    return (
      path === '/sleep' ||
      path.startsWith('/session/story') ||
      path.startsWith('/session/nature') ||
      path.startsWith('/session/sleeplab')
    )
  }
  return (
    path === '/discover' ||
    path.startsWith('/treat') ||
    path === '/practice' ||
    path === '/breath' ||
    path === '/more' ||
    path === '/quotes' ||
    path.startsWith('/session/')
  )
}

export function BottomNav() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const items = [
    { to: '/', tab: 'home' as const, label: t('nav_home'), icon: HomeIcon },
    { to: '/discover', tab: 'discover' as const, label: t('nav_discover'), icon: ExploreIcon },
    { to: '/sleep', tab: 'sleep' as const, label: t('nav_sleep'), icon: MoonIcon },
    { to: '/sounds', tab: 'sounds' as const, label: t('nav_sounds'), icon: WaveIcon },
    { to: '/me', tab: 'me' as const, label: t('nav_me'), icon: MeIcon },
  ]
  return (
    <nav className="bottom-nav fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.05] bg-black/82 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl">
      <div className="mx-auto grid max-w-lg grid-cols-5 px-2 pt-1.5">
        {items.map((item) => {
          const active = tabActive(pathname, item.tab)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 py-1.5 text-[10px] ${
                active ? 'text-white' : 'text-white/40'
              }`}
            >
              <span className={`flex h-8 w-[2.7rem] items-center justify-center rounded-full ${active ? 'nav-glow' : ''}`}>
                <item.icon active={active} />
              </span>
              {item.label}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
