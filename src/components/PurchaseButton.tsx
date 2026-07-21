import { commerceConfig, getVerifiedCheckoutUrl, type CommerceConfiguration } from '../data/commerce'

export function PurchaseButton({
  config = commerceConfig,
  enabled = true,
  label = 'Buy Modeboard',
  unavailableLabel = 'Purchase available at launch',
}: {
  config?: CommerceConfiguration
  enabled?: boolean
  label?: string
  unavailableLabel?: string
}) {
  const checkoutUrl = getVerifiedCheckoutUrl(config)
  if (!checkoutUrl || !enabled) {
    return <button className="button button-disabled" type="button" disabled>{unavailableLabel}</button>
  }
  return <a className="button" href={checkoutUrl}>{label}</a>
}
