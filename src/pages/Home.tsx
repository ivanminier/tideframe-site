import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { siteConfig } from '../config'
import { getRouteMeta } from '../data/routeMeta'
import { useImageFallback } from '../hooks/useImageFallback'
import { useReveal } from '../hooks/useReveal'

const meta = getRouteMeta('/')

function HeroIcon() {
  const { state, onLoad, onError } = useImageFallback()
  return (
    <div className="hero-icon" aria-hidden="true">
      {state !== 'error' ? (
        <img src="/tideframe-mark.svg" alt="" width="128" height="128" onLoad={onLoad} onError={onError} />
      ) : (
        <div className="tide-art"><div className="sun" /><span /><span /><span /><span /></div>
      )}
    </div>
  )
}

export function Home() {
  const intro = useReveal<HTMLElement>()
  const featured = useReveal<HTMLElement>()
  const principles = useReveal<HTMLElement>()
  const privacy = useReveal<HTMLElement>()
  const contact = useReveal<HTMLElement>()

  return (
    <>
      <Meta title={meta.title} description={meta.description} />

      <section className="hero-section home-hero">
        <span className="glow glow--pacific glow--top-right" aria-hidden="true" />
        <span className="glow glow--coral glow--bottom-left" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Independent Mac software</p>
            <h1>Make your Mac work more like you do.</h1>
            <p className="lede">
              Tideframe Labs builds focused Mac apps that make everyday workflows easier to shape, switch, and manage.
            </p>
            <div className="actions">
              <Link className="button" to="/modeboard">Explore Modeboard <span>→</span></Link>
              <Link className="text-link" to="/about">About the studio <span>→</span></Link>
            </div>
          </div>
          <HeroIcon />
        </div>
      </section>

      <section className="section studio-intro" ref={intro.ref}>
        <div className={`container narrow${intro.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Built independently in Vermont</p>
          <h2>Useful software, made with a clear point of view.</h2>
          <p className="lede">
            Tideframe Labs is an independent software studio created by Ivan Minier. Its first release,
            Modeboard, started with a simple idea: changing Focus modes should be able to change more than notifications.
          </p>
        </div>
      </section>

      <section className="product-intro section" ref={featured.ref}>
        <div className={`container split${featured.visible ? ' reveal is-visible' : ' reveal'}`}>
          <div>
            <p className="eyebrow">Meet Modeboard</p>
            <h2>A workspace for every part of your day.</h2>
            <p>
              Modeboard saves your wallpaper, Dock, appearance, menu bar, and Desktop setup as profiles you can switch together.
            </p>
            <Link className="text-link" to="/modeboard">See how Modeboard works <span>→</span></Link>
          </div>
          <ProductScreenshot
            src="modeboard-profile-editor"
            alt="Modeboard profile editor showing a Do Not Disturb profile with wallpaper and automation settings."
            aspectRatio="1400 / 1056"
            width={1400}
            height={1056}
            hasThumbnail
            priority
          />
        </div>
      </section>

      <section className="principles section" ref={principles.ref}>
        <div className={`container${principles.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">What matters here</p>
          <h2>Focused, familiar, and easy to trust.</h2>
          <div className="three-up">
            <article><span>01</span><h3>Clear purpose</h3><p>Each product starts with one useful job and stays focused on doing it well.</p></article>
            <article><span>02</span><h3>Made for the Mac</h3><p>Native controls and familiar interactions help the software feel at home from the first launch.</p></article>
            <article><span>03</span><h3>Respect for your data</h3><p>Modeboard works without an account, analytics, advertising, or cloud storage for your profiles.</p></article>
          </div>
        </div>
      </section>

      <section className="privacy-band section" ref={privacy.ref}>
        <div className={`container split${privacy.visible ? ' reveal is-visible' : ' reveal'}`}>
          <div><p className="eyebrow">Mac first</p><h2>Built for the platform where it belongs.</h2></div>
          <p>Modeboard is built for the Mac. Future Tideframe Labs products will be announced when they are ready.</p>
        </div>
      </section>

      <section className="cta section" ref={contact.ref}>
        <div className={`container centered${contact.visible ? ' reveal is-visible' : ' reveal'}`}>
          <p className="eyebrow">Get in touch</p>
          <h2>Questions, feedback, or press?</h2>
          <p>Email <a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a>, or visit <Link to="/support">Support</Link> for Modeboard help.</p>
        </div>
      </section>
    </>
  )
}
