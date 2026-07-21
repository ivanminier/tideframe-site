import { getPublicRelease, type Product, type ProductStatus } from '../data/products'

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
  product,
  label,
  enabled = true,
  className = 'button',
}: {
  product: Product
  label?: string
  enabled?: boolean
  className?: string
}) {
  const release = getPublicRelease(product)
  const text = label ?? DEFAULT_LABEL[product.status](product.name)

  if (!release || !enabled) {
    return (
      <button type="button" className={`${className} button-disabled`} disabled>
        {text}
      </button>
    )
  }

  return (
    <a className={className} href={release.downloadUrl ?? undefined}>
      {text}
    </a>
  )
}
