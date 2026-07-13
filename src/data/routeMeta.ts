import rawRouteMeta from './route-meta.json'

export interface RouteMetaEntry {
  /** On-page H1 text, when it differs from the full <title>. Omitted for routes with custom hero copy. */
  h1?: string
  /** Full <title> / og:title / twitter:title text. */
  title: string
  description: string
  /** Route-specific social image. Defaults to the site-wide card. */
  ogImage?: string
  /** Static JSON-LD payload for this route, if any (currently only /modeboard). */
  structuredData?: Record<string, unknown>
}

/**
 * Single source of truth for critical-route metadata, shared by the React app
 * (via Meta/Page components) and scripts/generate-static-meta.mjs, which reads
 * the same src/data/route-meta.json file to bake this into generated HTML at
 * build time. Keep this file and route-meta.json's shape in sync.
 */
export const routeMeta: Record<string, RouteMetaEntry> = rawRouteMeta as Record<string, RouteMetaEntry>

export function getRouteMeta(path: string): RouteMetaEntry {
  const entry = routeMeta[path]
  if (!entry) {
    throw new Error(`No route metadata registered for "${path}" — add an entry to src/data/route-meta.json`)
  }
  return entry
}
