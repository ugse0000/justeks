import type { IndustryContent } from '../schema'

const img = (slug: string, alt: string) => ({
  src: `/images/industries/${slug}.webp`,
  alt,
  width: 1280,
  height: 960,
})

export const industries: Record<string, IndustryContent> = {
  'fashion-apparel': {
    slug: 'fashion-apparel',
    name: 'Fashion & Apparel',
    seo: {
      title: 'Fabrics for Fashion & Apparel Production — JUSTEKS',
      description:
        'Wholesale fabric supply for fashion brands and apparel manufacturers: linen, cotton, viscose and fashion fabrics for seasonal collections.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Fashion & Apparel',
      lead: 'Seasonal collections where hand, drape and colour carry the design — and where the cloth has to survive a production calendar.',
    },
    overview: [
      'Fashion and apparel programmes are built around a look, but they are delivered against a calendar. The fabric decision sits at the intersection: it has to carry the design intent, arrive on time in the right quantity, and behave predictably through cutting, sewing and finishing at volume.',
      'For most collections the working set is linen, cotton, viscose and the fashion constructions — crepe, satin, jacquard — with knitted qualities carrying the casual pieces. The choice between them is usually settled by drape and weight rather than by fibre preference, which is why sampling matters before a range is committed.',
    ],
    criticalProperties: [
      { title: 'Drape', body: 'Decides silhouette more than any other property. Viscose falls, linen stands away, cotton holds a shape.' },
      { title: 'Colour consistency', body: 'Shade variation between lots is visible across a collection; batch approval protects the range.' },
      { title: 'Weight', body: 'Sets the season and the price point, and constrains which constructions are viable.' },
      { title: 'Repeatability', body: 'A carry-over piece needs the same cloth next season, not an equivalent.' },
    ],
    recommendedFabrics: ['linen', 'cotton', 'viscose', 'fashion', 'knitted'],
    image: img('fashion-apparel', 'Textile workers sorting finished cloth on a factory floor'),
  },

  shirting: {
    slug: 'shirting',
    name: 'Shirting',
    seo: {
      title: 'Shirting Fabrics for Shirt Manufacturers — JUSTEKS',
      description:
        'Fabric supply for professional shirt production: poplin, oxford, twill and linen shirting in everyday and premium yarn counts.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Shirting',
      lead: 'Where yarn count, finish and interlining decide whether a shirt reads as premium or ordinary.',
    },
    overview: [
      'Shirt production is unusually specification-driven. Two shirts that look identical on a hanger can be separated by a factor of three in cloth cost, and the difference is yarn count long before it is anything else. A manufacturer quoting on GSM alone is quoting on incomplete information.',
      'The second decision is the finish and its interaction with construction. Easy-care finishes reduce creasing but affect hand; stretch shirting changes fit but must have its shrinkage confirmed; and the collar interlining has to be matched to the cloth rather than chosen afterwards, because a mismatch shows up as bubbling after the first few washes.',
    ],
    criticalProperties: [
      { title: 'Yarn count', body: 'The single number that separates an everyday shirting from a premium one.' },
      { title: 'Construction', body: 'Poplin for formal smoothness, oxford for texture and durability, twill for softer drape.' },
      { title: 'Interlining match', body: 'Collar and cuff fusing must be selected with the cloth and tested after washing.' },
      { title: 'Pattern repeat', body: 'Stripes and checks increase consumption; the allowance belongs in the quotation.' },
    ],
    recommendedFabrics: ['shirting', 'cotton', 'linen'],
    image: img('shirting', 'Hands guiding grey fabric through a sewing machine'),
  },

  tailoring: {
    slug: 'tailoring',
    name: 'Tailoring',
    seo: {
      title: 'Tailoring Fabrics for Suit and Blazer Production — JUSTEKS',
      description:
        'Suiting, trouser and blazer cloths for tailoring manufacturers: wool suiting, polyester viscose, stretch suiting and gabardine.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Tailoring',
      lead: 'Cloth judged by what it does under heat, steam and an interlining — not by how it looks on a roll.',
    },
    overview: [
      'Tailoring production applies criteria no other category uses. The cloth must be mouldable with heat and moisture, hold a pressed edge, accept a fused or canvassed front, and recover from a day of wear. A fabric that photographs well and will not hold a press has no use in a tailoring factory.',
      'Wool remains the reference because it does all of this naturally, while polyester viscose is the volume answer for uniform and corporate programmes. Stretch suiting has become mainstream for modern fits but moves under the iron, so shrinkage and pressing behaviour are confirmed on a sewn sample rather than a flat swatch.',
    ],
    criticalProperties: [
      { title: 'Press retention', body: 'The ability to take and hold a pressed edge is the defining tailoring property.' },
      { title: 'Shrinkage', body: 'Confirmed before cutting; sponging is standard practice for a reason.' },
      { title: 'Interlining compatibility', body: 'A fusing mismatch shows first at the lapel roll.' },
      { title: 'Weight by component', body: 'Trouser cloth is often specified heavier than the matching jacket cloth.' },
    ],
    recommendedFabrics: ['tailoring', 'wool', 'polyester'],
    image: img('tailoring', 'A tailor at work behind a mannequin in a shop window'),
  },

  'casual-streetwear': {
    slug: 'casual-streetwear',
    name: 'Casual & Streetwear',
    seo: {
      title: 'Fabrics for Casual and Streetwear Production — JUSTEKS',
      description:
        'Jersey, french terry, fleece and denim qualities for T-shirt, sweatshirt and casual apparel production at volume.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Casual & Streetwear',
      lead: 'High-volume knitwear and denim where consistency across thousands of units is the whole game.',
    },
    overview: [
      'Casual and streetwear production lives on knitted fabrics and denim, and both are less forgiving in bulk than they appear. Knits change dimension readily, curl at raw edges and twist at the side seam if cut straight off the roll, so relaxation before cutting is not optional at volume.',
      'Weight carries the product positioning more directly here than in any other category: a 140 GSM single jersey and a 200 GSM one are different products at different price points, and a 320 GSM loopback is a different product again. Denim adds its own decision set around raw versus washed and the elastane content that modern fits depend on.',
    ],
    criticalProperties: [
      { title: 'Dimensional stability', body: 'Relax knits before cutting; twisted side seams are a handling fault, not a fabric fault.' },
      { title: 'GSM positioning', body: 'Weight is the clearest signal of quality tier in T-shirts and sweatshirts.' },
      { title: 'Recovery', body: 'Elastane content determines whether a fitted style holds shape through the day.' },
      { title: 'Print compatibility', body: 'Surface and fibre decide which print methods are viable.' },
    ],
    recommendedFabrics: ['knitted', 'denim', 'cotton'],
    image: img('casual-streetwear', 'Casual garments hanging on rails in a boutique interior'),
  },

  workwear: {
    slug: 'workwear',
    name: 'Workwear',
    seo: {
      title: 'Workwear Fabrics — Durable Cloth for Professional Garments — JUSTEKS',
      description:
        'Durable fabrics for workwear production: cotton drill and canvas, polyester cotton blends, and technical qualities built for industrial laundering.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Workwear',
      lead: 'Garments specified against a working day, an industrial wash and the shift after that.',
    },
    overview: [
      'Workwear is bought against durability rather than appearance. The relevant numbers are abrasion resistance, tear strength and how the cloth behaves after repeated commercial laundering — a fabric that performs perfectly in domestic washing can fail entirely at ninety degrees, five days a week.',
      'Construction carries most of the answer. Tightly woven cotton drill and canvas resist abrasion, polyester cotton blends add dimensional stability and faster drying, and reinforced weaves protect stress points. Where a repellent or coated finish is required, the distinction between a finish that wears off and a coating that is built in should be settled before quotation.',
    ],
    criticalProperties: [
      { title: 'Abrasion resistance', body: 'The first number specified; it drives fibre, yarn and construction together.' },
      { title: 'Laundering behaviour', body: 'Confirm wash cycle and temperature before selecting cloth for commercially laundered garments.' },
      { title: 'Tear strength', body: 'Protects against a small snag becoming a garment failure on site.' },
      { title: 'Finish type', body: 'A repellent finish wears; a coating is built in. They are not interchangeable.' },
    ],
    recommendedFabrics: ['performance-technical', 'cotton', 'polyester', 'denim'],
    image: img('workwear', 'Two workers in high-visibility jackets on site'),
  },

  uniforms: {
    slug: 'uniforms',
    name: 'Uniforms',
    seo: {
      title: 'Uniform Fabrics for Corporate and Institutional Programmes — JUSTEKS',
      description:
        'Fabric supply for corporate and institutional uniform programmes: polyester viscose suiting, shirting, and durable easy-care qualities.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Uniforms',
      lead: 'Where thousands of units must look identical — this season, and again in two years.',
    },
    overview: [
      'Uniform programmes are defined by repeatability. The same cloth, in the same shade, must be available across a rollout that can run for years, and every unit has to look like every other unit. That requirement rules out cloths with high lot-to-lot variation regardless of how well they perform otherwise.',
      'Polyester viscose suiting and easy-care shirting dominate for exactly this reason: they hold colour and dimension, resist creasing through a working day, and can be produced consistently at scale. Comfort still matters — a uniform is worn for eight hours — so breathability and stretch are usually balanced against durability rather than ignored.',
    ],
    criticalProperties: [
      { title: 'Shade consistency', body: 'Lot-to-lot variation is immediately visible across a uniformed team.' },
      { title: 'Availability over time', body: 'The programme needs the same article available for repeat orders, not a substitute.' },
      { title: 'Crease recovery', body: 'A uniform must still look presentable at the end of a shift.' },
      { title: 'Care requirements', body: 'Domestic or industrial laundering changes the specification entirely.' },
    ],
    recommendedFabrics: ['tailoring', 'shirting', 'polyester', 'performance-technical'],
    image: img('uniforms', 'A stack of folded uniform shirts in black and white'),
  },

  hospitality: {
    slug: 'hospitality',
    name: 'Hospitality',
    seo: {
      title: 'Hospitality Textiles for Hotels and Restaurants — JUSTEKS',
      description:
        'Fabric supply for hospitality operations: front-of-house uniforms, table and furnishing textiles built for commercial laundering and heavy use.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Hospitality',
      lead: 'Textiles that face the guest and the industrial laundry in the same week.',
    },
    overview: [
      'Hospitality textiles carry two conflicting requirements at once. Front of house they must look considered — this is part of how a venue presents itself — and back of house they must survive commercial laundering at temperatures and frequencies that domestic fabrics never encounter.',
      'That combination narrows the field quickly. Easy-care shirting and polyester viscose suiting handle uniforms; furnishing and upholstery qualities are specified with contract-level abrasion ratings rather than residential ones. Where a venue has flame-retardancy obligations, they are set by regulation and confirmed per article, not assumed for a category.',
    ],
    criticalProperties: [
      { title: 'Commercial laundering', body: 'Wash temperature and frequency drive the specification more than appearance does.' },
      { title: 'Contract abrasion rating', body: 'Furnishing fabrics need contract-level Martindale figures, not residential ones.' },
      { title: 'Stain behaviour', body: 'Colour and construction decide how a venue copes with everyday spillage.' },
      { title: 'Regulatory requirements', body: 'Flame retardancy is confirmed per article and per venue, never assumed.' },
    ],
    recommendedFabrics: ['shirting', 'tailoring', 'interior', 'performance-technical'],
    image: img('hospitality', 'A restaurant table laid with white linen, glassware and silverware'),
  },

  'interior-upholstery': {
    slug: 'interior-upholstery',
    name: 'Interior & Upholstery',
    seo: {
      title: 'Upholstery and Interior Fabrics for Contract Projects — JUSTEKS',
      description:
        'Upholstery, curtain and decorative fabrics for interior and contract projects, specified by abrasion rating, light behaviour and width.',
    },
    intro: {
      eyebrow: 'Industries',
      heading: 'Interior & Upholstery',
      lead: 'Specified for a room rather than a body: abrasion, light and drop length come before drape.',
    },
    overview: [
      'Interior work reverses the priorities of apparel. An upholstery fabric is specified first on abrasion resistance in Martindale cycles, and contract settings demand figures a residential piece never needs because the same seat is used by hundreds of people. Seam strength and dimensional stability follow from the same requirement.',
      'Curtain and drapery are specified against light instead — sheer, dim-out or blackout — and against drop length, since a curtain that relaxes after hanging lengthens visibly. Width matters more here than in apparel: interior cloths are often supplied wider precisely to avoid seams across a drop.',
    ],
    criticalProperties: [
      { title: 'Martindale rating', body: 'Contract and residential use are not comparable; state the required figure.' },
      { title: 'Light behaviour', body: 'Sheer, dim-out or blackout changes the construction entirely.' },
      { title: 'Width', body: 'Wider cloth reduces seams across a curtain drop and changes consumption.' },
      { title: 'Nap direction', body: 'Pile fabrics must be cut in one direction across the whole piece.' },
    ],
    recommendedFabrics: ['interior', 'fashion', 'cotton'],
    image: img('interior-upholstery', 'Close-up of a textured armchair covering in raking light'),
  },
}
