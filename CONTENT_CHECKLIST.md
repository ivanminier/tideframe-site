# Content checklist

Keep these items accurate before each deployment.

## Modeboard release state

- [ ] Re-verify the release URL, version, build, byte size, SHA-256, architecture status, signing, notarization, and release date against the exact public artifact.
- [ ] Keep `status: 'available'` only while that exact artifact remains Developer ID signed, notarized, and hosted over HTTPS.
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
- [ ] Confirm `dist/_headers`, the two Tideframe mark SVGs, the approved glossy icon, the Modeboard icon, both social cards, and every referenced screenshot are present.
- [ ] Open every public route directly on the Cloudflare deployment, including an invalid route.
- [ ] Review the site at mobile, tablet, iPad, and desktop widths and check the browser console.
- [ ] Confirm every download button links to the exact versioned DMG and the published checksum matches it.

## Intentionally absent

- No analytics, cookies, tracking, forms, customer claims, testimonials, or speculative product roadmap.
- Lemon Squeezy is the selected merchant of record. No governing jurisdiction, entity type, or business address is stated until those facts are established.
- Changelog is the public human-readable release history; Sparkle release notes remain separately signed update assets.
