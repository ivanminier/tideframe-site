import { useState } from 'react'

export type ImageLoadState = 'loading' | 'loaded' | 'error'

/** Tracks an <img>'s native load/error events so callers can render a fallback. */
export function useImageFallback() {
  const [state, setState] = useState<ImageLoadState>('loading')
  return {
    state,
    onLoad: () => setState('loaded'),
    onError: () => setState('error'),
  }
}
