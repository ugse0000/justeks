import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { localiseHref } from '../../lib/i18n'
import { Container, Button } from '../primitives'
import './Hero.css'

export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale).home

  return (
    <section className="hero on-dark" data-section="hero">
      <img
        className="hero__media"
        src={hero.image.src}
        alt={hero.image.alt}
        width={hero.image.width}
        height={hero.image.height}
        fetchPriority="high"
      />
      <div className="hero__scrim" aria-hidden="true" />

      <Container width="wide" className="hero__inner">
        <span className="t-eyebrow hero__eyebrow">{hero.eyebrow}</span>

        <h1 className="t-display hero__title">
          {hero.headingLines.map((line) => (
            <span key={line} className="hero__title-line">{line}</span>
          ))}
        </h1>

        <p className="hero__tagline t-tagline" lang="en">{hero.tagline}</p>
        <p className="t-lead t-measure hero__lead">{hero.lead}</p>

        <div className="hero__actions">
          {hero.ctas.map((cta, i) => (
            <Button
              key={cta.href}
              href={localiseHref(cta.href, locale)}
              variant={i === 0 ? 'solid' : 'outline'}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  )
}
