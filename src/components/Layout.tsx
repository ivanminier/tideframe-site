import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { appleNotice, siteConfig } from '../config'
import { footerNav, headerNav } from '../data/nav'
import { organizationSchema } from '../data/structuredData'
import { Logo } from './Logo'

export function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    let tag = document.getElementById('org-jsonld')
    if (!tag) {
      tag = document.createElement('script')
      tag.id = 'org-jsonld'
      tag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(tag)
    }
    tag.textContent = JSON.stringify(organizationSchema)
  }, [])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container nav-wrap">
          <Logo />
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
            <span className="sr-only">Toggle navigation</span><span /><span />
          </button>
          <nav id="site-nav" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
            {headerNav.map((link) => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
          </nav>
        </div>
      </header>
      <main id="main"><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div><Logo inverted /><p>{siteConfig.descriptor}</p></div>
          {footerNav.map((group) => (
            <nav aria-label={`${group.heading} links`} key={group.heading}>
              <p className="footer-nav-heading">{group.heading}</p>
              {group.links.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
            </nav>
          ))}
          <div className="footer-contact"><span>Say hello</span><a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a></div>
        </div>
        <div className="container footer-bottom"><p>{siteConfig.copyright}</p><p>{appleNotice}</p></div>
      </footer>
    </div>
  )
}
