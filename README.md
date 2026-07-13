# Tideframe Labs website

The static website for [tideframelabs.com](https://tideframelabs.com), built with React, TypeScript, React Router, and plain CSS. It has no backend, database, analytics, cookies, or tracking.

## Run the site locally

You need a current version of [Node.js](https://nodejs.org/) installed.

1. Open Terminal and move into this project folder.
2. Install the project once:
   ```sh
   npm install
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

All product data lives in one file: `src/data/products.ts`. To add a new product:

1. Add a new object to the `products` array with a unique `slug`, its own `route` (e.g. `/newproduct`), and the rest of the fields described by the `Product` type at the top of the file.
2. Add a matching `<Route path="newproduct" element={<NewProduct />} />` in `src/App.tsx` and create the page component under `src/pages/`.
3. Add the new route to `public/sitemap.xml`.
4. Add a link to it in `src/data/nav.ts` if it should appear in navigation.

The `/products` page renders automatically from this array. Add a homepage feature separately only when the product should be featured there.

### Change a download URL

Open `src/data/products.ts` and set the `downloadUrl` field for the product:

- `null` → the download button is disabled and reads "Coming Soon."
- a real URL, with `status: 'beta'` → the button reads "Download Beta."
- a real URL, with `status: 'available'` → the button reads "Download Modeboard."

This is the only file that needs to change — the Modeboard and products pages both read from it. **Only ever set `downloadUrl` to a real HTTPS link to a signed, notarized build.** Setting `status: 'available'` with a real `downloadUrl` also automatically adds `offers` structured data (price, currency) to the page — see "Update pricing, license, and trial details" below for where that price comes from.

Once a real download exists, you can also set `version` (shown next to the download button) and, once you're certain it matches the exact live file, `sha256` (shown as a checksum visitors can verify their download against). Both are `null` by default and stay hidden until `downloadUrl` is set.

### Update pricing, license, and trial details

Modeboard's planned commercial model — price, trial length, license scope, included updates, activation, and refund policy — lives in the `commercial` object in `src/data/products.ts`. It drives product-page details and structured data. Review the Terms page separately whenever these business terms change so the legal wording stays accurate.

The refund policy field (`commercial.refundPolicy`) holds exact, reviewed business wording — don't paraphrase it when editing; change the whole string deliberately if the policy itself changes.

### Replace screenshots

Screenshots live in `public/screenshots/` as PNG files, usually at two sizes: `name.png` (1400px wide, the full image) and `name-700.png` (700px wide, used on smaller screens). To add or replace one:

1. Take or export a PNG from your Mac. Full-resolution originals (from a Retina screenshot, these are typically 2000px+ wide) are preserved in `design-source/screenshots-original/` — that folder isn't part of the deployed site, just a place to keep masters for future re-editing.
2. Resize it to the two sizes above. macOS's built-in `sips` tool needs no install:
   ```sh
   sips --resampleWidth 1400 your-original.png --out public/screenshots/modeboard-yourfeature.png
   sips --resampleWidth 700 your-original.png --out public/screenshots/modeboard-yourfeature-700.png
   ```
   If your image is narrower than 700px to begin with (like the menu-bar screenshot), skip the `-700` file — don't upscale a small image.
3. Add a `ProductScreenshot` to the relevant page with the filename (no extension), honest alt text, natural dimensions, and `hasThumbnail` only when the matching `-700.png` file exists. A failed image is removed from the layout rather than exposing a broken or unfinished card.

**Optimizing further:** no image-processing tool is bundled with this project, to keep the toolchain simple and dependency-free — the `sips` resizing above is what's already been applied to every current screenshot. For extra compression (smaller file size at the same dimensions), drag a resized PNG into a free tool like [Squoosh](https://squoosh.app) and export as optimized PNG or WebP before uploading. If you add real `.webp` files, you'd need to update `src/components/ProductScreenshot.tsx` to reference them — the component intentionally uses plain `<img src>`/`srcset` rather than a `<picture>` with a `.webp` fallback source, because this site's SPA routing (`public/_redirects`) makes a missing-file probe unreliable (see the comment in that file for details). Only reference a `.webp` file once it actually exists.

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

## Deploy to Cloudflare Pages

1. Put this project in a GitHub repository.
2. In Cloudflare, open **Workers & Pages**, choose **Create**, then connect the repository.
3. Set **Build command** to `npm run build`.
4. Set **Build output directory** to `dist`.
5. Deploy. No environment variables are required.
6. Add `tideframelabs.com` under the Pages project's custom domains.

For React Router routes such as `/products` to work when opened directly, configure Cloudflare Pages to fall back to `index.html`. The included `public/_redirects` file handles this automatically. Five routes (`/`, `/modeboard`, `/privacy`, `/terms`, `/support`) don't actually need that fallback — they get their own real, pre-rendered `index.html` file at build time (see "Search engine and social-preview metadata" above), which Cloudflare Pages serves directly since a real file always takes precedence over a `_redirects` rule.

For the full first-time setup — including moving the domain's nameservers to Cloudflare and setting up email — see `DEPLOYMENT_CHECKLIST.md`. For everything still needed before this site can go live (a real signed download, legal review, unresolved business facts), see `CONTENT_CHECKLIST.md`.
