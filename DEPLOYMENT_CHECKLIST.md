# Deployment checklist

A beginner-friendly, step-by-step path from this codebase to a live site at `tideframelabs.com`. Do these in order — later steps depend on earlier ones. None of these steps modify your local files; they're all account and DNS setup.

## 1. Put the project on GitHub

1. Create a free [GitHub](https://github.com) account if you don't have one.
2. Create a new, empty repository (public or private both work).
3. From this project folder, run:
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <the URL GitHub gave you>
   git push -u origin main
   ```

## 2. Create the Cloudflare Pages project

1. Create a free [Cloudflare](https://dash.cloudflare.com/sign-up) account if you don't have one.
2. In the Cloudflare dashboard, open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Choose the GitHub repository from step 1.
4. Set:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Cloudflare gives you a working `*.pages.dev` URL immediately — check that it loads before moving on.

## 3. Move the domain's nameservers from IONOS to Cloudflare

This step points `tideframelabs.com` at Cloudflare so Cloudflare can serve the site and manage DNS/email records.

1. In the Cloudflare dashboard, click **Add a Site** and enter `tideframelabs.com`. Choose the Free plan.
2. Cloudflare scans your existing DNS records and shows you two nameserver addresses (something like `xxx.ns.cloudflare.com` and `yyy.ns.cloudflare.com`). **Note these down.**
3. Log in to **IONOS**, find the domain `tideframelabs.com`, and open its nameserver / DNS settings.
4. Replace the existing IONOS nameservers with the two Cloudflare nameservers from step 2.
5. Save. Nameserver changes can take anywhere from a few minutes to 24–48 hours to propagate. Cloudflare emails you once it detects the change and activates the zone.

**Do this before step 5 (email routing)** — email routing depends on Cloudflare managing DNS for the domain.

## 4. Add the custom domain to the Pages project

1. Back in **Workers & Pages** → your project → **Custom domains**.
2. Add `tideframelabs.com` and `www.tideframelabs.com` (Cloudflare will offer to redirect `www` to the root domain, or vice versa — either is fine, pick one as the canonical version and keep `src/config.ts`'s `siteUrl` matching it).
3. Cloudflare automatically creates the necessary DNS records once the zone is active.

## 5. Confirm HTTPS

Cloudflare provisions a free SSL certificate automatically once the domain is active on Cloudflare's nameservers — this usually takes a few minutes to a few hours after step 3 completes. In **SSL/TLS**, confirm the encryption mode is set to **Full** (not "Flexible"). Visit `https://tideframelabs.com` and confirm the browser shows a valid, secure connection with no warnings.

## 6. Set up email routing

To keep `support@tideframelabs.com` and `hello@tideframelabs.com` working:

1. In the Cloudflare dashboard for `tideframelabs.com`, open **Email** → **Email Routing**.
2. Follow the setup wizard — Cloudflare will add the required MX and TXT records automatically (since it now manages your DNS).
3. Add a routing rule for each address (`support@` and `hello@`) forwarding to whichever real inbox you want to receive them at.
4. Send a test email to each address and confirm it arrives.

If you were previously using IONOS for email on this domain, do this step before considering the nameserver migration finished, or you'll stop receiving mail at those addresses.

## 7. Post-deployment tests

Once the domain is live, check the following by visiting the real URLs in a browser:

- [ ] `https://tideframelabs.com/` loads
- [ ] `https://tideframelabs.com/products` loads
- [ ] `https://tideframelabs.com/modeboard` loads
- [ ] `https://tideframelabs.com/support` loads
- [ ] `https://tideframelabs.com/privacy` loads
- [ ] `https://tideframelabs.com/terms` loads
- [ ] `https://tideframelabs.com/about` loads
- [ ] `https://tideframelabs.com/brand` loads
- [ ] `https://tideframelabs.com/acknowledgments` loads and shows the Sparkle MIT License notice
- [ ] A route opened directly (not by clicking a link), like `https://tideframelabs.com/products` (which relies on the `_redirects` SPA fallback), loads correctly instead of showing a 404.
- [ ] A made-up address like `https://tideframelabs.com/does-not-exist` shows the site's own 404 page.
- [ ] View source (not just the rendered page — your browser's actual "View Page Source", which shows the HTML before JavaScript runs) on `https://tideframelabs.com/modeboard` and confirm the `<title>` already says "Modeboard by Tideframe Labs" and there's a `<script type="application/ld+json">` block, without needing to wait for the page to finish loading. Repeat for `/privacy`, `/terms`, and `/support` — each should show its own title in raw HTML, not the homepage's.
- [ ] `https://tideframelabs.com/sitemap.xml` loads and lists all public pages.
- [ ] `https://tideframelabs.com/robots.txt` loads.
- [ ] Pasting `https://tideframelabs.com/` and `https://tideframelabs.com/modeboard` into a social link-preview debugger (e.g. Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) or Twitter/X's card validator) shows the expected title, description, and current social-preview image.
- [ ] A test email to `support@tideframelabs.com` and `hello@tideframelabs.com` both arrive.
- [ ] The header stays visible while scrolling (sticky), and the mobile menu opens and closes correctly on a phone-sized screen.

**Before setting a real `downloadUrl` in `src/data/products.ts`:**

- [ ] The linked file is served over `https://`, is the exact signed/notarized build, and (if you've set a `sha256` checksum on the site) the checksum actually matches that exact file — run `shasum -a 256 <file>` locally and compare.
- [ ] If Sparkle is wired up by then, confirm the appcast/feed URL it points to also uses `https://`.
- [ ] Re-run a fact-check of the Modeboard app repo (permissions, network behavior, license verification) before flipping `status` to `'available'` — the site's current claims describe the *plan*, not a verified shipped build (see `CONTENT_CHECKLIST.md`).

Before doing this, also confirm everything in `CONTENT_CHECKLIST.md` is either resolved or acceptable to launch with — this checklist gets the site live, but it doesn't check whether the content on it is finished.
