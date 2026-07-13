# Content checklist

The public site is intentionally pre-release. Keep these items accurate before each deployment.

## Modeboard release state

- [ ] Keep the release URL, version, build, byte size, SHA-256, tested versions, architecture status, and release date incomplete until each value is verified against a real public artifact.
- [ ] Keep `status: 'coming-soon'` until that artifact is Developer ID signed, notarized, hosted over HTTPS, and tested from the published URL.
- [ ] Re-check the public price, 14-day trial, one-person/three-Mac license, 1.x update policy, access-code behavior, and refund language against the release build before accepting payment.
- [ ] Confirm the public minimum macOS version against the final release build.
- [ ] Record exact tested macOS releases and separately verify Apple silicon and Intel status; do not infer future compatibility.
- [ ] Confirm required permissions, undocumented macOS dependencies, and animated wallpaper limitations against the release candidate.

## Customer-facing checks

- [ ] Confirm `support@tideframelabs.com` and `hello@tideframelabs.com` receive mail.
- [ ] Confirm the update feed URL and download URL use HTTPS before publishing either one.
- [ ] Re-check Support, Privacy, Terms, and Acknowledgments whenever app permissions, data handling, licensing, or third-party software changes.
- [ ] Before commerce, name the merchant of record in Privacy and Terms and verify its checkout, webhook, order-data, refund, email, and recovery disclosures.
- [ ] Keep the Terms and Privacy updated dates accurate when their content changes.

## Deployment checks

- [ ] Run `npm ci`, `npm run type-check`, `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e`.
- [ ] Confirm `dist/_redirects`, `dist/_headers`, the two Tideframe mark SVGs, the approved glossy icon, the Modeboard icon, both social cards, and every referenced screenshot are present.
- [ ] Open every public route directly on the Cloudflare deployment, including an invalid route.
- [ ] Review the site at mobile, tablet, iPad, and desktop widths and check the browser console.
- [ ] Confirm no download button is linked until the real release exists.

## Intentionally absent

- No analytics, cookies, tracking, forms, customer claims, testimonials, or speculative product roadmap.
- No selected payment processor, governing jurisdiction, entity type, or business address is stated until those facts are established.
- Changelog remains a reserved route for future release notes and is not linked in public navigation before release.
