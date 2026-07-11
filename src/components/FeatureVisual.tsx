export function FeatureVisual({ type }: { type: string }) {
  return (
    <div className={`feature-visual visual-${type}`} aria-hidden="true">
      <div className="mock-window">
        <div className="traffic"><i /><i /><i /></div>
        <div className="mock-sidebar"><b /><b /><b /><b /></div>
        <div className="mock-content"><span className="wave" /><span className="wave" /><span className="wave" /></div>
        <div className="mock-dock"><i /><i /><i /><i /><i /></div>
      </div>
    </div>
  )
}

