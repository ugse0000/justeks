import type { ArticleContent } from '../schema'

export const insights: Record<string, ArticleContent> = {
  'what-is-linen-fabric': {
    slug: 'what-is-linen-fabric',
    title: 'What Is Linen Fabric?',
    seo: {
      title: 'What Is Linen Fabric? A Buyer’s Guide — JUSTEKS',
      description:
        'Linen explained for production buyers: how flax fibre behaves, what weight ranges suit which garments, why it creases, and what to confirm before bulk.',
    },
    publishedAt: '2026-02-10',
    readingMinutes: 6,
    standfirst:
      'Linen is the oldest textile fibre in continuous use, and the one most often specified badly. Here is what actually decides whether a linen works for your production.',
    body: [
      { kind: 'p', text: 'Linen is spun from flax, and specifically from the bast fibres that run the length of the plant stem. Those fibres are long, hollow and irregular in thickness, and almost everything linen does well or badly follows from that. The hollow structure moves moisture quickly, which is why linen feels cool in heat. The length gives it strength — unusually, linen is stronger wet than dry, which is why it survives repeated washing. And the irregularity produces the slub that runs through the cloth, which the trade reads as character rather than as a fault.' },
      { kind: 'h2', text: 'Weight decides the application' },
      { kind: 'p', text: 'If you take one thing from this piece, take this: in linen, GSM is the decision. Two cloths that are both honestly described as 100% linen can be entirely different products, and the number that separates them is weight.' },
      { kind: 'spec', rows: [
        { label: 'Under 120 GSM', value: 'Semi-sheer. Blouses, scarves, layered dresses.' },
        { label: '140 – 180 GSM', value: 'Shirting and dresses. The most-specified range.' },
        { label: '180 – 220 GSM', value: 'Trousers, unstructured jackets, summer suiting.' },
        { label: '250 GSM and above', value: 'Canvas, upholstery, structured outerwear.' },
      ] },
      { kind: 'p', text: 'Anything below about 120 GSM will be semi-sheer, and if that is not the intention it will be discovered at fitting rather than at sampling. Above 250 GSM linen stops behaving like apparel cloth and becomes structural.' },
      { kind: 'h2', text: 'Blends are a production decision, not a compromise' },
      { kind: 'p', text: 'Pure linen is not automatically the better choice. Linen-cotton softens the hand, reduces creasing and is more forgiving on the sewing floor. Linen-viscose adds fluidity and drape, which suits dresses where pure linen would stand away from the body. Both blends behave more predictably in bulk than 100% linen, and for a high-volume programme that predictability has real commercial value.' },
      { kind: 'h2', text: 'Creasing is not a defect' },
      { kind: 'p', text: 'Linen creases because flax has very low elastic recovery. The fibre does not spring back the way wool does. No finish removes this entirely, and any supplier claiming a non-creasing 100% linen is describing either a blend or a heavy resin finish that will change the hand.' },
      { kind: 'p', text: 'What finishing does control is how the crease reads. A soft or enzyme wash relaxes the yarn and gives the cloth a lived-in surface from the start, so creasing looks intentional. A crisp finish holds body for tailored shapes but shows every fold sharply. Decide which you want before quotation, because it changes hand, shrinkage and how the garment ages.' },
      { kind: 'h2', text: 'What to confirm before bulk' },
      { kind: 'list', items: [
        'Shrinkage, and whether the cloth is pre-washed — linen moves more than cotton.',
        'The finish, stated explicitly, not assumed from the swatch.',
        'Slub distribution on a production sample, not only on a cutting.',
        'Seam construction for lighter weights, which fray readily.',
      ] },
      { kind: 'p', text: 'Linen rewards precise specification more than almost any other fibre, because so much of its behaviour is decided after the fibre stage. Tell your supplier the weight, the finish and the application, and the conversation gets useful immediately.' },
      { kind: 'h2', text: 'Washed linen is a different product' },
      { kind: 'p', text: 'It is worth separating washed linen out, because buyers often treat it as the same cloth with a softer hand. It is not. Enzyme or stone washing physically relaxes and partially breaks down the yarn, which softens the fabric, removes most of the residual shrinkage and gives it a lived-in surface immediately. It also reduces tensile strength slightly and makes the slub more pronounced. For a garment intended to look relaxed from the first wear it is the right choice, and it removes a great deal of the shrinkage risk from bulk production. For structured shapes that need body, it is the wrong one.' },
    ],
    relatedFabrics: ['linen', 'shirting'],
  },

  'why-fabric-gsm-matters': {
    slug: 'why-fabric-gsm-matters',
    title: 'Why Fabric GSM Matters',
    seo: {
      title: 'Why Fabric GSM Matters — And Where It Misleads — JUSTEKS',
      description:
        'GSM explained for production buyers: what grams per square metre tells you, what it hides, and why width and yarn count belong in the same sentence.',
    },
    publishedAt: '2026-03-04',
    readingMinutes: 5,
    standfirst:
      'GSM is the first number most buyers ask for, and the one most likely to be quoted without the two figures that make it meaningful.',
    body: [
      { kind: 'p', text: 'GSM is grams per square metre: the weight of one square metre of the cloth. It is the fastest way to place a fabric — it tells you roughly what season it belongs to, what it will cost to ship, and what kind of garment it can carry. That is why it appears on every specification sheet, and why buyers reach for it first.' },
      { kind: 'h2', text: 'What GSM genuinely tells you' },
      { kind: 'p', text: 'Weight correlates strongly with opacity, drape and durability within a single construction. A 120 GSM cotton poplin and a 180 GSM cotton poplin are recognisably the same kind of cloth at different weights, and the heavier one will be more opaque, more substantial in the hand and longer-wearing. Within a category, GSM is a reliable shorthand.' },
      { kind: 'h2', text: 'Where it misleads' },
      { kind: 'p', text: 'Across constructions, GSM stops being comparable. A 180 GSM linen and a 180 GSM single jersey weigh the same and behave nothing alike: one is a woven shirting, the other a knitted T-shirt cloth with stretch in both directions. Comparing them by weight alone tells you nothing useful.' },
      { kind: 'p', text: 'The more expensive mistake is treating GSM as a quality signal. Two cotton poplins at 120 GSM can differ by a factor of three in price, and the difference is yarn count. A fine two-fold yarn produces a smooth, lustrous, durable cloth; a coarse single yarn at the same weight produces something noticeably rougher. The scale cannot see the difference. Your customer will.' },
      { kind: 'h2', text: 'Width belongs in the same sentence' },
      { kind: 'p', text: 'GSM prices a square metre, but production consumes linear metres. A cloth quoted at 150 cm width yields materially more usable fabric per metre than one at 140 cm, and on a marker with pattern pieces that do not nest neatly, that difference can exceed the price gap between the two cloths.' },
      { kind: 'spec', rows: [
        { label: 'GSM', value: 'Weight per square metre — season, opacity, durability' },
        { label: 'Yarn count', value: 'Fineness of the yarn — hand, lustre, price tier' },
        { label: 'Width', value: 'Usable cloth per linear metre — real consumption' },
        { label: 'Construction', value: 'Woven or knitted, and in which structure' },
      ] },
      { kind: 'h2', text: 'How to quote properly' },
      { kind: 'p', text: 'Ask for all four together. "120 GSM cotton poplin" is an incomplete request; "120 GSM cotton poplin, 2/100s, 150 cm" is a specification a supplier can price and reproduce twelve months from now. The extra two figures cost nothing to state and remove most of the ambiguity that produces disputes later.' },
      { kind: 'list', items: [
        'Compare GSM only within the same construction.',
        'Ask for yarn count alongside weight in wovens.',
        'Calculate cost per garment, not cost per metre.',
        'For knits, remember weight is quoted relaxed — it moves.',
      ] },
      { kind: 'h2', text: 'A note on knits' },
      { kind: 'p', text: 'Knitted fabrics complicate this further, because a knit is quoted at its relaxed weight and a knit does not stay relaxed. Tension on the roll, the finishing route and how long the cloth has rested all shift the measured figure, and a jersey quoted at 180 GSM can measure noticeably differently once it has been allowed to sit. This is why relaxation before cutting is standard practice rather than a precaution: cutting a knit straight off the roll produces twisted side seams and garments that shrink unevenly, and no GSM figure on a specification sheet warns you about it.' },
    ],
    relatedFabrics: ['cotton', 'shirting', 'knitted'],
  },

  'poplin-vs-oxford': {
    slug: 'poplin-vs-oxford',
    title: 'Poplin vs Oxford: What Actually Differs',
    seo: {
      title: 'Poplin vs Oxford Shirting — What Actually Differs — JUSTEKS',
      description:
        'The real differences between poplin and oxford shirting: weave structure, weight, formality, durability and which shirt each belongs on.',
    },
    publishedAt: '2026-03-26',
    readingMinutes: 5,
    standfirst:
      'Both are cotton. Both are shirting. The difference is structural, and it decides which collar the cloth belongs under.',
    body: [
      { kind: 'p', text: 'Poplin and oxford are the two constructions shirt production runs on, and the choice between them is not a matter of taste. It follows from what the shirt is for.' },
      { kind: 'h2', text: 'Poplin: a tight plain weave' },
      { kind: 'p', text: 'Poplin is woven one over one, with a warp finer than the weft. That imbalance produces a fine crosswise rib you can feel with a fingernail but barely see, and a surface that is smooth, closely set and slightly lustrous. It presses to a sharp finish and sits flat under a jacket.' },
      { kind: 'p', text: 'The trade-off is that poplin shows everything. Creases read sharply, and any irregularity in the yarn is visible on a flat, even surface. That is why fine poplins are made from high-count two-fold yarns — the construction leaves nowhere to hide.' },
      { kind: 'h2', text: 'Oxford: a basket weave with visible texture' },
      { kind: 'p', text: 'Oxford groups yarns and weaves them two over two, or more. The result is a looser, more open structure with visible basket texture. Classic oxford also uses a coloured warp against a white weft, which is what gives a blue oxford its slightly heathered, softened colour rather than a flat blue.' },
      { kind: 'p', text: 'That structure makes oxford heavier, more durable and more forgiving. It creases less visibly, survives more washing, and reads as casual — which is precisely why the button-down collar was invented for it and why oxford under a formal suit looks wrong to anyone who notices such things.' },
      { kind: 'spec', rows: [
        { label: 'Poplin weave', value: 'Plain, one over one, fine warp' },
        { label: 'Poplin weight', value: 'Typically 100 – 130 GSM' },
        { label: 'Oxford weave', value: 'Basket, two over two or more' },
        { label: 'Oxford weight', value: 'Typically 130 – 170 GSM' },
      ] },
      { kind: 'h2', text: 'Which to specify' },
      { kind: 'p', text: 'Formal and business shirting: poplin, in as high a yarn count as the price point allows. Casual and everyday shirting, and anything with a button-down collar: oxford. Royal oxford sits between the two — an oxford structure in finer yarns with more lustre, formal enough for business but with more surface interest than poplin.' },
      { kind: 'h2', text: 'Production notes' },
      { kind: 'list', items: [
        'Poplin needs a well-matched interlining; the smooth surface shows bubbling immediately.',
        'Oxford’s open structure frays more at raw edges — check seam finishing.',
        'A coloured-warp oxford will show shade variation between lots more visibly than a piece-dyed poplin.',
        'Both benefit from a sewn-and-washed sample before bulk; a flat swatch will not reveal how the collar behaves.',
      ] },
      { kind: 'p', text: 'If a customer cannot decide, the practical test is the collar. A shirt built around a spread or cutaway collar wants poplin. A shirt built around a button-down wants oxford. The cloth and the collar were developed together, and garments that ignore that pairing tend to look slightly wrong without the wearer knowing why.' },
      { kind: 'h2', text: 'What about pinpoint and royal oxford?' },
      { kind: 'p', text: 'Pinpoint oxford uses the same basket structure in finer yarns with a tighter set, landing between a standard oxford and a poplin: smoother than oxford, more textured than poplin, and durable enough for daily business wear. Royal oxford goes further again, using fine yarns in a more complex basket variation that produces a subtle lustre and visible surface interest. Both are useful when a customer wants a shirt that reads formal without the flatness of poplin, and both cost more than either parent construction because the yarns are finer and the setting is denser.' },
    ],
    relatedFabrics: ['shirting', 'cotton'],
  },

  'how-to-choose-shirting-fabric': {
    slug: 'how-to-choose-shirting-fabric',
    title: 'How to Choose Shirting Fabric',
    seo: {
      title: 'How to Choose Shirting Fabric for Production — JUSTEKS',
      description:
        'A production buyer’s sequence for specifying shirting: yarn count, construction, weight, finish, interlining and what to test before bulk.',
    },
    publishedAt: '2026-04-18',
    readingMinutes: 6,
    standfirst:
      'Most shirting problems are decided at specification, not on the sewing floor. Here is the order the decisions should be made in.',
    body: [
      { kind: 'p', text: 'Shirting is the most specification-driven category in apparel. The cloth sits against skin, takes a collar, holds a press and gets washed more often than anything else in the wardrobe. Get the specification right and production is straightforward; get it wrong and the fault surfaces after the customer has washed the shirt three times.' },
      { kind: 'h2', text: '1. Start with yarn count, not weight' },
      { kind: 'p', text: 'Yarn count is the number that sets the price tier and most of the perceived quality. A 2/100s two-fold yarn gives a fine, smooth, lustrous cloth that ages well. A 40s single gives a robust everyday shirt at a fraction of the cost. Both can be 120 GSM poplin. Specify the count first and the rest of the conversation gets easier.' },
      { kind: 'h2', text: '2. Then construction' },
      { kind: 'p', text: 'Poplin for formal smoothness. Oxford for texture and durability. Twill for softer drape and better crease resistance through a working day. Linen or linen-cotton for warm-weather production, accepting that it will crease. The construction follows from how the shirt will be worn, not from what looks best on a roll.' },
      { kind: 'h2', text: '3. Weight, against season and market' },
      { kind: 'spec', rows: [
        { label: '95 – 110 GSM', value: 'Lightweight, warm climates, may need care with opacity' },
        { label: '110 – 130 GSM', value: 'The mainstream business shirting range' },
        { label: '130 – 160 GSM', value: 'Casual shirting, oxford, brushed winter cloths' },
      ] },
      { kind: 'p', text: 'Check opacity at the lower end, particularly in white. A white shirt that is transparent under office lighting will be returned regardless of how good the cloth is otherwise.' },
      { kind: 'h2', text: '4. Finish and stretch' },
      { kind: 'p', text: 'Easy-care and non-iron finishes reduce creasing but can affect hand and tensile strength, and they need to be declared because they change care instructions. Stretch shirting with two percent elastane transforms fit and comfort but changes shrinkage and pressing behaviour — confirm both on a washed sample rather than assuming.' },
      { kind: 'h2', text: '5. Interlining, chosen with the cloth' },
      { kind: 'p', text: 'This is the step most often skipped, and it produces the most complaints. Collar and cuff interlining must be selected alongside the cloth and tested through washing. A fine poplin fused to the wrong interlining will bubble at the collar after a few washes, and no amount of good cloth compensates for it.' },
      { kind: 'h2', text: 'Before bulk' },
      { kind: 'list', items: [
        'Sew a full sample shirt, wash it five times, then look at the collar.',
        'Confirm shrinkage in both directions, not just length.',
        'For stripes and checks, agree the pattern-matching allowance in the quotation.',
        'Approve colour from a physical swatch under more than one light source.',
      ] },
      { kind: 'p', text: 'None of this is exotic. It is simply the sequence that stops predictable problems from becoming expensive ones, and it costs a few days at sampling rather than a production run.' },
      { kind: 'h2', text: 'Costing the decision properly' },
      { kind: 'p', text: 'One last point, because it is where shirting programmes most often go wrong commercially. The cloth price per metre is not the cost of the shirt. Width drives consumption, pattern matching on stripes and checks adds to it, and a cloth that needs careful handling adds minutes per garment on the sewing floor. A slightly more expensive cloth at 150 cm width, plain rather than striped, can produce a cheaper finished shirt than a cheaper cloth at 140 cm with a repeat to match. Cost the garment, not the metre, and the comparison between two quotations becomes meaningful.' },
    ],
    relatedFabrics: ['shirting', 'cotton', 'linen'],
  },

  'what-is-twill-fabric': {
    slug: 'what-is-twill-fabric',
    title: 'What Is Twill Fabric?',
    seo: {
      title: 'What Is Twill Fabric? Weave, Weight and Applications — JUSTEKS',
      description:
        'Twill explained: how the diagonal weave is built, why it drapes and wears differently from plain weave, and where denim, gabardine and drill fit.',
    },
    publishedAt: '2026-05-12',
    readingMinutes: 5,
    standfirst:
      'Twill is the weave behind denim, gabardine, drill and most trousers ever made. The diagonal line is not decoration — it is the reason the cloth behaves as it does.',
    body: [
      { kind: 'p', text: 'In a plain weave each weft yarn passes over one warp and under the next. In a twill, the weft passes over two or more warps and then under one or more, and the crossing point shifts by one yarn on each successive row. That shift is what produces the diagonal line running across the face of the cloth.' },
      { kind: 'h2', text: 'Why the structure matters' },
      { kind: 'p', text: 'Fewer interlacing points mean the yarns can pack more densely, which makes twill heavier and more durable at a given yarn count. The same looseness of interlacing lets the yarns move against each other, so twill drapes more softly than a plain weave of the same weight and resists creasing better — the fabric can absorb a fold rather than holding it.' },
      { kind: 'p', text: 'The diagonal also breaks up the surface visually, which is why twill hides soil and wear better than a flat plain weave. That combination — durable, soft-draping, forgiving of dirt — is exactly why twill dominates trousers, workwear and uniforms.' },
      { kind: 'h2', text: 'The twill family' },
      { kind: 'spec', rows: [
        { label: 'Denim', value: 'Warp-faced twill, indigo-dyed warp, undyed weft' },
        { label: 'Gabardine', value: 'Steep, tightly woven twill — trousers and outerwear' },
        { label: 'Drill', value: 'Heavy cotton twill — workwear and uniforms' },
        { label: 'Chino', value: 'Lighter cotton twill, usually piece-dyed' },
        { label: 'Serge', value: 'Even-sided twill, common in tailoring and uniforms' },
      ] },
      { kind: 'p', text: 'Twill angle varies. A steep twill runs closer to vertical and is tighter and firmer; a reclining twill runs closer to horizontal and is softer. Gabardine is steep by definition, which is why it holds a crease so well in trousers.' },
      { kind: 'h2', text: 'Direction is a production issue' },
      { kind: 'p', text: 'The diagonal has a direction — right-hand or left-hand — and it is visible. All panels of a garment must be cut with the twill running the same way, or the difference will show at the seams under raking light. This is a routine cause of second-quality garments in factories that treat twill as if it were plain weave.' },
      { kind: 'h2', text: 'What to confirm' },
      { kind: 'list', items: [
        'Twill direction, and that the cutting room knows to respect it.',
        'Whether the cloth is warp-faced, which affects how it fades and abrades.',
        'Crocking on dark shades — dense twills carry a lot of dye.',
        'Skew after washing; twill can torque if the finishing was rushed.',
      ] },
      { kind: 'p', text: 'Twill is forgiving in wear and unforgiving in the cutting room. Handle the direction properly and it is one of the most reliable constructions in production.' },
      { kind: 'h2', text: 'Warp-faced and weft-faced' },
      { kind: 'p', text: 'Twills are described as warp-faced or weft-faced depending on which yarn dominates the surface. Denim is the clearest example of a warp-faced twill: the indigo-dyed warp sits on the face and the undyed weft on the back, which is why the inside of a pair of jeans is pale. That structure also decides how the cloth ages, because the yarn on the surface is the one that abrades. In a warp-faced twill it is the dyed warp that wears away, exposing the lighter core beneath, and that is the entire mechanism behind denim fading along the seams and stress points.' },
    ],
    relatedFabrics: ['cotton', 'denim', 'tailoring'],
  },

  'reading-fabric-composition': {
    slug: 'reading-fabric-composition',
    title: 'How to Read a Fabric Composition',
    seo: {
      title: 'How to Read a Fabric Composition — JUSTEKS',
      description:
        'What a composition line actually tells you: fibre percentages, what small elastane content changes, and the properties composition does not describe.',
    },
    publishedAt: '2026-06-09',
    readingMinutes: 5,
    standfirst:
      'A composition line is the most quoted and least interrogated part of a specification. It tells you a great deal — and leaves out most of what decides how a cloth behaves.',
    body: [
      { kind: 'p', text: 'Composition states which fibres a cloth contains and in what proportion by weight, listed in descending order. "65% Polyester 33% Viscose 2% Elastane" is a complete and precise statement about content. What it is not is a description of the fabric.' },
      { kind: 'h2', text: 'What the percentages actually change' },
      { kind: 'p', text: 'Read the dominant fibre first: it sets breathability, moisture behaviour, care requirements and much of the cost. A cloth that is majority cotton behaves like a cotton cloth even with a substantial synthetic content.' },
      { kind: 'p', text: 'Then read the minority fibres, which are usually there for a specific reason. Polyester in a wool blend improves crease recovery and reduces cost. Viscose in a linen blend adds drape. Cotton in a linen blend softens the hand. None of these are dilutions; they are engineering decisions.' },
      { kind: 'h2', text: 'Elastane deserves its own paragraph' },
      { kind: 'p', text: 'Two to three percent elastane transforms a fabric out of proportion to its share. It adds comfort stretch and recovery, changes how a garment fits through a day, and simultaneously changes shrinkage, pressing behaviour and the sewing setup. A cloth with elastane needs a different needle, a different stitch and different heat settings.' },
      { kind: 'p', text: 'It also has consequences the buyer inherits later: elastane degrades with high heat and with chlorine, so a garment with elastane cannot carry the same care instructions as one without. If a composition line shows elastane and the care label does not reflect it, someone has not read the specification.' },
      { kind: 'h2', text: 'What composition does not tell you' },
      { kind: 'spec', rows: [
        { label: 'Not stated', value: 'Yarn count — the biggest driver of hand and price' },
        { label: 'Not stated', value: 'Construction — woven or knitted, in which structure' },
        { label: 'Not stated', value: 'GSM — weight, and therefore application' },
        { label: 'Not stated', value: 'Finish — washing, brushing, coating, mercerising' },
      ] },
      { kind: 'p', text: 'This is the practical point. Two cloths can share an identical composition line and be entirely different products: 100% cotton describes both a 90 GSM voile and a 400 GSM canvas. Composition is one line of a specification, not the specification.' },
      { kind: 'h2', text: 'Reading a line in practice' },
      { kind: 'list', items: [
        'Dominant fibre: sets the character and the care.',
        'Minority fibres: ask what each is there to do.',
        'Elastane: assume it changes shrinkage, pressing and care.',
        'Then ask for count, construction, GSM, width and finish.',
      ] },
      { kind: 'p', text: 'A supplier who answers all five without hesitation is describing a real article. One who can only quote the composition is describing a category.' },
      { kind: 'h2', text: 'Where composition becomes a legal statement' },
      { kind: 'p', text: 'Fibre content is regulated in most markets, and the percentages on a label carry legal weight rather than being a marketing description. Tolerances are narrow, the declaration has to reflect what is actually in the cloth, and a garment mislabelled at the fibre stage is a problem that follows the brand rather than the supplier. For a buyer this has a practical consequence: take the composition from the supplier’s technical documentation for that specific article, not from a category page or a previous season’s spec, and confirm it has not changed when an article is reordered.' },
    ],
    relatedFabrics: ['cotton', 'viscose', 'wool'],
  },
}
