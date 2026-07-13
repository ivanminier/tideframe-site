import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DownloadButton } from '../../src/components/DownloadButton'
import { ReleaseDetails } from '../../src/components/ReleaseDetails'
import { products, validateReleaseConfiguration, type Product, type ProductRelease } from '../../src/data/products'

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
      architectures: { appleSilicon: 'supported', intel: 'unsupported' },
    },
  }
}

describe('release download integrity', () => {
  it('keeps the real configuration disabled while required fields are incomplete', () => {
    expect(validateReleaseConfiguration(products[0]).isReady).toBe(false)
    render(<DownloadButton product={products[0]} />)
    expect(screen.getByRole('button', { name: 'Coming Soon' })).toBeDisabled()
    expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument()
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
    expect(details).toHaveTextContent('2026-07-01')
  })

  it.each([
    ['placeholder URL', { downloadUrl: 'https://example.com/placeholder.zip' }],
    ['missing version', { version: null }],
    ['missing build', { buildNumber: null }],
    ['missing size', { fileSizeBytes: null }],
    ['placeholder checksum', { sha256: 'a'.repeat(64) }],
    ['missing tested versions', { testedMacOSVersions: [] }],
    ['future date', { releaseDate: '2027-01-01' }],
    ['unverified architecture', { architectures: { appleSilicon: 'not-yet-verified', intel: 'unsupported' } }],
  ])('rejects %s', (_label, releasePatch) => {
    const product = validProduct()
    product.release = { ...product.release, ...(releasePatch as Partial<ProductRelease>) }
    expect(validateReleaseConfiguration(product, new Date('2026-07-13T00:00:00Z')).isReady).toBe(false)
    const { container } = render(<DownloadButton product={product} />)
    expect(container.querySelector('a')).toBeNull()
  })
})
