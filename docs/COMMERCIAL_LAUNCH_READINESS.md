# Commercial launch readiness record

## Pre-edit baseline — July 13, 2026

The worktree was clean (`git status --short` returned no entries). Dependencies were reinstalled from `package-lock.json` with `npm ci` before validation.

| Check | Initial result |
| --- | --- |
| `npm run type-check` | Passed |
| `npm run lint` | Passed |
| `npm audit --audit-level=moderate` | Initial sandbox DNS failure; approved registry retry passed with 0 vulnerabilities |
| `npm run build` | Passed |
| JavaScript bundle | 281.96 kB raw / 87.51 kB gzip |
| CSS bundle | 15.48 kB raw / 4.44 kB gzip |
| HTML shell | 1.75 kB raw / 0.58 kB gzip |

Initial gaps: no automated tests or CI; no Cloudflare Pages `_headers` or `_redirects`; the sitemap omitted `/changelog`; download activation depended only on a non-empty URL; Modeboard used the generic social card; compatibility did not separately report tested macOS versions or architecture status; and purchase/webhook/signing/recovery responsibilities were not specified.

This record intentionally describes the baseline and must not be rewritten to make later results appear to have existed before the launch-hardening work.

## Finalization pass — July 21, 2026

The visual system and real product screenshots were retained. The pass corrected customer-facing product and legal copy, treated Focus integration as supported, documented the Lemon Squeezy v1 architecture, and strengthened commerce/release validation without enabling either public boundary.

Current fail-closed state:

- Product status remains `coming-soon`.
- Download URL, version, build, byte size, checksum, tested versions, release date, and verified architecture support remain incomplete.
- Developer ID signing, notarization, production Sparkle feed checks, and installed N → N+1 updating remain false.
- Commerce remains disabled with no checkout URL or allowlisted host.
- Software structured data contains no `Offer`, availability, unverified OS compatibility, ratings, reviews, or download counts.
- `/updates/modeboard/appcast.xml` is intercepted by `worker/index.js` and returns a plain-text, `no-store` HTTP 404 until the signed production feed deliberately replaces that route.

External owner gates remain Apple Developer approval, a signed/notarized customer artifact, exact downloaded-DMG Gatekeeper testing, clean-machine compatibility testing, Lemon Squeezy approval and live checkout, a real license lifecycle, a valid production appcast, and final owner/legal review.

## Public-download pass — July 22, 2026

Modeboard 1.0.0 (build 7) now has versioned, signed, notarized, and stapled release artifacts. The website publishes the exact canonical DMG from the Modeboard release directory at `/downloads/modeboard/Modeboard-1.0.0-7.dmg`; its byte size and SHA-256 are enforced by automated tests. The signed Sparkle appcast, ZIP, and release notes are staged separately under `/updates/modeboard/`.

The direct trial download is intentionally independent of commerce and future-update acceptance. Checkout remains disabled until its own Lemon Squeezy configuration passes. The Sparkle readiness check also remains incomplete until the deployed appcast content type and a real installed N → N+1 update are verified. The site makes no claim that Intel runtime was independently tested: it states only that the notarized Universal artifact contains Apple silicon and Intel code.

## Modeboard 1.0.1 website preparation — July 22, 2026

The website now points its primary download and structured release metadata to Modeboard 1.0.1 (build 8). The canonical notarized DMG and signed Sparkle ZIP, appcast, and release notes were staged from `release/v1.0.1` without regenerating signatures. The previously published 1.0.0 DMG, ZIP, and notes remain present and are guarded by exact size and SHA-256 regression checks. Commerce remains disabled and unchanged.
