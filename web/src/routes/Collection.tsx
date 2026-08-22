import { Link } from 'react-router'
import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { toLocalePath } from '../lib/i18n'
import { Seo, breadcrumbJsonLd } from '../lib/seo'
import { Section, Container, Eyebrow, Button } from '../components/primitives'
import './Collection.css'

const COPY = {
  en: {
    all: 'All Collections',
    includes: 'What it covers',
    related: 'Explore these fabrics',
    quote: 'Request a Quote',
    sample: 'Request a Sample',
    ctaBody: 'Tell us what you are producing and we will help you narrow this collection to the qualities that fit your specification.',
  },
  tr: {
    all: 'Tüm Koleksiyonlar',
    includes: 'Kapsadığı alanlar',
    related: 'Bu kumaşları inceleyin',
    quote: 'Teklif Alın',
    sample: 'Numune Talebi',
    ctaBody: 'Ne ürettiğinizi paylaşın; bu koleksiyonu spesifikasyonunuza uyan kalitelere daraltmanıza yardımcı olalım.',
  },
} as const

export function Collection({ slug, locale }: { slug: string; locale: Locale }) {
  const content = getContent(locale)
  const collection = content.collections[slug]
  const copy = COPY[locale]
  const path = `/collections/${slug}`
  const L = (p: string) => toLocalePath(p, locale)

  return (
    <>
      <Seo
        path={path}
        locale={locale}
        meta={collection.seo}
        jsonLd={breadcrumbJsonLd(locale, [
          { name: 'JUSTEKS', path: '/' },
          { name: content.nav.primary[2].label, path: '/collections' },
          { name: collection.name, path },
        ])}
      />

      <Section tone="dark" dataSection="collection-hero">
        <Container>
          <nav className="crumb t-small collection__crumb" aria-label="Breadcrumb">
            <Link to={L('/collections')}>{copy.all}</Link>
            <span aria-hidden="true"> / </span>
            <span>{collection.name}</span>
          </nav>
          <Eyebrow>{collection.intro.eyebrow}</Eyebrow>
          <h1 className="t-display">{collection.intro.heading}</h1>
          <p className="t-lead t-measure collection__lead">{collection.intro.lead}</p>
        </Container>
      </Section>

      <figure className="collection__figure">
        <img
          src={collection.image.src}
          alt={collection.image.alt}
          width={collection.image.width}
          height={collection.image.height}
          loading="lazy"
        />
      </figure>

      <Section tone="light" dataSection="collection-overview">
        <Container>
          <div className="collection__body">
            <div data-testid="overview">
              {collection.overview.map((p) => (
                <p key={p.slice(0, 32)} className="t-body t-measure collection__para">{p}</p>
              ))}
            </div>
            <aside>
              <h2 className="t-eyebrow">{copy.includes}</h2>
              <ul role="list" className="tags collection__includes">
                {collection.includes.map((i) => (
                  <li key={i} className="tag t-small">{i}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="ivory" dataSection="collection-related">
        <Container>
          <h2 className="t-h2 t-measure-head">{copy.related}</h2>
          <ul role="list" className="collection__categories" data-testid="related-categories">
            {collection.relatedCategories.map((c) => {
              const fabric = content.fabricCategories[c]
              return (
                <li key={c}>
                  <Link className="collection__category" to={L(`/fabrics/${c}`)}>
                    <span className="t-h3">{fabric.name}</span>
                    <span className="t-mono collection__category-meta">{fabric.typicalGsm}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="light" dataSection="collection-cta">
        <Container>
          <p className="t-lead t-measure">{copy.ctaBody}</p>
          <div className="collection__actions">
            <Button href={L('/contact?topic=SALES')} variant="solid">{copy.quote}</Button>
            <Button href={L('/sample-service')} variant="outline">{copy.sample}</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
