import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { siteConfig } from '../config'
import { featuredProduct } from '../data/products'
import { getRouteMeta } from '../data/routeMeta'

const commercial = featuredProduct.commercial

function Page({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <>
      <Meta title={`${title} — Tideframe Labs`} description={intro} />
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
      <h2>Before release</h2>
      <p>
        There is no public version of Modeboard to download yet. If you're testing a pre-release build with the
        developer's permission, the sections below describe what to expect — some details may still change before
        1.0.
      </p>

      <h2>Installation</h2>
      <p>
        When it's available, Modeboard will be distributed directly by Tideframe Labs rather than through the
        Mac App Store — Developer ID–signed and notarized by Apple, so Gatekeeper lets it open normally.
        Installation is simple: download the app, move it to your Applications folder, and open it — no separate
        installer and no account to create.
      </p>

      <h2>First launch</h2>
      <p>
        On first launch, Modeboard will walk you through creating your first profile from your Mac's current
        settings, so you have a known starting point before making any changes. Modeboard also registers itself
        to open at login by default; you can turn this off in Settings at any time.
      </p>

      <h2>Permissions</h2>
      <p>
        Modeboard asks for Automation access to control System Events and Finder — this is what lets it change
        appearance, set a wallpaper fallback, refresh the Desktop, and position Modeboard's own Desktop
        shortcuts. macOS prompts for this the first time it's needed. Modeboard does not request or use
        Accessibility permission.
      </p>

      {commercial ? (
        <>
          <h2>Entering an access code</h2>
          <p>
            When Modeboard is available, you'll activate it by entering the signed access code you received at
            purchase, in Modeboard → Settings → License. Activation is verified on your Mac — it doesn't need
            an internet connection or an account.
          </p>

          <h2>Removing a license from a Mac</h2>
          <p>
            Modeboard → Settings → License will include a "Remove License" option for deactivating that Mac,
            which returns Modeboard to trial or unlicensed state on that machine. Since there's no license
            server, removing a license is a local action on that Mac only — it doesn't remotely deactivate or
            otherwise affect any of your other Macs, and Tideframe Labs has no way to deactivate a device
            remotely on your behalf.
          </p>

          <h2>Trial expiration</h2>
          <p>
            Modeboard's trial is planned to run for {commercial.trialDays} days with every feature unlocked. If
            your trial ends before you're ready to buy, your profiles and backups stay on your Mac — nothing is
            deleted. Enter an access code at any time (during or after the trial) to unlock full use again.
          </p>
        </>
      ) : null}

      <h2>Applying a profile</h2>
      <p>
        Applying a profile changes real system preferences and Finder settings on your Mac. Modeboard saves a
        backup of your current settings first — review a profile before applying it if you're unsure what it
        changes.
      </p>

      <h2>Backups and restore</h2>
      <p>
        Every profile switch creates a local backup. If a profile doesn't apply the way you expected, use
        Emergency Restore to return to your previous settings. Backups are stored on your Mac; Modeboard can't
        restore a backup that has been deleted from your system.
      </p>

      <h2>Animated wallpapers</h2>
      <p>
        Animated wallpapers only play while Modeboard is running. If you quit the app, log out, or restart your
        Mac, the animation stops and macOS falls back to a still frame until Modeboard is running again.
      </p>

      <h2>Troubleshooting</h2>
      <p>
        If a profile doesn't apply as expected, try re-applying it, then use Emergency Restore if needed. Most
        issues during pre-release testing come from a macOS permission prompt being dismissed — check System
        Settings → Privacy &amp; Security if a feature isn't working.
      </p>

      <h2>Diagnostics</h2>
      <p>
        Settings → Diagnostics can export a local diagnostics report, or copy one to your clipboard, so you can
        attach it to a support email if you choose to. Modeboard redacts your home folder path, external volume
        names, and anything shaped like a bundle identifier before exporting. Nothing is sent automatically —
        you decide if and when to share a report.
      </p>

      <h2>Checking for updates</h2>
      <p>
        {commercial?.updateMechanism ? `Modeboard is planned to use ${commercial.updateMechanism.toLowerCase()}.` : 'Modeboard will include an update mechanism.'}{' '}
        Use Modeboard → Check for Updates to check manually at any time — this needs an internet connection to
        ask Tideframe Labs' update feed whether a newer version exists. Automatic background checks can be
        turned on or off in Settings; either way, nothing installs without your confirmation.
      </p>

      <h2>Automatic-update troubleshooting</h2>
      <p>
        If Check for Updates reports an error or seems stuck, confirm you have an internet connection and try
        again. If it still doesn't work, use manual replacement below as a fallback — it always works regardless
        of the updater's status.
      </p>

      <h2>Manual replacement (fallback)</h2>
      <p>
        You can always update Modeboard by hand: quit Modeboard, download the current version, replace the app
        in your Applications folder, and open it again. Your profiles, backups, and license stay in place —
        they aren't stored inside the app itself.
      </p>

      <h2>Refunds</h2>
      <p>
        To request a refund within 14 days of purchase, email support with your purchase details. You may be
        asked for basic system information or to try a reasonable troubleshooting step first if the request is
        for a technical issue — see the refund policy on the <Link to="/terms">Terms</Link> page for the exact
        wording.
      </p>

      <h2>What support may ask for</h2>
      <p>
        To help with an issue, we may ask for your macOS version, your Mac model, the Modeboard version, your
        purchase date or order confirmation (for license or refund questions), and what you expected to happen
        versus what actually happened. We will <strong>never</strong> ask you to send your profiles, wallpaper
        files, your access code, private keys, passwords, or a full unredacted diagnostics log — the redacted
        export from Settings → Diagnostics is enough.
      </p>

      <h2>Contact</h2>
      <a className="button" href={`mailto:${siteConfig.supportEmail}`}>Email support</a>
      <p className="fine-print">Support: {siteConfig.supportEmail}</p>
    </Page>
  )
}

