import type { CollectionContent } from '../schema'

const img = (slug: string, alt: string) => ({
  src: `/images/collections/${slug}.svg`,
  alt,
  width: 1600,
  height: 1067,
})

export const collections: Record<string, CollectionContent> = {
  linen: {
    slug: 'linen',
    name: 'The Linen Collection',
    seo: {
      title: 'The Linen Collection — JUSTEKS',
      description:
        'A curated linen collection spanning lightweight shirting weights to linen canvas, including linen cotton and linen viscose blends.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Linen Collection',
      lead: 'Flax in its full working range — from semi-sheer blouse weights to structural canvas.',
    },
    overview: [
      'The Linen Collection brings together the linen qualities we return to season after season. It is organised by weight rather than by look, because weight is what decides whether a linen belongs in a blouse, a shirt, a jacket or a piece of upholstery.',
      'Alongside pure linen, the collection carries the blends that make linen practical at scale: linen cotton for a softer hand and reduced creasing, and linen viscose where drape matters more than crispness.',
    ],
    includes: ['Linen', 'Shirting'],
    relatedCategories: ['linen', 'shirting'],
    image: img('linen', 'Layered linen swatches in natural, ivory and stone tones'),
  },

  shirting: {
    slug: 'shirting',
    name: 'The Shirting Collection',
    seo: {
      title: 'The Shirting Collection — JUSTEKS',
      description:
        'Poplin, oxford, twill and linen shirting qualities selected for professional shirt production, from everyday to premium yarn counts.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Shirting Collection',
      lead: 'Cloth engineered for collars, cuffs and a full day of wear.',
    },
    overview: [
      'The Shirting Collection is built around the constructions that shirt makers actually specify: poplin for formal smoothness, oxford for texture and durability, twill for softer drape and crease resistance, and linen shirting for warm-weather production.',
      'Qualities are grouped by yarn count as well as by weave, because that is where the difference between an everyday shirt and a premium one is decided long before the cloth reaches the cutting table.',
    ],
    includes: ['Shirting', 'Cotton', 'Linen'],
    relatedCategories: ['shirting', 'cotton', 'linen'],
    image: img('shirting', 'Folded shirting fabrics showing poplin, oxford and twill surfaces side by side'),
  },

  tailoring: {
    slug: 'tailoring',
    name: 'The Tailoring Collection',
    seo: {
      title: 'The Tailoring Collection — JUSTEKS',
      description:
        'Suiting, trouser and blazer cloths selected for how they behave under construction: wool suiting, polyester viscose and stretch suiting.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Tailoring Collection',
      lead: 'Cloth chosen for what it does under an iron, not only for how it looks on a roll.',
    },
    overview: [
      'The Tailoring Collection gathers the cloths that hold a pressed shape: wool suiting across the year-round weight range, polyester viscose for volume and uniform programmes, and stretch suiting for modern fits.',
      'Trouser and blazer qualities are listed separately because in most programmes they are not the same cloth — trousers take harder wear and are usually specified heavier than the jacket they sit beneath.',
    ],
    includes: ['Tailoring', 'Wool'],
    relatedCategories: ['tailoring', 'wool'],
    image: img('tailoring', 'Wool suiting cloths stacked to show worsted twill and flannel surfaces'),
  },

  natural: {
    slug: 'natural',
    name: 'The Natural Collection',
    seo: {
      title: 'The Natural Collection — JUSTEKS',
      description:
        'Natural and cellulosic fibres across linen, cotton, wool and viscose, selected for hand, breathability and how they age.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Natural Collection',
      lead: 'Fibres grown rather than extruded — chosen for hand, breathability and the way they age.',
    },
    overview: [
      'The Natural Collection runs across categories rather than within one. It brings together linen, cotton, wool and cellulosic viscose qualities where the fibre itself is the reason for the selection.',
      'It is the collection to start from when a brief leads with material story and comfort next to skin rather than with technical performance requirements.',
    ],
    includes: ['Linen', 'Cotton', 'Wool', 'Viscose'],
    relatedCategories: ['linen', 'cotton', 'wool', 'viscose'],
    image: img('natural', 'Undyed natural fibre fabrics in flax, cotton and wool arranged together'),
  },

  essential: {
    slug: 'essential',
    name: 'The Essential Collection',
    seo: {
      title: 'The Essential Collection — JUSTEKS',
      description:
        'Core repeat qualities in cotton, viscose, polyester and jersey — the fabrics that carry a production programme season after season.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Essential Collection',
      lead: 'The repeat qualities a production programme is built on.',
    },
    overview: [
      'The Essential Collection is the working core: cotton poplin and twill, viscose crepe, polyester constructions and jersey qualities that repeat reliably and are held or produced to order at volume.',
      'These are the fabrics chosen for consistency rather than novelty — where a buyer needs the same cloth, in the same shade, twelve months from now.',
    ],
    includes: ['Cotton', 'Viscose', 'Polyester', 'Knitted'],
    relatedCategories: ['cotton', 'viscose', 'polyester', 'knitted'],
    image: img('essential', 'Neutral core fabrics folded in a stack showing plain woven and jersey surfaces'),
  },

  performance: {
    slug: 'performance',
    name: 'The Performance Collection',
    seo: {
      title: 'The Performance Collection — JUSTEKS',
      description:
        'Technical qualities specified by measurable properties: water-repellent, wind-resistant, coated, stretch performance and durable fabrics.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Performance Collection',
      lead: 'Selected against measurable properties rather than appearance.',
    },
    overview: [
      'The Performance Collection covers fabrics specified by what they must withstand: water repellency and coatings, wind resistance, abrasion durability, and stretch with recovery.',
      'Because these qualities are bought against numbers, each is presented with the properties that matter — and with a clear distinction between a finish, which wears, and a coating or membrane, which is built in.',
    ],
    includes: ['Performance & Technical', 'Polyester', 'Tailoring'],
    relatedCategories: ['performance-technical', 'polyester', 'tailoring'],
    image: img('performance', 'Technical shell fabrics with a matte coated surface and visible ripstop grid'),
  },

  workwear: {
    slug: 'workwear',
    name: 'The Workwear Collection',
    seo: {
      title: 'The Workwear Collection — JUSTEKS',
      description:
        'Durable cloths for workwear and uniform production: cotton drill and canvas, polyester cotton blends, denim and industrially launderable qualities.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Workwear Collection',
      lead: 'Cloth that has to survive the job, the wash and the next shift.',
    },
    overview: [
      'The Workwear Collection is assembled around durability and laundering. It carries cotton drill and canvas, polyester cotton blends built for repeated industrial washing, and denim qualities used in workwear rather than fashion programmes.',
      'Where garments are laundered commercially — hospitality, healthcare, industrial uniforms — the wash cycle drives the selection, and it is confirmed before a cloth is proposed.',
    ],
    includes: ['Cotton', 'Denim', 'Performance & Technical', 'Polyester'],
    relatedCategories: ['cotton', 'denim', 'performance-technical', 'polyester'],
    image: img('workwear', 'Heavy cotton drill and canvas workwear fabrics in utility tones'),
  },

  interior: {
    slug: 'interior',
    name: 'The Interior Collection',
    seo: {
      title: 'The Interior Collection — JUSTEKS',
      description:
        'Upholstery, curtain and decorative fabrics for contract and residential interiors, including canvas, velvet and jacquard qualities.',
    },
    intro: {
      eyebrow: 'Collections',
      heading: 'The Interior Collection',
      lead: 'Specified for a room: abrasion, light behaviour and drop length come first.',
    },
    overview: [
      'The Interior Collection covers upholstery, curtain and decorative qualities for contract and residential projects, including canvas, velvet and jacquard constructions.',
      'Upholstery qualities are presented with their abrasion rating and curtain qualities with their light behaviour, because those are the two numbers a specifier works from before anything else.',
    ],
    includes: ['Interior', 'Fashion Fabrics'],
    relatedCategories: ['interior', 'fashion'],
    image: img('interior', 'Interior fabrics including jacquard and velvet arranged in warm neutral tones'),
  },
}
