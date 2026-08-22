/**
 * Corporate constants — the single source for anything that appears in more
 * than one place (footer, contact page, Organization JSON-LD, legal pages).
 *
 * PLACEHOLDER_* values are not real yet. Replace them here and every page
 * updates; do not copy these strings into components or content files.
 */

export const SITE_URL = 'https://justeks.com'
export const SITE_NAME = 'JUSTEKS'
export const TAGLINE = 'Fabric, Perfected.'
export const POSITIONING = 'BRITISH ORIGIN. GLOBAL REACH.'
export const SINCE_LINE = 'Textile Expertise Since 2004.'
export const FOUNDED_YEAR = 2004

export const PLACEHOLDER_LEGAL_NAME = 'JUSTEKS [Legal entity name to be confirmed]'
export const PLACEHOLDER_EMAIL = 'info@justeks.com'
export const PLACEHOLDER_SALES_EMAIL = 'sales@justeks.com'
export const PLACEHOLDER_PHONE = '+44 [phone to be confirmed]'
export const PLACEHOLDER_ADDRESS = {
  street: '[Street address to be confirmed]',
  city: '[City]',
  postalCode: '[Postcode]',
  country: 'United Kingdom',
  countryCode: 'GB',
}

/** Supply regions — fixed order, used by the map and the footer. */
export const SUPPLY_REGIONS = [
  'Europe', 'Türkiye', 'Middle East', 'North Africa', 'Americas', 'Asia',
] as const

export const TRUST_MARKS = [
  'EST. 2004', 'UK ORIGIN', 'B2B WHOLESALE', 'GLOBAL SUPPLY',
] as const

/** schema.org Organization, emitted once on the home page. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: PLACEHOLDER_LEGAL_NAME,
    url: SITE_URL,
    slogan: TAGLINE,
    foundingDate: String(FOUNDED_YEAR),
    email: PLACEHOLDER_EMAIL,
    telephone: PLACEHOLDER_PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: PLACEHOLDER_ADDRESS.street,
      addressLocality: PLACEHOLDER_ADDRESS.city,
      postalCode: PLACEHOLDER_ADDRESS.postalCode,
      addressCountry: PLACEHOLDER_ADDRESS.countryCode,
    },
    areaServed: [...SUPPLY_REGIONS],
    knowsAbout: [
      'Wholesale fabric supply', 'UK-origin textiles', 'Linen fabrics',
      'Shirting fabrics', 'Tailoring fabrics', 'B2B textile sourcing',
    ],
  }
}
