import type { NavContent } from '../schema'

export const nav: NavContent = {
  brand: 'JUSTEKS',
  primary: [
    { label: 'Ana Sayfa',       href: '/' },
    { label: 'Kumaşlar',        href: '/fabrics' },
    { label: 'Koleksiyonlar',   href: '/collections' },
    { label: 'Sektörler',       href: '/industries' },
    { label: 'Menşe',           href: '/uk-origin' },
    { label: 'Global Tedarik',  href: '/global-supply' },
    { label: 'Özel Tedarik',    href: '/sourcing' },
    { label: 'Hakkımızda',      href: '/about' },
    { label: 'Insights',        href: '/insights' },
    { label: 'İletişim',        href: '/contact' },
  ],
  searchLabel: 'Ara',
  searchAriaLabel: 'Kumaş ara — kumaş uzmanımızla görüşün',
  quoteCta: { label: 'Teklif Alın', href: '/contact?topic=SALES' },
  menuLabel: 'Menü',
  closeLabel: 'Menüyü kapat',
  skipToContent: 'İçeriğe geç',
}
