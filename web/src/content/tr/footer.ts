import type { FooterContent } from '../schema'

export const footer: FooterContent = {
  brand: 'JUSTEKS',
  tagline: 'Fabric, Perfected.',
  since: 'Textile Expertise Since 2004.',
  columns: [
    {
      heading: 'Kumaşlar',
      links: [
        { label: 'Keten',          href: '/fabrics/linen' },
        { label: 'Pamuk',          href: '/fabrics/cotton' },
        { label: 'Viskon',         href: '/fabrics/viscose' },
        { label: 'Yün',            href: '/fabrics/wool' },
        { label: 'Denim',          href: '/fabrics/denim' },
        { label: 'Örme Kumaşlar',  href: '/fabrics/knitted' },
        { label: 'Gömleklik',      href: '/fabrics/shirting' },
        { label: 'Takım Elbiselik', href: '/fabrics/tailoring' },
        { label: 'Performans',     href: '/fabrics/performance-technical' },
        { label: 'İç Mekân',       href: '/fabrics/interior' },
      ],
    },
    {
      heading: 'Kurumsal',
      links: [
        { label: 'JUSTEKS Hakkında',    href: '/about' },
        { label: 'Tarihçemiz',          href: '/heritage' },
        { label: 'Birleşik Krallık Menşei', href: '/uk-origin' },
        { label: 'Kalite ve İzlenebilirlik', href: '/quality-traceability' },
        { label: 'Global Tedarik',      href: '/global-supply' },
        { label: 'Sorumlu Tekstil',     href: '/responsible-textiles' },
      ],
    },
    {
      heading: 'Hizmetler',
      links: [
        { label: 'Toptan Tedarik',      href: '/fabrics' },
        { label: 'Özel Kumaş Tedariki', href: '/sourcing' },
        { label: 'Numune Hizmeti',      href: '/sample-service' },
        { label: 'Yüksek Metrajlı Siparişler', href: '/bulk-orders' },
        { label: 'Trade Account',       href: '/trade-account' },
        { label: 'Uluslararası Ticaret', href: '/trade-logistics' },
      ],
    },
    {
      heading: 'Kaynaklar',
      links: [
        { label: 'Insights',            href: '/insights' },
        { label: 'Tekstil Uzmanlığı',   href: '/textile-expertise' },
        { label: 'Koleksiyonlar',       href: '/collections' },
        { label: 'Doküman Merkezi',     href: '/resources' },
      ],
    },
    {
      heading: 'İletişim',
      links: [
        { label: 'Satış',                href: '/contact?topic=SALES' },
        { label: 'Numune',               href: '/contact?topic=SAMPLING' },
        { label: 'Özel Tedarik',         href: '/contact?topic=SOURCING' },
        { label: 'Uluslararası Ticaret', href: '/contact?topic=INTERNATIONAL_TRADE' },
        { label: 'Genel Sorular',        href: '/contact?topic=GENERAL' },
      ],
    },
  ],
  regionsHeading: 'Global Tedarik',
  regions: ['Europe', 'Türkiye', 'Middle East', 'North Africa', 'Americas', 'Asia'],
  copyright: 'JUSTEKS — Tüm Hakları Saklıdır',
  legal: [
    { label: 'Gizlilik Politikası',  href: '/privacy' },
    { label: 'Çerez Politikası',     href: '/cookies' },
    { label: 'Kullanım Koşulları',   href: '/terms' },
  ],
}
