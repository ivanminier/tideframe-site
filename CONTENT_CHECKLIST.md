# Content checklist

Everything below is either a placeholder, a stand-in, or something only the owner (Ivan) can provide or decide. The site builds and runs correctly without any of these — missing images fall back to elegant placeholders — but these are the open items before the site should be considered finished and launched.

## Brand assets (drop into `public/`, same filenames)

- [ ] `tideframe-mark.svg` — logo mark, light background. Currently absent; header shows a "T" monogram fallback.
- [ ] `tideframe-mark-monochrome.svg` — logo mark, dark background. Currently absent; footer shows the same fallback.
- [ ] `tideframe-icon-glossy.png` — glossy app icon. Currently absent; homepage hero and the Modeboard product icon show fallbacks (an abstract shape on the homepage, a "M" monogram elsewhere).
- [ ] `favicon.svg` — browser tab icon. Currently absent (referenced in `index.html`, will just fail to load until added).
- [ ] `social-preview.svg` — default social-share image (og:image / twitter:image) for pages that don't have their own. Currently absent; social previews will show a broken image until added.

Once these are added, visit `/brand` to confirm every asset preview and download link appears (a missing file simply hides its own download link there, so the page will visibly change once each is added).

## Colors

- [ ] `--coral` (`#e8794f`, `src/index.css`) is a placeholder guess, not sampled from the real glossy icon. Once `tideframe-icon-glossy.png` exists, resample the accent color from it and update `--coral` and `--coral-glow` in `src/index.css`. It's used sparingly (download-CTA glows, the "Beta" status badge, a couple of decorative highlights), so this is low-risk to leave as-is temporarily, but should be corrected before launch for brand accuracy.

## Modeboard product data (`src/data/products.ts`)

- [ ] `downloadUrl` — currently `null` (button reads "Coming Soon"). Paste the real download link here once one exists — see the README's "Change a download URL" section for exactly what to change.
- [ ] `version` — currently `null`, so no version number is shown anywhere. Set this once there's a real version to display (e.g. `"1.0"`).
- [ ] `status` — currently `'coming-soon'`. Change to `'beta'` or `'available'` when appropriate; button label and status badge update automatically everywhere.
- [ ] `minimumOS` — currently `"macOS 15 or later"`, carried over from the previous copy. Confirm this is still the accurate compatibility floor before launch, since it's a factual claim repeated on the homepage, Modeboard page, and structured data.

## Screenshots

- [ ] The 6 screenshots in `public/screenshots/` are real but unoptimized (150 KB–1.5 MB each). Consider re-exporting them as compressed PNG or WebP before launch — see the README's "Optimizing images" section for tools. None of them need to be replaced for correctness, only for file size / page-load speed.
- [ ] There's no screenshot for the "A cleaner Desktop" feature on the Modeboard page (it currently shows a plain decorative panel with no image, rather than a fabricated screenshot). Add `modeboard-desktop.png` to `public/screenshots/` and wire it into the `FEATURES` array in `src/pages/Modeboard.tsx` if one becomes available.

## Legal

- [ ] `/terms` is explicitly marked as a **draft requiring legal review** (the banner at the top of that page). Do not remove that banner or treat the terms as final until a qualified legal professional has reviewed them.
- [ ] `/privacy`'s "Last updated" date is set to July 11, 2026 (today, at time of writing) — update it whenever the policy text actually changes.

## Structured data / SEO

- [ ] `SoftwareApplication` structured data on `/modeboard` (`src/data/structuredData.ts`) omits `offers` and `aggregateRating` by design, since the site has no real pricing or ratings to report. Once Modeboard has a real price or rating worth publishing, this can be extended — do not fill these with placeholder values before then.
- [ ] Verify `og:image` / `twitter:image` render correctly once `social-preview.svg` is added (see Brand assets above).

## Things intentionally left out (not missing — just out of scope for now)

- No analytics, cookies, tracking, or forms — this is a deliberate privacy posture, not an oversight.
- No pricing page — pricing hasn't been decided yet (see FAQ on `/modeboard`).
- No additional products on `/products` beyond Modeboard — the "More in development" message is intentional; do not add placeholder products.
