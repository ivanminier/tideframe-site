import { Link } from 'react-router-dom'
import { Meta } from '../components/Meta'
import { siteConfig } from '../config'

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

export function Support() {
  return (
    <Page
      eyebrow="Modeboard support"
      title="How can we help?"
      intro="Modeboard is still in development. This page describes what to expect once it's available, and how to reach support in the meantime."
    >
      <h2>Before release</h2>
      <p>
        There is no public version of Modeboard to download yet. If you're testing a pre-release build with the
        developer's permission, the sections below describe what to expect — some details may still change before
        1.0.
      </p>

      <h2>Installation</h2>
      <p>
        Modeboard will be distributed as a standard macOS application. Installation will involve downloading the
        app, moving it to your Applications folder, and opening it like any other Mac app — no separate installer
        and no account to create.
      </p>

      <h2>First launch</h2>
      <p>
        On first launch, Modeboard will walk you through creating your first profile from your Mac's current
        settings, so you have a known starting point before making any changes.
      </p>

      <h2>Permissions</h2>
      <p>
        To read and change system preferences, Dock settings, and wallpaper, Modeboard needs macOS permissions
        such as Accessibility and Automation access. macOS will prompt for these individually, and Modeboard only
        requests the permissions needed for the features you actually use.
      </p>

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
        If you report an issue, include your macOS version, your Mac model, the Modeboard version, what you
        expected to happen, and what happened instead. Modeboard does not send diagnostic data automatically —
        you decide what to share, and only by email.
      </p>

      <h2>Contact</h2>
      <a className="button" href={`mailto:${siteConfig.supportEmail}`}>Email support</a>
      <p className="fine-print">Support: {siteConfig.supportEmail}</p>
    </Page>
  )
}

export function Privacy() {
  return (
    <Page eyebrow="Modeboard" title="Privacy Policy" intro="Modeboard is designed to keep its core data on your Mac.">
      <p className="updated">Last updated: July 11, 2026</p>

      <h2>The short version</h2>
      <p>
        Modeboard is planned to work without an account, advertising, analytics, cookies, or tracking. Profile
        settings and backups are stored locally on your Mac.
      </p>

      <h2>Information Modeboard handles</h2>
      <p>
        To apply a profile, Modeboard reads and changes selected macOS system preferences and Finder settings,
        such as wallpaper, Dock arrangement, and appearance. It stores profile definitions and recovery backups
        locally in your user account. None of this is uploaded anywhere by Modeboard.
      </p>

      <h2>Permissions</h2>
      <p>
        Modeboard requests macOS permissions — such as Accessibility and Automation access — only to read and
        change the settings involved in the features you use. These are granted through macOS's own system
        prompts, which you can review or revoke at any time in System Settings.
      </p>

      <h2>No third parties</h2>
      <p>Modeboard does not share data with advertisers, analytics providers, or other third parties, because it does not collect data to share.</p>

      <h2>Website privacy</h2>
      <p>
        This static website does not use analytics, cookies, tracking pixels, or forms. If you email us, your
        email provider and ours process that message in the usual way.
      </p>

      <h2>Future changes</h2>
      <p>If Modeboard's data practices change before release, this policy will be updated before those changes take effect.</p>

      <h2>Questions</h2>
      <p>Email <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p>
    </Page>
  )
}

export function Terms() {
  return (
    <Page eyebrow="Modeboard" title="Software Terms" intro="A plain-language preview of the terms intended to accompany Modeboard.">
      <div className="legal-alert">
        <strong>Draft — legal review required</strong>
        <p>These placeholder terms must be reviewed by a qualified legal professional before Modeboard is publicly released. They are not final software terms.</p>
      </div>

      <h2>Using Modeboard</h2>
      <p>
        Modeboard is intended for use on compatible Mac computers. You are responsible for reviewing profiles
        before applying them and for maintaining appropriate backups of your Mac.
      </p>

      <h2>System behavior</h2>
      <p>
        Modeboard changes macOS system preferences and Finder settings. Some behavior relies on implementation
        details that Apple may change. Modeboard is provided as-is, without a guarantee that every change it
        makes can be perfectly reversed.
      </p>

      <h2>Pre-release status</h2>
      <p>Modeboard is under active development. Features, defaults, and this document may change before a public release.</p>

      <h2>No Apple affiliation</h2>
      <p>Modeboard is independent software and is not affiliated with, endorsed by, or certified by Apple Inc.</p>

      <h2>Contact</h2>
      <p>Questions about this draft may be sent to <a href={`mailto:${siteConfig.generalEmail}`}>{siteConfig.generalEmail}</a>.</p>
    </Page>
  )
}

export function Changelog() {
  return (
    <Page eyebrow="Modeboard" title="Changelog" intro="Release notes and important changes to Modeboard.">
      <article className="release">
        <div><h2>1.0</h2><span>In development</span></div>
        <p>The first release of Modeboard is in active development. Detailed release notes will appear here when release-candidate testing begins.</p>
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
