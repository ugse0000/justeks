/**
 * Generate the editable corporate templates in brand/templates/.
 *
 * Run from the repo root:  node brand/tools/build-templates.mjs
 *
 * Templates carry no invented company data. Everything a real document would
 * fill in is left as a bracketed placeholder - [LEGAL NAME], [PHONE] - so a
 * template can never be mistaken for a finished document. Print pieces are
 * sized in millimetres so they open at true size in a vector editor.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MONO, WORD, lockup, monogramBounds, monogramPath, wordmark, round } from './geometry.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const out = join(root, 'brand', 'templates')
const written = []

const INK = '#0A0A0A'
const IVORY = '#FAF8F4'
const GOLD = '#C8A96A'
const MUTED = '#6B6257'

const SANS = "'Instrument Sans', Helvetica, Arial, sans-serif"
const SERIF = "'Newsreader', Georgia, serif"
const MONOF = "'IBM Plex Mono', 'Courier New', monospace"

async function put(name, contents) {
  await mkdir(out, { recursive: true })
  await writeFile(join(out, name), contents)
  written.push(`brand/templates/${name}`)
}

const l = lockup()
const mb = monogramBounds()

/** Lockup scaled to a given width, placed by its top-left ink corner. */
function lockupAt(x, y, width, colour, ruleColour = GOLD) {
  const s = width / l.width
  return `<g transform="translate(${round(x)} ${round(y)}) scale(${round(s * 10000) / 10000}) translate(0 ${-l.top})">`
    + `<g fill="none" stroke="${colour}" stroke-width="${MONO.stroke}" stroke-linecap="butt" stroke-linejoin="miter">`
    + `<path d="${monogramPath()}" transform="${l.monoTransform}"/></g>`
    + `<rect x="${l.rule.x}" y="${l.rule.y}" width="${l.rule.w}" height="${l.rule.h}" fill="${ruleColour}"/>`
    + `<g fill="none" stroke="${colour}" stroke-width="${WORD.stroke}" stroke-linecap="butt" stroke-linejoin="miter" transform="${l.wordTransform}">`
    + wordmark().parts.join('') + '</g></g>'
}

/** Monogram scaled to a given height. */
function monogramAt(x, y, height, colour) {
  const s = height / (mb.maxY - mb.minY)
  return `<g transform="translate(${round(x)} ${round(y)}) scale(${round(s * 10000) / 10000}) translate(${-mb.minX} ${-mb.minY})">`
    + `<path d="${monogramPath()}" fill="none" stroke="${colour}" stroke-width="${MONO.stroke}"`
    + ' stroke-linecap="butt" stroke-linejoin="miter"/></g>'
}

const doc = (w, h, unit, title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}${unit}" height="${h}${unit}" `
  + `viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t"><title id="t">${title}</title>\n${body}\n</svg>\n`

const text = (x, y, s, opts = {}) => {
  const { size = 3, colour = INK, family = SANS, spacing = 0, anchor = 'start', weight = 400 } = opts
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" fill="${colour}"`
    + `${spacing ? ` letter-spacing="${spacing}"` : ''}${anchor !== 'start' ? ` text-anchor="${anchor}"` : ''}`
    + `${weight !== 400 ? ` font-weight="${weight}"` : ''}>${s}</text>`
}

/* ---- Business card, 85 x 55 mm ----------------------------------------- */

await put('business-card-front.svg', doc(85, 55, 'mm', 'JUSTEKS business card - front', `
  <rect width="85" height="55" fill="${INK}"/>
  ${lockupAt(12, 20, 40, IVORY)}
  <rect x="12" y="35" width="16" height="0.25" fill="${GOLD}"/>
  ${text(12, 41, 'BRITISH ORIGIN. GLOBAL REACH.', { size: 2.1, colour: IVORY, spacing: 0.42 })}`))

await put('business-card-back.svg', doc(85, 55, 'mm', 'JUSTEKS business card - back', `
  <rect width="85" height="55" fill="${IVORY}"/>
  ${monogramAt(12, 9, 9, INK)}
  ${text(12, 26, '[FULL NAME]', { size: 3.4, weight: 600 })}
  ${text(12, 30.5, '[JOB TITLE]', { size: 2.5, colour: MUTED })}
  <rect x="12" y="34" width="61" height="0.2" fill="${GOLD}"/>
  ${text(12, 39, '[EMAIL]', { size: 2.5, family: MONOF })}
  ${text(12, 43, '[PHONE]', { size: 2.5, family: MONOF })}
  ${text(12, 47, '[ADDRESS LINE]', { size: 2.5, family: MONOF, colour: MUTED })}
  ${text(73, 47, 'justeks.com', { size: 2.5, colour: MUTED, anchor: 'end' })}`))

