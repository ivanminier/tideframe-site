import { Link } from 'react-router-dom'
import { useImageFallback } from '../hooks/useImageFallback'

type LogoProps = { inverted?: boolean }

export function Logo({ inverted = false }: LogoProps) {
  const { state, onLoad, onError } = useImageFallback()
  return (
    <Link className={`logo${inverted ? ' logo--inverted' : ''}`} to="/" aria-label="Tideframe Labs home">
      {state !== 'error' ? (
        <span className="logo-mark" aria-hidden="true">
          <img
            src={inverted ? '/tideframe-mark-monochrome.svg' : '/tideframe-mark.svg'}
            alt=""
            width="38"
            height="38"
            onLoad={onLoad}
            onError={onError}
          />
        </span>
      ) : (
        <span className="logo-mark-fallback" aria-hidden="true"><i /><i /><i /></span>
      )}
      <span>Tideframe Labs</span>
    </Link>
  )
}
