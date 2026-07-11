import { Link } from 'react-router-dom'
import { useImageFallback } from '../hooks/useImageFallback'

type LogoProps = { inverted?: boolean }

export function Logo({ inverted = false }: LogoProps) {
  const { state, onLoad, onError } = useImageFallback()
  return (
    <Link className={`logo${inverted ? ' logo--inverted' : ''}`} to="/" aria-label="Tideframe Labs home">
      {state !== 'error' ? (
        <img
          src={inverted ? '/tideframe-mark-monochrome.svg' : '/tideframe-mark.svg'}
          alt=""
          width="38"
          height="32"
          onLoad={onLoad}
          onError={onError}
        />
      ) : (
        <span className="logo-mark-fallback" aria-hidden="true">T</span>
      )}
      <span>Tideframe Labs</span>
    </Link>
  )
}