/* ---- Letterhead, A4 ----------------------------------------------------- */

await put('letterhead-a4.svg', doc(210, 297, 'mm', 'JUSTEKS letterhead - A4', `
  <rect width="210" height="297" fill="${IVORY}"/>
  ${lockupAt(20, 18, 46, INK)}
  ${text(190, 24, 'Textile Expertise Since 2004.', { size: 2.6, colour: MUTED, anchor: 'end' })}
  <rect x="20" y="34" width="170" height="0.2" fill="${GOLD}"/>

  ${text(20, 52, '[RECIPIENT NAME]', { size: 3, weight: 600 })}
  ${text(20, 57, '[RECIPIENT COMPANY]', { size: 3, colour: MUTED })}
  ${text(20, 62, '[RECIPIENT ADDRESS]', { size: 3, colour: MUTED })}
  ${text(190, 52, '[DATE]', { size: 3, family: MONOF, colour: MUTED, anchor: 'end' })}

  ${text(20, 78, '[SUBJECT LINE]', { size: 3.6, family: SERIF })}
  ${text(20, 90, '[BODY TEXT - replace this block. Keep paragraphs short and', { size: 3, colour: MUTED })}
  ${text(20, 95.5, 'factual: origin, construction, weight, width, lead time.]', { size: 3, colour: MUTED })}

  <rect x="20" y="272" width="170" height="0.2" fill="#EDE6D9"/>
  ${text(20, 279, '[LEGAL NAME]', { size: 2.2, colour: MUTED })}
  ${text(20, 283, '[REGISTERED ADDRESS]', { size: 2.2, colour: MUTED })}
  ${text(190, 279, '[PHONE] &#183; [EMAIL]', { size: 2.2, colour: MUTED, family: MONOF, anchor: 'end' })}
  ${text(190, 283, 'justeks.com', { size: 2.2, colour: MUTED, anchor: 'end' })}`))

/* ---- Quotation cover, A4 ------------------------------------------------ */

await put('quotation-cover.svg', doc(210, 297, 'mm', 'JUSTEKS quotation cover - A4', `
  <rect width="210" height="297" fill="${INK}"/>
  ${lockupAt(24, 34, 54, IVORY)}
  <rect x="24" y="150" width="30" height="0.3" fill="${GOLD}"/>
  ${text(24, 166, 'QUOTATION', { size: 11, colour: IVORY, family: SERIF })}
  ${text(24, 178, '[CLIENT NAME]', { size: 4.4, colour: '#A79E92' })}

  ${text(24, 246, 'REFERENCE', { size: 2.2, colour: '#A79E92', spacing: 0.5 })}
  ${text(24, 252, '[QUOTE REF]', { size: 3.2, colour: IVORY, family: MONOF })}
  ${text(80, 246, 'DATE', { size: 2.2, colour: '#A79E92', spacing: 0.5 })}
  ${text(80, 252, '[DATE]', { size: 3.2, colour: IVORY, family: MONOF })}
  ${text(136, 246, 'VALID UNTIL', { size: 2.2, colour: '#A79E92', spacing: 0.5 })}
  ${text(136, 252, '[DATE]', { size: 3.2, colour: IVORY, family: MONOF })}

  ${text(24, 276, '[LEGAL NAME] &#183; [REGISTERED ADDRESS] &#183; [PHONE]', { size: 2.2, colour: '#6B6257' })}`))

/* ---- Woven label, 60 x 30 mm ------------------------------------------- */

await put('woven-label.svg', doc(60, 30, 'mm', 'JUSTEKS woven label', `
  <!-- Woven labels reproduce in one thread colour, so the lockup's rule is
       set in the same ink rather than gold. -->
  <rect width="60" height="30" fill="${IVORY}"/>
  <rect x="0" y="0" width="60" height="0.4" fill="${INK}"/>
  <rect x="0" y="29.6" width="60" height="0.4" fill="${INK}"/>
  ${lockupAt(14, 9, 32, INK, INK)}
  ${text(30, 22.5, '[COMPOSITION] &#183; [ORIGIN]', { size: 1.9, colour: MUTED, anchor: 'middle', family: MONOF })}`))

