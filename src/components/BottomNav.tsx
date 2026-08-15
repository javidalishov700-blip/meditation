import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Ana', icon: HomeIcon },
  { to: '/treat', label: 'Tedavi', icon: DoorIcon },
  { to: '/sleep', label: 'Uyku', icon: MoonIcon },
  { to: '/practice', label: 'Pratik', icon: PulseIcon },
  { to: '/me', label: 'Ben', icon: MeIcon },
] as const

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" />
    </svg>
  )
}
function DoorIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <path d="M6 21V5a1 1 0 0 1 1-1h7.5L18 8.5V21H6Z" />
      <path d="M14.5 4v4.5H18" />
      <circle cx="10" cy="13" r="0.7" fill="currentColor" />
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
function PulseIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7}>
      <path d="M3 13h3l2-6 3 10 2-6h6" />
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
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
