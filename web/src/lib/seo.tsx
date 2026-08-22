import type { Locale, SeoMeta } from '../content/schema'
import { LOCALES, LOCALE_TAGS, DEFAULT_LOCALE, toLocalePath } from './i18n'
import { SITE_NAME, SITE_URL } from '../../site.config'

interface SeoProps {
  /** Canonical, English-rooted path (e.g. "/fabrics/linen"). */
  path: string
  locale: Locale
  meta: SeoMeta
  /** Emitted as application/ld+json when present. */
  jsonLd?: Record<string, unknown>
  noIndex?: boolean
  /** Overrides og:type — articles pass "article". */
  ogType?: 'website' | 'article'
}

const absolute = (path: string) => `${SITE_URL}${path}`

const ogLocale = (locale: Locale) => LOCALE_TAGS[locale].replace('-', '_')

/**
 * Append the brand unless the title already carries it.
 *
 * Content titles are inconsistent by nature: some end with the brand ("The
 * Linen Collection — JUSTEKS"), some use it mid-sentence ("About JUSTEKS —
 * Textile Expertise Since 2004"), most omit it. Testing for the name anywhere
 * covers all three; matching only the start left the brand duplicated on 84
 * of the 112 pages.
 */
function withBrand(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`
}

/**
 * Page metadata.
 *
 * Relies on React 19 hoisting <title>/<meta>/<link> into <head>, both in the
 * browser and in renderToString — which is what lets the prerender step emit
 * real per-page metadata without a helmet library.
 *
 * The JSON-LD script is NOT hoisted; it renders inline. That is intentional
 * and valid — search engines read JSON-LD from <body> too.
 */
export function Seo({ path, locale, meta, jsonLd, noIndex, ogType = 'website' }: SeoProps) {
  const title = withBrand(meta.title)
  const canonical = absolute(toLocalePath(path, locale))

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={absolute(toLocalePath(path, l))} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={absolute(toLocalePath(path, DEFAULT_LOCALE))} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale(locale)} />
      <meta name="twitter:card" content="summary_large_image" />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {jsonLd && (
        <script
          type="application/ld+json"
          // Content is built from our own typed data, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}

/** BreadcrumbList JSON-LD for sub-pages. */
export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(toLocalePath(item.path, locale)),
    })),
  }
}
