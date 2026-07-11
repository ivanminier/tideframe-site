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

- **Company details, email addresses, URLs, version status, and copyright:** edit `src/config.ts`.
- **Homepage text:** edit `src/pages/Home.tsx`.
- **Modeboard product text:** edit `src/pages/Modeboard.tsx`.
- **Support, privacy, terms, changelog, and about text:** edit `src/pages/InfoPages.tsx`.
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

The homepage's products grid and the `/products` page both render automatically from this array — you don't need to touch either of them to add a product.

### Change a download URL

Open `src/data/products.ts` and set the `downloadUrl` field for the product:

- `null` → the download button is disabled and reads "Coming Soon."
- a real URL, with `status: 'beta'` → the button reads "Download Beta."
- a real URL, with `status: 'available'` → the button reads "Download Modeboard."

This is the only file that needs to change — the button on the homepage, the Modeboard page, and the products page all read from it.

### Replace screenshots

Screenshots live in `public/screenshots/` as PNG files. To add or replace one:

1. Export a PNG from your Mac (Preview, or your screenshot tool's export option). Keep the same filename as the one it replaces, or add a new one.
2. Drop it into `public/screenshots/`.
3. If it's a brand-new screenshot (not a replacement), add an entry to `src/data/modeboard-screenshots.ts` with a filename (no extension) and honest alt text describing what the screenshot shows.

Missing screenshots automatically show a "Screenshot coming soon" placeholder instead of a broken image — you don't need to do anything special to add them later.

**Optimizing images:** the current screenshots are unoptimized PNGs (150 KB–1.5 MB). No image-processing tool is bundled with this project, to keep the toolchain simple and dependency-free. To shrink them before uploading, use a free tool such as [Squoosh](https://squoosh.app) (drag in the PNG, export as WebP or optimized PNG, aim for under 300 KB) or macOS Preview's **File → Export**. If you later add real `.webp` files, update the `src` used in `src/components/ProductScreenshot.tsx` to point at them — the component intentionally uses a single `<img>` per screenshot rather than a `<picture>` with a `.webp`/`.png` fallback pair, because this site's SPA routing (`public/_redirects`) makes a missing-file probe unreliable (see the comment in that file for details).

### Replace logo files

The owner supplies these files directly into `public/` — the code already references them and gracefully falls back to a placeholder if a file is missing:

- `public/tideframe-mark.svg` — used in the header on light backgrounds.
- `public/tideframe-mark-monochrome.svg` — used in the footer (dark background).
- `public/tideframe-icon-glossy.png` — used on the homepage hero and as the Modeboard product icon.
- `public/favicon.svg` — the browser tab icon, referenced from `index.html`.
- `public/social-preview.svg` — the default image used when a page is shared on social media (og:image / twitter:image).

Keep the filenames exactly as listed — nothing else in the code needs to change when you drop in the real files.

## Deploy to Cloudflare Pages

1. Put this project in a GitHub repository.
2. In Cloudflare, open **Workers & Pages**, choose **Create**, then connect the repository.
3. Set **Build command** to `npm run build`.
4. Set **Build output directory** to `dist`.
5. Deploy. No environment variables are required.
6. Add `tideframelabs.com` under the Pages project's custom domains.

For React Router routes such as `/modeboard` to work when opened directly, configure Cloudflare Pages to fall back to `index.html`. The included `public/_redirects` file handles this automatically.

For the full first-time setup — including moving the domain's nameservers to Cloudflare and setting up email — see `DEPLOYMENT_CHECKLIST.md`. For everything still needed before this site can go live (screenshots, logos, legal review, a download link), see `CONTENT_CHECKLIST.md`.
