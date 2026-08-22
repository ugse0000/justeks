import type { HomeContent } from '../schema'

export const home: HomeContent = {
  seo: {
    title: 'JUSTEKS — British Origin. Global Reach.',
    description:
      'Textile expertise since 2004. JUSTEKS supplies UK-origin fabrics to manufacturers, fashion brands, wholesalers and professional buyers worldwide.',
  },

  hero: {
    eyebrow: 'Est. 2004',
    headingLines: ['BRITISH ORIGIN.', 'GLOBAL REACH.'],
    tagline: 'Fabric, Perfected.',
    lead: 'Textile expertise since 2004. Supplying UK-origin fabrics to manufacturers, brands and textile professionals worldwide.',
    ctas: [
      { label: 'Explore Fabrics', href: '/fabrics' },
      { label: 'Request a Quote', href: '/contact?topic=SALES' },
    ],
    image: {
      src: '/images/hero.webp',
      alt: 'A row of spinning machines running in a textile mill',
      width: 2000,
      height: 1125,
    },
  },

  trust: ['Est. 2004', 'UK Origin', 'B2B Wholesale', 'Global Supply'],

  heritage: {
    eyebrow: 'Our Heritage',
    heading: 'Rooted in Textiles Since 2004.',
    lead: 'Two decades spent understanding not just how a fabric looks, but how it behaves.',
    body: [
      'The JUSTEKS journey in textiles began in 2004. Across more than twenty years we have worked with different fibres, weaving and knitting structures, weights, finishes and production requirements — and that accumulated experience is what our product approach rests on today.',
      'For us a fabric is not simply a traded commodity. The right fabric directly affects the quality of production, the appearance of the garment, how it feels in the hand, how long it lasts and ultimately whether a collection succeeds. That is why our work is not to sell fabric, but to help a customer find and source the fabric their production actually needs.',
    ],
    milestones: [
      { year: '2004', body: 'Our journey in the textile industry begins.' },
      { year: 'Today', body: 'Connecting UK-origin fabrics with professional customers across global markets.' },
    ],
  },

  fabricCategories: {
    eyebrow: 'Fabrics',
    heading: 'Explore Our Fabrics',
    lead: 'Organised by technical category, with the construction, weights and applications that matter when you specify.',
    cta: { label: 'All Fabrics', href: '/fabrics' },
  },

  collections: {
    eyebrow: 'Collections',
    heading: 'JUSTEKS Collections',
    lead: 'Curated groupings that cut across technical categories — assembled around how a collection is actually built.',
    cta: { label: 'All Collections', href: '/collections' },
  },

  expertise: {
    eyebrow: 'Textile Expertise',
    heading: 'We Know More Than the Fabric.',
    lead: 'Professional fabric selection is not decided by colour or pattern alone.',
    body: [
      'The experience gathered since 2004 sits at the centre of how we approach product. When a buyer specifies for production, the properties that decide the outcome are technical ones — and they interact.',
      'Our aim is not simply to show a customer product, but to help them evaluate the fabric alternatives that suit their production requirement.',
    ],
    properties: [
      'Composition', 'Construction', 'GSM', 'Width', 'Hand Feel',
      'Drape', 'Stretch', 'Finish', 'Performance', 'Application',
    ],
  },

  sourcing: {
    eyebrow: 'Sourcing Desk',
    heading: 'Can’t Find What You’re Looking For?',
    lead: 'You define the requirement. We help find the fabric.',
    body: [
      'If the fabric you need is not in our current range, send us the specification. Fabric type, composition, GSM, width, colour, application, quantity and delivery destination — with a reference photograph, technical data sheet or sample if you have one.',
    ],
    cta: { label: 'Submit a Sourcing Request', href: '/sourcing' },
  },

  ukOrigin: {
    eyebrow: 'UK Origin',
    heading: 'British Origin.',
    lead: 'UK-origin fabrics sit at the centre of the JUSTEKS range.',
    body: [
      'Country of origin is a meaningful part of a product’s identity, and it is stated clearly on every article where it applies. Where origin documentation or technical records exist for an article, they can be provided.',
    ],
    badge: 'United Kingdom Origin',
    cta: { label: 'About UK Origin', href: '/uk-origin' },
  },

  quality: {
    eyebrow: 'Quality & Traceability',
    heading: 'Every Fabric Has an Identity.',
    lead: 'In professional textile supply, clear and traceable product information matters.',
    body: [
      'Where it applies to an article, the following information can be held and shared — so that what you order, what you sample and what arrives are demonstrably the same cloth.',
    ],
    fields: [
      'Article Number', 'Country of Origin', 'Composition', 'Construction',
      'Technical Specification', 'Batch / Lot Reference', 'Colour Reference',
      'Certification', 'Care Information',
    ],
  },

  industries: {
    eyebrow: 'Industries We Serve',
    heading: 'Built for Professional Textile Production',
    lead: 'Every sector specifies fabric differently. These pages set out what drives the decision in each.',
    cta: { label: 'All Industries', href: '/industries' },
  },

  sampleService: {
    eyebrow: 'Sample Service',
    heading: 'See It. Feel It. Specify It.',
    lead: 'Professional buyers should be able to assess a fabric before committing to bulk.',
    body: [
      'Hand, drape and surface cannot be judged from a photograph. Multiple articles can be combined into a single sample request.',
    ],
    options: [
      { title: 'Request a Swatch', body: 'A cutting of the article, for hand and construction.' },
      { title: 'Request a Sample', body: 'A larger piece, where drape and behaviour need assessing.' },
      { title: 'Request a Colour Card', body: 'The available colour range for an article.' },
    ],
  },

  tradeLogistics: {
    eyebrow: 'Trade & Logistics',
    heading: 'From Fabric Selection to Final Destination.',
    lead: 'Our service does not end when the fabric is chosen.',
    body: [
      'For professional B2B orders, commercial shipment is planned around the product, quantity, destination and delivery requirement of the order.',
    ],
    deliveryModes: [
      { title: 'Factory Delivery', body: 'Direct to your production facility.' },
      { title: 'Warehouse Delivery', body: 'To a warehouse you nominate.' },
      { title: 'Commercial Address', body: 'To a commercial delivery point of your choosing.' },
    ],
    note: 'Delivery terms available upon quotation. The applicable terms are confirmed at quotation stage, based on product, order volume and destination.',
  },

  bulkOrders: {
    eyebrow: 'High-Volume Orders',
    heading: 'Built for Scale.',
    lead: 'Professional fabric supply for high-volume production.',
    body: [
      'For textile businesses running continuous production and professional customers with high-metreage requirements, share the specification below and the enquiry goes directly to our corporate sales team.',
    ],
    fields: [
      'Fabric / Article', 'Composition', 'Colour', 'GSM', 'Width',
      'Required Quantity', 'Required Delivery Date', 'Delivery Country',
      'Delivery City', 'Production Application',
    ],
    cta: { label: 'Discuss a Bulk Requirement', href: '/bulk-orders' },
  },

  responsible: {
    eyebrow: 'Responsible Textiles',
    heading: 'Responsible Choices. Clear Information.',
    lead: 'Verifiable product information rather than general environmental claims.',
    body: [
      'We do not build our sustainability communication on broad claims that cannot be verified. Instead, where an attribute genuinely applies to an article, it is stated on that article.',
    ],
    attributes: [
      'Organic Fibres', 'Recycled Fibres', 'Certified Materials',
      'Traceable Articles', 'Responsible Material Options',
    ],
    note: 'Certification is shown only where the specific article holds it. No certification logo appears on a product that does not carry it.',
  },

  insights: {
    eyebrow: 'Insights',
    heading: 'Textile Knowledge. Built Over Time.',
    lead: 'Technical guidance on fabric selection, drawn from the experience behind the range.',
    cta: { label: 'Read Insights', href: '/insights' },
  },

  corporateCta: {
    heading: 'Let’s Talk Fabric.',
    body: 'Whether you are sourcing for your next collection, planning high-volume production or looking for a specific fabric, our team is ready to discuss your requirements.',
    ctas: [
      { label: 'Request a Quote', href: '/contact?topic=SALES' },
      { label: 'Talk to a Fabric Specialist', href: '/contact' },
    ],
    footnote: 'Textile Expertise Since 2004.',
  },
}
