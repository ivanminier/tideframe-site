import type { Platform } from '../data/products'

// Text-only by design — no Apple logos or SF Symbols, to avoid implying endorsement.
export function PlatformBadge({ platform }: { platform: Platform }) {
  return <span className="platform-badge">{platform}</span>
}
