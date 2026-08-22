import type { GlobalSupplyContent } from '../schema'

// Bölge adları haritada ve footer'da uluslararası kullanım için İngilizce
// korunur; açıklamalar Türkçedir.
export const globalSupply: GlobalSupplyContent = {
  seo: {
    title: 'Global Tedarik — Dünya Geneline Birleşik Krallık Menşeli Kumaş — JUSTEKS',
    description:
      'JUSTEKS; Avrupa, Türkiye, Orta Doğu, Kuzey Afrika, Amerika ve Asya genelindeki üreticilere, markalara, toptancılara ve profesyonel alıcılara Birleşik Krallık menşeli kumaş tedarik eder.',
  },
  intro: {
    eyebrow: 'Global Tedarik',
    heading: 'Birleşik Krallık’tan Dünyaya.',
    lead: 'British origin. Global reach. 2004’ten gelen tekstil tecrübesi, uluslararası ticaret ve tedarik kabiliyetiyle birleşiyor.',
  },
  body: [
    'JUSTEKS, Birleşik Krallık menşeli kumaşları dünyanın farklı bölgelerindeki tekstil üreticileri, konfeksiyon fabrikaları, moda markaları, kumaş toptancıları, distribütörler ve profesyonel satın almacılarla buluşturur.',
    '2004’ten bu yana edindiğimiz tekstil tecrübesini uluslararası ticaret ve tedarik kabiliyetimizle birleştirerek, farklı ölçeklerdeki B2B kumaş siparişlerini müşterilerimizin fabrikalarına, depolarına veya belirledikleri ticari teslimat noktalarına ulaştırıyoruz.',
  ],
  mapHeadingLines: ['BRITISH ORIGIN.', 'GLOBAL REACH.'],
  mapCaption: 'Birleşik Krallık menşeli kumaşlar, global pazarlardaki tekstil profesyonellerine tedarik edilir.',
  mapCta: { label: 'İhtiyacınızı Görüşelim', href: '/contact?topic=INTERNATIONAL_TRADE' },
  regions: [
    {
      key: 'europe',
      name: 'Europe',
      body: 'Avrupa genelindeki üreticilere, markalara, tekstil firmalarına ve profesyonel alıcılara toptan kumaş tedariki.',
    },
    {
      key: 'turkiye',
      name: 'Türkiye',
      body: 'Türkiye’deki tekstil üreticilerine, konfeksiyon fabrikalarına, markalara, ihracatçılara ve kumaş toptancılarına profesyonel B2B tedarik.',
    },
    {
      key: 'middle-east',
      name: 'Middle East',
      body: 'Orta Doğu pazarındaki üreticilere, distribütörlere, moda şirketlerine ve profesyonel tekstil alıcılarına toptan kumaş tedariki.',
    },
    {
      key: 'north-africa',
      name: 'North Africa',
      body: 'Kuzey Afrika’daki tekstil ve hazır giyim üretim merkezlerine profesyonel kumaş tedariki.',
    },
    {
      key: 'americas',
      name: 'Americas',
      body: 'Kuzey ve Güney Amerika’daki markalara, üreticilere, distribütörlere ve profesyonel alıcılara uluslararası kumaş tedariki.',
    },
    {
      key: 'asia',
      name: 'Asia',
      body: 'Asya’daki üreticilere, tekstil işletmelerine, markalara ve profesyonel satın alma organizasyonlarına B2B kumaş tedariki.',
    },
  ],
  sections: [
    {
      heading: 'Siparişler size nasıl ulaşır',
      body: [
        'Ticari sevkiyat; her siparişin ürününe, miktarına, destinasyonuna ve teslimat gereksinimine göre planlanır. Müşteriler siparişlerini üretim tesislerine, belirledikleri depolara veya seçtikleri bir ticari adrese yönlendirebilir.',
      ],
      items: [
        'Fabrikaya teslim',
        'Depoya teslim',
        'Ticari adrese teslim',
      ],
    },
  ],
  note: 'Teslim şekli; ürün, sipariş hacmi ve destinasyona göre teklif aşamasında belirlenir.',
  ctas: [
    { label: 'İhtiyacınızı Görüşelim', href: '/contact?topic=INTERNATIONAL_TRADE' },
    { label: 'Ticaret ve Lojistik', href: '/trade-logistics' },
  ],
}
