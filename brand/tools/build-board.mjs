/**
 * Render the brand board — the one-page summary of the identity.
 *
 * Every mark and every specimen letter on it is drawn from geometry.mjs and
 * the extracted outlines, so the board cannot show something the system does
 * not actually produce, and it needs no fonts installed to render.
 *
 *   node brand/tools/build-board.mjs
 */
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { icon, lockup, monogram, round, stack } from './geometry.mjs'
import { GOLD, INK, IVORY, fills } from './svg.mjs'
import { MONTSERRAT, PLAYFAIR } from './glyphs.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

const W = 1536
const H = 1024
const TOP = 430
const STRIP = 762

const l = lockup()
const s = stack()
const m = monogram()
const ic = icon()

/** Place a mark by its ink box: centred on cx/cy, at a given ink height. */
function place(mark, body, cx, cy, h) {
  const sc = round(h / (mark.bottom - mark.top))
  const x = round(cx - (mark.width * sc) / 2)
  const y = round(cy - ((mark.top + mark.bottom) / 2) * sc)
  return `<g transform="translate(${x} ${y}) scale(${sc})">${body}</g>`
}

const lockupBody = (mark, colour, rule) =>
  fills(mark.word.parts, colour)
  + `<rect x="${mark.rule.x}" y="${mark.rule.y}" width="${mark.rule.w}" `
  + `height="${mark.rule.h}" fill="${rule}"/>`
  + `<g transform="${mark.tagTransform}">${fills(mark.tag.parts, rule)}</g>`

const stackBody = (colour, rule) =>
  lockupBody(s, colour, rule)
  + `<g transform="${s.monoTransform}">${fills(s.mono.parts, colour)}</g>`

const ringMark = (x, y, scale) =>
  `<g transform="translate(${x} ${y}) scale(${scale})">`
  + `<circle cx="${ic.ring.cx}" cy="${ic.ring.cy}" r="${ic.ring.r}" fill="none" `
  + `stroke="${GOLD}" stroke-width="${ic.ring.width}"/>`
  + `<g transform="${ic.transform}">${fills(ic.parts, GOLD)}</g></g>`

/** A single letter from the real outlines, as a type specimen. */
function specimen(glyph, cx, baseline, capPx, colour) {
  const sc = round(capPx / 100)
  const w = (glyph.ink[1] - glyph.ink[0]) * sc
  return `<g transform="translate(${round(cx - w / 2 - glyph.ink[0] * sc)} ${baseline}) `
    + `scale(${sc})"><path d="${glyph.d}" fill="${colour}"/></g>`
}

const caption = (x, y, text, size, colour, spacing) =>
  `<text x="${x}" y="${y}" text-anchor="middle" fill="${colour}" `
  + `font-family="Helvetica, Arial, sans-serif" font-size="${size}" `
  + `letter-spacing="${spacing}">${text}</text>`

const heading = (x, text) => caption(x, 806, text, 15, IVORY, 3.4)

const swatch = (x, hex) =>
  `<rect x="${x}" y="832" width="84" height="84" fill="${hex}" stroke="#333333"/>`
  + caption(x + 42, 944, hex, 13, '#9A9A9A', 1.3)

const divider = (x) => `<rect x="${x}" y="${STRIP + 18}" width="1" height="196" fill="#2B2B2B"/>`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${TOP}" fill="${IVORY}"/>
<rect y="${TOP}" width="${W}" height="${H - TOP}" fill="${INK}"/>

${place(l, lockupBody(l, INK, GOLD), W / 2, TOP / 2, 196)}

${place(s, stackBody(GOLD, GOLD), 330, 590, 246)}
${place(m, fills(m.parts, GOLD), 790, 590, 168)}
${ringMark(1090, 480, 2.2)}

<rect x="120" y="${STRIP}" width="${W - 240}" height="1" fill="#2B2B2B"/>
${heading(300, 'COLOR PALETTE')}
${heading(700, 'TYPOGRAPHY')}
${heading(1060, 'MONOGRAM')}
${heading(1330, 'ICON / MARK')}
${divider(500)}${divider(900)}${divider(1210)}

${swatch(174, INK)}${swatch(274, IVORY)}${swatch(374, GOLD)}

${specimen(PLAYFAIR.A, 640, 902, 66, IVORY)}
${caption(640, 940, 'PLAYFAIR DISPLAY', 12, '#9A9A9A', 1.5)}
${caption(640, 958, '(LOGO)', 11, '#6E6E6E', 1.2)}
${specimen(MONTSERRAT.A, 790, 902, 62, IVORY)}
${caption(790, 940, 'MONTSERRAT', 12, '#9A9A9A', 1.5)}
${caption(790, 958, '(TAGLINE)', 11, '#6E6E6E', 1.2)}

${place(m, fills(m.parts, GOLD), 1060, 884, 84)}
${ringMark(1288, 838, 0.86)}
</svg>`

await writeFile(join(root, 'brand', 'JUSTEKS-brand-board.svg'), svg)

let sharp
try { sharp = (await import('sharp')).default } catch { /* optional */ }
if (sharp) {
  await writeFile(join(root, 'brand', 'JUSTEKS-brand-board.png'),
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer())
  console.log('brand/JUSTEKS-brand-board.svg + .png')
} else {
  console.log('brand/JUSTEKS-brand-board.svg (sharp yok, PNG atlandi)')
}

console.log(`lockup ${l.width} x ${round(l.bottom - l.top)} | genislik/cap ${round(l.width / 100)}`)
console.log(`stack  ${s.width} x ${round(s.bottom - s.top)}`)
console.log(`mono   ${m.width} x ${round(m.bottom - m.top)}`)
