export type ProductStatus = 'coming-soon' | 'beta' | 'available'

export type Platform =
  | 'macOS'
  | 'iPhone'
  | 'iPad'
  | 'Apple Watch'
  | 'Apple TV'
  | 'iMessage'
  | 'Android'
  | 'Web'

export interface ProductAccent {
  primary: string
  secondary?: string
}

export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  platforms: Platform[]
  status: ProductStatus
  /** Path under public/ used for the product's icon/mark. */
  icon: string
  /** Internal route to the product's page. */
  route: string
  /**
   * Direct download link. Leave null to keep the download button disabled
   * ("Coming Soon") — this is the only place a download URL needs to change.
   */
  downloadUrl: string | null
  version: string | null
  minimumOS: string | null
  /** Featured products are highlighted on the homepage. */
  featured: boolean
  accent: ProductAccent
}

export const products: Product[] = [
  {
    slug: 'modeboard',
    name: 'Modeboard',
    tagline: 'Every Focus deserves its own Mac.',
    description:
      'Modeboard turns your wallpaper, Dock, appearance, menu bar, and Desktop into profiles you can switch together.',
    platforms: ['macOS'],
    status: 'coming-soon',
    icon: '/tideframe-icon-glossy.png',
    route: '/modeboard',
    downloadUrl: null,
    version: null,
    minimumOS: 'macOS 15 or later',
    featured: true,
    accent: { primary: 'var(--pacific)', secondary: 'var(--glass)' },
  },
]

export const featuredProduct = products.find((product) => product.featured) ?? products[0]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
