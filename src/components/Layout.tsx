import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { NowPlayingBar, useNowPlaying } from './NowPlaying'
import { PremiumBanner } from './Sheets'
import { SessionOverlay, useSessionListen } from './SessionStage'
import { useEntitlement } from '../lib/entitlement-store'

export function Layout() {
  return (
    <SessionOverlay>
      <LayoutBody />
    </SessionOverlay>
  )
}

function LayoutBody() {
  const { pathname } = useLocation()
  const { pro } = useEntitlement()
  const now = useNowPlaying()
  const listen = useSessionListen()
  const scrollRef = useRef<HTMLDivElement>(null)
  // This div is the Outlet's scroll container and it persists across route changes
  // (only its children swap), so without this every new screen would open at
  // whatever scrollTop the previous one was left at instead of the top.
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [pathname])
  const room = pathname.startsWith('/session')
  const nested =
    pathname.startsWith('/me/settings') || pathname.startsWith('/me/skills') || pathname.startsWith('/legal')
  const banner = !room && !listen && !pro && !nested
  const dock = now.playing && (now.kind === 'nature' || now.kind === 'tone') && !room && !listen
  const pad = listen
    ? 'pb-0'
    : room || nested
      ? 'pb-[calc(1.25rem+env(safe-area-inset-bottom))]'
      : dock && banner
        ? 'safe-bottom-banner-now'
        : dock
          ? 'safe-bottom-now'
          : banner
            ? 'safe-bottom-banner'
            : 'safe-bottom'
  const shell = listen
    ? 'fixed inset-0 z-[400] max-w-none bg-[#1c0f32] px-0 pt-0'
    : `app-scroll relative z-10 safe-top mx-auto h-full min-h-0 max-w-lg flex-1 overflow-y-auto overscroll-none px-5 ${pad}`
  return (
    <>
      <div ref={scrollRef} className={shell}>
        <Outlet />
      </div>
      {room || listen || nested ? null : (
        <>
          {banner ? <PremiumBanner /> : null}
          <NowPlayingBar lift={Boolean(banner)} />
          <BottomNav />
        </>
      )}
    </>
  )
}
