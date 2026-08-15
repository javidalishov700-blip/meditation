import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { PremiumBanner } from './Sheets'
import { useEntitlement } from '../lib/entitlement-store'

export function Layout() {
  const { pathname } = useLocation()
  const { pro } = useEntitlement()
  const room = pathname.startsWith('/session')
  const banner = !room && !pro
  return (
    <>
      <div
        className={`relative z-10 safe-top mx-auto min-h-dvh max-w-lg px-5 ${
          room ? 'pb-[calc(1.25rem+env(safe-area-inset-bottom))]' : banner ? 'safe-bottom-banner' : 'safe-bottom'
        }`}
      >
        <div key={pathname} className="page-enter">
          <Outlet />
        </div>
      </div>
      {room ? null : (
        <>
          {banner ? <PremiumBanner /> : null}
          <BottomNav />
        </>
      )}
    </>
  )
}
