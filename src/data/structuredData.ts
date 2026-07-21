import { siteConfig } from '../config'
import { commerceConfig, getVerifiedCheckoutUrl } from './commerce'
import { getPublicRelease, type Product } from './products'

const ORGANIZATION_ID = `${siteConfig.siteUrl}/#organization`

// Verified facts only. Deliberately omits address, phone, founding date, employee
// count, legal registration, awards, and `sameAs` — Tideframe Labs has no official
// public social profiles to point at, and an unverifiable property here is worse
// than an absent one. Add `sameAs` only when a real, official profile exists.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: siteConfig.company,
  alternateName: 'Tideframe',
  url: `${siteConfig.siteUrl}/`,
  logo: `${siteConfig.siteUrl}/tideframe-icon-glossy.png`,
  description: siteConfig.descriptor,
  email: siteConfig.supportEmail,
  founder: { '@type': 'Person', name: siteConfig.founder },
}

// Homepage-only. Helps Google resolve the site name shown above search results.
// No `potentialAction`/SearchAction — this site has no search endpoint to declare.
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.siteUrl}/#website`,
  name: siteConfig.company,
  alternateName: 'Tideframe',
  url: `${siteConfig.siteUrl}/`,
  description: siteConfig.descriptor,
  publisher: { '@id': ORGANIZATION_ID },
}

// Deliberately omits `aggregateRating` and `review` always — this site never publishes
// ratings, reviews, or user counts it can't back up, and inventing them to chase a rich
// result would be fabrication. `offers` is included only once both the release and the
// allowlisted merchant checkout pass their independent fail-closed validators.
// Schema.org's Offer implies something is actually for sale, so pricing alone is never
// enough; `downloadUrl` likewise waits for a real signed artifact.
//
// `operatingSystem` reflects the declared minimum deployment target, which is a verified
// build setting and is already stated in visible page copy. `softwareVersion` stays gated
// on the release validator because no build has shipped yet.
//
// The static metadata generator reads the same product, commerce, and validator sources,
// so release facts are never copied into route metadata by hand.
export function buildSoftwareApplicationSchema(product: Product) {
  const release = getPublicRelease(product)
  const checkoutUrl = getVerifiedCheckoutUrl(commerceConfig)

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: `macOS ${product.release.minimumMacOSVersion} or later`,
    url: `${siteConfig.siteUrl}${product.route}`,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    ...(release?.version ? { softwareVersion: release.version } : {}),
    ...(release && checkoutUrl && product.status === 'available' && product.commercial
      ? {
          offers: {
            '@type': 'Offer',
            price: product.commercial.priceUSD,
            priceCurrency: 'USD',
            url: checkoutUrl,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  }
}
