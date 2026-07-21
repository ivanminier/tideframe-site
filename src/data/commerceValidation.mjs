const PLACEHOLDER_PATTERN = /(example|placeholder|change[-_ ]?me|todo|your[-_ ]|merchant|product|variant)/i
const LEMON_HOST_PATTERN = /^(?:[a-z0-9-]+\.)+lemonsqueezy\.com$/i
const SHAREABLE_CHECKOUT_PATTERN = /^\/checkout\/buy\/[^/]+\/?$/

function validIdentifier(value) {
  return Boolean(value?.trim()) && !PLACEHOLDER_PATTERN.test(value)
}

export function getVerifiedCheckoutUrlData(config) {
  if (!config.enabled || config.merchantOfRecord?.trim().toLowerCase() !== 'lemon squeezy') return null
  if (!validIdentifier(config.merchantStoreId) || !validIdentifier(config.merchantProductId) || !validIdentifier(config.merchantVariantId)) return null
  if (!Array.isArray(config.allowedCheckoutHosts) || config.allowedCheckoutHosts.length === 0) return null
  try {
    const url = new URL(config.checkoutUrl ?? '')
    const allowedHosts = config.allowedCheckoutHosts.map((host) => host.trim().toLowerCase())
    if (url.protocol !== 'https:' || url.username || url.password || url.hash || url.searchParams.has('cart')) return null
    if (!LEMON_HOST_PATTERN.test(url.hostname) || !allowedHosts.includes(url.hostname.toLowerCase())) return null
    if (!SHAREABLE_CHECKOUT_PATTERN.test(url.pathname) || PLACEHOLDER_PATTERN.test(url.href)) return null
    return url.href
  } catch {
    return null
  }
}
