// Generates real, pre-rendered HTML for critical routes so search engines and
// social-media crawlers see correct <title>/meta/canonical/JSON-LD without running
// JavaScript first. This is intentionally NOT full SSR — it clones dist/index.html
// (already a complete, working SPA shell) and swaps a handful of <head> tags per
// route using plain string replacement. React still boots normally in the browser,
// and src/components/Meta.tsx keeps metadata correct during client-side navigation.
//
// Single source of truth: src/data/route-meta.json (also imported by the React app
// via src/data/routeMeta.ts) — edit that file, not the strings in this script.
//
// Runs as part of `npm run build` (see package.json), after `vite build`.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateReleaseData } from '../src/data/releaseValidation.mjs'
import { getVerifiedCheckoutUrlData } from '../src/data/commerceValidation.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const distDir = join(root, 'dist')
const templatePath = join(distDir, 'index.html')

const SITE_URL = 'https://tideframelabs.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/social-preview.png`

const ORGANIZATION_ID = `${SITE_URL}/#organization`

// Mirrors src/data/structuredData.ts's organizationSchema — see the cross-reference
// comment there. Injected on every generated route, matching what Layout.tsx also
// injects client-side for every route. Keep both in sync.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Tideframe Labs',
  alternateName: 'Tideframe',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/tideframe-icon-glossy.png`,
  description: 'Independent Mac software built in Vermont.',
  email: 'support@tideframelabs.com',
  founder: { '@type': 'Person', name: 'Ivan Minier' },
}

// Mirrors src/data/structuredData.ts's webSiteSchema. Homepage only.
const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Tideframe Labs',
  alternateName: 'Tideframe',
  url: `${SITE_URL}/`,
  description: 'Independent Mac software built in Vermont.',
  publisher: { '@id': ORGANIZATION_ID },
}

function readRouteMeta() {
  const raw = readFileSync(join(root, 'src/data/route-meta.json'), 'utf8')
  const routeMeta = JSON.parse(raw)
  const product = JSON.parse(readFileSync(join(root, 'src/data/modeboard-product.json'), 'utf8'))
  const commerce = JSON.parse(readFileSync(join(root, 'src/data/commerce-config.json'), 'utf8'))
  routeMeta['/modeboard'].structuredData = buildSoftwareApplicationSchema(product, commerce)
  routeMeta['/'].structuredData = webSiteSchema
  return routeMeta
}

function buildSoftwareApplicationSchema(product, commerce) {
  const release = product.release
  const releaseComplete = validateReleaseData(product).isReady
  const checkoutUrl = getVerifiedCheckoutUrlData(commerce)

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: `macOS ${release.minimumMacOSVersion} or later`,
    url: `${SITE_URL}${product.route}`,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    ...(releaseComplete ? { softwareVersion: release.version } : {}),
    ...(releaseComplete && checkoutUrl && product.status === 'available' && product.commercial
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

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Expected to find pattern ${pattern} in the HTML template, but it was missing.`)
  }
  return html.replace(pattern, replacement)
}

function escapeHtmlAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function buildRouteHtml(template, routePath, entry) {
  // Root keeps its trailing slash so the canonical matches the sitemap entry exactly.
  const url = `${SITE_URL}${routePath}`
  const title = escapeHtmlAttr(entry.title)
  const description = escapeHtmlAttr(entry.description)
  const image = entry.ogImage ? `${SITE_URL}${entry.ogImage}` : DEFAULT_OG_IMAGE

  let html = template
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${title}</title>`)
  html = replaceTag(html, /<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
  html = replaceTag(html, /<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
  html = replaceTag(html, /<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = replaceTag(html, /<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
  html = replaceTag(html, /<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`)
  html = replaceTag(html, /<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
  html = replaceTag(html, /<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
  html = replaceTag(html, /<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image}" />`)
  html = replaceTag(html, /<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)

  // IDs must match src/components/Layout.tsx ("org-jsonld") and Meta.tsx ("page-jsonld") exactly —
  // both look up these elements by id and update their content in place rather than creating a
  // second script tag, so client-side hydration doesn't duplicate what's already in the static HTML.
  const scripts = [
    { id: 'org-jsonld', data: organizationSchema },
    entry.structuredData ? { id: 'page-jsonld', data: entry.structuredData } : null,
  ].filter(Boolean)
  const jsonLdTags = scripts
    .map(({ id, data }) => `<script id="${id}" type="application/ld+json">${JSON.stringify(data)}</script>`)
    .join('\n    ')
  html = html.replace('</head>', `    ${jsonLdTags}\n  </head>`)

  return html
}

function main() {
  if (!existsSync(templatePath)) {
    console.error(`generate-static-meta: ${templatePath} not found — run "vite build" first.`)
    process.exit(1)
  }

  const template = readFileSync(templatePath, 'utf8')
  const routeMeta = readRouteMeta()
  const results = []

  const rootHtml = buildRouteHtml(template, '/', routeMeta['/'])
  writeFileSync(templatePath, rootHtml, 'utf8')
  results.push({ routePath: '/', outFile: templatePath, bytes: Buffer.byteLength(rootHtml) })

  for (const [routePath, entry] of Object.entries(routeMeta)) {
    if (routePath === '/') {
      continue
    }
    const html = buildRouteHtml(template, routePath, entry)
    const outDir = join(distDir, routePath.replace(/^\//, ''))
    const outFile = join(outDir, 'index.html')
    mkdirSync(outDir, { recursive: true })
    writeFileSync(outFile, html, 'utf8')
    results.push({ routePath, outFile, bytes: Buffer.byteLength(html) })
  }

  console.log('generate-static-meta: wrote pre-rendered metadata for critical routes:')
  for (const r of results) {
    console.log(`  ${r.routePath.padEnd(12)} -> dist${r.outFile.slice(distDir.length)} (${r.bytes} bytes)`)
  }
  console.log(`generate-static-meta: default og:image is ${DEFAULT_OG_IMAGE}`)
}

main()
