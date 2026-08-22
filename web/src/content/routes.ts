/**
 * The route table.
 *
 * This is the single source of truth for routing, prerendering, the sitemap,
 * navigation and hreflang. Nothing else in the codebase keeps a list of pages:
 * add a route here and it is built, linked and indexed everywhere.
 */

export type RouteGroup =
  | 'core' | 'company' | 'supply' | 'fabrics' | 'collections'
  | 'industries' | 'services' | 'insights' | 'legal' | 'admin'

export interface RouteDef {
  path: string
  /** Content key; also the component key in the route registry. */
  key: string
  group: RouteGroup
  /** sitemap.xml priority. */
  priority: number
}

/** Fabric categories, in the order given in the brief (section 12). */
export const FABRIC_SLUGS = [
  'linen', 'cotton', 'viscose', 'polyester', 'wool', 'denim',
  'knitted', 'shirting', 'tailoring', 'fashion',
  'performance-technical', 'interior',
] as const

/** JUSTEKS collections (brief section 13). */
export const COLLECTION_SLUGS = [
  'linen', 'shirting', 'tailoring', 'natural',
  'essential', 'performance', 'workwear', 'interior',
] as const

/** Industries served (brief section 22). */
export const INDUSTRY_SLUGS = [
  'fashion-apparel', 'shirting', 'tailoring', 'casual-streetwear',
  'workwear', 'uniforms', 'hospitality', 'interior-upholstery',
] as const

/** Seed articles for Insights (brief section 34). */
export const ARTICLE_SLUGS = [
  'what-is-linen-fabric',
  'why-fabric-gsm-matters',
  'poplin-vs-oxford',
  'how-to-choose-shirting-fabric',
  'what-is-twill-fabric',
  'reading-fabric-composition',
] as const

export type FabricSlug = (typeof FABRIC_SLUGS)[number]
export type CollectionSlug = (typeof COLLECTION_SLUGS)[number]
export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number]
export type ArticleSlug = (typeof ARTICLE_SLUGS)[number]

const camel = (slug: string) =>
  slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())

export const ROUTES: RouteDef[] = [
  { path: '/', key: 'home', group: 'core', priority: 1.0 },

  { path: '/about',                key: 'about',            group: 'company', priority: 0.8 },
  { path: '/heritage',             key: 'heritage',         group: 'company', priority: 0.8 },
  { path: '/uk-origin',            key: 'ukOrigin',         group: 'company', priority: 0.9 },
  { path: '/textile-expertise',    key: 'textileExpertise', group: 'company', priority: 0.7 },
  { path: '/quality-traceability', key: 'quality',          group: 'company', priority: 0.7 },
  { path: '/responsible-textiles', key: 'responsible',      group: 'company', priority: 0.6 },

  { path: '/global-supply',   key: 'globalSupply',   group: 'supply', priority: 0.9 },
  { path: '/trade-logistics', key: 'tradeLogistics', group: 'supply', priority: 0.7 },
  { path: '/bulk-orders',     key: 'bulkOrders',     group: 'supply', priority: 0.8 },

  { path: '/fabrics',     key: 'fabrics',     group: 'fabrics',     priority: 0.9 },
  ...FABRIC_SLUGS.map((slug): RouteDef => ({
    path: `/fabrics/${slug}`, key: `fabric.${camel(slug)}`, group: 'fabrics', priority: 0.8,
  })),

  { path: '/collections', key: 'collections', group: 'collections', priority: 0.8 },
  ...COLLECTION_SLUGS.map((slug): RouteDef => ({
    path: `/collections/${slug}`, key: `collection.${camel(slug)}`, group: 'collections', priority: 0.7,
  })),

  { path: '/industries',  key: 'industries',  group: 'industries',  priority: 0.8 },
  ...INDUSTRY_SLUGS.map((slug): RouteDef => ({
    path: `/industries/${slug}`, key: `industry.${camel(slug)}`, group: 'industries', priority: 0.7,
  })),

  { path: '/sourcing',       key: 'sourcing',      group: 'services', priority: 0.9 },
  { path: '/sample-service', key: 'sampleService', group: 'services', priority: 0.8 },
  { path: '/trade-account',  key: 'tradeAccount',  group: 'services', priority: 0.7 },
  { path: '/resources',      key: 'resources',     group: 'services', priority: 0.5 },

  { path: '/insights', key: 'insights', group: 'insights', priority: 0.7 },
  ...ARTICLE_SLUGS.map((slug): RouteDef => ({
    path: `/insights/${slug}`, key: `article.${camel(slug)}`, group: 'insights', priority: 0.6,
  })),

  { path: '/contact', key: 'contact', group: 'core', priority: 0.9 },

  { path: '/privacy', key: 'privacy', group: 'legal', priority: 0.3 },
  { path: '/cookies', key: 'cookies', group: 'legal', priority: 0.3 },
  { path: '/terms',   key: 'terms',   group: 'legal', priority: 0.3 },

  { path: '/admin/enquiries', key: 'adminEnquiries', group: 'admin', priority: 0 },
]

/** Routes that get prerendered to static HTML and listed in the sitemap. */
export const PUBLIC_ROUTES = ROUTES.filter((r) => r.group !== 'admin')
