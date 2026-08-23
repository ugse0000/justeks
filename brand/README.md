# JUSTEKS Brand

Identity system for JUSTEKS — fabric house and global B2B textile supplier.

**Read [`JUSTEKS-brand-guidelines.md`](JUSTEKS-brand-guidelines.md) before using
any of this.** It covers the mark, clear space, minimum sizes, misuse, colour,
voice, and the certification rule.

---

## What is here

```
brand/
├─ JUSTEKS-brand-guidelines.md   The guidelines. Start here.
├─ JUSTEKS-brand-board.svg/.png  The identity on one page
├─ fonts/                        Playfair Display and Montserrat (SIL OFL)
├─ tools/                        Generators — all artwork derives from these
│  ├─ extract-glyphs.mjs         Pulls letterforms out of the fonts
│  ├─ glyphs.mjs                 Generated outlines, cap height = 100
│  ├─ geometry.mjs               The numbers. Every mark comes from this file.
│  ├─ svg.mjs                    SVG emitters
│  ├─ build-brand.mjs            Writes the marks, icons, manifest, social card
│  ├─ build-templates.mjs        Writes the corporate templates
│  └─ build-board.mjs            Writes the brand board
└─ templates/                    Editable business documents
```

Generated artwork lands outside this folder, next to what consumes it:

```
web/public/brand/                Marks, icons, social card
web/public/favicon.svg           Monogram favicon
web/public/site.webmanifest      Web app manifest
web/src/components/brand/        Logo React component + generated paths.ts
```

## Using the mark

**On the website** — use the component, not the files:

```tsx
import { Logo } from '../components/brand'

<Logo variant="wordmark" title="JUSTEKS" />   // meaningful: gets an accessible name
<Logo variant="monogram" />                   // decorative: hidden from screen readers
<Logo variant="lockup" tone="dark" />         // ivory letters, gold rule and tagline
<Logo variant="stack" />                      // the full signature
<Logo variant="icon" />                       // JT in its ring
```

The letters draw in `currentColor`, so a placement sets their colour with
ordinary CSS. The rule and the tagline take `--logo-rule`, which is gold by
default and can be set to `currentColor` for single-ink reproduction. Pass
`title` only when the logo carries meaning on its own; without it the mark is
hidden from assistive technology, which is correct when adjacent text already
says "JUSTEKS".

**Mind the minimum sizes.** The lockup carries the tagline at 15.5% of the cap
height, so it needs 320 px / 64 mm of width before that line is readable. Below
that use `wordmark`. The guidelines carry the full table.

**Everywhere else** — use the SVG files in `web/public/brand/`. Pick the file
that matches the ground:

| Ground | File |
| --- | --- |
| Pale | `justeks-lockup.svg` |
| Dark | `justeks-lockup-reverse.svg` |
| One ink, dark artwork | `justeks-lockup-black.svg` |
| One ink, light artwork | `justeks-lockup-white.svg` |

---

## Regenerating

```bash
node brand/tools/build-brand.mjs       # marks, icons, manifest, social card
node brand/tools/build-templates.mjs   # corporate templates
node brand/tools/build-board.mjs       # the brand board
```

`build-brand.mjs` writes both the standalone SVGs and
`web/src/components/brand/paths.ts`, so the mark on the site and the mark in the
asset folder are the same geometry by construction. Never hand-edit `paths.ts`
or the generated SVGs — change `geometry.mjs` and re-run.

The letterforms themselves come from the fonts in `brand/fonts/` and are
extracted once into `glyphs.mjs`:

```bash
npm i opentype.js --no-save
node brand/tools/extract-glyphs.mjs
```

Only run that when a font or the glyph set changes. It refuses any font whose
outlines are not Regular — Montserrat's variable file defaults to Thin, and
reading it gives hairline letterforms that look plausible on their own and
wrong beside the mark.

PNG output (icons, social card, board) needs `sharp`:

```bash
npm i sharp --no-save
```

Without it the scripts still write every vector file and report what they
skipped.

After regenerating, run the web test suite — it guards the output:

```bash
cd web && npm test
```

`web/scripts/brand-assets.test.ts` checks that no generated SVG carries a
gradient, filter, mask or embedded raster, that gold appears only as the
lockup's hairline and tagline, that the single-ink versions hold exactly one
colour, that nothing strays outside the three-colour palette, and that the Vite
starter favicon has not come back.

---

## Templates

Every template leaves real company details as bracketed placeholders —
`[LEGAL NAME]`, `[PHONE]`, `[ADDRESS]`, `[EMAIL]`. Fill them in per document.
**Do not commit a template with real or invented details substituted in**, and
do not add certification logos to any of them: a certification belongs only to
the specific article that holds it.

Print pieces are sized in millimetres and open at true size in a vector editor.
