import type { ScreenshotEntry } from '../data/modeboard-screenshots'
import { ProductScreenshot } from './ProductScreenshot'

export function ScreenshotGallery({ items }: { items: ScreenshotEntry[] }) {
  return (
    <div className="screenshot-gallery" role="list">
      {items.map((item, index) => (
        <div className="screenshot-gallery-item" role="listitem" key={item.id}>
          <ProductScreenshot
            src={item.id}
            alt={item.alt}
            caption={item.caption}
            aspectRatio={item.aspectRatio}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
