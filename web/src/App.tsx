import { Route, Routes } from 'react-router'
import { Layout } from './components/layout'
import { PUBLIC_ROUTES } from './content/routes'
import { LOCALES, toLocalePath } from './lib/i18n'
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
      </Route>
    </Routes>
  )
}
