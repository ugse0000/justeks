import { Link } from 'react-router'
import type { GenericPageContent, Locale } from '../content/schema'
import { getContent } from '../content'
import { Seo, breadcrumbJsonLd } from '../lib/seo'
import { Section, Container, Eyebrow, Button } from '../components/primitives'
import { localiseHref } from '../components/sections/Hero'
import './GenericPage.css'

interface GenericPageProps {
  /** Key into content.pages */
  pageKey: string
  /** Canonical path, used for canonical URL and breadcrumbs. */
  path: string
  locale: Locale
  /** Extra content rendered after the standard blocks (forms, maps). */
  children?: React.ReactNode
  noIndex?: boolean
}

/**
 * Renders a corporate, service or legal page from its content object.
 *
 * Seventeen pages share this shell. Each block appears only if the content
 * provides it, so a legal page with long prose and a service page with a
 * feature trio both come out of the same component without flags.
 */
export function GenericPage({ pageKey, path, locale, children, noIndex }: GenericPageProps) {
  const content = getContent(locale)
  const page: GenericPageContent = content.pages[pageKey]

  return (
    <>
      <Seo
        path={path}
        locale={locale}
        meta={page.seo}
        noIndex={noIndex}
        jsonLd={breadcrumbJsonLd(locale, [
          { name: 'JUSTEKS', path: '/' },
          { name: page.intro.heading, path },
        ])}
      />

      <Section tone="light" dataSection="page-intro">
        <Container>
          <Eyebrow>{page.intro.eyebrow}</Eyebrow>
          <h1 className="t-display">{page.intro.heading}</h1>
          <p className="t-lead t-measure page__lead">{page.intro.lead}</p>
        </Container>
      </Section>

      <Section tone="light" dataSection="page-body" flush>
        <Container>
          <div className="page__body" data-testid="page-body">
            {page.body.map((p) => (
              <p key={p.slice(0, 24)} className="t-body t-measure page__para">{p}</p>
            ))}
          </div>

          {page.features && (
            <dl className="page__features" data-testid="page-features">
              {page.features.map((f) => (
                <div key={f.title} className="page__feature">
                  <dt className="t-h3 page__feature-title">{f.title}</dt>
                  <dd className="t-body page__feature-body">{f.body}</dd>
                </div>
              ))}
            </dl>
          )}

          {page.sections?.map((section) => (
            <section key={section.heading} className="page__section" data-testid="page-section">
              <h2 className="t-h2 t-measure-head">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 24)} className="t-body t-measure page__para">{p}</p>
              ))}
              {section.items && (
                <ul role="list" className="tags page__items">
                  {section.items.map((item) => (
                    <li key={item} className="tag t-small">{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {page.links && (
            <ul role="list" className="page__links" data-testid="page-links">
              {page.links.map((link) => (
                <li key={link.href}>
                  <Link className="page__link" to={localiseHref(link.href, locale)}>
                    <span className="t-h3">{link.label}</span>
                    <span className="t-small page__link-desc">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {page.note && <p className="t-small page__note">{page.note}</p>}

          {children}

          {page.ctas && page.ctas.length > 0 && (
            <div className="page__actions">
              {page.ctas.map((cta, i) => (
                <Button key={cta.href + cta.label} href={localiseHref(cta.href, locale)}
                        variant={i === 0 ? 'solid' : 'outline'}>
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
