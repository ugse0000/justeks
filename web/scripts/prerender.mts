/**
 * Prerender every public route to static HTML.
 *
 * Runs after the client and SSR bundles are built. For each locale × route it
 * renders the app, splices React's hoisted <head> tags and the app markup into
 * the built index.html, and writes the file at the route's own path. It then
 * emits sitemap.xml and robots.txt from the same route table, so the three
 * outputs cannot disagree with each other.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const dist = join(root, 'dist')

const ssr = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

const { render, PUBLIC_ROUTES, LOCALES, LOCALE_TAGS, toLocalePath, SITE_URL } = ssr

/**
 * Read the built shell.
 *
 * dist/index.html is both the template and one of the outputs (the home page
 * overwrites it), so the first run stashes a copy. Later runs read the stash,
 * which keeps this script safe to re-run without a fresh vite build.
 */
const stash = join(dist, '.prerender-template.html')
const template = existsSync(stash)
  ? readFileSync(stash, 'utf8')
  : readFileSync(join(dist, 'index.html'), 'utf8')

if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('index.html is missing the <!--app-html--> / <!--app-head--> placeholders')
}

writeFileSync(stash, template)

/** dist/about/index.html for "/about", dist/index.html for "/". */
function outputPath(urlPath: string): string {
  return urlPath === '/' ? join(dist, 'index.html') : join(dist, urlPath, 'index.html')
}

let written = 0

for (const locale of LOCALES) {
  for (const route of PUBLIC_ROUTES) {
    const url = toLocalePath(route.path, locale)
    const { html, head } = render(url, LOCALE_TAGS[locale])

    // React's SSR output leaves some attributes in camelCase (hrefLang,
    // fetchPriority). HTML attribute names are case-insensitive, so browsers
    // and search engines read these correctly as written; the output tests
    // assert on them case-insensitively rather than rewriting the markup.

    const page = template
      .replace('<html lang="en">', `<html lang="${LOCALE_TAGS[locale]}">`)
      .replace('<!--app-head-->', head)
      .replace('<!--app-html-->', html)

    const file = outputPath(url)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, page)
    written += 1
  }
}

/* ---- sitemap.xml ------------------------------------------------------ */

const urls = PUBLIC_ROUTES.map((route: { path: string; priority: number }) => {
  const alternates = LOCALES
    .map((l: string) => `      <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${toLocalePath(route.path, l)}"/>`)
    .join('\n')
  return [
    '  <url>',
    `    <loc>${SITE_URL}${route.path}</loc>`,
    `    <priority>${route.priority.toFixed(1)}</priority>`,
    alternates,
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.path}"/>`,
    '  </url>',
  ].join('\n')
}).join('\n')

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
)

/* ---- robots.txt ------------------------------------------------------- */

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

console.log(`prerendered ${written} pages (${PUBLIC_ROUTES.length} routes × ${LOCALES.length} locales)`)
console.log('wrote sitemap.xml and robots.txt')
