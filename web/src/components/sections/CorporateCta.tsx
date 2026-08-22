import type { Locale } from '../../content/schema'
import { localiseHref } from '../../lib/i18n'
import { getContent } from '../../content'
import { Section, Container, Button } from '../primitives'
import './CorporateCta.css'

export function CorporateCta({ locale }: { locale: Locale }) {
  const { corporateCta } = getContent(locale).home
  return (
    <Section tone="dark" dataSection="corporate-cta">
      <Container>
        <div className="cta-band">
          <h2 className="t-display cta-band__heading">{corporateCta.heading}</h2>
          <p className="t-lead t-measure cta-band__body">{corporateCta.body}</p>
          <div className="cta-band__actions">
            {corporateCta.ctas.map((cta, i) => (
              <Button key={cta.href + cta.label} href={localiseHref(cta.href, locale)}
                      variant={i === 0 ? 'solid' : 'outline'}>
                {cta.label}
              </Button>
            ))}
          </div>
          <p className="cta-band__footnote t-small">{corporateCta.footnote}</p>
        </div>
      </Container>
    </Section>
  )
}
