# Content checklist

The public site is intentionally pre-release. Keep these items accurate before each deployment.

## Modeboard release state

- [ ] Keep the release URL, version, build, byte size, SHA-256, tested versions, architecture status, signing, notarization, and release date incomplete until each value is verified against the exact public artifact.
- [ ] Keep `status: 'coming-soon'` until that artifact is Developer ID signed, notarized, hosted over HTTPS, and tested from the published URL.
- [ ] Re-check the public price, 14-day trial, one-person/three-Mac license, 1.x update policy, access-code behavior, and refund language against the release build before accepting payment.
- [ ] Confirm the public minimum macOS version against the final release build.
- [ ] Record exact tested macOS releases and separately verify Apple silicon and Intel status; do not infer future compatibility.
- [ ] Confirm required permissions, undocumented macOS dependencies, and animated wallpaper limitations against the release candidate.

## Customer-facing checks

- [ ] Confirm `support@tideframelabs.com` and `hello@tideframelabs.com` receive mail.
- [ ] Confirm the production appcast serves valid signed Sparkle XML with an XML content type, the enclosure matches the exact update archive, the production public key is configured, and an installed N → N+1 update succeeds.
- [ ] Re-check Support, Privacy, Terms, and Acknowledgments whenever app permissions, data handling, licensing, or third-party software changes.
- [ ] Before commerce, confirm Lemon Squeezy approval, the exact allowlisted shareable checkout, Store `436050`, Product `1236025`, Variant `1932083`, and a real purchase/activation/offline/deactivation/refund lifecycle.
- [ ] Keep the Terms and Privacy updated dates accurate when their content changes.

## Deployment checks

- [ ] Run `npm ci`, `npm run type-check`, `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e`.
- [ ] Confirm `dist/_redirects`, `dist/_headers`, the two Tideframe mark SVGs, the approved glossy icon, the Modeboard icon, both social cards, and every referenced screenshot are present.
- [ ] Open every public route directly on the Cloudflare deployment, including an invalid route.
- [ ] Review the site at mobile, tablet, iPad, and desktop widths and check the browser console.
- [ ] Confirm no download button is linked until the real release exists.

## Intentionally absent

- No analytics, cookies, tracking, forms, customer claims, testimonials, or speculative product roadmap.
- Lemon Squeezy is the selected merchant of record. No governing jurisdiction, entity type, or business address is stated until those facts are established.
- Changelog remains a reserved route for future release notes and is not linked in public navigation before release.
