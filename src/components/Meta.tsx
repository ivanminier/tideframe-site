import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../config'

const DEFAULT_OG_IMAGE = '/social-preview.svg'

function ensureMetaTag(selector: string, create: () => Element) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = create()
    document.head.appendChild(tag)
  }
  return tag
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  const tag = ensureMetaTag(`meta[${attr}="${key}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute(attr, key)
    return el
  })
  tag.setAttribute('content', content)
}

function setCanonical(href: string) {
  const tag = ensureMetaTag('link[rel="canonical"]', () => {
    const el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    return el
  })
  tag.setAttribute('href', href)
}

function setJsonLd(id: string, data: Record<string, unknown>) {
  let tag = document.getElementById(id)
  if (!tag) {
    tag = document.createElement('script')
    tag.id = id
    tag.setAttribute('type', 'application/ld+json')
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(data)
}

export function Meta({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  structuredData,
}: {
  title: string
  description: string
  /** Overrides the route path used for canonical/og:url. Defaults to the current location. */
  path?: string
  /** Public path or absolute URL. Defaults to the site-wide social preview image. */
  ogImage?: string
  noindex?: boolean
  structuredData?: Record<string, unknown>
}) {
  const location = useLocation()
  const routePath = path ?? location.pathname

  useEffect(() => {
    const url = `${siteConfig.siteUrl}${routePath === '/' ? '' : routePath}`
    const absoluteImage = ogImage.startsWith('http') ? ogImage : `${siteConfig.siteUrl}${ogImage}`

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', absoluteImage)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', absoluteImage)
    setCanonical(url)

    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow')
    } else {
      document.querySelector('meta[name="robots"]')?.remove()
    }

    if (structuredData) {
      setJsonLd('page-jsonld', structuredData)
    } else {
      document.getElementById('page-jsonld')?.remove()
    }

    return () => {
      document.getElementById('page-jsonld')?.remove()
    }
  }, [title, description, routePath, ogImage, noindex, structuredData])

  return null
}
