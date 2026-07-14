import { Link } from 'react-router-dom'
import { DownloadButton } from '../components/DownloadButton'
import { Meta } from '../components/Meta'
import { PlatformBadge } from '../components/PlatformBadge'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { siteConfig } from '../config'
import { featuredProduct } from '../data/products'
import { getRouteMeta } from '../data/routeMeta'
import { buildSoftwareApplicationSchema } from '../data/structuredData'

const meta = getRouteMeta('/modeboard')

const PROFILE_SETTINGS = [
  ['Wallpaper', 'Use a still image, an animated GIF or video, or a captured Apple/system wallpaper.'],
  ['Dock', 'Set its size, position, visibility, magnification, and pinned items.'],
  ['Appearance', 'Choose Light or Dark mode plus accent and highlight colors.'],
  ['Menu bar', 'Control menu bar visibility and supported menu bar items.'],
  ['Desktop', 'Show or hide existing Desktop icons and place custom Desktop shortcuts.'],
] as const

const FAQS = [
  {
    q: 'Is Modeboard available now?',
    a: 'Not yet. Modeboard is coming soon, and there is no public download or purchase on this site today.',
  },
  {
    q: 'Does Modeboard read all of my existing Focus modes?',
    a: 'No. You add a Modeboard Focus Filter to a Focus in macOS System Settings, then choose the profile that Focus should use.',
  },
  {
    q: 'What happens to settings I do not configure?',
    a: 'They are skipped. A profile changes only the settings you explicitly choose.',
  },
  {
    q: 'What happens when Modeboard quits?',
    a: 'Static and captured Apple/system wallpapers remain applied. Animated GIF and video wallpapers stop playing when Modeboard quits.',
  },
] as const

function WideScreenshot({
  src,
  alt,
  caption,
  sizes,
}: {
  src: string
  alt: string
  caption?: string
  sizes?: string
}) {
  return (
    <ProductScreenshot
      src={src}
      alt={alt}
      caption={caption}
      aspectRatio="1600 / 1207"
      width={1600}
      height={1207}
      hasThumbnail
      thumbnailWidth={800}
      sizes={sizes}
    />
  )
}

