import { useImageFallback } from '../hooks/useImageFallback'

export function ProductScreenshot({
  src,
  alt,
  caption,
  aspectRatio = '16 / 10',
  width,
  height,
  hasThumbnail = false,
  priority = false,
}: {
  /** Basename (no extension) under public/screenshots/, e.g. "modeboard-overview". */
  src: string
  alt: string
  caption?: string
  aspectRatio?: string
  /** Natural pixel dimensions of the default image — set width/height attrs to prevent layout shift. */
  width?: number
  height?: number
  /** Only set true when `${src}-700.png` genuinely exists (see ScreenshotEntry doc). */
  hasThumbnail?: boolean
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
            // A single <img> (no <picture><source webp>): this site's SPA fallback (public/_redirects)
            // returns 200 + HTML for any missing file rather than a 404, so a candidate that probes
            // for a nonexistent file never falls through gracefully — it just fails to decode. srcset
            // below only ever references `-700` files confirmed to exist (hasThumbnail), for the same reason.
            <img
              src={`/screenshots/${src}.png`}
              srcSet={hasThumbnail ? `/screenshots/${src}-700.png 700w, /screenshots/${src}.png ${width}w` : undefined}
              sizes={hasThumbnail ? '(max-width: 800px) 84vw, 560px' : undefined}
              width={width}
              height={height}
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
