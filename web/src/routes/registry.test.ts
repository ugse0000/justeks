import { PAGES } from './registry'
import { ROUTES } from '../content/routes'

const KEYS = new Set(ROUTES.map((r) => r.key))

test('kayıtlı her sayfa gerçek bir route anahtarına karşılık gelir', () => {
  for (const key of Object.keys(PAGES)) {
    expect(KEYS.has(key), `registry: bilinmeyen route anahtarı "${key}"`).toBe(true)
  }
})