/* ---- Shipping document header, 210 x 45 mm ----------------------------- */

await put('shipping-document-header.svg', doc(210, 45, 'mm', 'JUSTEKS shipping document header', `
  <rect width="210" height="45" fill="${IVORY}"/>
  ${lockupAt(20, 12, 40, INK)}
  ${text(190, 15, '[DOCUMENT TYPE]', { size: 3.4, weight: 600, anchor: 'end' })}
  ${text(190, 20.5, '[DOCUMENT NO]', { size: 2.6, family: MONOF, colour: MUTED, anchor: 'end' })}
  <rect x="20" y="30" width="170" height="0.2" fill="${GOLD}"/>
  ${text(20, 36, 'CONSIGNEE', { size: 2, colour: MUTED, spacing: 0.4 })}
  ${text(20, 40.5, '[CONSIGNEE NAME AND ADDRESS]', { size: 2.6 })}
  ${text(140, 36, 'INCOTERM', { size: 2, colour: MUTED, spacing: 0.4 })}
  ${text(140, 40.5, '[INCOTERM] &#183; [PORT]', { size: 2.6, family: MONOF })}`))

/* ---- Social ------------------------------------------------------------- */

await put('social-profile.svg', doc(1000, 1000, '', 'JUSTEKS social profile', `
  <rect width="1000" height="1000" fill="${INK}"/>
  ${monogramAt(370, 285, 430, IVORY)}`))

await put('social-post.svg', doc(1080, 1080, '', 'JUSTEKS social post', `
  <rect width="1080" height="1080" fill="${INK}"/>
  ${lockupAt(96, 96, 300, IVORY)}
  <rect x="96" y="470" width="120" height="2" fill="${GOLD}"/>
  ${text(96, 560, '[HEADLINE - one line, factual]', { size: 62, colour: IVORY, family: SERIF })}
  ${text(96, 630, '[Supporting line: construction, weight, width or use.]', { size: 30, colour: '#A79E92' })}
  ${text(96, 984, 'BRITISH ORIGIN. GLOBAL REACH.', { size: 22, colour: IVORY, spacing: 4.4 })}`))

/* ---- Email signature ---------------------------------------------------- */

await put('email-signature.html', `<!doctype html>
<!--
  JUSTEKS email signature.

  Table-based and inline-styled on purpose: Outlook and most desktop clients
  strip <style> blocks and ignore flexbox. The mark is referenced from the live
  site so it stays current; some clients block remote images, which is why the
  text block below repeats every detail the mark carries.

  Replace every [BRACKETED] value. Do not add certification logos here -
  certifications belong only to the specific article that holds them.
-->
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Helvetica, Arial, sans-serif; color: #0A0A0A;">
  <tr>
    <td style="padding: 0 18px 0 0; vertical-align: top;">
      <img src="https://justeks.com/brand/justeks-monogram.svg"
           width="34" height="50" alt="JUSTEKS" style="display: block; border: 0;">
    </td>
    <td style="border-left: 1px solid #C8A96A; padding: 0 0 0 18px; vertical-align: top;">
      <div style="font-size: 15px; font-weight: 600; letter-spacing: 0.02em;">[FULL NAME]</div>
      <div style="font-size: 13px; color: #6B6257; padding-top: 2px;">[JOB TITLE] &middot; JUSTEKS</div>
      <div style="height: 10px; line-height: 10px;">&nbsp;</div>
      <div style="font-size: 12px; color: #6B6257;">
        <a href="mailto:[EMAIL]" style="color: #0A0A0A; text-decoration: none;">[EMAIL]</a>
        &nbsp;&middot;&nbsp;
        <a href="tel:[PHONE E164]" style="color: #0A0A0A; text-decoration: none;">[PHONE]</a>
      </div>
      <div style="font-size: 12px; color: #6B6257; padding-top: 2px;">
        <a href="https://justeks.com" style="color: #0A0A0A; text-decoration: none;">justeks.com</a>
      </div>
      <div style="height: 10px; line-height: 10px;">&nbsp;</div>
      <div style="font-size: 11px; color: #6B6257; letter-spacing: 0.08em;">
        BRITISH ORIGIN. GLOBAL REACH.
      </div>
    </td>
  </tr>
</table>
`)

console.log(written.map((w) => `  ${w}`).join('\n'))
console.log(`\n${written.length} templates written.`)
