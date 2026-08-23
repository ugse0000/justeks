/**
 * Pull the letterforms the identity needs out of the two brand fonts.
 *
 * The mark is set in Playfair Display and the tagline in Montserrat. Rather
 * than depend on those fonts being installed wherever the logo is rendered —
 * on a page, in a PDF, on a woven label — the outlines are extracted once and
 * committed as `glyphs.mjs`. The artwork is then plain vector geometry that
 * needs no font at all.
 *
 * Every glyph is normalised to cap height = 100 with the baseline at y = 0,
 * so the two typefaces can be composed against each other by a single number.
 *
 *   node brand/tools/extract-glyphs.mjs
 *
 * Needs `opentype.js` (npm i opentype.js --no-save).
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'

const HERE = fileURLToPath(new URL('.', import.meta.url))
const FONTS = `${HERE}../fonts`

/**
 * Glyphs each font has to supply, and the weight its outlines must be.
 *
 * The weight check is not ceremony. A variable font carries one set of
 * outlines — its default instance — and Montserrat's default is Thin, not
 * Regular. Reading the variable file gives hairline letterforms that look
 * plausible on their own and wrong beside the mark, with nothing to say they
 * are wrong. So the static Regular is used, and the assertion below refuses
 * any font whose outlines are not the weight the identity was drawn at.
 */
const WANTED = {
  playfair: { file: 'PlayfairDisplay[wght].ttf', chars: 'JUSTEKA', weight: 400 },
  montserrat: { file: 'Montserrat-Regular.ttf', chars: 'FABRIC,PERTD. ', weight: 400 },
}

const round = (n) => Math.round(n * 1000) / 1000

/** Two decimals is finer than any reproduction of the mark can resolve. */
const c = (n) => {
  const v = Math.round(n * 100) / 100
  return Number.isFinite(v) ? String(v) : 'NaN'
}

/**
 * Serialise an outline from its commands.
 *
 * opentype's own `toPathData` is not used: on several Montserrat glyphs it
 * emits NaN in place of a coordinate, which renders as a letter silently
 * missing from the tagline. Writing the commands out directly is both simpler
 * and verifiable — see the guard at the end of `extract`.
 */
function pathData(commands) {
  const out = []
  let at = null

  for (const cmd of commands) {
    // opentype repeats the current point as a lineTo at the head of every
    // contour and after each curve. The segments are zero length, so they
    // draw nothing and only cost bytes on every page the mark appears on.
    if (cmd.type === 'L' && at && c(cmd.x) === at[0] && c(cmd.y) === at[1]) continue
    if (cmd.type !== 'Z') at = [c(cmd.x), c(cmd.y)]

    switch (cmd.type) {
      case 'M': out.push(`M${c(cmd.x)} ${c(cmd.y)}`); break
      case 'L': out.push(`L${c(cmd.x)} ${c(cmd.y)}`); break
      case 'Q': out.push(`Q${c(cmd.x1)} ${c(cmd.y1)} ${c(cmd.x)} ${c(cmd.y)}`); break
      case 'C':
        out.push(`C${c(cmd.x1)} ${c(cmd.y1)} ${c(cmd.x2)} ${c(cmd.y2)} ${c(cmd.x)} ${c(cmd.y)}`)
        break
      case 'Z': out.push('Z'); break
      default: throw new Error(`unknown path command "${cmd.type}"`)
    }
  }
  return out.join('')
}

/**
 * Cap height in font units.
 *
 * OS/2 carries a declared value, but not every font fills it in honestly, so
 * fall back to measuring the flat top of an H — which is what cap height means.
 */
function capHeight(font) {
  const declared = font.tables.os2?.sCapHeight
  if (declared > 0) return declared
  return font.charToGlyph('H').getBoundingBox().y2
}

async function extract(name, { file, chars, weight }) {
  const buf = await readFile(`${FONTS}/${file}`)
  const font = opentype.parse(
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
  )

  const actual = font.tables.os2.usWeightClass
  if (actual !== weight) {
    throw new Error(
      `${file} carries weight ${actual}, not ${weight}. `
      + 'Its outlines are the wrong instance - use the static face.',
    )
  }

  // Scale so cap height lands on exactly 100 units.
  const size = (100 * font.unitsPerEm) / capHeight(font)
  const glyphs = {}

  for (const ch of new Set(chars)) {
    const glyph = font.charToGlyph(ch)
    if (!glyph || glyph.index === 0) throw new Error(`${name} has no glyph for "${ch}"`)

    // getPath emits SVG coordinates directly: y grows downward from the
    // baseline we place at 0, so descenders come out positive.
    const path = glyph.getPath(0, 0, size)
    const box = path.getBoundingBox()
    const empty = ch === ' '
    const d = empty ? '' : pathData(path.commands)

    if (d.includes('NaN')) throw new Error(`${name} "${ch}" produced a broken outline`)

    glyphs[ch] = {
      d,
      advance: round((glyph.advanceWidth * size) / font.unitsPerEm),
      // Ink extents, not the advance. Even letterspacing has to be measured
      // between what the eye sees — the J's tail reaches well left of its
      // origin, and spacing by advance alone leaves it looking detached.
      ink: empty ? [0, 0] : [round(box.x1), round(box.x2)],
      top: empty ? 0 : round(box.y1),
      bottom: empty ? 0 : round(box.y2),
    }
  }

  // opentype 2.x keys the name table by platform.
  const names = font.names.windows ?? font.names.macintosh ?? {}

  return {
    family: names.fontFamily?.en ?? name,
    version: names.version?.en ?? '',
    glyphs,
  }
}

const out = {}
for (const [name, spec] of Object.entries(WANTED)) {
  out[name] = await extract(name, spec)
  console.log(`${name}: ${out[name].family} - ${Object.keys(out[name].glyphs).length} glif`)
}

const body = Object.entries(out)
  .map(([name, { family, version, glyphs }]) => {
    const entries = Object.entries(glyphs)
      .map(([ch, g]) => `  ${JSON.stringify(ch)}: ${JSON.stringify(g)},`)
      .join('\n')
    return `/** ${family} — ${version} (SIL OFL 1.1). */\nexport const ${name.toUpperCase()} = {\n${entries}\n}`
  })
  .join('\n\n')

await writeFile(
  `${HERE}glyphs.mjs`,
  '/* Generated by brand/tools/extract-glyphs.mjs - do not edit by hand.\n'
    + '   Outlines from the fonts in brand/fonts/, normalised to cap height = 100\n'
    + '   with the baseline at y = 0. Licences sit beside the fonts. */\n\n'
    + `${body}\n`,
)

console.log('yazildi: brand/tools/glyphs.mjs')
