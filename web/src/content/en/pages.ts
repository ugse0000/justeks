import type { GenericPageContent } from '../schema'

export const pages: Record<string, GenericPageContent> = {
  about: {
    seo: {
      title: 'About JUSTEKS — Textile Expertise Since 2004',
      description:
        'JUSTEKS is a textile business supplying UK-origin fabrics to manufacturers, brands, wholesalers and professional buyers worldwide. Textile expertise since 2004.',
    },
    intro: {
      eyebrow: 'About',
      heading: 'A Fabric House, Not a Fabric Shop.',
      lead: 'Textile expertise since 2004, combined with UK-origin collections and global B2B supply capability.',
    },
    body: [
      'JUSTEKS works with professional buyers: textile mills, garment manufacturers, fashion brands, fabric wholesalers, distributors, private label producers and corporate purchasing departments. What those customers have in common is that they are specifying fabric for production, not choosing it for a single garment.',
      'That shapes how we work. A production buyer needs to know composition, construction, weight, width, finish and behaviour before they commit — and needs the same cloth to be available again when the order repeats. Our role is to make that information clear, and to make the supply reliable.',
      'The business rests on two things: the textile experience built since 2004, and the trade capability to move UK-origin fabric to customers across global markets.',
    ],
    features: [
      { title: 'Heritage', body: 'Twenty years of working with fibres, constructions, weights and finishes.' },
      { title: 'Product', body: 'UK-origin fabric collections presented with the technical detail a buyer needs.' },
      { title: 'Capability', body: 'B2B supply and delivery to professional customers across global markets.' },
    ],
    links: [
      { label: 'Our Heritage', href: '/heritage', description: 'Where the business started and what two decades taught us.' },
      { label: 'UK Origin', href: '/uk-origin', description: 'Why country of origin is part of a product’s identity.' },
      { label: 'Global Supply', href: '/global-supply', description: 'The regions we supply and how orders reach you.' },
    ],
    ctas: [
      { label: 'Talk to a Fabric Specialist', href: '/contact' },
    ],
  },

  heritage: {
    seo: {
      title: 'Our Heritage — Rooted in Textiles Since 2004 — JUSTEKS',
      description:
        'The JUSTEKS journey in textiles began in 2004. Two decades of work across fibres, constructions, weights and finishes now sit behind every fabric we supply.',
    },
    intro: {
      eyebrow: 'Our Heritage',
      heading: 'Rooted in Textiles Since 2004.',
      lead: 'Two decades spent understanding not just how a fabric looks, but how it behaves.',
    },
    body: [
      'The JUSTEKS journey in textiles began in 2004. Across more than twenty years we have worked with different fibres, weaving and knitting structures, weights, finishes and production requirements — and that accumulated experience is what our product approach rests on today.',
      'For us a fabric is not simply a traded commodity. The right fabric directly affects the quality of production, the appearance of the garment, how it feels in the hand, how long it lasts and ultimately whether a collection succeeds.',
      'That is why our work is not to sell fabric, but to help a customer find and source the fabric their production actually needs. Today JUSTEKS brings UK-origin fabrics to manufacturers, fashion brands, textile businesses, wholesalers and professional buyers in different parts of the world.',
    ],
    sections: [
      {
        heading: 'What twenty years teaches you',
        body: [
          'Mostly it teaches you what goes wrong. A linen that was never rested before cutting. A dark twill that crocks onto everything it touches. A collar that bubbles because the interlining was chosen after the cloth. A repeat order that cannot be filled because the article was never really a stock line.',
        ],
        items: [
          'Specify by property, not by name',
          'Approve a production sample, not only a swatch',
          'Confirm the finish before bulk cutting',
          'Plan the repeat before the first order ships',
        ],
      },
    ],
    ctas: [
      { label: 'Explore Fabrics', href: '/fabrics' },
      { label: 'Talk to a Fabric Specialist', href: '/contact' },
    ],
  },

  ukOrigin: {
    seo: {
      title: 'UK Origin — British Origin Fabrics — JUSTEKS',
      description:
        'UK-origin fabrics sit at the centre of the JUSTEKS range. Country of origin is stated clearly on every article where it applies.',
    },
    intro: {
      eyebrow: 'UK Origin',
      heading: 'British Origin.',
      lead: 'Country of origin is part of a product’s identity, and it belongs on the product page — not in a marketing claim.',
    },
    body: [
      'UK-origin fabrics sit at the centre of the JUSTEKS collection. For professional buyers this matters commercially as well as reputationally: origin affects documentation, customs treatment and, in many programmes, the story a brand can tell about its materials.',
      'Our approach is straightforward. Where an article is UK-origin, it says so. Where origin documentation or technical records exist for that article, they can be provided on request. We do not apply an origin claim across a category, because origin belongs to an article, not to a range.',
    ],
    sections: [
      {
        heading: 'On the product',
        body: [
          'Where it applies, origin appears as a clear mark on the article alongside its technical specification, in the same place a buyer looks for composition and weight.',
        ],
        items: ['United Kingdom Origin'],
      },
      {
        heading: 'Documentation',
        body: [
          'Origin documentation, where it exists for an article, can be supplied with a quotation or shipment. Requirements vary by destination, so confirm what you need at quotation stage rather than after despatch.',
        ],
      },
    ],
    note: 'Origin is confirmed per article. It is never asserted for a category as a whole.',
    ctas: [
      { label: 'Explore Fabrics', href: '/fabrics' },
      { label: 'Discuss Your Requirements', href: '/contact?topic=INTERNATIONAL_TRADE' },
    ],
  },

  textileExpertise: {
    seo: {
      title: 'Textile Expertise — How to Specify a Fabric — JUSTEKS',
      description:
        'Composition, construction, GSM, width, hand feel, drape, stretch, finish, performance and application: the properties that decide a fabric for production.',
    },
    intro: {
      eyebrow: 'Textile Expertise',
      heading: 'We Know More Than the Fabric.',
      lead: 'Professional fabric selection is not decided by colour or pattern alone.',
    },
    body: [
      'When a buyer specifies fabric for production, the properties that decide the outcome are technical — and they interact. A heavier cloth drapes differently. A finish changes hand and shrinkage together. Elastane improves fit and complicates pressing. Understanding those interactions is what separates a fabric that works in production from one that only works on a mood board.',
      'Our aim is not simply to show a customer product, but to help them evaluate the fabric alternatives that suit their production requirement.',
    ],
    features: [
      { title: 'Composition', body: 'Which fibres, in what proportion. Sets breathability, care and much of the cost.' },
      { title: 'Construction', body: 'Woven or knitted, and in which structure. Often matters more than the fibre.' },
      { title: 'GSM', body: 'Weight per square metre. Drives season, application and price point together.' },
      { title: 'Width', body: 'Determines consumption and therefore cost per garment, not just cost per metre.' },
      { title: 'Hand Feel', body: 'How the cloth feels. Cannot be judged from a photograph — this is why swatches exist.' },
      { title: 'Drape', body: 'How the cloth falls. Decides silhouette more than any other single property.' },
      { title: 'Stretch', body: 'Mechanical or elastane. Changes fit, and changes pressing and shrinkage with it.' },
      { title: 'Finish', body: 'Washing, brushing, mercerising, coating. Changes hand, behaviour and ageing.' },
      { title: 'Performance', body: 'Abrasion, tear, water resistance, colour fastness. Specified as numbers, not adjectives.' },
      { title: 'Application', body: 'What the cloth is for. Every property above is judged against this.' },
    ],
    links: [
      { label: 'Quality & Traceability', href: '/quality-traceability', description: 'What we record about an article and why.' },
      { label: 'Insights', href: '/insights', description: 'Technical guidance on choosing between fabrics.' },
    ],
    ctas: [
      { label: 'Talk to a Fabric Specialist', href: '/contact?topic=TECHNICAL' },
    ],
  },

  quality: {
    seo: {
      title: 'Quality & Traceability — Fabric Identity — JUSTEKS',
      description:
        'Article number, origin, composition, construction, batch reference and colour reference: the record that keeps a fabric identifiable from quotation to delivery.',
    },
    intro: {
      eyebrow: 'Quality & Traceability',
      heading: 'Every Fabric Has an Identity.',
      lead: 'In professional textile supply, clear and traceable product information matters.',
    },
    body: [
      'The practical purpose of a product record is simple: what you order, what you sample and what arrives should be demonstrably the same cloth. That is harder than it sounds across a supply chain, and it is where most disputes originate.',
      'Where the information applies to an article, it can be held and shared. Where it does not exist for a given article, we say so rather than inventing it.',
    ],
    sections: [
      {
        heading: 'What can be recorded',
        body: [],
        items: [
          'Article Number', 'Country of Origin', 'Composition', 'Construction',
          'Technical Specification', 'Batch / Lot Reference', 'Colour Reference',
          'Certification', 'Care Information',
        ],
      },
      {
        heading: 'Article number format',
        body: [
          'Each fabric carries a unique JUSTEKS article number. The format encodes the category, the weight and the product number, so a reference read aloud on a call still identifies a specific cloth.',
        ],
      },
    ],
    note: 'Certification appears only where the specific article holds it.',
    ctas: [
      { label: 'Talk to a Fabric Specialist', href: '/contact?topic=TECHNICAL' },
    ],
  },

  responsible: {
    seo: {
      title: 'Responsible Textiles — Verifiable Information — JUSTEKS',
      description:
        'Organic and recycled fibres, certified materials and traceable articles — stated per article where they genuinely apply, never as a general claim.',
    },
    intro: {
      eyebrow: 'Responsible Textiles',
      heading: 'Responsible Choices. Clear Information.',
      lead: 'Verifiable product information rather than general environmental claims.',
    },
    body: [
      'We do not build our sustainability communication on broad claims that cannot be verified. A statement that a range is sustainable, without an article behind it, tells a professional buyer nothing they can use — and increasingly, nothing they are allowed to repeat to their own customers.',
      'Instead, where an attribute genuinely applies to an article, it is stated on that article. Where a certification exists for that article, it is named. Where it does not, no logo appears.',
    ],
    sections: [
      {
        heading: 'Attributes shown per article',
        body: [],
        items: [
          'Organic Fibres', 'Recycled Fibres', 'Certified Materials',
          'Traceable Articles', 'Responsible Material Options',
        ],
      },
      {
        heading: 'On certification',
        body: [
          'Recognised textile certifications apply to specific products and production processes, not to companies in general. Where an article holds a relevant certification, it can be shown with its reference and validity. We do not display certification marks on products that do not carry them.',
        ],
      },
    ],
    note: 'No certification logo appears on a product that does not hold it.',
    ctas: [
      { label: 'Talk to a Fabric Specialist', href: '/contact?topic=TECHNICAL' },
    ],
  },

  tradeLogistics: {
    seo: {
      title: 'Trade & Logistics — Selection to Destination — JUSTEKS',
      description:
        'International freight coordination, export and origin documentation, and delivery to factory, warehouse or a nominated commercial address.',
    },
    intro: {
      eyebrow: 'Trade & Logistics',
      heading: 'From Fabric Selection to Final Destination.',
      lead: 'Our service does not end when the fabric is chosen.',
    },
    body: [
      'For professional B2B orders, commercial shipment is planned around the product, quantity, destination and delivery requirement of the order. Customers can direct orders to production facilities, to nominated warehouses, or to a commercial address of their choosing.',
    ],
    features: [
      { title: 'Factory Delivery', body: 'Direct to your production facility.' },
      { title: 'Warehouse Delivery', body: 'To a warehouse you nominate.' },
      { title: 'Commercial Address', body: 'To a commercial delivery point of your choosing.' },
    ],
    sections: [
      {
        heading: 'Areas covered, depending on the order and destination',
        body: [],
        items: [
          'International Freight Coordination',
          'Commercial Shipping',
          'Export Documentation',
          'Commercial Invoice',
          'Packing Documentation',
          'Origin Documentation',
          'Factory / Warehouse Delivery',
        ],
      },
      {
        heading: 'Delivery terms',
        body: [
          'Delivery terms available upon quotation. The applicable terms are confirmed at quotation stage, based on the product, order volume and destination.',
        ],
      },
    ],
    note: 'Services shown here apply according to the order and destination. We do not list a logistics or documentation service we do not actually provide.',
    ctas: [
      { label: 'Discuss Your Requirements', href: '/contact?topic=INTERNATIONAL_TRADE' },
      { label: 'Global Supply', href: '/global-supply' },
    ],
  },

  bulkOrders: {
    seo: {
      title: 'High-Volume Orders — Built for Scale — JUSTEKS',
      description:
        'Professional fabric supply for high-volume production. Share your article, composition, colour, GSM, width, quantity and delivery requirement.',
    },
    intro: {
      eyebrow: 'High-Volume Orders',
      heading: 'Built for Scale.',
      lead: 'Professional fabric supply for high-volume production.',
    },
    body: [
      'For textile businesses running continuous production and professional customers with high-metreage requirements, the enquiry goes directly to our corporate sales team rather than into a general inbox.',
      'The more of the specification you can share up front, the faster a realistic answer comes back — particularly on availability and lead time, which are the two things a production plan actually depends on.',
    ],
    sections: [
      {
        heading: 'What to include',
        body: [],
        items: [
          'Fabric / Article', 'Composition', 'Colour', 'GSM', 'Width',
          'Required Quantity', 'Required Delivery Date', 'Delivery Country',
          'Delivery City', 'Production Application',
        ],
      },
    ],
    ctas: [
      { label: 'Discuss a Bulk Requirement', href: '/contact?topic=SALES' },
    ],
  },

  sourcing: {
    seo: {
      title: 'Sourcing Desk — Can’t Find Your Fabric? — JUSTEKS',
      description:
        'Send us your fabric specification and reference material. You define the requirement, we help find the fabric.',
    },
    intro: {
      eyebrow: 'Sourcing Desk',
      heading: 'Can’t Find What You’re Looking For?',
      lead: 'You define the requirement. We help find the fabric.',
    },
    body: [
      'If the fabric you need is not in our current range, send us the specification. The clearer the requirement, the better the alternatives we can put in front of you.',
      'A reference photograph, a technical data sheet, a competitor sample or even a garment you are trying to match all help — often more than a written description alone.',
    ],
    sections: [
      {
        heading: 'What to send',
        body: [],
        items: [
          'Fabric Type', 'Composition', 'GSM', 'Width', 'Colour',
          'Application', 'Required Quantity', 'Target Delivery Country',
          'Required Date',
        ],
      },
      {
        heading: 'Reference material',
        body: [
          'You can upload a fabric photograph, technical data sheet, reference product image or a written specification. PDF, image and document files are accepted.',
        ],
      },
    ],
    ctas: [
      { label: 'Submit a Sourcing Request', href: '/contact?topic=SOURCING' },
    ],
  },

  sampleService: {
    seo: {
      title: 'Sample Service — See It. Feel It. Specify It. — JUSTEKS',
      description:
        'Request a swatch, a sample or a colour card before committing to bulk. Multiple articles can be combined into one request.',
    },
    intro: {
      eyebrow: 'Sample Service',
      heading: 'See It. Feel It. Specify It.',
      lead: 'Professional buyers should be able to assess a fabric before committing to bulk.',
    },
    body: [
      'Hand, drape and surface cannot be judged from a photograph, and a decision made from a screen is a decision made on incomplete information. Multiple articles can be combined into a single sample request.',
    ],
    features: [
      { title: 'Request a Swatch', body: 'A cutting of the article, enough to judge hand and construction.' },
      { title: 'Request a Sample', body: 'A larger piece, where drape and behaviour need assessing properly.' },
      { title: 'Request a Colour Card', body: 'The available colour range for a given article.' },
    ],
    note: 'Sample availability is confirmed per article at the time of request.',
    ctas: [
      { label: 'Request a Sample', href: '/contact?topic=SAMPLING' },
    ],
  },

  tradeAccount: {
    seo: {
      title: 'Trade Account — JUSTEKS',
      description:
        'Apply for a JUSTEKS trade account for regular professional purchasing, saved fabrics, quotation history and a named account contact.',
    },
    intro: {
      eyebrow: 'Trade Account',
      heading: 'JUSTEKS Trade Account',
      lead: 'For customers buying regularly, an account that keeps the work in one place.',
    },
    body: [
      'A trade account is intended for professional customers purchasing on a recurring basis. Applications are reviewed individually, and we will normally ask about the type of production you run, the fabrics you use and the volumes you work with.',
    ],
    sections: [
      {
        heading: 'What an account will hold',
        body: [
          'The account area is being built out in stages. These are the areas it is designed around:',
        ],
        items: [
          'Saved Fabrics', 'Favourites', 'Quotation History',
          'Sample Requests', 'Order History', 'Technical Documents',
          'Certificates', 'Account Information', 'Account Manager',
        ],
      },
    ],
    note: 'Not every area is live yet. Applying now registers your business and gives you a named contact.',
    ctas: [
      { label: 'Apply for a Trade Account', href: '/contact?topic=SALES' },
    ],
  },

  resources: {
    seo: {
      title: 'Resources — Company and Technical Documents — JUSTEKS',
      description:
        'Company profile, fabric catalogue, technical data sheets, certificates and care guides — available on request while the resource centre is built out.',
    },
    intro: {
      eyebrow: 'Resources',
      heading: 'Resource Centre',
      lead: 'Company and technical documentation for professional customers.',
    },
    body: [
      'These are the documents professional customers most often ask for. Rather than publish placeholder files, we provide them on request while the resource centre is being built out — so what you receive is current rather than merely available.',
    ],
    sections: [
      {
        heading: 'Available on request',
        body: [],
        items: [
          'Company Profile', 'Fabric Catalogue', 'Collection Books',
          'Technical Data Sheets', 'Certificates', 'Fabric Care Guides',
          'Shipping Information', 'Corporate Documents',
        ],
      },
    ],
    note: 'Technical data sheets and certificates are issued per article, so tell us which article you need when you get in touch.',
    ctas: [
      { label: 'Request a Document', href: '/contact?topic=GENERAL' },
    ],
  },

  contact: {
    seo: {
      title: 'Talk to a Fabric Specialist — Contact JUSTEKS',
      description:
        'Speak to the JUSTEKS team about wholesale pricing, samples, sourcing, international trade or technical product information.',
    },
    intro: {
      eyebrow: 'Contact',
      heading: 'Talk to a Fabric Specialist.',
      lead: 'Tell us what you are producing and we will route your enquiry to the right person.',
    },
    body: [
      'Choosing the right subject means your enquiry reaches the team that can answer it directly, rather than being forwarded twice before someone replies.',
    ],
    ctas: [],
  },

  notFound: {
    seo: {
      title: 'Page Not Found — JUSTEKS',
      description: 'The page you are looking for could not be found.',
    },
    intro: {
      eyebrow: 'Error 404',
      heading: 'This Page Could Not Be Found.',
      lead: 'The page may have moved, or the address may be incomplete.',
    },
    body: [
      'You can browse the fabric categories, look through the collections, or contact the team directly and we will point you to what you need.',
    ],
    ctas: [
      { label: 'Explore Fabrics', href: '/fabrics' },
      { label: 'Contact Us', href: '/contact?topic=GENERAL' },
    ],
  },

  privacy: {
    seo: {
      title: 'Privacy Policy — JUSTEKS',
      description: 'How JUSTEKS collects, uses and protects the information you provide through this website.',
    },
    intro: {
      eyebrow: 'Legal',
      heading: 'Privacy Policy',
      lead: 'What we collect through this website, why we collect it, and how long we keep it.',
    },
    body: [
      'This policy explains how JUSTEKS handles information submitted through justeks.com. It applies to enquiries, sourcing requests, bulk requirements and trade account applications made through the forms on this site.',
    ],
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you submit a form we collect the business contact details and requirement information you provide: company name, contact name, email address, telephone number, country, and the details of your enquiry. Where you upload reference material, we store those files alongside the enquiry.',
          'We also record technical information necessary to operate the service securely, including the IP address the submission came from, in order to prevent abuse of the forms.',
        ],
      },
      {
        heading: 'Why we use it',
        body: [
          'We use this information to respond to your enquiry, prepare quotations, arrange samples and fulfil orders. We do not sell it, and we do not use it for unrelated marketing without consent.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Enquiry records are retained for as long as necessary for the commercial relationship and for the period required by applicable accounting and tax obligations, after which they are deleted.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You may request access to the information we hold about you, ask for it to be corrected, or ask for it to be deleted where we are not required to retain it. Contact us using the details on the contact page to make a request.',
        ],
      },
    ],
    note: 'This policy will be updated when the corporate entity details and data protection registration are finalised.',
    ctas: [{ label: 'Contact Us', href: '/contact?topic=GENERAL' }],
  },

  cookies: {
    seo: {
      title: 'Cookie Policy — JUSTEKS',
      description: 'How this website uses cookies and similar technologies.',
    },
    intro: {
      eyebrow: 'Legal',
      heading: 'Cookie Policy',
      lead: 'What this site stores in your browser, and what it does not.',
    },
    body: [
      'This website is built as a set of static pages and does not require cookies to function. We do not use advertising or cross-site tracking cookies.',
    ],
    sections: [
      {
        heading: 'What we use',
        body: [
          'Strictly necessary storage may be used to remember your language preference between visits. This stays in your browser and is not transmitted to third parties.',
        ],
      },
      {
        heading: 'Analytics',
        body: [
          'If analytics are introduced in future, this policy will be updated before they are enabled, and any non-essential cookies will be subject to your consent.',
        ],
      },
    ],
    ctas: [{ label: 'Contact Us', href: '/contact?topic=GENERAL' }],
  },

  terms: {
    seo: {
      title: 'Terms & Conditions — JUSTEKS',
      description: 'The terms governing use of this website and enquiries submitted through it.',
    },
    intro: {
      eyebrow: 'Legal',
      heading: 'Terms & Conditions',
      lead: 'The terms that apply to this website and to enquiries made through it.',
    },
    body: [
      'These terms govern your use of justeks.com. Commercial terms for any supply of goods are set out separately in the quotation, order confirmation and contract of sale agreed between the parties.',
    ],
    sections: [
      {
        heading: 'Website content',
        body: [
          'Fabric specifications shown on this site — including composition, weight, width, construction and applications — are indicative and describe typical ranges for a category or article. The binding specification for any order is the one confirmed in the quotation and order confirmation.',
          'Colour reproduction on screen varies by device and cannot be relied upon for colour matching. Colour should be approved from a physical swatch, sample or colour card.',
        ],
      },
      {
        heading: 'Enquiries and quotations',
        body: [
          'An enquiry submitted through this site is a request for information and does not constitute an order. Prices, availability, minimum order quantities and lead times are confirmed at quotation stage and are subject to stock and production capacity at the time of order.',
        ],
      },
      {
        heading: 'Delivery terms',
        body: [
          'Delivery terms are confirmed at quotation stage based on product, order volume and destination. Any Incoterms applicable to an order are stated in the quotation and order confirmation.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'The content of this website, including text, imagery and the JUSTEKS name and marks, belongs to JUSTEKS and may not be reproduced for commercial purposes without permission.',
        ],
      },
    ],
    note: 'These terms will be updated when the corporate entity details and governing law are finalised.',
    ctas: [{ label: 'Contact Us', href: '/contact?topic=GENERAL' }],
  },
}
