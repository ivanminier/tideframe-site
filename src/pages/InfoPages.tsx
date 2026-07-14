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
      <h2>Quick help</h2>
      <div className="support-topic-grid">
        <article>
          <h3>Profile did not change everything</h3>
          <p>Open the profile and check the setting you expected to change. Modeboard intentionally skips anything left unchanged.</p>
        </article>
        <article>
          <h3>Automation permission</h3>
          <p>Review Modeboard under System Settings → Privacy &amp; Security → Automation if Finder or appearance changes need attention.</p>
        </article>
        <article>
          <h3>Return to an earlier setup</h3>
          <p>Open Backups &amp; Restore and use Emergency Restore to bring back the latest safety backup.</p>
        </article>
        <article>
          <h3>Animated wallpaper stopped</h3>
          <p>Keep Modeboard running for animated GIF and video wallpapers. Static and captured system wallpapers remain applied.</p>
        </article>
      </div>

      <h2>Built-in diagnostics</h2>
      <p>
        Built-in diagnostics can show which profile steps succeeded and create a report without including personal
        file contents. The report stays on your Mac until you choose to copy, export, or send it.
      </p>

      <h2>Contact support</h2>
      <p>
        Tell us what you were trying to do, what happened instead, and which macOS and Modeboard versions you use.
        A diagnostics report can help when a profile step needs a closer look.
      </p>
      <a className="button" href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20support`}>Contact support</a>
      <p className="fine-print">{siteConfig.supportEmail}</p>

      <h2>Your privacy</h2>
      <p>
        Modeboard has no analytics, advertising, or automatic diagnostics upload. Read the full{' '}
        <Link to="/privacy">privacy policy</Link> for details about local data and support email.
      </p>
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
        Modeboard includes update functionality provided by Sparkle. When update checks are available, checking for
        an update will request release information from the update host. Profiles, backups, and wallpaper files are
        not included in that request.
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
        This website does not collect payment information. Any future checkout provider and its privacy terms will
        be identified before a purchase flow is available.
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
        These terms govern this website and any copy of Modeboard that Tideframe Labs expressly provides for
        evaluation before release.
      </p>

      <h2>Pre-release access</h2>
      <p>
        A private pre-release build is for the person Tideframe Labs authorizes to evaluate it. You may not publish,
        redistribute, resell, reverse engineer, or make that build or its access credentials available to anyone else.
        Tideframe Labs may end pre-release access or replace a build when necessary.
      </p>

      <h2>Availability and public terms</h2>
      <p>
        Modeboard is coming soon for Mac. Public license, purchase, refund, and update terms will be posted before
        downloads or purchasing become available.
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
    <Page eyebrow="Modeboard" title="Changelog" intro="Release notes for Modeboard will appear here as the app becomes available.">
      <article className="release">
        <div><h2>1.0.0</h2><span>Coming soon for Mac</span></div>
        <div>
          <p>The first Modeboard release is being prepared with:</p>
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
    <Page eyebrow="About Tideframe Labs" title="Thoughtful Mac apps, made in Vermont." intro="Tideframe Labs is an independent software studio creating focused tools for better digital spaces.">
      <h2>The studio</h2>
      <p>
        Tideframe Labs builds focused tools that feel native, respect privacy, and make everyday Mac setups easier
        to shape. Each app starts with a clear purpose and leaves unnecessary noise behind.
      </p>

      <h2>Independent by design</h2>
      <p>
        Ivan Minier founded Tideframe Labs and works across product design, development, and customer support from
        Vermont. Keeping the studio personal makes it easier to stay close to the product and the people using it.
      </p>

      <h2>Starting with Modeboard</h2>
      <p>
        Modeboard is the studio's first app: a profile-based way to switch the wallpaper, Dock, appearance, menu bar,
        and Desktop settings that shape different parts of the day.
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
