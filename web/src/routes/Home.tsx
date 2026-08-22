import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { FABRIC_SLUGS, COLLECTION_SLUGS, INDUSTRY_SLUGS } from '../content/routes'
import { Seo } from '../lib/seo'
import { organizationJsonLd } from '../../site.config'
import { Hero } from '../components/sections/Hero'
import { TrustStrip } from '../components/sections/TrustStrip'
import { Heritage } from '../components/sections/Heritage'
import { GlobalSupplyMap } from '../components/sections/GlobalSupplyMap'
import { CorporateCta } from '../components/sections/CorporateCta'
import { CardGrid, ChipBlock, TrioBlock, CalloutBlock } from '../components/sections/blocks'
import type { GridCard } from '../components/sections/blocks'

/**
 * The homepage follows the section order agreed in the spec. Two slots differ
 * from the original brief because they require product data that does not
 * exist yet: "Featured Fabrics" is carried by Textile Expertise and
 * "Find Your Fabric" by the Sourcing Desk. Both revert when the catalogue
 * phase lands; the order and numbering stay as they are.
 */
export function Home({ locale }: { locale: Locale }) {
  const content = getContent(locale)
  const { home } = content

  const fabricCards: GridCard[] = FABRIC_SLUGS.map((slug) => {
    const f = content.fabricCategories[slug]
    return {
      key: slug,
      name: f.name,
      href: `/fabrics/${slug}`,
      meta: f.typicalGsm,
      image: f.image,
    }
  })

  const collectionCards: GridCard[] = COLLECTION_SLUGS.map((slug) => {
    const c = content.collections[slug]
    return {
      key: slug,
      name: c.name,
      href: `/collections/${slug}`,
      lead: c.intro.lead,
      image: c.image,
    }
  })

  const industryCards: GridCard[] = INDUSTRY_SLUGS.map((slug) => {
    const i = content.industries[slug]
    return {
      key: slug,
      name: i.name,
      href: `/industries/${slug}`,
      lead: i.intro.lead,
      image: i.image,
    }
  })

  return (
    <>
      <Seo path="/" locale={locale} meta={home.seo} jsonLd={organizationJsonLd()} />

      <Hero locale={locale} />
      <TrustStrip locale={locale} />
      <Heritage locale={locale} />

      <CardGrid
        id="fabric-categories" index="04" tone="light"
        intro={home.fabricCategories} cta={home.fabricCategories.cta}
        cards={fabricCards} locale={locale} testId="home-fabric-card" columns={4}
      />

      <CardGrid
        id="collections" index="05" tone="ivory"
        intro={home.collections} cta={home.collections.cta}
        cards={collectionCards} locale={locale} testId="home-collection-card" columns={4}
      />

      <ChipBlock
        id="textile-expertise" index="06" tone="light"
        intro={home.expertise} body={home.expertise.body}
        chips={home.expertise.properties} locale={locale}
      />

      <CalloutBlock
        id="sourcing" index="07" tone="dark"
        intro={home.sourcing} body={home.sourcing.body}
        cta={home.sourcing.cta} locale={locale}
      />

      <CalloutBlock
        id="uk-origin" index="08" tone="light"
        intro={home.ukOrigin} body={home.ukOrigin.body}
        cta={home.ukOrigin.cta} badge={home.ukOrigin.badge} locale={locale}
      />

      <ChipBlock
        id="quality" index="09" tone="ivory"
        intro={home.quality} body={home.quality.body}
        chips={home.quality.fields} locale={locale}
      />

      <CardGrid
        id="industries" index="10" tone="light"
        intro={home.industries} cta={home.industries.cta}
        cards={industryCards} locale={locale} testId="home-industry-card" columns={4}
      />

      <TrioBlock
        id="sample-service" index="11" tone="ivory"
        intro={home.sampleService} body={home.sampleService.body}
        items={home.sampleService.options} locale={locale}
      />

      <GlobalSupplyMap locale={locale} />

      <TrioBlock
        id="trade-logistics" index="13" tone="light"
        intro={home.tradeLogistics} body={home.tradeLogistics.body}
        items={home.tradeLogistics.deliveryModes} note={home.tradeLogistics.note}
        locale={locale}
      />

      <ChipBlock
        id="bulk-orders" index="14" tone="ivory"
        intro={home.bulkOrders} body={home.bulkOrders.body}
        chips={home.bulkOrders.fields} cta={home.bulkOrders.cta} locale={locale}
      />

      <ChipBlock
        id="responsible" index="15" tone="light"
        intro={home.responsible} body={home.responsible.body}
        chips={home.responsible.attributes} note={home.responsible.note}
        locale={locale}
      />

      <CalloutBlock
        id="insights" index="16" tone="ivory"
        intro={home.insights} body={[]} cta={home.insights.cta} locale={locale}
      />

      <CorporateCta locale={locale} />
    </>
  )
}
