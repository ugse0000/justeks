import { screen } from '@testing-library/react'
import { renderAtRoute } from '../test/render'
import { Collection } from './Collection'
import { Collections } from './Collections'
import { COLLECTION_SLUGS, FABRIC_SLUGS } from '../content/routes'
import { getContent } from '../content'
import { LOCALES } from '../lib/i18n'

test.each([...COLLECTION_SLUGS])('%s koleksiyon sayfası dolu', (slug) => {
  renderAtRoute(<Collection slug={slug} locale="en" />, `/collections/${slug}`)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect((screen.getByTestId('overview').textContent ?? '').length).toBeGreaterThan(250)
  expect(screen.getByTestId('related-categories').children.length).toBeGreaterThan(0)
})

test('koleksiyon adları iki dilde de İngilizce korunur (marka adlandırması)', () => {
  for (const slug of COLLECTION_SLUGS) {
    expect(getContent('tr').collections[slug].name)
      .toBe(getContent('en').collections[slug].name)
    expect(getContent('en').collections[slug].name).toMatch(/^The .+ Collection$/)
  }
})

test('her koleksiyon geçerli kumaş kategorilerine bağlanır', () => {
  const valid = new Set<string>(FABRIC_SLUGS)
  for (const locale of LOCALES) {
    const cols = getContent(locale).collections
    for (const slug of COLLECTION_SLUGS) {
      expect(cols[slug].relatedCategories.length).toBeGreaterThan(0)
      for (const c of cols[slug].relatedCategories) {
        expect(valid.has(c), `${locale}/${slug}: geçersiz kategori "${c}"`).toBe(true)
      }
    }
  }
})

test('route tablosundaki her koleksiyonun içeriği var', () => {
  for (const locale of LOCALES) {
    const cols = getContent(locale).collections
    expect(Object.keys(cols).sort()).toEqual([...COLLECTION_SLUGS].sort())
  }
})

test('koleksiyon sayfası ilgili kategoriye gerçek bağlantı verir', () => {
  renderAtRoute(<Collection slug="linen" locale="en" />, '/collections/linen')
  const related = screen.getByTestId('related-categories')
  expect(related.querySelector('a[href="/fabrics/linen"]')).toBeInTheDocument()
})

test('TR koleksiyon sayfası TR kategori bağlantıları kullanır', () => {
  renderAtRoute(<Collection slug="linen" locale="tr" />, '/tr/collections/linen')
  expect(screen.getByTestId('related-categories').querySelector('a'))
    .toHaveAttribute('href', '/tr/fabrics/linen')
})

test('koleksiyon index sekiz koleksiyonu listeler', () => {
  renderAtRoute(<Collections locale="en" />, '/collections')
  expect(screen.getAllByTestId('collection-card')).toHaveLength(8)
})

test('koleksiyon overview metinleri birbirinin kopyası değil', () => {
  for (const locale of LOCALES) {
    const cols = getContent(locale).collections
    const texts = COLLECTION_SLUGS.map((s) => cols[s].overview.join(' '))
    expect(new Set(texts).size).toBe(COLLECTION_SLUGS.length)
  }
})
