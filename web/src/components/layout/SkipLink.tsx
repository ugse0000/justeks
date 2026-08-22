import type { Locale } from '../../content/schema'
import { getContent } from '../../content'

export const MAIN_ID = 'main'

/** First tab stop on every page. Visible only when focused (see base.css). */
export function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a className="skip-link" href={`#${MAIN_ID}`}>
      {getContent(locale).nav.skipToContent}
    </a>
  )
}
