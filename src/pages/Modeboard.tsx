import { Link } from 'react-router-dom'
import { DownloadButton } from '../components/DownloadButton'
import { Meta } from '../components/Meta'
import { PlatformBadge } from '../components/PlatformBadge'
import { PurchaseButton } from '../components/PurchaseButton'
import { ReleaseDetails } from '../components/ReleaseDetails'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { StatusBadge } from '../components/StatusBadge'
import { siteConfig } from '../config'
import { featuredProduct } from '../data/products'
import { getPublicRelease } from '../data/products'
import { getRouteMeta } from '../data/routeMeta'
import { buildSoftwareApplicationSchema } from '../data/structuredData'

const meta = getRouteMeta('/modeboard')
const commercial = featuredProduct.commercial

const FEATURES = [
  {
    title: 'One profile, your whole workspace',
    text: 'Save the Mac settings you use for work, study, rest, or anything else, then switch them together.',
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
    text: 'Pair each profile with a still or animated wallpaper that fits the context.',
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
    text: 'Switch profiles from the menu bar without opening the main window, or build your own workflows with Shortcuts.',
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
    text: 'Modeboard saves a snapshot before applying a profile. Emergency Restore gives you a direct way back if something does not look right.',
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
    a: "The intended launch offer is $14.99 as a one-time purchase, with a 14-day full-feature trial. There is no subscription and nothing is available to buy yet.",
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
    a: 'Modeboard creates a backup before applying a profile and includes Emergency Restore. Because it changes real macOS and Finder settings, keeping a separate Mac backup is still a good idea.',
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
  const release = getPublicRelease(featuredProduct)

  return (
    <>
      <Meta
        title={meta.title}
        description={featuredProduct.description}
        ogImage="/modeboard-social-preview.png"
        structuredData={buildSoftwareApplicationSchema(featuredProduct)}
      />

      <section className="hero-section product-hero">
        <span className="glow glow--pacific glow--top-right" aria-hidden="true" />
        <div className="container centered">
          <p className="eyebrow">Modeboard by Tideframe Labs</p>
          <h1>Switch your whole Mac with one profile.</h1>
          <p className="lede">{featuredProduct.description}</p>
          <div className="product-hero-meta">
            {featuredProduct.status !== 'coming-soon' ? <StatusBadge status={featuredProduct.status} /> : null}
            {release ? <span className="meta-chip">Version {release.version} ({release.buildNumber})</span> : null}
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
            product={featuredProduct}
          />
          {!release ? (
            <a className="text-link" href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20beta%20interest`}>
              Ask about beta or launch access <span>→</span>
            </a>
          ) : null}
          <p className="compat-brief">Minimum target: macOS {featuredProduct.release.minimumMacOSVersion} or later</p>
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
              At release, Modeboard is intended to include a {commercial.trialDays}-day full-feature trial and a{' '}
              {commercial.introductoryPrice ? 'one-time introductory price.' : 'one-time price.'}
            </p>
            <ul>
              <li>
                <strong>{commercial.trialDays}-day trial</strong> with every feature available.
              </li>
              <li>
                <strong>
                  ${commercial.priceUSD} {commercial.introductoryPrice ? 'introductory price' : 'price'}
                </strong>{' '}
                as a one-time purchase, not a subscription.
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
            <PurchaseButton />
            <p className="fine-print">Checkout will be hosted by a merchant of record. Tideframe Labs will not collect raw card details.</p>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container narrow">
          <p className="eyebrow">Automation</p>
          <h2>Switch manually, or let macOS do it.</h2>
          <p>
            Profiles switch manually from the app or the menu bar, or through Shortcuts for scripted automation.
            Modeboard can also switch automatically when a macOS Focus turns on. This Focus Filter integration
            is experimental because it depends on Apple APIs that may change with macOS updates.
          </p>
        </div>
      </section>

      {commercial ? (
        <section className="section">
          <div className="container narrow">
            <p className="eyebrow">Activation &amp; updates</p>
            <h2>Verified on your Mac. Updated on your terms.</h2>
            <p>
              Modeboard is designed to activate with <strong>{commercial.activation.toLowerCase()}</strong>. Checking your
              license doesn't need an internet connection or an account.
            </p>
            {commercial.updateMechanism ? (
              <p>
                Updates use <strong>{commercial.updateMechanism}</strong>. Manual and automatic checks contact the
                Tideframe Labs update feed; license verification remains offline.
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
          <h2>Supported means tested.</h2>
          <p>
            The minimum target is macOS {featuredProduct.release.minimumMacOSVersion}. Public release-candidate testing
            is not complete, so no specific macOS release, Apple silicon Mac, or Intel Mac is being claimed as verified yet.
          </p>
          <dl className="compatibility-grid">
            <div><dt>Minimum supported</dt><dd>macOS {featuredProduct.release.minimumMacOSVersion} or later</dd></div>
            <div><dt>Versions tested</dt><dd>{featuredProduct.release.testedMacOSVersions.length ? featuredProduct.release.testedMacOSVersions.join(', ') : 'Release-candidate testing pending'}</dd></div>
            <div><dt>Apple silicon</dt><dd>Release-candidate verification pending</dd></div>
            <div><dt>Intel</dt><dd>Release-candidate verification pending</dd></div>
          </dl>
          <aside>
            <strong>macOS-dependent behavior</strong>
            <p>{featuredProduct.release.undocumentedBehavior} Support for future macOS releases is evaluated and announced after testing, not guaranteed in advance.</p>
          </aside>
        </div>
      </section>

      <section className="good-to-know-section">
        <div className="container narrow good-to-know">
          <p className="eyebrow">Good to know</p>
          <h2>A few details before you get started.</h2>
          <ul className="compact-list">
            <li>{featuredProduct.release.animatedWallpaperLimitations}</li>
            <li>Focus Filter automation is experimental and may change with macOS updates.</li>
            <li>{featuredProduct.release.requiredPermissions.join('. ')}.</li>
            <li>Modeboard backs up supported settings before applying a profile, with Emergency Restore available if something does not look right.</li>
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
          <p>Modeboard is still in development. Release details will be posted here when Modeboard is ready.</p>
          <DownloadButton
            product={featuredProduct}
          />
          {release ? <ReleaseDetails release={release} /> : null}
          <div className="actions cta-links">
            {!release ? (
              <a className="text-link" href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20beta%20interest`}>
                Ask about beta or launch access <span>→</span>
              </a>
            ) : null}
            <Link className="text-link" to="/support">
              Support <span>→</span>
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
