import type { ReactNode } from 'react'

type Tint = 'foam' | 'tide' | 'coral'

export function GlassPanel({
  children,
  className = '',
  tint = 'foam',
}: {
  children: ReactNode
  className?: string
  tint?: Tint
}) {
  return <div className={`glass-panel glass-panel--${tint}${className ? ` ${className}` : ''}`}>{children}</div>
}
