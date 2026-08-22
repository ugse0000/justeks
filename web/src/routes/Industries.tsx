import { Link } from 'react-router'
import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { INDUSTRY_SLUGS } from '../content/routes'
import { toLocalePath } from '../lib/i18n'
import { Seo } from '../lib/seo'
import { Section, Container, Eyebrow } from '../components/primitives'
import './Industry.css'

const COPY = {
  en: {
    eyebrow: 'Industries',
    heading: 'Built for Professional Textile Production',
    lead: 'Every sector specifies fabric differently. These pages set out what actually drives the decision in each — and which JUSTEKS categories answer it.',
    seo: {
      title: 'Industries We Serve — JUSTEKS',
      description: 'Fabric supply for fashion and apparel, shirting, tailoring, casual and streetwear, workwear, uniforms, hospitality and interior production.',
    },
  },
  tr: {
    eyebrow: 'Sektörler',
    heading: 'Profesyonel Tekstil Üretimi İçin',
    lead: 'Her sektör kumaşı farklı belirler. Bu sayfalar her birinde kararı gerçekte neyin yönlendirdiğini ve hangi JUSTEKS kategorilerinin buna karşılık geldiğini ortaya koyar.',
    seo: {
      title: 'Hizmet Verdiğimiz Sektörler — JUSTEKS',
      description: 'Moda ve hazır giyim, gömlek, terzilik, günlük giyim, iş kıyafeti, üniforma, hospitality ve iç mekân üretimi için kumaş tedariki.',
    },
  },
} as const

export function Industries({ locale }: { locale: Locale }) {
  const { industries } = getContent(locale)
  const copy = COPY[locale]

  return (
    <>
      <Seo path="/industries" locale={locale} meta={copy.seo} />

      <Section tone="light" dataSection="industries-intro">
        <Container>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="t-display">{copy.heading}</h1>
          <p className="t-lead t-measure industry__lead">{copy.lead}</p>
        </Container>
      </Section>

      <Section tone="light" dataSection="industries-grid" flush>
        <Container>
          <ul role="list" className="industry-grid">
            {INDUSTRY_SLUGS.map((slug) => {
              const i = industries[slug]
              return (
                <li key={slug} data-testid="industry-card">
                  <Link className="industry-card" to={toLocalePath(`/industries/${slug}`, locale)}>
                    <span className="industry-card__media">
                      <img src={i.image.src} alt={i.image.alt}
                           width={i.image.width} height={i.image.height} loading="lazy" />
                    </span>
                    <span className="industry-card__name t-h3">{i.name}</span>
                    <span className="industry-card__lead t-small">{i.intro.lead}</span>
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
