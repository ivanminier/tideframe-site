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
  /** Basename (no extension) under public/screenshots/, e.g. "modeboard-profile-editor". */
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

  if (state === 'error') return null

  return (
    <figure className="product-screenshot">
      <div className="product-screenshot-frame" style={{ aspectRatio }}>
        <div className="product-screenshot-image">
          <img
            src={`/screenshots/${src}.png`}
            srcSet={hasThumbnail ? `/screenshots/${src}-700.png 700w, /screenshots/${src}.png ${width}w` : undefined}
            sizes={hasThumbnail ? '(max-width: 800px) 92vw, 560px' : undefined}
            width={width}
            height={height}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={onLoad}
            onError={onError}
          />
        </div>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
