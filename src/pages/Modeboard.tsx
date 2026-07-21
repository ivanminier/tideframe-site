import { Link } from 'react-router-dom'
import { DownloadButton } from '../components/DownloadButton'
import { Meta } from '../components/Meta'
import { PlatformBadge } from '../components/PlatformBadge'
import { ProductScreenshot } from '../components/ProductScreenshot'
import { PurchaseButton } from '../components/PurchaseButton'
import { launchUpdatesMailto } from '../config'
import { commerceConfig, getVerifiedCheckoutUrl } from '../data/commerce'
import { featuredProduct } from '../data/products'
import { getPublicRelease } from '../data/products'
import { getRouteMeta } from '../data/routeMeta'
import { buildSoftwareApplicationSchema } from '../data/structuredData'

const meta = getRouteMeta('/modeboard')

const USE_CASES = [
  ['Work', 'Open work apps, set the right Dock, apply a focused wallpaper, and show useful Desktop shortcuts. A Work Focus can apply the profile automatically.'],
  ['Study', 'Open study tools, simplify the Dock, and bring course files and shortcuts forward. A Study Focus can handle the switch.'],
  ['Create', 'Open creative apps and project folders, bring media tools into the Dock, and change the workspace appearance.'],
  ['Relax', 'Restore personal apps, wallpaper, Desktop items, appearance, and Dock arrangement when the workday is over.'],
] as const

const PROFILE_SETTINGS = [
  ['Apps and files', 'Open the apps, files, and folders that belong with the profile.'],
  ['Wallpaper', 'Still images, animated GIF or video, and captured Apple/system wallpapers.'],
  ['Appearance', 'Light or Dark mode with the accent and highlight colors you choose.'],
  ['Dock', 'Size, position, visibility, magnification, and the apps you keep pinned.'],
  ['Menu bar', 'Menu bar visibility and the supported items you want available.'],
  ['Desktop', 'Existing Desktop icons and custom shortcuts for the files and folders you need.'],
] as const

const FEATURE_GROUPS = [
  ['Workspace', ['Apps', 'Files and folders', 'Desktop shortcuts', 'Dock configuration']],
  ['Appearance', ['Wallpaper', 'Light or Dark appearance', 'Accent and highlight colors']],
  ['Automation', ['Focus Filter integration', 'Apple Shortcuts and App Intents', 'Launch at Login']],
  ['Safety', ['Automatic backups', 'Restore support', 'Emergency Restore', 'Diagnostics and support reporting']],
] as const

