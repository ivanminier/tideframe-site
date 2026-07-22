import modeboardProduct from './modeboard-product.json'
import { validateReleaseData } from './releaseValidation.mjs'

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
 * Populating commercial terms does not activate checkout or a download. The release
 * validator and the separate commerce configuration both fail closed.
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
  /** Perpetual-use and major-version policy. */
  perpetualAccess: string
  /** Full-feature trial length in days, or null if there is no trial. */
  trialDays: number | null
  /** How a public paid license is activated and used offline afterward. */
  activation: string
  /** Merchant of record for public paid licenses. */
  merchantOfRecord: string
  /** Supported Focus integration wording. */
  focusIntegration: string
  /** How the app checks for/installs updates, e.g. "Sparkle 2, user-controlled automatic checks plus a manual Check for Updates command." */
  updateMechanism: string | null
  /** Exact refund policy wording — do not paraphrase; this is reviewed business language. */
  refundPolicy: string
}

export type ArchitectureSupport = 'supported' | 'included-not-runtime-tested' | 'unsupported' | 'not-yet-verified'

export interface ProductRelease {
  downloadUrl: string | null
  version: string | null
  buildNumber: string | null
  fileSizeBytes: number | null
  sha256: string | null
  minimumMacOSVersion: string
  testedMacOSVersions: string[]
  releaseDate: string | null
  bundleIdentifier: string | null
  developerIdSigned: boolean
  notarized: boolean
  architectures: {
    appleSilicon: ArchitectureSupport
    intel: ArchitectureSupport
  }
  requiredPermissions: string[]
  appcast: {
    url: string | null
    validSparkleXML: boolean
    xmlContentTypeVerified: boolean
    signedReleaseEntry: boolean
    archiveMatchesRelease: boolean
    productionPublicKeyConfigured: boolean
    updateFromPreviousBuildTested: boolean
  }
  undocumentedBehavior: string
  animatedWallpaperLimitations: string
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
  /** A download is exposed only when every field passes validateReleaseConfiguration. */
  release: ProductRelease
  /** Featured products are highlighted on the homepage. */
  featured: boolean
  accent: ProductAccent
  /** The intended pricing/licensing model — see ProductCommercial's own doc comment. */
  commercial: ProductCommercial | null
}

export const products: Product[] = [modeboardProduct as Product]

export const featuredProduct = products.find((product) => product.featured) ?? products[0]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export interface ReleaseValidation {
  isReady: boolean
  errors: string[]
}

export function validateReleaseConfiguration(product: Product, now = new Date()): ReleaseValidation {
  return validateReleaseData(product, now)
}

export function validateAppcastConfiguration(product: Product): ReleaseValidation {
  const errors: string[] = []
  const appcast = product.release.appcast
  if (!appcast.url) errors.push('Production appcast URL is missing.')
  if (!appcast.validSparkleXML) errors.push('Production appcast is not verified as valid Sparkle XML.')
  if (!appcast.xmlContentTypeVerified) errors.push('Production appcast XML content type is not verified.')
  if (!appcast.signedReleaseEntry) errors.push('Production appcast does not have a verified signed release entry.')
  if (!appcast.archiveMatchesRelease) errors.push('Production appcast archive is not verified against the release.')
  if (!appcast.productionPublicKeyConfigured) errors.push('Production Sparkle public key is not verified.')
  if (!appcast.updateFromPreviousBuildTested) errors.push('Installed N to N+1 update is not verified.')
  return { isReady: errors.length === 0, errors }
}

export function getPublicRelease(product: Product): ProductRelease | null {
  return validateReleaseConfiguration(product).isReady ? product.release : null
}

export function formatFileSize(bytes: number): string {
  const megabytes = bytes / 1_000_000
  return `${megabytes >= 10 ? megabytes.toFixed(1) : megabytes.toFixed(2)} MB`
}
