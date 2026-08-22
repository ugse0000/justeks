import type { FooterContent } from '../schema'

export const footer: FooterContent = {
  brand: 'JUSTEKS',
  tagline: 'Fabric, Perfected.',
  since: 'Textile Expertise Since 2004.',
  columns: [
    {
      heading: 'Fabrics',
      links: [
        { label: 'Linen',       href: '/fabrics/linen' },
        { label: 'Cotton',      href: '/fabrics/cotton' },
        { label: 'Viscose',     href: '/fabrics/viscose' },
        { label: 'Wool',        href: '/fabrics/wool' },
        { label: 'Denim',       href: '/fabrics/denim' },
        { label: 'Knitted',     href: '/fabrics/knitted' },
        { label: 'Shirting',    href: '/fabrics/shirting' },
        { label: 'Tailoring',   href: '/fabrics/tailoring' },
        { label: 'Performance', href: '/fabrics/performance-technical' },
        { label: 'Interior',    href: '/fabrics/interior' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About JUSTEKS',        href: '/about' },
        { label: 'Our Heritage',         href: '/heritage' },
        { label: 'UK Origin',            href: '/uk-origin' },
        { label: 'Quality & Traceability', href: '/quality-traceability' },
        { label: 'Global Supply',        href: '/global-supply' },
        { label: 'Responsible Textiles', href: '/responsible-textiles' },
      ],
    },
    {
      heading: 'Services',
      links: [
        { label: 'Wholesale Supply',   href: '/fabrics' },
        { label: 'Sourcing Desk',      href: '/sourcing' },
        { label: 'Sample Service',     href: '/sample-service' },
        { label: 'Bulk Orders',        href: '/bulk-orders' },
        { label: 'Trade Account',      href: '/trade-account' },
        { label: 'International Trade', href: '/trade-logistics' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Insights',            href: '/insights' },
        { label: 'Textile Expertise',   href: '/textile-expertise' },
        { label: 'Collections',         href: '/collections' },
        { label: 'Resource Centre',     href: '/resources' },
      ],
    },
    {
      heading: 'Contact',
      links: [
        { label: 'Sales',                href: '/contact?topic=SALES' },
        { label: 'Sampling',             href: '/contact?topic=SAMPLING' },
        { label: 'Sourcing',             href: '/contact?topic=SOURCING' },
        { label: 'International Trade',  href: '/contact?topic=INTERNATIONAL_TRADE' },
        { label: 'General Enquiries',    href: '/contact?topic=GENERAL' },
      ],
    },
  ],
  regionsHeading: 'Global Supply',
  regions: ['Europe', 'Türkiye', 'Middle East', 'North Africa', 'Americas', 'Asia'],
  copyright: 'JUSTEKS — All Rights Reserved',
  legal: [
    { label: 'Privacy Policy',      href: '/privacy' },
    { label: 'Cookie Policy',       href: '/cookies' },
    { label: 'Terms & Conditions',  href: '/terms' },
  ],
}
