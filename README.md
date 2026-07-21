# Tideframe Labs website

The static website for [tideframelabs.com](https://tideframelabs.com), built with React, TypeScript, React Router, and plain CSS. It has no backend, database, analytics, cookies, or tracking.

## Run the site locally

You need a current version of [Node.js](https://nodejs.org/) installed.

1. Open Terminal and move into this project folder.
2. Install exactly what the lockfile specifies:
   ```sh
   npm ci
   ```
3. Start the local site:
   ```sh
   npm run dev
   ```
4. Open the address shown in Terminal (usually `http://localhost:5173`).

Press `Control+C` in Terminal when you want to stop it.

## Check the production version

Create the production files:

```sh
npm run build
```

Preview those files locally:

```sh
npm run preview
```

Quality checks are also available separately:

```sh
npm run lint
npm run type-check
npm test
npm run test:e2e
```

## Make common changes

- **Company details, email addresses, and URLs:** edit `src/config.ts`.
- **Homepage text:** edit `src/pages/Home.tsx`.
- **Modeboard product text:** edit `src/pages/Modeboard.tsx`.
- **Support, privacy, terms, changelog, about, and 404 text:** edit `src/pages/InfoPages.tsx`.
- **Third-party acknowledgments (e.g. Sparkle):** edit `src/pages/Acknowledgments.tsx`.
- **Search-engine/social-preview titles and descriptions:** edit `src/data/route-meta.json` — see "Search engine and social-preview metadata" below.
- **Header and footer navigation links:** edit `src/data/nav.ts` — nothing else needs to change.
- **Colors:** edit the named color variables at the top of `src/index.css`, including `--coral` (see `CONTENT_CHECKLIST.md`).
- **Layout and visual styling:** edit `src/App.css`.
- **Logo and icon files:** replace the files in `public/`, keeping the same filenames (see "Replace logo files" below).

### Add a new product

Modeboard's product and release data lives in `src/data/modeboard-product.json`; shared types and validation live in `src/data/products.ts`. To add a new product:

1. Add a new product data file and import it into the `products` array with a unique `slug`, its own `route` (e.g. `/newproduct`), and the fields described by the `Product` type.
2. Add a matching `<Route path="newproduct" element={<NewProduct />} />` in `src/App.tsx` and create the page component under `src/pages/`.
3. Add the new route to `public/sitemap.xml`.
4. Add a link to it in `src/data/nav.ts` if it should appear in navigation.

The `/products` page renders automatically from this array. Add a homepage feature separately only when the product should be featured there.

### Configure a public release

Open `src/data/modeboard-product.json` and complete the `release` object. The download stays disabled unless the central validator accepts every required field: HTTPS artifact URL, version, build number, byte size, SHA-256, minimum and tested macOS versions, release date, bundle identity, architecture status, Developer ID signing, notarization, permissions, limitations, and every production Sparkle appcast gate.

- incomplete fields or `status: 'coming-soon'` → the button is disabled and reads "Coming Soon."
- a complete valid release with `status: 'beta'` → the button reads "Download Beta."
- a complete valid release with `status: 'available'` → the button reads "Download Modeboard."

This is the only release-data file that needs to change — the Modeboard and products pages both read from it. **Only ever set `downloadUrl` to the real HTTPS link for the exact signed, notarized customer artifact.** The product page exposes its trial and purchase links, and structured data exposes an `Offer`, only when both the release and commerce validators pass.

Never add the artifact itself to this repository. Verify its exact byte size and checksum from the hosted, signed, notarized file before changing status.

### Configure purchasing

The public, non-secret frontend configuration is in `src/data/commerce-config.json` and is disabled. Do not enable it until Lemon Squeezy approves the business and the owner supplies the exact shareable checkout URL and confirms Store `436050`, Product `1236025`, and Variant `1932083`. The validator requires an exact allowlisted Lemon Squeezy hostname and `/checkout/buy/` URL, rejects credentials, fragments, cart/customer URLs, placeholders, and missing identifiers, and cannot be bypassed by the purchase component. No custom checkout, webhook, customer database, fulfillment service, or public license signer is required for v1; see `docs/PURCHASE_AND_LICENSE_ARCHITECTURE.md`.

### Update pricing, license, and trial details

Modeboard's commercial model — introductory price, trial length, license scope, perpetual purchased-version access, included 1.x updates, Lemon Squeezy activation, Focus support, and refund policy — lives in the `commercial` object in `src/data/modeboard-product.json`. Review the Privacy and Terms pages separately whenever these facts change.

The refund policy field (`commercial.refundPolicy`) holds exact, reviewed business wording — don't paraphrase it when editing; change the whole string deliberately if the policy itself changes.

### Replace screenshots

Screenshots live in `public/screenshots/` as PNG files, usually at two sizes: `name.png` (1600px wide, the full image) and `name-800.png` (800px wide, used on smaller screens). To add or replace one:

1. Take or export a PNG from your Mac. Full-resolution originals (from a Retina screenshot, these are typically 2000px+ wide) are preserved in `design-source/screenshots-original/` — that folder isn't part of the deployed site, just a place to keep masters for future re-editing.
2. Resize it to the two sizes above. macOS's built-in `sips` tool needs no install:
   ```sh
   sips --resampleWidth 1600 your-original.png --out public/screenshots/modeboard-yourfeature.png
   sips --resampleWidth 800 your-original.png --out public/screenshots/modeboard-yourfeature-800.png
   ```
   If your image is narrower than 800px to begin with (like the menu-bar screenshot), skip the `-800` file — don't upscale a small image.
3. Add a `ProductScreenshot` to the relevant page with the filename (no extension), honest alt text, natural dimensions, and `hasThumbnail` only when the matching `-800.png` file exists. A failed image is removed from the layout rather than exposing a broken or unfinished card.

**Optimizing further:** no image-processing tool is bundled with this project, to keep the toolchain simple and dependency-free — the `sips` resizing above is what's already been applied to every current screenshot. For extra compression (smaller file size at the same dimensions), drag a resized PNG into a free tool like [Squoosh](https://squoosh.app) and export as optimized PNG or WebP before uploading. If you add real `.webp` files, you'd need to update `src/components/ProductScreenshot.tsx` to reference them — the component intentionally uses plain `<img src>`/`srcset` rather than a `<picture>` with a `.webp` fallback source, because this site's SPA fallback routing makes a missing-file probe unreliable. Only reference a `.webp` file once it actually exists.

### Replace logo files

The approved files live in `public/`. The header and footer use the two SVG marks and fall back to a simple wave treatment only if an image truly fails to load:

- `public/tideframe-mark.svg` — used in the header on light backgrounds.
- `public/tideframe-mark-monochrome.svg` — used in the footer (dark background).
- `public/tideframe-icon-glossy.png` — used on the homepage hero and as a downloadable brand asset on `/brand`.
- `public/modeboard-icon.png` — the Modeboard product icon, used on the products grid and product cards.
- `public/favicon.svg` — the browser tab icon, referenced from `index.html`.
- `public/social-preview.png` — the default 1200×630 image used when a page is shared on social media (og:image / twitter:image). Its HTML source is in `design-source/social-preview-source/` if you want to re-render an updated version the same way (a headless-browser screenshot of that HTML file at 1200×630).

Keep the filenames exactly as listed — nothing else in the code needs to change when you drop in the real files. Icons here are served at 512×512; full-resolution originals are preserved in `design-source/`.

## Search engine and social-preview metadata

Each named route gets pre-rendered metadata so search engines and social previews see the correct information before JavaScript runs. This is driven by `src/data/route-meta.json`, which both the live site and `scripts/generate-static-meta.mjs` read from.

To change a title or description used by search engines and social shares, edit the matching entry in `src/data/route-meta.json` and keep the page component's `Meta` text aligned. `npm run build` regenerates the pre-rendered HTML in `dist/` automatically.

## Deploy to Cloudflare Workers

This site is a Cloudflare Worker with static assets, configured in `wrangler.jsonc` — not a Pages project. There is no `public/_redirects` file, and one must not be added back.

1. Put this project in a GitHub repository.
2. Run `npm ci`, `npm run check`, and `npm run test:e2e`.
3. Deploy with `npx wrangler deploy`. The static frontend requires no environment variables. Never add backend or signing secrets as `VITE_*` values.
4. Add `tideframelabs.com` as a custom domain on the Worker, in the Cloudflare dashboard.

`tideframelabs.com` is the only host that serves this site. `wrangler.jsonc` sets `workers_dev: false` and `preview_urls: false`, so Cloudflare publishes no `*.workers.dev` or preview hostname — there is no second, indexable copy of the site to keep out of search results, which is why `public/_headers` carries no host-scoped `X-Robots-Tag` rule. Custom domains stay dashboard-managed on purpose: do not add a `route`/`routes` entry to `wrangler.jsonc`, because that would take over the custom-domain binding.

For React Router routes such as `/products` to work when opened directly, `assets.not_found_handling` is set to `single-page-application`, so unmatched paths fall back to `index.html`. Five routes (`/`, `/modeboard`, `/privacy`, `/terms`, `/support`) don't need that fallback — they get their own real, pre-rendered `index.html` file at build time (see "Search engine and social-preview metadata" above), and a real file always takes precedence over the SPA fallback.

`worker/index.js` returns a plain-text 404 for `/updates/modeboard/appcast.xml` while no real signed appcast exists, instead of allowing the SPA shell to look like an update feed. `assets.run_worker_first` lists that exact path so the Worker sees the request before the assets binding does; every other request goes straight to `env.ASSETS`. Change that route only when the production appcast is ready to publish. `tests/unit/static-assets.test.ts` covers both halves of that behavior.

For a safe source archive, follow `docs/SOURCE_ARCHIVE.md`. Never treat a source archive as the customer app distribution.

For the full first-time setup — including moving the domain's nameservers to Cloudflare and setting up email — see `DEPLOYMENT_CHECKLIST.md`. Review `docs/DEPLOYMENT_SECURITY.md`, `docs/PURCHASE_AND_LICENSE_ARCHITECTURE.md`, and `CONTENT_CHECKLIST.md` before launch.
