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
- `/updates/modeboard/appcast.xml` is explicitly routed to a plain unavailable response with HTTP 404 until the signed production feed replaces that rule.

External owner gates remain Apple Developer approval, a signed/notarized customer artifact, exact downloaded-DMG Gatekeeper testing, clean-machine compatibility testing, Lemon Squeezy approval and live checkout, a real license lifecycle, a valid production appcast, and final owner/legal review.
