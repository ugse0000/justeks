import { Link } from 'react-router'
import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { COLLECTION_SLUGS } from '../content/routes'
import { toLocalePath } from '../lib/i18n'
import { Seo } from '../lib/seo'
import { Section, Container, Eyebrow } from '../components/primitives'
import './Collection.css'

const COPY = {
  en: {
    eyebrow: 'Collections',
    heading: 'JUSTEKS Collections',
    lead: 'Curated groupings that cut across technical categories — assembled around how a collection is actually built rather than around fibre alone.',
    seo: {
      title: 'Collections — JUSTEKS Fabric Collections',
      description: 'Explore the JUSTEKS collections: linen, shirting, tailoring, natural, essential, performance, workwear and interior.',
    },
  },
  tr: {
    eyebrow: 'Koleksiyonlar',
    heading: 'JUSTEKS Koleksiyonları',
    lead: 'Teknik kategorileri kesen seçilmiş gruplar — lif temelinde değil, bir koleksiyonun gerçekte nasıl kurulduğu etrafında bir araya getirildi.',
    seo: {
      title: 'Koleksiyonlar — JUSTEKS Kumaş Koleksiyonları',
      description: 'JUSTEKS koleksiyonlarını keşfedin: linen, shirting, tailoring, natural, essential, performance, workwear ve interior.',
    },
  },
} as const

export function Collections({ locale }: { locale: Locale }) {
  const { collections } = getContent(locale)
  const copy = COPY[locale]

  return (
    <>
      <Seo path="/collections" locale={locale} meta={copy.seo} />

      <Section tone="light" dataSection="collections-intro">
        <Container>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="t-display">{copy.heading}</h1>
          <p className="t-lead t-measure collection__lead">{copy.lead}</p>
        </Container>
      </Section>

      <Section tone="light" dataSection="collections-grid" flush>
        <Container>
          <ul role="list" className="collection-grid">
            {COLLECTION_SLUGS.map((slug) => {
              const c = collections[slug]
              return (
                <li key={slug} data-testid="collection-card">
                  <Link className="collection-card" to={toLocalePath(`/collections/${slug}`, locale)}>
                    <span className="collection-card__media">
                      <img src={c.image.src} alt={c.image.alt}
                           width={c.image.width} height={c.image.height} loading="lazy" />
                    </span>
                    <span className="collection-card__name t-h3">{c.name}</span>
                    <span className="collection-card__lead t-small">{c.intro.lead}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>
    </>
  )
}
