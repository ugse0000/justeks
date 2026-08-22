import type { HomeContent } from '../schema'

// Marka sloganları (BRITISH ORIGIN. GLOBAL REACH. / Fabric, Perfected. /
// Textile Expertise Since 2004. / EST. 2004) çevrilmez, İngilizce kalır.
export const home: HomeContent = {
  seo: {
    title: 'JUSTEKS — British Origin. Global Reach.',
    description:
      '2004’ten gelen tekstil tecrübesi. JUSTEKS, Birleşik Krallık menşeli kumaşları dünya genelindeki üreticilere, moda markalarına, toptancılara ve profesyonel alıcılara tedarik eder.',
  },

  hero: {
    eyebrow: 'Est. 2004',
    headingLines: ['BRITISH ORIGIN.', 'GLOBAL REACH.'],
    tagline: 'Fabric, Perfected.',
    lead: '2004’ten gelen tekstil tecrübesi. Birleşik Krallık menşeli kumaşları dünya genelindeki üreticilere, markalara ve tekstil profesyonellerine tedarik ediyoruz.',
    ctas: [
      { label: 'Kumaşları İnceleyin', href: '/fabrics' },
      { label: 'Teklif Alın', href: '/contact?topic=SALES' },
    ],
    image: {
      src: '/images/hero.webp',
      alt: 'Bir tekstil fabrikasında sıra hâlinde çalışan iplik makineleri',
      width: 2000,
      height: 1125,
    },
  },

  trust: ['Est. 2004', 'UK Origin', 'B2B Wholesale', 'Global Supply'],

  heritage: {
    eyebrow: 'Tarihçemiz',
    heading: '2004’ten Beri Kumaşın İçindeyiz.',
    lead: 'Bir kumaşın yalnızca nasıl göründüğünü değil, nasıl davrandığını anlamakla geçen yirmi yıl.',
    body: [
      'JUSTEKS’in tekstil sektöründeki yolculuğu 2004 yılında başladı. Yirmi yılı aşan süreçte farklı elyaflar, dokuma ve örme yapıları, gramajlar, yüzey işlemleri ve üretim ihtiyaçları üzerinde çalıştık; bugün ürün yaklaşımımızın dayandığı şey bu birikimdir.',
      'Bizim için kumaş yalnızca ticareti yapılan bir ürün değildir. Doğru kumaş; üretimin kalitesini, ürünün görünümünü, kullanım hissini, dayanıklılığını ve nihayetinde koleksiyonun başarısını doğrudan etkiler. Bu nedenle işimiz kumaş satmak değil, müşterinin üretim ihtiyacına uygun kumaşı bulmasını ve doğru şekilde tedarik etmesini sağlamaktır.',
    ],
    milestones: [
      { year: '2004', body: 'Tekstil sektöründeki yolculuğumuz başladı.' },
      { year: 'Bugün', body: 'Birleşik Krallık menşeli kumaşları global pazarlardaki profesyonel müşterilerle buluşturuyoruz.' },
    ],
  },

  fabricCategories: {
    eyebrow: 'Kumaşlar',
    heading: 'Kumaşlarımızı Keşfedin',
    lead: 'Teknik kategorilere göre düzenlenmiş; spesifikasyon sırasında önem taşıyan konstrüksiyon, gramaj ve kullanım alanlarıyla birlikte.',
    cta: { label: 'Tüm Kumaşlar', href: '/fabrics' },
  },

  collections: {
    eyebrow: 'Koleksiyonlar',
    heading: 'JUSTEKS Koleksiyonları',
    lead: 'Teknik kategorileri kesen seçilmiş gruplar — bir koleksiyonun gerçekte nasıl kurulduğu etrafında bir araya getirildi.',
    cta: { label: 'Tüm Koleksiyonlar', href: '/collections' },
  },

  expertise: {
    eyebrow: 'Tekstil Uzmanlığı',
    heading: 'Kumaştan Fazlasını Biliyoruz.',
    lead: 'Profesyonel kumaş seçimi yalnızca renk veya desenle belirlenmez.',
    body: [
      '2004’ten bu yana edinilen deneyim, ürüne yaklaşımımızın merkezinde durur. Bir alıcı üretim için spesifikasyon yaparken sonucu belirleyen özellikler tekniktir ve birbirini etkiler.',
      'Amacımız müşteriye yalnızca ürün göstermek değil, üretim ihtiyacına uygun kumaş alternatiflerini değerlendirmesine yardımcı olmaktır.',
    ],
    properties: [
      'Composition', 'Construction', 'GSM', 'Width', 'Hand Feel',
      'Drape', 'Stretch', 'Finish', 'Performance', 'Application',
    ],
  },

  sourcing: {
    eyebrow: 'Özel Tedarik',
    heading: 'Aradığınızı Bulamadınız mı?',
    lead: 'Gereksinimi siz tanımlayın. Kumaşı bulmanıza yardımcı olalım.',
    body: [
      'İhtiyacınız olan kumaş mevcut ürün grubumuzda yoksa spesifikasyonu bize iletin. Kumaş türü, kompozisyon, gramaj, en, renk, kullanım alanı, miktar ve teslimat ülkesi — varsa referans fotoğraf, teknik föy veya numune ile birlikte.',
    ],
    cta: { label: 'Özel Tedarik Talebi Gönderin', href: '/sourcing' },
  },

  ukOrigin: {
    eyebrow: 'Menşe',
    heading: 'Birleşik Krallık Menşei.',
    lead: 'JUSTEKS ürün grubunun merkezinde Birleşik Krallık menşeli kumaşlar bulunur.',
    body: [
      'Menşe bilgisi ürün kimliğinin anlamlı bir parçasıdır ve geçerli olduğu her üründe açıkça belirtilir. Bir ürün için menşe belgesi veya teknik kayıt mevcutsa paylaşılabilir.',
    ],
    badge: 'United Kingdom Origin',
    cta: { label: 'Menşe Yaklaşımımız', href: '/uk-origin' },
  },

  quality: {
    eyebrow: 'Kalite ve İzlenebilirlik',
    heading: 'Her Kumaşın Bir Kimliği Vardır.',
    lead: 'Profesyonel tekstil tedarikinde ürün bilgisinin açık ve izlenebilir olması önemlidir.',
    body: [
      'Bir ürün için geçerli olduğu ölçüde aşağıdaki bilgiler tutulabilir ve paylaşılabilir; böylece sipariş ettiğiniz, numunesini gördüğünüz ve size ulaşan kumaşın aynı kumaş olduğu gösterilebilir.',
    ],
    fields: [
      'Article Number', 'Country of Origin', 'Composition', 'Construction',
      'Technical Specification', 'Batch / Lot Reference', 'Colour Reference',
      'Certification', 'Care Information',
    ],
  },

  industries: {
    eyebrow: 'Hizmet Verdiğimiz Sektörler',
    heading: 'Profesyonel Tekstil Üretimi İçin',
    lead: 'Her sektör kumaşı farklı belirler. Bu sayfalar her birinde kararı neyin yönlendirdiğini ortaya koyar.',
    cta: { label: 'Tüm Sektörler', href: '/industries' },
  },

  sampleService: {
    eyebrow: 'Numune Hizmeti',
    heading: 'Görün. Hissedin. Belirleyin.',
    lead: 'Profesyonel alıcılar toplu siparişe geçmeden önce kumaşı değerlendirebilmelidir.',
    body: [
      'Tuşe, döküm ve yüzey fotoğraftan değerlendirilemez. Birden fazla ürün tek bir numune talebinde birleştirilebilir.',
    ],
    options: [
      { title: 'Swatch Talebi', body: 'Ürünün küçük bir parçası; tuşe ve konstrüksiyon için.' },
      { title: 'Numune Talebi', body: 'Daha büyük bir parça; döküm ve davranışın değerlendirilmesi gerektiğinde.' },
      { title: 'Renk Kartelası Talebi', body: 'Bir ürün için mevcut renk aralığı.' },
    ],
  },

  tradeLogistics: {
    eyebrow: 'Ticaret ve Lojistik',
    heading: 'Kumaş Seçiminden Nihai Teslimata.',
    lead: 'Hizmetimiz kumaş seçildiğinde sona ermez.',
    body: [
      'Profesyonel B2B siparişlerde ticari sevkiyat; siparişin ürününe, miktarına, destinasyonuna ve teslimat gereksinimine göre planlanır.',
    ],
    deliveryModes: [
      { title: 'Fabrikaya Teslim', body: 'Doğrudan üretim tesisinize.' },
      { title: 'Depoya Teslim', body: 'Belirlediğiniz depoya.' },
      { title: 'Ticari Adrese Teslim', body: 'Seçtiğiniz ticari teslimat noktasına.' },
    ],
    note: 'Teslim şekilleri teklif aşamasında bildirilir. Geçerli şartlar ürün, sipariş hacmi ve destinasyona göre teklif aşamasında belirlenir.',
  },

  bulkOrders: {
    eyebrow: 'Yüksek Metrajlı Siparişler',
    heading: 'Ölçek İçin Kurgulandı.',
    lead: 'Yüksek hacimli üretim için profesyonel kumaş tedariki.',
    body: [
      'Sürekli üretim yapan tekstil işletmeleri ve yüksek metrajlı kumaş ihtiyacı olan profesyonel müşteriler için aşağıdaki spesifikasyonu paylaşın; talep doğrudan kurumsal satış ekibimize iletilir.',
    ],
    fields: [
      'Kumaş / Ürün', 'Kompozisyon', 'Renk', 'Gramaj', 'En',
      'Talep Edilen Miktar', 'Talep Edilen Teslim Tarihi', 'Teslimat Ülkesi',
      'Teslimat Şehri', 'Üretim Uygulaması',
    ],
    cta: { label: 'Yüksek Metrajlı Talebinizi İletin', href: '/bulk-orders' },
  },

  responsible: {
    eyebrow: 'Sorumlu Tekstil',
    heading: 'Sorumlu Tercihler. Açık Bilgi.',
    lead: 'Genel çevre iddiaları yerine doğrulanabilir ürün bilgisi.',
    body: [
      'Sürdürülebilirlik iletişimimizi doğrulanamayan geniş iddialar üzerine kurmuyoruz. Bunun yerine bir özellik gerçekten bir ürüne aitse, o ürün üzerinde belirtiliyor.',
    ],
    attributes: [
      'Organik Elyaf', 'Geri Dönüştürülmüş Elyaf', 'Sertifikalı Malzeme',
      'İzlenebilir Ürünler', 'Sorumlu Malzeme Seçenekleri',
    ],
    note: 'Sertifika yalnızca ilgili ürün gerçekten sahipse gösterilir. Sertifikası olmayan bir üründe hiçbir sertifika logosu kullanılmaz.',
  },

  insights: {
    eyebrow: 'Insights',
    heading: 'Zamanla Biriken Tekstil Bilgisi.',
    lead: 'Ürün grubumuzun arkasındaki deneyimden çıkan, kumaş seçimine dair teknik rehberlik.',
    cta: { label: 'Insights’ı Okuyun', href: '/insights' },
  },

  corporateCta: {
    heading: 'Let’s Talk Fabric.',
    body: 'İster bir sonraki koleksiyonunuz için kumaş arıyor, ister yüksek metrajlı üretim planlıyor, ister belirli bir kumaşın peşinde olun — ekibimiz ihtiyacınızı görüşmeye hazır.',
    ctas: [
      { label: 'Teklif Alın', href: '/contact?topic=SALES' },
      { label: 'Kumaş Uzmanıyla Görüşün', href: '/contact' },
    ],
    footnote: 'Textile Expertise Since 2004.',
  },
}
