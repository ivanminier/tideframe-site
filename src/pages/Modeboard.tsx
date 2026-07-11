import { Link } from 'react-router-dom'
import { DownloadButton } from '../components/DownloadButton'
import { FeatureVisual } from '../components/FeatureVisual'
import { Meta } from '../components/Meta'
import { PlatformBadge } from '../components/PlatformBadge'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { ScreenshotGallery } from '../components/ScreenshotGallery'
import { StatusBadge } from '../components/StatusBadge'
import { siteConfig } from '../config'
import { modeboardScreenshots } from '../data/modeboard-screenshots'
import { featuredProduct } from '../data/products'
import { buildSoftwareApplicationSchema } from '../data/structuredData'

const FEATURES = [
  {
    title: 'One profile, your whole workspace',
    text: 'Save a collection of Mac settings as one profile, then move between work, rest, study, and everything in between.',
    screenshot: {
      id: 'modeboard-profile-editor',
      alt: 'Modeboard profile editor showing wallpaper, Dock, and appearance settings grouped under one profile.',
      aspectRatio: '2184 / 1648',
    },
  },
  {
    title: 'Wallpaper that matches the moment',
    text: "Pair each profile with a still or animated wallpaper. Animated wallpapers require Modeboard to keep running — quitting the app stops the animation.",
    screenshot: {
      id: 'modeboard-wallpaper',
      alt: 'Modeboard wallpaper picker showing still and animated wallpaper options for a profile.',
      aspectRatio: '2184 / 1648',
    },
  },
  {
    title: 'A Dock for every context',
    text: 'Keep the apps you need close at hand. Each profile can bring its own Dock arrangement, size, and behavior.',
    screenshot: {
      id: 'modeboard-dock',
      alt: 'Modeboard Dock settings showing a custom app arrangement saved to a profile.',
      aspectRatio: '2184 / 1648',
    },
  },
  {
    title: 'A cleaner Desktop',
    text: 'Choose which Desktop items are visible for each context, so the space in front of you stays relevant.',
    screenshot: {
      id: 'modeboard-desktop',
      alt: 'Modeboard Desktop settings showing which Desktop items are visible for a profile.',
      aspectRatio: '2184 / 1648',
    },
  },
  {
    title: 'Switch from the menu bar',
    text: 'Switch profiles from a menu bar dropdown without opening the app, or automate switching through Shortcuts.',
    screenshot: {
      id: 'modeboard-menu-bar',
      alt: 'Modeboard menu bar icon open, showing a dropdown for switching profiles without opening the app.',
      aspectRatio: '552 / 876',
    },
  },
  {
    title: 'Backups and Emergency Restore',
    text: "Modeboard saves a snapshot of your settings before applying a profile, and includes an Emergency Restore option to help undo a change that didn't go as expected.",
    screenshot: {
      id: 'modeboard-backup-restore',
      alt: 'Modeboard backup and restore screen showing a snapshot of settings saved before a profile was applied.',
      aspectRatio: '2184 / 1648',
    },
  },
] as const

const FAQS = [
  {
    q: 'Is Modeboard available yet?',
    a: 'Not yet. Modeboard is in active development for macOS. This page will be updated with a real download link when it is ready.',
  },
  {
    q: 'Will Modeboard cost anything?',
    a: "Pricing hasn't been decided or announced. It will be published here before release, not after.",
  },
  {
    q: 'Does Modeboard need an account?',
    a: 'No. Modeboard is designed to work without an account, analytics, or a remote service.',
  },
  {
    q: 'Is it safe to let Modeboard change my system settings?',
    a: "Modeboard creates a backup before applying a profile and includes Emergency Restore to help undo changes. That said, applying a profile does change real macOS system preferences and Finder settings, and Modeboard can't guarantee every change is perfectly reversible in every situation.",
  },
  {
    q: 'What is Focus Filter support?',
    a: "An experimental way to trigger a Modeboard profile automatically when a macOS Focus turns on. It relies on Apple's Focus Filter APIs, which may change, so it may need adjustments as macOS updates.",
  },
  {
    q: 'Will Modeboard come to iPhone or iPad?',
    a: "There's no announced plan for that yet. Modeboard is a Mac application first; see the homepage for how Tideframe Labs thinks about other platforms.",
  },
] as const

