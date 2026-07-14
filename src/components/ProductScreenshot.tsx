import { useImageFallback } from '../hooks/useImageFallback'

export function ProductScreenshot({
  src,
  alt,
  caption,
  aspectRatio = '16 / 10',
  width,
  height,
  hasThumbnail = false,
  thumbnailWidth = 700,
  sizes = '(max-width: 800px) 92vw, 560px',
  priority = false,
}: {
  /** Basename (no extension) under public/screenshots/, e.g. "modeboard-profile-overview". */
  src: string
  alt: string
  caption?: string
  aspectRatio?: string
  /** Natural pixel dimensions of the default image — set width/height attrs to prevent layout shift. */
  width?: number
  height?: number
  /** Only set true when a matching responsive thumbnail genuinely exists. */
  hasThumbnail?: boolean
  /** Width used in the thumbnail filename, for example `${src}-800.png`. */
  thumbnailWidth?: number
  /** Responsive rendered-width hint used with srcSet. */
  sizes?: string
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
            srcSet={hasThumbnail ? `/screenshots/${src}-${thumbnailWidth}.png ${thumbnailWidth}w, /screenshots/${src}.png ${width}w` : undefined}
            sizes={hasThumbnail ? sizes : undefined}
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
