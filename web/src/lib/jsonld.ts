import type { Locale } from '../content/schema'
import { SITE_URL } from '../../site.config'
import { toLocalePath } from './i18n'

const absolute = (path: string) => `${SITE_URL}${path}`

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
