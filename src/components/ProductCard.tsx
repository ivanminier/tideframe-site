import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useImageFallback } from '../hooks/useImageFallback'
import { DownloadButton } from './DownloadButton'
import { PlatformBadge } from './PlatformBadge'
import { StatusBadge } from './StatusBadge'

export function ProductCard({ product }: { product: Product }) {
  const { state, onLoad, onError } = useImageFallback()

  return (
    <article className="product-card glass-panel">
      <div className="product-card-icon" aria-hidden="true">
        {state !== 'error' ? (
          <img src={product.icon} alt="" width="56" height="56" onLoad={onLoad} onError={onError} />
        ) : (
          <span className="product-card-icon-fallback">{product.name.charAt(0)}</span>
        )}
      </div>
      <div className="product-card-body">
        <div className="product-card-heading">
          <h3>
            <Link to={product.route}>{product.name}</Link>
          </h3>
          <StatusBadge status={product.status} />
        </div>
        <p className="product-card-tagline">{product.tagline}</p>
        <p>{product.description}</p>
        <div className="product-card-platforms">
          {product.platforms.map((platform) => (
            <PlatformBadge key={platform} platform={platform} />
          ))}
        </div>
        <div className="product-card-actions">
          <Link className="text-link" to={product.route}>
            Learn more <span>→</span>
          </Link>
          <DownloadButton
            downloadUrl={product.downloadUrl}
            status={product.status}
            productName={product.name}
            className="button button-small"
          />
        </div>
      </div>
    </article>
  )
}
