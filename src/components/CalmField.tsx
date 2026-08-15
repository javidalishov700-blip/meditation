export function CalmField({ paused = false, progress = 0 }: { paused?: boolean; progress?: number }) {
  const frac = Math.max(0, Math.min(1, progress))
  return (
    <div className={`calm-field ${paused ? 'is-paused' : ''}`} aria-hidden>
      <div className="calm-wash" />
      <span className="calm-blob calm-a" />
      <span className="calm-blob calm-b" />
      <span className="calm-blob calm-c" />
      <span className="calm-motes" />
      <div className="calm-core">
        <span className="calm-ring calm-r1" />
        <span className="calm-ring calm-r2" />
        <span className="calm-ring calm-r3" />
        <span className="calm-orb" />
        <span className="calm-arc" style={{ background: `conic-gradient(#c4b5fd ${frac * 360}deg, transparent 0)` }} />
      </div>
      <span className="calm-horizon" />
    </div>
  )
}
