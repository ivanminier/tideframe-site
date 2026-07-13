import { commerceConfig, getVerifiedCheckoutUrl, type CommerceConfiguration } from '../data/commerce'

export function PurchaseButton({ config = commerceConfig }: { config?: CommerceConfiguration }) {
  const checkoutUrl = getVerifiedCheckoutUrl(config)
  if (!checkoutUrl) {
    return <button className="button button-disabled" type="button" disabled>Purchase available at launch</button>
  }
  return <a className="button" href={checkoutUrl}>Buy Modeboard</a>
}
