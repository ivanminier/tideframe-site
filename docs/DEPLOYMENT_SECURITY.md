# Deployment security

`public/_headers` is copied to `dist/_headers` by Vite and is intended for Cloudflare Pages. Test the deployed custom domain, because Vite's local preview server does not emulate Pages response-header rules.

## Policy rationale

- CSP defaults every resource to the same origin, blocks plugins/objects and framing, allows only same-origin scripts, fonts, network requests, workers, media, and manifests, and upgrades insecure subresources.
- `style-src 'unsafe-inline'` is the one deliberate exception. The site uses React style attributes for image aspect ratios and the static CSS does not load third-party styles. Do not add `'unsafe-eval'`, script nonces that cannot be generated on a static site, or wildcard hosts.
- `img-src` permits same-origin assets and `data:` for harmless inline image fallbacks. External images are not required.
- External HTTPS download and merchant checkout links are top-level navigations, not subresource loads, so the CSP does not need provider wildcards. `mailto:` links are also unaffected. When a provider is selected, allowlist its exact checkout hostname in `src/data/commerce.ts`; do not widen CSP unless its documented flow loads a resource on the Tideframe origin.
- `frame-ancestors 'none'` plus `X-Frame-Options: DENY` prevents clickjacking. `object-src 'none'`, `base-uri 'self'`, and `form-action 'self'` reduce injection impact.
- Permissions Policy disables browser capabilities this static site does not use. `payment=()` disables the Payment Request API on this origin; it does not prevent an ordinary redirect to an MoR checkout.

## HSTS

Do not preload HSTS merely because the repository builds. After the custom domain and every intended subdomain serve valid HTTPS and HTTP redirects correctly, configure a Cloudflare zone-level response header so it covers the full edge path:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Use Cloudflare **SSL/TLS → Edge Certificates → Always Use HTTPS**, then enable HSTS from the same Edge Certificates area. Start without `preload`. Add `preload` only after all subdomains have been audited and the domain owner accepts the long-lived preload commitment.

## Post-deployment verification

```sh
curl -I https://tideframelabs.com/
curl -I https://tideframelabs.com/modeboard
curl -I http://tideframelabs.com/
```

Confirm the HTTPS responses contain the repository headers and the HTTP response redirects to HTTPS. Then run the CSP through browser developer tools and verify navigation, images, fonts, the email links, the real release download, and the MoR sandbox redirect without CSP violations.
