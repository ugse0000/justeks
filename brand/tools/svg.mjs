/**
 * SVG emitters for the JUSTEKS marks.
 *
 * Every file is plain filled geometry: no gradients, filters, masks or
 * embedded raster, and no dependency on a font being installed. Colour is
 * flat, so the marks survive one-ink reproduction and black-and-white print.
 */
import { icon, lockup, monogram, round, stack, wordmark } from './geometry.mjs'

export const INK = '#0F0F0F'
export const IVORY = '#F5F2ED'
export const GOLD = '#C6A96B'

const open = (viewBox, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" `
  + `aria-labelledby="t"><title id="t">${title}</title>`

/** Positioned outlines as one filled group. */
export const fills = (parts, colour) =>
  parts.map((p) => `<path d="${p.d}" transform="translate(${p.x} 0)" fill="${colour}"/>`).join('')

/** Tight box around a mark's ink. */
const inkBox = (m) => `0 ${m.top} ${m.width} ${round(m.bottom - m.top)}`

export function wordmarkSvg(colour = INK, title = 'JUSTEKS') {
  const w = wordmark()
  return open(inkBox(w), title) + fills(w.parts, colour) + '</svg>\n'
}

export function monogramSvg(colour = INK, title = 'JUSTEKS') {
  const m = monogram()
  return open(inkBox(m), title) + fills(m.parts, colour) + '</svg>\n'
}

/** The ring mark. `ground` may be null for a transparent field. */
export function iconSvg(colour = INK, ground = null, title = 'JUSTEKS') {
  const i = icon()
  return open(`0 0 ${i.size} ${i.size}`, title)
    + (ground ? `<rect width="${i.size}" height="${i.size}" fill="${ground}"/>` : '')
    + `<circle cx="${i.ring.cx}" cy="${i.ring.cy}" r="${i.ring.r}" fill="none" `
    + `stroke="${colour}" stroke-width="${i.ring.width}"/>`
    + `<g transform="${i.transform}">${fills(i.parts, colour)}</g></svg>\n`
}

/** Wordmark, rule and tagline — shared by the lockup and the stack. */
const lockupBody = (l, colour, ruleColour) =>
  fills(l.word.parts, colour)
  + `<rect x="${l.rule.x}" y="${l.rule.y}" width="${l.rule.w}" height="${l.rule.h}" `
  + `fill="${ruleColour}"/>`
  + `<g transform="${l.tagTransform}">${fills(l.tag.parts, ruleColour)}</g>`

/**
 * The primary lockup.
 *
 * `ruleColour` defaults to gold; pass the ink colour for the single-colour
 * versions, which is what embroidery, embossing and fax-grade reproduction
 * need. The mark is complete either way.
 */
export function lockupSvg(colour = INK, ruleColour = GOLD, title = 'JUSTEKS') {
  const l = lockup()
  return open(l.viewBox, title) + lockupBody(l, colour, ruleColour) + '</svg>\n'
}

/** The full vertical signature: monogram over the lockup. */
export function stackSvg(colour = INK, ruleColour = GOLD, title = 'JUSTEKS') {
  const s = stack()
  return open(s.viewBox, title)
    + lockupBody(s, colour, ruleColour)
    + `<g transform="${s.monoTransform}">${fills(s.mono.parts, colour)}</g></svg>\n`
}

/**
 * Favicon: the monogram alone, switching ink with the viewer's colour scheme
 * so it stays visible in both light and dark tab bars.
 *
 * The ring is left off deliberately. At the sizes a favicon is actually seen
 * it closes up into a filled blob and takes the letters with it.
 */
export function faviconSvg() {
  const m = monogram()
  const pad = 8
  const vb = `${-pad} ${round(m.top - pad)} ${round(m.width + pad * 2)} `
    + `${round(m.bottom - m.top + pad * 2)}`
  return open(vb, 'JUSTEKS')
    + `<style>.m{fill:${INK}}@media (prefers-color-scheme:dark){.m{fill:${IVORY}}}</style>`
    + m.parts.map((p) => `<path class="m" d="${p.d}" transform="translate(${p.x} 0)"/>`).join('')
    + '</svg>\n'
}

/** Square social avatar: the ring mark centred on a solid ground. */
export function socialProfileSvg(ground, colour, title = 'JUSTEKS') {
  return iconSvg(colour, ground, title)
}
