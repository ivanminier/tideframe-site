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

// Deliberately omits `aggregateRating` always — this site never publishes ratings
// it can't back up. `offers` is included only once the product is genuinely available
// to download (status === 'available' AND a real downloadUrl exists) — schema.org's
// Offer implies something is actually for sale right now, so adding it earlier would
// be a false availability claim, even if pricing itself is already decided.
//
// NOTE: the prerendered static HTML for /modeboard (see scripts/generate-static-meta.mjs)
// embeds a snapshot of this same JSON-LD in src/data/route-meta.json, since that build
// script runs in plain Node and can't import this TS module. If you change a Product
// field that feeds this schema (name, description, minimumOS, version, commercial,
// status, downloadUrl), also update the "structuredData" block for "/modeboard" in
// src/data/route-meta.json to match — including adding/removing "offers" there too.
export function buildSoftwareApplicationSchema(product: Product) {
  const isGenuinelyAvailable = product.status === 'available' && !!product.downloadUrl

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: product.minimumOS ?? product.platforms.join(', '),
    url: `${siteConfig.siteUrl}${product.route}`,
    ...(product.version ? { softwareVersion: product.version } : {}),
    ...(isGenuinelyAvailable && product.commercial
      ? {
          offers: {
            '@type': 'Offer',
            price: product.commercial.priceUSD,
            priceCurrency: 'USD',
            url: `${siteConfig.siteUrl}${product.route}`,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  }
}