export function Modeboard() {
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
          <h1>One profile. Your whole Mac, ready.</h1>
          <p className="lede">
            Create profiles for the Mac settings that shape your workspace, then apply the right setup
            for work, rest, travel, study, or whatever comes next.
          </p>
          <div className="product-hero-meta">
            <span className="meta-chip">Coming Soon</span>
            {featuredProduct.platforms.map((platform) => <PlatformBadge key={platform} platform={platform} />)}
          </div>
          <DownloadButton product={featuredProduct} />
          <p className="compat-brief">No public download or purchase is available yet.</p>
        </div>
        <div className="container product-hero-shot">
          <WideScreenshot
            src="modeboard-profile-overview"
            alt="Modeboard's Default profile editor showing profile identity, Focus fallback, captured wallpaper, and Apply Now controls."
            caption="A profile changes only the settings you configure."
            sizes="(max-width: 800px) 92vw, 1040px"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="what-modeboard-does">
        <div className="container narrow centered">
          <p className="eyebrow">What Modeboard does</p>
          <h2 id="what-modeboard-does">Make your Mac fit the moment.</h2>
          <p className="lede">
            Modeboard brings the visual and practical parts of a workspace into one reusable profile.
            Choose what should change, leave everything else alone, and select Apply Now when you are ready.
          </p>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="profile-settings">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What a profile can change</p>
            <h2 id="profile-settings">The settings that define your space.</h2>
            <p>Every category is optional. Settings left unchanged are skipped when a profile is applied.</p>
          </div>
          <div className="change-grid">
            {PROFILE_SETTINGS.map(([title, text]) => (
              <article key={title}><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="screenshot-pair">
            <WideScreenshot
              src="modeboard-appearance-dock"
              alt="Modeboard profile controls for Light appearance, accent and highlight colors, Dock size, position, visibility, magnification, and pinned items."
              caption="Appearance and Dock controls live together inside each profile."
            />
            <WideScreenshot
              src="modeboard-menu-bar-desktop"
              alt="Modeboard controls for supported menu bar items, menu bar visibility, Desktop icon visibility, and custom Desktop shortcuts."
              caption="Choose which menu bar and Desktop elements belong in the profile."
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="apply-profiles">
        <div className="container split">
          <div className="feature-copy">
            <p className="eyebrow">How profiles are applied</p>
            <h2 id="apply-profiles">Switch in the way that suits you.</h2>
            <p>
              Select Apply Now in Modeboard, choose a profile from the menu-bar menu, or use Modeboard actions
              in Apple Shortcuts. Each route applies the same profile you configured in the app.
            </p>
            <div className="menu-shot-wrap">
              <ProductScreenshot
                src="modeboard-menu-bar-menu"
                alt="Modeboard's menu-bar menu showing Switch Profile, Settings, Open Focus Settings, Emergency Restore, and Quit Modeboard."
                aspectRatio="588 / 444"
                width={588}
                height={444}
              />
            </div>
          </div>
          <WideScreenshot
            src="modeboard-getting-started"
            alt="Modeboard's Getting Started screen explaining how to create and apply a profile, add a Focus Filter, switch from the menu bar, and use Apple Shortcuts."
            caption="Modeboard keeps manual, menu-bar, Shortcuts, and Focus switching in one clear setup guide."
          />
        </div>
      </section>

      <section className="section focus-section" aria-labelledby="focus-switching">
        <div className="container split reverse">
          <div className="feature-copy">
            <p className="eyebrow">Focus integration</p>
            <h2 id="focus-switching">Switch automatically with a Focus Filter.</h2>
            <p>
              In macOS System Settings, open a Focus, add a Modeboard Focus Filter, and choose the profile to use.
              Modeboard does not automatically import, detect, or read every Focus mode.
            </p>
          </div>
          <WideScreenshot
            src="modeboard-onboarding-focus"
            alt="Modeboard onboarding instructions for opening macOS Focus settings, choosing a Focus, and adding a Modeboard Focus Filter with a selected profile."
            caption="You decide which Focus uses Modeboard and which profile it should apply."
          />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="safety-recovery">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Safety and recovery</p>
            <h2 id="safety-recovery">A way forward, and a way back.</h2>
            <p>
              Modeboard creates a safety backup before applying a profile. Emergency Restore restores the latest
              safety backup, while Diagnostics shows what happened without exposing personal file contents.
            </p>
          </div>
          <div className="screenshot-pair">
            <WideScreenshot
              src="modeboard-backups-restore"
              alt="Modeboard's Backups and Restore screen with backup retention, Emergency Restore, and a list of safety backups created before profile applies."
              caption="Review retained backups or restore the latest one in an emergency."
            />
            <WideScreenshot
              src="modeboard-diagnostics"
              alt="Modeboard's Diagnostics screen showing system information and successful results for the latest profile apply."
              caption="Diagnostics makes each profile step visible and exportable for support."
            />
          </div>
        </div>
      </section>

      <section className="privacy-band section" aria-labelledby="animated-wallpapers">
        <div className="container split">
          <div>
            <p className="eyebrow">Animated wallpaper behavior</p>
            <h2 id="animated-wallpapers">Motion while Modeboard is running.</h2>
          </div>
          <div>
            <p>GIF and video wallpapers play while Modeboard is running. Quitting Modeboard stops animated wallpapers.</p>
            <p>Static images and captured Apple/system wallpapers remain applied after Modeboard quits.</p>
          </div>
        </div>
      </section>

      <section className="compatibility section" aria-labelledby="availability">
        <div className="container narrow">
          <p className="eyebrow">Compatibility and availability</p>
          <h2 id="availability">Coming soon for macOS.</h2>
          <p>
            Modeboard is being prepared for macOS {featuredProduct.release.minimumMacOSVersion} and later.
            Final supported macOS versions and Mac architectures will be published only after the public release
            build is signed, notarized, and tested.
          </p>
          <dl className="compatibility-grid">
            <div><dt>Current availability</dt><dd>Coming Soon</dd></div>
            <div><dt>Public download</dt><dd>Not yet available</dd></div>
            <div><dt>Purchasing</dt><dd>Not enabled</dd></div>
            <div><dt>Automatic updates</dt><dd>No production service enabled</dd></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <p className="eyebrow">FAQ</p>
          <h2>Common questions</h2>
          <dl className="faq-list">
            {FAQS.map((item) => <div className="faq-item" key={item.q}><dt>{item.q}</dt><dd>{item.a}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="cta section">
        <div className="container centered">
          <p className="eyebrow">Modeboard is coming soon</p>
          <h2>One profile. Your whole Mac, ready.</h2>
          <p>No public download or purchase is available yet. Release details will appear here when they are ready.</p>
          <DownloadButton product={featuredProduct} />
          <div className="actions cta-links">
            <a className="text-link" href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20launch%20updates`}>
              Ask about launch updates <span>→</span>
            </a>
            <Link className="text-link" to="/support">Read support information <span>→</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}
