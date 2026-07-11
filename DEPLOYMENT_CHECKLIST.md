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
- [ ] `https://tideframelabs.com/changelog` loads
- [ ] `https://tideframelabs.com/about` loads
- [ ] `https://tideframelabs.com/brand` loads
- [ ] A route opened directly (not by clicking a link), like `https://tideframelabs.com/modeboard`, loads correctly instead of showing a 404 — this confirms `public/_redirects` is working.
- [ ] A made-up address like `https://tideframelabs.com/does-not-exist` shows the site's own "That page drifted away" page.
- [ ] `https://tideframelabs.com/sitemap.xml` loads and lists all 9 pages.
- [ ] `https://tideframelabs.com/robots.txt` loads.
- [ ] Pasting `https://tideframelabs.com/` into a social link-preview debugger (e.g. Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) or Twitter/X's card validator) shows the expected title, description, and image.
- [ ] A test email to `support@tideframelabs.com` and `hello@tideframelabs.com` both arrive.
- [ ] The header stays visible while scrolling (sticky), and the mobile menu opens and closes correctly on a phone-sized screen.

Before doing this, also confirm everything in `CONTENT_CHECKLIST.md` is either resolved or acceptable to launch with — this checklist gets the site live, but it doesn't check whether the content on it is finished.
