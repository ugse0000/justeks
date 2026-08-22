import { getContent } from './index'
import { ROUTES, PUBLIC_ROUTES } from './routes'
import { LOCALES } from '../lib/i18n'
import type { Locale } from './schema'

/** Flatten a content tree into [dotted.path, leaf] pairs. */
function walk(node: unknown, path: string[] = []): [string, unknown][] {
  if (node !== null && typeof node === 'object') {
    return Object.entries(node as Record<string, unknown>)
      .flatMap(([k, v]) => walk(v, [...path, k]))
  }
  return [[path.join('.'), node]]
}

const trees: Record<Locale, [string, unknown][]> = {
  en: walk(getContent('en')),
  tr: walk(getContent('tr')),
}

test('EN ve TR aynı anahtar kümesine sahip', () => {
  const en = trees.en.map(([k]) => k).sort()
  const tr = trees.tr.map(([k]) => k).sort()
  expect(tr).toEqual(en)
})

test('hiçbir metin alanı boş değil', () => {
  for (const locale of LOCALES) {
    for (const [key, value] of trees[locale]) {
      if (typeof value === 'string') {
        expect(value.trim(), `${locale}.${key} boş`).not.toBe('')
      }
    }
  }
})

test('her görselin alt metni dolu', () => {
  for (const locale of LOCALES) {
    const map = new Map(trees[locale])
    for (const [key] of trees[locale]) {
      if (key.endsWith('.src')) {
        const altKey = key.replace(/\.src$/, '.alt')
        const alt = map.get(altKey)
        expect(typeof alt === 'string' && alt.trim().length > 0,
          `${locale}.${altKey} eksik veya boş`).toBe(true)
      }
    }
  }
})

// Bazı değerler iki dilde kasten aynıdır ve çeviri beklenmez:
// - image.src: her iki dil aynı görsel dosyasını gösterir
// - href: slug'lar iki dilde ortaktır (tekil URL yapısı)
// - types[]: kumaş alt tür adları sektörde İngilizce ticari adlarıyla anılır
const SHARED_BY_DESIGN = (key: string, value: string) =>
  key.endsWith('.src') ||
  key.endsWith('.href') ||
  /.types.d+$/.test(key) ||
  value.startsWith('/')

test('uzun TR metinleri EN ile birebir aynı değil', () => {
  const en = new Map(trees.en)
  const tr = new Map(trees.tr)
  const untranslated = [...en.entries()]
    .filter(([k, v]) =>
      typeof v === 'string' &&
      v.length > 40 &&
      tr.get(k) === v &&
      !SHARED_BY_DESIGN(k, v))
    .map(([k]) => k)
  expect(untranslated).toEqual([])
})

test('her route benzersiz', () => {
  const paths = ROUTES.map((r) => r.path)
  expect(new Set(paths).size).toBe(paths.length)
})

test('her route anahtarı benzersiz', () => {
  const keys = ROUTES.map((r) => r.key)
  expect(new Set(keys).size).toBe(keys.length)
})

test('route yolları normalize', () => {
  for (const route of ROUTES) {
    expect(route.path.startsWith('/'), route.path).toBe(true)
    expect(route.path === '/' || !route.path.endsWith('/'), route.path).toBe(true)
    expect(route.path, route.path).toBe(route.path.toLowerCase())
    expect(route.path.includes('//'), route.path).toBe(false)
  }
})

test('public route sayısı admin hariç', () => {
  expect(PUBLIC_ROUTES.every((r) => r.group !== 'admin')).toBe(true)
  expect(PUBLIC_ROUTES.length).toBe(ROUTES.length - 1)
})
