import { Link } from 'react-router'
import type { ArticleBlock, Locale } from '../content/schema'
import { getContent } from '../content'
import { toLocalePath } from '../lib/i18n'
import { Seo, breadcrumbJsonLd } from '../lib/seo'
import { SITE_NAME, SITE_URL } from '../../site.config'
import { Section, Container, Eyebrow } from '../components/primitives'
import './Insights.css'

const COPY = {
  en: { all: 'All Insights', related: 'Related fabrics', minutes: 'min read' },
  tr: { all: 'Tüm Insights', related: 'İlgili kumaşlar', minutes: 'dk okuma' },
} as const

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case 'h2':
      return <h2 className="t-h2 t-measure-head article__h2">{block.text}</h2>
    case 'list':
      return (
        <ul role="list" className="article__list">
          {block.items.map((item) => (
            <li key={item.slice(0, 24)} className="t-body article__list-item">{item}</li>
          ))}
        </ul>
      )
    case 'spec':
      return (
        <dl className="spec article__spec">
          {block.rows.map((row) => (
            <div key={row.label + row.value} className="spec__row">
              <dt className="t-small spec__label">{row.label}</dt>
              <dd className="t-mono spec__value">{row.value}</dd>
            </div>
          ))}
        </dl>
      )
    default:
      return <p className="t-body t-measure article__para">{block.text}</p>
  }
}

export function InsightArticle({ slug, locale }: { slug: string; locale: Locale }) {
  const content = getContent(locale)
  const article = content.insights[slug]
  const copy = COPY[locale]
  const path = `/insights/${slug}`
  const L = (p: string) => toLocalePath(p, locale)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seo.description,
    datePublished: article.publishedAt,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en-GB',
    mainEntityOfPage: `${SITE_URL}${L(path)}`,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    author: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <>
      <Seo path={path} locale={locale} meta={article.seo} ogType="article" jsonLd={articleJsonLd} />
      {/* Breadcrumbs are emitted as a second JSON-LD block. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(locale, [
            { name: 'JUSTEKS', path: '/' },
            { name: 'Insights', path: '/insights' },
            { name: article.title, path },
          ])),
        }}
      />

      <Section tone="light" dataSection="article-head">
        <Container>
          <nav className="crumb t-small" aria-label="Breadcrumb">
            <Link to={L('/insights')}>{copy.all}</Link>
            <span aria-hidden="true"> / </span>
            <span>{article.title}</span>
          </nav>

          <Eyebrow>Insights</Eyebrow>
          <h1 className="t-display article__title">{article.title}</h1>
          <p className="t-lead t-measure article__standfirst">{article.standfirst}</p>

          <p className="article__meta t-mono">
            <time dateTime={article.publishedAt} data-testid="article-date">
              {article.publishedAt}
            </time>
            <span aria-hidden="true"> · </span>
            <span>{article.readingMinutes} {copy.minutes}</span>
          </p>
        </Container>
      </Section>

      <Section tone="light" dataSection="article-body" flush>
        <Container>
          <article className="article" data-testid="article-body">
            {article.body.map((block, i) => (
              <Block key={`${block.kind}-${i}`} block={block} />
            ))}
          </article>

          <aside className="article__related" data-testid="related-fabrics">
            <h2 className="t-eyebrow">{copy.related}</h2>
            <ul role="list" className="tags">
              {article.relatedFabrics.map((f) => (
                <li key={f}>
                  <Link className="tag tag--link t-small" to={L(`/fabrics/${f}`)}>
                    {content.fabricCategories[f].name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </Section>
    </>
  )
}
