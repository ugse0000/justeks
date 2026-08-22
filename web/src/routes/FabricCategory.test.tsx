import { screen } from '@testing-library/react'
import { renderAtRoute } from '../test/render'
import { FabricCategory } from './FabricCategory'
import { FABRIC_SLUGS } from '../content/routes'
import { getContent } from '../content'

test.each([...FABRIC_SLUGS])('%s sayfası dolu içerik gösterir', (slug) => {
  renderAtRoute(<FabricCategory slug={slug} locale="en" />, `/fabrics/${slug}`)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect((screen.getByTestId('overview').textContent ?? '').length).toBeGreaterThan(400)
  expect(screen.getByTestId('types').children.length).toBeGreaterThan(4)
  expect(screen.getByTestId('applications')).toBeInTheDocument()
  expect(screen.getByTestId('production-notes')).toBeInTheDocument()
})

test('teknik özet tablosu monospace sınıfıyla render edilir', () => {
  renderAtRoute(<FabricCategory slug="linen" locale="en" />, '/fabrics/linen')
  const spec = screen.getByTestId('spec-table')
  expect(spec.textContent).toContain('110 – 320 GSM')
  expect(spec.textContent).toContain('140 – 150 cm')
  expect(spec.querySelectorAll('.t-mono').length).toBeGreaterThan(0)
})

test('linen sayfası brief alt türlerini içerir', () => {
  renderAtRoute(<FabricCategory slug="linen" locale="en" />, '/fabrics/linen')
  const types = screen.getByTestId('types').textContent ?? ''
  for (const t of ['100% Linen', 'Linen Cotton', 'Washed Linen', 'Linen Canvas', 'Linen Shirting']) {
    expect(types).toContain(t)
  }
})

test('teklif ve sourcing çağrıları bulunur', () => {
  renderAtRoute(<FabricCategory slug="linen" locale="en" />, '/fabrics/linen')
  expect(screen.getByRole('link', { name: /request a quote/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /sourcing/i })).toHaveAttribute('href', '/sourcing')
})

test('ilişkili koleksiyonlara çapraz bağlantı verir', () => {
  renderAtRoute(<FabricCategory slug="linen" locale="en" />, '/fabrics/linen')
  const related = screen.getByTestId('related-collections')
  expect(related.querySelector('a[href="/collections/linen"]')).toBeInTheDocument()
})

test('TR sayfası TR başlık ve TR bağlantılar kullanır', () => {
  renderAtRoute(<FabricCategory slug="linen" locale="tr" />, '/tr/fabrics/linen')
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Keten')
  expect(screen.getByTestId('related-collections').querySelector('a'))
    .toHaveAttribute('href', '/tr/collections/linen')
})

test('sayfa uydurma article number göstermez', () => {
  const { container } = renderAtRoute(<FabricCategory slug="linen" locale="en" />, '/fabrics/linen')
  expect(container.textContent).not.toMatch(/JT-[A-Z]{2}-\d{3}-\d{3}/)
})

test('sertifika adı veya logosu basılmaz', () => {
  const { container } = renderAtRoute(<FabricCategory slug="cotton" locale="en" />, '/fabrics/cotton')
  expect(container.textContent).not.toMatch(/OEKO-TEX|GOTS|GRS/)
})

test('görsel alt metniyle render edilir', () => {
  // Alt metni içerikten okuyoruz: sayfanın görseli gerçekten alt metniyle
  // sunduğunu doğrulamak istiyoruz, metnin kendisini sabitlemeyi değil.
  const { image } = getContent('en').fabricCategories.linen
  renderAtRoute(<FabricCategory slug="linen" locale="en" />, '/fabrics/linen')
  const img = screen.getByRole('img', { name: image.alt })
  expect(img).toHaveAttribute('src', '/images/fabrics/linen.webp')
})

test('breadcrumb json-ld üretilir', () => {
  renderAtRoute(<FabricCategory slug="linen" locale="en" />, '/fabrics/linen')
  const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')]
  const types = scripts.map((s) => JSON.parse(s.textContent!)['@type'])
  expect(types).toContain('BreadcrumbList')
})
