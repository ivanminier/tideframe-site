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