export function Modeboard() {
  return (
    <>
      <Meta
        title="Modeboard by Tideframe Labs"
        description={featuredProduct.description}
        structuredData={buildSoftwareApplicationSchema(featuredProduct)}
      />

      <section className="hero-section product-hero">
        <span className="glow glow--pacific glow--top-right" aria-hidden="true" />
        <div className="container centered">
          <p className="eyebrow">Modeboard by Tideframe Labs</p>
          <h1>
            Every Focus deserves
            <br />
            its own Mac.
          </h1>
          <p className="lede">{featuredProduct.description}</p>
          <div className="product-hero-meta">
            {featuredProduct.status !== 'coming-soon' ? <StatusBadge status={featuredProduct.status} /> : null}
            {featuredProduct.version ? <span className="meta-chip">Version {featuredProduct.version}</span> : null}
            {featuredProduct.platforms.map((platform) => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
          </div>
          <DownloadButton
            downloadUrl={featuredProduct.downloadUrl}
            status={featuredProduct.status}
            productName={featuredProduct.name}
          />
          {featuredProduct.minimumOS ? (
            <p className="compat-brief">In development for {featuredProduct.minimumOS}</p>
          ) : null}
          <FeatureVisual type="hero" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">A closer look</p>
          <h2>See Modeboard in action.</h2>
          <ScreenshotGallery items={modeboardScreenshots} />
        </div>
      </section>

      <div className="feature-list">
        {FEATURES.map((feature, i) => (
          <section className="feature-row section" key={feature.title}>
            <div className={`container split ${i % 2 ? 'reverse' : ''}`}>
              <div className="feature-copy">
                <p className="feature-number">0{i + 1}</p>
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </div>
              <ProductScreenshot
                src={feature.screenshot.id}
                alt={feature.screenshot.alt}
                aspectRatio={feature.screenshot.aspectRatio}
              />
            </div>
          </section>
        ))}
      </div>

      <section className="section">
        <div className="container narrow">
          <p className="eyebrow">Automation</p>
          <h2>Switch manually, or let macOS do it.</h2>
          <p>
            Profiles switch manually from the app or the menu bar, or through Shortcuts for scripted automation.
            Modeboard can also switch automatically when a macOS Focus turns on, using{' '}
            <strong>experimental Focus Filter support</strong>. This integration depends on Apple's Focus Filter
            APIs and may change or need updates as macOS evolves — it should be treated as a convenience, not a
            guarantee.
          </p>
        </div>
      </section>

      <section className="privacy-band section">
        <div className="container split">
          <div>
            <p className="eyebrow">Private and local by default</p>
            <h2>Your profiles stay on your Mac.</h2>
          </div>
          <p>
            Modeboard is designed to work without an account, analytics, or a remote service. Your profile
            information and backups are stored locally on your device.
          </p>
        </div>
      </section>

      <section className="compatibility section">
        <div className="container narrow">
          <p className="eyebrow">Compatibility</p>
          <h2>Built for current versions of macOS.</h2>
          <p>
            Modeboard is being developed for {featuredProduct.minimumOS ?? 'a recent version of macOS'}. Final
            compatibility details will be published after release-candidate testing.
          </p>
          <aside>
            <strong>A note about system changes</strong>
            <p>
              Modeboard changes macOS system preferences and Finder settings on your Mac. It creates a backup
              before applying profiles and includes recovery tools, but some behavior depends on macOS
              implementation details that Apple may change in future updates.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <p className="eyebrow">Known limitations</p>
          <h2>What Modeboard doesn't do yet — or can't promise.</h2>
          <ul>
            <li>Animated wallpapers only animate while Modeboard is running; quitting the app stops the animation.</li>
            <li>Focus Filter automation is experimental and depends on Apple APIs that may change between macOS versions.</li>
            <li>Some system-preference and Finder behavior Modeboard relies on are implementation details Apple could change, which may affect how a profile applies.</li>
            <li>Modeboard backs up your settings before changing them, but restoring every change perfectly in every situation isn't guaranteed.</li>
            <li>Modeboard is pre-release — behavior, defaults, and feature names may still change before 1.0.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <p className="eyebrow">FAQ</p>
          <h2>Common questions</h2>
          <dl className="faq-list">
            {FAQS.map((item) => (
              <div className="faq-item" key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cta section">
        <div className="container centered">
          <p className="eyebrow">Modeboard</p>
          <h2>Make your Mac match the moment.</h2>
          <p>Modeboard is still in development. Release details will be shared here and in the changelog when it's ready.</p>
          <DownloadButton
            downloadUrl={featuredProduct.downloadUrl}
            status={featuredProduct.status}
            productName={featuredProduct.name}
          />
          <div className="actions cta-links">
            <Link className="text-link" to="/support">
              Support <span>→</span>
            </Link>
            <Link className="text-link" to="/changelog">
              Changelog <span>→</span>
            </Link>
            <a className="text-link" href={`mailto:${siteConfig.supportEmail}`}>
              Email support <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
