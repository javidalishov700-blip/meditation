import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function Layout() {
  const { pathname } = useLocation()
  const room = pathname.startsWith('/session')
  return (
    <>
      <div
        className={`relative z-10 safe-top mx-auto min-h-dvh max-w-lg px-5 ${
          room ? 'pb-[calc(1.25rem+env(safe-area-inset-bottom))]' : 'safe-bottom'
        }`}
      >
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </div>
      {room ? null : <BottomNav />}
    </>
  )
}
