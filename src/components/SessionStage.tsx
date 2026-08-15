import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

const Overlay = createContext<(on: boolean) => void>(() => undefined)
const ListenOn = createContext(false)

export function useSessionListen() {
  return useContext(ListenOn)
}

/** Lets Layout go full-bleed before paint so the listen page is never an empty padded hole. */
export function SessionOverlay({ children }: { children: ReactNode }) {
  const count = useRef(0)
  const [on, setOn] = useState(false)
  const arm = useCallback((next: boolean) => {
    count.current += next ? 1 : -1
    if (count.current < 0) count.current = 0
    setOn(count.current > 0)
  }, [])
  return (
    <Overlay.Provider value={arm}>
      <ListenShell on={on}>{children}</ListenShell>
    </Overlay.Provider>
  )
}

function ListenShell({ on, children }: { on: boolean; children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('session-listen', on)
    document.body.style.overflow = on ? 'hidden' : ''
    return () => {
      document.documentElement.classList.remove('session-listen')
      document.body.style.overflow = ''
    }
  }, [on])
  return <ListenOn.Provider value={on}>{children}</ListenOn.Provider>
}

const STAGE: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  width: '100%',
  height: '100%',
  minHeight: '100dvh',
  overflow: 'hidden',
  background: '#1c0f32',
  color: '#fff1f5',
}

export function SessionStage({ children }: { children: ReactNode }) {
  const arm = useContext(Overlay)
  useLayoutEffect(() => {
    arm(true)
    return () => arm(false)
  }, [arm])
  return (
    <div className="session-stage keep-dark" style={STAGE}>
      {children}
    </div>
  )
}
