import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Guards on the generated brand files in public/.
 *
 * Lives beside the prerender output test rather than under src/ because it
 * reads the filesystem: scripts/ is the tsconfig project that carries Node
 * types, and app code has no business importing node:fs.
 *
 * These are produced by brand/tools/build-brand.mjs rather than by the app, so
 * nothing else would notice if a regeneration introduced an effect the brand
 * rules forbid, or if the Vite starter assets came back.
 */
const PUBLIC = join(process.cwd(), 'public')
const BRAND = join(PUBLIC, 'brand')

const REQUIRED = [
  'justeks-lockup.svg',
  'justeks-lockup-reverse.svg',
  'justeks-lockup-black.svg',
  'justeks-lockup-white.svg',
  'justeks-stack.svg',
  'justeks-stack-reverse.svg',
  'justeks-monogram.svg',
  'justeks-monogram-reverse.svg',
  'justeks-wordmark.svg',
  'justeks-wordmark-reverse.svg',
  'justeks-icon.svg',
  'justeks-icon-reverse.svg',
  'social-profile-dark.svg',
  'social-profile-light.svg',
  'favicon-32.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-512-maskable.png',
  'og-default.png',
]

for (const name of REQUIRED) test(`${name} üretilmiş`, () => {
  expect(existsSync(join(BRAND, name)), `${name} eksik`).toBe(true)
})

const svgFiles = readdirSync(BRAND).filter((f: string) => f.endsWith('.svg'))

for (const name of svgFiles) test(`${name} tek mürekkeple basılabilir kalıyor`, () => {
  // Marka kuralı: gradient, gölge, glow, bevel, filtre veya gömülü raster
  // yok. Bunlar işareti tek renkli baskıda ve küçük boyutta bozar.
  const svg = readFileSync(join(BRAND, name), 'utf8')
  for (const banned of [
    '<linearGradient', '<radialGradient', '<filter', 'feGaussianBlur',
    '<mask', 'data:image', '<image', 'drop-shadow',
  ]) {
    expect(svg, `${name} içinde yasak: ${banned}`).not.toContain(banned)
  }
})

for (const name of svgFiles) test(`${name} sıkı bir viewBox taşıyor`, () => {
  const svg = readFileSync(join(BRAND, name), 'utf8')
  expect(svg).toMatch(/viewBox="[-\d. ]+"/)
})

for (const name of svgFiles) test(`${name} erişilebilir bir başlık taşıyor`, () => {
  const svg = readFileSync(join(BRAND, name), 'utf8')
  expect(svg).toContain('role="img"')
  expect(svg).toMatch(/<title[^>]*>JUSTEKS/)
})

test('favicon Vite başlangıç şablonundan devralınmadı', () => {
  // Şablonun moru (#863bff) ve sosyal ikon sprite'ı projeyle ilgisiz.
  const favicon = readFileSync(join(PUBLIC, 'favicon.svg'), 'utf8')
  expect(favicon.toLowerCase()).not.toContain('863bff')
  expect(favicon).toContain('JUSTEKS')
  expect(existsSync(join(PUBLIC, 'icons.svg')), 'icons.svg Vite kalıntısı').toBe(false)
})

test('favicon her iki tarayıcı temasında görünür', () => {
  // Sekme çubuğu koyu da olabilir açık da; tek sabit renk birinde kaybolur.
  const favicon = readFileSync(join(PUBLIC, 'favicon.svg'), 'utf8')
  expect(favicon).toContain('prefers-color-scheme:dark')
})

test('web app manifest ürettiğimiz ikonlara işaret ediyor', () => {
  const manifest = JSON.parse(readFileSync(join(PUBLIC, 'site.webmanifest'), 'utf8'))
  expect(manifest.name).toBe('JUSTEKS')
  const missing = (manifest.icons as { src: string }[])
    .map((i) => i.src.replace(/^\//, ''))
    .filter((src) => !existsSync(join(PUBLIC, src)))
  expect(missing).toEqual([])
})

const INK = '#0F0F0F'
const IVORY = '#F5F2ED'
const GOLD = '#C6A96B'

/** Every hex colour a file mentions, uppercased and deduplicated. */
function colours(svg: string): string[] {
  return [...new Set((svg.match(/#[0-9A-Fa-f]{6}/g) ?? []).map((c) => c.toUpperCase()))].sort()
}

test('altın yalnızca çizgi ve slogan olarak geçiyor', () => {
  // Altın kuralı: ince vurgu, dolgu değil. Kilitte hairline ve slogan
  // altındır; adın harfleri hiçbir zaman altın basılmaz.
  const lockup = readFileSync(join(BRAND, 'justeks-lockup.svg'), 'utf8')
  // Çizgi tek bir dikdörtgendir ve altındır.
  expect(lockup).toContain(`height="2.2" fill="${GOLD}"`)
  // Adın yedi harfi mürekkep rengindedir.
  expect(lockup.split(`fill="${INK}"`).length - 1).toBe(7)

  for (const name of ['justeks-monogram.svg', 'justeks-wordmark.svg', 'justeks-icon.svg']) {
    expect(readFileSync(join(BRAND, name), 'utf8'), name).not.toContain(GOLD)
  }
})

test('tek mürekkep sürümlerinde ikinci renk yok', () => {
  for (const name of ['justeks-lockup-black.svg', 'justeks-lockup-white.svg']) {
    const svg = readFileSync(join(BRAND, name), 'utf8')
    expect(svg, name).not.toContain(GOLD)
    expect(colours(svg), `${name} tek renk taşımalı`).toHaveLength(1)
  }
})

for (const name of svgFiles) test(`${name} paletin dışına çıkmıyor`, () => {
  // Kimlik üç renktir. Dördüncü bir renk buraya sızarsa marka kayar.
  const allowed = [INK, IVORY, GOLD]
  for (const colour of colours(readFileSync(join(BRAND, name), 'utf8'))) {
    expect(allowed, `${name} içinde palet dışı renk: ${colour}`).toContain(colour)
  }
})

test('manifest paletle aynı renkleri bildiriyor', () => {
  const manifest = JSON.parse(readFileSync(join(PUBLIC, 'site.webmanifest'), 'utf8'))
  expect(manifest.background_color).toBe(IVORY)
  expect(manifest.theme_color).toBe(IVORY)
})
