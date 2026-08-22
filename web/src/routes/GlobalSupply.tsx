import type { Locale } from '../content/schema'
import { localiseHref } from '../lib/i18n'
import { getContent } from '../content'
import { Seo } from '../lib/seo'
import { breadcrumbJsonLd } from '../lib/jsonld'
import { Section, Container, Eyebrow, Button } from '../components/primitives'
import { GlobalSupplyMap } from '../components/sections/GlobalSupplyMap'
import './GenericPage.css'

export function GlobalSupply({ locale }: { locale: Locale }) {
  const { globalSupply } = getContent(locale)

  return (
    <>
      <Seo
        path="/global-supply"
        locale={locale}
        meta={globalSupply.seo}
        jsonLd={breadcrumbJsonLd(locale, [
          { name: 'JUSTEKS', path: '/' },
          { name: globalSupply.intro.heading, path: '/global-supply' },
        ])}
      />

      <Section tone="light" dataSection="page-intro">
        <Container>
          <Eyebrow>{globalSupply.intro.eyebrow}</Eyebrow>
          <h1 className="t-display">{globalSupply.intro.heading}</h1>
          <p className="t-lead t-measure page__lead">{globalSupply.intro.lead}</p>
          <div className="page__body">
            {globalSupply.body.map((p) => (
              <p key={p.slice(0, 24)} className="t-body t-measure page__para">{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <GlobalSupplyMap locale={locale} />

      <Section tone="light" dataSection="page-body">
        <Container>
          {globalSupply.sections?.map((section) => (
            <section key={section.heading} className="page__section" data-testid="page-section">
              <h2 className="t-h2 t-measure-head">{section.heading}</h2>
              {section.body.map((p) => (
                <p key={p.slice(0, 24)} className="t-body t-measure page__para">{p}</p>
              ))}
              {section.items && (
                <ul role="list" className="tags page__items">
                  {section.items.map((item) => <li key={item} className="tag t-small">{item}</li>)}
                </ul>
              )}
            </section>
          ))}

          {globalSupply.note && <p className="t-small page__note">{globalSupply.note}</p>}

          <div className="page__actions">
            {globalSupply.ctas?.map((cta, i) => (
              <Button key={cta.href + cta.label} href={localiseHref(cta.href, locale)}
                      variant={i === 0 ? 'solid' : 'outline'}>
                {cta.label}
              </Button>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
