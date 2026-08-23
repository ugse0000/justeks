import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { Container } from '../primitives'
import './TrustStrip.css'

export function TrustStrip({ locale }: { locale: Locale }) {
  const { trust } = getContent(locale).home
  return (
    <section className="trust on-dark" data-section="trust">
      <Container width="wide">
        {/* English labels kept in both locales. Marking them as English is what
              stops CSS uppercasing from applying the Turkish i rule and
              rendering ORIGIN as ORİGİN on /tr. Drop the attribute if the
              copy is ever translated. */}
        <ul role="list" className="trust__list" data-testid="trust-strip" lang="en">
          {trust.map((item) => (
            <li key={item} className="trust__item">{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
