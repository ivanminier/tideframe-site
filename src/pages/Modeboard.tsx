import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { PlatformBadge } from '../components/PlatformBadge'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { launchUpdatesMailto } from '../config'
import { featuredProduct } from '../data/products'
import { getRouteMeta } from '../data/routeMeta'
import { buildSoftwareApplicationSchema } from '../data/structuredData'

const meta = getRouteMeta('/modeboard')

const USE_CASES = ['Work', 'School and studying', 'Relaxing', 'Travel', 'Personal projects'] as const

const PROFILE_SETTINGS = [
  ['Wallpaper', 'Still images, animated GIF or video, and captured Apple/system wallpapers.'],
  ['Appearance', 'Light or Dark mode with the accent and highlight colors you choose.'],
  ['Dock', 'Size, position, visibility, magnification, and the apps you keep pinned.'],
  ['Menu bar', 'Menu bar visibility and the supported items you want available.'],
  ['Desktop', 'Existing Desktop icons and custom shortcuts for the files and folders you need.'],
] as const

const FAQS = [
  {
    q: 'What happens to settings I leave alone?',
    a: 'Modeboard skips them. Each profile changes only the settings you choose to configure.',
  },
  {
    q: 'How does Focus switching work?',
    a: 'Add a Modeboard Focus Filter to the Focus modes you choose in System Settings, then select the profile each one should apply.',
  },
  {
    q: 'What happens to an animated wallpaper when Modeboard quits?',
    a: 'Animated GIF and video wallpapers stop playing. Static images and captured system wallpapers remain applied.',
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
            Switch your wallpaper, Dock, appearance, menu bar, and Desktop together. Save each setup as a profile,
            then apply it whenever your day changes.
          </p>
          <p className="product-hero-detail">
            Switch manually, from the menu bar, with Apple Shortcuts, or automatically through a Focus Filter.
          </p>
          <div className="product-hero-meta">
            <span className="meta-chip">Coming soon for Mac</span>
            {featuredProduct.platforms.map((platform) => <PlatformBadge key={platform} platform={platform} />)}
          </div>
          <a className="button" href={launchUpdatesMailto}>Get launch updates <span>→</span></a>
        </div>
        <div className="container product-hero-shot">
          <WideScreenshot
            src="modeboard-profile-overview"
            alt="Modeboard profile editor showing Default, Do Not Disturb, Work, Sleep, Travel, and College profiles alongside Apply Now and wallpaper controls."
            caption="Create a profile for each part of your day, then apply it whenever you need it."
            sizes="(max-width: 800px) 92vw, 1040px"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="use-cases">
        <div className="container narrow centered">
          <p className="eyebrow">Built around your day</p>
          <h2 id="use-cases">Your Mac, set up for what comes next.</h2>
          <p className="lede">
            Create a setup for each part of your day. Modeboard changes only the settings you choose and leaves
            everything else alone.
          </p>
          <ul className="use-case-list" aria-label="Example Modeboard profiles">
            {USE_CASES.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="profile-settings">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What a profile can change</p>
            <h2 id="profile-settings">The details that make a Mac feel like yours.</h2>
            <p>Choose a few settings or shape the whole setup. Anything you leave unchanged stays just as it is.</p>
          </div>
          <div className="change-grid">
            {PROFILE_SETTINGS.map(([title, text]) => (
              <article key={title}><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <div className="product-feature-shot">
            <WideScreenshot
              src="modeboard-appearance-dock"
              alt="Modeboard profile controls for Light appearance, accent and highlight colors, Dock size, position, visibility, magnification, and pinned apps."
              caption="Fine-tune appearance and Dock settings inside the same profile."
              sizes="(max-width: 800px) 92vw, 1040px"
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="apply-profiles">
        <div className="container split">
          <div className="feature-copy">
            <p className="eyebrow">Apply it your way</p>
            <h2 id="apply-profiles">Switch whenever your day changes.</h2>
            <p>
              Select Apply Now in Modeboard, choose a profile from the menu-bar menu, use a Modeboard action in
              Apple Shortcuts, or connect a profile to a Focus Filter.
            </p>
            <div className="menu-shot-wrap">
              <ProductScreenshot
                src="modeboard-menu-bar-menu"
                alt="Modeboard menu-bar menu with Switch Profile, Settings, Open Focus Settings, Emergency Restore, and Quit Modeboard."
                caption="Your profiles stay close at hand in the menu bar."
                aspectRatio="588 / 444"
                width={588}
                height={444}
              />
            </div>
          </div>
          <WideScreenshot
            src="modeboard-getting-started"
            alt="Modeboard Getting Started screen explaining how to create a profile, apply it, connect a Focus Filter, and use the menu bar or Apple Shortcuts."
            caption="A built-in guide keeps every switching option easy to find."
          />
        </div>
      </section>

      <section className="section focus-section" aria-labelledby="focus-switching">
        <div className="container split reverse">
          <div className="feature-copy">
            <p className="eyebrow">Automatic switching</p>
            <h2 id="focus-switching">Let Focus handle the switch.</h2>
            <p>
              Connect only the Focus modes you choose. Add a Modeboard Focus Filter in System Settings, then select
              the profile it should apply.
            </p>
          </div>
          <WideScreenshot
            src="modeboard-onboarding-focus"
            alt="Modeboard onboarding with three steps for opening Focus settings, choosing a Focus, and adding a Modeboard Focus Filter with a selected profile."
            caption="Choose the Focus, choose the profile, and let Modeboard take it from there."
          />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="safety-recovery">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Backups &amp; Restore</p>
            <h2 id="safety-recovery">Change things with confidence.</h2>
            <p>
              Before Modeboard applies a profile, it creates a safety backup of the settings it can restore.
              Emergency Restore brings back the latest backup whenever you need it.
            </p>
          </div>
          <div className="screenshot-pair">
            <WideScreenshot
              src="modeboard-backups-restore"
              alt="Modeboard Backups and Restore screen showing backup retention, Emergency Restore, and backup history."
              caption="Keep a clear history of safety backups and restore the latest one in a moment."
            />
            <WideScreenshot
              src="modeboard-onboarding-ready"
              alt="Modeboard onboarding completion screen explaining profile switching, automatic safety backups, and Emergency Restore."
              caption="Safety is introduced from the first run, not hidden in a manual."
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="advanced-controls">
        <div className="container split">
          <div className="feature-copy">
            <p className="eyebrow">More room to make it yours</p>
            <h2 id="advanced-controls">Powerful without getting in the way.</h2>
            <p>
              Fine-tune Dock pins, menu-bar items, appearance colors, Desktop shortcuts, and animated wallpapers.
              Modeboard keeps the everyday flow simple while giving advanced Mac users room to make each profile their own.
            </p>
            <h3>Bring your wallpaper to life</h3>
            <p>
              Animated GIF and video wallpapers play while Modeboard is running. Static and captured system
              wallpapers remain after they are applied.
            </p>
            <p>
              Built-in diagnostics show which profile steps succeeded and create a privacy-conscious report when
              support is needed.
            </p>
          </div>
          <WideScreenshot
            src="modeboard-menu-bar-desktop"
            alt="Modeboard controls for supported menu-bar items, menu bar visibility, Desktop icon visibility, and custom Desktop shortcuts."
            caption="Advanced controls are available when you want them and stay out of the way when you do not."
          />
        </div>
      </section>

      <section className="privacy-band section" aria-labelledby="private-local">
        <div className="container split">
          <div>
            <p className="eyebrow">Private and local</p>
            <h2 id="private-local">Your profiles stay yours.</h2>
          </div>
          <div>
            <p>Modeboard works without an account. Profiles, wallpaper files, app preferences, and safety backups stay on your Mac.</p>
            <p>There is no analytics, advertising, or tracking.</p>
          </div>
        </div>
      </section>

      <section className="compatibility section" aria-labelledby="availability">
        <div className="container narrow centered">
          <p className="eyebrow">Stay in the loop</p>
          <h2 id="availability">Coming soon for Mac.</h2>
          <p>
            Modeboard is currently being prepared for release on macOS {featuredProduct.release.minimumMacOSVersion} and later.
            Final compatibility, pricing, and download details will be shared at launch.
          </p>
          <a className="button" href={launchUpdatesMailto}>Get launch updates <span>→</span></a>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <p className="eyebrow">Good to know</p>
          <h2>Common questions</h2>
          <dl className="faq-list">
            {FAQS.map((item) => <div className="faq-item" key={item.q}><dt>{item.q}</dt><dd>{item.a}</dd></div>)}
          </dl>
          <div className="actions compact-actions">
            <Link className="text-link" to="/support">Contact support <span>→</span></Link>
            <Link className="text-link" to="/privacy">Read the privacy policy <span>→</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}
