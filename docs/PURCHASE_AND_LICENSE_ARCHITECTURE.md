# Modeboard purchase and license architecture

Status: v1 architecture, owner approval still pending. Commerce remains disabled.

## Public commercial model

- $14.99 USD introductory one-time purchase.
- One individual on up to three personally controlled Macs.
- 14-day full-feature trial.
- Perpetual use of the purchased version and all Modeboard 1.x updates.
- Future major-version upgrades are not promised.
- Lemon Squeezy is the merchant of record: Store `436050`, Product `1236025`, Variant `1932083`.

## Actual v1 system

1. The static website links to a Lemon Squeezy-hosted, shareable checkout only after the fail-closed validator accepts the exact URL and identifiers.
2. Lemon Squeezy handles checkout, payment, tax, receipts, refunds, chargebacks, customer records, and license-key delivery.
3. The customer enters the Lemon Squeezy license key in Modeboard. Modeboard sends the key and a generated installation instance name to Lemon Squeezy's public License API for activation.
4. Modeboard verifies the expected store, product, variant, perpetual state, three-activation limit, and returned instance. It then stores a device-only activation receipt in macOS Keychain.
5. The activated perpetual license works offline. Modeboard performs occasional validation while a connection is available; temporary connection, rate-limit, or server failures preserve offline access.
6. Removing a license while online deactivates the saved instance and returns its seat before the local receipt is removed.
7. Sparkle handles application updates independently of licensing.

No custom webhook receiver, customer database, fulfillment backend, recovery portal, transactional-email service, or paid-license signing service is required for v1. A future backend is optional and should be added only for a concrete customer or operational need.

Existing `MB1` signed codes are internal owner-issued offline, beta, or support licenses. Do not market them publicly, explain their format in customer material, or submit them to Lemon Squeezy.

## Static website boundary

`src/data/commerce-config.json` contains public, non-secret settings only. Never put a Lemon Squeezy account API key, secret, full customer license key, payment data, private signing material, or customer record in this repository, a `VITE_*` variable, browser storage, source archives, screenshots, or logs.

Commerce stays disabled until all of these are true:

- Lemon Squeezy business approval is complete.
- The owner supplies the exact live shareable `/checkout/buy/` URL.
- The exact Lemon Squeezy hostname is allowlisted.
- Store `436050`, Product `1236025`, and Variant `1932083` are confirmed in the live account.
- A real purchase, activation, offline relaunch, validation, deactivation, seat reuse, refund, and chargeback lifecycle passes.
- Privacy, Terms, refund language, and support procedures receive owner review.

The website purchase link is still withheld unless the separate release validator also passes. Pricing schema is not an availability signal and remains without an `Offer` until both boundaries pass.

## Refund and chargeback owner runbook

After a Lemon Squeezy refund or chargeback:

1. Locate the corresponding order in Lemon Squeezy.
2. Locate the issued license using the minimum order reference needed.
3. Confirm whether Lemon Squeezy disabled the license.
4. If continued access is no longer authorized and the key remains active, disable it manually.
5. Never place the full license key in support logs, tickets, screenshots, analytics, or public documentation.
6. Retain only the minimum support reference required for the case and follow Lemon Squeezy's independent retention rules.

Do not build a v1 webhook backend solely to automate this owner procedure.

## Failure expectations

- Initial activation requires internet access.
- An activated perpetual license starts from its local Keychain receipt without waiting for the network.
- Temporary network or Lemon Squeezy service failure must not revoke an activated perpetual license.
- An authoritative invalid or revoked response may remove the entitlement.
- If online deactivation cannot complete, Modeboard retains the receipt and asks the user to retry rather than orphaning a server-side activation.
- Updates must remain available independently of purchase-provider availability, subject to the signed Sparkle feed being valid.
