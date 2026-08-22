/**
 * SVG emitters for the JUSTEKS marks.
 *
 * Every file is plain geometry: no gradients, filters, masks or embedded
 * raster. Colour is a flat stroke so the marks work in one ink and survive
 * black-and-white printing.
 */
import { MONO, WORD, monogramPath, monogramBounds, lockup, wordmark, round } from './geometry.mjs'

export const INK = '#0A0A0A'
export const IVORY = '#FAF8F4'
export const GOLD = '#C8A96A'

const open = (viewBox, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" `
  + `aria-labelledby="t"><title id="t">${title}</title>`

const strokeAttrs = (colour, width) =>
  `fill="none" stroke="${colour}" stroke-width="${width}" `
  + 'stroke-linecap="butt" stroke-linejoin="miter"'

export function monogramSvg(colour = INK, title = 'JUSTEKS') {
  return open(`0 0 ${MONO.box} ${MONO.box}`, title)
    + `<path d="${monogramPath()}" ${strokeAttrs(colour, MONO.stroke)}/></svg>\n`
}

/** Monogram cropped to its ink, for lockups and tight placements. */
export function monogramTightSvg(colour = INK, title = 'JUSTEKS') {
  const b = monogramBounds()
  const vb = `${b.minX} ${b.minY} ${round(b.maxX - b.minX)} ${round(b.maxY - b.minY)}`
  return open(vb, title)
    + `<path d="${monogramPath()}" ${strokeAttrs(colour, MONO.stroke)}/></svg>\n`
}

export function wordmarkSvg(colour = INK, title = 'JUSTEKS') {
  const { parts, width } = wordmark()
  const h = WORD.stroke / 2 + 0.5
  const vb = `${-h} ${-h} ${round(width + h * 2)} ${round(WORD.cap + h * 2)}`
  return open(vb, title) + `<g ${strokeAttrs(colour, WORD.stroke)}>${parts.join('')}</g></svg>\n`
}

/**
 * Horizontal lockup.
 *
 * `ruleColour` defaults to gold; pass the ink colour for the single-colour
 * versions, which is what letterpress, embroidery and fax-grade reproduction
 * need. The mark is complete either way.
 */
export function lockupSvg(colour = INK, ruleColour = GOLD, title = 'JUSTEKS') {
  const l = lockup()
  const { x, y, w, h } = l.rule
  return open(l.viewBox, title)
    + `<g ${strokeAttrs(colour, MONO.stroke)}>`
    + `<path d="${monogramPath()}" transform="${l.monoTransform}"/></g>`
    + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${ruleColour}"/>`
    + `<g ${strokeAttrs(colour, WORD.stroke)} transform="${l.wordTransform}">`
    + l.parts.join('') + '</g></svg>\n'
}

/**
 * Favicon: the monogram on a transparent ground, switching ink with the
 * viewer's colour scheme so it stays visible in both light and dark tab bars.
 */
export function faviconSvg() {
  return open(`0 0 ${MONO.box} ${MONO.box}`, 'JUSTEKS')
    + `<style>.m{stroke:${INK}}`
    + `@media (prefers-color-scheme:dark){.m{stroke:${IVORY}}}</style>`
    + `<path class="m" d="${monogramPath()}" fill="none" stroke-width="${MONO.stroke}" `
    + 'stroke-linecap="butt" stroke-linejoin="miter"/></svg>\n'
}

/** Square social avatar: monogram centred on a solid ground. */
export function socialProfileSvg(ground, colour, title = 'JUSTEKS') {
  const b = monogramBounds()
  const size = MONO.box
  // Scale the mark to ~58% of the square so it keeps clear space at avatar sizes.
  const target = size * 0.58
  const scale = round(target / Math.max(b.maxX - b.minX, b.maxY - b.minY))
  const w = (b.maxX - b.minX) * scale, hgt = (b.maxY - b.minY) * scale
  const dx = round((size - w) / 2 - b.minX * scale)
  const dy = round((size - hgt) / 2 - b.minY * scale)
  return open(`0 0 ${size} ${size}`, title)
    + `<rect width="${size}" height="${size}" fill="${ground}"/>`
    + `<g transform="translate(${dx} ${dy}) scale(${scale})">`
    + `<path d="${monogramPath()}" ${strokeAttrs(colour, MONO.stroke)}/></g></svg>\n`
}
