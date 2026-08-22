/**
 * JUSTEKS mark geometry — the single source for every logo file.
 *
 * Shapes are monoline: one stroke weight, butt caps, mitre joins. Drawing the
 * letters as strokes rather than filled outlines keeps the whole system
 * derivable from a handful of numbers, so the monogram, the wordmark and the
 * lockup cannot drift apart, and regenerating produces identical output.
 */

/* ---- Monogram --------------------------------------------------------- */

export const MONO = {
  box: 64,
  stroke: 10,
  serifLeft: 30,
  stemX: 42,
  capY: 15,
  bowlY: 39,
  bowlR: 10,
}

/**
 * The J: a short top serif, a straight stem, and a true semicircular bowl.
 *
 * The bowl is a real half-circle rather than a calligraphic sweep — it reads
 * as the turn of a finished selvedge and holds its shape at 16px, where a
 * tapered curve turns to mush. The serif is what stops the mark reading as a
 * hook or a U once it gets small.
 */
export function monogramPath() {
  const { serifLeft, stemX, capY, bowlY, bowlR } = MONO
  return `M${serifLeft} ${capY} H${stemX} V${bowlY} `
    + `A${bowlR} ${bowlR} 0 0 1 ${stemX - bowlR * 2} ${bowlY}`
}

export function monogramBounds() {
  const { stroke, serifLeft, stemX, capY, bowlY, bowlR } = MONO
  const h = stroke / 2
  return {
    minX: stemX - bowlR * 2 - h, maxX: stemX + h,
    minY: capY - h, maxY: bowlY + bowlR + h,
  }
}

/* ---- Wordmark --------------------------------------------------------- */

export const WORD = {
  cap: 40,
  stroke: 8,
  /** Optical gap between letters, tuned per pair below. */
  tracking: 13,
}

/**
 * Letters on a shared baseline, drawn on their own 0..width origin.
 *
 * The J repeats the monogram's serif so the two marks are visibly the same
 * alphabet. Round letters overshoot the cap line slightly, which is what makes
 * them look the same height as the flat ones.
 */
export const OVER = 0.5   // optical overshoot so round forms match flat ones

/**
 * Letters drawn on their own origin, with the true ink extents recorded.
 *
 * `ink` is what the stroke actually spans horizontally, which is not the same
 * as the drawing origin: the J's bowl reaches further left than its serif, and
 * the K's lower leg further right than its stem. Spacing letters by their ink
 * rather than by a nominal advance is what keeps the gaps even.
 */
export const LETTERS = {
  J: { ink: [2, 22], d: 'M6 0 H22 V30 A10 10 0 0 1 2 30' },
  U: { ink: [0, 24], d: 'M0 0 V28 A12 12 0 0 0 24 28 V0' },
  S: {
    ink: [2, 20],
    d: `M20 ${10 - OVER} C20 4 16 ${-OVER} 11 ${-OVER} `
     + `C6 ${-OVER} 2 4 2 9 C2 14 6 17 11 19 `
     + `C16 21 20 25 20 30 C20 36 16 ${40 + OVER} 11 ${40 + OVER} `
     + `C6 ${40 + OVER} 2 36 2 30`,
  },
  T: { ink: [0, 24], d: 'M0 0 H24 M12 0 V40' },
  E: { ink: [0, 21], d: 'M21 0 H0 V40 H21 M0 20 H16' },
  K: { ink: [0, 22], d: 'M0 0 V40 M20 0 L1 21 M7 15 L22 40' },
}

/**
 * Per-pair corrections on top of the even tracking.
 *
 * Open counters need less air than flat sides: T leaves a void under its arm,
 * so anything beside it closes up, and round shapes tuck slightly into their
 * neighbours.
 */
const KERN = {
  JU: 0, US: -1, ST: -4, TE: -4, EK: -1, KS: -2,
}

/** The wordmark as one set of paths plus the ink width it occupies. */
export function wordmark(text = 'JUSTEKS') {
  const parts = []
  let cursor = 0
  for (let i = 0; i < text.length; i++) {
    const letter = LETTERS[text[i]]
    if (!letter) throw new Error(`no glyph for "${text[i]}"`)
    const [left, right] = letter.ink
    // Shift so the letter's left ink edge lands exactly on the cursor.
    parts.push(`<path d="${letter.d}" transform="translate(${round(cursor - left)} 0)"/>`)
    cursor += (right - left) + WORD.tracking + (KERN[text.slice(i, i + 2)] ?? 0)
  }
  const last = text.slice(-2)
  return { parts, width: round(cursor - WORD.tracking - (KERN[last] ?? 0)) }
}

export const round = (n) => Math.round(n * 100) / 100

/* ---- Lockup ----------------------------------------------------------- */

/**
 * Horizontal lockup: monogram, hairline, wordmark.
 *
 * The monogram is set well above the wordmark's cap height. At equal size the
 * two read as "J JUSTEKS", because the mark is the same letter the word starts
 * with; the size step plus the rule separate emblem from name. The rule is the
 * one place gold earns its keep in the logo system - a single hairline, the
 * width of a selvedge thread, and the mark is complete without it in one ink.
 */
export const LOCKUP = {
  /** Monogram height as a multiple of its natural size. */
  monoScale: 1.5,
  /** Space either side of the rule. */
  gap: 16,
  ruleWidth: 1.5,
}

export function lockup() {
  const mb = monogramBounds()
  const { parts, width: wordW } = wordmark()
  const { monoScale, gap, ruleWidth } = LOCKUP
  const half = WORD.stroke / 2 + OVER

  const scaledH = (mb.maxY - mb.minY) * monoScale
  const scaledW = (mb.maxX - mb.minX) * monoScale
  const monoDX = round(-mb.minX * monoScale)
  const monoDY = round(WORD.cap / 2 - scaledH / 2 - mb.minY * monoScale)

  const ruleX = round(scaledW + gap)
  const wordX = round(ruleX + ruleWidth + gap + WORD.stroke / 2)

  const top = round(Math.min(mb.minY * monoScale + monoDY, -half))
  const bottom = round(Math.max(mb.maxY * monoScale + monoDY, WORD.cap + half))
  const width = round(wordX + wordW + WORD.stroke / 2)

  return {
    parts,
    monoTransform: `translate(${monoDX} ${monoDY}) scale(${monoScale})`,
    wordTransform: `translate(${wordX} 0)`,
    monoStroke: MONO.stroke,
    rule: { x: ruleX, y: 0, w: ruleWidth, h: WORD.cap },
    viewBox: `0 ${top} ${width} ${round(bottom - top)}`,
    width, height: round(bottom - top), top,
  }
}
