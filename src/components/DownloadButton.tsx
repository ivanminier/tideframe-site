import type { ProductStatus } from '../data/products'

const DEFAULT_LABEL: Record<ProductStatus, (productName: string) => string> = {
  'coming-soon': () => 'Coming Soon',
  beta: () => 'Download Beta',
  available: (productName) => `Download ${productName}`,
}

/**
 * The single place that guards against an empty href: a falsy downloadUrl
 * always renders a disabled <button>, never an <a href="">.
 */
export function DownloadButton({
  downloadUrl,
  status,
  productName,
  label,
  className = 'button',
}: {
  downloadUrl: string | null
  status: ProductStatus
  productName: string
  label?: string
  className?: string
}) {
  const text = label ?? DEFAULT_LABEL[status](productName)

  if (!downloadUrl) {
    return (
      <button type="button" className={`${className} button-disabled`} disabled>
        {text}
      </button>
    )
  }

  return (
    <a className={className} href={downloadUrl}>
      {text}
    </a>
  )
}
