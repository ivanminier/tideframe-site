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

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const distDir = join(root, 'dist')
const templatePath = join(distDir, 'index.html')

const SITE_URL = 'https://tideframelabs.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/social-preview.png`

// Mirrors src/data/structuredData.ts's organizationSchema — see the cross-reference
// comment there. Injected on every generated route, matching what Layout.tsx also
// injects client-side for every route.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tideframe Labs',
  url: SITE_URL,
  description: 'Independent Mac software built in Vermont.',
  email: 'hello@tideframelabs.com',
  founder: { '@type': 'Person', name: 'Ivan Minier' },
}

function readRouteMeta() {
  const raw = readFileSync(join(root, 'src/data/route-meta.json'), 'utf8')
  return JSON.parse(raw)
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
  const url = `${SITE_URL}${routePath === '/' ? '' : routePath}`
  const title = escapeHtmlAttr(entry.title)
  const description = escapeHtmlAttr(entry.description)

  let html = template
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${title}</title>`)
  html = replaceTag(html, /<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
  html = replaceTag(html, /<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
  html = replaceTag(html, /<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = replaceTag(html, /<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
  html = replaceTag(html, /<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
  html = replaceTag(html, /<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
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

  for (const [routePath, entry] of Object.entries(routeMeta)) {
    if (routePath === '/') {
      // The root route is dist/index.html itself — no separate file needed.
      // (It still gets the site-wide Organization JSON-LD injected via Layout.tsx client-side.)
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
