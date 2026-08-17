import { useMemo } from 'react'

export function Ambient() {
  const night = useMemo(() => {
    const h = new Date().getHours()
    return h < 6 || h >= 19
  }, [])

  return (
    <div className="aurora" aria-hidden>
      <span className="aurora-blob aurora-1" />
      <span className="aurora-blob aurora-2" />
      <span className="aurora-blob aurora-3" />
      {night ? <span className="stars" /> : null}
    </div>
  )
}