export function Privacy() {
  return (
    <Page eyebrow="Modeboard" title={privacyMeta.h1 ?? privacyMeta.title} intro={privacyMeta.description}>
      <p className="updated">Last updated: July 12, 2026</p>

      <h2>The short version</h2>
      <p>
        Modeboard works without an account, advertising, analytics, cookies, or tracking. Your profiles,
        backups, wallpaper files, license, and diagnostic logs all stay on your Mac. The one thing that does
        cross the network is checking for app updates — described in full below.
      </p>

      <h2>What Modeboard stores locally</h2>
      <p>
        Modeboard stores its data in <code>~/Library/Application Support/Modeboard/</code> and in standard
        macOS app preferences. That includes:
      </p>
      <ul>
        <li>Your saved profiles — Dock arrangement, wallpaper choice, appearance, and menu bar settings — and which one is currently active.</li>
        <li>Automatic backups taken before each profile switch, so a change can be undone with Emergency Restore.</li>
        <li>Copies of wallpaper images or videos you've assigned to a profile, and a record of the Desktop shortcuts Modeboard manages for you.</li>
        <li>Your license — the signed access code used to activate Modeboard.</li>
        <li>A local diagnostics log, used only for the optional export described below.</li>
        <li>A few small preferences, such as whether setup is complete and your backup retention setting.</li>
      </ul>
      <p>None of this is uploaded anywhere by Modeboard. Update checks (below) are the only network requests it makes, and they don't include any of this data.</p>

      <h2>Accounts</h2>
      <p>Modeboard has no account system. There's nothing to sign up for and nothing tied to your identity.</p>

      <h2>Update checks and network access</h2>
      <p>
        Checking for updates — whether you trigger it manually or Modeboard checks automatically in the
        background — contacts Tideframe Labs' update feed to see whether a newer version is available. Like any
        web request, this may cause standard web-server information to be processed along the way, depending on
        hosting configuration — things like your IP address, the request time, your browser/app user agent, and
        which appcast or download file was requested. This is typical of how any software update check or file
        download works over the internet, not something Modeboard adds on top.
      </p>
      <p>
        Your profiles, backups, wallpaper files, license code, usage history, and diagnostic logs are{' '}
        <strong>never</strong> included in an update check or sent anywhere as part of it. An update check only
        asks "is there a newer version," and downloads that version if you choose to install it.
      </p>

      <h2>License activation</h2>
      <p>
        Modeboard activates with an offline signed access code. Verifying your license happens entirely on your
        Mac — it does not contact a server, and Tideframe Labs does not operate a license-activation server.
        Activating or using Modeboard doesn't require an internet connection; only checking for updates does.
      </p>

      <h2>Does Tideframe Labs receive your data?</h2>
      <p>
        No. Tideframe Labs does not receive your profiles, settings, backups, license, or usage information.
        The only thing Tideframe Labs' servers see is what's inherent to serving an update-check request or a
        download, described above.
      </p>

      <h2>Analytics and tracking</h2>
      <p>
        As far as we've been able to verify, Modeboard contains no analytics, telemetry, advertising SDK, or
        automatic crash-report upload. If that changes in a future version, this policy will be updated to say
        so before that version ships.
      </p>

      <h2>Permissions</h2>
      <p>
        Modeboard requests Automation access to control System Events and Finder — used to change appearance,
        set a wallpaper fallback, refresh the Desktop, and position Modeboard's own Desktop shortcuts. macOS
        shows its own system prompt for this the first time it's needed; you can review or revoke it at any
        time in System Settings → Privacy &amp; Security → Automation. Modeboard does not request or use
        Accessibility permission.
      </p>

      <h2>Login item</h2>
      <p>
        On first launch, Modeboard registers itself to open at login, using macOS's standard login-item system.
        You can turn this off in Modeboard's settings at any time; once you do, Modeboard remembers your choice
        and won't turn it back on.
      </p>

      <h2>Diagnostics</h2>
      <p>
        Settings → Diagnostics lets you export a local diagnostics report or copy it to your clipboard, for
        sharing with support if you choose to. Before export, Modeboard redacts your home folder path, external
        volume names, and anything shaped like a bundle identifier. Nothing is sent automatically — you decide
        if and when to share a report, typically by attaching it to a support email yourself.
      </p>

      <h2>Distribution</h2>
      <p>
        Modeboard is distributed directly by Tideframe Labs — Developer ID–signed and notarized by Apple — not
        through the Mac App Store, because it needs to write to system-level Dock and Finder preferences that
        the App Store's sandbox doesn't allow.
      </p>

      <h2>Website privacy</h2>
      <p>
        This static website does not use analytics, cookies, tracking pixels, or forms. If you email us, your
        email provider and ours process that message in the usual way.
      </p>

      <h2>Future changes</h2>
      <p>If Modeboard's data practices change, this policy will be updated before those changes take effect.</p>

      <h2>Questions</h2>
      <p>Email <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p>
    </Page>
  )
}

