import type { NavContent } from '../schema'

export const nav: NavContent = {
  brand: 'JUSTEKS',
  primary: [
    { label: 'Home',          href: '/' },
    { label: 'Fabrics',       href: '/fabrics' },
    { label: 'Collections',   href: '/collections' },
    { label: 'Industries',    href: '/industries' },
    { label: 'UK Origin',     href: '/uk-origin' },
    { label: 'Global Supply', href: '/global-supply' },
    { label: 'Sourcing',      href: '/sourcing' },
    { label: 'About',         href: '/about' },
    { label: 'Insights',      href: '/insights' },
    { label: 'Contact',       href: '/contact' },
  ],
  searchLabel: 'Search',
  searchAriaLabel: 'Search fabrics — speak to a fabric specialist',
  quoteCta: { label: 'Request a Quote', href: '/contact?topic=SALES' },
  menuLabel: 'Menu',
  closeLabel: 'Close menu',
  skipToContent: 'Skip to content',
}
