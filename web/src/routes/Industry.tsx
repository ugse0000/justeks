import { Link } from 'react-router'
import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { toLocalePath } from '../lib/i18n'
import { Seo } from '../lib/seo'
import { breadcrumbJsonLd } from '../lib/jsonld'
import { Section, Container, Eyebrow, Button } from '../components/primitives'
import './Industry.css'

const COPY = {
  en: {
    all: 'All Industries',
    critical: 'What matters in this sector',
    fabrics: 'Recommended fabrics',
    quote: 'Request a Quote',
    sourcing: 'Sourcing Desk',
    ctaBody: 'Tell us what you are producing, in what quantity and to what delivery date. Our team will help you evaluate the fabric options that fit.',
  },
  tr: {
    all: 'Tüm Sektörler',
    critical: 'Bu sektörde önem taşıyanlar',
    fabrics: 'Önerilen kumaşlar',
    quote: 'Teklif Alın',
    sourcing: 'Özel Tedarik',
    ctaBody: 'Ne ürettiğinizi, hangi miktarda ve hangi teslim tarihine kadar ihtiyacınız olduğunu paylaşın. Ekibimiz uygun kumaş alternatiflerini değerlendirmenize yardımcı olsun.',
  },
} as const

export function Industry({ slug, locale }: { slug: string; locale: Locale }) {
  const content = getContent(locale)
  const industry = content.industries[slug]
  const copy = COPY[locale]
  const path = `/industries/${slug}`
  const L = (p: string) => toLocalePath(p, locale)

  return (
    <>
      <Seo
        path={path}
        locale={locale}
        meta={industry.seo}
        jsonLd={breadcrumbJsonLd(locale, [
          { name: 'JUSTEKS', path: '/' },
          { name: content.nav.primary[3].label, path: '/industries' },
          { name: industry.name, path },
        ])}
      />

      <Section tone="light" dataSection="industry-hero">
        <Container>
          <nav className="crumb t-small" aria-label="Breadcrumb">
            <Link to={L('/industries')}>{copy.all}</Link>
            <span aria-hidden="true"> / </span>
            <span>{industry.name}</span>
          </nav>
          <Eyebrow>{industry.intro.eyebrow}</Eyebrow>
          <h1 className="t-display">{industry.intro.heading}</h1>
          <p className="t-lead t-measure industry__lead">{industry.intro.lead}</p>
        </Container>
      </Section>

      <figure className="industry__figure">
        <img src={industry.image.src} alt={industry.image.alt}
             width={industry.image.width} height={industry.image.height} loading="lazy" />
      </figure>

      <Section tone="light" dataSection="industry-overview">
        <Container>
          <div data-testid="overview">
            {industry.overview.map((p) => (
              <p key={p.slice(0, 32)} className="t-body t-measure industry__para">{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory" dataSection="industry-properties">
        <Container>
          <h2 className="t-h2 t-measure-head">{copy.critical}</h2>
          <dl className="properties" data-testid="critical-properties">
            {industry.criticalProperties.map((p) => (
              <div key={p.title} className="properties__item">
                <dt className="t-h3 properties__title">{p.title}</dt>
                <dd className="t-body properties__body">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="light" dataSection="industry-fabrics">
        <Container>
          <h2 className="t-h2 t-measure-head">{copy.fabrics}</h2>
          <ul role="list" className="industry__fabrics" data-testid="recommended-fabrics">
            {industry.recommendedFabrics.map((f) => {
              const fabric = content.fabricCategories[f]
              return (
                <li key={f}>
                  <Link className="industry__fabric" to={L(`/fabrics/${f}`)}>
                    <span className="t-h3">{fabric.name}</span>
                    <span className="t-mono industry__fabric-meta">{fabric.typicalGsm}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="dark" dataSection="industry-cta">
        <Container>
          <p className="t-lead t-measure">{copy.ctaBody}</p>
          <div className="industry__actions">
            <Button href={L('/contact?topic=SALES')} variant="solid">{copy.quote}</Button>
            <Button href={L('/sourcing')} variant="outline">{copy.sourcing}</Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
