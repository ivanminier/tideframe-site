import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useReveal } from '../../src/hooks/useReveal'

function RevealHarness() {
  const reveal = useReveal<HTMLDivElement>()
  return <div ref={reveal.ref}>{reveal.visible ? 'Visible' : 'Hidden'}</div>
}

describe('reduced motion', () => {
  beforeEach(() => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('reveals content immediately when reduced motion is preferred', async () => {
    render(<RevealHarness />)
    await waitFor(() => expect(screen.getByText('Visible')).toBeVisible())
  })
})
