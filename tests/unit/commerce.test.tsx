import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PurchaseButton } from '../../src/components/PurchaseButton'
import { commerceConfig, getVerifiedCheckoutUrl, type CommerceConfiguration } from '../../src/data/commerce'

const readyConfig: CommerceConfiguration = {
  enabled: true,
  merchantOfRecord: 'Selected Merchant',
  checkoutUrl: 'https://checkout.merchant.test/buy/modeboard',
  allowedCheckoutHosts: ['checkout.merchant.test'],
  merchantProductId: 'modeboard-1',
}

describe('commerce boundary', () => {
  it('keeps checkout disabled until all public merchant settings are verified', () => {
    expect(getVerifiedCheckoutUrl(commerceConfig)).toBeNull()
    render(<PurchaseButton />)
    expect(screen.getByRole('button', { name: /purchase available at launch/i })).toBeDisabled()
  })

  it('rejects an unapproved checkout host', () => {
    expect(getVerifiedCheckoutUrl({ ...readyConfig, checkoutUrl: 'https://lookalike.test/buy' })).toBeNull()
  })

  it('links only to an enabled allowlisted HTTPS merchant checkout', () => {
    render(<PurchaseButton config={readyConfig} />)
    expect(screen.getByRole('link', { name: 'Buy Modeboard' })).toHaveAttribute('href', readyConfig.checkoutUrl)
  })
})
