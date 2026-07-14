import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { launchUpdatesMailto } from '../config'
import { getRouteMeta } from '../data/routeMeta'
import { useReveal } from '../hooks/useReveal'

const meta = getRouteMeta('/')

export function Home() {
  const featured = useReveal<HTMLElement>()
  const principles = useReveal<HTMLElement>()
  const contact = useReveal<HTMLElement>()

  return (
    <>
      <Meta title={meta.title} description={meta.description} />

      <section className="hero-section home-hero">
        <span className="glow glow--pacific glow--top-right" aria-hidden="true" />
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Independent Mac software from Vermont</p>
            <h1>Thoughtful tools for a Mac that works your way.</h1>
            <p className="lede">
              Tideframe Labs makes focused Mac apps that simplify everyday digital spaces. Our first app,
              Modeboard, turns your workspace settings into profiles you can switch in a moment.
            </p>
            <div className="actions">
              <Link className="button" to="/modeboard">Explore Modeboard <span>→</span></Link>
              <Link className="text-link" to="/about">Meet Tideframe Labs <span>→</span></Link>
            </div>
          </div>
          <div className="hero-icon">
            <img
              src="/tideframe-icon-glossy.png"
              alt="Tideframe Labs glossy wave icon"
              width="512"
              height="512"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="product-intro section" ref={featured.ref}>
        <div className={`container${featured.visible ? ' reveal is-visible' : ' reveal'}`}>
          <div className="featured-product-grid">
            <div className="featured-product-copy">
              <div className="featured-product-heading">
                <img src="/modeboard-icon.png" alt="" width="72" height="72" aria-hidden="true" />
                <div>
                  <p className="eyebrow">Featured product · Coming soon for Mac</p>
                  <h2>One profile. Your whole Mac, ready.</h2>
                </div>
              </div>
              <p className="lede">
                Switch your wallpaper, Dock, appearance, menu bar, and Desktop together. Save each setup as a
                profile for work, studying, relaxing, travel, or anything else.
              </p>
              <Link className="text-link" to="/modeboard">Learn how Modeboard works <span>→</span></Link>
            </div>
            <ProductScreenshot
              src="modeboard-profile-overview"
              alt="Modeboard profile editor showing Default, Do Not Disturb, Work, Sleep, Travel, and College profiles alongside Apply Now and wallpaper controls."
              caption="Build each profile around the part of your day it belongs to."
              aspectRatio="1600 / 1207"
              width={1600}
              height={1207}
              hasThumbnail
              thumbnailWidth={800}
              sizes="(max-width: 800px) 92vw, 600px"
            />
          </div>

          <div className="benefit-list benefit-list--three" aria-label="Modeboard benefits">
            <article><span>01</span><h3>Switch your workspace together</h3><p>Wallpaper, Dock, appearance, menu bar, and Desktop settings move as one.</p></article>
            <article><span>02</span><h3>Apply it your way</h3><p>Switch from Modeboard, the menu bar, Apple Shortcuts, or a Focus Filter.</p></article>
            <article><span>03</span><h3>Backed up before every change</h3><p>Modeboard creates a safety backup before applying a profile.</p></article>
          </div>
        </div>
      </section>

      <section className="principles section" ref={principles.ref}>
        <div className={`container${principles.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">How Tideframe builds</p>
          <h2>Calm on the surface. Considered underneath.</h2>
          <div className="three-up">
            <article><span>01</span><h3>Made for the Mac</h3><p>Native controls and familiar behavior make every app feel at home on macOS.</p></article>
            <article><span>02</span><h3>Private by default</h3><p>Your profiles and backups stay on your Mac, without analytics, advertising, or tracking.</p></article>
            <article><span>03</span><h3>Powerful without the noise</h3><p>Everyday actions stay simple, with deeper controls ready when you need them.</p></article>
          </div>
        </div>
      </section>

      <section className="cta section" ref={contact.ref}>
        <div className={`container centered${contact.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Modeboard is coming soon for Mac.</h2>
          <p>Get launch updates when downloads and final compatibility details are available.</p>
          <a className="button" href={launchUpdatesMailto}>Get launch updates <span>→</span></a>
        </div>
      </section>
    </>
  )
}
