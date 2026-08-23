/**
 * JUSTEKS mark geometry — the single source for every logo file.
 *
 * The identity is typographic. The wordmark is Playfair Display, the tagline
 * Montserrat, and the monogram a JT built from the same Playfair capitals.
 * Outlines come from `glyphs.mjs`, extracted once from the fonts in
 * `brand/fonts/`, so the artwork needs no font installed anywhere it is
 * reproduced.
 *
 * Everything is expressed against the wordmark's cap height, which is 100
 * units with the baseline at y = 0. One number therefore drives the whole
 * system, and the marks cannot drift apart.
 */
import { PLAYFAIR, MONTSERRAT } from './glyphs.mjs'

export const CAP = 100

export const round = (n) => Math.round(n * 100) / 100

/* ---- Setting text ------------------------------------------------------ */

/**
 * Set a string as positioned glyph outlines.
 *
 * Letters are spaced by their ink, not by their advance widths. At the very
 * open tracking this identity uses the difference is visible: Playfair's J
 * carries a tail that reaches left of its origin and a sidebearing that would
 * otherwise push the whole word off centre, and the K's leg runs past its
 * advance. Measuring between what the eye actually sees keeps every gap equal.
 */
function setText(glyphs, text, track) {
  const parts = []
  let cursor = 0
  let top = 0
  let bottom = 0

  for (const ch of text) {
    const glyph = glyphs[ch]
    if (!glyph) throw new Error(`no outline for "${ch}"`)

    if (glyph.d) {
      parts.push({ d: glyph.d, x: round(cursor - glyph.ink[0]) })
      top = Math.min(top, glyph.top)
      bottom = Math.max(bottom, glyph.bottom)
      cursor += glyph.ink[1] - glyph.ink[0] + track
    } else {
      // A space has no ink to measure, so it advances by its own width.
      cursor += glyph.advance + track
    }
  }

  return { parts, width: round(cursor - track), top: round(top), bottom: round(bottom) }
}

/* ---- Wordmark ---------------------------------------------------------- */

/**
 * Letterspacing is the wordmark's whole character.
 *
 * At normal setting the name reads as a word on a page. Opened to better than
 * half the cap height it reads as a mark: the eye takes the letters one at a
 * time and the shape holds at the width of a selvedge or a shopfront. This is
 * the single number that most defines the logo, so it lives on its own.
 */
export const WORD = { track: 55 }

export function wordmark(text = 'JUSTEKS') {
  return setText(PLAYFAIR, text, WORD.track)
}

/* ---- Tagline ----------------------------------------------------------- */

/**
 * Montserrat, small, and tracked wider still than the wordmark.
 *
 * `cap` is the tagline's cap height as a fraction of the wordmark's. `track`
 * is measured in the tagline's own cap units, which is why the number looks
 * large beside the wordmark's.
 */
export const TAGLINE = {
  text: 'FABRIC, PERFECTED.',
  cap: 0.155,
  track: 62,
}

export function tagline(text = TAGLINE.text) {
  return setText(MONTSERRAT, text, TAGLINE.track)
}

/* ---- Monogram ---------------------------------------------------------- */

/**
 * The JT: two Playfair capitals set to interlock.
 *
 * The T is pulled back until its arm crosses the J's stem, so the pair merges
 * into one figure instead of reading as two initials side by side. The J
 * keeps its descending tail, which is what stops the monogram sitting as a
 * dead square and ties it back to the wordmark's own J.
 */
export const MONOGRAM = { overlap: 18 }

export function monogram() {
  const j = PLAYFAIR.J
  const t = PLAYFAIR.T
  const tx = round(j.ink[1] - j.ink[0] - MONOGRAM.overlap - t.ink[0])

  return {
    parts: [
      { d: j.d, x: round(-j.ink[0]) },
      { d: t.d, x: tx },
    ],
    width: round(tx + t.ink[1]),
    top: round(Math.min(j.top, t.top)),
    bottom: round(Math.max(j.bottom, t.bottom)),
  }
}

/* ---- Icon -------------------------------------------------------------- */

/**
 * The monogram inside a hairline ring — the avatar, app icon and stamp form.
 *
 * Drawn on a 100 x 100 field. The mark is fitted by its ink and centred on
 * the ring by that ink too, so the J's tail is inside the circle rather than
 * hanging out of it.
 */
export const ICON = { radius: 47, ring: 1.7, coverage: 0.45 }

export function icon() {
  const m = monogram()
  const size = 100
  const scale = round((size * ICON.coverage) / m.width)
  const height = round((m.bottom - m.top) * scale)

  return {
    size,
    ring: { cx: size / 2, cy: size / 2, r: ICON.radius, width: ICON.ring },
    parts: m.parts,
    transform: `translate(${round((size - m.width * scale) / 2)} `
      + `${round((size - height) / 2 - m.top * scale)}) scale(${scale})`,
  }
}

/* ---- Lockup ------------------------------------------------------------ */

/**
 * The primary lockup: wordmark, gold hairline, tagline.
 *
 * The rule is the one place gold appears in the mark — a single centred
 * hairline the width of a woven selvedge stripe. It is also the only element
 * carrying a second colour, so the lockup reproduces intact in one ink by
 * drawing the rule in the same colour as the letters.
 */
export const LOCKUP = {
  /** Baseline to the top of the rule. */
  ruleTop: 6,
  ruleWidth: 78,
  ruleHeight: 2.2,
  /** Baseline to the tagline's baseline. */
  taglineBase: 48,
}

export function lockup() {
  const word = wordmark()
  const tag = tagline()
  const scale = TAGLINE.cap
  const tagWidth = round(tag.width * scale)

  const rule = {
    x: round((word.width - LOCKUP.ruleWidth) / 2),
    y: LOCKUP.ruleTop,
    w: LOCKUP.ruleWidth,
    h: LOCKUP.ruleHeight,
  }

  const bottom = round(LOCKUP.taglineBase + tag.bottom * scale)

  return {
    word,
    tag,
    rule,
    tagTransform: `translate(${round((word.width - tagWidth) / 2)} `
      + `${LOCKUP.taglineBase}) scale(${scale})`,
    width: word.width,
    top: word.top,
    bottom,
    viewBox: `0 ${word.top} ${word.width} ${round(bottom - word.top)}`,
  }
}

/* ---- Stack ------------------------------------------------------------- */

/**
 * The full vertical lockup: monogram over the primary lockup.
 *
 * This is the formal signature — the one for a label, a cover, a stamp on a
 * dark ground. `gap` is measured between the monogram's lowest ink and the
 * wordmark's cap line, so the J's tail is accounted for rather than clipped.
 */
export const STACK = { monoCap: 1.9, gap: 30 }

export function stack() {
  const base = lockup()
  const mono = monogram()
  const scale = STACK.monoCap
  const monoWidth = round(mono.width * scale)

  // Sit the monogram so its lowest ink clears the wordmark's cap line.
  const dy = round(-CAP - STACK.gap - mono.bottom * scale)
  const top = round(mono.top * scale + dy)

  return {
    ...base,
    mono,
    monoTransform: `translate(${round((base.width - monoWidth) / 2)} ${dy}) scale(${scale})`,
    top,
    viewBox: `0 ${top} ${base.width} ${round(base.bottom - top)}`,
  }
}
