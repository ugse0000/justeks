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
import { BulkForm } from '../components/forms/BulkForm'
import { EnquiryForm } from '../components/forms/EnquiryForm'
import { SourcingForm } from '../components/forms/SourcingForm'
import { TradeAccountForm } from '../components/forms/TradeAccountForm'
import { ContactDetails } from '../components/sections/ContactDetails'
import { GenericPage } from './GenericPage'
import { GlobalSupply } from './GlobalSupply'
import { Insights } from './Insights'
import { InsightArticle } from './InsightArticle'

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

/**
 * Corporate, service and legal pages all render from the same shell; only the
 * content key and the canonical path differ. Keeping the mapping here means
 * adding a page is a content file plus one line.
 */
const GENERIC_PAGES: [routeKey: string, contentKey: string, path: string][] = [
  ['about',            'about',            '/about'],
  ['heritage',         'heritage',         '/heritage'],
  ['ukOrigin',         'ukOrigin',         '/uk-origin'],
  ['textileExpertise', 'textileExpertise', '/textile-expertise'],
  ['quality',          'quality',          '/quality-traceability'],
  ['responsible',      'responsible',      '/responsible-textiles'],
  ['tradeLogistics',   'tradeLogistics',   '/trade-logistics'],
  ['sampleService',    'sampleService',    '/sample-service'],
  ['resources',        'resources',        '/resources'],
  ['privacy',          'privacy',          '/privacy'],
  ['cookies',          'cookies',          '/cookies'],
  ['terms',            'terms',            '/terms'],
]

for (const [routeKey, contentKey, path] of GENERIC_PAGES) {
  registerPage(routeKey, ({ locale }) => (
    <GenericPage pageKey={contentKey} path={path} locale={locale} />
  ))
}

// Contact uses the same shell but carries the office and registration
// details, so it is registered on its own rather than in the table above.
registerPage('sourcing', ({ locale }) => (
  <GenericPage pageKey="sourcing" path="/sourcing" locale={locale}>
    <SourcingForm locale={locale} />
  </GenericPage>
))

registerPage('bulkOrders', ({ locale }) => (
  <GenericPage pageKey="bulkOrders" path="/bulk-orders" locale={locale}>
    <BulkForm locale={locale} />
  </GenericPage>
))

registerPage('tradeAccount', ({ locale }) => (
  <GenericPage pageKey="tradeAccount" path="/trade-account" locale={locale}>
    <TradeAccountForm locale={locale} />
  </GenericPage>
))

registerPage('contact', ({ locale }) => (
  <GenericPage pageKey="contact" path="/contact" locale={locale}>
    <EnquiryForm locale={locale} />
    <ContactDetails locale={locale} />
  </GenericPage>
))

registerPage('globalSupply', GlobalSupply)
registerPage('insights', Insights)

registerDetailPages('insights', '/insights',
  (slug, locale) => <InsightArticle slug={slug} locale={locale} />)
