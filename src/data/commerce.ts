import rawCommerceConfig from './commerce-config.json'
import { getVerifiedCheckoutUrlData } from './commerceValidation.mjs'

export interface CommerceConfiguration {
  enabled: boolean
  merchantOfRecord: string | null
  checkoutUrl: string | null
  allowedCheckoutHosts: string[]
  merchantStoreId: string | null
  merchantProductId: string | null
  merchantVariantId: string | null
}

/**
 * Public, non-secret checkout settings only. Webhook secrets, API keys, signing
 * keys, and fulfillment credentials must never be added here or to any VITE_* value.
 */
export const commerceConfig = rawCommerceConfig as CommerceConfiguration

export function getVerifiedCheckoutUrl(config: CommerceConfiguration): string | null {
  return getVerifiedCheckoutUrlData(config)
}
