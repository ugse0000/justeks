/**
 * Side-effect module: importing this registers every page component.
 *
 * Registration is driven by the route table, so a page cannot be reachable
 * without a route and a route cannot be prerendered without a page.
 */
import { registerPage } from './registry'
import { ROUTES } from '../content/routes'
import { Fabrics } from './Fabrics'
import { FabricCategory } from './FabricCategory'

registerPage('fabrics', Fabrics)

for (const route of ROUTES) {
  if (route.group !== 'fabrics' || route.path === '/fabrics') continue
  const slug = route.path.split('/').pop()!
  registerPage(route.key, ({ locale }) => <FabricCategory slug={slug} locale={locale} />)
}
