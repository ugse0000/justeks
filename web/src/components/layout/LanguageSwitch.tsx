import { Link, useLocation } from 'react-router'
import {
  LOCALES, LOCALE_LABELS, localeFromPathname, stripLocale, toLocalePath,
} from '../../lib/i18n'
import './LanguageSwitch.css'

const FULL_NAME: Record<string, string> = { en: 'English', tr: 'Türkçe' }

/**
 * EN | TR switch. Always points at the same page in the other language rather
 * than sending people to the home page, which is the usual failure of
 * bolted-on i18n. Query strings are dropped: they are page state, not content.
 */
export function LanguageSwitch() {
  const { pathname } = useLocation()
  const current = localeFromPathname(pathname)
  const canonical = stripLocale(pathname)

  return (
    <nav className="lang" aria-label="Language">
      {LOCALES.map((locale, i) => (
        <span key={locale} className="lang__item">
          {i > 0 && <span className="lang__sep" aria-hidden="true">|</span>}
          {locale === current ? (
            <span className="lang__current" aria-current="true">
              {LOCALE_LABELS[locale]}
            </span>
          ) : (
            <Link
              className="lang__link"
              to={toLocalePath(canonical, locale)}
              lang={locale}
              hrefLang={locale}
              aria-label={FULL_NAME[locale]}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
