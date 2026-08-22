import type { CollectionContent } from '../schema'

const img = (slug: string, alt: string) => ({
  src: `/images/collections/${slug}.webp`,
  alt,
  width: 1280,
  height: 960,
})

// Koleksiyon adları marka adlandırmasıdır ve İngilizce korunur.
export const collections: Record<string, CollectionContent> = {
  linen: {
    slug: 'linen',
    name: 'The Linen Collection',
    seo: {
      title: 'The Linen Collection — JUSTEKS',
      description:
        'Hafif gömleklik gramajlardan keten kanvasa uzanan seçilmiş keten koleksiyonu; keten pamuk ve keten viskon karışımları dahil.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Linen Collection',
      lead: 'Ketenin tüm çalışma aralığı — yarı şeffaf bluz gramajlarından yapısal kanvasa.',
    },
    overview: [
      'The Linen Collection, sezondan sezona döndüğümüz keten kalitelerini bir araya getirir. Görünüme göre değil gramaja göre düzenlenmiştir; çünkü bir ketenin bluza mı, gömleğe mi, ceketa mı yoksa döşemeye mi ait olduğuna gramaj karar verir.',
      'Saf ketenin yanında koleksiyon, keteni ölçekte pratik kılan karışımları da taşır: daha yumuşak tuşe ve azalan buruşma için keten pamuk, gevreklikten çok dökümün önemli olduğu yerlerde keten viskon.',
    ],
    includes: ['Keten', 'Gömleklik'],
    relatedCategories: ['linen', 'shirting'],
    image: img('linen', 'Dökümünü gösterecek şekilde spiral katlanmış bej keten'),
  },

  shirting: {
    slug: 'shirting',
    name: 'The Shirting Collection',
    seo: {
      title: 'The Shirting Collection — JUSTEKS',
      description:
        'Profesyonel gömlek üretimi için seçilmiş poplin, oxford, dimi ve keten gömleklik kaliteleri; günlükten premium iplik numaralarına.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Shirting Collection',
      lead: 'Yaka, manşet ve gün boyu kullanım için tasarlanmış kumaşlar.',
    },
    overview: [
      'The Shirting Collection, gömlek üreticilerinin gerçekten talep ettiği konstrüksiyonlar üzerine kuruludur: resmî düzgünlük için poplin, doku ve dayanıklılık için oxford, daha yumuşak döküm ve buruşma direnci için dimi, sıcak iklim üretimi için keten gömleklik.',
      'Kaliteler yalnızca örgüye göre değil iplik numarasına göre de gruplanmıştır; çünkü günlük bir gömlekle premium bir gömlek arasındaki fark, kumaş kesim masasına ulaşmadan çok önce orada belirlenir.',
    ],
    includes: ['Gömleklik', 'Pamuk', 'Keten'],
    relatedCategories: ['shirting', 'cotton', 'linen'],
    image: img('shirting', 'Depo raflarında istiflenmiş desenli gömleklik kumaş topları'),
  },

  tailoring: {
    slug: 'tailoring',
    name: 'The Tailoring Collection',
    seo: {
      title: 'The Tailoring Collection — JUSTEKS',
      description:
        'Konstrüksiyon altındaki davranışına göre seçilmiş takım elbiselik, pantolonluk ve blazer kumaşları: yün, polyester viskon ve likralı kaliteler.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Tailoring Collection',
      lead: 'Ruloda nasıl göründüğüne değil, ütü altında ne yaptığına göre seçilen kumaşlar.',
    },
    overview: [
      'The Tailoring Collection, ütü formunu tutan kumaşları toplar: dört mevsim gramaj aralığında yün takım elbiselik, hacimli ve üniforma programları için polyester viskon, modern kalıplar için likralı takım elbiselik.',
      'Pantolonluk ve blazer kaliteleri ayrı listelenir; çünkü çoğu programda bunlar aynı kumaş değildir — pantolon daha sert yıpranır ve genellikle altına oturduğu ceketten daha ağır belirlenir.',
    ],
    includes: ['Takım Elbiselik', 'Yün'],
    relatedCategories: ['tailoring', 'wool'],
    image: img('tailoring', 'Açık renk bir yüzeye serilmiş koyu gri takım elbiselik kumaş'),
  },

  natural: {
    slug: 'natural',
    name: 'The Natural Collection',
    seo: {
      title: 'The Natural Collection — JUSTEKS',
      description:
        'Keten, pamuk, yün ve viskon genelinde doğal ve selülozik lifler; tuşe, nefes alabilirlik ve zamanla yaşlanma biçimine göre seçilmiş.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Natural Collection',
      lead: 'Üretilmiş değil yetiştirilmiş lifler — tuşe, nefes alabilirlik ve zamanla kazandıkları karakter için seçildi.',
    },
    overview: [
      'The Natural Collection tek bir kategorinin içinde değil, kategoriler arasında ilerler. Seçimin gerekçesinin doğrudan lifin kendisi olduğu keten, pamuk, yün ve selülozik viskon kalitelerini bir araya getirir.',
      'Bir brief teknik performans gereksinimleriyle değil malzeme hikâyesi ve tene değen konforla başlıyorsa, başlanacak koleksiyon budur.',
    ],
    includes: ['Keten', 'Pamuk', 'Yün', 'Viskon'],
    relatedCategories: ['linen', 'cotton', 'wool', 'viscose'],
    image: img('natural', 'Eğrilmeden önceki ham pamuk kozalarını tutan eller'),
  },

  essential: {
    slug: 'essential',
    name: 'The Essential Collection',
    seo: {
      title: 'The Essential Collection — JUSTEKS',
      description:
        'Pamuk, viskon, polyester ve örme kalitelerinde çekirdek tekrar ürünler — bir üretim programını sezondan sezona taşıyan kumaşlar.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Essential Collection',
      lead: 'Bir üretim programının üzerine kurulduğu tekrar kaliteleri.',
    },
    overview: [
      'The Essential Collection işin çekirdeğidir: güvenilir şekilde tekrar eden ve hacimde stoktan veya siparişe göre üretilen pamuklu poplin ve dimi, viskon krep, polyester konstrüksiyonlar ve örme kaliteleri.',
      'Bunlar yenilik için değil tutarlılık için seçilen kumaşlardır — alıcının on iki ay sonra aynı kumaşa, aynı tonda ihtiyaç duyduğu yer.',
    ],
    includes: ['Pamuk', 'Viskon', 'Polyester', 'Örme'],
    relatedCategories: ['cotton', 'viscose', 'polyester', 'knitted'],
    image: img('essential', 'Yumuşak kıvrımlar hâlinde yerleştirilmiş krem rengi kumaş'),
  },

  performance: {
    slug: 'performance',
    name: 'The Performance Collection',
    seo: {
      title: 'The Performance Collection — JUSTEKS',
      description:
        'Ölçülebilir özelliklere göre belirlenen teknik kaliteler: su itici, rüzgâr geçirmez, kaplamalı, esnek performans ve yüksek dayanımlı kumaşlar.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Performance Collection',
      lead: 'Görünüme göre değil ölçülebilir özelliklere göre seçildi.',
    },
    overview: [
      'The Performance Collection, neye dayanması gerektiğine göre belirlenen kumaşları kapsar: su iticilik ve kaplamalar, rüzgâr direnci, aşınma dayanımı ve geri toplamalı esneklik.',
      'Bu kaliteler sayılara göre satın alındığı için her biri önem taşıyan özellikleriyle sunulur; zamanla azalan bir apre ile kumaşın içine kurulmuş bir kaplama veya membran arasındaki fark açıkça belirtilir.',
    ],
    includes: ['Performans ve Teknik', 'Polyester', 'Takım Elbiselik'],
    relatedCategories: ['performance-technical', 'polyester', 'tailoring'],
    image: img('performance', 'İşlem görmüş çizgili kumaşın yüzeyinde duran su damlaları'),
  },

  workwear: {
    slug: 'workwear',
    name: 'The Workwear Collection',
    seo: {
      title: 'The Workwear Collection — JUSTEKS',
      description:
        'İş kıyafeti ve üniforma üretimi için dayanıklı kumaşlar: pamuklu drill ve kanvas, polyester pamuk karışımları, denim ve endüstriyel yıkanabilir kaliteler.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Workwear Collection',
      lead: 'İşe, yıkamaya ve bir sonraki vardiyaya dayanması gereken kumaşlar.',
    },
    overview: [
      'The Workwear Collection dayanıklılık ve yıkama etrafında kurulmuştur. Pamuklu drill ve kanvas, tekrarlanan endüstriyel yıkama için üretilmiş polyester pamuk karışımları ve moda programlarında değil iş kıyafetinde kullanılan denim kalitelerini taşır.',
      'Ürünler ticari olarak yıkanıyorsa — hospitality, sağlık, endüstriyel üniforma — seçimi yıkama programı belirler ve bir kumaş önerilmeden önce bu teyit edilir.',
    ],
    includes: ['Pamuk', 'Denim', 'Performans ve Teknik', 'Polyester'],
    relatedCategories: ['cotton', 'denim', 'performance-technical', 'polyester'],
    image: img('workwear', 'Sık dokulu ağır kahverengi kanvasın yakın çekimi'),
  },

  interior: {
    slug: 'interior',
    name: 'The Interior Collection',
    seo: {
      title: 'The Interior Collection — JUSTEKS',
      description:
        'Proje ve konut iç mekânları için döşemelik, perdelik ve dekoratif kumaşlar; kanvas, kadife ve jakar kaliteleri dahil.',
    },
    intro: {
      eyebrow: 'Koleksiyonlar',
      heading: 'The Interior Collection',
      lead: 'Mekân için belirlendi: önce aşınma, ışık davranışı ve perde boyu.',
    },
    overview: [
      'The Interior Collection, proje ve konut işleri için döşemelik, perdelik ve dekoratif kaliteleri kapsar; kanvas, kadife ve jakar konstrüksiyonlar dahildir.',
      'Döşemelik kaliteler aşınma değeriyle, perdelik kaliteler ışık davranışıyla sunulur; çünkü bir proje sorumlusunun her şeyden önce çalıştığı iki sayı bunlardır.',
    ],
    includes: ['İç Mekân', 'Moda Kumaşları'],
    relatedCategories: ['interior', 'fashion'],
    image: img('interior', 'Dikey dökümünü gösterecek şekilde aydınlatılmış bej beyaz çizgili perdelik'),
  },
}
