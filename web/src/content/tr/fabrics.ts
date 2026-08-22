import type { FabricCategoryContent } from '../schema'

const img = (slug: string, alt: string) => ({
  src: `/images/fabrics/${slug}.jpg`,
  alt,
  width: 1600,
  height: 1067,
})

// Alt tür adları (types) sektörde İngilizce ticari adlarıyla kullanıldığı için
// çevrilmez; açıklama metinleri Türkçedir.
export const fabrics: Record<string, FabricCategoryContent> = {
  linen: {
    slug: 'linen',
    name: 'Keten',
    seo: {
      title: 'Keten Kumaşlar — Toptan Birleşik Krallık Menşeli Keten',
      description:
        'Gömleklik, elbiselik ve premium hazır giyim için Birleşik Krallık menşeli keten kumaşlar. %100 keten, keten pamuk ve keten viskon karışımları.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Keten',
      lead: 'Her yıkamada karakteri artan bir lif — kuru bir tuşe, ıslakken yüksek mukavemet ve sıcak iklim giyiminde eşsiz bir performans.',
    },
    overview: [
      'Keten, keten bitkisinin sak liflerinden eğrilir. Bu lifler uzun, içi boş ve kalınlığı düzensizdir; ketenin diğer selülozik liflerden farklı davranmasının nedeni budur. Nemi hızla emer, aynı hızla bırakır ve yüzeyinde kusur değil doku olarak okunan doğal bir slub taşır. Aynı düzensizlik, ketenin fotoğraftan değil tuşe ve dökümünden değerlendirilmesi gerektiği anlamına gelir.',
      'Gramaj, diğer her şeyi belirleyen karardır. 120 GSM altında keten yarı şeffaflaşır ve bluz, eşarp ve katmanlı elbiselere aittir. 140–200 GSM aralığı gömleklik, elbiselik ve yapısız ceketlerin çalışma alanıdır. 250 GSM üzerinde keten mimari bir karakter kazanır: kanvas, döşemelik ve yapılı dış giyim. Karışım denklemi yeniden değiştirir: pamuk tuşeyi yumuşatır ve buruşmayı azaltır, viskon akıcılık ve döküm katar; her ikisi de kumaşı üretim hattında daha bağışlayıcı kılar.',
      'Buruşma ketende bir kusur değildir; lifin doğal davranışıdır. Bunun ne kadarının müşteriye ulaşacağını apre belirler. Yumuşak veya enzim yıkama ipliği gevşetir ve kumaşa o yaşanmış tuşeyi hemen kazandırır; sert apre ise kalıplı formlar için gövdeyi korur. Apreyi teklif aşamasında belirtin — tuşeyi, çekme payını ve ürünün zamanla nasıl yaşlanacağını doğrudan değiştirir.',
    ],
    types: [
      '100% Linen', 'Linen Cotton', 'Linen Viscose', 'Washed Linen',
      'Lightweight Linen', 'Medium Weight Linen', 'Heavy Linen',
      'Linen Canvas', 'Linen Shirting', 'Linen Suiting', 'Linen Blends',
    ],
    typicalGsm: '110 – 320 GSM',
    typicalWidth: '140 – 150 cm',
    construction: 'Dokuma — bezayağı, dimi ve kanvas konstrüksiyonlar',
    handFeel: 'Kuru ve dokulu, kullanım ve yıkamayla yumuşayan',
    applications: [
      'Gömleklik', 'Elbiselik', 'Pantolonluk', 'Yapısız ceketler',
      'Yazlık takım elbise', 'Premium hazır giyim', 'Ağır gramajlarda döşemelik',
    ],
    productionNotes: [
      'Ön yıkamalı değilse pamuğa göre daha yüksek çekme payı bırakın; kesim öncesi apreyi teyit edin.',
      'Slub dağılımı partiler arasında değişir — büyük partilerde swatch değil üretim numunesi onaylatın.',
      'Düşük gramajlı ketenler kolay saçaklanır; overlok veya fransız dikiş ürünü yıkamada korur.',
    ],
    relatedCollections: ['linen', 'natural', 'shirting'],
    image: img('linen', 'Keten dokumanın yakın çekimi, keten ipliğinin karakteristik slub yapısı görünüyor'),
  },

  cotton: {
    slug: 'cotton',
    name: 'Pamuk',
    seo: {
      title: 'Pamuklu Kumaşlar — Toptan Poplin, Dimi, Kanvas ve Süprem',
      description:
        'Poplin, dimi, kanvas, vual, saten, drill ve süprem konstrüksiyonlarda Birleşik Krallık menşeli pamuklu kumaşlar. Organik ve likralı pamuk seçenekleri.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Pamuk',
      lead: 'Hazır giyim üretiminin en çok yönlü lifi — kumaşın ne olacağına lifin değil konstrüksiyonun karar verdiği kategori.',
    },
    overview: [
      'Pamuk kısa ştapelli bir selülozik liftir ve ticari olarak önemli olan hemen her şey lif aşamasından sonra belirlenir: ştapel uzunluğu, iplik numarası, dokuma ve apre. Uzun ştapelli bir pamuk ince katlı iplik hâline getirildiğinde pürüzsüz ve parlak bir poplin verir; aynı lif kalın tek kat iplikle drill olarak dokunduğunda iş kıyafeti kumaşı olur. Tedarikçiye yalnızca pamuk demek neredeyse hiçbir şey anlatmaz; 2/100 iplikte 120 GSM poplin demek her şeyi anlatır.',
      'Konstrüksiyon pamuğun pratik dilidir. Poplin, ince enine rapor veren sık bir bezayağıdır; gevrek ve gömlek yüzlüdür. Dimi çapraz bir çizgi verir, dökümü yumuşatır ve kiri gizler; pantolon ve iş kıyafetinde baskın olmasının nedeni budur. Kanvas ve drill daha ağır ve daha sıktır. Vual açık ve yarı şeffaftır; saten çözgüyü atkı üzerinde yüzdürerek yüzey parlaklığı verir; süprem dokuma değil örmedir ve esneklik ile geri toplama getirir.',
      'Apre nihai karakteri belirler. Merserizasyon parlaklığı ve boya alımını artırır, şardonlama kışlık gömleklik için yumuşak bir hav kaldırır, şeftalileme süet benzeri bir yüzey verir. Yüzde iki-üç elastan pantolon ve gömlekte kalıbı dönüştürür ancak çekme ve ütü davranışını değiştirir; varsayılmak yerine teyit edilmelidir.',
    ],
    types: [
      '100% Cotton', 'Cotton Poplin', 'Cotton Twill', 'Cotton Canvas',
      'Cotton Voile', 'Cotton Satin', 'Cotton Jersey', 'Cotton Drill',
      'Cotton Gabardine', 'Stretch Cotton', 'Brushed Cotton',
      'Organic Cotton', 'Cotton Blends',
    ],
    typicalGsm: '80 – 400 GSM',
    typicalWidth: '145 – 160 cm',
    construction: 'Dokuma ve örme — poplin, dimi, kanvas, drill, saten, süprem',
    handFeel: 'İplik numarası ve apreye göre yumuşaktan gevreğe',
    applications: [
      'Gömleklik', 'Tişört', 'Elbiselik', 'Pantolonluk', 'Ceketlik',
      'İş kıyafeti', 'Üniforma', 'Ev tekstili',
    ],
    productionNotes: [
      'Tuşe ve dayanım için iplik numarası lif menşeinden daha belirleyicidir — GSM ile birlikte belirtin.',
      'Reaktif boyalı koyu tonlarda yıkama denemesi gerekir; koyu dimilerde sürtme haslığı ilk sorun noktasıdır.',
      'Likralı pamuk ütüden sonra gevşer — payı kumaş spesifikasyonuna değil kalıba yazın.',
    ],
    relatedCollections: ['essential', 'natural', 'shirting'],
    image: img('cotton', 'Pamuklu poplin makro detayı, ince ve sık dokunmuş bezayağı yüzey'),
  },

  viscose: {
    slug: 'viscose',
    name: 'Viskon',
    seo: {
      title: 'Viskon Kumaşlar — Toptan Krep, Dimi, Saten ve Baskılı Viskon',
      description:
        'Elbise, bluz ve astar için akıcı dökümlü viskon kumaşlar. Krep, dimi, saten, baskılı ve süprem viskon ile viskon keten karışımları.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Viskon',
      lead: 'Her şeyden önce tek bir nedenle seçilen rejenere selülozik: aynı fiyat aralığında hiçbir doğal lifin veremediği döküm.',
    },
    overview: [
      'Viskon, selülozun filamana yeniden dönüştürülmesiyle üretilir; bu, doğal ştapel bir lifin sunamayacağı bir kontrol düzeyi sağlar. Ortaya çıkan iplik pürüzsüz, yüksek emicilikte ve boyayı olağanüstü derinlikte alan bir ipliktir — baskılı viskon, aynı desenin pamukta kaybedeceği renk ve netliği korur. Keten bedenden uzak durur, pamuk formu tutar; viskon ise dökülür. Elbise, bluz, bol paça pantolon ve astarda bulunmasının tek nedeni bu akıcılıktır.',
      'Bunun bedeli yaş mukavemettir. Viskon lifleri ıslandığında çekme mukavemetinin önemli bir bölümünü kaybeder; bu nedenle ürünün bakım talimatı gerçeği yansıtmalı ve üretimde yaş işlemler dikkatli yürütülmelidir. Yaygın çözüm karışımdır: keten ile viskon dökümü korurken kuru tuşe ve yapı ekler, elastan ile viskon oturan formlar için geri toplamayı geri kazandırır.',
      'Konstrüksiyon karakteri belirgin şekilde değiştirir. Krep ince bir tane verir, dikiş büzülmesini gizler ve elbiselerde çok iyi dökülür. Dimi kumaşı pantolon için ağırlaştırır. Saten gece giyimi ve astar için yüzey parlaklığı getirir. Süprem rahat siluetler için esneklik ekler.',
    ],
    types: [
      '100% Viscose', 'Viscose Crepe', 'Viscose Twill', 'Viscose Satin',
      'Printed Viscose', 'Viscose Jersey', 'Viscose Linen', 'Viscose Blends',
    ],
    typicalGsm: '90 – 220 GSM',
    typicalWidth: '140 – 150 cm',
    construction: 'Dokuma ve örme — krep, dimi, saten ve süprem',
    handFeel: 'Serin, pürüzsüz ve akıcı',
    applications: [
      'Elbiselik', 'Bluzluk', 'Bol paça pantolon', 'Astarlık',
      'Baskılı koleksiyonlar', 'Resort ve özel gün giyimi',
    ],
    productionNotes: [
      'Viskon ıslakken zayıflar — agresif yaş işlemlerden kaçının ve bakım koşullarını net belirtin.',
      'Gevşeme çekmesi yaygındır; kumaşı rulodan doğrudan kesmek yerine dinlendirin.',
      'İnce kreplerde dikiş kayması görülür; üretim numunesinde dikiş yapısını teyit edin.',
    ],
    relatedCollections: ['essential', 'natural'],
    image: img('viscose', 'Nötr zemin üzerinde yumuşak dikey kıvrımlarla dökülen viskon kumaş'),
  },

  polyester: {
    slug: 'polyester',
    name: 'Polyester',
    seo: {
      title: 'Polyester Kumaşlar — Toptan Dokuma, Krep, Saten ve Süprem',
      description:
        'Yüksek adetli hazır giyim üretimi için polyester kumaşlar: dokuma, krep, saten, dimi, şifon ve süprem konstrüksiyonlar, likralı ve geri dönüştürülmüş seçenekler.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Polyester',
      lead: 'Yüksek adetli üretimin iş gören lifi — boyutsal olarak kararlı, renk haslığı yüksek, yetiştirilmiş değil mühendislik ürünü.',
    },
    overview: [
      'Polyester sentetik bir filamandır ve ticari üstünlüğü tutarlılıktır. Lif hasat edilmek yerine ekstrüde edildiği için partiler arası farklılık en aza iner, renk yüksek haslıkta dispers boyayla verilir ve kumaş yıkama ve kullanım boyunca ölçüsünü korur. Sezondan sezona tekrar eden programlar veya binlerce adette birebir aynı görünmesi gereken üniformalar için bu öngörülebilirlik, her tuşe tartışmasından daha değerlidir.',
      'Günümüz polyesteri artık eski kuşakların sert tuşesiyle tanımlanmıyor. Mikrofilaman iplikler, tekstüre işlemi ve şeftalili apreler gerçek yumuşaklıkta ve mat yüzeyli kumaşlar veriyor; polyester krepler döküm konusunda artık doğrudan viskonla yarışıyor. Farkın sürdüğü yer nemdir: polyester su emmez, bu da onu hızlı kuruyan ve boyutsal olarak kararlı kılar ancak konstrüksiyon nem transferi için tasarlanmadıkça ten üzerinde daha az nefes alır.',
      'Tüketici sonrası PET atıklarından eğrilen geri dönüştürülmüş polyester artık uzmanlık değil standart bir seçenektir ve çoğu konstrüksiyonda virgin polyesterle karşılaştırılabilir performans verir. Geri dönüştürülmüş içerik ticari bir iddia olarak kullanılacaksa, kategori geneline değil o spesifik ürüne ait sertifikaya dayandırılmalıdır.',
    ],
    types: [
      'Polyester Woven', 'Polyester Crepe', 'Polyester Satin',
      'Polyester Twill', 'Polyester Chiffon', 'Polyester Jersey',
      'Stretch Polyester', 'Recycled Polyester',
    ],
    typicalGsm: '60 – 300 GSM',
    typicalWidth: '145 – 160 cm',
    construction: 'Dokuma ve örme — krep, saten, dimi, şifon, süprem',
    handFeel: 'Tekstüre ve apreye göre pürüzsüzden mata',
    applications: [
      'Yüksek adetli hazır giyim', 'Bluz ve elbiselik', 'Üniforma', 'İş kıyafeti',
      'Astarlık', 'Spor giyim', 'Dış giyim kabuk kumaşı',
    ],
    productionNotes: [
      'Dispers boyalar ısı altında süblimleşebilir — ütü ve transfer baskı sıcaklıklarını üretim öncesi teyit edin.',
      'Kuru ortamda statik yüklenme yaygındır; astarlarda antistatik apre belirtmeye değer.',
      'Geri dönüştürülmüş içerik yalnızca o ürüne ait sertifika varsa beyan edilmelidir.',
    ],
    relatedCollections: ['essential', 'performance', 'workwear'],
    image: img('polyester', 'İnce polyester krep yüzeyi, mat ve düzgün dokulu bir dokuma gösteriyor'),
  },

  wool: {
    slug: 'wool',
    name: 'Yün',
    seo: {
      title: 'Yünlü Kumaşlar — Toptan Takım Elbiselik, Kabanlık ve Yün Karışımları',
      description:
        'Takım elbise ve dış giyim için Birleşik Krallık menşeli yünlü kumaşlar: takım elbiselik yün, kabanlık yün, hafif ve şardonlu yün, yün kaşmir karışımları.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Yün',
      lead: 'Terziliğin üzerine kurulduğu lif — ütü formunu tutar, buruşmadan geri döner, nefes alırken yalıtır.',
    },
    overview: [
      'Yün, doğal kıvrımı ve pullu yüzeyi olan bir protein liftir. Kıvrım havayı hapseder; yünün görece düşük gramajlarda yalıtım yapmasının nedeni budur. Lifin elastikiyeti ise bir yün ürünün gece boyunca buruşukluktan geri dönmesini, ketenin dönmemesini açıklar. Terzilikte belirleyici özellik ise başkadır: yün ısı ve nemle şekillendirilebilir ve bu şekli tutar. Bir ceketin bedenden sarkmak yerine bedeni takip etmesini sağlayan şey budur.',
      'Mikron değeri ve iplik yapısı, iki yünü herhangi bir etiketten çok daha fazla ayırır. İnce mikron daha yumuşak tuşe ve temiz bir yüzey verir; premium takım elbiselik için uygundur. Kalın mikron dayanıklılık ve daha kuru bir tuşe getirir; kabanlık ve kırsal kumaşlara yakışır. Paralel yatacak şekilde taranan kamgarn iplikler terzilikte beklenen pürüzsüz ve gevrek yüzeyi üretir; kardelenmiş ve kabarık yünlü iplikler ise palto ve ceketlerde kullanılan dolgun ve sıcak kumaşları verir.',
      'Gramaj doğrudan sezona ve uygulamaya karşılık gelir. 200–250 GSM civarı dört mevsim takım elbiselik aralığıdır. 180 GSM dolayındaki hafif kumaşlar sıcak iklim terziliğine aittir ancak dikkatli konstrüksiyon ister. 350 GSM ve üzeri kabanlık gramajlar dış giyimin gerektirdiği gövdeyi taşır. Kaşmir karışımı yumuşaklığı ve fiyatı yükseltir; polyester karışımı buruşma direncini artırır ve maliyeti düşürür.',
    ],
    types: [
      '100% Wool', 'Wool Blends', 'Suiting Wool', 'Coating Wool',
      'Lightweight Wool', 'Brushed Wool', 'Wool Cashmere Blends',
    ],
    typicalGsm: '180 – 600 GSM',
    typicalWidth: '150 – 160 cm',
    construction: 'Dokuma — kamgarn ve yünlü, bezayağı, dimi ve flanel',
    handFeel: 'Kamgarnda kuru ve dirençli, yünlüde dolgun ve yumuşak',
    applications: [
      'Takım elbise', 'Blazer', 'Pantolon', 'Palto',
      'Yapılı ceket', 'Üniforma', 'Premium terzilik',
    ],
    productionNotes: [
      'Yün dinlendirilmeli ve doğru buhar basıncıyla ütülenmelidir; yetersiz ütülenmiş dikiş en sık görülen terzilik hatasıdır.',
      'Kesimden önce çekme ve apre davranışını teyit edin — dekatir işlemi standart uygulamadır.',
      'Sezon aşırı stoklanan yünde güve ve depolama koruması önemlidir.',
    ],
    relatedCollections: ['tailoring', 'natural'],
    image: img('wool', 'Takım elbiselik yün kumaş detayı, ince kamgarn dimi çizgisi görünüyor'),
  },

  denim: {
    slug: 'denim',
    name: 'Denim',
    seo: {
      title: 'Denim Kumaşlar — Toptan Ham, Yıkamalı ve Likralı Denim',
      description:
        'Hafif gömleklik gramajlardan 14 oz ağır konstrüksiyonlara denim kumaşlar: pamuklu denim, likralı denim, ham ve yıkamalı denim.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Denim',
      lead: 'Yüzeyinde indigo, altında beyaz taşıyan çözgü yüzlü pamuklu dimi — denimin başka hiçbir kumaş gibi yaşlanmamasının nedeni.',
    },
    overview: [
      'Denimi tanımlayan rengi değil konstrüksiyonudur. Çözgü iplikleri geleneksel olarak indigo ile boyanmış, atkısı boyasız bırakılmış çözgü yüzlü bir dimidir. İndigo bir halka boyadır: ipliğin içine nüfuz etmek yerine dışında oturur. Yüzey kullanım sırasında aşındıkça beyaz çekirdek giderek açığa çıkar; denimin dikiş, cep ve diz hatlarında hasar değil karakter olarak okunan bir solma vermesinin nedeni tam olarak budur.',
      'Gramaj yarda kare başına ons olarak verilir ve uygulamanın tamamını belirler. 6–8 oz hafif denim gömleklik gibi davranır, gömlek ve elbiseye uygundur. 10–12 oz aralığı jean için ana akımdır ve yapı ile konforu dengeler. 13 oz üzerinde denim sertleşir ve dikimi zorlaşır; bu gramaj, giyenin ürünü yavaş yavaş kendine oturtacağı ham denim programları için bilinçli olarak seçilir.',
      'Elastan kategoriyi ticari olarak değiştirdi. Yüzde iki-üç, modern siluetlerde kalıbı ve geri toplamayı dönüştürür; ancak yıkamayı ve ürünün gün içinde nasıl gevşediğini de değiştirir. Ham ile yıkamalı ayrı bir karardır: ham denim sert ve işlemsiz sevk edilir, yıkamalı denim ise çekmesi ve karakterinin büyük bölümü çözülmüş olarak gelir.',
    ],
    types: [
      'Cotton Denim', 'Stretch Denim', 'Raw Denim', 'Washed Denim',
      'Lightweight Denim', 'Medium Weight Denim', 'Heavy Denim',
    ],
    typicalGsm: '200 – 480 GSM (yaklaşık 6 – 14 oz)',
    typicalWidth: '150 – 160 cm',
    construction: 'Dokuma — halka boyalı çözgü ile çözgü yüzlü dimi',
    handFeel: 'Hamken sert ve kuru, yıkamayla giderek yumuşayan',
    applications: [
      'Jean', 'Ceket', 'Etek', 'Hafif gramajlarda gömlek',
      'İş kıyafeti', 'Günlük giyim ve streetwear',
    ],
    productionNotes: [
      'Ham denim ilk yıkamada belirgin çeker — kalıp payları hedeflenen yıkamaya göre belirlenmelidir.',
      'İndigo sürtme haslığı açık renk ürünlere ve döşemeye geçer; bunu bakım bilgisinde belirtin.',
      'Ağır denimde doğru iğne ve iplik şarttır; 14 oz kumaşta atlayan dikiş kumaş kusuru değil makine ayarı sorunudur.',
    ],
    relatedCollections: ['essential', 'workwear'],
    image: img('denim', 'İndigo denim diminin yakın çekimi, çapraz dokuma ve beyaz atkı görünüyor'),
  },

  knitted: {
    slug: 'knitted',
    name: 'Örme Kumaşlar',
    seo: {
      title: 'Örme Kumaşlar — Toptan Süprem, Interlock, Ribana ve İki İplik',
      description:
        'Günlük giyim ve streetwear üretimi için örme kumaşlar: süprem, interlock, ribana, punto roma, iki iplik, üç iplik, polar, likralı süprem ve pike.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Örme Kumaşlar',
      lead: 'Çaprazlama değil ilmek — örmelerin esnemesinin, geri toplamasının ve kesim masasında dokumaya hiç benzememesinin nedeni.',
    },
    overview: [
      'Örme kumaş, çözgü ve atkının birbirine geçmesiyle değil ilmeklerin birbirine kenetlenmesiyle oluşur. Bu tek yapısal fark, alıcının süpremle özdeşleştirdiği her şeyi üretir: elastan olmadan bile her iki yönde esneklik, uzamadan sonra geri toplama ve yumuşak, bedene yakın bir tuşe. Aynı fark sorunları da üretir: örmeler kenarından kıvrılır, bir ilmek koptuğunda kaçar ve aynı gramajdaki bir dokumaya göre çok daha kolay ölçü değiştirir.',
      'Örgü yapısı ürünü belirler. Süprem en hafif ve en yaygın olanıdır; düz yüzlü, ilmekli arkalıdır ve çoğu tişört ondan üretilir; ayrıca kenarından kıvrılır ve yaka bölgesinde sabitleme ister. Interlock çift örmedir, daha ağır ve daha kararlıdır, kıvrılmaz; yapılı üst giyim ve çocuk giyiminde daha doğru seçimdir. Ribana güçlü enine esneklik verir; manşet, yaka ve bedene oturan gövdelerde kullanılır. Punto roma daha da sıkıdır ve dokumaya yakın bir form tutar. İki iplik, üç iplik ve polar ağırlık ve sıcaklık için ilmekli veya şardonlu arkalar ekler. Pike ince dokulu bir yüzey taşır ve klasik polo kumaşıdır.',
      'Örmede gramaj GSM olarak verilir ama dokumadan farklı yorumlanır: 140 GSM süprem hafif bir yazlık tişört, 180–200 GSM dolgun bir günlük tişört, 280–320 GSM ise sweatshirt ve kapüşonlu alanıdır. Oturan modellerde geri toplama için yüzde üç-beş elastan yaygındır ve varlığı hem dikim ayarını hem yıkamayı değiştirir.',
    ],
    types: [
      'Single Jersey', 'Interlock', 'Rib', 'Punto Roma', 'French Terry',
      'Sweatshirt', 'Fleece', 'Lycra Jersey', 'Pique',
    ],
    typicalGsm: '130 – 380 GSM',
    typicalWidth: '160 – 180 cm, tüp olarak da tedarik edilir',
    construction: 'Örme — tek ve çift plaka örme yapıları',
    handFeel: 'Yumuşak ve esnek, ağır gramajlarda şardonlu veya ilmekli',
    applications: [
      'Tişört', 'Sweatshirt ve kapüşonlu', 'Polo', 'Elbiselik',
      'Ev giyimi', 'Günlük giyim ve streetwear', 'Üniforma örme ürünleri',
    ],
    productionNotes: [
      'Örme kumaşı kesimden önce dinlendirin; rulodan doğrudan kesim, dönük yan dikişin başlıca nedenidir.',
      'Süprem ham kenarından kıvrılır — yaka ve etek uçları ribana, biye veya reçme ister.',
      'Yuvarlak uçlu iğne ve esnek dikiş kullanın; süpremde düz dikiş kullanımda kopar.',
    ],
    relatedCollections: ['essential', 'performance'],
    image: img('knitted', 'Süprem örgünün makro görüntüsü, birbirine kenetlenen ilmek yapısı görünüyor'),
  },

  shirting: {
    slug: 'shirting',
    name: 'Gömleklik',
    seo: {
      title: 'Gömleklik Kumaşlar — Toptan Poplin, Oxford ve Dimi Gömleklik',
      description:
        'Profesyonel gömlek üretimi için gömleklik kumaşlar: poplin, oxford, dimi, keten ve pamuklu gömleklik, likralı ve baskılı gömleklik kaliteleri.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Gömleklik',
      lead: 'Lifle değil incelik ve apreyle tanımlanan bir kategori — fiyatı belirleyen sayının iplik numarası olduğu yer.',
    },
    overview: [
      'Gömleklik bir lif değil bir spesifikasyondur: tene değecek, yaka taşıyacak ve ütü tutacak şekilde tasarlanmış hafif ve sık konstrüksiyonlu kumaş. En çok önem taşıyan sayı iplik numarasıdır. 2/100 katlı iplik ince, pürüzsüz ve parlak bir kumaş verir; 40/1 tek kat iplik ise maliyetin çok altında sağlam bir günlük gömlek verir. 120 GSM pamuklu poplin isteyen iki müşteri, aralarında üç kat fiyat farkı olan kumaşları istiyor olabilir ve bu farkı yaratan iplik numarasıdır.',
      'Konstrüksiyon bunun üzerine karakteri kurar. Poplin ince enine raporlu sık bir bezayağıdır: gevrek, düz ve resmî. Oxford sepet örgü kullanır, çoğu zaman renkli çözgüye karşı beyaz atkıyla dokunur; görünür bir doku ve daha rahat, daha dayanıklı bir kumaş verir — oxford’un düğmeli yakada, poplinin klasik gömlekte olmasının nedeni budur. Dimi daha yumuşak dökülür ve buruşmaya direnir; bu da gün boyu giyilen iş gömleklerine uygundur. Keten ve keten-pamuk gömleklik doku ve sıcak iklim performansı getirir.',
      'Yüksek adetli gömlek üretiminde kalite apre aşamasında kazanılır veya kaybedilir. Kolay ütü ve ütü istemez apreler buruşmayı azaltır ancak tuşeyi ve mukavemeti etkileyebilir; yüzde iki elastanlı likralı gömleklik kalıbı ve konforu değiştirir ama çekme değeri teyit edilmelidir. Yaka ve manşet telası kumaşla birlikte, sonrasında değil, seçilmelidir — yanlış tela ile ince bir poplin ilk yıkamadan sonra kabarır.',
    ],
    types: [
      'Poplin', 'Oxford', 'Twill', 'Linen Shirting', 'Cotton Shirting',
      'Stretch Shirting', 'Printed Shirting', 'Premium Shirting',
    ],
    typicalGsm: '95 – 160 GSM',
    typicalWidth: '145 – 150 cm',
    construction: 'Dokuma — ince ipliklerde bezayağı, sepet ve dimi örgüler',
    handFeel: 'Poplinde gevrek ve düz, oxfordda dokulu, dimide yumuşak',
    applications: [
      'Klasik gömlek', 'İş gömleği', 'Günlük gömlek',
      'Bluz', 'Üniforma gömleği', 'Hospitality gömleği',
    ],
    productionNotes: [
      'İplik numarasını GSM ile birlikte belirtin — tek başına GSM bir gömlekliği tarif etmez.',
      'Telayı kumaşa göre seçin ve yıkama sonrası test edin; kabaran yaka bir tela uyumsuzluğudur.',
      'Rapor tutturulan çizgi ve ekoselerde tüketim artar; payı teklifte teyit edin.',
    ],
    relatedCollections: ['shirting', 'essential'],
    image: img('shirting', 'İnce pamuklu gömleklik kumaş detayı, gevrek poplin yüzeyi'),
  },

  tailoring: {
    slug: 'tailoring',
    name: 'Takım Elbiselik',
    seo: {
      title: 'Takım Elbiselik Kumaşlar — Toptan Takım, Pantolon ve Blazer Kumaşı',
      description:
        'Takım elbise, blazer ve pantolon için terzilik kumaşları: yün takım elbiselik, polyester viskon, likralı takım elbiselik, gabardin ve premium kaliteler.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Takım Elbiselik',
      lead: 'Ütü altında ne yaptığına göre seçilen kumaş — ısı ve buharla şekillenebilme ve o şekli koruyabilme.',
    },
    overview: [
      'Terzilik kumaşı diğer kategorilerden farklı ölçütlerle değerlendirilir. Görünüm önemlidir ama konstrüksiyon altındaki performans daha önemlidir: kumaşın ısı ve nemle şekillendirilebilmesi, telalı veya kanvaslı bir ön yapıyı taşıyabilmesi, ütü kenarını tutabilmesi ve bir günlük kullanımdan sonra çökmeden geri dönebilmesi gerekir. Fotoğrafta çok iyi duran ama ütü tutmayan bir kumaş terzilik fabrikası için işe yaramaz.',
      'Yün bunların hepsini doğal olarak yaptığı için referans noktası olmayı sürdürüyor. Polyester-viskon karışımları hacimli üretimin alternatifidir: formu iyi tutar, buruşmaya direnir, belirgin şekilde daha ucuzdur ve üniforma ile kurumsal programların standardıdır; buna karşılık daha az nefes alır. Az miktarda elastan içeren likralı takım elbiselik modern kalıplarda ana akım hâline geldi; rahat ve bağışlayıcıdır ancak ütü altında hareket eder ve çekme değeri üretim öncesi teyit edilmelidir.',
      'Gramaj sezonu ve silueti belirler. 200–250 GSM dört mevsim aralığıdır. 180 GSM dolayındaki hafif kumaşlar sıcak iklim terziliğine uygundur ama konstrüksiyondaki her zayıflığı açığa çıkarır. Birçok programda pantolon kumaşı, eşleşen ceket kumaşından daha ağırdır çünkü yıpranma daha serttir. Sık dokunmuş dik açılı bir dimi olan gabardin tam da bu nedenle klasik pantolon ve dış giyim konstrüksiyonudur.',
    ],
    types: [
      'Wool Suiting', 'Polyester Viscose', 'Stretch Suiting',
      'Premium Suiting', 'Trouser Fabrics', 'Gabardine', 'Blazer Fabrics',
    ],
    typicalGsm: '180 – 380 GSM',
    typicalWidth: '150 – 160 cm',
    construction: 'Dokuma — kamgarn dimiler, bezayağı ve gabardin',
    handFeel: 'Kuru, dirençli, ütü kenarını tutacak kadar sıkı',
    applications: [
      'Takım elbise', 'Blazer', 'Pantolon', 'Etek',
      'Kurumsal üniforma', 'Resmî ve özel gün giyimi',
    ],
    productionNotes: [
      'Çekme ve ütü davranışını düz swatch üzerinde değil dikilmiş numunede teyit edin.',
      'Tela ve yapıştırmayı kumaşa göre seçin; uyumsuzluk ilk olarak yaka kırımında görünür.',
      'Likralı takım elbiselik ısı altında gevşer — ütü ile ölçüm arasında dinlenme süresi bırakın.',
    ],
    relatedCollections: ['tailoring', 'performance'],
    image: img('tailoring', 'Ütü kenarını gösterecek şekilde katlanmış yün takım elbiselik kumaş yakın çekimi'),
  },

  fashion: {
    slug: 'fashion',
    name: 'Moda Kumaşları',
    seo: {
      title: 'Moda Kumaşları — Toptan Krep, Saten, Şifon, Kadife ve Jakar',
      description:
        'Koleksiyon ve özel gün giyimi için moda kumaşları: krep, saten, şifon, organze, tafta, kadife, jakar, dantel ve baskılı kumaşlar.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Moda Kumaşları',
      lead: 'Yüzeyin, hareketin ve ışığın dayanıklılıktan önce geldiği yer — bir koleksiyonun üzerine kurulduğu kumaşlar.',
    },
    overview: [
      'Moda kumaşları harekette nasıl davrandıklarına ve ışığı nasıl aldıklarına göre seçilir. Krep ışığı emen ince bir tane taşır, dikiş büzülmesini gizler ve ağırlığıyla dökülür. Saten bunun tersini yapar: yüzeydeki uzun atlamalar ışığı yansıtır ve parlaklık verir, karşılığında her iğne izini ve çekmeyi gösterir. Şifon ve organzenin ikisi de şeffaftır ama şifon yumuşak ve uçuşurken organze gevrektir ve hacmi tutar — akıcı bir üst katman ile heykelsi bir katman arasındaki fark budur.',
      'Yapılı ve dokulu kumaşlar başka bir dizi karar getirir. Tafta gevrektir ve hışırdar, mimari formları taşır. Kadife yönü olan yoğun bir kesik hav taşır; paneller aynı hav yönünde kesilmezse renk dikiş boyunca farklı okunur. Jakar deseni baskıyla yüzeye koymak yerine dokumanın içine kurar ve yıkamaya dayanan bir derinlik verir. Dantel ise altına ne geleceğinin düşünülmesini gerektiren açık bir yapıdır.',
      'Bu kumaşlar üretimde diğer tüm kategorilerden daha az bağışlayıcıdır. Şeffaflar baskı ayağının altında kayar, satenler sıcak ütüde kalıcı iz alır, kadife depoda kendi ağırlığı altında ezilir ve ince iplikler makinedeki her pürüzlü yüzeye takılır. Burada numune isteğe bağlı değildir; bir koleksiyonun maliyetinin kontrol edildiği yer tam olarak orasıdır.',
    ],
    types: [
      'Crepe', 'Satin', 'Chiffon', 'Organza', 'Taffeta',
      'Velvet', 'Jacquard', 'Lace', 'Printed Fabrics',
    ],
    typicalGsm: '40 – 300 GSM',
    typicalWidth: '140 – 150 cm',
    construction: 'Dokuma — krep, saten, şeffaf bezayağı, havlı ve jakar',
    handFeel: 'Uçuşan ve şeffaftan yoğun ve parlağa',
    applications: [
      'Elbiselik', 'Abiye ve özel gün giyimi', 'Bluzluk',
      'Üst katman ve astar', 'Koleksiyon parçaları', 'Gelinlik',
    ],
    productionNotes: [
      'Kadife ve diğer havlı kumaşlarda tüm panelleri aynı hav yönünde kesin.',
      'Şeffaflarda ince iğne, keskin kesim ve dikiş altına kağıt veya stabilizatör gerekir.',
      'Her satenin bir parçasında ütü denemesi yapın — satendeki ütü izi kalıcıdır.',
    ],
    relatedCollections: ['essential', 'natural'],
    image: img('fashion', 'Yumuşak kıvrımlarda ışığı yakalayan saten kumaş ve yanında mat krep parçası'),
  },

  'performance-technical': {
    slug: 'performance-technical',
    name: 'Performans ve Teknik',
    seo: {
      title: 'Performans ve Teknik Kumaşlar — Su İtici, İş Kıyafeti, Outdoor',
      description:
        'Performans ve teknik kumaşlar: su itici, rüzgâr geçirmez, kaplamalı, esnek performans ve yüksek dayanımlı kumaşlar; iş kıyafeti ve outdoor üretimi için.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'Performans ve Teknik',
      lead: 'Neye dayanması gerektiğine göre belirlenen kumaşlar — görünüm değil, ölçülebilir özellikler.',
    },
    overview: [
      'Teknik kumaşlar bir ilham panosuna göre değil, gereksinimlere göre satın alınır. Alıcı, ürünün dayanması gereken koşuldan başlar — yağmur, rüzgâr, aşınma, tekrarlanan endüstriyel yıkama, tam bir vardiya boyunca hareket — ve kumaş oradan geriye doğru belirlenir. Bu kategorinin ölçülebilir terimlerle konuşulmasının nedeni budur: su sütunu değeri, aşınma devir sayısı, yırtılma mukavemeti, esneme ve geri toplama yüzdeleri.',
      'Su direnci, ticari olarak en önemli ayrımı gösterir. Dayanıklı su itici apre suyun yüzeyde boncuklanmasını sağlar ve sağanak için uygundur; ancak bu bir apredir ve yıkama ile aşınmada zamanla azalır. Kaplama veya membran ise kumaşın içine kurulmuş bir bariyerdir ve tamamen farklı bir seviyede performans verir; maliyeti ve nefes alabilirliği de buna göre değişir. İkisini karıştırmak iade üretir, bu yüzden teklif aşamasında netleştirilmelidir.',
      'İş kıyafeti ve outdoor konstrüksiyonları dayanıklılık gereksinimleri ekler. Sık dokunmuş pamuk-polyester karışımları ve yüksek mukavemetli iplikler aşınmaya ve yırtılmaya direnir; takviyeli dokumalar zorlanan noktaları korur. Ürünler endüstriyel olarak yıkanıyorsa — özellikle hospitality ve sağlık alanında — kumaşın tekrarlanan yüksek sıcaklıktaki yıkamada renk, form ve apre kaybetmemesi gerekir; bu da evde gayet iyi çalışan birçok kumaşı devre dışı bırakır.',
    ],
    types: [
      'Water-Repellent', 'Wind-Resistant', 'Workwear', 'Outdoor',
      'Stretch Performance', 'Coated Fabrics', 'Durable Fabrics',
    ],
    typicalGsm: '120 – 400 GSM',
    typicalWidth: '145 – 160 cm',
    construction: 'Dokuma ve örme; apre, kaplama ve membran uygulamalı',
    handFeel: 'Kaplama ve konstrüksiyona göre pürüzsüzden teknik yüzeye',
    applications: [
      'İş kıyafeti', 'Outdoor giyim', 'Üniforma', 'Dış giyim kabuğu',
      'Hospitality ürünleri', 'Spor giyim',
    ],
    productionNotes: [
      'İtici apre mi kaplama mı gerektiğini belirtin — bu ikisi birbirinin yerine geçmez.',
      'Kaplamalı kumaşlarda dikiş bantlama gerekebilir; dikişi açık bir kabuk su geçirmez değildir.',
      'Endüstriyel yıkanan ürünlerde kumaş seçmeden önce yıkama programı ve sıcaklığını teyit edin.',
    ],
    relatedCollections: ['performance', 'workwear'],
    image: img('performance-technical', 'Su itici apreli teknik kumaş yüzeyinde boncuklanan su damlaları'),
  },

  interior: {
    slug: 'interior',
    name: 'İç Mekân',
    seo: {
      title: 'İç Mekân Kumaşları — Toptan Döşemelik, Perdelik ve Dekoratif Kumaşlar',
      description:
        'Proje ve konut uygulamaları için ev tekstili: döşemelik, perdelik, dekoratif kumaşlar, kanvas, kadife ve jakar.',
    },
    intro: {
      eyebrow: 'Kumaşlar',
      heading: 'İç Mekân',
      lead: 'Beden için değil mekân için belirlenen kumaş — aşınma direnci ve ışık davranışının dökümden önce geldiği yer.',
    },
    overview: [
      'İç mekân tekstilleri hazır giyimden farklı bir özellik kümesine göre değerlendirilir. Bir döşemelik kumaş önce Martindale devir sayısıyla ölçülen aşınma direncine göre yargılanır: konut kullanımı görece mütevazı değerlerle karşılanırken, proje ve otel uygulamaları çok daha yüksek değer ister çünkü aynı oturma yüzeyini yüzlerce kişi kullanır. Gramaj, boyutsal kararlılık ve dikiş mukavemeti aynı gereksinimden türer.',
      'Perdelik kumaşlar ise ışığa göre belirlenir. Karar şeffaf, yarı karartma ve tam karartma arasındadır ve konstrüksiyonu tümüyle değiştirir. Perde boyu bir başka pratik konudur: asıldıktan sonra gevşeyen bir perde gözle görülür şekilde uzar, bu yüzden boyutsal kararlılık ve doğru baskı payı hazır giyimden daha kritiktir. En de farklıdır — birçok iç mekân kumaşı, bir perde boyunda dikiş sayısını azaltmak için hazır giyim kumaşlarından daha geniş tedarik edilir.',
      'Görsel ağırlığı dekoratif konstrüksiyonlar taşır. Jakar deseni yapının içine kurar; baskının veremeyeceği bir derinlik sağlar ve uzun kullanıma dayanır. Kadife ışığa tepki veren bir hav getirir ancak yönü vardır ve basınç izi gösterir. Kanvas yoğun kullanılan parçalar için sağlam bir bezayağı dayanıklılığı verir. Proje işlerinde yanmazlık gereksinimleri mevzuat ve mekân tarafından belirlenir ve kategori geneli için varsayılmak yerine ilgili ürün için teyit edilmelidir.',
    ],
    types: [
      'Upholstery', 'Curtain Fabrics', 'Decorative Fabrics',
      'Canvas', 'Velvet', 'Jacquard',
    ],
    typicalGsm: '200 – 600 GSM',
    typicalWidth: 'Konstrüksiyona göre 140 – 300 cm',
    construction: 'Dokuma — bezayağı, jakar, havlı ve kanvas konstrüksiyonlar',
    handFeel: 'Sıkı ve dolgun, düz dokumadan yoğun hava',
    applications: [
      'Döşemelik', 'Perde ve drapaj', 'Kırlent ve ev tekstili',
      'Otel ve restoran iç mekânları', 'Proje işleri', 'Duvar panelleri',
    ],
    productionNotes: [
      'Döşemelikte gereken Martindale değerini belirtin; proje kullanımı ile konut kullanımı kıyaslanamaz.',
      'Havlı kumaşları tüm parçada tek hav yönünde kesin; aksi hâlde ton farkı oluşur.',
      'Yanmazlık gereksinimleri ürün ve mekân mevzuatı bazında teyit edilmelidir.',
    ],
    relatedCollections: ['interior', 'natural'],
    image: img('interior', 'Katlanmış döşemelik kumaş, yoğun dokunmuş jakar yüzeyi gösteriyor'),
  },
}
