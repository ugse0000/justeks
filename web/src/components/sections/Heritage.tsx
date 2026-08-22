import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { Section, Container } from '../primitives'
import { SectionHead } from './blocks'
import './Heritage.css'

export function Heritage({ locale }: { locale: Locale }) {
  const { heritage } = getContent(locale).home
  return (
    <Section tone="light" dataSection="heritage">
      <Container>
        <div className="heritage">
          <div>
            <SectionHead intro={heritage} index="03" />
            {heritage.body.map((p) => (
              <p key={p.slice(0, 24)} className="t-body t-measure heritage__para">{p}</p>
            ))}
          </div>
          <ol className="timeline">
            {heritage.milestones.map((m) => (
              <li key={m.year} className="timeline__item">
                <span className="timeline__year t-mono">{m.year}</span>
                <span className="t-body timeline__body">{m.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
