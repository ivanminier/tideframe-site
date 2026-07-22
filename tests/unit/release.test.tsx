import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DownloadButton } from '../../src/components/DownloadButton'
import { ReleaseDetails } from '../../src/components/ReleaseDetails'
import {
  products,
  validateAppcastConfiguration,
  validateReleaseConfiguration,
  type Product,
  type ProductRelease,
} from '../../src/data/products'

function validProduct(): Product {
  return {
    ...products[0],
    status: 'available',
    release: {
      ...products[0].release,
      downloadUrl: 'https://downloads.tideframelabs.com/modeboard/Modeboard-1.0.0.zip',
      version: '1.0.0',
      buildNumber: '7',
      fileSizeBytes: 24_500_000,
      sha256: '8c1f3a4b5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708',
      testedMacOSVersions: ['15.5', '26.0'],
      releaseDate: '2026-07-01',
      bundleIdentifier: 'com.tideframelabs.modeboard',
      developerIdSigned: true,
      notarized: true,
      architectures: { appleSilicon: 'supported', intel: 'unsupported' },
      appcast: {
        url: 'https://tideframelabs.com/updates/modeboard/appcast.xml',
        validSparkleXML: true,
        xmlContentTypeVerified: true,
        signedReleaseEntry: true,
        archiveMatchesRelease: true,
        productionPublicKeyConfigured: true,
        updateFromPreviousBuildTested: true,
      },
    },
  }
}

describe('release download integrity', () => {
  it('enables the exact signed and notarized public DMG', () => {
    expect(validateReleaseConfiguration(products[0], new Date('2026-07-22T20:00:00Z'))).toEqual({ isReady: true, errors: [] })
    render(<DownloadButton product={products[0]} />)
    expect(screen.getByRole('link', { name: 'Download Modeboard' })).toHaveAttribute(
      'href',
      'https://tideframelabs.com/downloads/modeboard/Modeboard-1.0.1-8.dmg',
    )
  })

  it('enables a valid, complete release configuration', () => {
    const product = validProduct()
    expect(validateReleaseConfiguration(product, new Date('2026-07-13T00:00:00Z'))).toEqual({ isReady: true, errors: [] })
    render(<DownloadButton product={product} />)
    expect(screen.getByRole('link', { name: 'Download Modeboard' })).toHaveAttribute('href', product.release.downloadUrl)
  })

  it('displays release version, build, size, checksum, minimum, tested versions, and date', () => {
    const product = validProduct()
    render(<ReleaseDetails release={product.release} />)
    const details = screen.getByLabelText('Download details')
    expect(details).toHaveTextContent('1.0.0 (build 7)')
    expect(details).toHaveTextContent('24.5 MB')
    expect(details).toHaveTextContent(product.release.sha256 ?? '')
    expect(details).toHaveTextContent('15.0')
    expect(details).toHaveTextContent('15.5, 26.0')
    expect(details).toHaveTextContent('Apple silicon')
    expect(details).toHaveTextContent('2026-07-01')
  })

  it.each([
    ['placeholder URL', { downloadUrl: 'https://example.com/placeholder.zip' }],
    ['missing version', { version: null }],
    ['missing build', { buildNumber: null }],
    ['missing size', { fileSizeBytes: null }],
    ['placeholder checksum', { sha256: 'a'.repeat(64) }],
    ['future date', { releaseDate: '2027-01-01' }],
    ['wrong bundle identifier', { bundleIdentifier: 'com.example.modeboard' }],
    ['unsigned artifact', { developerIdSigned: false }],
    ['unnotarized artifact', { notarized: false }],
    ['unverified architecture', { architectures: { appleSilicon: 'not-yet-verified', intel: 'unsupported' } }],
  ])('rejects %s', (_label, releasePatch) => {
    const product = validProduct()
    product.release = { ...product.release, ...(releasePatch as Partial<ProductRelease>) }
    expect(validateReleaseConfiguration(product, new Date('2026-07-13T00:00:00Z')).isReady).toBe(false)
    const { container } = render(<DownloadButton product={product} />)
    expect(container.querySelector('a')).toBeNull()
  })

  it('keeps direct downloads independent from future Sparkle-update verification', () => {
    expect(validateReleaseConfiguration(products[0], new Date('2026-07-22T20:00:00Z')).isReady).toBe(true)
    expect(validateAppcastConfiguration(products[0]).isReady).toBe(false)
  })

  it('can withhold a valid release link when a caller explicitly closes it', () => {
    render(<DownloadButton product={validProduct()} enabled={false} label="Download Free Trial — Coming Soon" />)
    expect(screen.getByRole('button', { name: /download free trial — coming soon/i })).toBeDisabled()
    expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument()
  })
})

describe('Sparkle readiness', () => {
  it('accepts a fully verified production update path', () => {
    expect(validateAppcastConfiguration(validProduct())).toEqual({ isReady: true, errors: [] })
  })

  it.each([
    ['invalid appcast XML', { validSparkleXML: false }],
    ['unverified appcast content type', { xmlContentTypeVerified: false }],
    ['unsigned appcast entry', { signedReleaseEntry: false }],
    ['wrong update archive', { archiveMatchesRelease: false }],
    ['placeholder Sparkle key', { productionPublicKeyConfigured: false }],
    ['untested update path', { updateFromPreviousBuildTested: false }],
  ])('keeps Sparkle marked incomplete for %s', (_label, appcastPatch) => {
    const product = validProduct()
    product.release = {
      ...product.release,
      appcast: { ...product.release.appcast, ...appcastPatch },
    }
    expect(validateAppcastConfiguration(product).isReady).toBe(false)
  })
})
