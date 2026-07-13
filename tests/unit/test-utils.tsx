import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../../src/App'

export function renderRoute(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}
