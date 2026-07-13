# Content checklist

The public site is intentionally pre-release. Keep these items accurate before each deployment.

## Modeboard release state

- [ ] Keep `downloadUrl`, `version`, and `sha256` as `null` until a real public artifact exists.
- [ ] Keep `status: 'coming-soon'` until that artifact is Developer ID signed, notarized, hosted over HTTPS, and tested from the published URL.
- [ ] Re-check the public price, 14-day trial, one-person/three-Mac license, 1.x update policy, access-code behavior, and refund language against the release build before accepting payment.
- [ ] Confirm the public minimum macOS version against the final release build.

## Customer-facing checks

- [ ] Confirm `support@tideframelabs.com` and `hello@tideframelabs.com` receive mail.
- [ ] Confirm the update feed URL and download URL use HTTPS before publishing either one.
- [ ] Re-check Support, Privacy, Terms, and Acknowledgments whenever app permissions, data handling, licensing, or third-party software changes.
- [ ] Keep the Terms and Privacy updated dates accurate when their content changes.

## Deployment checks

- [ ] Run `npm run lint`, `npm run type-check`, and `npm run build`.
- [ ] Confirm `dist/_redirects`, the two Tideframe mark SVGs, the approved glossy icon, the Modeboard icon, the social card, and every referenced screenshot are present.
- [ ] Open every public route directly on the Cloudflare deployment, including an invalid route.
- [ ] Review the site at mobile, tablet, iPad, and desktop widths and check the browser console.
- [ ] Confirm no download button is linked until the real release exists.

## Intentionally absent

- No analytics, cookies, tracking, forms, customer claims, testimonials, or speculative product roadmap.
- No payment processor, governing jurisdiction, entity type, or business address is stated until those facts are established.
- Changelog remains a reserved route for future release notes and is not linked in public navigation before release.
