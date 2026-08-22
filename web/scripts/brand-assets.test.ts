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
  'justeks-monogram.svg',
  'justeks-monogram-reverse.svg',
  'justeks-wordmark.svg',
  'justeks-wordmark-reverse.svg',
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

test('altın yalnızca hairline olarak geçiyor', () => {
  // Altın kuralı: ince vurgu, dolgu değil. Kilitte tek bir 1.5 birimlik
  // çizgi olarak görünür; monogram ve wordmark hiç altın taşımaz.
  const lockup = readFileSync(join(BRAND, 'justeks-lockup.svg'), 'utf8')
  const goldUses = lockup.match(/#C8A96A/gi) ?? []
  expect(goldUses).toHaveLength(1)
  expect(lockup).toMatch(/<rect[^>]*width="1\.5"[^>]*fill="#C8A96A"/)

  for (const name of ['justeks-monogram.svg', 'justeks-wordmark.svg']) {
    expect(readFileSync(join(BRAND, name), 'utf8')).not.toContain('#C8A96A')
  }
})

test('tek mürekkep sürümlerinde ikinci renk yok', () => {
  for (const name of ['justeks-lockup-black.svg', 'justeks-lockup-white.svg']) {
    const svg = readFileSync(join(BRAND, name), 'utf8')
    expect(svg, name).not.toContain('#C8A96A')
    const colours = new Set(svg.match(/#[0-9A-Fa-f]{6}/g) ?? [])
    expect(colours.size, `${name} tek renk taşımalı`).toBe(1)
  }
})
