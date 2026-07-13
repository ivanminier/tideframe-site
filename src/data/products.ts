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

/**
 * The intended commercial model for a paid product. Populating this describes what
 * Tideframe Labs plans to ship — it does NOT by itself make a product purchasable.
 * `status`/`downloadUrl` below are the only fields that control whether a download is
 * actually offered, and structured-data Offer markup (see src/data/structuredData.ts)
 * only appears once status is 'available' and downloadUrl is set to a real link.
 */
export interface ProductCommercial {
  /** e.g. 14.99 */
  priceUSD: number
  /** Whether priceUSD is an introductory price that may change later. */
  introductoryPrice: boolean
  /** e.g. "One person, up to three personally controlled Macs" */
  licenseScope: string
  /** e.g. "All Modeboard 1.x updates" */
  updatesIncluded: string
  /** Full-feature trial length in days, or null if there is no trial. */
  trialDays: number | null
  /** How a license is activated, e.g. "Offline signed access code — no account or internet connection required." */
  activation: string
  /** How the app checks for/installs updates, e.g. "Sparkle 2, user-controlled automatic checks plus a manual Check for Updates command." */
  updateMechanism: string | null
  /** Exact refund policy wording — do not paraphrase; this is reviewed business language. */
  refundPolicy: string
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
   * Only set this to a real HTTPS link to a signed, notarized build.
   */
  downloadUrl: string | null
  /** Public version number shown to visitors. Leave null until a version actually ships. */
  version: string | null
  /**
   * SHA-256 checksum of the exact file at downloadUrl, for visitors who want to verify
   * their download. Only set this once it corresponds to the exact live ZIP — an
   * out-of-date checksum is worse than none. Only ever displayed when downloadUrl is
   * also set (see the Modeboard page), so it can never appear next to a "Coming Soon"
   * button.
   */
  sha256: string | null
  minimumOS: string | null
  /** Featured products are highlighted on the homepage. */
  featured: boolean
  accent: ProductAccent
  /** The intended pricing/licensing model — see ProductCommercial's own doc comment. */
  commercial: ProductCommercial | null
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
    icon: '/modeboard-icon.png',
    route: '/modeboard',
    downloadUrl: null,
    version: null,
    sha256: null,
    minimumOS: 'macOS 15 or later',
    featured: true,
    accent: { primary: 'var(--pacific)', secondary: 'var(--glass)' },
    commercial: {
      priceUSD: 14.99,
      introductoryPrice: true,
      licenseScope: 'One person, on up to three personally controlled Macs',
      updatesIncluded: 'All Modeboard 1.x updates',
      trialDays: 14,
      activation: 'Offline signed access code — no account or internet connection required to verify your license',
      updateMechanism: 'Sparkle, with user-controlled automatic checks plus a manual Check for Updates command',
      refundPolicy:
        'Tideframe Labs offers a refund within 14 days of purchase. Before requesting a refund for a technical issue, customers may be asked to provide basic system information or try reasonable troubleshooting steps. This policy does not limit rights provided by applicable consumer law.',
    },
  },
]

export const featuredProduct = products.find((product) => product.featured) ?? products[0]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
