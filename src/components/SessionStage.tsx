import type { CSSProperties, ReactNode } from 'react'

const STAGE: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  minHeight: '100dvh',
  background: '#160a24',
  color: '#fff1f5',
}

/** Full-viewport session chrome. In-place (no portal): /session has no transform, and a portal left the page empty when the WebView stole the audio element. */
export function SessionStage({ children }: { children: ReactNode }) {
  return (
    <div className="session-stage keep-dark" style={STAGE}>
      {children}
    </div>
  )
}
