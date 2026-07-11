import { siteConfig } from '../config'
import type { Product } from './products'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.company,
  url: siteConfig.siteUrl,
  description: siteConfig.descriptor,
  email: siteConfig.generalEmail,
  founder: { '@type': 'Person', name: siteConfig.founder },
}

// Deliberately omits `offers` and `aggregateRating` — both are optional in the
// schema.org spec, and this site never publishes pricing or ratings it can't back up.
export function buildSoftwareApplicationSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: product.minimumOS ?? product.platforms.join(', '),
    url: `${siteConfig.siteUrl}${product.route}`,
    ...(product.version ? { softwareVersion: product.version } : {}),
  }
}
