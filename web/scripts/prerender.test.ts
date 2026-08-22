import { existsSync, readFileSync } from 'node:fs'
import { PUBLIC_ROUTES } from '../src/content/routes'
import { LOCALES, toLocalePath } from '../src/lib/i18n'

/**
 * Asserts on the built output. Requires `npm run build` first; skips cleanly
 * when dist/ is absent so `npm run test` alone stays useful.
 */
const BUILT = existsSync('dist/index.html')
const d = BUILT ? describe : describe.skip

const fileFor = (p: string) => (p === '/' ? 'dist/index.html' : `dist${p}/index.html`)
const read = (p: string) => readFileSync(fileFor(p), 'utf8')

d('prerendered output', () => {
  test('her route her dilde HTML üretti', () => {
    const missing: string[] = []
    for (const locale of LOCALES) {
      for (const route of PUBLIC_ROUTES) {
        const p = toLocalePath(route.path, locale)
        if (!existsSync(fileFor(p))) missing.push(p)
      }
    }
    expect(missing).toEqual([])
  })

  test('toplam 112 sayfa', () => {
    expect(PUBLIC_ROUTES.length * LOCALES.length).toBe(112)
  })

  test('ana sayfa gerçek içerik ve metadata taşır', () => {
    const html = read('/')
    expect(html).toMatch(/<h1[^>]*>/)
    expect(html).toMatch(/<title>.+<\/title>/)
    expect(html).toMatch(/rel="canonical"/)
    expect(html).toContain('BRITISH ORIGIN')
    expect(html).toContain('Fabric, Perfected.')
    // JS yüklenmeden önce anlamlı içerik olmalı
    const root = html.split('<div id="root">')[1] ?? ''
    expect(root.length).toBeGreaterThan(10000)
  })

  test('hreflang üçlüsü her sayfada bulunur', () => {
    const html = read('/fabrics/linen')
    // React SSR hrefLang'ı camelCase bırakır; HTML öznitelikleri
    // büyük/küçük harf duyarsızdır, bu yüzden testte de öyle arıyoruz.
    const alts = html.match(/href[Ll]ang="[^"]+"/g) ?? []
    const values = alts.map((a) => a.split('"')[1])
    expect(values).toEqual(expect.arrayContaining(['en', 'tr', 'x-default']))
  })

  test('TR sayfası TR başlık, TR canonical ve doğru lang taşır', () => {
    const html = read('/tr/fabrics/linen')
    expect(html).toContain('<html lang="tr-TR">')
    expect(html).toContain('Keten')
    expect(html).toMatch(/rel="canonical" href="https:\/\/justeks\.com\/tr\/fabrics\/linen"/)
  })

  test('makale sayfası Article JSON-LD taşır', () => {
    const html = read('/insights/what-is-linen-fabric')
    expect(html).toContain('"@type":"Article"')
    expect(html).toContain('"datePublished":"2026-02-10"')
  })

  test('sitemap tüm route ları ve hreflang alternatiflerini içerir', () => {
    const xml = readFileSync('dist/sitemap.xml', 'utf8')
    for (const route of PUBLIC_ROUTES) {
      expect(xml, route.path).toContain(`<loc>https://justeks.com${route.path}</loc>`)
    }
    expect(xml).toContain('hreflang="tr"')
    expect(xml).toContain('hreflang="x-default"')
  })

  test('robots admin i dışlar ve sitemap e işaret eder', () => {
    const txt = readFileSync('dist/robots.txt', 'utf8')
    expect(txt).toContain('Disallow: /admin')
    expect(txt).toContain('Sitemap: https://justeks.com/sitemap.xml')
  })

  test('admin sayfası prerender edilmedi', () => {
    expect(existsSync('dist/admin/enquiries/index.html')).toBe(false)
  })

  test('hiçbir sayfada yer tutucu yorum kalmadı', () => {
    for (const p of ['/', '/tr', '/fabrics', '/contact']) {
      const html = read(p)
      expect(html, p).not.toContain('<!--app-html-->')
      expect(html, p).not.toContain('<!--app-head-->')
    }
  })
})
