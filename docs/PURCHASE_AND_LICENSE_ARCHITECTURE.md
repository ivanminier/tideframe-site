# Modeboard purchase and license fulfillment specification

Status: design only. No merchant, checkout, webhook, fulfillment service, email provider, or production signing key is configured in this repository.

## Boundary and customer model

- Sell Modeboard as a one-time purchase through a merchant of record (MoR). The MoR hosts checkout, handles raw card data, tax calculation/remittance, receipts, and its own payment compliance.
- The license is for one individual on up to three personally controlled Macs. This is a contractual allowance; the offline app does not silently inventory customer Macs.
- The full-feature trial lasts 14 days. Paid licenses include all 1.x updates.
- The static website contains only public checkout settings. Never place an MoR API key, webhook secret, email credential, license-signing private key, or recovery secret in this repository, a `VITE_*` variable, browser storage, a downloadable app, or client-visible logs.

## Required services

1. **MoR checkout:** a hosted checkout for the Modeboard product and price. Configure an exact allowlisted checkout hostname in `src/data/commerce-config.json` only after a real account and product exist.
2. **Webhook receiver:** a small private server endpoint, for example `POST /webhooks/merchant`, that reads the raw request body, verifies the MoR signature and timestamp, rejects unverifiable events, and returns quickly.
3. **Order and fulfillment store:** a transactional database holding provider event IDs, provider order IDs, payment state, customer email, license ID, fulfillment state, and timestamps. Store only the information needed for fulfillment, support, tax/receipt links, refund state, and recovery.
4. **License signer:** an isolated server job or protected CI job with access to the signing private key. The webhook-facing process should enqueue signing rather than log or expose key material. The app contains only the public verification key.
5. **Transactional email:** sends the access code and recovery messages. Do not include the access code in analytics, exception reports, URL query strings, or routine logs.

## Payment-to-license sequence

1. The browser follows an ordinary HTTPS link to the hosted MoR checkout. Tideframe Labs never renders card fields.
2. The MoR redirects the browser to a Tideframe success URL carrying only an opaque checkout reference supported by that provider. The success page treats the browser redirect as untrusted and asks the private backend for status.
3. Independently, the MoR sends a signed `payment completed` webhook. The receiver verifies the signature against the raw body, confirms the expected product/currency/amount, and writes the event and order in one transaction.
4. A fulfillment job allocates a unique UUID license ID, constructs the canonical payload, signs its exact bytes with the private key, stores the resulting access code, and marks fulfillment complete.
5. The success page polls an authenticated, rate-limited endpoint using an opaque, short-lived HttpOnly SameSite cookie or one-time token. It shows the code only after server-side payment verification and fulfillment. It must never mint or sign a license in the browser.
6. The email service sends the same code to the MoR-verified purchaser email. Delivery retries are recorded without printing the code in logs.

## Signed payload

Use a versioned canonical serialization such as deterministic JSON or CBOR. A paid payload should contain:

```text
schema_version, license_id, product_id, product_major_version,
license_kind=paid, issued_at, purchaser_reference, max_personal_macs=3
```

`purchaser_reference` should be a non-secret support reference, not raw card data. Paid payloads have no expiry and continue verifying offline. Beta payloads use `license_kind=beta` and a required `expires_at`. Sign the payload with the Modeboard licensing private key and encode payload plus signature as the customer access code.

## Idempotency and state

- Put a unique database constraint on `(provider, provider_event_id)` and another on `(provider, provider_order_id)`.
- Process each event in a transaction. A duplicate completed-payment event returns success with the existing order/license and never creates or emails a second license.
- Give every license a unique UUID and keep an audit trail linking it to the provider order and each fulfillment attempt.
- Suggested order states: `pending`, `paid`, `refunded`, `partially_refunded`, `chargeback_open`, `charged_back`, `canceled`.
- Suggested fulfillment states: `not_ready`, `queued`, `signed`, `emailed`, `delivery_failed`.
- Refund and chargeback events update order state idempotently. Because paid codes verify offline, already issued codes are not silently revoked. The state can block future recovery/reissue and inform support while preserving honest offline behavior.

## Recovery

- Offer `POST /license-recovery` with a verified order ID or purchaser email. Always return the same generic response to prevent account enumeration and rate-limit by IP and normalized email hash.
- Send a short-lived, single-use recovery link only to the MoR-verified order email. The link opens a backend-served page or exchanges for an HttpOnly session before revealing the code.
- Record recovery attempts and successful retrievals. Support can search by license ID or provider order ID; never by raw card details.

## Failure and security requirements

- Verify webhook signatures, timestamps, expected environment, product ID, currency, amount, and final payment state before fulfillment.
- Rotate webhook and email secrets without rotating the offline license key. Rotate license keys only with a versioned public-key migration plan in the app.
- Disable request-body logging on webhook, success, signing, and recovery endpoints. Redact email, checkout references, access codes, signatures, and all secrets from errors.
- Back up the order/license database encrypted. Restrict private-key access to the signing workload and named operators; keep an auditable key-access policy.
- Test duplicate delivery, out-of-order refund events, signer timeout, email failure, success-page refresh, expired beta codes, paid offline verification, and recovery replay before launch.

## Still required before activation

Select the MoR and email provider; create the product/price; obtain approved checkout hostnames, webhook signing secret, product ID, success URL format, and refund event names; provision the private backend/database/queue; install the real public verification key in Modeboard; store the private key in protected secret storage; complete legal review; and run sandbox plus live low-value purchase/refund/recovery drills. Only then set `commerceConfig.enabled` to `true`.