export function Terms() {
  return (
    <Page eyebrow="Modeboard" title={termsMeta.h1 ?? termsMeta.title} intro={termsMeta.description}>
      <p className="fine-print">
        These terms are written in plain language by Tideframe Labs and have not been reviewed by a lawyer.
        They cover what's already decided about using Modeboard. A few commercial details aren't decided yet —
        see "Not yet decided" below — and are deliberately left out rather than guessed at.
      </p>

      <h2>License to use Modeboard</h2>
      <p>
        Tideframe Labs grants you a personal, non-exclusive license to install and use Modeboard{' '}
        {commercial ? <strong>{commercial.licenseScope.toLowerCase()}</strong> : 'on Macs you own or control'},
        for your own personal or professional use. Installing Modeboard doesn't transfer ownership of the
        software to you — it's a license to use it, not a sale.
      </p>

      {commercial ? (
        <>
          <h2>Trial</h2>
          <p>
            Modeboard's planned trial gives you {commercial.trialDays} days of full-feature use before a
            license is required. The trial is intended for one person evaluating Modeboard for their own use,
            not for extending free use past {commercial.trialDays} days across multiple copies or reinstalls.
          </p>

          <h2>Access codes</h2>
          <p>
            A Modeboard license activates with a signed access code issued to you. Your access code is for your
            own use under the license scope above — don't share, resell, or publicly redistribute it. An access
            code that's shared or redistributed may stop working.
          </p>

          <h2>Updates included</h2>
          <p>
            Your license includes {commercial.updatesIncluded.toLowerCase()} at no extra cost. A future major
            version of Modeboard (2.0 or later) may be offered as a separate purchase rather than a free
            update — this document will be updated if and when that happens.
          </p>
        </>
      ) : null}

      <h2>Your responsibilities</h2>
      <p>
        You're responsible for reviewing a profile before applying it, and for keeping your own independent
        backups of your Mac (Time Machine or similar) in addition to Modeboard's own backups. Modeboard changes
        real macOS system preferences and Finder settings — it only does this at your direction, when you
        choose to apply, switch, or restore a profile.
      </p>

      <h2>System behavior and compatibility</h2>
      <p>
        Some of what Modeboard does relies on macOS behavior that Apple hasn't documented as a stable public
        API, and that behavior could change in a future macOS update without notice. A macOS update can affect
        compatibility, and Modeboard can't guarantee that undocumented system behavior it depends on will keep
        working the same way in every future release.
      </p>

      <h2>Pre-release status</h2>
      <p>
        Modeboard is under active development and hasn't had a public release yet. Individual features —
        currently including Focus Filter automation — may be labeled experimental and can change or be removed.
        Features, defaults, and this document may all change before and after a public release.
      </p>

      {commercial ? (
        <>
          <h2>Refunds</h2>
          <p>{commercial.refundPolicy}</p>
        </>
      ) : null}

      <h2>Support</h2>
      <p>
        Support is provided by Tideframe Labs by email, on a best-effort basis, at{' '}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. There's no guaranteed
        response time.
      </p>

      <h2>Warranty disclaimer</h2>
      <p>
        Modeboard is provided "as is," without warranty of any kind, express or implied, including any implied
        warranty of merchantability or fitness for a particular purpose.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, Tideframe Labs is not liable for indirect, incidental, or consequential
        damages arising from your use of Modeboard, including lost settings or lost time. This is part of why
        Modeboard backs up your settings before every profile apply, and why keeping your own independent
        backups is your responsibility (see above).
      </p>

      <h2>No Apple affiliation</h2>
      <p>Modeboard is independent software and is not affiliated with, endorsed by, or certified by Apple Inc.</p>

      <h2>Not yet decided</h2>
      <p>
        A few commercially necessary details aren't finalized, and are deliberately left out here rather than
        guessed at: whether a specific governing law or jurisdiction applies, Tideframe Labs' formal legal
        status (this is not a registered company), a business address, and which payment processor will handle
        purchases. These will be added once decided, before Modeboard is available to buy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a>.
      </p>
    </Page>
  )
}

