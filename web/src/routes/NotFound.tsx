import type { Locale } from '../content/schema'
import { GenericPage } from './GenericPage'

/**
 * Catch-all page for unknown paths.
 *
 * Static hosts serve one prerendered 404.html for every unmatched URL, so this
 * page cannot mention the address that was requested. It is marked noIndex:
 * the file is reachable at a real path on some hosts, and we do not want that
 * copy competing with the pages it stands in for.
 */
export function NotFound({ locale }: { locale: Locale }) {
  return <GenericPage pageKey="notFound" path="/404" locale={locale} noIndex />
}
