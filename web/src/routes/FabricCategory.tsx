import { Link } from 'react-router'
import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { toLocalePath } from '../lib/i18n'
import { Seo, breadcrumbJsonLd } from '../lib/seo'
import { Section, Container, Eyebrow, Button } from '../components/primitives'
import './FabricCategory.css'

interface FabricCategoryProps {
  slug: string
  locale: Locale
}

export function FabricCategory({ slug, locale }: FabricCategoryProps) {
  const content = getContent(locale)
  const fabric = content.fabricCategories[slug]
  const path = `/fabrics/${slug}`
  const L = (p: string) => toLocalePath(p, locale)

  const spec = [
    { label: locale === 'tr' ? 'Konstrüksiyon' : 'Construction', value: fabric.construction },
    { label: locale === 'tr' ? 'Gramaj' : 'Weight', value: fabric.typicalGsm },
    { label: locale === 'tr' ? 'En' : 'Width', value: fabric.typicalWidth },
    { label: locale === 'tr' ? 'Tuşe' : 'Hand Feel', value: fabric.handFeel },
    { label: locale === 'tr' ? 'Menşe' : 'Country of Origin', value: 'United Kingdom' },
  ]

  const t = {
    types: locale === 'tr' ? 'Alt Türler' : 'Fabric Types',
    applications: locale === 'tr' ? 'Kullanım Alanları' : 'Recommended Applications',
    notes: locale === 'tr' ? 'Üretim Notları' : 'Production Notes',
    related: locale === 'tr' ? 'İlgili Koleksiyonlar' : 'Related Collections',
    quote: locale === 'tr' ? 'Teklif Alın' : 'Request a Quote',
    sourcing: locale === 'tr' ? 'Özel Tedarik Talebi' : 'Sourcing Desk',
    allFabrics: locale === 'tr' ? 'Tüm Kumaşlar' : 'All Fabrics',
    ctaBody: locale === 'tr'
      ? 'Bu kategoride aradığınız spesifikasyonu paylaşın; ekibimiz uygun kumaş alternatiflerini değerlendirmenize yardımcı olsun.'
      : 'Share the specification you are working to and our team will help you evaluate the right fabric options.',
  }

  return (
    <>
      <Seo
        path={path}
        locale={locale}
        meta={fabric.seo}
        jsonLd={breadcrumbJsonLd(locale, [
          { name: 'JUSTEKS', path: '/' },
          { name: content.nav.primary[1].label, path: '/fabrics' },
          { name: fabric.name, path },
        ])}
      />

      <Section tone="light" dataSection="fabric-hero">
        <Container>
          <nav className="crumb t-small" aria-label="Breadcrumb">
            <Link to={L('/fabrics')}>{t.allFabrics}</Link>
            <span aria-hidden="true"> / </span>
            <span>{fabric.name}</span>
          </nav>

          <Eyebrow>{fabric.intro.eyebrow}</Eyebrow>
          <h1 className="t-display">{fabric.intro.heading}</h1>
          <p className="t-lead t-measure fabric__lead">{fabric.intro.lead}</p>
        </Container>
      </Section>

      <figure className="fabric__figure">
        <img
          src={fabric.image.src}
          alt={fabric.image.alt}
          width={fabric.image.width}
          height={fabric.image.height}
          loading="lazy"
        />
      </figure>

      <Section tone="light" dataSection="fabric-overview">
        <Container>
          <div className="fabric__body">
            <div className="fabric__prose" data-testid="overview">
              {fabric.overview.map((p) => (
                <p key={p.slice(0, 32)} className="t-body t-measure">{p}</p>
              ))}
            </div>

            <aside className="fabric__spec">
              <h2 className="t-eyebrow">{locale === 'tr' ? 'Teknik Özet' : 'Technical Summary'}</h2>
              <dl className="spec" data-testid="spec-table">
                {spec.map((row) => (
                  <div key={row.label} className="spec__row">
                    <dt className="t-small spec__label">{row.label}</dt>
                    <dd className="t-mono spec__value">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="ivory" dataSection="fabric-types">
        <Container>
          <div className="fabric__columns">
            <div>
              <h2 className="t-eyebrow">{t.types}</h2>
              <ul role="list" className="tags" data-testid="types">
                {fabric.types.map((type) => (
                  <li key={type} className="tag t-small">{type}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="t-eyebrow">{t.applications}</h2>
              <ul role="list" className="tags" data-testid="applications">
                {fabric.applications.map((a) => (
                  <li key={a} className="tag t-small">{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light" dataSection="fabric-notes">
        <Container>
          <h2 className="t-h2 t-measure-head">{t.notes}</h2>
          <ul role="list" className="notes" data-testid="production-notes">
            {fabric.productionNotes.map((n) => (
              <li key={n.slice(0, 32)} className="t-body notes__item">{n}</li>
            ))}
          </ul>

          <div className="fabric__related" data-testid="related-collections">
            <h2 className="t-eyebrow">{t.related}</h2>
            <ul role="list" className="tags">
              {fabric.relatedCollections.map((c) => (
                <li key={c}>
                  <Link className="tag tag--link t-small" to={L(`/collections/${c}`)}>
                    {content.fabricCategories[c]?.name ?? c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="dark" dataSection="fabric-cta">
        <Container>
          <h2 className="t-h2 t-measure-head">{t.quote}</h2>
          <p className="t-lead t-measure fabric__cta-body">{t.ctaBody}</p>
          <div className="fabric__cta-actions">
            <Button href={L('/contact?topic=SALES')} variant="solid">{t.quote}</Button>
            <Button href={L('/sourcing')} variant="outline">{t.sourcing}</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
