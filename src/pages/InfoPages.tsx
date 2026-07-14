import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { siteConfig } from '../config'
import { getRouteMeta } from '../data/routeMeta'

function Page({ eyebrow, title, intro, children, noindex = false, canonicalPath }: { eyebrow: string; title: string; intro: string; children: React.ReactNode; noindex?: boolean; canonicalPath?: string }) {
  return (
    <>
      <Meta title={`${title} — Tideframe Labs`} description={intro} noindex={noindex} path={canonicalPath} />
      <section className="page-hero">
        <div className="container narrow">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lede">{intro}</p>
        </div>
      </section>
      <div className="prose container narrow">{children}</div>
    </>
  )
}

const supportMeta = getRouteMeta('/support')
const privacyMeta = getRouteMeta('/privacy')
const termsMeta = getRouteMeta('/terms')

export function Support() {
  return (
    <Page eyebrow="Modeboard support" title={supportMeta.h1 ?? supportMeta.title} intro={supportMeta.description}>
      <div className="notice-card">
        <strong>Modeboard is coming soon.</strong>
        <p>There is no public download, purchase, production activation, or production update service yet.</p>
      </div>

      <h2>Installation</h2>
      <p>
        A public download will be posted only after the release build is signed, notarized, and tested from its
        published location. Until then, this site does not offer an installer.
      </p>

      <h2>Permissions</h2>
      <p>
        Modeboard needs Automation access to work with System Events and Finder. macOS asks for this permission
        the first time it is needed. If a profile cannot change appearance, wallpaper, or Desktop settings, review
        Modeboard under System Settings → Privacy &amp; Security → Automation.
      </p>

      <h2>Profiles, backups, and restore</h2>
      <p>
        Applying a profile changes real macOS and Finder settings. Modeboard creates a safety backup before each
        profile apply. If a switch does not look right, Emergency Restore can restore the latest safety backup.
      </p>

      <h2>Animated wallpapers</h2>
      <p>
        GIF and video wallpapers play while Modeboard is running. Quitting Modeboard stops animated wallpapers.
        Static images and captured Apple/system wallpapers remain applied.
      </p>

      <h2>Diagnostics</h2>
      <p>
        Settings → Diagnostics can export a report or copy it to the clipboard for a support email. The export
        redacts common personal paths and identifiers, and Modeboard never sends it automatically.
      </p>

      <h2>Updates</h2>
      <p>
        Production updates are not enabled. Download and update instructions will be added only after the public
        release service is ready.
      </p>

      <h2>Contact support</h2>
      <p>
        Include your macOS version, Mac model, Modeboard version, and a short description of what happened. Do not
        send passwords, access codes, private keys, or an unredacted system log.
      </p>
      <a className="button" href={`mailto:${siteConfig.supportEmail}`}>Email support</a>
      <p className="fine-print">{siteConfig.supportEmail}</p>
    </Page>
  )
}

export function Privacy() {
  return (
    <Page eyebrow="Modeboard" title={privacyMeta.h1 ?? privacyMeta.title} intro={privacyMeta.description}>
      <p className="updated">Last updated: July 14, 2026</p>

      <h2>The short version</h2>
      <p>
        Modeboard works without an account, analytics, advertising, or tracking. Profiles, backups, wallpaper
        files, app preferences, and diagnostics stay on your Mac unless you choose to share a diagnostics
        report with support.
      </p>

      <h2>Data stored on your Mac</h2>
      <p>
        Modeboard stores the profiles you create, the settings needed to apply them, local backups, selected
        wallpaper files, and app preferences. This data is used to run the app and is not
        uploaded to Tideframe Labs.
      </p>

      <h2>Accounts, analytics, and ads</h2>
      <p>
        Modeboard has no account system and contains no analytics, advertising, or automatic crash-report upload.
        Offline access-code verification does not contact a license server.
      </p>

      <h2>Update checks</h2>
      <p>
        No production update service is currently enabled. Before public update checks are available, this policy
        will be updated to explain what the app sends and what the hosting provider processes.
      </p>

      <h2>Permissions and diagnostics</h2>
      <p>
        Modeboard requests Automation access for supported System Events and Finder changes. A diagnostics report
        is created locally and shared only when you export it and send it yourself.
      </p>

      <h2>Website and email</h2>
      <p>
        This website uses no analytics, cookies, tracking pixels, or forms. If you email Tideframe Labs, your email
        provider and ours process the message in the usual way.
      </p>

      <h2>Purchases</h2>
      <p>
        Modeboard is not currently sold on this website, and Tideframe Labs does not collect payment information here.
        This policy will be updated before any purchase flow is enabled.
      </p>

      <h2>Changes and questions</h2>
      <p>
        This policy will be updated before any material change to Modeboard's data practices takes effect. Questions
        can be sent to <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
      </p>
    </Page>
  )
}

