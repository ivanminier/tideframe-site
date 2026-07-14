import { Link } from 'react-router-dom'
import { DownloadButton } from '../components/DownloadButton'
import { Meta } from '../components/Meta'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { siteConfig } from '../config'
import { featuredProduct } from '../data/products'
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
            <p className="eyebrow">Tideframe Labs · Independent Mac software</p>
            <h1>Focused tools for a Mac that fits your day.</h1>
            <p className="lede">
              Tideframe Labs is an independent software studio in Vermont. Its first app, Modeboard,
              turns the Mac settings that shape your workspace into profiles you can apply together.
            </p>
            <div className="actions">
              <Link className="button" to="/modeboard">Explore Modeboard <span>→</span></Link>
              <Link className="text-link" to="/about">About Tideframe Labs <span>→</span></Link>
            </div>
          </div>
          <ProductScreenshot
            src="modeboard-profile-overview"
            alt="Modeboard's Default profile editor showing profile identity, Focus fallback, wallpaper capture, and Apply Now controls."
            aspectRatio="1600 / 1207"
            width={1600}
            height={1207}
            hasThumbnail
            thumbnailWidth={800}
            priority
          />
        </div>
      </section>

      <section className="product-intro section" ref={featured.ref}>
        <div className={`container split${featured.visible ? ' reveal is-visible' : ' reveal'}`}>
          <div>
            <p className="eyebrow">Meet Modeboard</p>
            <h2>One profile. Your whole Mac, ready.</h2>
            <p className="lede">
              Build profiles for work, rest, travel, study, or anything else. Each profile changes only
              the settings you choose, and settings left unchanged are skipped.
            </p>
            <div className="actions compact-actions">
              <Link className="text-link" to="/modeboard">See how Modeboard works <span>→</span></Link>
              <DownloadButton product={featuredProduct} className="button button-small" />
            </div>
          </div>
          <div className="benefit-list" aria-label="Modeboard highlights">
            <article><span>01</span><h3>Shape the workspace</h3><p>Switch wallpaper, Dock, appearance, menu bar, and Desktop settings together.</p></article>
            <article><span>02</span><h3>Switch your way</h3><p>Use Apply Now, the menu-bar menu, Apple Shortcuts, or a Focus Filter.</p></article>
            <article><span>03</span><h3>Change with confidence</h3><p>Modeboard creates a safety backup before every profile apply.</p></article>
          </div>
        </div>
      </section>

      <section className="principles section" ref={principles.ref}>
        <div className={`container${principles.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Made with care</p>
          <h2>Native, focused, and easy to trust.</h2>
          <div className="three-up">
            <article><span>01</span><h3>Made for the Mac</h3><p>Familiar controls and a native interface keep Modeboard at home on macOS.</p></article>
            <article><span>02</span><h3>Private by default</h3><p>Profiles and backups stay on your Mac. No account, analytics, advertising, or tracking.</p></article>
            <article><span>03</span><h3>Honest availability</h3><p>Modeboard is coming soon. No public download or purchase is offered before the release is ready.</p></article>
          </div>
        </div>
      </section>

      <section className="cta section" ref={contact.ref}>
        <div className={`container centered${contact.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Modeboard is coming soon</p>
          <h2>Make your Mac fit the moment.</h2>
          <p>Explore the product now, or email {siteConfig.supportEmail} with a question about the upcoming release.</p>
          <div className="actions cta-links">
            <Link className="button" to="/modeboard">Explore Modeboard <span>→</span></Link>
            <a className="text-link" href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20launch%20updates`}>
              Ask about launch updates <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
