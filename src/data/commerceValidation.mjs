export function getVerifiedCheckoutUrlData(config) {
  if (!config.enabled || !config.merchantOfRecord?.trim() || !config.merchantProductId?.trim()) return null
  try {
    const url = new URL(config.checkoutUrl ?? '')
    if (url.protocol !== 'https:' || !config.allowedCheckoutHosts.includes(url.hostname)) return null
    return url.href
  } catch {
    return null
  }
}
