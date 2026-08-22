import type { GenericPageContent } from '../schema'

export const pages: Record<string, GenericPageContent> = {
  about: {
    seo: {
      title: 'JUSTEKS Hakkında — 2004’ten Gelen Tekstil Tecrübesi',
      description:
        'JUSTEKS, Birleşik Krallık menşeli kumaşları dünya genelindeki üreticilere, markalara, toptancılara ve profesyonel alıcılara tedarik eden bir tekstil işletmesidir.',
    },
    intro: {
      eyebrow: 'Hakkımızda',
      heading: 'Kumaş Dükkânı Değil, Kumaş Evi.',
      lead: '2004’ten gelen tekstil tecrübesi; Birleşik Krallık menşeli koleksiyonlar ve global B2B tedarik kabiliyetiyle birleşiyor.',
    },
    body: [
      'JUSTEKS profesyonel alıcılarla çalışır: tekstil fabrikaları, konfeksiyon üreticileri, moda markaları, kumaş toptancıları, distribütörler, private label üreticileri ve kurumsal satın alma departmanları. Bu müşterilerin ortak yanı, kumaşı tek bir ürün için seçmiyor, üretim için belirliyor olmalarıdır.',
      'Bu, çalışma biçimimizi belirler. Bir üretim alıcısının karar vermeden önce kompozisyonu, konstrüksiyonu, gramajı, eni, apreyi ve davranışı bilmesi; sipariş tekrarladığında aynı kumaşı yeniden bulabilmesi gerekir. Bizim rolümüz bu bilgiyi açık hâle getirmek ve tedariki güvenilir kılmaktır.',
      'İşletme iki şeye dayanır: 2004’ten bu yana kurulan tekstil deneyimi ve Birleşik Krallık menşeli kumaşı global pazarlardaki müşterilere ulaştıran ticaret kabiliyeti.',
    ],
    features: [
      { title: 'Tecrübe', body: 'Elyaflar, konstrüksiyonlar, gramajlar ve apreler üzerinde yirmi yıllık çalışma.' },
      { title: 'Ürün', body: 'Alıcının ihtiyaç duyduğu teknik detayla sunulan Birleşik Krallık menşeli kumaş koleksiyonları.' },
      { title: 'Kabiliyet', body: 'Global pazarlardaki profesyonel müşterilere B2B tedarik ve teslimat.' },
    ],
    links: [
      { label: 'Tarihçemiz', href: '/heritage', description: 'İşin nerede başladığı ve yirmi yılın öğrettikleri.' },
      { label: 'Birleşik Krallık Menşei', href: '/uk-origin', description: 'Menşenin ürün kimliğinin parçası olmasının nedeni.' },
      { label: 'Global Tedarik', href: '/global-supply', description: 'Tedarik ettiğimiz bölgeler ve siparişlerin size ulaşma biçimi.' },
    ],
    ctas: [
      { label: 'Kumaş Uzmanıyla Görüşün', href: '/contact' },
    ],
  },

  heritage: {
    seo: {
      title: 'Tarihçemiz — 2004’ten Beri Kumaşın İçindeyiz — JUSTEKS',
      description:
        'JUSTEKS’in tekstil sektöründeki yolculuğu 2004’te başladı. Elyaflar, konstrüksiyonlar, gramajlar ve apreler üzerinde geçen yirmi yıl bugün tedarik ettiğimiz her kumaşın arkasında duruyor.',
    },
    intro: {
      eyebrow: 'Tarihçemiz',
      heading: '2004’ten Beri Kumaşın İçindeyiz.',
      lead: 'Bir kumaşın yalnızca nasıl göründüğünü değil, nasıl davrandığını anlamakla geçen yirmi yıl.',
    },
    body: [
      'JUSTEKS’in tekstil sektöründeki yolculuğu 2004 yılında başladı. Yirmi yılı aşan süreçte farklı elyaflar, dokuma ve örme yapıları, gramajlar, yüzey işlemleri ve üretim ihtiyaçları üzerinde çalıştık; bugün ürün yaklaşımımızın dayandığı şey bu birikimdir.',
      'Bizim için kumaş yalnızca ticareti yapılan bir ürün değildir. Doğru kumaş; üretimin kalitesini, ürünün görünümünü, kullanım hissini, dayanıklılığını ve nihayetinde koleksiyonun başarısını doğrudan etkiler.',
      'Bu nedenle işimiz kumaş satmak değil, müşterinin üretim ihtiyacına uygun kumaşı bulmasını ve doğru şekilde tedarik etmesini sağlamaktır. Bugün JUSTEKS, Birleşik Krallık menşeli kumaşları dünyanın farklı bölgelerindeki üreticiler, moda markaları, tekstil firmaları, toptancılar ve profesyonel alıcılarla buluşturuyor.',
    ],
    sections: [
      {
        heading: 'Yirmi yılın öğrettikleri',
        body: [
          'Çoğunlukla nelerin ters gittiğini öğretir. Kesimden önce dinlendirilmemiş bir keten. Değdiği her şeye renk veren koyu bir dimi. Telası kumaştan sonra seçildiği için kabaran bir yaka. Ürün aslında hiç stok kalemi olmadığı için karşılanamayan bir tekrar siparişi.',
        ],
        items: [
          'Adına göre değil özelliğine göre belirleyin',
          'Yalnızca swatch değil üretim numunesi onaylatın',
          'Toplu kesimden önce apreyi teyit edin',
          'Tekrarı ilk sevkiyattan önce planlayın',
        ],
      },
    ],
    ctas: [
      { label: 'Kumaşları İnceleyin', href: '/fabrics' },
      { label: 'Kumaş Uzmanıyla Görüşün', href: '/contact' },
    ],
  },

  ukOrigin: {
    seo: {
      title: 'Menşe — Birleşik Krallık Menşeli Kumaşlar — JUSTEKS',
      description:
        'JUSTEKS ürün grubunun merkezinde Birleşik Krallık menşeli kumaşlar bulunur. Menşe bilgisi geçerli olduğu her üründe açıkça belirtilir.',
    },
    intro: {
      eyebrow: 'Menşe',
      heading: 'Birleşik Krallık Menşei.',
      lead: 'Menşe, ürün kimliğinin parçasıdır ve pazarlama iddiasında değil ürün sayfasında yer alır.',
    },
    body: [
      'JUSTEKS koleksiyonunun merkezinde Birleşik Krallık menşeli kumaşlar bulunur. Profesyonel alıcılar için bu yalnızca itibar meselesi değil ticari bir meseledir: menşe, dokümantasyonu, gümrük işlemlerini ve birçok programda bir markanın malzemesi hakkında anlatabileceği hikâyeyi etkiler.',
      'Yaklaşımımız nettir. Bir ürün Birleşik Krallık menşeliyse bunu belirtiriz. O ürüne ait menşe belgesi veya teknik kayıt varsa talep üzerine paylaşılabilir. Menşe iddiasını kategori geneline uygulamayız; çünkü menşe bir kategoriye değil bir ürüne aittir.',
    ],
    sections: [
      {
        heading: 'Ürün üzerinde',
        body: [
          'Geçerli olduğu yerde menşe, ürünün teknik spesifikasyonunun yanında açık bir işaret olarak görünür — alıcının kompozisyon ve gramaja baktığı yerde.',
        ],
        items: ['United Kingdom Origin'],
      },
      {
        heading: 'Dokümantasyon',
        body: [
          'Bir ürün için menşe belgesi mevcutsa teklif veya sevkiyatla birlikte sağlanabilir. Gereksinimler destinasyona göre değişir; bu nedenle neye ihtiyacınız olduğunu sevkiyattan sonra değil teklif aşamasında netleştirin.',
        ],
      },
    ],
    note: 'Menşe ürün bazında teyit edilir. Kategori geneli için asla iddia edilmez.',
    ctas: [
      { label: 'Kumaşları İnceleyin', href: '/fabrics' },
      { label: 'İhtiyacınızı Görüşelim', href: '/contact?topic=INTERNATIONAL_TRADE' },
    ],
  },

  textileExpertise: {
    seo: {
      title: 'Tekstil Uzmanlığı — Bir Kumaş Nasıl Belirlenir — JUSTEKS',
      description:
        'Kompozisyon, konstrüksiyon, gramaj, en, tuşe, döküm, esneklik, apre, performans ve kullanım alanı: üretim için bir kumaşa karar veren özellikler.',
    },
    intro: {
      eyebrow: 'Tekstil Uzmanlığı',
      heading: 'Kumaştan Fazlasını Biliyoruz.',
      lead: 'Profesyonel kumaş seçimi yalnızca renk veya desenle belirlenmez.',
    },
    body: [
      'Bir alıcı üretim için kumaş belirlerken sonucu belirleyen özellikler tekniktir ve birbirini etkiler. Daha ağır bir kumaş farklı dökülür. Bir apre tuşeyi ve çekmeyi birlikte değiştirir. Elastan kalıbı iyileştirir ve ütüyü zorlaştırır. Bu etkileşimleri anlamak, üretimde işe yarayan bir kumaşı yalnızca ilham panosunda işe yarayandan ayırır.',
      'Amacımız müşteriye yalnızca ürün göstermek değil, üretim ihtiyacına uygun kumaş alternatiflerini değerlendirmesine yardımcı olmaktır.',
    ],
    features: [
      { title: 'Composition', body: 'Hangi lifler, hangi oranda. Nefes alabilirliği, bakımı ve maliyetin büyük bölümünü belirler.' },
      { title: 'Construction', body: 'Dokuma mı örme mi, hangi yapıda. Çoğu zaman liften daha belirleyicidir.' },
      { title: 'GSM', body: 'Metrekare başına ağırlık. Sezonu, kullanımı ve fiyat noktasını birlikte yönlendirir.' },
      { title: 'Width', body: 'Tüketimi belirler; dolayısıyla metre maliyetini değil ürün maliyetini etkiler.' },
      { title: 'Hand Feel', body: 'Kumaşın eldeki hissi. Fotoğraftan değerlendirilemez — swatch bu yüzden vardır.' },
      { title: 'Drape', body: 'Kumaşın dökülüşü. Silueti tek başına diğer her özellikten fazla belirler.' },
      { title: 'Stretch', body: 'Mekanik veya elastan kaynaklı. Kalıbı değiştirir, beraberinde ütü ve çekmeyi de.' },
      { title: 'Finish', body: 'Yıkama, şardon, merserizasyon, kaplama. Tuşeyi, davranışı ve yaşlanmayı değiştirir.' },
      { title: 'Performance', body: 'Aşınma, yırtılma, su direnci, renk haslığı. Sıfatlarla değil sayılarla belirtilir.' },
      { title: 'Application', body: 'Kumaşın ne için olduğu. Yukarıdaki her özellik buna göre değerlendirilir.' },
    ],
    links: [
      { label: 'Kalite ve İzlenebilirlik', href: '/quality-traceability', description: 'Bir ürün hakkında neyi, neden kaydettiğimiz.' },
      { label: 'Insights', href: '/insights', description: 'Kumaşlar arasında seçim yapmaya dair teknik rehberlik.' },
    ],
    ctas: [
      { label: 'Kumaş Uzmanıyla Görüşün', href: '/contact?topic=TECHNICAL' },
    ],
  },

  quality: {
    seo: {
      title: 'Kalite ve İzlenebilirlik — Her Kumaşın Bir Kimliği Vardır — JUSTEKS',
      description:
        'Ürün numarası, menşe, kompozisyon, konstrüksiyon, parti referansı ve renk referansı: bir kumaşı tekliften teslimata kadar tanımlanabilir kılan kayıt.',
    },
    intro: {
      eyebrow: 'Kalite ve İzlenebilirlik',
      heading: 'Her Kumaşın Bir Kimliği Vardır.',
      lead: 'Profesyonel tekstil tedarikinde ürün bilgisinin açık ve izlenebilir olması önemlidir.',
    },
    body: [
      'Bir ürün kaydının pratik amacı basittir: sipariş ettiğiniz, numunesini gördüğünüz ve size ulaşan kumaşın aynı kumaş olduğu gösterilebilmelidir. Bu, bir tedarik zinciri boyunca kulağa geldiğinden zordur ve anlaşmazlıkların çoğu tam burada başlar.',
      'Bilgi bir ürün için geçerli olduğu ölçüde tutulabilir ve paylaşılabilir. Bir ürün için mevcut değilse, uydurmak yerine bunu belirtiriz.',
    ],
    sections: [
      {
        heading: 'Kaydedilebilen bilgiler',
        body: [],
        items: [
          'Article Number', 'Country of Origin', 'Composition', 'Construction',
          'Technical Specification', 'Batch / Lot Reference', 'Colour Reference',
          'Certification', 'Care Information',
        ],
      },
      {
        heading: 'Ürün numarası biçimi',
        body: [
          'Her kumaş benzersiz bir JUSTEKS ürün numarası taşır. Biçim; kategoriyi, gramajı ve ürün numarasını kodlar. Böylece telefonda okunan bir referans bile belirli bir kumaşı tanımlar.',
        ],
      },
    ],
    note: 'Sertifika yalnızca ilgili ürün gerçekten sahipse gösterilir.',
    ctas: [
      { label: 'Kumaş Uzmanıyla Görüşün', href: '/contact?topic=TECHNICAL' },
    ],
  },

  responsible: {
    seo: {
      title: 'Sorumlu Tekstil — Doğrulanabilir Ürün Bilgisi — JUSTEKS',
      description:
        'Organik ve geri dönüştürülmüş elyaf, sertifikalı malzeme ve izlenebilir ürünler — genel iddia olarak değil, gerçekten geçerli olduğu ürün bazında belirtilir.',
    },
    intro: {
      eyebrow: 'Sorumlu Tekstil',
      heading: 'Sorumlu Tercihler. Açık Bilgi.',
      lead: 'Genel çevre iddiaları yerine doğrulanabilir ürün bilgisi.',
    },
    body: [
      'Sürdürülebilirlik iletişimimizi doğrulanamayan geniş iddialar üzerine kurmuyoruz. Arkasında bir ürün olmadan bir serinin sürdürülebilir olduğunu söylemek, profesyonel bir alıcıya kullanabileceği hiçbir şey anlatmaz — ve giderek artan biçimde, kendi müşterisine tekrar etmesine izin verilmeyen bir şey olur.',
      'Bunun yerine bir özellik gerçekten bir ürüne aitse, o ürün üzerinde belirtilir. O ürün için bir sertifika varsa adıyla anılır. Yoksa hiçbir logo görünmez.',
    ],
    sections: [
      {
        heading: 'Ürün bazında gösterilen özellikler',
        body: [],
        items: [
          'Organik Elyaf', 'Geri Dönüştürülmüş Elyaf', 'Sertifikalı Malzeme',
          'İzlenebilir Ürünler', 'Sorumlu Malzeme Seçenekleri',
        ],
      },
      {
        heading: 'Sertifikalar hakkında',
        body: [
          'Tanınmış tekstil sertifikaları şirketlere değil, belirli ürünlere ve üretim süreçlerine verilir. Bir ürün ilgili sertifikaya sahipse referansı ve geçerlilik bilgisiyle gösterilebilir. Sahip olmayan ürünlerde sertifika işareti kullanmayız.',
        ],
      },
    ],
    note: 'Sertifikası olmayan bir üründe hiçbir sertifika logosu kullanılmaz.',
    ctas: [
      { label: 'Kumaş Uzmanıyla Görüşün', href: '/contact?topic=TECHNICAL' },
    ],
  },

  tradeLogistics: {
    seo: {
      title: 'Ticaret ve Lojistik — Kumaş Seçiminden Nihai Teslimata — JUSTEKS',
      description:
        'Uluslararası navlun koordinasyonu, ihracat ve menşe dokümantasyonu; fabrikaya, depoya veya belirlediğiniz ticari adrese teslimat.',
    },
    intro: {
      eyebrow: 'Ticaret ve Lojistik',
      heading: 'Kumaş Seçiminden Nihai Teslimata.',
      lead: 'Hizmetimiz kumaş seçildiğinde sona ermez.',
    },
    body: [
      'Profesyonel B2B siparişlerde ticari sevkiyat; siparişin ürününe, miktarına, destinasyonuna ve teslimat gereksinimine göre planlanır. Müşteriler siparişlerini üretim tesislerine, belirledikleri depolara veya seçtikleri bir ticari adrese yönlendirebilir.',
    ],
    features: [
      { title: 'Fabrikaya Teslim', body: 'Doğrudan üretim tesisinize.' },
      { title: 'Depoya Teslim', body: 'Belirlediğiniz depoya.' },
      { title: 'Ticari Adrese Teslim', body: 'Seçtiğiniz ticari teslimat noktasına.' },
    ],
    sections: [
      {
        heading: 'Sipariş ve destinasyona göre kapsanabilecek alanlar',
        body: [],
        items: [
          'International Freight Coordination',
          'Commercial Shipping',
          'Export Documentation',
          'Commercial Invoice',
          'Packing Documentation',
          'Origin Documentation',
          'Factory / Warehouse Delivery',
        ],
      },
      {
        heading: 'Teslim şekilleri',
        body: [
          'Teslim şekilleri teklif aşamasında bildirilir. Geçerli şartlar ürün, sipariş hacmi ve destinasyona göre teklif aşamasında belirlenir.',
        ],
      },
    ],
    note: 'Buradaki hizmetler sipariş ve destinasyona göre uygulanır. Gerçekte sunmadığımız bir lojistik veya dokümantasyon hizmetini listelemeyiz.',
    ctas: [
      { label: 'İhtiyacınızı Görüşelim', href: '/contact?topic=INTERNATIONAL_TRADE' },
      { label: 'Global Tedarik', href: '/global-supply' },
    ],
  },

  bulkOrders: {
    seo: {
      title: 'Yüksek Metrajlı Siparişler — Ölçek İçin Kurgulandı — JUSTEKS',
      description:
        'Yüksek hacimli üretim için profesyonel kumaş tedariki. Ürün, kompozisyon, renk, gramaj, en, miktar ve teslimat gereksiniminizi paylaşın.',
    },
    intro: {
      eyebrow: 'Yüksek Metrajlı Siparişler',
      heading: 'Ölçek İçin Kurgulandı.',
      lead: 'Yüksek hacimli üretim için profesyonel kumaş tedariki.',
    },
    body: [
      'Sürekli üretim yapan tekstil işletmeleri ve yüksek metrajlı kumaş ihtiyacı olan profesyonel müşteriler için talep, genel bir gelen kutusuna değil doğrudan kurumsal satış ekibimize iletilir.',
      'Spesifikasyonu ne kadar eksiksiz paylaşırsanız gerçekçi cevap o kadar hızlı döner — özellikle bir üretim planının gerçekte bağlı olduğu iki konuda: stok durumu ve termin.',
    ],
    sections: [
      {
        heading: 'Paylaşmanız gerekenler',
        body: [],
        items: [
          'Kumaş / Ürün', 'Kompozisyon', 'Renk', 'Gramaj', 'En',
          'Talep Edilen Miktar', 'Talep Edilen Teslim Tarihi', 'Teslimat Ülkesi',
          'Teslimat Şehri', 'Üretim Uygulaması',
        ],
      },
    ],
    ctas: [
      { label: 'Yüksek Metrajlı Talebinizi İletin', href: '/contact?topic=SALES' },
    ],
  },

  sourcing: {
    seo: {
      title: 'Özel Tedarik — Aradığınızı Bulamadınız mı? — JUSTEKS',
      description:
        'Kumaş spesifikasyonunuzu ve referans materyalinizi bize gönderin. Gereksinimi siz tanımlayın, kumaşı bulmanıza yardımcı olalım.',
    },
    intro: {
      eyebrow: 'Özel Tedarik',
      heading: 'Aradığınızı Bulamadınız mı?',
      lead: 'Gereksinimi siz tanımlayın. Kumaşı bulmanıza yardımcı olalım.',
    },
    body: [
      'İhtiyacınız olan kumaş mevcut ürün grubumuzda yoksa spesifikasyonu bize iletin. Gereksinim ne kadar netse önünüze koyabileceğimiz alternatifler o kadar isabetli olur.',
      'Bir referans fotoğrafı, teknik föy, rakip numunesi ya da eşleştirmeye çalıştığınız bir ürün — çoğu zaman yazılı bir tariften daha fazla yardımcı olur.',
    ],
    sections: [
      {
        heading: 'Göndermeniz gerekenler',
        body: [],
        items: [
          'Kumaş Türü', 'Kompozisyon', 'Gramaj', 'En', 'Renk',
          'Kullanım Alanı', 'Talep Edilen Miktar', 'Teslimat Ülkesi',
          'Talep Edilen Tarih',
        ],
      },
      {
        heading: 'Referans materyali',
        body: [
          'Kumaş fotoğrafı, teknik föy, referans ürün görseli veya yazılı spesifikasyon yükleyebilirsiniz. PDF, görsel ve doküman dosyaları kabul edilir.',
        ],
      },
    ],
    ctas: [
      { label: 'Özel Tedarik Talebi Gönderin', href: '/contact?topic=SOURCING' },
    ],
  },

  sampleService: {
    seo: {
      title: 'Numune Hizmeti — Görün. Hissedin. Belirleyin. — JUSTEKS',
      description:
        'Toplu siparişe geçmeden önce swatch, numune veya renk kartelası talep edin. Birden fazla ürün tek talepte birleştirilebilir.',
    },
    intro: {
      eyebrow: 'Numune Hizmeti',
      heading: 'Görün. Hissedin. Belirleyin.',
      lead: 'Profesyonel alıcılar toplu siparişe geçmeden önce kumaşı değerlendirebilmelidir.',
    },
    body: [
      'Tuşe, döküm ve yüzey fotoğraftan değerlendirilemez; ekrandan verilen bir karar eksik bilgiyle verilmiş bir karardır. Birden fazla ürün tek bir numune talebinde birleştirilebilir.',
    ],
    features: [
      { title: 'Swatch Talebi', body: 'Ürünün küçük bir parçası; tuşe ve konstrüksiyonu değerlendirmeye yeter.' },
      { title: 'Numune Talebi', body: 'Daha büyük bir parça; döküm ve davranışın düzgün değerlendirilmesi gerektiğinde.' },
      { title: 'Renk Kartelası Talebi', body: 'Belirli bir ürün için mevcut renk aralığı.' },
    ],
    note: 'Numune durumu talep anında ürün bazında teyit edilir.',
    ctas: [
      { label: 'Numune Talep Edin', href: '/contact?topic=SAMPLING' },
    ],
  },

  tradeAccount: {
    seo: {
      title: 'Trade Account — JUSTEKS',
      description:
        'Düzenli profesyonel alım, kayıtlı kumaşlar, teklif geçmişi ve size özel bir temsilci için JUSTEKS trade account başvurusu yapın.',
    },
    intro: {
      eyebrow: 'Trade Account',
      heading: 'JUSTEKS Trade Account',
      lead: 'Düzenli alım yapan müşteriler için işi tek yerde toplayan bir hesap.',
    },
    body: [
      'Trade account, tekrar eden alım yapan profesyonel müşteriler içindir. Başvurular tek tek değerlendirilir; genellikle yürüttüğünüz üretim tipini, kullandığınız kumaşları ve çalıştığınız hacimleri sorarız.',
    ],
    sections: [
      {
        heading: 'Hesabın kapsayacağı alanlar',
        body: [
          'Hesap alanı aşamalı olarak geliştiriliyor. Etrafında tasarlandığı alanlar şunlar:',
        ],
        items: [
          'Kayıtlı Kumaşlar', 'Favoriler', 'Teklif Geçmişi',
          'Numune Talepleri', 'Sipariş Geçmişi', 'Teknik Dokümanlar',
          'Sertifikalar', 'Hesap Bilgileri', 'Müşteri Temsilcisi',
        ],
      },
    ],
    note: 'Her alan henüz aktif değil. Şimdi başvurmanız işletmenizi kaydeder ve size bir temsilci atanmasını sağlar.',
    ctas: [
      { label: 'Trade Account Başvurusu', href: '/contact?topic=SALES' },
    ],
  },

  resources: {
    seo: {
      title: 'Kaynaklar — Kurumsal ve Teknik Dokümanlar — JUSTEKS',
      description:
        'Firma profili, kumaş kataloğu, teknik föyler, sertifikalar ve bakım rehberleri — doküman merkezi tamamlanana kadar talep üzerine sağlanır.',
    },
    intro: {
      eyebrow: 'Kaynaklar',
      heading: 'Doküman Merkezi',
      lead: 'Profesyonel müşteriler için kurumsal ve teknik dokümantasyon.',
    },
    body: [
      'Bunlar profesyonel müşterilerin en sık talep ettiği dokümanlar. Yer tutucu dosyalar yayımlamak yerine, doküman merkezi tamamlanana kadar talep üzerine sağlıyoruz; böylece elinize geçen doküman yalnızca mevcut değil güncel oluyor.',
    ],
    sections: [
      {
        heading: 'Talep üzerine sağlanır',
        body: [],
        items: [
          'Firma Profili', 'Kumaş Kataloğu', 'Koleksiyon Kitapları',
          'Teknik Föyler', 'Sertifikalar', 'Kumaş Bakım Rehberleri',
          'Sevkiyat Bilgileri', 'Kurumsal Dokümanlar',
        ],
      },
    ],
    note: 'Teknik föy ve sertifikalar ürün bazında düzenlenir; iletişime geçerken hangi ürün için istediğinizi belirtin.',
    ctas: [
      { label: 'Doküman Talep Edin', href: '/contact?topic=GENERAL' },
    ],
  },

  contact: {
    seo: {
      title: 'Kumaş Uzmanıyla Görüşün — JUSTEKS İletişim',
      description:
        'Toptan fiyat, numune, özel tedarik, uluslararası ticaret veya teknik ürün bilgisi için JUSTEKS ekibiyle görüşün.',
    },
    intro: {
      eyebrow: 'İletişim',
      heading: 'Kumaş Uzmanıyla Görüşün.',
      lead: 'Ne ürettiğinizi anlatın; talebinizi doğru kişiye yönlendirelim.',
    },
    body: [
      'Doğru konuyu seçmeniz, talebinizin iki kez yönlendirilip sonra yanıtlanması yerine doğrudan cevaplayabilecek ekibe ulaşması anlamına gelir.',
    ],
    ctas: [],
  },

  notFound: {
    seo: {
      title: 'Sayfa Bulunamadı — JUSTEKS',
      description: 'Aradığınız sayfa bulunamadı.',
    },
    intro: {
      eyebrow: 'Hata 404',
      heading: 'Bu Sayfa Bulunamadı.',
      lead: 'Sayfa taşınmış ya da adres eksik girilmiş olabilir.',
    },
    body: [
      'Kumaş kategorilerine göz atabilir, koleksiyonları inceleyebilir veya doğrudan ekibimizle iletişime geçebilirsiniz; aradığınıza yönlendirelim.',
    ],
    ctas: [
      { label: 'Kumaşları İnceleyin', href: '/fabrics' },
      { label: 'İletişime Geçin', href: '/contact?topic=GENERAL' },
    ],
  },

  privacy: {
    seo: {
      title: 'Gizlilik Politikası — JUSTEKS',
      description: 'JUSTEKS’in bu web sitesi üzerinden ilettiğiniz bilgileri nasıl topladığı, kullandığı ve koruduğu.',
    },
    intro: {
      eyebrow: 'Yasal',
      heading: 'Gizlilik Politikası',
      lead: 'Bu site üzerinden neyi topladığımız, neden topladığımız ve ne kadar sakladığımız.',
    },
    body: [
      'Bu politika, justeks.com üzerinden iletilen bilgilerin JUSTEKS tarafından nasıl işlendiğini açıklar. Sitedeki formlar aracılığıyla yapılan talepler, özel tedarik istekleri, yüksek metrajlı talepler ve trade account başvuruları için geçerlidir.',
    ],
    sections: [
      {
        heading: 'Neleri topluyoruz',
        body: [
          'Bir form gönderdiğinizde ilettiğiniz kurumsal iletişim bilgilerini ve talep bilgilerini topluyoruz: firma adı, kişi adı, e-posta adresi, telefon numarası, ülke ve talebinizin ayrıntıları. Referans materyali yüklediğinizde bu dosyaları talebin yanında saklıyoruz.',
          'Ayrıca hizmeti güvenli işletmek için gerekli teknik bilgileri, formların kötüye kullanımını önlemek amacıyla gönderimin geldiği IP adresi dahil olmak üzere kaydediyoruz.',
        ],
      },
      {
        heading: 'Neden kullanıyoruz',
        body: [
          'Bu bilgileri talebinize yanıt vermek, teklif hazırlamak, numune organize etmek ve siparişleri yerine getirmek için kullanıyoruz. Satmıyoruz ve onayınız olmadan ilgisiz pazarlama amacıyla kullanmıyoruz.',
        ],
      },
      {
        heading: 'Ne kadar saklıyoruz',
        body: [
          'Talep kayıtları, ticari ilişki için gerekli olduğu süre boyunca ve ilgili muhasebe ile vergi yükümlülüklerinin gerektirdiği süre kadar saklanır; ardından silinir.',
        ],
      },
      {
        heading: 'Haklarınız',
        body: [
          'Hakkınızda tuttuğumuz bilgilere erişim talep edebilir, düzeltilmesini isteyebilir veya saklamakla yükümlü olmadığımız durumlarda silinmesini talep edebilirsiniz. Talebiniz için iletişim sayfasındaki bilgileri kullanarak bize ulaşın.',
        ],
      },
    ],
    note: 'Bu politika, kurumsal tüzel kişilik bilgileri ve veri koruma kaydı kesinleştiğinde güncellenecektir.',
    ctas: [{ label: 'İletişime Geçin', href: '/contact?topic=GENERAL' }],
  },

  cookies: {
    seo: {
      title: 'Çerez Politikası — JUSTEKS',
      description: 'Bu web sitesinin çerezleri ve benzer teknolojileri nasıl kullandığı.',
    },
    intro: {
      eyebrow: 'Yasal',
      heading: 'Çerez Politikası',
      lead: 'Bu sitenin tarayıcınızda neyi sakladığı ve neyi saklamadığı.',
    },
    body: [
      'Bu web sitesi statik sayfalar bütünü olarak kurulmuştur ve çalışmak için çereze ihtiyaç duymaz. Reklam veya siteler arası takip çerezi kullanmıyoruz.',
    ],
    sections: [
      {
        heading: 'Ne kullanıyoruz',
        body: [
          'Ziyaretler arasında dil tercihinizi hatırlamak için kesinlikle gerekli depolama kullanılabilir. Bu bilgi tarayıcınızda kalır ve üçüncü taraflara iletilmez.',
        ],
      },
      {
        heading: 'Analitik',
        body: [
          'İleride analitik araçlar eklenirse bu politika devreye alınmadan önce güncellenecek ve zorunlu olmayan çerezler onayınıza tabi olacaktır.',
        ],
      },
    ],
    ctas: [{ label: 'İletişime Geçin', href: '/contact?topic=GENERAL' }],
  },

  terms: {
    seo: {
      title: 'Kullanım Koşulları — JUSTEKS',
      description: 'Bu web sitesinin kullanımına ve site üzerinden iletilen taleplere uygulanan koşullar.',
    },
    intro: {
      eyebrow: 'Yasal',
      heading: 'Kullanım Koşulları',
      lead: 'Bu web sitesine ve site üzerinden iletilen taleplere uygulanan koşullar.',
    },
    body: [
      'Bu koşullar justeks.com kullanımınızı düzenler. Mal tedarikine ilişkin ticari şartlar; taraflar arasında mutabık kalınan teklif, sipariş onayı ve satış sözleşmesinde ayrıca belirlenir.',
    ],
    sections: [
      {
        heading: 'Site içeriği',
        body: [
          'Bu sitede gösterilen kumaş spesifikasyonları — kompozisyon, gramaj, en, konstrüksiyon ve kullanım alanları dahil — bilgilendirme amaçlıdır ve bir kategori veya ürün için tipik aralıkları tarif eder. Herhangi bir sipariş için bağlayıcı spesifikasyon, teklifte ve sipariş onayında teyit edilendir.',
          'Ekranda renk gösterimi cihaza göre değişir ve renk eşleştirmesi için esas alınamaz. Renk; fiziksel swatch, numune veya renk kartelası üzerinden onaylanmalıdır.',
        ],
      },
      {
        heading: 'Talepler ve teklifler',
        body: [
          'Bu site üzerinden iletilen bir talep bilgi isteğidir ve sipariş anlamına gelmez. Fiyatlar, stok durumu, minimum sipariş miktarları ve terminler teklif aşamasında teyit edilir; sipariş anındaki stok ve üretim kapasitesine tabidir.',
        ],
      },
      {
        heading: 'Teslim şekilleri',
        body: [
          'Teslim şekilleri; ürün, sipariş hacmi ve destinasyona göre teklif aşamasında teyit edilir. Bir siparişe uygulanan Incoterms, teklifte ve sipariş onayında belirtilir.',
        ],
      },
      {
        heading: 'Fikri mülkiyet',
        body: [
          'Metin, görsel ve JUSTEKS adı ile markaları dahil olmak üzere bu web sitesinin içeriği JUSTEKS’e aittir ve izinsiz olarak ticari amaçla çoğaltılamaz.',
        ],
      },
    ],
    note: 'Bu koşullar, kurumsal tüzel kişilik bilgileri ve uygulanacak hukuk kesinleştiğinde güncellenecektir.',
    ctas: [{ label: 'İletişime Geçin', href: '/contact?topic=GENERAL' }],
  },
}
