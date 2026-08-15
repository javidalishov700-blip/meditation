import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

export function SessionStage({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <div className="session-stage keep-dark">{children}</div>,
    document.body,
  )
}
