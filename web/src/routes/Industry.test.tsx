import { screen } from '@testing-library/react'
import { renderAtRoute } from '../test/render'
import { Industry } from './Industry'
import { Industries } from './Industries'
import { INDUSTRY_SLUGS, FABRIC_SLUGS } from '../content/routes'
import { getContent } from '../content'
import { LOCALES } from '../lib/i18n'

test.each([...INDUSTRY_SLUGS])('%s sektör sayfası özgün ve dolu', (slug) => {
  renderAtRoute(<Industry slug={slug} locale="en" />, `/industries/${slug}`)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect((screen.getByTestId('overview').textContent ?? '').length).toBeGreaterThan(350)
  expect(screen.getByTestId('critical-properties').children.length).toBeGreaterThanOrEqual(3)
  expect(screen.getByTestId('recommended-fabrics').children.length).toBeGreaterThan(2)
})

test('sektör overview metinleri birbirinin kopyası değil', () => {
  for (const locale of LOCALES) {
    const ind = getContent(locale).industries
    const texts = INDUSTRY_SLUGS.map((s) => ind[s].overview.join(' '))
    expect(new Set(texts).size).toBe(INDUSTRY_SLUGS.length)
  }
})

test('her sektör geçerli kumaş kategorilerine bağlanır', () => {
  const valid = new Set<string>(FABRIC_SLUGS)
  for (const locale of LOCALES) {
    const ind = getContent(locale).industries
    for (const slug of INDUSTRY_SLUGS) {
      for (const f of ind[slug].recommendedFabrics) {
        expect(valid.has(f), `${locale}/${slug}: geçersiz kategori "${f}"`).toBe(true)
      }
    }
  }
})

test('shirting sektörü gömleklik kategorisine bağlanır', () => {
  renderAtRoute(<Industry slug="shirting" locale="en" />, '/industries/shirting')
  const links = [...screen.getByTestId('recommended-fabrics').querySelectorAll('a')]
  expect(links.some((a) => a.getAttribute('href') === '/fabrics/shirting')).toBe(true)
})

test('TR sektör sayfası TR bağlantılar kullanır', () => {
  renderAtRoute(<Industry slug="workwear" locale="tr" />, '/tr/industries/workwear')
  expect(screen.getByTestId('recommended-fabrics').querySelector('a')?.getAttribute('href'))
    .toMatch(/^\/tr\/fabrics\//)
})

test('sektör index sekiz sektörü listeler', () => {
  renderAtRoute(<Industries locale="en" />, '/industries')
  expect(screen.getAllByTestId('industry-card')).toHaveLength(8)
})

test('route tablosundaki her sektörün içeriği var', () => {
  for (const locale of LOCALES) {
    expect(Object.keys(getContent(locale).industries).sort())
      .toEqual([...INDUSTRY_SLUGS].sort())
  }
})

test('sektör adları TR de çevrilmiş', () => {
  expect(getContent('tr').industries.workwear.name).toBe('İş Kıyafeti')
  expect(getContent('tr').industries.uniforms.name).toBe('Üniforma')
})
