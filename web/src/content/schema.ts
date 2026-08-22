/**
 * Content schema.
 *
 * Every string the site renders lives in src/content/{en,tr} as objects typed
 * against these interfaces. Components never hold copy. Because the Turkish
 * tree must satisfy the same SiteContent type, a missing translation is a
 * compile error rather than a blank page in production.
 */

export type Locale = 'en' | 'tr'

export interface SeoMeta {
  title: string
  description: string
}

export interface ImageRef {
  src: string
  /** Required by design: integrity tests fail if any image lacks alt text. */
  alt: string
  width: number
  height: number
}

export interface CtaRef {
  label: string
  href: string
}

export interface PageIntro {
  eyebrow: string
  heading: string
  lead: string
}

export interface FeatureItem {
  title: string
  body: string
}

export interface LinkedItem {
  label: string
  href: string
  description: string
}

/** A label/value row rendered in monospace (Article, GSM, Width, ...). */
export interface SpecRow {
  label: string
  value: string
}

export interface FabricCategoryContent {
  slug: string
  name: string
  seo: SeoMeta
  intro: PageIntro
  /** At least two paragraphs of category-specific technical prose. */
  overview: string[]
  /** Sub-types exactly as listed in the brief. */
  types: string[]
  typicalGsm: string
  typicalWidth: string
  construction: string
  handFeel: string
  applications: string[]
  productionNotes: string[]
  relatedCollections: string[]
  image: ImageRef
}

export interface CollectionContent {
  slug: string
  name: string
  seo: SeoMeta
  intro: PageIntro
  overview: string[]
  includes: string[]
  relatedCategories: string[]
  image: ImageRef
}

export interface IndustryContent {
  slug: string
  name: string
  seo: SeoMeta
  intro: PageIntro
  overview: string[]
  criticalProperties: FeatureItem[]
  recommendedFabrics: string[]
  image: ImageRef
}

export interface ArticleContent {
  slug: string
  title: string
  seo: SeoMeta
  /** ISO date, e.g. "2026-03-14". */
  publishedAt: string
  readingMinutes: number
  standfirst: string
  body: ArticleBlock[]
  relatedFabrics: string[]
}

export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'spec'; rows: SpecRow[] }

/* ---- Layout ------------------------------------------------------------ */

export interface NavContent {
  brand: string
  primary: CtaRef[]
  searchLabel: string
  /** Search has no engine in phase 1; the link explains where it goes. */
  searchAriaLabel: string
  quoteCta: CtaRef
  menuLabel: string
  closeLabel: string
  skipToContent: string
}

export interface FooterColumn {
  heading: string
  links: CtaRef[]
}

export interface FooterContent {
  brand: string
  tagline: string
  since: string
  columns: FooterColumn[]
  regionsHeading: string
  regions: string[]
  copyright: string
  legal: CtaRef[]
}

/* ---- Home -------------------------------------------------------------- */

export interface HomeContent {
  seo: SeoMeta
  hero: {
    eyebrow: string
    headingLines: string[]
    tagline: string
    lead: string
    ctas: CtaRef[]
    image: ImageRef
  }
  trust: string[]
  heritage: PageIntro & {
    body: string[]
    milestones: { year: string; body: string }[]
  }
  fabricCategories: PageIntro & { cta: CtaRef }
  collections: PageIntro & { cta: CtaRef }
  expertise: PageIntro & { properties: string[]; body: string[] }
  sourcing: PageIntro & { body: string[]; cta: CtaRef }
  ukOrigin: PageIntro & { body: string[]; badge: string; cta: CtaRef }
  quality: PageIntro & { body: string[]; fields: string[] }
  industries: PageIntro & { cta: CtaRef }
  sampleService: PageIntro & { body: string[]; options: FeatureItem[] }
  tradeLogistics: PageIntro & { body: string[]; deliveryModes: FeatureItem[]; note: string }
  bulkOrders: PageIntro & { body: string[]; fields: string[]; cta: CtaRef }
  responsible: PageIntro & { body: string[]; attributes: string[]; note: string }
  insights: PageIntro & { cta: CtaRef }
  corporateCta: {
    heading: string
    body: string
    ctas: CtaRef[]
    footnote: string
  }
}

/* ---- Generic corporate / service page ---------------------------------- */

export interface GenericPageContent {
  seo: SeoMeta
  intro: PageIntro
  body: string[]
  sections?: { heading: string; body: string[]; items?: string[] }[]
  features?: FeatureItem[]
  links?: LinkedItem[]
  note?: string
  ctas?: CtaRef[]
  image?: ImageRef
}

/* ---- Global supply ------------------------------------------------------ */

export interface SupplyRegion {
  key: string
  name: string
  body: string
}

export interface GlobalSupplyContent extends GenericPageContent {
  mapHeadingLines: string[]
  mapCaption: string
  mapCta: CtaRef
  regions: SupplyRegion[]
}

/* ---- Forms -------------------------------------------------------------- */

export interface FormFieldLabels {
  [field: string]: string
}

export interface FormContent {
  heading: string
  lead: string
  labels: FormFieldLabels
  topics?: { value: string; label: string; description: string }[]
  submitLabel: string
  submittingLabel: string
  successHeading: string
  successBody: string
  errorHeading: string
  errorBody: string
  fallbackLinkLabel: string
  fileHint: string
}

/* ---- Root ---------------------------------------------------------------

   SiteContent grows one field per task. Keeping it exact (no optional fields)
   is deliberate: the Turkish tree must satisfy the same type, so a missing
   translation fails the build instead of rendering blank in production.
   Fields land here as their pages are built:
     nav      -> task 4      footer, home -> task 7/9
     fabricCategories, collections -> task 10
     industries, pages, globalSupply -> task 11
     insights -> task 12     forms -> task 19
*/

export interface SiteContent {
  nav: NavContent
  footer: FooterContent
}
