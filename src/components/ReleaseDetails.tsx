import { formatFileSize, type ProductRelease } from '../data/products'

export function ReleaseDetails({ release }: { release: ProductRelease }) {
  const architecture = release.architectures.intel === 'included-not-runtime-tested'
    ? 'Universal (Apple silicon and Intel); Intel runtime not independently tested'
    : release.architectures.appleSilicon === 'supported' && release.architectures.intel === 'supported'
      ? 'Universal (Apple silicon and Intel)'
      : release.architectures.appleSilicon === 'supported'
        ? 'Apple silicon'
        : 'Intel'

  return (
    <dl className="release-integrity" aria-label="Download details">
      <div><dt>Version</dt><dd>{release.version} (build {release.buildNumber})</dd></div>
      <div><dt>File size</dt><dd>{formatFileSize(release.fileSizeBytes ?? 0)}</dd></div>
      <div><dt>Released</dt><dd>{release.releaseDate}</dd></div>
      <div><dt>Minimum macOS</dt><dd>{release.minimumMacOSVersion}</dd></div>
      <div><dt>Mac compatibility</dt><dd>{architecture}</dd></div>
      {release.testedMacOSVersions.length > 0 ? <div><dt>Tested on</dt><dd>{release.testedMacOSVersions.join(', ')}</dd></div> : null}
      <div className="release-integrity-checksum"><dt>SHA-256</dt><dd><code>{release.sha256}</code></dd></div>
    </dl>
  )
}
