import { PAGES } from './registry'
import './pages'
import { PUBLIC_ROUTES } from '../content/routes'

/**
 * The completeness gate for the phase: every public route must have a page.
 * Until it passes, the prerender step cannot produce a full site.
 */
test('her public route bir sayfaya bağlı', () => {
  const missing = PUBLIC_ROUTES.filter((r) => !PAGES[r.key]).map((r) => r.path)
  expect(missing).toEqual([])
})
