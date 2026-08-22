import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { Container } from '../primitives'
import './TrustStrip.css'

export function TrustStrip({ locale }: { locale: Locale }) {
  const { trust } = getContent(locale).home
  return (
    <section className="trust on-dark" data-section="trust">
      <Container width="wide">
        <ul role="list" className="trust__list" data-testid="trust-strip">
          {trust.map((item) => (
            <li key={item} className="trust__item">{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
