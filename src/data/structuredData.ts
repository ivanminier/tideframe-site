import { siteConfig } from '../config'
import { commerceConfig, getVerifiedCheckoutUrl } from './commerce'
import { getPublicRelease, type Product } from './products'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.company,
  url: siteConfig.siteUrl,
  description: siteConfig.descriptor,
  email: siteConfig.generalEmail,
  founder: { '@type': 'Person', name: siteConfig.founder },
}

// Deliberately omits `aggregateRating` always — this site never publishes ratings
// it can't back up. `offers` is included only once both the release and the allowlisted
// merchant checkout pass their independent fail-closed validators. Schema.org's Offer
// implies something is actually for sale, so pricing alone is never enough.
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
