const PLACEHOLDER_PATTERN = /(example|placeholder|change[-_ ]?me|todo|your[-_ ])/i
const VERSION_PATTERN = /^\d+\.\d+(?:\.\d+)?(?:[-+][0-9A-Za-z.-]+)?$/
const MACOS_VERSION_PATTERN = /^\d+(?:\.\d+){0,2}$/
const SHA256_PATTERN = /^[a-fA-F0-9]{64}$/
const RELEASE_FILE_PATTERN = /\.(?:dmg|pkg|zip)$/i

export function validateReleaseData(product, now = new Date()) {
  const { release } = product
  const errors = []
  if (product.status === 'coming-soon') errors.push('Product status is still coming-soon.')
  try {
    const url = new URL(release.downloadUrl ?? '')
    if (url.protocol !== 'https:') errors.push('Download URL must use HTTPS.')
    if (PLACEHOLDER_PATTERN.test(url.href) || !RELEASE_FILE_PATTERN.test(url.pathname)) errors.push('Download URL must identify a real DMG, PKG, or ZIP artifact.')
  } catch {
    errors.push('Download URL is missing or invalid.')
  }
  if (!release.version || !VERSION_PATTERN.test(release.version) || PLACEHOLDER_PATTERN.test(release.version)) errors.push('Version is missing or invalid.')
  if (!release.buildNumber || !/^[1-9]\d*$/.test(release.buildNumber)) errors.push('Build number is missing or invalid.')
  if (!release.fileSizeBytes || !Number.isSafeInteger(release.fileSizeBytes) || release.fileSizeBytes < 1_000_000) errors.push('File size is missing or implausible.')
  if (!release.sha256 || !SHA256_PATTERN.test(release.sha256) || /^(.)\1{63}$/.test(release.sha256)) errors.push('SHA-256 checksum is missing, invalid, or placeholder-like.')
  if (!MACOS_VERSION_PATTERN.test(release.minimumMacOSVersion)) errors.push('Minimum macOS version is invalid.')
  if (release.testedMacOSVersions.length === 0 || release.testedMacOSVersions.some((version) => !MACOS_VERSION_PATTERN.test(version))) errors.push('At least one valid tested macOS version is required.')
  if (!release.releaseDate || Number.isNaN(Date.parse(`${release.releaseDate}T00:00:00Z`))) errors.push('Release date is missing or invalid.')
  else if (new Date(`${release.releaseDate}T00:00:00Z`) > now) errors.push('Release date cannot be in the future.')
  if (Object.values(release.architectures).includes('not-yet-verified')) errors.push('Apple silicon and Intel support must each be explicitly verified or unsupported.')
  if (!Object.values(release.architectures).includes('supported')) errors.push('At least one Mac architecture must be supported.')
  if (release.requiredPermissions.length === 0) errors.push('Required permissions must be documented.')
  if (!release.undocumentedBehavior.trim()) errors.push('Undocumented macOS dependencies must be documented.')
  if (!release.animatedWallpaperLimitations.trim()) errors.push('Animated wallpaper limitations must be documented.')
  return { isReady: errors.length === 0, errors }
}
