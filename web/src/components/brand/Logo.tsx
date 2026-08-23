import {
  ICON_RING, ICON_TRANSFORM, ICON_VIEWBOX,
  LOCKUP_RULE, LOCKUP_VIEWBOX,
  MONOGRAM_PARTS, MONOGRAM_VIEWBOX,
  STACK_MONO_TRANSFORM, STACK_VIEWBOX,
  TAGLINE_PARTS, TAGLINE_TRANSFORM,
  WORDMARK_PARTS, WORDMARK_VIEWBOX,
  type MarkPart,
} from './paths'
import './Logo.css'

export type LogoVariant = 'lockup' | 'stack' | 'wordmark' | 'monogram' | 'icon'

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

/** Outlines are positioned by x; their own coordinates carry the rest. */
function Outlines({ parts }: { parts: readonly MarkPart[] }) {
  return parts.map((part) => (
    <path key={part.x} d={part.d} transform={`translate(${part.x} 0)`} />
  ))
}

/** Wordmark, hairline and tagline — the body of both the lockup and stack. */
function LockupBody() {
  return (
    <>
      <g fill="currentColor"><Outlines parts={WORDMARK_PARTS} /></g>
      <rect
        className="logo__accent"
        x={LOCKUP_RULE.x} y={LOCKUP_RULE.y}
        width={LOCKUP_RULE.w} height={LOCKUP_RULE.h}
      />
      <g className="logo__accent" transform={TAGLINE_TRANSFORM}>
        <Outlines parts={TAGLINE_PARTS} />
      </g>
    </>
  )
}

const VIEW_BOXES: Record<LogoVariant, string> = {
  lockup: LOCKUP_VIEWBOX,
  stack: STACK_VIEWBOX,
  wordmark: WORDMARK_VIEWBOX,
  monogram: MONOGRAM_VIEWBOX,
  icon: ICON_VIEWBOX,
}

/**
 * The JUSTEKS mark.
 *
 * Geometry comes from the generated `paths` module, which
 * brand/tools/build-brand.mjs also uses to write the standalone SVG files —
 * so the mark on the page and the mark in the asset folder cannot drift apart.
 *
 * Letters draw in `currentColor`, which lets a placement set the colour with
 * ordinary CSS and keeps the whole system working in a single ink. The rule
 * and the tagline are the exception: gold by default, and overridable through
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

      {variant === 'wordmark' && (
        <g fill="currentColor"><Outlines parts={WORDMARK_PARTS} /></g>
      )}

      {variant === 'monogram' && (
        <g fill="currentColor"><Outlines parts={MONOGRAM_PARTS} /></g>
      )}

      {variant === 'icon' && (
        <>
          <circle
            cx={ICON_RING.cx} cy={ICON_RING.cy} r={ICON_RING.r}
            fill="none" stroke="currentColor" strokeWidth={ICON_RING.width}
          />
          <g fill="currentColor" transform={ICON_TRANSFORM}>
            <Outlines parts={MONOGRAM_PARTS} />
          </g>
        </>
      )}

      {variant === 'lockup' && <LockupBody />}

      {variant === 'stack' && (
        <>
          <LockupBody />
          <g fill="currentColor" transform={STACK_MONO_TRANSFORM}>
            <Outlines parts={MONOGRAM_PARTS} />
          </g>
        </>
      )}
    </svg>
  )
}
