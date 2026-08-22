import type { FabricCategoryContent } from '../schema'

const img = (slug: string, alt: string) => ({
  src: `/images/fabrics/${slug}.webp`,
  alt,
  width: 1280,
  height: 960,
})

export const fabrics: Record<string, FabricCategoryContent> = {
  linen: {
    slug: 'linen',
    name: 'Linen',
    seo: {
      title: 'Linen Fabrics — Wholesale UK-Origin Linen',
      description:
        'UK-origin linen fabrics for shirting, dresses, tailoring and premium apparel. 100% linen, linen cotton and linen viscose blends from lightweight to canvas weights.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Linen',
      lead: 'A flax fibre with a character that improves with every wash — dry to the touch, strong when wet, and unmatched for warm-weather apparel.',
    },
    overview: [
      'Linen is spun from the bast fibres of the flax plant. Those fibres are long, hollow and irregular in thickness, which is why linen behaves unlike any other cellulosic: it wicks moisture quickly, releases it just as quickly, and carries a natural slub that reads as texture rather than as a fault. The same irregularity is why linen should be assessed by hand and drape, not by a photograph.',
      'Weight is the decision that drives everything else. Below 120 GSM linen becomes semi-sheer and belongs in blouses, scarves and layered dresses. Between 140 and 200 GSM sits the working range for shirting, dresses and unstructured jackets. Above 250 GSM linen turns architectural — canvas, upholstery and structured outerwear. Blending changes the equation again: cotton softens the hand and reduces creasing, viscose adds fluidity and drape, and both make the cloth more forgiving on a production line.',
      'Creasing is not a defect in linen; it is the fibre doing what flax does. Finishing decides how much of it reaches the customer. A soft or enzyme wash relaxes the yarn and gives the fabric its lived-in hand immediately, while a crisp finish holds body for tailored shapes. Specify the finish at quotation stage — it changes hand, shrinkage and the way the garment ages.',
    ],
    types: [
      '100% Linen', 'Linen Cotton', 'Linen Viscose', 'Washed Linen',
      'Lightweight Linen', 'Medium Weight Linen', 'Heavy Linen',
      'Linen Canvas', 'Linen Shirting', 'Linen Suiting', 'Linen Blends',
    ],
    typicalGsm: '110 – 320 GSM',
    typicalWidth: '140 – 150 cm',
    construction: 'Woven — plain weave, twill and canvas constructions',
    handFeel: 'Dry and textured, softening with wear and washing',
    applications: [
      'Shirting', 'Dresses', 'Trousers', 'Unstructured jackets',
      'Summer suiting', 'Premium apparel', 'Interior and upholstery in heavy weights',
    ],
    productionNotes: [
      'Allow for higher shrinkage than cotton unless the cloth is pre-washed; confirm the finish before bulk cutting.',
      'Slub distribution varies between lots — approve a production sample, not only a swatch, for large runs.',
      'Lower-GSM linens fray readily; overlocking or French seams protect the garment through washing.',
    ],
    relatedCollections: ['linen', 'natural', 'shirting'],
    image: img('linen', 'Beige linen surface showing the slub character of flax yarn'),
  },

  cotton: {
    slug: 'cotton',
    name: 'Cotton',
    seo: {
      title: 'Cotton Fabrics — Wholesale Poplin, Twill, Canvas and Jersey',
      description:
        'UK-origin cotton fabrics in poplin, twill, canvas, voile, satin, drill and jersey constructions. Organic and stretch cotton options for apparel production.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Cotton',
      lead: 'The most versatile fibre in apparel production — where the construction, not the fibre, decides what the cloth becomes.',
    },
    overview: [
      'Cotton is a short-staple cellulosic fibre, and almost everything that matters commercially is decided after the fibre stage: staple length, yarn count, weave and finish. A long-staple cotton spun into a fine two-fold yarn produces a smooth, lustrous poplin; the same fibre in a coarse single yarn woven as a drill produces workwear cloth. Asking for cotton tells a supplier almost nothing — asking for 120 GSM poplin in a 2/100s yarn tells them everything.',
      'Construction is the practical language of cotton. Poplin is a tight plain weave with a fine crosswise rib, crisp and shirt-facing. Twill runs a diagonal line that softens drape and hides soil, which is why it dominates trousers and workwear. Canvas and drill are heavier and denser again. Voile is open and semi-sheer; satin floats warp over weft for surface lustre; jersey is knitted rather than woven and brings stretch and recovery.',
      'Finish then sets the final character. Mercerising raises lustre and dye uptake, brushing lifts a soft nap for winter shirting, and peaching gives a suede-like surface. Elastane at two to three percent transforms fit for trousers and shirting but changes shrinkage and pressing behaviour, so it should be confirmed rather than assumed.',
    ],
    types: [
      '100% Cotton', 'Cotton Poplin', 'Cotton Twill', 'Cotton Canvas',
      'Cotton Voile', 'Cotton Satin', 'Cotton Jersey', 'Cotton Drill',
      'Cotton Gabardine', 'Stretch Cotton', 'Brushed Cotton',
      'Organic Cotton', 'Cotton Blends',
    ],
    typicalGsm: '80 – 400 GSM',
    typicalWidth: '145 – 160 cm',
    construction: 'Woven and knitted — poplin, twill, canvas, drill, satin, jersey',
    handFeel: 'Soft to crisp depending on yarn count and finish',
    applications: [
      'Shirting', 'T-shirts', 'Dresses', 'Trousers', 'Jackets',
      'Workwear', 'Uniforms', 'Interior textiles',
    ],
    productionNotes: [
      'Yarn count matters more than fibre origin for hand and durability — specify it alongside GSM.',
      'Reactive-dyed deep shades need washing trials; crocking is the usual failure point on dark twills.',
      'Stretch cotton relaxes after pressing — build the allowance into the pattern, not the fabric spec.',
    ],
    relatedCollections: ['essential', 'natural', 'shirting'],
    image: img('cotton', 'Close-up of a white cotton canvas with a fine, even weave'),
  },

  viscose: {
    slug: 'viscose',
    name: 'Viscose',
    seo: {
      title: 'Viscose Fabrics — Wholesale Crepe, Twill, Satin and Printed Viscose',
      description:
        'UK-origin viscose fabrics with fluid drape for dresses, blouses and linings. Crepe, twill, satin, printed and jersey viscose, plus viscose linen blends.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Viscose',
      lead: 'A regenerated cellulosic chosen for one reason above all others: drape that no natural fibre delivers at the same price.',
    },
    overview: [
      'Viscose is made by regenerating cellulose into filament, which gives a level of control that a natural staple fibre cannot offer. The resulting yarn is smooth, highly absorbent and takes dye with exceptional depth — printed viscose holds colour and definition that the same design would lose on cotton. Where linen stands away from the body and cotton holds a shape, viscose falls. That fluidity is the entire reason it appears in dresses, blouses, wide-leg trousers and linings.',
      'The trade-off is wet strength. Viscose fibres lose a significant share of their tensile strength when saturated, so garments need care instructions that match reality and production needs to handle wet processing carefully. Blending is the common answer: viscose with linen keeps the drape while adding dry handle and structure, and viscose with elastane restores recovery for fitted shapes.',
      'Construction shifts the character sharply. Crepe adds a fine grain that hides seam puckering and drapes beautifully in dresses. Twill weights up the cloth for trousers. Satin brings surface lustre for eveningwear and linings. Jersey adds stretch for relaxed silhouettes.',
    ],
    types: [
      '100% Viscose', 'Viscose Crepe', 'Viscose Twill', 'Viscose Satin',
      'Printed Viscose', 'Viscose Jersey', 'Viscose Linen', 'Viscose Blends',
    ],
    typicalGsm: '90 – 220 GSM',
    typicalWidth: '140 – 150 cm',
    construction: 'Woven and knitted — crepe, twill, satin and jersey',
    handFeel: 'Cool, smooth and fluid',
    applications: [
      'Dresses', 'Blouses', 'Wide-leg trousers', 'Linings',
      'Printed collections', 'Resort and occasion wear',
    ],
    productionNotes: [
      'Viscose weakens when wet — avoid aggressive wet processing and state care requirements clearly.',
      'Relaxation shrinkage is common; rest the cloth before cutting rather than cutting straight off the roll.',
      'Fine crepes are prone to seam slippage; confirm seam construction on the production sample.',
    ],
    relatedCollections: ['essential', 'natural'],
    image: img('viscose', 'Soft folds of a smooth, lustrous fabric catching the light'),
  },

  polyester: {
    slug: 'polyester',
    name: 'Polyester',
    seo: {
      title: 'Polyester Fabrics — Wholesale Woven, Crepe, Satin and Jersey',
      description:
        'Polyester fabrics for volume apparel production: woven, crepe, satin, twill, chiffon and jersey constructions, including stretch and recycled polyester options.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Polyester',
      lead: 'The workhorse of volume production — dimensionally stable, colour-fast and engineered rather than grown.',
    },
    overview: [
      'Polyester is a synthetic filament, and its commercial advantage is consistency. Because the fibre is extruded rather than harvested, lot-to-lot variation is minimal, colour is disperse-dyed to a high fastness, and the cloth holds its dimensions through wash and wear. For programmes that repeat season after season, or uniforms that must look identical across thousands of units, that predictability is worth more than any hand-feel argument.',
      'Modern polyester is no longer defined by the harsh handle of older generations. Microfilament yarns, texturising and peached finishes produce fabrics with real softness and a matte surface, and polyester crepes now compete directly with viscose for drape. Where it still differs is moisture: polyester does not absorb water, which makes it fast-drying and dimensionally stable but less breathable next to skin unless the construction is engineered for wicking.',
      'Recycled polyester, spun from post-consumer PET, is now a standard option rather than a specialist one. It performs comparably to virgin polyester in most constructions. Where a recycled content claim is to be made commercially, it should be backed by the relevant certification on that specific article rather than asserted generally.',
    ],
    types: [
      'Polyester Woven', 'Polyester Crepe', 'Polyester Satin',
      'Polyester Twill', 'Polyester Chiffon', 'Polyester Jersey',
      'Stretch Polyester', 'Recycled Polyester',
    ],
    typicalGsm: '60 – 300 GSM',
    typicalWidth: '145 – 160 cm',
    construction: 'Woven and knitted — crepe, satin, twill, chiffon, jersey',
    handFeel: 'Smooth to matte, depending on texturising and finish',
    applications: [
      'Volume apparel', 'Blouses and dresses', 'Uniforms', 'Workwear',
      'Linings', 'Sportswear', 'Outerwear shells',
    ],
    productionNotes: [
      'Disperse dyes can sublimate under heat — confirm pressing and transfer-printing temperatures before bulk.',
      'Static build-up is common in dry conditions; an antistatic finish is worth specifying for linings.',
      'Recycled content should only be claimed where certification exists for that article.',
    ],
    relatedCollections: ['essential', 'performance', 'workwear'],
    image: img('polyester', 'Close-up of a synthetic fabric showing its woven pattern'),
  },

  wool: {
    slug: 'wool',
    name: 'Wool',
    seo: {
      title: 'Wool Fabrics — Wholesale Suiting, Coating and Wool Blends',
      description:
        'UK-origin wool fabrics for tailoring and outerwear: suiting wool, coating wool, lightweight and brushed wool, wool blends and wool cashmere blends.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Wool',
      lead: 'The fibre tailoring was built around — it holds a pressed shape, recovers from creasing, and insulates while still breathing.',
    },
    overview: [
      'Wool is a protein fibre with a natural crimp and a scaled surface. The crimp traps air, which is why wool insulates at relatively low weights, and the elasticity of the fibre is why a wool garment recovers from creasing overnight while a linen one does not. For tailoring the decisive property is different again: wool can be moulded with heat and moisture and will hold that shape, which is what allows a jacket to follow a body rather than hang from it.',
      'Micron count and yarn structure separate one wool from another far more than any label. Finer microns give a softer hand and a cleaner surface, suited to premium suiting; coarser microns give durability and a drier handle appropriate to coating and country cloth. Worsted yarns, combed to lie parallel, produce the smooth, crisp surface expected in tailoring; woollen yarns, carded and lofty, produce the fuller, warmer cloths used in coats and jackets.',
      'Weight maps directly to season and application. Around 200 to 250 GSM sits in the year-round suiting range. Lighter cloths in the 180 GSM region belong in warm-weather tailoring but demand careful construction. Coating weights from 350 GSM upward carry the body required for outerwear. Blending with cashmere raises softness and price; blending with polyester improves crease recovery and reduces cost.',
    ],
    types: [
      '100% Wool', 'Wool Blends', 'Suiting Wool', 'Coating Wool',
      'Lightweight Wool', 'Brushed Wool', 'Wool Cashmere Blends',
    ],
    typicalGsm: '180 – 600 GSM',
    typicalWidth: '150 – 160 cm',
    construction: 'Woven — worsted and woollen, plain, twill and flannel',
    handFeel: 'Dry and resilient in worsteds, full and soft in woollens',
    applications: [
      'Suits', 'Blazers', 'Trousers', 'Coats',
      'Structured jackets', 'Uniforms', 'Premium tailoring',
    ],
    productionNotes: [
      'Wool must be relaxed and correctly steam-pressed; under-pressed seams are the most common tailoring fault.',
      'Confirm shrinkage and finishing behaviour before cutting — sponging is standard practice for a reason.',
      'Moth and storage protection matters for stock held over a season.',
    ],
    relatedCollections: ['tailoring', 'natural'],
    image: img('wool', 'Grey wool cloth photographed close enough to show its milled surface'),
  },

  denim: {
    slug: 'denim',
    name: 'Denim',
    seo: {
      title: 'Denim Fabrics — Wholesale Raw, Washed and Stretch Denim',
      description:
        'Denim fabrics from lightweight shirting weights to heavy 14 oz constructions: cotton denim, stretch denim, raw and washed denim for apparel production.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Denim',
      lead: 'A warp-faced cotton twill with indigo on the surface and white beneath — the reason denim ages the way nothing else does.',
    },
    overview: [
      'Denim is defined by its construction, not its colour. It is a warp-faced twill in which the warp yarns are dyed — traditionally with indigo — and the weft is left undyed. Indigo is a ring dye: it sits on the outside of the yarn rather than penetrating it. As the surface abrades through wear, the white core is progressively exposed, which is precisely why denim fades along seams, pockets and knees in a way that reads as character rather than damage.',
      'Weight is quoted in ounces per square yard and drives the entire application. Lightweight denim from 6 to 8 oz behaves like shirting and suits shirts and dresses. The 10 to 12 oz range is the mainstream for jeans, balancing structure against comfort. Above 13 oz denim becomes rigid and demanding to sew, and is chosen deliberately for raw denim programmes where the wearer breaks the garment in slowly.',
      'Elastane changed the category commercially. Two to three percent transforms fit and recovery for modern silhouettes, but it also changes the wash and the way the garment relaxes through the day. Raw versus washed is a separate decision again: raw denim ships stiff and untreated for the customer to break in, while washed denim arrives with its shrinkage and much of its character already resolved.',
    ],
    types: [
      'Cotton Denim', 'Stretch Denim', 'Raw Denim', 'Washed Denim',
      'Lightweight Denim', 'Medium Weight Denim', 'Heavy Denim',
    ],
    typicalGsm: '200 – 480 GSM (roughly 6 – 14 oz)',
    typicalWidth: '150 – 160 cm',
    construction: 'Woven — warp-faced twill with ring-dyed warp',
    handFeel: 'Rigid and dry when raw, softening progressively with wash',
    applications: [
      'Jeans', 'Jackets', 'Skirts', 'Shirts in lightweight constructions',
      'Workwear', 'Casual and streetwear',
    ],
    productionNotes: [
      'Raw denim shrinks substantially on first wash — pattern allowances must reflect the intended wash.',
      'Indigo crocking transfers onto light garments and upholstery; state this in care information.',
      'Heavy denim needs the right needle and thread; skipped stitches on 14 oz are a machine setup issue, not a fabric fault.',
    ],
    relatedCollections: ['essential', 'workwear'],
    image: img('denim', 'Dark indigo denim showing the diagonal twill line of the weave'),
  },

  knitted: {
    slug: 'knitted',
    name: 'Knitted Fabrics',
    seo: {
      title: 'Knitted Fabrics — Wholesale Jersey, Interlock, Rib and French Terry',
      description:
        'Knitted fabrics for casual and streetwear production: single jersey, interlock, rib, punto roma, french terry, sweatshirt, fleece, lycra jersey and pique.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Knitted Fabrics',
      lead: 'Loops rather than crossings — which is why knits stretch, recover and behave nothing like a woven on the cutting table.',
    },
    overview: [
      'A knitted fabric is built from interlocking loops rather than interlaced warp and weft. That single structural difference produces everything a buyer associates with jersey: stretch in both directions without elastane, recovery after extension, and a soft, close hand. It also produces the problems — knits curl at the edge, run when a loop is broken, and change dimension far more readily than a woven of the same weight.',
      'The knit structure decides the garment. Single jersey is the lightest and most common, with a smooth face and looped back, and it is what most T-shirts are made from; it also curls at the edges and needs a stable neckline. Interlock is double-knitted, so it is heavier, more stable and does not curl, making it the better choice for structured tops and childrenswear. Rib gives strong lateral stretch and is used for cuffs, collars and close-fitting bodies. Punto roma is firmer again and holds a shape close to a woven. French terry, sweatshirt and fleece add looped or brushed backs for weight and warmth. Pique carries a fine textured surface and is the classic polo cloth.',
      'Weight in knits is quoted in GSM but interpreted differently from wovens: a 140 GSM single jersey is a light summer T-shirt, 180 to 200 GSM is a substantial everyday tee, and 280 to 320 GSM covers sweatshirt and hoodie territory. Elastane at three to five percent is common in fitted styles for recovery, and its presence changes both the sewing setup and the wash.',
    ],
    types: [
      'Single Jersey', 'Interlock', 'Rib', 'Punto Roma', 'French Terry',
      'Sweatshirt', 'Fleece', 'Lycra Jersey', 'Pique',
    ],
    typicalGsm: '130 – 380 GSM',
    typicalWidth: '160 – 180 cm, also supplied tubular',
    construction: 'Knitted — single and double jersey structures',
    handFeel: 'Soft and elastic, brushed or looped in heavier weights',
    applications: [
      'T-shirts', 'Sweatshirts and hoodies', 'Polo shirts', 'Dresses',
      'Loungewear', 'Casual and streetwear', 'Uniform knitwear',
    ],
    productionNotes: [
      'Relax knitted fabric before cutting; cutting straight off the roll is the main cause of twisted side seams.',
      'Single jersey curls at raw edges — necklines and hems need ribbing, binding or coverstitch.',
      'Use ballpoint needles and stretch stitching; a straight lockstitch on jersey will snap in wear.',
    ],
    relatedCollections: ['essential', 'performance'],
    image: img('knitted', 'Knitted fabric in a natural tone showing the loop structure of the stitch'),
  },

  shirting: {
    slug: 'shirting',
    name: 'Shirting',
    seo: {
      title: 'Shirting Fabrics — Wholesale Poplin, Oxford and Twill Shirting',
      description:
        'Shirting fabrics for professional shirt production: poplin, oxford, twill, linen and cotton shirting, stretch and printed shirting in premium qualities.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Shirting',
      lead: 'A category defined by fineness and finish rather than by fibre — where yarn count is the number that decides the price.',
    },
    overview: [
      'Shirting is not a fibre but a specification: lightweight, closely constructed cloth engineered to sit against skin, take a collar and hold a press. The number that matters most is yarn count. A 2/100s two-fold yarn produces a fine, smooth, lustrous cloth; a 40s single produces a robust, everyday shirt at a fraction of the cost. Two customers asking for cotton poplin at 120 GSM can be asking for fabrics separated by a factor of three in price, and the yarn count is what separates them.',
      'Construction sets the character on top of that. Poplin is a tight plain weave with a fine crosswise rib: crisp, smooth and formal. Oxford uses a basket weave, often with a coloured warp against a white weft, giving a visible texture and a more casual, durable cloth — the reason oxford belongs on a button-down and poplin on a dress shirt. Twill drapes more softly and resists creasing, which suits business shirts worn all day. Linen and linen-cotton shirting bring texture and warm-weather performance.',
      'For volume shirt production the finish is where quality is won or lost. Easy-care and non-iron finishes reduce creasing but can affect hand and tensile strength; a stretch shirting with two percent elastane changes fit and comfort but must be confirmed for shrinkage. Collar and cuff interlining should be selected alongside the cloth, not after it — a fine poplin with the wrong fusing will bubble after washing.',
    ],
    types: [
      'Poplin', 'Oxford', 'Twill', 'Linen Shirting', 'Cotton Shirting',
      'Stretch Shirting', 'Printed Shirting', 'Premium Shirting',
    ],
    typicalGsm: '95 – 160 GSM',
    typicalWidth: '145 – 150 cm',
    construction: 'Woven — plain, basket and twill weaves in fine yarns',
    handFeel: 'Crisp and smooth in poplin, textured in oxford, soft in twill',
    applications: [
      'Formal shirts', 'Business shirts', 'Casual shirts',
      'Blouses', 'Uniform shirting', 'Hospitality shirting',
    ],
    productionNotes: [
      'Specify yarn count with GSM — GSM alone does not describe a shirting.',
      'Match interlining to the cloth and test after washing; bubbling collars are a fusing mismatch.',
      'Pattern-matched stripes and checks increase consumption; confirm the allowance in the quotation.',
    ],
    relatedCollections: ['shirting', 'essential'],
    image: img('shirting', 'Pale blue striped shirting cloth folded to show the weave'),
  },

  tailoring: {
    slug: 'tailoring',
    name: 'Tailoring',
    seo: {
      title: 'Tailoring Fabrics — Wholesale Suiting, Trouser and Blazer Cloth',
      description:
        'Tailoring fabrics for suits, blazers and trousers: wool suiting, polyester viscose, stretch suiting, gabardine and premium suiting cloths.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Tailoring',
      lead: 'Cloth chosen for what it does under an iron — the ability to be shaped with heat and steam, and to hold that shape.',
    },
    overview: [
      'Tailoring cloth is judged by different criteria from any other category. Appearance matters, but performance under construction matters more: the fabric has to be moulded with heat and moisture, take a fused or canvassed front, hold a pressed edge, and recover from a day of wear without collapsing. A cloth that photographs beautifully and will not hold a press is useless to a tailoring factory.',
      'Wool remains the reference point because it does all of this naturally. Polyester-viscose blends are the volume alternative: they hold shape well, resist creasing, cost substantially less and are the standard for uniform and corporate programmes, though they breathe less. Stretch suiting with a small elastane content has become mainstream for modern fits; it is comfortable and forgiving, but it moves under the iron and needs its shrinkage confirmed before bulk.',
      'Weight sets the season and the silhouette. Around 200 to 250 GSM is the year-round suiting range. Lighter cloths near 180 GSM suit warm-weather tailoring but expose any weakness in construction. Trouser cloths run heavier than the matching jacket cloth in many programmes because the wear is harder. Gabardine, a tightly woven steep twill, is the classic trouser and outerwear construction for exactly that reason.',
    ],
    types: [
      'Wool Suiting', 'Polyester Viscose', 'Stretch Suiting',
      'Premium Suiting', 'Trouser Fabrics', 'Gabardine', 'Blazer Fabrics',
    ],
    typicalGsm: '180 – 380 GSM',
    typicalWidth: '150 – 160 cm',
    construction: 'Woven — worsted twills, plain weaves and gabardine',
    handFeel: 'Dry, resilient, firm enough to hold a pressed edge',
    applications: [
      'Suits', 'Blazers', 'Trousers', 'Skirts',
      'Corporate uniforms', 'Formal and occasion wear',
    ],
    productionNotes: [
      'Confirm shrinkage and pressing behaviour on a sewn sample, not on a flat swatch.',
      'Match interlining and fusing to the cloth; a mismatch shows at the lapel roll first.',
      'Stretch suiting relaxes under heat — allow recovery time between pressing and measurement.',
    ],
    relatedCollections: ['tailoring', 'performance'],
    image: img('tailoring', 'Dark suiting cloth with a fine pinstripe running through the weave'),
  },

  fashion: {
    slug: 'fashion',
    name: 'Fashion Fabrics',
    seo: {
      title: 'Fashion Fabrics — Wholesale Crepe, Satin, Chiffon, Velvet and Jacquard',
      description:
        'Fashion fabrics for collections and occasion wear: crepe, satin, chiffon, organza, taffeta, velvet, jacquard, lace and printed fabrics.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Fashion Fabrics',
      lead: 'Where surface, movement and light matter more than durability — the cloths a collection is built around.',
    },
    overview: [
      'Fashion fabrics are selected for how they behave in movement and how they take light. Crepe carries a fine grain that absorbs light, hides seam puckering and drapes with weight. Satin does the opposite: long floats on the surface reflect light and give lustre, at the cost of showing every needle mark and snag. Chiffon and organza are both sheer, but chiffon is soft and floating while organza is crisp and holds volume — the difference between a fluid overlay and a sculpted one.',
      'Structured and textured cloths bring another set of decisions. Taffeta is crisp and rustles, holding architectural shapes. Velvet carries a dense cut pile that has direction, so panels must be cut with the nap running the same way or the colour will read differently across a seam. Jacquard builds the pattern into the weave itself rather than printing it on, giving depth that survives washing. Lace is an open structure that needs consideration of what sits beneath it.',
      'These cloths are less forgiving in production than any other category. Sheers slip under the presser foot, satins mark permanently under a hot iron, velvet crushes under its own weight in storage, and fine yarns snag on unfinished machine surfaces. Sampling is not optional here — it is where the cost of a collection is controlled.',
    ],
    types: [
      'Crepe', 'Satin', 'Chiffon', 'Organza', 'Taffeta',
      'Velvet', 'Jacquard', 'Lace', 'Printed Fabrics',
    ],
    typicalGsm: '40 – 300 GSM',
    typicalWidth: '140 – 150 cm',
    construction: 'Woven — crepe, satin, plain sheers, pile and jacquard',
    handFeel: 'From floating and sheer to dense and lustrous',
    applications: [
      'Dresses', 'Occasion and eveningwear', 'Blouses',
      'Overlays and linings', 'Collection pieces', 'Bridal',
    ],
    productionNotes: [
      'Cut velvet and other pile fabrics with the nap in one direction across all panels.',
      'Sheers need fine needles, sharp cutting and tissue or stabiliser under the seam.',
      'Test pressing on a cutting of every satin — iron marks on satin are permanent.',
    ],
    relatedCollections: ['essential', 'natural'],
    image: img('fashion', 'Fabric samples hung side by side in a range of tones'),
  },

  'performance-technical': {
    slug: 'performance-technical',
    name: 'Performance & Technical',
    seo: {
      title: 'Performance and Technical Fabrics — Water-Repellent, Workwear, Outdoor',
      description:
        'Performance and technical fabrics: water-repellent, wind-resistant, coated, stretch performance and durable fabrics for workwear and outdoor production.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Performance & Technical',
      lead: 'Fabrics specified by what they must withstand — measured properties rather than appearance.',
    },
    overview: [
      'Technical fabrics are bought against requirements, not against a mood board. The buyer starts from the condition the garment must survive — rain, wind, abrasion, repeated industrial laundering, a full working shift of movement — and the cloth is specified backwards from there. That is why this category is described in measurable terms: hydrostatic head, abrasion cycles, tear strength, stretch and recovery percentages.',
      'Water resistance illustrates the distinction that matters most commercially. A durable water-repellent finish causes water to bead on the surface and is suitable for showers, but it is a finish and it wears off with washing and abrasion. A coating or membrane is a barrier built into the fabric and performs at a different level entirely, with a corresponding difference in cost and breathability. Confusing the two produces returns, so it should be settled at quotation stage.',
      'Workwear and outdoor constructions add durability requirements. Tightly woven cotton-polyester blends and high-tenacity yarns resist abrasion and tearing; reinforced weaves protect stress points. Where garments are industrially laundered — hospitality and healthcare in particular — the cloth must survive repeated high-temperature washing without losing colour, shape or finish, which rules out many fabrics that perform perfectly well domestically.',
    ],
    types: [
      'Water-Repellent', 'Wind-Resistant', 'Workwear', 'Outdoor',
      'Stretch Performance', 'Coated Fabrics', 'Durable Fabrics',
    ],
    typicalGsm: '120 – 400 GSM',
    typicalWidth: '145 – 160 cm',
    construction: 'Woven and knitted, with finishes, coatings and membranes',
    handFeel: 'Smooth to technical, depending on coating and construction',
    applications: [
      'Workwear', 'Outdoor apparel', 'Uniforms', 'Outerwear shells',
      'Hospitality garments', 'Sportswear',
    ],
    productionNotes: [
      'State whether a repellent finish or a coating is required — they are not interchangeable.',
      'Coated fabrics may need taped seams; a coated shell with open seams is not waterproof.',
      'For industrially laundered garments, confirm wash cycle and temperature before selecting cloth.',
    ],
    relatedCollections: ['performance', 'workwear'],
    image: img('performance-technical', 'Water droplets sitting on the surface of a treated technical fabric'),
  },

  interior: {
    slug: 'interior',
    name: 'Interior',
    seo: {
      title: 'Interior Fabrics — Wholesale Upholstery, Curtain and Decorative Fabrics',
      description:
        'Interior textiles for contract and residential projects: upholstery, curtain fabrics, decorative fabrics, canvas, velvet and jacquard.',
    },
    intro: {
      eyebrow: 'Fabrics',
      heading: 'Interior',
      lead: 'Cloth specified for a room rather than a body — where abrasion resistance and light behaviour outrank drape.',
    },
    overview: [
      'Interior textiles are assessed against a different set of properties from apparel. An upholstery fabric is judged first on abrasion resistance, measured in Martindale rub cycles: domestic use is satisfied by comparatively modest figures, while contract and hospitality settings demand substantially higher ratings because the same seat is used by hundreds of people. Weight, stability and seam strength follow from the same requirement.',
      'Curtain and drapery fabrics are specified against light instead. The decision is between sheer, dim-out and blackout behaviour, and it changes the construction entirely. Drop length drives another practical concern: a curtain that relaxes after hanging will lengthen visibly, so dimensional stability and correct hemming allowance matter more than they would in apparel. Width also differs — many interior cloths are supplied wider than apparel fabrics precisely to reduce seams across a drop.',
      'Decorative constructions carry the visual weight. Jacquard builds pattern into the structure with a depth that printing cannot match and survives long service. Velvet brings light-responsive pile but has direction and shows pressure marks. Canvas gives robust plain-woven durability for heavy-use pieces. For contract projects, flame-retardancy requirements are set by regulation and by the venue, and must be confirmed for the specific article rather than assumed for the category.',
    ],
    types: [
      'Upholstery', 'Curtain Fabrics', 'Decorative Fabrics',
      'Canvas', 'Velvet', 'Jacquard',
    ],
    typicalGsm: '200 – 600 GSM',
    typicalWidth: '140 – 300 cm depending on construction',
    construction: 'Woven — plain, jacquard, pile and canvas constructions',
    handFeel: 'Firm and substantial, from smooth weave to dense pile',
    applications: [
      'Upholstery', 'Curtains and drapery', 'Cushions and soft furnishing',
      'Hospitality interiors', 'Contract projects', 'Wall panels',
    ],
    productionNotes: [
      'Specify the required Martindale rating for upholstery; contract use and domestic use are not comparable.',
      'Cut pile fabrics in one nap direction across the whole piece to avoid shade variation.',
      'Flame-retardancy requirements must be confirmed per article and per venue regulation.',
    ],
    relatedCollections: ['interior', 'natural'],
    image: img('interior', 'Woven brown furnishing fabric with a pronounced textured surface'),
  },
}
