import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PurchaseButton } from '../../src/components/PurchaseButton'
import { commerceConfig, getVerifiedCheckoutUrl, type CommerceConfiguration } from '../../src/data/commerce'

const readyConfig: CommerceConfiguration = {
  enabled: true,
  merchantOfRecord: 'Lemon Squeezy',
  checkoutUrl: 'https://tideframelabs.lemonsqueezy.com/checkout/buy/7fcb6206-1234-5678-9abc-123456789abc',
  allowedCheckoutHosts: ['tideframelabs.lemonsqueezy.com'],
  merchantStoreId: '436050',
  merchantProductId: '1236025',
  merchantVariantId: '1932083',
}

describe('commerce boundary', () => {
  it('keeps checkout disabled until all public merchant settings are verified', () => {
    expect(getVerifiedCheckoutUrl(commerceConfig)).toBeNull()
    render(<PurchaseButton />)
    expect(screen.getByRole('button', { name: /purchase available at launch/i })).toBeDisabled()
  })

  it('accepts only a valid shareable Lemon Squeezy checkout', () => {
    expect(getVerifiedCheckoutUrl(readyConfig)).toBe(readyConfig.checkoutUrl)
    render(<PurchaseButton config={readyConfig} />)
    expect(screen.getByRole('link', { name: 'Buy Modeboard' })).toHaveAttribute('href', readyConfig.checkoutUrl)
  })

  it.each([
    ['HTTP', { checkoutUrl: 'http://tideframelabs.lemonsqueezy.com/checkout/buy/real-id' }],
    ['wrong hostname', { checkoutUrl: 'https://lookalike.test/checkout/buy/real-id' }],
    ['credentials', { checkoutUrl: 'https://user:pass@tideframelabs.lemonsqueezy.com/checkout/buy/real-id' }],
    ['cart URL', { checkoutUrl: 'https://tideframelabs.lemonsqueezy.com/checkout/buy/real-id?cart=customer-cart' }],
    ['fragment', { checkoutUrl: 'https://tideframelabs.lemonsqueezy.com/checkout/buy/real-id#customer' }],
    ['placeholder URL', { checkoutUrl: 'https://tideframelabs.lemonsqueezy.com/checkout/buy/placeholder' }],
    ['wrong merchant', { merchantOfRecord: 'Another Merchant' }],
    ['missing store ID', { merchantStoreId: null }],
    ['missing product ID', { merchantProductId: null }],
    ['missing variant ID', { merchantVariantId: null }],
  ])('rejects %s', (_label, patch) => {
    expect(getVerifiedCheckoutUrl({ ...readyConfig, ...patch })).toBeNull()
  })

  it('keeps disabled commerce unavailable even when every other field is valid', () => {
    expect(getVerifiedCheckoutUrl({ ...readyConfig, enabled: false })).toBeNull()
  })

  it('does not let purchase UI bypass either validator result or the combined launch gate', () => {
    const invalid = render(<PurchaseButton config={{ ...readyConfig, checkoutUrl: 'https://wrong.test/checkout/buy/id' }} />)
    expect(screen.getByRole('button', { name: /purchase available at launch/i })).toBeDisabled()
    invalid.unmount()

    render(<PurchaseButton config={readyConfig} enabled={false} unavailableLabel="Buy for $14.99 — Coming Soon" />)
    expect(screen.getByRole('button', { name: /buy for \$14\.99 — coming soon/i })).toBeDisabled()
    expect(screen.queryByRole('link', { name: /buy/i })).not.toBeInTheDocument()
  })
})
