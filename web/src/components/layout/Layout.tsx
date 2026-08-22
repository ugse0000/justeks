import { Outlet, useLocation } from 'react-router'
import { localeFromPathname } from '../../lib/i18n'
import { Header } from './Header'
import { Footer } from './Footer'
import { SkipLink, MAIN_ID } from './SkipLink'

/**
 * Page shell. Locale is derived from the URL, so every page — including
 * prerendered output — agrees on language without a provider or a store.
 */
export function Layout() {
  const { pathname } = useLocation()
  const locale = localeFromPathname(pathname)

  return (
    <>
      <SkipLink locale={locale} />
      <Header locale={locale} />
      <main id={MAIN_ID}>
        <Outlet />
      </main>
      <Footer locale={locale} />
    </>
  )
}