const FAQS = [
  {
    q: 'What does Modeboard change?',
    a: 'A profile can open selected apps, files, and folders and change selected Dock, wallpaper, Desktop, appearance, menu-bar, and related workspace preferences. Choose what each profile changes.',
  },
  {
    q: 'Does Modeboard manage macOS Focus modes?',
    a: 'No. You create and manage Focus modes in macOS. Modeboard supplies a Focus Filter that connects a Focus to one Modeboard profile.',
  },
  {
    q: 'How does Focus integration work?',
    a: 'In macOS Focus settings, add the Modeboard Focus Filter to a Focus and choose a profile. A supported change to that Focus can then apply the matching profile automatically.',
  },
  {
    q: 'Can I choose which settings a profile changes?',
    a: 'Yes. Modeboard skips settings left unchanged, and you can preview and edit a profile before applying it.',
  },
  {
    q: 'Is there a trial?',
    a: 'Yes. Modeboard includes a 14-day full-feature trial.',
  },
  {
    q: 'Is this a subscription?',
    a: 'No. The introductory price is $14.99 USD as a one-time purchase.',
  },
  {
    q: 'How many Macs can I use?',
    a: 'One individual license can be activated on up to three Macs personally controlled by that person.',
  },
  {
    q: 'Does Modeboard work offline?',
    a: 'Yes after activation. An activated perpetual license uses a device-only Keychain receipt and continues working offline.',
  },
  {
    q: 'Why does activation initially require internet?',
    a: 'Modeboard contacts Lemon Squeezy once to validate the license key and register that Mac against the three-Mac activation limit.',
  },
  {
    q: 'What if Lemon Squeezy is temporarily unavailable?',
    a: 'A temporary connection or server failure does not revoke an already activated perpetual license. Modeboard can validate again when a connection is available.',
  },
  {
    q: 'Are my profiles uploaded?',
    a: 'No. Profiles, backups, selected files, folders, wallpapers, and local diagnostics normally remain on your Mac.',
  },
  {
    q: 'Does Modeboard include analytics?',
    a: 'No. Modeboard has no analytics, advertising, tracking pixels, or behavioral profiling.',
  },
  {
    q: 'How do backups and Emergency Restore work?',
    a: 'Modeboard creates a backup before applying relevant changes. Backups & Restore lets you review history, and Emergency Restore brings back the latest supported backup.',
  },
  {
    q: 'How do I uninstall Modeboard?',
    a: 'Quit Modeboard after using Deactivate This Mac while online so the activation can be reused, then move Modeboard from Applications to Trash. The Support page explains optional local-data cleanup.',
  },
  {
    q: 'Are all future major versions included?',
    a: 'The purchase includes perpetual use of the purchased version and all Modeboard 1.x updates. Free upgrades to future major versions are not promised.',
  },
  {
    q: 'How do updates work?',
    a: 'Sparkle provides user-controlled automatic checks and a manual Check for Updates command. Updates and licensing are separate systems.',
  },
  {
    q: 'Which macOS versions are supported?',
    a: 'Modeboard declares macOS 15 or later. The exact tested macOS versions and hardware support will be published only after the signed customer build completes the clean-machine compatibility matrix.',
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
  const releaseReady = getPublicRelease(featuredProduct) !== null
  const commerceReady = getVerifiedCheckoutUrl(commerceConfig) !== null
  const launchReady = releaseReady && commerceReady

  return (
    <>
      <Meta
        title={meta.title}
        description={meta.description}
        ogImage="/modeboard-social-preview.png"
        structuredData={buildSoftwareApplicationSchema(featuredProduct)}
      />

      <section className="hero-section product-hero">
        <span className="glow glow--pacific glow--top-right" aria-hidden="true" />
        <div className="container centered">
          <p className="eyebrow">Native workspace profiles for macOS</p>
          <h1>{meta.h1 ?? meta.title}</h1>
          <p className="lede">
            Switch your whole Mac workspace with one profile. Modeboard is a native macOS app that changes the apps,
            Dock, wallpaper, Desktop items, appearance, and Focus you select—then switches back just as easily.
          </p>
          <p className="product-hero-detail">
            Switch manually, from the menu bar, with Apple Shortcuts, or automatically through a Focus Filter.
          </p>
          <p className="product-hero-detail">
            Choose exactly what changes, preview and edit every profile, and rely on a safety backup before relevant settings are applied.
          </p>
          <p className="commercial-price"><strong>$14.99 introductory price</strong> · One-time purchase</p>
          <p className="commercial-summary">14-day full-feature trial · One person · Up to 3 Macs · All Modeboard 1.x updates</p>
          <div className="product-hero-meta" aria-label="Platform and availability">
            <span className="meta-chip">{launchReady ? 'Available for Mac' : 'Coming soon for Mac'}</span>
            {featuredProduct.platforms.map((platform) => <PlatformBadge key={platform} platform={platform} />)}
          </div>
          <div className="launch-actions" aria-label="Modeboard download and purchase availability">
            <DownloadButton
              product={featuredProduct}
              enabled={launchReady}
              label={launchReady ? 'Download Free Trial' : 'Download Free Trial — Coming Soon'}
            />
            <PurchaseButton
              enabled={launchReady}
              label="Buy for $14.99"
              unavailableLabel="Buy for $14.99 — Coming Soon"
            />
          </div>
          {!launchReady ? (
            <p className="availability-note">Downloads and checkout remain unavailable until the customer release and commerce checks both pass.</p>
          ) : null}
          <a className="text-link" href={launchUpdatesMailto}>Get launch updates <span>→</span></a>
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
          <h2 id="use-cases">Workspace profiles for each part of your day.</h2>
          <p className="lede">
            Create a setup for each part of your day. Modeboard changes only the settings you choose and leaves
            everything else alone.
          </p>
          <div className="use-case-grid" aria-label="Example Modeboard profiles">
            {USE_CASES.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="profile-settings">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What a profile can change</p>
            <h2 id="profile-settings">Choose what each profile changes.</h2>
            <p>Use a few settings or shape the whole workspace. Anything you leave unchanged stays just as it is.</p>
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

      <section className="section" aria-labelledby="feature-groups">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Everything in its place</p>
            <h2 id="feature-groups">Built around outcomes, with the safeguards close by.</h2>
          </div>
          <div className="feature-group-grid">
            {FEATURE_GROUPS.map(([title, items]) => (
              <article key={title}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>
            ))}
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
            <h2 id="focus-switching">Let a macOS Focus Filter handle the switch.</h2>
            <p>
              Connect a Modeboard profile to a macOS Focus Filter and let your workspace change with your Focus.
              You configure the filter in macOS Focus settings; Modeboard does not create or manage your Focus modes.
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
            <p>Profiles, selected files and wallpapers, local diagnostics, and safety backups stay on your Mac.</p>
            <p>Lemon Squeezy is contacted for initial paid-license activation and occasional validation when online; activated perpetual licenses continue working offline.</p>
            <p>There is no analytics, advertising, or tracking.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pricing">
        <div className="container narrow">
          <p className="eyebrow">Trial and pricing</p>
          <h2 id="pricing">A 14-day trial, then a one-time purchase.</h2>
          <p>
            Modeboard includes a 14-day full-feature trial, so you can build real profiles before deciding. It is a
            one-time purchase at an introductory $14.99 USD, not a subscription.
          </p>
          <p>
            One purchase covers one person on up to three personally controlled Macs and includes all Modeboard 1.x
            updates. Free upgrades to a future major version are not promised. Read the full{' '}
            <Link to="/terms">software terms</Link> before purchasing.
          </p>
        </div>
      </section>

      <section className="compatibility section" aria-labelledby="availability">
        <div className="container narrow centered">
          <p className="eyebrow">Stay in the loop</p>
          <h2 id="availability">macOS compatibility and availability.</h2>
          <p>
            Modeboard declares macOS {featuredProduct.release.minimumMacOSVersion} and later. Final tested versions,
            hardware support, signed download details, and checkout will be published only after every launch gate passes.
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
