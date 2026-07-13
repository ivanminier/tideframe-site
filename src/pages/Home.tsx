import { Link } from 'react-router-dom'
import { GlassPanel } from '../components/GlassPanel'
import { Meta } from '../components/Meta'
import { PlatformBadge } from '../components/PlatformBadge'
import { ProductCard } from '../components/ProductCard'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { SectionHeading } from '../components/SectionHeading'
import { siteConfig } from '../config'
import { featuredProduct, products } from '../data/products'
import { getRouteMeta } from '../data/routeMeta'
import { useImageFallback } from '../hooks/useImageFallback'
import { useReveal } from '../hooks/useReveal'

const meta = getRouteMeta('/')

const FUTURE_PLATFORMS = ['iPhone', 'iPad', 'Apple Watch', 'Apple TV', 'iMessage', 'Android', 'Web'] as const

function HeroIcon() {
  const { state, onLoad, onError } = useImageFallback()
  return (
    <div className="hero-icon" aria-hidden="true">
      {state !== 'error' ? (
        <img src="/tideframe-icon-glossy.png" alt="" width="128" height="128" onLoad={onLoad} onError={onError} />
      ) : (
        <div className="tide-art"><div className="sun" /><span /><span /><span /><span /></div>
      )}
    </div>
  )
}

export function Home() {
  const intro = useReveal<HTMLElement>()
  const featured = useReveal<HTMLElement>()
  const philosophy = useReveal<HTMLElement>()
  const grid = useReveal<HTMLElement>()
  const future = useReveal<HTMLElement>()
  const privacy = useReveal<HTMLElement>()
  const about = useReveal<HTMLElement>()
  const contact = useReveal<HTMLElement>()

  return (
    <>
      <Meta title={meta.title} description={meta.description} />

      <section className="hero-section home-hero">
        <span className="glow glow--pacific glow--top-right" aria-hidden="true" />
        <span className="glow glow--coral glow--bottom-left" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Tideframe Labs</p>
            <h1>Thoughtful software for a more personal Mac.</h1>
            <p className="lede">
              Tideframe Labs is an independent software studio designing focused, native software for personal
              technology — starting with the Mac.
            </p>
            <div className="actions">
              <Link className="button" to="/modeboard">
                Explore Modeboard <span>→</span>
              </Link>
              <Link className="text-link" to="/about">
                About Tideframe Labs <span>→</span>
              </Link>
            </div>
          </div>
          <HeroIcon />
        </div>
      </section>

      <section className="section studio-intro" ref={intro.ref}>
        <div className={`container narrow${intro.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Independent, by design</p>
          <h2>One person, one focus at a time.</h2>
          <p className="lede">
            Tideframe Labs is run by Ivan Minier. There's no product-management team or growth target to hit —
            just software built carefully, released when it's ready, and supported directly by the person who
            made it.
          </p>
        </div>
      </section>

      <section className="product-intro section" ref={featured.ref}>
        <div className={`container split${featured.visible ? ' reveal is-visible' : ' reveal'}`}>
          <div>
            <p className="eyebrow">Our first application</p>
            <h2>Modeboard</h2>
            <p className="display-copy">{featuredProduct.tagline}</p>
            <p>{featuredProduct.description}</p>
            <Link className="text-link" to="/modeboard">
              Meet Modeboard <span>→</span>
            </Link>
          </div>
          <ProductScreenshot
            src="modeboard-overview"
            alt="Modeboard overview window listing saved profiles for work, rest, and study."
            aspectRatio="1400 / 1056"
            width={1400}
            height={1056}
            hasThumbnail
            priority
          />
        </div>
      </section>

      <section className="principles section" ref={philosophy.ref}>
        <div className={`container${philosophy.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Made with intention</p>
          <h2>Software should feel at home on your Mac.</h2>
          <div className="three-up">
            <article>
              <span>01</span>
              <h3>Focused</h3>
              <p>Tools built around a clear purpose, without unnecessary complexity.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Native</h3>
              <p>Designed for the platform, with familiar interactions and thoughtful details.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Personal</h3>
              <p>Software that adapts to how you work while keeping you in control.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt" ref={grid.ref}>
        <div className={`container${grid.visible ? ' reveal is-visible' : ' reveal'}`}>
          <SectionHeading eyebrow="Products" title="What Tideframe Labs makes" description="One product so far. See it grow at the products page." />
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" ref={future.ref}>
        <div className={`container narrow${future.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Where this is headed</p>
          <h2>Built for the Mac first. Designed with more in mind.</h2>
          <p className="lede">
            Tideframe Labs is starting with the Mac because that's where the studio's first idea belongs. Personal
            technology extends well beyond it, and future products may too.
          </p>
          <div className="future-platforms" aria-label="Platforms Tideframe Labs may build for in the future">
            {FUTURE_PLATFORMS.map((platform) => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
          </div>
          <p className="fine-print">
            None of these are available today. This list describes a direction, not a current product — Tideframe
            Labs will only claim a platform once something real ships for it.
          </p>
        </div>
      </section>

      <section className="privacy-band section" ref={privacy.ref}>
        <div className={`container split${privacy.visible ? ' reveal is-visible' : ' reveal'}`}>
          <div>
            <p className="eyebrow">Private, native, and yours</p>
            <h2>No accounts. No analytics. No compromise on feel.</h2>
          </div>
          <p>
            This website and every Tideframe Labs product are built without analytics, tracking, or accounts.
            Software here is written natively for its platform rather than wrapped from a cross-platform
            framework, so it should feel like it belongs on your Mac — not like a website pretending to be an
            app.
          </p>
        </div>
      </section>

      <section className="section section-alt" ref={about.ref}>
        <div className={`container narrow${about.visible ? ' reveal is-visible' : ' reveal'}`}>
          <GlassPanel>
            <p className="eyebrow">About</p>
            <h2>A small studio for thoughtful Mac software.</h2>
            <p>
              Ivan Minier is the independent developer and designer behind Tideframe Labs. Modeboard is the
              studio's first product, built from a personal itch to make Focus modes feel like they change more
              than a wallpaper.
            </p>
            <Link className="text-link" to="/about">
              More about Tideframe Labs <span>→</span>
            </Link>
          </GlassPanel>
        </div>
      </section>

      <section className="cta section" ref={contact.ref}>
        <div className={`container centered${contact.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Get in touch</p>
          <h2>Questions, feedback, or press?</h2>
          <p>
            Email <a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a>, or visit{' '}
            <Link to="/support">Support</Link> for Modeboard help.
          </p>
        </div>
      </section>
    </>
  )
}
