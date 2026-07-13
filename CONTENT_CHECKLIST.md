# Content checklist

Everything below is either a placeholder, a stand-in, or something only the owner (Ivan) can provide or decide. The site builds and runs correctly without any of these — missing images fall back to elegant placeholders — but these are the open items before the site should be considered finished and launched.

## Resolved since the last pass (informational, no action needed)

- Brand assets, all 7 Modeboard screenshots, and a real 1200×630 social-preview card are all in place (see prior notes below for history).
- `public/_redirects` is present and correct.
- The site now describes Modeboard's planned commercial model — $14.99 introductory one-time price, 14-day trial, one person/up to three Macs license scope, offline access-code activation, Sparkle-based updates, and a 14-day refund policy — on `/modeboard`, `/terms`, and `/support`. This is the intended model for the release Ivan is actively building; it is **not yet implemented in the Modeboard app repo as of the last fact-check** (see "Fact-check findings" below). The website describes it using pre-release framing throughout, consistent with the rest of the site's voice for not-yet-shipped functionality.
- A new `/acknowledgments` page credits Sparkle (MIT License) as required by its license, with a link to the canonical license text rather than a from-memory reproduction of the full copyright-holder list.

## Modeboard product data (`src/data/products.ts`)

- [ ] `downloadUrl` — currently `null`. **Do not set this until a real, signed, notarized, HTTPS-hosted build exists.** As of the last fact-check, no such artifact exists anywhere (see below). Paste the real link here once one does — the download button and structured-data `Offer` markup both key off this automatically.
- [ ] `version` — currently `null`. The Xcode project's internal version is `1.0.0` (build 6), but there is no git tag and no signed/notarized artifact, so this is not a public release version yet. Leave `null` until a version actually ships.
- [ ] `sha256` — currently `null`. Only set this once it matches the exact live download file (see "Download integrity" below).
- [ ] `status` — currently `'coming-soon'`. Change to `'available'` (with a real `downloadUrl`) only once a real release exists.
- [ ] `commercial.priceUSD` / `introductoryPrice` — set to `14.99` / `true`, matching the plan. Update if the price changes before release.
- [ ] `commercial` fields generally — all sourced from the plan given for this pass. None of it is enforced or implemented in the app yet (see fact-check below); update this object if the real implementation ends up differing (e.g. a different trial length, a different update mechanism).
- [x] `minimumOS` — `"macOS 15 or later"` — verified accurate against the Modeboard Xcode project's deployment target.

## Fact-check findings (Modeboard macOS repo, most recent pass)

Checked directly against `/Users/ivanminier/Documents/Modeboard` (current HEAD at the time, branch `codex/finalize-modeboard-1.0`). Ivan confirmed this work — Sparkle, offline licensing, trial, pricing — is actively being built but was **not yet present in the repo** at the time of this check:

- **Sparkle**: not integrated — no SPM/CocoaPods dependency, no feed URL, no update-check code, no "Check for Updates" UI. The repo's own README currently states "There is no automatic updater."
- **Access-code licensing**: not implemented — no `LicenseService`, no signature verification, no trial-tracking code. Exists only as an unbuilt planning note in `CODEX_FINALIZATION_BRIEF.md`.
- **Pricing/StoreKit**: no purchase code anywhere. The $9.99–$14.99 figures are a planning-doc *recommendation*, not a shipped or enforced price.
- **Device limits**: no "3 Macs" or similar concept appears anywhere in the repo, implemented or as stated policy.
- **Refund policy**: no prior refund language in the repo at all — the 14-day policy is new, introduced via the website at Ivan's direction.
- **Version**: bumped to `1.0.0` (build 6) in `project.pbxproj`, but `git tag -l` is empty — **no tagged, cut release exists**.
- **Release artifact**: definitively does not exist. No Developer ID Application signing identity is installed on the build machine, the release-output folder is empty, and the repo's own `docs/RELEASE_CHECKLIST.md` and `RELEASE_AUDIT.md` still say the app is not approved for public release.
- **Network code**: still zero, repo-wide (no Sparkle feed check exists yet either, since Sparkle isn't integrated).
- **Boardwalk Labs**: bundle identifiers remain fully migrated to `com.tideframelabs.modeboard`; the only remaining "boardwalklabs" strings are an intentional legacy-migration constant and historical changelog/comment text, not live identifiers. Re-confirmed on this pass (previously confirmed too).
- **Accessibility permission / network/analytics claims / login item / distribution method** — all previously verified and unchanged; see prior fact-check notes preserved in git history if needed.

**Action for Ivan: when the Sparkle/licensing/purchase work lands in the Modeboard repo, ask for another fact-check pass before flipping `status` to `'available'` and setting `downloadUrl`** — that's the point where the site's claims need to be re-verified against real, shipped code rather than the plan.

## Legal

- [ ] `/terms` states the license scope, trial terms, access-code terms, refund policy (using the exact required wording), and that 1.x updates are included / a future major version may cost separately. It has **not** been reviewed by a lawyer — the page says so plainly. Get a lawyer to review before any real money changes hands.
- [ ] Terms still explicitly does not state: a legal entity type (LLC/Inc/etc. — Tideframe Labs is not incorporated), a physical business address, a governing law/jurisdiction, or a payment processor. None of these are decided. Decide them (ideally with legal input) before a paid public release, then fill in the "Not yet decided" section on `/terms`.
- [ ] `/privacy`'s "Last updated" date is set to today, reflecting this pass.

## Structured data / SEO

- [ ] `SoftwareApplication` structured data on `/modeboard` (`src/data/structuredData.ts`) only adds an `offers` block once `status === 'available'` **and** `downloadUrl` is set — this is automatic and doesn't need manual toggling, but don't work around it with placeholder values.
- [ ] The static pre-rendered HTML for `/modeboard`, `/privacy`, `/terms`, and `/support` reads titles/descriptions from `src/data/route-meta.json`. If you change what `Meta`/`Page` renders for one of those four routes, update the matching entry in `route-meta.json` too. The Modeboard page's JSON-LD snapshot in that file should also be updated if you change `name`, `description`, `minimumOS`, `version`, or add real `offers` in `src/data/products.ts`/`structuredData.ts`.
- [ ] The `/acknowledgments` route is a normal client-rendered page (not one of the four pre-rendered critical routes) — add it to `route-meta.json` too if it should get pre-rendered metadata later.

## Download integrity

- [ ] Once a real signed build exists, set `version` and (optionally) `sha256` in `src/data/products.ts`. Both only ever display next to the download button once `downloadUrl` is also set — see the conditional rendering in `src/pages/Modeboard.tsx`'s CTA section. **Never publish a checksum that doesn't match the exact live file** — a wrong checksum is worse than none.
- [ ] Confirm the real `downloadUrl` and any Sparkle appcast/feed URL both use `https://` — the site doesn't enforce this itself, so double-check when you paste in the real links.

## Image optimization

- [ ] The 512×512 icons and resized/responsive screenshots currently in `public/` are optimized via macOS's built-in `sips` tool. Full-resolution originals are preserved in `design-source/` (not deployed).

## Prelaunch conversion path

- [ ] The Modeboard page offers a mailto-based "Ask about beta access" link, since there's no email-list service or beta-signup backend configured for this static site. It disappears automatically once `downloadUrl` is set.

## Things intentionally left out (not missing — just out of scope for now)

- No analytics, cookies, tracking, or forms — this is a deliberate privacy posture, not an oversight.
- No additional products on `/products` beyond Modeboard — the "More in development" message is intentional; do not add placeholder products.
- No specific payment processor named anywhere on the site — none has been chosen yet (see "Legal" above).
