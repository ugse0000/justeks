import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './design/fonts.css'
import './design/tokens.css'
import './design/typography.css'
import './design/base.css'

import App from './App'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/*
 * Built pages arrive prerendered, dev pages arrive empty.
 *
 * createRoot on a prerendered page does not adopt the existing markup: React
 * re-emits the hoisted <title>, <meta> and <link> tags while the prerendered
 * ones stay, which measured as two titles, two canonicals and six hreflang
 * links on the built site. hydrateRoot adopts them instead. Dev has nothing to
 * adopt, so it still takes the createRoot path.
 */
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
