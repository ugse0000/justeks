import { getContent } from './index'
import { FABRIC_SLUGS } from './routes'
import { LOCALES } from '../lib/i18n'

test('route tablosundaki her kumaş kategorisinin içeriği var', () => {
  for (const locale of LOCALES) {
    const { fabricCategories } = getContent(locale)
    for (const slug of FABRIC_SLUGS) {
      expect(fabricCategories[slug], `${locale}: ${slug} içeriği eksik`).toBeDefined()
      expect(fabricCategories[slug].slug).toBe(slug)
    }
  }
})

test('fazladan kategori içeriği yok', () => {
  for (const locale of LOCALES) {
    const keys = Object.keys(getContent(locale).fabricCategories).sort()
    expect(keys).toEqual([...FABRIC_SLUGS].sort())
  }
})

test('her kategori özgün ve yeterince derin bir overview taşır', () => {
  for (const locale of LOCALES) {
    const cats = getContent(locale).fabricCategories
    const texts = FABRIC_SLUGS.map((s) => cats[s].overview.join(' '))
    for (const [i, text] of texts.entries()) {
      expect(text.length, `${locale}: ${FABRIC_SLUGS[i]} overview kısa`).toBeGreaterThan(400)
    }
    // Şablon tekrarı ince içerik cezası riskidir; her metin benzersiz olmalı.
    expect(new Set(texts).size).toBe(FABRIC_SLUGS.length)
  }
})

test('brief deki alt tür listeleri korunmuş', () => {
  const linen = getContent('en').fabricCategories.linen.types
  for (const t of ['100% Linen', 'Linen Cotton', 'Washed Linen', 'Linen Canvas', 'Linen Shirting']) {
    expect(linen).toContain(t)
  }
  const cotton = getContent('en').fabricCategories.cotton.types
  for (const t of ['Cotton Poplin', 'Cotton Twill', 'Organic Cotton', 'Stretch Cotton']) {
    expect(cotton).toContain(t)
  }
})

test('alt tür adları iki dilde aynı (sektör terimleri çevrilmez)', () => {
  const en = getContent('en').fabricCategories
  const tr = getContent('tr').fabricCategories
  for (const slug of FABRIC_SLUGS) {
    expect(tr[slug].types).toEqual(en[slug].types)
  }
})

test('kategori adları çevrilmiş', () => {
  expect(getContent('tr').fabricCategories.linen.name).toBe('Keten')
  expect(getContent('tr').fabricCategories.wool.name).toBe('Yün')
  expect(getContent('en').fabricCategories.linen.name).toBe('Linen')
})

test('ilişkili koleksiyonlar geçerli slug lardır', async () => {
  const { COLLECTION_SLUGS } = await import('./routes')
  const valid = new Set<string>(COLLECTION_SLUGS)
  for (const locale of LOCALES) {
    const cats = getContent(locale).fabricCategories
    for (const slug of FABRIC_SLUGS) {
      for (const c of cats[slug].relatedCollections) {
        expect(valid.has(c), `${locale}/${slug}: geçersiz koleksiyon "${c}"`).toBe(true)
      }
    }
  }
})
