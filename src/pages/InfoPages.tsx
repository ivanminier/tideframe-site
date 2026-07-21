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
          <h3>Install Modeboard</h3>
          <p>Use only the signed customer download, drag Modeboard to Applications, open it there, and follow the permission explanations during setup.</p>
        </article>
        <article>
          <h3>Activate a license</h3>
          <p>Open License &amp; Access, enter the Lemon Squeezy license key from your receipt, and connect once for initial activation. The activated Mac can then work offline.</p>
        </article>
        <article>
          <h3>Deactivate a Mac</h3>
          <p>While online, use Deactivate This Mac before replacing the Mac or deleting local license data. This returns that activation to the three-Mac allowance.</p>
        </article>
        <article>
          <h3>Activation limits and offline use</h3>
          <p>One license covers one person on up to three personally controlled Macs. If activation reports no remaining allowance, use Deactivate This Mac on a Mac you no longer use, or email support. After activation, a Mac keeps working offline.</p>
        </article>
        <article>
          <h3>Restore a workspace</h3>
          <p>Open Backups &amp; Restore to review backup history. Use Emergency Restore to bring back the latest supported safety backup.</p>
        </article>
        <article>
          <h3>Update Modeboard</h3>
          <p>Use Check for Updates in Modeboard or allow user-controlled automatic checks. Sparkle updates are separate from license activation.</p>
        </article>
        <article>
          <h3>Uninstall Modeboard</h3>
          <p>Deactivate the Mac while online, quit Modeboard, and move it from Applications to Trash. See Uninstalling Modeboard below for what stays behind.</p>
        </article>
      </div>

      <h2>Uninstalling Modeboard</h2>
      <ol>
        <li>Quit Modeboard.</li>
        <li>If you purchased a license, use Deactivate This Mac first while online, where possible, so that activation can be reused on another Mac.</li>
        <li>Move Modeboard from Applications to the Trash.</li>
        <li>Removing the app may leave local Modeboard data behind, including profiles, backups, preferences, and license or trial records.</li>
        <li>If you intentionally want a complete reset, you can also remove that local Modeboard data.</li>
        <li>Deleting local profiles and backups is irreversible. Export anything you want to keep first.</li>
      </ol>
      <p>
        For help with a complete reset, email <a href={`mailto:${siteConfig.supportEmail}?subject=Modeboard%20complete%20reset`}>{siteConfig.supportEmail}</a>{' '}
        and we will walk through the steps for your version of Modeboard.
      </p>

      <h2>Profiles, permissions, and wallpaper</h2>
      <p>
        If a profile did not change something, edit it and confirm that setting is selected; Modeboard skips anything
        left unchanged. Review Modeboard under System Settings → Privacy &amp; Security → Automation if Finder or
        appearance changes need attention. Animated GIF and video wallpapers require Modeboard to remain running.
      </p>

      <h2>Built-in diagnostics</h2>
      <p>
        Built-in diagnostics can show which profile steps succeeded and create a report without including personal
        file contents. The report stays on your Mac until you choose to copy, export, or send it.
      </p>
      <p>
        Before sharing, read the report and remove anything sensitive. Never send a full license key, payment details,
        private documents, wallpaper files, profile archives, or other sensitive files unless support specifically
        explains why a particular non-sensitive item is needed.
      </p>

      <h2>Contact support</h2>
      <p>
        Tell us what you were trying to do, what happened instead, and which macOS and Modeboard versions you use.
        A diagnostics report can help when a profile step needs a closer look.
      </p>
      <p>Support is handled by a small independent studio. Replies are not round-the-clock and may take a few business days.</p>
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
      <p className="updated">Last updated: July 21, 2026</p>

      <h2>The short version</h2>
      <p>
        Modeboard has no analytics, advertising, tracking pixels, behavioral profiling, or sale of customer data.
        Its working data normally stays on your Mac. Lemon Squeezy processes purchases and paid-license activation,
        and Sparkle contacts the configured update host when an update check occurs.
      </p>

      <h2>Data stored on your Mac</h2>
      <p>
        Modeboard stores profiles, preferences, backups, trial state, a paid-license activation receipt, selected
        files, folders and wallpapers, and local diagnostics. Profiles, backups, selected content, and system-setting
        details are not uploaded through licensing or update checks. Diagnostics leave the Mac only when you export
        and share a report yourself.
      </p>

      <h2>Lemon Squeezy purchases and licensing</h2>
      <p>
        Lemon Squeezy is the merchant of record. It processes checkout, payment, tax, receipts, refunds,
        chargebacks, and customer information under its own policies. Tideframe Labs does not control Lemon
        Squeezy's independent data retention.
      </p>
      <p>
        For activation, validation, and deactivation, Modeboard sends the license key you enter and a generated
        installation instance name or identifier to Lemon Squeezy's public License API. Modeboard does not persist
        Lemon Squeezy customer names, customer email addresses, payment details, or full order records. It stores the
        minimum activation data needed for offline access in a device-only macOS Keychain item.
      </p>
      <p>
        Internet is required for initial paid-license activation. Modeboard may occasionally validate the saved
        instance when a connection is available. Temporary connection, rate-limit, or server failures do not revoke
        an activated perpetual license. Using Deactivate This Mac while online releases that Mac's activation.
      </p>

      <h2>Update checks</h2>
      <p>
        Modeboard uses Sparkle for user-controlled update checks. A check contacts the configured Tideframe Labs
        update host and may include ordinary network and technical information needed to determine whether an update
        is available, such as IP address, app version, macOS version, and system architecture. Profiles, backups,
        selected files, license keys, and wallpaper contents are not included in that request. Updates and licensing
        are separate systems.
      </p>

      <h2>Permissions and diagnostics</h2>
      <p>
        Modeboard requests Automation access for supported System Events and Finder changes. A diagnostics report
        is created locally and shared only when you export it and send it yourself.
      </p>

      <h2>Website, analytics, and email</h2>
      <p>
        This website uses no analytics, advertising, tracking pixels, behavioral profiling, marketing cookies, or
        sale of visitor data. It does not collect payment information; checkout will be hosted by Lemon Squeezy when
        sales are enabled. If you email Tideframe Labs, your email provider and ours process the message in the usual way.
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
      {/* Owner-review draft. Not legal advice. */}
      <p className="updated">Last updated: July 21, 2026</p>
      <p>
        These terms describe the Modeboard license and purchase model. Nothing here limits rights that cannot
        lawfully be limited.
      </p>

      <h2>Trial and purchase</h2>
      <p>
        Modeboard includes a 14-day full-feature trial. The introductory price is $14.99 USD as a one-time purchase,
        not a subscription. Lemon Squeezy is the merchant of record and handles checkout, payment, tax, receipts,
        refunds, chargebacks, and related customer information under its own terms and policies.
      </p>

      <h2>Individual license and updates</h2>
      <p>
        A purchase licenses one individual to use Modeboard on up to three Macs personally controlled by that person.
        The license permits perpetual use of the purchased version and includes all Modeboard 1.x updates. Tideframe
        Labs does not promise that a future major version will be free.
      </p>

      <h2>Activation, deactivation, and license keys</h2>
      <p>
        Initial activation requires internet access so Lemon Squeezy can validate the key and register the Mac. An
        activated perpetual license can continue working offline, with occasional validation when a connection is
        available. Before replacing a Mac, use Deactivate This Mac while online to release its activation.
        Do not share, publish, resell, transfer for value, or distribute a license key except where applicable law
        gives you a non-waivable right to do so.
      </p>

      <h2>Refunds and chargebacks</h2>
      <p>
        Refund requests may be submitted within 14 days of purchase. Eligibility is reviewed subject to applicable
        consumer law and may be limited where there is evidence of abuse, unauthorized distribution, or substantial
        use. Lemon Squeezy processes approved refunds as Tideframe Labs' merchant of record.
      </p>
      <p>
        To request a refund, contact <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> with
        the minimum order reference needed to locate the purchase; never email a full license key. Nothing here limits
        mandatory refund, cancellation, or other consumer rights. A refunded or charged-back purchase may have its
        license disabled when continued access is no longer authorized.
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
        Email support is provided on a reasonable, best-effort basis at{' '}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. Support is not round-the-clock,
        and no specific response or resolution time is guaranteed.
      </p>

      <h2>Acceptable use and termination</h2>
      <p>
        You may not use Modeboard to violate law, interfere with services, bypass license controls, or distribute
        unauthorized copies. Tideframe Labs may terminate a license for material abuse, key sharing, resale, or
        unauthorized distribution, subject to applicable law and any required notice or remedy rights.
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
        Where a monetary cap is lawful, Tideframe Labs' total liability relating to Modeboard will not exceed the
        amount paid for the license giving rise to the claim. Some jurisdictions do not allow particular exclusions
        or limits, so these limits apply only to the extent permitted by law.
      </p>

      <h2>No Apple affiliation</h2>
      <p>Modeboard is independent software and is not affiliated with, endorsed by, or certified by Apple Inc.</p>

      <h2>Changes to these terms</h2>
      <p>
        Tideframe Labs may update these terms for future purchases or versions as Modeboard changes. Material
        changes will be described clearly, and final owner-reviewed terms will be posted before public sales.
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
        Modeboard is the studio's first app: a profile-based way to switch apps, Dock, wallpaper, Desktop,
        appearance, and Focus together for different parts of the day.
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
