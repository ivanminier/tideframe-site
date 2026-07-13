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
import { getRouteMeta } from '../data/routeMeta'
import { buildSoftwareApplicationSchema } from '../data/structuredData'

const meta = getRouteMeta('/modeboard')
const commercial = featuredProduct.commercial

const FEATURES = [
  {
    title: 'One profile, your whole workspace',
    text: 'Save a collection of Mac settings as one profile, then move between work, rest, study, and everything in between.',
    screenshot: {
      id: 'modeboard-profile-editor',
      alt: 'Modeboard profile editor showing wallpaper, Dock, and appearance settings grouped under one profile.',
      aspectRatio: '1400 / 1056',
      width: 1400,
      height: 1056,
      hasThumbnail: true,
    },
  },
  {
    title: 'Wallpaper that matches the moment',
    text: "Pair each profile with a still or animated wallpaper. Animated wallpapers require Modeboard to keep running — quitting the app stops the animation.",
    screenshot: {
      id: 'modeboard-wallpaper',
      alt: 'Modeboard wallpaper picker showing still and animated wallpaper options for a profile.',
      aspectRatio: '1400 / 1056',
      width: 1400,
      height: 1056,
      hasThumbnail: true,
    },
  },
  {
    title: 'A Dock for every context',
    text: 'Keep the apps you need close at hand. Each profile can bring its own Dock arrangement, size, and behavior.',
    screenshot: {
      id: 'modeboard-dock',
      alt: 'Modeboard Dock settings showing a custom app arrangement saved to a profile.',
      aspectRatio: '1400 / 1056',
      width: 1400,
      height: 1056,
      hasThumbnail: true,
    },
  },
  {
    title: 'A cleaner Desktop',
    text: 'Choose which Desktop items are visible for each context, so the space in front of you stays relevant.',
    screenshot: {
      id: 'modeboard-desktop',
      alt: 'Modeboard Desktop settings showing which Desktop items are visible for a profile.',
      aspectRatio: '1400 / 1056',
      width: 1400,
      height: 1056,
      hasThumbnail: true,
    },
  },
  {
    title: 'Switch from the menu bar',
    text: 'Switch profiles from a menu bar dropdown without opening the app, or automate switching through Shortcuts.',
    screenshot: {
      id: 'modeboard-menu-bar',
      alt: 'Modeboard menu bar dropdown showing Switch Profile, Settings, and Emergency Restore.',
      aspectRatio: '524 / 444',
      width: 524,
      height: 444,
      hasThumbnail: false,
    },
  },
  {
    title: 'Backups and Emergency Restore',
    text: "Modeboard saves a snapshot of your settings before applying a profile, and includes an Emergency Restore option to help undo a change that didn't go as expected.",
    screenshot: {
      id: 'modeboard-backup-restore',
      alt: 'Modeboard backup and restore screen showing a snapshot of settings saved before a profile was applied.',
      aspectRatio: '1400 / 1056',
      width: 1400,
      height: 1056,
      hasThumbnail: true,
    },
  },
] as const

