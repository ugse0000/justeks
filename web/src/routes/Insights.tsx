import { Link } from 'react-router'
import type { Locale } from '../content/schema'
import { getContent } from '../content'
import { ARTICLE_SLUGS } from '../content/routes'
import { toLocalePath } from '../lib/i18n'
import { Seo } from '../lib/seo'
import { Section, Container, Eyebrow } from '../components/primitives'
import './Insights.css'

const COPY = {
  en: {
    eyebrow: 'Insights',
    heading: 'Textile Knowledge. Built Over Time.',
    lead: 'Technical guidance on specifying fabric for production, drawn from the experience behind the range.',
    minutes: 'min read',
    seo: {
      title: 'Insights — Technical Fabric Guidance — JUSTEKS',
      description: 'Practical guidance for production buyers: linen, GSM, poplin versus oxford, shirting selection, twill and reading a fabric composition.',
    },
  },
  tr: {
    eyebrow: 'Insights',
    heading: 'Zamanla Biriken Tekstil Bilgisi.',
    lead: 'Ürün grubumuzun arkasındaki deneyimden çıkan, üretim için kumaş belirlemeye dair teknik rehberlik.',
    minutes: 'dk okuma',
    seo: {
      title: 'Insights — Teknik Kumaş Rehberi — JUSTEKS',
      description: 'Üretim alıcıları için pratik rehberlik: keten, GSM, poplin ve oxford farkı, gömleklik seçimi, dimi ve kumaş kompozisyonu okuma.',
    },
  },
} as const

export function Insights({ locale }: { locale: Locale }) {
  const { insights } = getContent(locale)
  const copy = COPY[locale]

  const ordered = [...ARTICLE_SLUGS].sort(
    (a, b) => insights[b].publishedAt.localeCompare(insights[a].publishedAt),
  )

  return (
    <>
      <Seo path="/insights" locale={locale} meta={copy.seo} />

      <Section tone="light" dataSection="insights-intro">
        <Container>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="t-display">{copy.heading}</h1>
          <p className="t-lead t-measure article__standfirst">{copy.lead}</p>
        </Container>
      </Section>

      <Section tone="light" dataSection="insights-list" flush>
        <Container>
          <ul role="list" className="insight-list">
            {ordered.map((slug) => {
              const a = insights[slug]
              return (
                <li key={slug} data-testid="insight-card">
                  <Link className="insight-card" to={toLocalePath(`/insights/${slug}`, locale)}>
                    <span className="insight-card__meta t-mono">
                      <time dateTime={a.publishedAt} data-testid="article-date">{a.publishedAt}</time>
                      <span aria-hidden="true"> · </span>
                      <span>{a.readingMinutes} {copy.minutes}</span>
                    </span>
                    <span className="t-h2 insight-card__title">{a.title}</span>
                    <span className="t-body insight-card__standfirst">{a.standfirst}</span>
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
