import { useEffect, useRef, useState } from 'react'
import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { toLocalePath } from '../../lib/i18n'
import { Section, Container, Button } from '../primitives'
import { WORLD_PATHS, ORIGIN, REGION_POINTS, arcPath } from './world-map'
import './GlobalSupplyMap.css'

interface Props {
  locale: Locale
}

/** Draw the arcs once when the map scrolls into view; skip if motion is reduced. */
function useDrawOnView<T extends Element>() {
  const ref = useRef<T>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || !ref.current || typeof IntersectionObserver === 'undefined') {
      setDrawn(true)
      return
    }
    const el = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, drawn }
}

export function GlobalSupplyMap({ locale }: Props) {
  const { globalSupply } = getContent(locale)
  // Hover previews a region; clicking pins it. Keeping these separate means a
  // click on an already-hovered region pins it instead of toggling it off, and
  // the pinned choice survives the mouse leaving the row.
  const [pinned, setPinned] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const active = hovered ?? pinned
  const { ref, drawn } = useDrawOnView<HTMLDivElement>()

  const activeRegion = globalSupply.regions.find((r) => r.key === active)
  const mapLabel = locale === 'tr'
    ? 'Birleşik Krallık merkezli global tedarik haritası: United Kingdom’dan Europe, Türkiye, Middle East, North Africa, Americas ve Asia bölgelerine kumaş tedariki.'
    : 'Global supply map centred on the United Kingdom, showing fabric supply from the United Kingdom to Europe, Türkiye, the Middle East, North Africa, the Americas and Asia.'

  return (
    <Section tone="dark" dataSection="global-supply">
      <Container width="wide">
        <div className="supply__head">
          <h2 className="t-display supply__title">
            {globalSupply.mapHeadingLines.map((line) => (
              <span key={line} className="supply__title-line">{line}</span>
            ))}
          </h2>
          <p className="t-lead t-measure supply__caption">{globalSupply.mapCaption}</p>
        </div>

        <div className={`supply__map ${drawn ? 'is-drawn' : ''}`} ref={ref}>
          <svg viewBox="0 0 1000 500" role="img" aria-label={mapLabel} className="supply__svg">
            <g className="supply__land">
              {WORLD_PATHS.map((d) => <path key={d.slice(0, 24)} d={d} />)}
            </g>

            <g className="supply__arcs" aria-hidden="true">
              {globalSupply.regions.map((region, i) => (
                <path
                  key={region.key}
                  data-testid="supply-arc"
                  className={`supply__arc ${active === region.key ? 'is-active' : ''}`}
                  style={{ animationDelay: `${i * 160}ms` }}
                  d={arcPath(REGION_POINTS[region.key])}
                />
              ))}
            </g>

            <g className="supply__nodes" aria-hidden="true">
              {globalSupply.regions.map((region) => {
                const p = REGION_POINTS[region.key]
                return (
                  <circle
                    key={region.key}
                    className={`supply__node ${active === region.key ? 'is-active' : ''}`}
                    cx={p.x}
                    cy={p.y}
                    r={active === region.key ? 6 : 4}
                  />
                )
              })}
              <circle className="supply__origin-ring" cx={ORIGIN.x} cy={ORIGIN.y} r={12} />
              <circle className="supply__origin" cx={ORIGIN.x} cy={ORIGIN.y} r={5} />
            </g>
          </svg>

          <p className="supply__origin-label t-mono" data-testid="origin-label">
            UNITED KINGDOM · EST. 2004
          </p>
        </div>

        <ul role="list" className="supply__regions">
          {globalSupply.regions.map((region) => (
            <li key={region.key}>
              <button
                type="button"
                data-testid="region-button"
                className={`supply__region ${active === region.key ? 'is-active' : ''}`}
                aria-pressed={pinned === region.key}
                onClick={() => setPinned(pinned === region.key ? null : region.key)}
                onMouseEnter={() => setHovered(region.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(region.key)}
                onBlur={() => setHovered(null)}
              >
                {region.name}
              </button>
            </li>
          ))}
        </ul>

        {activeRegion && (
          <div className="supply__detail" role="region" aria-label={activeRegion.name}>
            <p className="t-body t-measure">
              <span className="supply__detail-name">{activeRegion.name}</span>
              {' — '}
              {activeRegion.body}
            </p>
          </div>
        )}

        <div className="supply__actions">
          <Button href={toLocalePath(globalSupply.mapCta.href.split('?')[0], locale)
            + (globalSupply.mapCta.href.includes('?') ? `?${globalSupply.mapCta.href.split('?')[1]}` : '')}
            variant="solid">
            {globalSupply.mapCta.label}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
