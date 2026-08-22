import { screen } from '@testing-library/react'
import { renderAtRoute } from '../test/render'
import { Insights } from './Insights'
import { InsightArticle } from './InsightArticle'
import { ARTICLE_SLUGS, FABRIC_SLUGS } from '../content/routes'
import { getContent } from '../content'
import { LOCALES } from '../lib/i18n'

test('insights index makaleleri yeniden eskiye sıralar', () => {
  renderAtRoute(<Insights locale="en" />, '/insights')
  const dates = screen.getAllByTestId('article-date').map((d) => d.getAttribute('datetime')!)
  expect(dates).toEqual([...dates].sort().reverse())
  expect(dates).toHaveLength(6)
})

// İnce içerik koruması. Ölçü karakter cinsindendir: Türkçe aynı bilgiyi
// belirgin şekilde daha az kelimeyle taşır (kelime başına daha çok harf), bu
// yüzden kelime sayısı iki dil arasında adil bir eşik vermez.
const MIN_CHARS = 2600

test.each([...ARTICLE_SLUGS])('%s makalesi yeterince derin (EN)', (slug) => {
  const { container } = renderAtRoute(<InsightArticle slug={slug} locale="en" />, `/insights/${slug}`)
  expect((container.textContent ?? '').trim().length).toBeGreaterThan(MIN_CHARS)
})

test('makale ilgili kumaş sayfasına yönlendirir', () => {
  renderAtRoute(<InsightArticle slug="what-is-linen-fabric" locale="en" />, '/insights/what-is-linen-fabric')
  const related = screen.getByTestId('related-fabrics')
  expect(related.querySelector('a[href="/fabrics/linen"]')).toBeInTheDocument()
})

test('makale Article JSON-LD üretir', () => {
  renderAtRoute(<InsightArticle slug="what-is-linen-fabric" locale="en" />, '/insights/what-is-linen-fabric')
  const types = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => JSON.parse(s.textContent!)['@type'])
  expect(types).toContain('Article')
  expect(types).toContain('BreadcrumbList')
})

test('Article JSON-LD yayın tarihi ve dili taşır', () => {
  renderAtRoute(<InsightArticle slug="poplin-vs-oxford" locale="tr" />, '/tr/insights/poplin-vs-oxford')
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => JSON.parse(s.textContent!))
    .find((o) => o['@type'] === 'Article')!
  expect(ld.datePublished).toBe('2026-03-26')
  expect(ld.inLanguage).toBe('tr-TR')
})

test('her makale geçerli kumaş kategorilerine bağlanır', () => {
  const valid = new Set<string>(FABRIC_SLUGS)
  for (const locale of LOCALES) {
    const arts = getContent(locale).insights
    for (const slug of ARTICLE_SLUGS) {
      expect(arts[slug].relatedFabrics.length).toBeGreaterThan(0)
      for (const f of arts[slug].relatedFabrics) {
        expect(valid.has(f), `${locale}/${slug}: geçersiz kategori "${f}"`).toBe(true)
      }
    }
  }
})

test('makale gövdeleri iki dilde aynı blok yapısını taşır', () => {
  const en = getContent('en').insights
  const tr = getContent('tr').insights
  for (const slug of ARTICLE_SLUGS) {
    expect(tr[slug].body.map((b) => b.kind)).toEqual(en[slug].body.map((b) => b.kind))
    expect(tr[slug].publishedAt).toBe(en[slug].publishedAt)
  }
})

test('makale başlıkları TR de çevrilmiş', () => {
  expect(getContent('tr').insights['what-is-linen-fabric'].title).toBe('Keten Kumaş Nedir?')
  expect(getContent('tr').insights['reading-fabric-composition'].title)
    .toBe('Kumaş Kompozisyonu Nasıl Okunur?')
})

test('TR makaleleri de yeterince derin', () => {
  for (const slug of ARTICLE_SLUGS) {
    const { container, unmount } = renderAtRoute(
      <InsightArticle slug={slug} locale="tr" />, `/tr/insights/${slug}`)
    const chars = (container.textContent ?? '').trim().length
    unmount()
    expect(chars, slug).toBeGreaterThan(MIN_CHARS)
  }
})
