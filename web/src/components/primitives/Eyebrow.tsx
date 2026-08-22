import './Eyebrow.css'

interface EyebrowProps {
  children: string
  /** Section number, e.g. "03" — rendered as "03 — OUR HERITAGE". */
  index?: string
  as?: 'span' | 'p' | 'div'
}

/**
 * Section label. The gold hairline comes from .t-eyebrow::before; on light
 * surfaces the text itself is muted because gold on warm white is 1.98:1.
 * See design/contrast.test.ts.
 */
export function Eyebrow({ children, index, as: Tag = 'span' }: EyebrowProps) {
  return (
    <Tag className="t-eyebrow eyebrow">
      {index && <span className="eyebrow__index" aria-hidden="true">{index} —</span>}
      {children}
    </Tag>
  )
}
