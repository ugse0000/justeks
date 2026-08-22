import { Link } from 'react-router'
import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { FABRIC_SLUGS } from '../content/routes'
import { toLocalePath } from '../lib/i18n'
import { Seo } from '../lib/seo'
import { Section, Container, Eyebrow } from '../components/primitives'
import './Fabrics.css'

const COPY = {
  en: {
    eyebrow: 'Fabrics',
    heading: 'Explore Our Fabrics',
    lead: 'UK-origin fabrics organised by technical category. Each category sets out construction, typical weights, applications and the production notes that matter when you specify.',
    seo: {
      title: 'Fabrics — UK-Origin Wholesale Fabric Categories',
      description: 'Explore JUSTEKS fabric categories: linen, cotton, viscose, polyester, wool, denim, knitted, shirting, tailoring, fashion, performance and interior fabrics.',
    },
    typesLabel: 'types',
  },
  tr: {
    eyebrow: 'Kumaşlar',
    heading: 'Kumaşlarımızı Keşfedin',
    lead: 'Birleşik Krallık menşeli kumaşlar teknik kategorilere ayrılmıştır. Her kategori konstrüksiyonu, tipik gramajları, kullanım alanlarını ve spesifikasyon sırasında önem taşıyan üretim notlarını içerir.',
    seo: {
      title: 'Kumaşlar — Birleşik Krallık Menşeli Toptan Kumaş Kategorileri',
      description: 'JUSTEKS kumaş kategorileri: keten, pamuk, viskon, polyester, yün, denim, örme, gömleklik, takım elbiselik, moda, performans ve iç mekân kumaşları.',
    },
    typesLabel: 'alt tür',
  },
} as const

export function Fabrics({ locale }: { locale: Locale }) {
  const { fabricCategories } = getContent(locale)
  const copy = COPY[locale]

  return (
    <>
      <Seo path="/fabrics" locale={locale} meta={copy.seo} />

      <Section tone="light" dataSection="fabrics-intro">
        <Container>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="t-display">{copy.heading}</h1>
          <p className="t-lead t-measure fabrics__lead">{copy.lead}</p>
        </Container>
      </Section>

      <Section tone="light" dataSection="fabrics-grid" flush>
        <Container>
          <ul role="list" className="fabric-grid" data-testid="fabric-grid">
            {FABRIC_SLUGS.map((slug) => {
              const fabric = fabricCategories[slug]
              return (
                <li key={slug} className="fabric-card" data-testid="fabric-card">
                  <Link className="fabric-card__link" to={toLocalePath(`/fabrics/${slug}`, locale)}>
                    <span className="fabric-card__media">
                      <img
                        src={fabric.image.src}
                        alt={fabric.image.alt}
                        width={fabric.image.width}
                        height={fabric.image.height}
                        loading="lazy"
                      />
                    </span>
                    <span className="fabric-card__body">
                      <span className="t-h3 fabric-card__name">{fabric.name}</span>
                      <span className="t-mono fabric-card__meta">
                        {fabric.types.length} {copy.typesLabel} · {fabric.typicalGsm}
                      </span>
                    </span>
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
