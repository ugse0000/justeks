import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import './design/fonts.css'
import './design/tokens.css'
import './design/typography.css'
import './design/base.css'

import App from './App'

export interface RenderResult {
  /** Markup for the app root. */
  html: string
  /** Tags React hoisted into <head> during render (title, meta, link). */
  head: string
  /** <html lang> value for this page. */
  lang: string
}

/**
 * Render one route to static HTML.
 *
 * React 19 hoists <title>, <meta> and <link> out of the tree, and in
 * renderToString they land at the very start of the output rather than in a
 * real <head>. We split them off here so the prerender step can put them where
 * they belong. This is what removes the need for a helmet-style library.
 */
export function render(url: string, lang: string): RenderResult {
  const markup = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )

  const head: string[] = []
  // Hoisted metadata appears as a run of tags before any app markup. <title>
  // carries text between its tags so it must be matched as a pair; <meta> and
  // <link> are void elements.
  const HOISTED = /^\s*(?:<title[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*?>)/
  let rest = markup

  for (;;) {
    const match = rest.match(HOISTED)
    if (!match) break
    head.push(match[0].trim())
    rest = rest.slice(match[0].length)
  }

  return { html: rest, head: head.join('\n    '), lang }
}

/* ---- Data the prerender step needs -------------------------------------
   Re-exported here so the build script imports a single SSR bundle rather
   than reaching into src/ with a separate TypeScript loader. */

export { PUBLIC_ROUTES } from './content/routes'
export { LOCALES, LOCALE_TAGS, toLocalePath } from './lib/i18n'
export { SITE_URL } from '../site.config'
