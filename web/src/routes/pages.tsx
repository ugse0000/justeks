/**
 * Side-effect module: importing this registers every page component.
 *
 * Registration is driven by the route table, so a page cannot be reachable
 * without a route and a route cannot be prerendered without a page.
 */
import { registerPage } from './registry'
import { ROUTES } from '../content/routes'
import { Home } from './Home'
import { Fabrics } from './Fabrics'
import { FabricCategory } from './FabricCategory'
import { Collections } from './Collections'
import { Collection } from './Collection'
import { Industries } from './Industries'
import { Industry } from './Industry'

registerPage('home', Home)
registerPage('fabrics', Fabrics)
registerPage('collections', Collections)
registerPage('industries', Industries)

/** Register the detail pages that a group owns, keyed by trailing slug. */
function registerDetailPages(
  group: string,
  indexPath: string,
  render: (slug: string, locale: 'en' | 'tr') => React.ReactElement,
) {
  for (const route of ROUTES) {
    if (route.group !== group || route.path === indexPath) continue
    const slug = route.path.split('/').pop()!
    registerPage(route.key, ({ locale }) => render(slug, locale))
  }
}

registerDetailPages('fabrics', '/fabrics',
  (slug, locale) => <FabricCategory slug={slug} locale={locale} />)

registerDetailPages('collections', '/collections',
  (slug, locale) => <Collection slug={slug} locale={locale} />)

registerDetailPages('industries', '/industries',
  (slug, locale) => <Industry slug={slug} locale={locale} />)
