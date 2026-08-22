import type { ReactElement } from 'react'
import { render, type RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

/** Render a component inside a router positioned at a given URL. */
export function renderAtRoute(ui: ReactElement, route = '/'): RenderResult {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}
