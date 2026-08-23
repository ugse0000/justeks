import { Route, Routes } from 'react-router'
import { Layout } from './components/layout'
import { PUBLIC_ROUTES } from './content/routes'
import { DEFAULT_LOCALE, LOCALE_PREFIX, LOCALES, toLocalePath } from './lib/i18n'
import { AdminEnquiries } from './routes/admin/AdminEnquiries'
import { NotFound } from './routes/NotFound'
import { PAGES } from './routes/registry'
import './routes/pages'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {PUBLIC_ROUTES.flatMap((route) => {
          const Page = PAGES[route.key]
          if (!Page) return []
          return LOCALES.map((locale) => (
            <Route
              key={`${route.key}-${locale}`}
              path={toLocalePath(route.path, locale)}
              element={<Page locale={locale} />}
            />
          ))
        })}

        {/* Internal tool. Not in PUBLIC_ROUTES, so it is never prerendered,
            never in the sitemap and never crawled — it is a client-only route
            that exists once the app has booted. */}
        <Route path="/admin/enquiries" element={<AdminEnquiries locale="en" />} />

        {/* Unmatched paths. The Turkish pattern is more specific than the
            bare "*", so /tr/... keeps its locale instead of falling through
            to the English catch-all. */}
        {LOCALES.map((locale) => (
          <Route
            key={`not-found-${locale}`}
            path={locale === DEFAULT_LOCALE ? '*' : `${LOCALE_PREFIX}/*`}
            element={<NotFound locale={locale} />}
          />
        ))}
      </Route>
    </Routes>
  )
}
