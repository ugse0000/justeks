import { contrastRatio } from './contrast'

const BLACK = '#0A0A0A'
const INK = '#141414'
const WARM_WHITE = '#FAF8F4'
const IVORY = '#F4EFE6'
const CREAM = '#EDE6D9'
const GOLD = '#C8A96A'
const MUTED = '#6B6257'
const MUTED_ON_DARK = '#A79E92'

const AA = 4.5
const AA_LARGE = 3

test('gövde metni varsayılan zeminde AA karşılar', () => {
  expect(contrastRatio(INK, WARM_WHITE)).toBeGreaterThanOrEqual(AA)
})

test('gövde metni ivory zeminde AA karşılar', () => {
  expect(contrastRatio(INK, IVORY)).toBeGreaterThanOrEqual(AA)
})

test('gövde metni cream zeminde AA karşılar', () => {
  expect(contrastRatio(INK, CREAM)).toBeGreaterThanOrEqual(AA)
})

test('koyu zeminde warm white AA karşılar', () => {
  expect(contrastRatio(WARM_WHITE, BLACK)).toBeGreaterThanOrEqual(AA)
})

test('ikincil metin açık zeminde AA karşılar', () => {
  expect(contrastRatio(MUTED, WARM_WHITE)).toBeGreaterThanOrEqual(AA)
  expect(contrastRatio(MUTED, IVORY)).toBeGreaterThanOrEqual(AA)
})

test('ikincil metin koyu zeminde AA karşılar', () => {
  expect(contrastRatio(MUTED_ON_DARK, BLACK)).toBeGreaterThanOrEqual(AA)
})

test('altın metin koyu zeminde AA karşılar', () => {
  // Eyebrow etiketleri koyu bölümlerde altın renkte kullanılır.
  expect(contrastRatio(GOLD, BLACK)).toBeGreaterThanOrEqual(AA)
})

test('altın açık zeminde metin olarak KULLANILAMAZ', () => {
  // Bu test bir kuralı sabitler: açık zeminde altın yalnızca dekoratif
  // hairline'dır. Biri eyebrow metnini altına çevirirse bu test hatırlatır.
  expect(contrastRatio(GOLD, WARM_WHITE)).toBeLessThan(AA_LARGE)
})

test('bilinen referans değerleri doğru hesaplanır', () => {
  expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1)
  expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5)
  expect(contrastRatio('#777777', '#FFFFFF')).toBeCloseTo(4.48, 1)
})

test('argüman sırası sonucu değiştirmez', () => {
  expect(contrastRatio(INK, WARM_WHITE)).toBeCloseTo(contrastRatio(WARM_WHITE, INK), 10)
})

test('kısa hex biçimi desteklenir', () => {
  expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 1)
})

test('geçersiz renk hata fırlatır', () => {
  expect(() => contrastRatio('not-a-colour', '#fff')).toThrow()
})

test('ikincil metin rengi her açık zeminde AA geçer', () => {
  // Bu renkler 11px gibi küçük boyutlarda kullanılıyor, yani AA eşiği 4.5.
  // Daha önce opacity ile soldurulduklarında 2.89-3.99 arasına düşüyorlardı;
  // Lighthouse bunu yakaladı. Palet renginin kendisi güvenli.
  for (const ground of [WARM_WHITE, IVORY, CREAM]) {
    expect(contrastRatio(MUTED, ground)).toBeGreaterThanOrEqual(AA)
  }
})
