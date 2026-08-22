import type { ReactNode } from 'react'
import './Section.css'

export type Tone = 'light' | 'ivory' | 'cream' | 'dark'

interface SectionProps {
  children: ReactNode
  tone?: Tone
  /** Stable hook for tests and the homepage section-order assertion. */
  id?: string
  dataSection?: string
  /** Removes the default vertical rhythm — for full-bleed strips. */
  flush?: boolean
  className?: string
}

export function Section({
  children, tone = 'light', id, dataSection, flush, className = '',
}: SectionProps) {
  const dark = tone === 'dark'
  return (
    <section
      id={id}
      data-section={dataSection}
      className={`section section--${tone} ${flush ? 'section--flush' : ''} ${dark ? 'on-dark' : ''} ${className}`}
    >
      {children}
    </section>
  )
}
