import { useImageFallback } from '../hooks/useImageFallback'

export function ProductScreenshot({
  src,
  alt,
  caption,
  aspectRatio = '16 / 10',
  priority = false,
}: {
  /** Basename (no extension) under public/screenshots/, e.g. "modeboard-overview". */
  src: string
  alt: string
  caption?: string
  aspectRatio?: string
  priority?: boolean
}) {
  const { state, onLoad, onError } = useImageFallback()

  return (
    <figure className="product-screenshot">
      <div className="product-screenshot-frame" style={{ aspectRatio }}>
        <div className="product-screenshot-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="product-screenshot-image">
          {state !== 'error' ? (
            // A single <img> only: this site's SPA fallback (public/_redirects) returns 200 + HTML
            // for any missing file rather than a 404, so a <picture><source type="webp"> that probes
            // for a nonexistent .webp never falls through to the .png — it just fails to decode.
            // Add real .webp files by changing this src once they exist in public/screenshots/.
            <img
              src={`/screenshots/${src}.png`}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={onLoad}
              onError={onError}
            />
          ) : (
            <div className="product-screenshot-placeholder">
              <span>Screenshot coming soon</span>
            </div>
          )}
        </div>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
