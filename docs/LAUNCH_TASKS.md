# Modeboard launch tasks

These are owner-controlled tasks. Completing a task does not authorize deployment, upload, signing, notarization, tagging, commerce enablement, or a version change by itself.

## Launch content

- [ ] Record a 30–45 second demonstration showing Work → Relax profile switching, including visible Dock, wallpaper, Desktop, app, appearance, and Focus changes.
- [ ] Capture any replacement screenshots from the exact signed customer candidate and check for private information, test data, stale labels, crop quality, and mobile legibility.

## After Apple Developer approval

- [ ] Install and verify the owner-controlled Developer ID Application identity and notarization credentials outside source control.
- [ ] Replace release-only public-key placeholders through the reviewed Modeboard release process.
- [ ] Build the exact customer candidate from clean source without changing the planned version solely for this website pass.
- [ ] Verify nested signatures, Hardened Runtime, entitlements, bundle identity, Universal slices, notarization acceptance, stapling, and Gatekeeper.
- [ ] Build and inspect the final DMG, record its exact size and SHA-256, then browser-download it with quarantine and test it on a clean Mac/account.
- [ ] Complete the advertised macOS/hardware, accessibility, install, update, uninstall, backup/restore, Focus, and license matrices.
- [ ] Generate and verify the signed production Sparkle appcast/archive and pass an installed N → N+1 update before publishing the feed.

## After Lemon Squeezy approval

- [ ] Confirm live Store `436050`, Product `1236025`, Variant `1932083`, $14.99 USD introductory price, one-time purchase, three-activation limit, and 14-day trial copy.
- [ ] Copy the exact shareable HTTPS `/checkout/buy/` URL and exact Lemon Squeezy hostname into the public commerce configuration; do not use a customer/cart URL.
- [ ] Run a real purchase, activation, offline relaunch, periodic validation, three-Mac limit, deactivation, seat reuse, refund, and chargeback lifecycle.
- [ ] Review Lemon Squeezy receipts, refund handling, privacy disclosures, final Terms, and the manual refund/chargeback license runbook.
- [ ] Enable commerce only in the same reviewed launch change that confirms the release validator also passes.