export function Changelog() {
  return (
    <Page eyebrow="Modeboard" title="Changelog" intro="Release notes and important changes to Modeboard.">
      <article className="release">
        <div><h2>1.0.0</h2><span>In development, not yet released</span></div>
        <p>
          Version 1.0.0 is the current target build — it hasn't been signed, notarized, or released yet, so
          there's no download here. It's being built to add:
        </p>
        <ul>
          <li>An offline, signed access-code license — no account, and no internet connection needed to activate.</li>
          <li>A 14-day full-feature trial before a license is required.</li>
          <li>App updates, with a manual Check for Updates command and optional automatic checks.</li>
          <li>The same profile, Dock, wallpaper, Desktop, and menu-bar switching behavior already documented on the Modeboard page, including its existing backup and Emergency Restore safety behavior.</li>
          <li>An updated privacy policy reflecting that update checks (not license activation) are the app's only network requests.</li>
        </ul>
        <p className="fine-print">
          This entry describes what 1.0.0 is being built to include, not a shipped release. It will be replaced
          with real release notes once 1.0.0 is actually signed, notarized, and available to download.
        </p>
      </article>
      <p className="fine-print">Once Modeboard ships, this page will list every release in order, newest first, with what changed and why.</p>
    </Page>
  )
}

export function About() {
  return (
    <Page eyebrow="About" title="A small studio for thoughtful Mac software." intro="Tideframe Labs is an independent software studio founded by Ivan Minier.">
      <h2>Why Tideframe Labs</h2>
      <p>
        Personal computers should feel personal. Tideframe Labs creates focused, native software that respects
        the character of the platform it's built for and the people who use it.
      </p>
      <p>
        The studio values careful scope, honest communication, and software that earns its place in a daily
        routine — not features added to fill a roadmap.
      </p>

      <h2>About Ivan</h2>
      <p>
        Ivan Minier is the independent developer and designer behind Tideframe Labs — writing the code, designing
        the interface, and answering support email personally. Modeboard is the studio's first product.
      </p>

      <h2>How the studio works</h2>
      <p>
        Tideframe Labs is one person, not a company with departments. That means updates take the time they take,
        and every reply comes from someone who actually built the software.
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
    <Page eyebrow="404" title="That page drifted away." intro="The address may have changed, or the page may no longer exist.">
      <Link className="button" to="/">Return home</Link>
    </Page>
  )
}
