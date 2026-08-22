/**
 * WCAG 2.2 contrast ratio helper.
 *
 * Used by the design-token tests to keep the palette accessible: the rules it
 * enforces live in contrast.test.ts, not in prose. Notably it pins down that
 * champagne gold is a decorative hairline on light surfaces and only becomes a
 * text colour on dark ones.
 */

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

function toRgb(hex: string): [number, number, number] {
  if (!HEX.test(hex)) {
    throw new Error(`Geçersiz hex rengi: ${hex}`)
  }
  const raw = hex.slice(1)
  const full = raw.length === 3 ? raw.replace(/./g, (c) => c + c) : raw
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

/** Relative luminance per WCAG 2.x. */
function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast ratio between two colours, from 1 (identical) to 21 (black/white). */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  const lighter = Math.max(la, lb)
  const darker = Math.min(la, lb)
  return (lighter + 0.05) / (darker + 0.05)
}