export function Terms() {
  return (
    <Page eyebrow="Modeboard" title={termsMeta.h1 ?? termsMeta.title} intro={termsMeta.description}>
      <p className="updated">Last updated: July 14, 2026</p>
      <p>
        Modeboard is not currently available for public download or purchase. These terms govern this website and
        any private pre-release build Tideframe Labs expressly provides to you for evaluation.
      </p>

      <h2>Pre-release access</h2>
      <p>
        A private pre-release build is for the person Tideframe Labs authorizes to evaluate it. You may not publish,
        redistribute, resell, reverse engineer, or make that build or its access credentials available to anyone else.
        Tideframe Labs may end pre-release access or replace a build when necessary.
      </p>

      <h2>No public offer</h2>
      <p>
        Nothing on this website is a public download, sale, subscription, trial, or promise of future pricing or
        availability. Public license, purchase, refund, and update terms will be posted before any such service is enabled.
      </p>

      <h2>Your responsibility for backups</h2>
      <p>
        Review a profile before applying it and keep an independent backup of your Mac, such as a Time Machine
        backup. Modeboard creates its own backups for supported settings, but those backups are not a replacement
        for a complete system backup.
      </p>

      <h2>System compatibility</h2>
      <p>
        Modeboard changes real macOS and Finder settings. Some behavior depends on Apple APIs or system details
        that can change with macOS updates. Tideframe Labs may update compatibility requirements as macOS changes
        and cannot guarantee support for every Mac or future macOS release.
      </p>

      <h2>Support</h2>
      <p>
        Email support is provided on a best-effort basis at{' '}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. No response time or resolution
        time is guaranteed.
      </p>

      <h2>Warranty disclaimer</h2>
      <p>
        To the extent permitted by law, Modeboard is provided “as is” and “as available,” without warranties of
        any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, Tideframe Labs is not liable for indirect, incidental, special, or
        consequential loss arising from your use of Modeboard, including lost settings, data, work, or time.
        Tideframe Labs' total liability for a pre-release claim will not exceed the amount you paid for that access.
      </p>

      <h2>No Apple affiliation</h2>
      <p>Modeboard is independent software and is not affiliated with, endorsed by, or certified by Apple Inc.</p>

      <h2>Changes to these terms</h2>
      <p>
        Tideframe Labs may update these terms as Modeboard changes. Material changes will be described clearly on
        this page, and separate public-release terms will be posted before downloads or purchases are enabled.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a>.</p>
    </Page>
  )
}

export function Changelog() {
  return (
    <Page eyebrow="Modeboard" title="Changelog" intro="Release notes and important changes to Modeboard.">
      <article className="release">
        <div><h2>1.0.0</h2><span>In development</span></div>
        <div>
          <p>Modeboard has not been released. Version 1.0 is being prepared with:</p>
          <ul>
            <li>Profiles for wallpaper, Dock, appearance, menu bar, and Desktop settings.</li>
            <li>Manual, menu bar, Apple Shortcuts, and Focus Filter switching.</li>
            <li>Safety backups, Emergency Restore, backup history, and diagnostics.</li>
            <li>Profile transfer and support for static, captured system, GIF, and video wallpapers.</li>
          </ul>
        </div>
      </article>
    </Page>
  )
}

export function About() {
  return (
    <Page eyebrow="About" title="Independent Mac software, built in Vermont." intro="Tideframe Labs is a software studio founded by Ivan Minier.">
      <h2>The studio</h2>
      <p>
        Tideframe Labs builds focused Mac apps with clear uses and familiar interfaces. The goal is simple:
        make software that earns a place in your everyday workflow.
      </p>

      <h2>About Ivan</h2>
      <p>
        Ivan Minier is the founder and creator of Tideframe Labs, working across product design, development,
        and customer support. Modeboard is the studio's first product.
      </p>

      <h2>Why Modeboard</h2>
      <p>
        Modeboard began with a question: if a Focus mode can change notifications, why cannot it help reshape the
        rest of the Mac too? That idea became a profile system for the settings that define a workspace.
      </p>

      <h2>Get in touch</h2>
      <p>
        For general questions, email <a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a>.
        For Modeboard help, visit <Link to="/support">Support</Link>.
      </p>
    </Page>
  )
}

export function NotFound() {
  return (
    <Page eyebrow="404" title="We couldn't find that page." intro="The address may have changed, or the page may no longer exist." noindex canonicalPath="/">
      <Link className="button" to="/">Return home</Link>
    </Page>
  )
}