const FAQS = [
  {
    q: 'Is Modeboard available yet?',
    a: 'Not yet. Modeboard is in active development for macOS — there is no signed, downloadable build yet. This page will be updated with a real download link when one exists.',
  },
  {
    q: 'How much will Modeboard cost?',
    a: "The planned price is $14.99 as a one-time purchase (introductory — it may change later), with a 14-day full-feature trial. There's no subscription. Nothing is chargeable yet since Modeboard isn't available to buy.",
  },
  {
    q: 'How many Macs can I use one license on?',
    a: 'One person, on up to three personally controlled Macs.',
  },
  {
    q: 'Do I need an account to activate Modeboard?',
    a: "No. Modeboard activates with an offline signed access code — verifying your license doesn't need an account or an internet connection. Checking for app updates does need an internet connection, separately from license activation.",
  },
  {
    q: "What's included in the price after I buy?",
    a: 'All Modeboard 1.x updates are included at no extra cost. A future major version (2.0 or later) may be offered as a separate purchase.',
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
        title={meta.title}
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
            {commercial ? (
              <span className="meta-chip">
                ${commercial.priceUSD} {commercial.introductoryPrice ? 'introductory ' : ''}· one-time · {commercial.trialDays}-day trial
              </span>
            ) : null}
            {featuredProduct.platforms.map((platform) => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
          </div>
          <DownloadButton
            downloadUrl={featuredProduct.downloadUrl}
            status={featuredProduct.status}
            productName={featuredProduct.name}
          />
          {!featuredProduct.downloadUrl ? (
            <a className="text-link" href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20beta%20interest`}>
              Ask about beta access <span>→</span>
            </a>
          ) : null}
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
                width={feature.screenshot.width}
                height={feature.screenshot.height}
                hasThumbnail={feature.screenshot.hasThumbnail}
              />
            </div>
          </section>
        ))}
      </div>

      {commercial ? (
        <section className="section section-alt">
          <div className="container narrow">
            <p className="eyebrow">Pricing</p>
            <h2>One license. No subscription.</h2>
            <p className="lede">
              Try every feature free for {commercial.trialDays} days, then buy once to keep it. Modeboard is a{' '}
              {commercial.introductoryPrice ? 'one-time purchase — no monthly fee, ever.' : 'one-time purchase.'}
            </p>
            <ul>
              <li>
                <strong>{commercial.trialDays}-day free trial</strong> — every feature unlocked, no credit card
                required to start.
              </li>
              <li>
                <strong>
                  ${commercial.priceUSD} {commercial.introductoryPrice ? 'introductory price' : 'price'}
                </strong>{' '}
                — a one-time purchase, not a subscription.
                {commercial.introductoryPrice ? ' This introductory price may change later.' : ''}
              </li>
              <li>
                <strong>{commercial.licenseScope}.</strong> Activate the same license on each Mac you personally
                use.
              </li>
              <li>
                <strong>{commercial.updatesIncluded} are included</strong> at no extra cost. A future major version
                (2.0 or later) may be offered as a separate purchase.
              </li>
            </ul>
          </div>
        </section>
      ) : null}

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

      {commercial ? (
        <section className="section">
          <div className="container narrow">
            <p className="eyebrow">Activation &amp; updates</p>
            <h2>Verified on your Mac. Updated on your terms.</h2>
            <p>
              Modeboard activates with <strong>{commercial.activation.toLowerCase()}</strong> — checking your
              license doesn't need an internet connection or an account.
            </p>
            {commercial.updateMechanism ? (
              <p>
                Updates use <strong>{commercial.updateMechanism}</strong>. Checking for updates — manually or
                automatically — does need an internet connection, since it has to ask Tideframe Labs' update
                feed whether a newer version exists; your license itself is never involved in that check.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="privacy-band section">
        <div className="container split">
          <div>
            <p className="eyebrow">Private and local by default</p>
            <h2>Your profiles stay on your Mac.</h2>
          </div>
          <p>
            Modeboard works without an account, analytics, or advertising. Your profile information, backups,
            and license are stored and verified locally on your device. The only network requests Modeboard
            makes are update checks — manual or automatic — which ask Tideframe Labs' update feed whether a
            newer version exists.
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
            <li>Checking for updates needs an internet connection; verifying your license does not.</li>
            <li>Modeboard is pre-release — behavior, defaults, and feature names may still change before release.</li>
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
          {featuredProduct.downloadUrl && featuredProduct.version ? (
            <p className="fine-print">Version {featuredProduct.version}</p>
          ) : null}
          {featuredProduct.downloadUrl && featuredProduct.sha256 ? (
            <p className="fine-print">
              SHA-256: <code>{featuredProduct.sha256}</code>
            </p>
          ) : null}
          <div className="actions cta-links">
            {!featuredProduct.downloadUrl ? (
              <a className="text-link" href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20beta%20interest`}>
                Ask about beta access <span>→</span>
              </a>
            ) : null}
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
