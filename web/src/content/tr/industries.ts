import type { IndustryContent } from '../schema'

const img = (slug: string, alt: string) => ({
  src: `/images/industries/${slug}.svg`,
  alt,
  width: 1600,
  height: 1067,
})

export const industries: Record<string, IndustryContent> = {
  'fashion-apparel': {
    slug: 'fashion-apparel',
    name: 'Moda ve Hazır Giyim',
    seo: {
      title: 'Moda ve Hazır Giyim Üretimi için Kumaşlar — JUSTEKS',
      description:
        'Moda markaları ve hazır giyim üreticileri için toptan kumaş tedariki: sezonluk koleksiyonlar için keten, pamuk, viskon ve moda kumaşları.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'Moda ve Hazır Giyim',
      lead: 'Tasarımı tuşe, döküm ve rengin taşıdığı sezonluk koleksiyonlar — ve kumaşın bir üretim takvimine dayanması gereken yer.',
    },
    overview: [
      'Moda ve hazır giyim programları bir görünüm etrafında kurulur ama bir takvime karşı teslim edilir. Kumaş kararı tam kesişimde durur: tasarım niyetini taşımalı, doğru miktarda zamanında ulaşmalı ve hacimde kesim, dikim ve apre boyunca öngörülebilir davranmalıdır.',
      'Çoğu koleksiyonda çalışma seti keten, pamuk, viskon ve moda konstrüksiyonlarıdır — krep, saten, jakar — günlük parçaları ise örme kaliteleri taşır. Aralarındaki seçim genellikle lif tercihiyle değil döküm ve gramajla belirlenir; bir seri kesinleşmeden önce numunenin önemli olmasının nedeni budur.',
    ],
    criticalProperties: [
      { title: 'Döküm', body: 'Silueti diğer her özellikten fazla belirler. Viskon dökülür, keten bedenden uzak durur, pamuk formu tutar.' },
      { title: 'Renk tutarlılığı', body: 'Partiler arası ton farkı koleksiyon genelinde göze çarpar; parti onayı seriyi korur.' },
      { title: 'Gramaj', body: 'Sezonu ve fiyat noktasını belirler, hangi konstrüksiyonların uygulanabilir olduğunu sınırlar.' },
      { title: 'Tekrarlanabilirlik', body: 'Devam eden bir ürün gelecek sezon muadilini değil aynı kumaşı ister.' },
    ],
    recommendedFabrics: ['linen', 'cotton', 'viscose', 'fashion', 'knitted'],
    image: img('fashion-apparel', 'Koleksiyon değerlendirmesi için sezon tonlarında dizilmiş moda kumaşları'),
  },

  shirting: {
    slug: 'shirting',
    name: 'Gömlek Üretimi',
    seo: {
      title: 'Gömlek Üreticileri için Gömleklik Kumaşlar — JUSTEKS',
      description:
        'Profesyonel gömlek üretimi için kumaş tedariki: günlük ve premium iplik numaralarında poplin, oxford, dimi ve keten gömleklik.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'Gömlek Üretimi',
      lead: 'Bir gömleğin premium mu sıradan mı okunacağına iplik numarası, apre ve telanın karar verdiği yer.',
    },
    overview: [
      'Gömlek üretimi alışılmadık ölçüde spesifikasyona dayalıdır. Askıda birebir aynı görünen iki gömlek arasında kumaş maliyeti bakımından üç kat fark olabilir ve bu farkı her şeyden önce iplik numarası yaratır. Yalnızca GSM üzerinden teklif veren bir üretici eksik bilgiyle teklif veriyordur.',
      'İkinci karar apre ve onun konstrüksiyonla etkileşimidir. Kolay ütü apreleri buruşmayı azaltır ama tuşeyi etkiler; likralı gömleklik kalıbı değiştirir ancak çekme değeri teyit edilmelidir; yaka telası ise sonradan değil kumaşla birlikte seçilmelidir, çünkü uyumsuzluk ilk birkaç yıkamadan sonra kabarma olarak ortaya çıkar.',
    ],
    criticalProperties: [
      { title: 'İplik numarası', body: 'Günlük bir gömlekliği premium olandan ayıran tek sayı.' },
      { title: 'Konstrüksiyon', body: 'Resmî düzgünlük için poplin, doku ve dayanıklılık için oxford, yumuşak döküm için dimi.' },
      { title: 'Tela uyumu', body: 'Yaka ve manşet telası kumaşla birlikte seçilmeli ve yıkama sonrası test edilmelidir.' },
      { title: 'Desen raporu', body: 'Çizgi ve ekose tüketimi artırır; payı teklifte yer almalıdır.' },
    ],
    recommendedFabrics: ['shirting', 'cotton', 'linen'],
    image: img('shirting', 'Poplin, oxford ve dimi yüzeylerini gösterecek şekilde katlanmış gömleklik kumaşlar'),
  },

  tailoring: {
    slug: 'tailoring',
    name: 'Terzilik ve Takım Elbise',
    seo: {
      title: 'Takım Elbise ve Blazer Üretimi için Kumaşlar — JUSTEKS',
      description:
        'Terzilik üreticileri için takım elbiselik, pantolonluk ve blazer kumaşları: yün takım elbiselik, polyester viskon, likralı kaliteler ve gabardin.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'Terzilik ve Takım Elbise',
      lead: 'Ruloda nasıl göründüğüne değil; ısı, buhar ve tela altında ne yaptığına göre değerlendirilen kumaş.',
    },
    overview: [
      'Terzilik üretimi başka hiçbir kategorinin kullanmadığı ölçütler uygular. Kumaş ısı ve nemle şekillendirilebilmeli, ütü kenarını tutmalı, yapıştırmalı veya kanvaslı bir ön yapıyı kabul etmeli ve bir günlük kullanımdan sonra geri dönebilmelidir. Fotoğrafta iyi duran ama ütü tutmayan bir kumaşın terzilik fabrikasında yeri yoktur.',
      'Yün bunların hepsini doğal olarak yaptığı için referans olmayı sürdürür; polyester viskon ise üniforma ve kurumsal programlar için hacimli üretimin cevabıdır. Likralı takım elbiselik modern kalıplarda ana akım hâline geldi ancak ütü altında hareket eder; bu nedenle çekme ve ütü davranışı düz swatch üzerinde değil dikilmiş numunede teyit edilir.',
    ],
    criticalProperties: [
      { title: 'Ütü tutma', body: 'Ütü kenarını alıp koruyabilme, terziliği tanımlayan özelliktir.' },
      { title: 'Çekme', body: 'Kesimden önce teyit edilir; dekatir işleminin standart olmasının nedeni budur.' },
      { title: 'Tela uyumu', body: 'Yapıştırma uyumsuzluğu ilk olarak yaka kırımında görünür.' },
      { title: 'Parça bazında gramaj', body: 'Pantolon kumaşı çoğu zaman eşleşen ceket kumaşından daha ağır belirlenir.' },
    ],
    recommendedFabrics: ['tailoring', 'wool', 'polyester'],
    image: img('tailoring', 'Kat çizgisi boyunca ütü kenarı görünen yün takım elbiselik kumaşlar'),
  },

  'casual-streetwear': {
    slug: 'casual-streetwear',
    name: 'Günlük Giyim ve Streetwear',
    seo: {
      title: 'Günlük Giyim ve Streetwear Üretimi için Kumaşlar — JUSTEKS',
      description:
        'Tişört, sweatshirt ve günlük giyim üretimi için süprem, iki iplik, polar ve denim kaliteleri; yüksek adetli üretime uygun.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'Günlük Giyim ve Streetwear',
      lead: 'Binlerce adet arasında tutarlılığın her şey olduğu yüksek adetli örme ve denim üretimi.',
    },
    overview: [
      'Günlük giyim ve streetwear üretimi örme kumaşlar ve denim üzerine kuruludur; ikisi de hacimde göründüklerinden daha az bağışlayıcıdır. Örmeler kolayca ölçü değiştirir, ham kenarında kıvrılır ve rulodan doğrudan kesilirse yan dikişte döner; bu yüzden kesim öncesi dinlendirme hacimde isteğe bağlı değildir.',
      'Gramaj ürün konumlandırmasını burada diğer tüm kategorilerden daha doğrudan taşır: 140 GSM süprem ile 200 GSM süprem farklı fiyat noktalarında farklı ürünlerdir, 320 GSM iki iplik ise yine başka bir üründür. Denim kendi karar setini ekler: ham mı yıkamalı mı ve modern kalıpların bağlı olduğu elastan oranı.',
    ],
    criticalProperties: [
      { title: 'Boyutsal kararlılık', body: 'Örmeleri kesimden önce dinlendirin; dönük yan dikiş kumaş kusuru değil işleme hatasıdır.' },
      { title: 'GSM konumlandırma', body: 'Tişört ve sweatshirtte kalite seviyesinin en net göstergesi gramajdır.' },
      { title: 'Geri toplama', body: 'Elastan oranı, oturan bir modelin gün boyu formunu koruyup koruyamayacağını belirler.' },
      { title: 'Baskı uyumu', body: 'Yüzey ve lif, hangi baskı yöntemlerinin uygulanabilir olduğunu belirler.' },
    ],
    recommendedFabrics: ['knitted', 'denim', 'cotton'],
    image: img('casual-streetwear', 'Şardonlu ve ilmekli arkaları gösteren süprem ve iki iplik kumaş istifi'),
  },

  workwear: {
    slug: 'workwear',
    name: 'İş Kıyafeti',
    seo: {
      title: 'İş Kıyafeti Kumaşları — Profesyonel Giysiler için Dayanıklı Kumaş — JUSTEKS',
      description:
        'İş kıyafeti üretimi için dayanıklı kumaşlar: pamuklu drill ve kanvas, polyester pamuk karışımları ve endüstriyel yıkamaya uygun teknik kaliteler.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'İş Kıyafeti',
      lead: 'Bir iş gününe, endüstriyel yıkamaya ve ondan sonraki vardiyaya göre belirlenen ürünler.',
    },
    overview: [
      'İş kıyafeti görünüme göre değil dayanıklılığa göre satın alınır. İlgili sayılar aşınma direnci, yırtılma mukavemeti ve kumaşın tekrarlanan ticari yıkamadan sonra nasıl davrandığıdır — evde mükemmel performans gösteren bir kumaş, haftada beş gün doksan derecede tamamen başarısız olabilir.',
      'Cevabın büyük bölümünü konstrüksiyon taşır. Sık dokunmuş pamuklu drill ve kanvas aşınmaya direnir, polyester pamuk karışımları boyutsal kararlılık ve daha hızlı kuruma ekler, takviyeli dokumalar zorlanan noktaları korur. İtici veya kaplamalı bir apre gerekiyorsa, zamanla azalan bir apre ile kumaşın içine kurulmuş bir kaplama arasındaki fark teklif öncesinde netleştirilmelidir.',
    ],
    criticalProperties: [
      { title: 'Aşınma direnci', body: 'Belirlenen ilk sayıdır; lifi, ipliği ve konstrüksiyonu birlikte yönlendirir.' },
      { title: 'Yıkama davranışı', body: 'Ticari yıkanan ürünlerde kumaş seçmeden önce yıkama programı ve sıcaklığı teyit edilmelidir.' },
      { title: 'Yırtılma mukavemeti', body: 'Küçük bir takılmanın sahada ürün kaybına dönüşmesini engeller.' },
      { title: 'Apre tipi', body: 'İtici apre zamanla azalır, kaplama kumaşın içindedir. Birbirinin yerine geçmez.' },
    ],
    recommendedFabrics: ['performance-technical', 'cotton', 'polyester', 'denim'],
    image: img('workwear', 'Takviyeli dokuma detayıyla kullanım tonlarında ağır pamuklu drill ve kanvas'),
  },

  uniforms: {
    slug: 'uniforms',
    name: 'Üniforma',
    seo: {
      title: 'Kurumsal ve Kurumsal Ölçekli Üniforma Programları için Kumaşlar — JUSTEKS',
      description:
        'Kurumsal üniforma programları için kumaş tedariki: polyester viskon takım elbiselik, gömleklik ve dayanıklı kolay bakım kaliteleri.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'Üniforma',
      lead: 'Binlerce adedin birebir aynı görünmesi gereken yer — bu sezon ve iki yıl sonra yeniden.',
    },
    overview: [
      'Üniforma programlarını tanımlayan şey tekrarlanabilirliktir. Aynı kumaş, aynı tonda, yıllarca sürebilen bir yayılım boyunca temin edilebilmeli ve her adet diğer her adet gibi görünmelidir. Bu gereksinim, başka açılardan ne kadar iyi performans gösterirse göstersin, partiler arası değişkenliği yüksek kumaşları devre dışı bırakır.',
      'Polyester viskon takım elbiselik ve kolay bakım gömleklik tam da bu nedenle baskındır: rengi ve ölçüyü korur, bir iş günü boyunca buruşmaya direnir ve ölçekte tutarlı üretilebilir. Konfor yine de önemlidir — bir üniforma sekiz saat giyilir — bu yüzden nefes alabilirlik ve esneklik göz ardı edilmez, dayanıklılıkla dengelenir.',
    ],
    criticalProperties: [
      { title: 'Ton tutarlılığı', body: 'Partiler arası fark, üniformalı bir ekipte anında göze çarpar.' },
      { title: 'Zaman içinde süreklilik', body: 'Program tekrar siparişlerde muadilini değil aynı ürünü ister.' },
      { title: 'Buruşma direnci', body: 'Üniforma vardiya sonunda da düzgün görünmelidir.' },
      { title: 'Bakım gereksinimleri', body: 'Evde mi endüstriyel mi yıkanacağı spesifikasyonu tümüyle değiştirir.' },
    ],
    recommendedFabrics: ['tailoring', 'shirting', 'polyester', 'performance-technical'],
    image: img('uniforms', 'Lacivert ve gri tonlarda düz dimi yüzeyli kurumsal üniforma kumaşları'),
  },

  hospitality: {
    slug: 'hospitality',
    name: 'Otel ve Restoran',
    seo: {
      title: 'Otel ve Restoranlar için Hospitality Tekstilleri — JUSTEKS',
      description:
        'Hospitality işletmeleri için kumaş tedariki: ön alan üniformaları, masa ve döşeme tekstilleri; ticari yıkama ve yoğun kullanıma uygun.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'Otel ve Restoran',
      lead: 'Aynı hafta içinde hem misafirin karşısına hem endüstriyel çamaşırhaneye çıkan tekstiller.',
    },
    overview: [
      'Hospitality tekstilleri aynı anda birbiriyle çelişen iki gereksinim taşır. Ön alanda özenli görünmelidirler — bu, bir mekânın kendini sunma biçiminin parçasıdır — arka alanda ise ev tipi kumaşların hiç karşılaşmadığı sıcaklık ve sıklıkta ticari yıkamaya dayanmalıdırlar.',
      'Bu birleşim alanı hızla daraltır. Üniformaları kolay bakım gömleklik ve polyester viskon takım elbiselik karşılar; döşeme ve mobilya kaliteleri konut değil proje seviyesi aşınma değerleriyle belirlenir. Bir mekânın yanmazlık yükümlülüğü varsa bu mevzuatla belirlenir ve kategori geneli için varsayılmadan ürün bazında teyit edilir.',
    ],
    criticalProperties: [
      { title: 'Ticari yıkama', body: 'Yıkama sıcaklığı ve sıklığı spesifikasyonu görünümden daha fazla belirler.' },
      { title: 'Proje aşınma değeri', body: 'Döşemelik kumaşlar konut değil proje seviyesi Martindale değeri ister.' },
      { title: 'Leke davranışı', body: 'Renk ve konstrüksiyon, mekânın günlük dökülmelerle nasıl başa çıkacağını belirler.' },
      { title: 'Mevzuat gereksinimleri', body: 'Yanmazlık ürün ve mekân bazında teyit edilir, asla varsayılmaz.' },
    ],
    recommendedFabrics: ['shirting', 'tailoring', 'interior', 'performance-technical'],
    image: img('hospitality', 'Gevrek gömleklik ve daha ağır döşemelik kumaşı bir arada gösteren hospitality tekstilleri'),
  },

  'interior-upholstery': {
    slug: 'interior-upholstery',
    name: 'İç Mekân ve Döşeme',
    seo: {
      title: 'Proje İşleri için Döşemelik ve İç Mekân Kumaşları — JUSTEKS',
      description:
        'İç mekân ve proje işleri için döşemelik, perdelik ve dekoratif kumaşlar; aşınma değeri, ışık davranışı ve en ölçüsüne göre belirlenir.',
    },
    intro: {
      eyebrow: 'Sektörler',
      heading: 'İç Mekân ve Döşeme',
      lead: 'Beden için değil mekân için belirlenir: aşınma, ışık ve perde boyu dökümden önce gelir.',
    },
    overview: [
      'İç mekân işi hazır giyimin önceliklerini tersine çevirir. Bir döşemelik kumaş önce Martindale devir sayısıyla aşınma direncine göre belirlenir ve proje ortamları, aynı oturma yüzeyini yüzlerce kişi kullandığı için konut uygulamalarının hiç ihtiyaç duymadığı değerler ister. Dikiş mukavemeti ve boyutsal kararlılık aynı gereksinimden türer.',
      'Perde ve drapaj ise ışığa göre belirlenir — şeffaf, yarı karartma veya tam karartma — ve perde boyuna göre; çünkü asıldıktan sonra gevşeyen bir perde gözle görülür şekilde uzar. En burada hazır giyimden daha önemlidir: iç mekân kumaşları çoğu zaman tam da perde boyunda dikiş oluşmasın diye daha geniş tedarik edilir.',
    ],
    criticalProperties: [
      { title: 'Martindale değeri', body: 'Proje ve konut kullanımı kıyaslanamaz; gereken değeri belirtin.' },
      { title: 'Işık davranışı', body: 'Şeffaf, yarı karartma veya tam karartma konstrüksiyonu tümüyle değiştirir.' },
      { title: 'En', body: 'Geniş kumaş perde boyunda dikişi azaltır ve tüketimi değiştirir.' },
      { title: 'Hav yönü', body: 'Havlı kumaşlar tüm parçada tek yönde kesilmelidir.' },
    ],
    recommendedFabrics: ['interior', 'fashion', 'cotton'],
    image: img('interior-upholstery', 'Jakar ve kadife yüzeylerini gösterecek şekilde katmanlanmış döşemelik ve perdelik kumaşlar'),
  },
}
