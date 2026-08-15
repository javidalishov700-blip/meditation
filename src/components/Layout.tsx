import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { ErrorBoundary } from './ErrorBoundary'
import { NowPlayingBar, useNowPlaying } from './NowPlaying'
import { PremiumBanner } from './Sheets'
import { useEntitlement } from '../lib/entitlement-store'

export function Layout() {
  const { pathname } = useLocation()
  const { pro } = useEntitlement()
  const now = useNowPlaying()
  const room = pathname.startsWith('/session')
  const banner = !room && !pro
  const dock = now.playing && (now.kind === 'nature' || now.kind === 'tone') && !room
  const pad = room
    ? 'pb-[calc(1.25rem+env(safe-area-inset-bottom))]'
    : dock && banner
      ? 'safe-bottom-banner-now'
      : dock
        ? 'safe-bottom-now'
        : banner
          ? 'safe-bottom-banner'
          : 'safe-bottom'
  return (
    <>
      <div className={`relative safe-top mx-auto min-h-dvh max-w-lg px-5 ${pad} ${room ? 'z-[120]' : 'z-10'}`}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
      {room ? null : (
        <>
          {banner ? <PremiumBanner /> : null}
          <NowPlayingBar lift={Boolean(banner)} />
          <BottomNav />
        </>
      )}
    </>
  )
}
