import {
  LOCKUP_MONO_TRANSFORM, LOCKUP_RULE, LOCKUP_VIEWBOX, LOCKUP_WORD_TRANSFORM,
  MONOGRAM_PATH, MONOGRAM_STROKE, MONOGRAM_TIGHT_VIEWBOX,
  WORDMARK_PATHS, WORDMARK_STROKE, WORDMARK_TRANSFORMS, WORDMARK_VIEWBOX,
} from './paths'
import './Logo.css'

export type LogoVariant = 'lockup' | 'monogram' | 'wordmark'

/** Which ground the mark sits on, not the colour of the mark itself. */
export type LogoTone = 'light' | 'dark'

export interface LogoProps {
  variant?: LogoVariant
  /**
   * 'light' paints the mark in ink for a pale ground, 'dark' in ivory for a
   * dark one. Omit it to inherit `color` from the surrounding CSS, which is
   * what most placements want.
   */
  tone?: LogoTone
  /**
   * Accessible name. Provide it when the logo carries meaning — a home link,
   * a standalone mark. Omit it when the logo sits beside text that already
   * says the same thing, and it is hidden from assistive technology instead.
   */
  title?: string
  className?: string
}

const strokeProps = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeLinecap: 'butt' as const,
  strokeLinejoin: 'miter' as const,
}

function Wordmark() {
  return (
    <g strokeWidth={WORDMARK_STROKE} {...strokeProps}>
      {WORDMARK_PATHS.map((d, i) => (
        <path key={WORDMARK_TRANSFORMS[i]} d={d} transform={WORDMARK_TRANSFORMS[i]} />
      ))}
    </g>
  )
}

const VIEW_BOXES: Record<LogoVariant, string> = {
  lockup: LOCKUP_VIEWBOX,
  monogram: MONOGRAM_TIGHT_VIEWBOX,
  wordmark: WORDMARK_VIEWBOX,
}

/**
 * The JUSTEKS mark.
 *
 * Geometry comes from the generated `paths` module, which
 * brand/tools/build-brand.mjs also uses to write the standalone SVG files —
 * so the mark on the page and the mark in the asset folder cannot drift apart.
 *
 * The mark is drawn in `currentColor`, which lets a placement set the colour
 * with ordinary CSS and keeps the whole system working in a single ink. The
 * lockup's hairline is the one exception: gold by default, overridable through
 * the `--logo-rule` custom property for single-ink reproduction.
 */
export function Logo({ variant = 'lockup', tone, title, className }: LogoProps) {
  const decorative = title === undefined
  const classes = ['logo', `logo--${variant}`, tone && `logo--${tone}`, className]
    .filter(Boolean).join(' ')

  return (
    <svg
      className={classes}
      viewBox={VIEW_BOXES[variant]}
      // A decorative mark is hidden outright rather than given an empty name:
      // screen readers skip it, and the text beside it does the work.
      {...(decorative
        ? { 'aria-hidden': true as const, focusable: false }
        : { role: 'img' as const })}
    >
      {!decorative && <title>{title}</title>}

      {variant === 'monogram' && (
        <path d={MONOGRAM_PATH} strokeWidth={MONOGRAM_STROKE} {...strokeProps} />
      )}

      {variant === 'wordmark' && <Wordmark />}

      {variant === 'lockup' && (
        <>
          <g strokeWidth={MONOGRAM_STROKE} {...strokeProps}>
            <path d={MONOGRAM_PATH} transform={LOCKUP_MONO_TRANSFORM} />
          </g>
          <rect
            className="logo__rule"
            x={LOCKUP_RULE.x} y={LOCKUP_RULE.y}
            width={LOCKUP_RULE.w} height={LOCKUP_RULE.h}
          />
          <g transform={LOCKUP_WORD_TRANSFORM}>
            <Wordmark />
          </g>
        </>
      )}
    </svg>
  )
}
