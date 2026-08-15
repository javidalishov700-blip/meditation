import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function Layout() {
  return (
    <>
      <div className="safe-top safe-bottom mx-auto min-h-dvh max-w-lg px-5">
        <Outlet />
      </div>
      <BottomNav />
    </>
  )
}
