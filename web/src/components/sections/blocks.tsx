import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { CtaRef, FeatureItem, ImageRef, Locale, PageIntro } from '../../content/schema'
import { Section, Container, Eyebrow, Button } from '../primitives'
import type { Tone } from '../primitives'
import { localiseHref } from './Hero'
import './blocks.css'

/* Shared homepage building blocks. The homepage is long; these keep it from
   becoming seventeen near-identical components. */

interface HeadProps {
  intro: PageIntro
  index?: string
  children?: ReactNode
}

export function SectionHead({ intro, index, children }: HeadProps) {
  return (
    <header className="block__head">
      <Eyebrow index={index}>{intro.eyebrow}</Eyebrow>
      <h2 className="t-h2 t-measure-head">{intro.heading}</h2>
      <p className="t-lead t-measure block__lead">{intro.lead}</p>
      {children}
    </header>
  )
}

/* ---- Card grid (fabrics, collections, industries) --------------------- */

export interface GridCard {
  key: string
  name: string
  href: string
  meta?: string
  lead?: string
  image: ImageRef
}

interface CardGridProps {
  id: string
  tone?: Tone
  index: string
  intro: PageIntro
  cta: CtaRef
  cards: GridCard[]
  locale: Locale
  testId: string
  columns?: 3 | 4
}

export function CardGrid({
  id, tone = 'light', index, intro, cta, cards, locale, testId, columns = 4,
}: CardGridProps) {
  return (
    <Section tone={tone} dataSection={id}>
      <Container>
        <SectionHead intro={intro} index={index} />
        <ul role="list" className={`block-grid block-grid--${columns}`}>
          {cards.map((card) => (
            <li key={card.key} data-testid={testId}>
              <Link className="block-card" to={localiseHref(card.href, locale)}>
                <span className="block-card__media">
                  <img src={card.image.src} alt={card.image.alt}
                       width={card.image.width} height={card.image.height} loading="lazy" />
                </span>
                <span className="block-card__name t-h3">{card.name}</span>
                {card.meta && <span className="block-card__meta t-mono">{card.meta}</span>}
                {card.lead && <span className="block-card__lead t-small">{card.lead}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="block__actions">
          <Button href={localiseHref(cta.href, locale)} variant="outline">{cta.label}</Button>
        </div>
      </Container>
    </Section>
  )
}

/* ---- Prose + chip list (expertise, quality, responsible, bulk) -------- */

interface ChipBlockProps {
  id: string
  tone?: Tone
  index: string
  intro: PageIntro
  body: string[]
  chips: string[]
  note?: string
  cta?: CtaRef
  locale: Locale
}

export function ChipBlock({
  id, tone = 'light', index, intro, body, chips, note, cta, locale,
}: ChipBlockProps) {
  return (
    <Section tone={tone} dataSection={id}>
      <Container>
        <div className="block__split">
          <SectionHead intro={intro} index={index} />
          <div className="block__body">
            {body.map((p) => <p key={p.slice(0, 24)} className="t-body t-measure">{p}</p>)}
            <ul role="list" className="tags block__chips">
              {chips.map((c) => <li key={c} className="tag t-small">{c}</li>)}
            </ul>
            {note && <p className="t-small block__note">{note}</p>}
            {cta && (
              <div className="block__actions">
                <Button href={localiseHref(cta.href, locale)} variant="outline">{cta.label}</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ---- Three cards (sample service, delivery modes) -------------------- */

interface TrioBlockProps {
  id: string
  tone?: Tone
  index: string
  intro: PageIntro
  body: string[]
  items: FeatureItem[]
  note?: string
  cta?: CtaRef
  locale: Locale
}

export function TrioBlock({
  id, tone = 'light', index, intro, body, items, note, cta, locale,
}: TrioBlockProps) {
  return (
    <Section tone={tone} dataSection={id}>
      <Container>
        <SectionHead intro={intro} index={index} />
        {body.map((p) => <p key={p.slice(0, 24)} className="t-body t-measure block__para">{p}</p>)}
        <dl className="block-trio">
          {items.map((item) => (
            <div key={item.title} className="block-trio__item">
              <dt className="t-h3 block-trio__title">{item.title}</dt>
              <dd className="t-body block-trio__body">{item.body}</dd>
            </div>
          ))}
        </dl>
        {note && <p className="t-small block__note">{note}</p>}
        {cta && (
          <div className="block__actions">
            <Button href={localiseHref(cta.href, locale)} variant="outline">{cta.label}</Button>
          </div>
        )}
      </Container>
    </Section>
  )
}

/* ---- Callout (sourcing, uk origin, insights) -------------------------- */

interface CalloutProps {
  id: string
  tone?: Tone
  index: string
  intro: PageIntro
  body: string[]
  cta: CtaRef
  badge?: string
  locale: Locale
}

export function CalloutBlock({
  id, tone = 'ivory', index, intro, body, cta, badge, locale,
}: CalloutProps) {
  return (
    <Section tone={tone} dataSection={id}>
      <Container>
        <SectionHead intro={intro} index={index} />
        {badge && <p className="block__badge t-mono">{badge}</p>}
        {body.map((p) => <p key={p.slice(0, 24)} className="t-body t-measure block__para">{p}</p>)}
        <div className="block__actions">
          <Button href={localiseHref(cta.href, locale)} variant="outline">{cta.label}</Button>
        </div>
      </Container>
    </Section>
  )
}
