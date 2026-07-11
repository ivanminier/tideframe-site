import type { ProductStatus } from '../data/products'

const LABELS: Record<ProductStatus, string> = {
  'coming-soon': 'Coming Soon',
  beta: 'Beta',
  available: 'Available',
}

export function StatusBadge({ status }: { status: ProductStatus }) {
  return <span className={`status-badge status-badge--${status}`}>{LABELS[status]}</span>
}
