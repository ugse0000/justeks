import type { ArticleContent } from '../schema'

export const insights: Record<string, ArticleContent> = {
  'what-is-linen-fabric': {
    slug: 'what-is-linen-fabric',
    title: 'Keten Kumaş Nedir?',
    seo: {
      title: 'Keten Kumaş Nedir? Alıcı Rehberi — JUSTEKS',
      description:
        'Üretim alıcıları için keten: keten lifinin davranışı, hangi gramajın hangi ürüne uygun olduğu, neden buruştuğu ve toplu siparişten önce neyin teyit edilmesi gerektiği.',
    },
    publishedAt: '2026-02-10',
    readingMinutes: 6,
    standfirst:
      'Keten, kesintisiz kullanımdaki en eski tekstil lifidir ve en sık yanlış belirlenenidir. Bir ketenin üretiminize uygun olup olmadığına gerçekte karar veren şeyler şunlar.',
    body: [
      { kind: 'p', text: 'Keten, keten bitkisinin sapı boyunca uzanan sak liflerinden eğrilir. Bu lifler uzun, içi boş ve kalınlığı düzensizdir; ketenin iyi ya da kötü yaptığı hemen her şey buradan doğar. İçi boş yapı nemi hızla hareket ettirir, bu yüzden keten sıcakta serin hissettirir. Uzunluk mukavemet verir — alışılmadık biçimde keten ıslakken kurudan daha güçlüdür, tekrarlanan yıkamaya bu yüzden dayanır. Düzensizlik ise kumaş boyunca uzanan slubu üretir; sektör bunu kusur değil karakter olarak okur.' },
      { kind: 'h2', text: 'Uygulamayı gramaj belirler' },
      { kind: 'p', text: 'Bu yazıdan tek bir şey alacaksanız şu olsun: ketende karar GSM’dir. İkisi de dürüstçe %100 keten diye tanımlanan iki kumaş tamamen farklı ürünler olabilir ve onları ayıran sayı gramajdır.' },
      { kind: 'spec', rows: [
        { label: '120 GSM altı', value: 'Yarı şeffaf. Bluz, eşarp, katmanlı elbise.' },
        { label: '140 – 180 GSM', value: 'Gömleklik ve elbiselik. En çok belirlenen aralık.' },
        { label: '180 – 220 GSM', value: 'Pantolon, yapısız ceket, yazlık takım elbise.' },
        { label: '250 GSM ve üzeri', value: 'Kanvas, döşemelik, yapılı dış giyim.' },
      ] },
      { kind: 'p', text: '120 GSM’in altındaki her şey yarı şeffaf olacaktır; bu amaçlanmadıysa numunede değil provada fark edilir. 250 GSM üzerinde keten hazır giyim kumaşı gibi davranmayı bırakır ve yapısal hâle gelir.' },
      { kind: 'h2', text: 'Karışım bir taviz değil, üretim kararıdır' },
      { kind: 'p', text: 'Saf keten otomatik olarak daha iyi seçim değildir. Keten-pamuk tuşeyi yumuşatır, buruşmayı azaltır ve dikim hattında daha bağışlayıcıdır. Keten-viskon akıcılık ve döküm ekler; bu, saf ketenin bedenden uzak duracağı elbiselerde işe yarar. Her iki karışım da hacimde %100 ketenden daha öngörülebilir davranır ve yüksek adetli bir program için bu öngörülebilirliğin gerçek ticari değeri vardır.' },
      { kind: 'h2', text: 'Buruşma bir kusur değildir' },
      { kind: 'p', text: 'Keten buruşur çünkü keten lifinin elastik geri dönüşü çok düşüktür. Lif, yün gibi geri toplamaz. Hiçbir apre bunu tamamen ortadan kaldırmaz; buruşmayan bir %100 keten iddia eden tedarikçi ya bir karışımı ya da tuşeyi değiştirecek ağır bir reçine apresini tarif ediyordur.' },
      { kind: 'p', text: 'Apre’nin kontrol ettiği şey buruşmanın nasıl okunduğudur. Yumuşak veya enzim yıkama ipliği gevşetir ve kumaşa baştan yaşanmış bir yüzey verir; böylece buruşma kasıtlı görünür. Sert apre kalıplı formlar için gövdeyi korur ama her katı keskin gösterir. Hangisini istediğinize teklif öncesinde karar verin; bu, tuşeyi, çekmeyi ve ürünün nasıl yaşlandığını değiştirir.' },
      { kind: 'h2', text: 'Toplu siparişten önce teyit edilecekler' },
      { kind: 'list', items: [
        'Çekme payı ve kumaşın ön yıkamalı olup olmadığı — keten pamuktan daha çok hareket eder.',
        'Apre; swatch’tan varsayılmadan açıkça belirtilmiş olmalı.',
        'Slub dağılımı yalnızca kesitte değil üretim numunesinde.',
        'Kolay saçaklanan hafif gramajlarda dikiş yapısı.',
      ] },
      { kind: 'p', text: 'Keten, davranışının büyük bölümü lif aşamasından sonra belirlendiği için neredeyse her lifden daha çok kesin spesifikasyonu ödüllendirir. Tedarikçinize gramajı, apreyi ve kullanım alanını söyleyin; konuşma hemen işe yarar hâle gelir.' },
      { kind: 'h2', text: 'Yıkamalı keten ayrı bir üründür' },
      { kind: 'p', text: 'Yıkamalı keteni ayırmakta fayda var; çünkü alıcılar onu çoğu zaman daha yumuşak tuşeli aynı kumaş sanır. Değildir. Enzim veya taş yıkama ipliği fiziksel olarak gevşetir ve kısmen parçalar; bu kumaşı yumuşatır, kalan çekmenin büyük bölümünü alır ve ona baştan yaşanmış bir yüzey verir. Aynı zamanda kopma mukavemetini bir miktar düşürür ve slubu belirginleştirir. İlk giyimden itibaren rahat görünmesi istenen bir ürün için doğru seçimdir ve toplu üretimden çekme riskinin büyük kısmını kaldırır. Gövde isteyen yapılı formlar içinse yanlış seçimdir.' },
    ],
    relatedFabrics: ['linen', 'shirting'],
  },

  'why-fabric-gsm-matters': {
    slug: 'why-fabric-gsm-matters',
    title: 'Kumaş GSM Değeri Neden Önemlidir?',
    seo: {
      title: 'Kumaş GSM Değeri Neden Önemlidir — ve Nerede Yanıltır — JUSTEKS',
      description:
        'Üretim alıcıları için GSM: metrekare başına gramın ne anlattığı, neyi gizlediği ve en ile iplik numarasının neden aynı cümlede yer alması gerektiği.',
    },
    publishedAt: '2026-03-04',
    readingMinutes: 5,
    standfirst:
      'GSM, çoğu alıcının sorduğu ilk sayıdır ve onu anlamlı kılan iki değer olmadan en sık aktarılanıdır.',
    body: [
      { kind: 'p', text: 'GSM, metrekare başına gram demektir: kumaşın bir metrekaresinin ağırlığı. Bir kumaşı konumlandırmanın en hızlı yoludur — kabaca hangi sezona ait olduğunu, navlununun ne tutacağını ve hangi tip ürünü taşıyabileceğini söyler. Her spesifikasyon formunda bulunmasının ve alıcıların önce ona uzanmasının nedeni budur.' },
      { kind: 'h2', text: 'GSM gerçekte ne anlatır' },
      { kind: 'p', text: 'Tek bir konstrüksiyon içinde gramaj; örtücülük, döküm ve dayanıklılıkla güçlü şekilde ilişkilidir. 120 GSM pamuklu poplin ile 180 GSM pamuklu poplin aynı tür kumaşın farklı gramajlarıdır ve ağır olan daha örtücü, elde daha dolgun ve daha uzun ömürlüdür. Kategori içinde GSM güvenilir bir kısayoldur.' },
      { kind: 'h2', text: 'Nerede yanıltır' },
      { kind: 'p', text: 'Konstrüksiyonlar arasında GSM karşılaştırılabilir olmaktan çıkar. 180 GSM keten ile 180 GSM süprem aynı ağırlıktadır ve hiç benzemez: biri dokuma gömlekliktir, diğeri her iki yönde esneyen örme tişört kumaşı. Bunları yalnızca gramajla karşılaştırmak işe yarar hiçbir şey söylemez.' },
      { kind: 'p', text: 'Daha pahalıya mal olan hata, GSM’i kalite göstergesi saymaktır. 120 GSM’deki iki pamuklu poplin arasında üç kat fiyat farkı olabilir ve farkı yaratan iplik numarasıdır. İnce katlı iplik düzgün, parlak ve dayanıklı bir kumaş verir; aynı gramajda kalın tek kat iplik belirgin şekilde daha kaba bir şey verir. Terazi bu farkı göremez. Müşteriniz görür.' },
      { kind: 'h2', text: 'En, aynı cümlede yer almalıdır' },
      { kind: 'p', text: 'GSM metrekareyi fiyatlar ama üretim metretül tüketir. 150 cm ende verilen bir kumaş, 140 cm endekinden metre başına belirgin şekilde daha fazla kullanılabilir kumaş verir; kalıp parçalarının düzgün yerleşmediği bir pastalda bu fark iki kumaş arasındaki fiyat farkını aşabilir.' },
      { kind: 'spec', rows: [
        { label: 'GSM', value: 'Metrekare ağırlığı — sezon, örtücülük, dayanıklılık' },
        { label: 'İplik numarası', value: 'İpliğin inceliği — tuşe, parlaklık, fiyat seviyesi' },
        { label: 'En', value: 'Metretül başına kullanılabilir kumaş — gerçek tüketim' },
        { label: 'Konstrüksiyon', value: 'Dokuma mı örme mi, hangi yapıda' },
      ] },
      { kind: 'h2', text: 'Nasıl doğru sorulur' },
      { kind: 'p', text: 'Dördünü birlikte isteyin. “120 GSM pamuklu poplin” eksik bir taleptir; “120 GSM pamuklu poplin, 2/100, 150 cm” ise bir tedarikçinin fiyatlayabileceği ve on iki ay sonra tekrar üretebileceği bir spesifikasyondur. Ek iki değeri belirtmek hiçbir maliyet getirmez ve sonradan anlaşmazlık üreten belirsizliğin çoğunu ortadan kaldırır.' },
      { kind: 'list', items: [
        'GSM’i yalnızca aynı konstrüksiyon içinde karşılaştırın.',
        'Dokumalarda gramajla birlikte iplik numarasını isteyin.',
        'Metre maliyetini değil ürün başına maliyeti hesaplayın.',
        'Örmelerde gramajın gevşemiş hâlde verildiğini unutmayın — değişir.',
      ] },
      { kind: 'h2', text: 'Örmeler üzerine bir not' },
      { kind: 'p', text: 'Örme kumaşlar bu tabloyu daha da karmaşıklaştırır; çünkü bir örme gevşemiş hâlindeki gramajıyla verilir ve örme gevşemiş kalmaz. Rulodaki gerilim, apre rotası ve kumaşın ne kadar dinlendiği ölçülen değeri kaydırır; 180 GSM olarak verilen bir süprem dinlendirildikten sonra belirgin şekilde farklı ölçülebilir. Kesimden önce dinlendirmenin bir önlem değil standart uygulama olmasının nedeni budur: bir örmeyi rulodan doğrudan kesmek dönük yan dikişler ve düzensiz çeken ürünler üretir ve spesifikasyon formundaki hiçbir GSM değeri sizi bu konuda uyarmaz.' },
    ],
    relatedFabrics: ['cotton', 'shirting', 'knitted'],
  },

  'poplin-vs-oxford': {
    slug: 'poplin-vs-oxford',
    title: 'Poplin ve Oxford Arasındaki Farklar',
    seo: {
      title: 'Poplin ve Oxford Gömleklik — Gerçek Farklar — JUSTEKS',
      description:
        'Poplin ile oxford gömleklik arasındaki gerçek farklar: örgü yapısı, gramaj, resmiyet, dayanıklılık ve hangisinin hangi gömleğe ait olduğu.',
    },
    publishedAt: '2026-03-26',
    readingMinutes: 5,
    standfirst:
      'İkisi de pamuklu. İkisi de gömleklik. Fark yapısaldır ve kumaşın hangi yakanın altına ait olduğuna karar verir.',
    body: [
      { kind: 'p', text: 'Poplin ve oxford, gömlek üretiminin üzerinde yürüdüğü iki konstrüksiyondur ve aralarındaki seçim bir zevk meselesi değildir. Gömleğin ne için olduğundan doğar.' },
      { kind: 'h2', text: 'Poplin: sık bir bezayağı' },
      { kind: 'p', text: 'Poplin bir üstten bir alttan dokunur ve çözgüsü atkısından incedir. Bu dengesizlik, tırnakla hissedilen ama zor görülen ince bir enine rapor ve düzgün, sık, hafif parlak bir yüzey üretir. Keskin bir ütü tutar ve ceketin altında düz oturur.' },
      { kind: 'p', text: 'Bedeli, poplinin her şeyi göstermesidir. Kırışıklıklar keskin okunur ve iplikteki her düzensizlik düz, tekdüze bir yüzeyde görünür. İnce poplinlerin yüksek numaralı katlı ipliklerden yapılmasının nedeni budur — konstrüksiyon saklanacak yer bırakmaz.' },
      { kind: 'h2', text: 'Oxford: görünür dokulu sepet örgü' },
      { kind: 'p', text: 'Oxford iplikleri gruplar ve iki üstten iki alttan ya da daha fazlasıyla dokur. Sonuç, görünür sepet dokusu olan daha gevşek ve açık bir yapıdır. Klasik oxford ayrıca beyaz atkıya karşı renkli çözgü kullanır; mavi bir oxford’un düz mavi yerine hafif karışık ve yumuşamış bir renk vermesinin nedeni budur.' },
      { kind: 'p', text: 'Bu yapı oxford’u daha ağır, daha dayanıklı ve daha bağışlayıcı kılar. Daha az görünür buruşur, daha fazla yıkamaya dayanır ve rahat okunur — düğmeli yakanın tam olarak onun için icat edilmesinin ve resmî bir takımın altında oxford’un fark edenlere yanlış görünmesinin nedeni budur.' },
      { kind: 'spec', rows: [
        { label: 'Poplin örgü', value: 'Bezayağı, bir üst bir alt, ince çözgü' },
        { label: 'Poplin gramaj', value: 'Genellikle 100 – 130 GSM' },
        { label: 'Oxford örgü', value: 'Sepet, iki üstten iki alttan veya daha fazla' },
        { label: 'Oxford gramaj', value: 'Genellikle 130 – 170 GSM' },
      ] },
      { kind: 'h2', text: 'Hangisi belirlenmeli' },
      { kind: 'p', text: 'Resmî ve iş gömlekliği: fiyat noktasının izin verdiği en yüksek iplik numarasında poplin. Günlük gömleklik ve düğmeli yakalı her şey: oxford. Royal oxford ikisinin arasında durur — daha ince ipliklerde ve daha parlak bir oxford yapısı; iş için yeterince resmî ama poplinden daha yüzey karakterli.' },
      { kind: 'h2', text: 'Üretim notları' },
      { kind: 'list', items: [
        'Poplin iyi eşleştirilmiş tela ister; düzgün yüzey kabarmayı hemen gösterir.',
        'Oxford’un açık yapısı ham kenarda daha çok saçaklanır — dikiş temizliğini kontrol edin.',
        'Renkli çözgülü oxford, parça boyalı poplinden daha görünür parti farkı verir.',
        'İkisi de toplu üretim öncesi dikilip yıkanmış numune ister; düz swatch yakanın nasıl davranacağını göstermez.',
      ] },
      { kind: 'p', text: 'Müşteri karar veremiyorsa pratik test yakadır. Klasik veya kırlangıç yaka etrafında kurulmuş bir gömlek poplin ister. Düğmeli yaka etrafında kurulmuş bir gömlek oxford ister. Kumaş ve yaka birlikte geliştirilmiştir; bu eşleşmeyi göz ardı eden ürünler, giyen kişi nedenini bilmeden hafifçe yanlış görünür.' },
      { kind: 'h2', text: 'Peki pinpoint ve royal oxford?' },
      { kind: 'p', text: 'Pinpoint oxford aynı sepet yapısını daha ince ipliklerde ve daha sık sıklıkta kullanır; standart oxford ile poplin arasına oturur: oxforddan daha düzgün, poplinden daha dokulu ve günlük iş kullanımı için yeterince dayanıklı. Royal oxford bir adım daha ileri gider; ince iplikleri daha karmaşık bir sepet varyasyonunda kullanarak hafif bir parlaklık ve görünür yüzey karakteri üretir. Müşteri poplinin düzlüğü olmadan resmî okunan bir gömlek istediğinde ikisi de işe yarar ve iplikler daha ince, sıklık daha yüksek olduğu için ikisi de kaynak konstrüksiyonlardan pahalıdır.' },
    ],
    relatedFabrics: ['shirting', 'cotton'],
  },

  'how-to-choose-shirting-fabric': {
    slug: 'how-to-choose-shirting-fabric',
    title: 'Gömleklik Kumaş Nasıl Seçilir?',
    seo: {
      title: 'Üretim İçin Gömleklik Kumaş Nasıl Seçilir — JUSTEKS',
      description:
        'Bir üretim alıcısı için gömleklik belirleme sırası: iplik numarası, konstrüksiyon, gramaj, apre, tela ve toplu siparişten önce test edilmesi gerekenler.',
    },
    publishedAt: '2026-04-18',
    readingMinutes: 6,
    standfirst:
      'Gömleklik sorunlarının çoğu dikim hattında değil spesifikasyon aşamasında belirlenir. Kararların hangi sırayla verilmesi gerektiği şöyle.',
    body: [
      { kind: 'p', text: 'Gömleklik, hazır giyimin en çok spesifikasyona dayalı kategorisidir. Kumaş tene değer, yaka taşır, ütü tutar ve gardıropta her şeyden daha sık yıkanır. Spesifikasyonu doğru yapın, üretim sorunsuz ilerler; yanlış yapın, hata müşteri gömleği üç kez yıkadıktan sonra ortaya çıkar.' },
      { kind: 'h2', text: '1. Gramajla değil iplik numarasıyla başlayın' },
      { kind: 'p', text: 'İplik numarası, fiyat seviyesini ve algılanan kalitenin büyük bölümünü belirleyen sayıdır. 2/100 katlı iplik ince, düzgün, parlak ve iyi yaşlanan bir kumaş verir. 40/1 tek kat iplik ise maliyetin çok altında sağlam bir günlük gömlek verir. İkisi de 120 GSM poplin olabilir. Önce numarayı belirtin, gerisi kolaylaşır.' },
      { kind: 'h2', text: '2. Sonra konstrüksiyon' },
      { kind: 'p', text: 'Resmî düzgünlük için poplin. Doku ve dayanıklılık için oxford. Yumuşak döküm ve gün boyu buruşma direnci için dimi. Sıcak iklim üretimi için keten veya keten-pamuk — buruşacağını kabul ederek. Konstrüksiyon, ruloda en iyi görünenden değil gömleğin nasıl giyileceğinden doğar.' },
      { kind: 'h2', text: '3. Sezona ve pazara göre gramaj' },
      { kind: 'spec', rows: [
        { label: '95 – 110 GSM', value: 'Hafif, sıcak iklimler, örtücülüğe dikkat gerekebilir' },
        { label: '110 – 130 GSM', value: 'İş gömlekliğinin ana akım aralığı' },
        { label: '130 – 160 GSM', value: 'Günlük gömleklik, oxford, şardonlu kışlık kumaşlar' },
      ] },
      { kind: 'p', text: 'Alt uçta özellikle beyazda örtücülüğü kontrol edin. Ofis aydınlatmasında şeffaf duran beyaz bir gömlek, kumaş başka açılardan ne kadar iyi olursa olsun iade edilir.' },
      { kind: 'h2', text: '4. Apre ve esneklik' },
      { kind: 'p', text: 'Kolay ütü ve ütü istemez apreler buruşmayı azaltır ama tuşeyi ve mukavemeti etkileyebilir; bakım talimatını değiştirdikleri için beyan edilmeleri gerekir. Yüzde iki elastanlı likralı gömleklik kalıbı ve konforu dönüştürür ama çekmeyi ve ütü davranışını değiştirir — ikisini de varsaymak yerine yıkanmış numunede teyit edin.' },
      { kind: 'h2', text: '5. Tela, kumaşla birlikte seçilir' },
      { kind: 'p', text: 'En sık atlanan ve en çok şikâyet üreten adım budur. Yaka ve manşet telası kumaşla birlikte seçilmeli ve yıkama boyunca test edilmelidir. Yanlış telaya yapıştırılmış ince bir poplin birkaç yıkamadan sonra yakada kabarır ve iyi kumaş bunu telafi etmez.' },
      { kind: 'h2', text: 'Toplu üretimden önce' },
      { kind: 'list', items: [
        'Tam bir numune gömlek dikin, beş kez yıkayın, sonra yakaya bakın.',
        'Çekmeyi yalnızca boyda değil her iki yönde teyit edin.',
        'Çizgi ve ekosede rapor tutturma payını teklifte mutabık kalın.',
        'Rengi fiziksel swatch üzerinden ve birden fazla ışık kaynağında onaylayın.',
      ] },
      { kind: 'p', text: 'Bunların hiçbiri sıra dışı değil. Yalnızca öngörülebilir sorunların pahalı hâle gelmesini engelleyen sıra; bir üretim partisi yerine numune aşamasında birkaç güne mal olur.' },
      { kind: 'h2', text: 'Kararı doğru maliyetlendirmek' },
      { kind: 'p', text: 'Son bir nokta; çünkü gömleklik programları ticari olarak en sık burada yanlışa gider. Metre başına kumaş fiyatı gömleğin maliyeti değildir. En, tüketimi belirler; çizgi ve ekosede rapor tutturma bunu artırır; dikkatli işleme gerektiren bir kumaş dikim hattında ürün başına dakika ekler. 150 cm ende, düz ve biraz daha pahalı bir kumaş; 140 cm ende, rapor tutturulması gereken ucuz bir kumaştan daha ucuz bir bitmiş gömlek verebilir. Metreyi değil ürünü maliyetlendirin; iki teklif arasındaki karşılaştırma o zaman anlamlı hâle gelir.' },
    ],
    relatedFabrics: ['shirting', 'cotton', 'linen'],
  },

  'what-is-twill-fabric': {
    slug: 'what-is-twill-fabric',
    title: 'Twill (Dimi) Kumaş Nedir?',
    seo: {
      title: 'Twill Kumaş Nedir? Örgü, Gramaj ve Kullanım Alanları — JUSTEKS',
      description:
        'Dimi açıklaması: çapraz örgünün nasıl kurulduğu, neden bezayağından farklı döküldüğü ve aşındığı, denim, gabardin ve drill’in nerede durduğu.',
    },
    publishedAt: '2026-05-12',
    readingMinutes: 5,
    standfirst:
      'Dimi; denimin, gabardinin, drill’in ve şimdiye kadar üretilmiş çoğu pantolonun arkasındaki örgüdür. Çapraz çizgi süs değildir — kumaşın öyle davranmasının nedenidir.',
    body: [
      { kind: 'p', text: 'Bezayağında her atkı ipliği bir çözgünün üstünden, bir sonrakinin altından geçer. Dimide ise atkı iki veya daha fazla çözgünün üstünden, ardından bir veya daha fazlasının altından geçer ve bağlantı noktası her sırada bir iplik kayar. Kumaşın yüzünde uzanan çapraz çizgiyi üreten şey bu kaymadır.' },
      { kind: 'h2', text: 'Yapı neden önemli' },
      { kind: 'p', text: 'Daha az bağlantı noktası, ipliklerin daha yoğun paketlenebilmesi demektir; bu da dimiyi belirli bir iplik numarasında daha ağır ve daha dayanıklı kılar. Aynı gevşek bağlantı iplikleri birbirine karşı hareket ettirir, dolayısıyla dimi aynı gramajdaki bir bezayağından daha yumuşak dökülür ve buruşmaya daha iyi direnir — kumaş bir katı tutmak yerine soğurabilir.' },
      { kind: 'p', text: 'Çapraz ayrıca yüzeyi görsel olarak parçalar; dimi kiri ve yıpranmayı düz bir bezayağından daha iyi gizler. Dayanıklı, yumuşak dökümlü ve kire bağışlayıcı bu birleşim, dimiye pantolon, iş kıyafeti ve üniformada tam olarak neden hâkim olduğunu açıklar.' },
      { kind: 'h2', text: 'Dimi ailesi' },
      { kind: 'spec', rows: [
        { label: 'Denim', value: 'Çözgü yüzlü dimi, indigo çözgü, boyasız atkı' },
        { label: 'Gabardin', value: 'Dik açılı, sık dokunmuş dimi — pantolon ve dış giyim' },
        { label: 'Drill', value: 'Ağır pamuklu dimi — iş kıyafeti ve üniforma' },
        { label: 'Chino', value: 'Daha hafif pamuklu dimi, genellikle parça boyalı' },
        { label: 'Serj', value: 'İki yüzü dengeli dimi; terzilik ve üniformada yaygın' },
      ] },
      { kind: 'p', text: 'Dimi açısı değişir. Dik dimi dikeye daha yakın uzanır ve daha sıkı, daha serttir; yatık dimi yataya daha yakındır ve daha yumuşaktır. Gabardin tanımı gereği diktir; pantolonda ütü çizgisini bu kadar iyi tutmasının nedeni budur.' },
      { kind: 'h2', text: 'Yön bir üretim meselesidir' },
      { kind: 'p', text: 'Çaprazın bir yönü vardır — sağ veya sol — ve bu görünürdür. Bir ürünün tüm panelleri dimi aynı yönde uzanacak şekilde kesilmelidir; aksi hâlde fark yan ışıkta dikişlerde ortaya çıkar. Dimiyi bezayağı gibi işleyen fabrikalarda bu, ikinci kalite ürünün rutin nedenlerindendir.' },
      { kind: 'h2', text: 'Teyit edilecekler' },
      { kind: 'list', items: [
        'Dimi yönü ve kesimhanenin buna uyacağı.',
        'Kumaşın çözgü yüzlü olup olmadığı; bu, solma ve aşınma biçimini etkiler.',
        'Koyu tonlarda sürtme haslığı — sık dimiler çok boya taşır.',
        'Yıkama sonrası dönme; apre aceleye gelmişse dimi burulabilir.',
      ] },
      { kind: 'p', text: 'Dimi kullanımda bağışlayıcı, kesimhanede bağışlayıcısızdır. Yönü doğru yönetin; üretimdeki en güvenilir konstrüksiyonlardan biridir.' },
      { kind: 'h2', text: 'Çözgü yüzlü ve atkı yüzlü' },
      { kind: 'p', text: 'Dimiler, yüzeye hangi ipliğin hâkim olduğuna göre çözgü yüzlü veya atkı yüzlü olarak tanımlanır. Denim, çözgü yüzlü diminin en net örneğidir: indigo boyalı çözgü yüzde, boyasız atkı arkada durur; bir jeanin iç yüzünün açık renk olmasının nedeni budur. Bu yapı kumaşın nasıl yaşlandığına da karar verir, çünkü aşınan iplik yüzeydeki ipliktir. Çözgü yüzlü bir dimide aşınan boyalı çözgüdür ve altındaki açık renk çekirdek açığa çıkar; denimin dikiş ve zorlanma noktalarında solmasının tüm mekanizması budur.' },
    ],
    relatedFabrics: ['cotton', 'denim', 'tailoring'],
  },

  'reading-fabric-composition': {
    slug: 'reading-fabric-composition',
    title: 'Kumaş Kompozisyonu Nasıl Okunur?',
    seo: {
      title: 'Kumaş Kompozisyonu Nasıl Okunur — JUSTEKS',
      description:
        'Bir kompozisyon satırının gerçekte ne anlattığı: lif yüzdeleri, az miktarda elastanın neyi değiştirdiği ve kompozisyonun tarif etmediği özellikler.',
    },
    publishedAt: '2026-06-09',
    readingMinutes: 5,
    standfirst:
      'Kompozisyon satırı, bir spesifikasyonun en çok aktarılan ve en az sorgulanan parçasıdır. Çok şey anlatır — ve bir kumaşın nasıl davranacağını belirleyenlerin çoğunu dışarıda bırakır.',
    body: [
      { kind: 'p', text: 'Kompozisyon, bir kumaşın hangi lifleri hangi ağırlık oranında içerdiğini azalan sırayla belirtir. “%65 Polyester %33 Viskon %2 Elastan” içerik hakkında eksiksiz ve kesin bir ifadedir. Olmadığı şey ise kumaşın tarifidir.' },
      { kind: 'h2', text: 'Yüzdeler gerçekte neyi değiştirir' },
      { kind: 'p', text: 'Önce baskın lifi okuyun: nefes alabilirliği, nem davranışını, bakım gereksinimlerini ve maliyetin büyük bölümünü o belirler. Çoğunluğu pamuk olan bir kumaş, ciddi bir sentetik içerikle bile pamuklu kumaş gibi davranır.' },
      { kind: 'p', text: 'Sonra azınlık lifleri okuyun; genellikle belirli bir nedenle oradadırlar. Yün karışımındaki polyester buruşma direncini artırır ve maliyeti düşürür. Keten karışımındaki viskon döküm ekler. Keten karışımındaki pamuk tuşeyi yumuşatır. Bunların hiçbiri seyreltme değildir; mühendislik kararlarıdır.' },
      { kind: 'h2', text: 'Elastan kendi paragrafını hak eder' },
      { kind: 'p', text: 'Yüzde iki-üç elastan, payıyla orantısız biçimde bir kumaşı dönüştürür. Konfor esnekliği ve geri toplama ekler, ürünün gün içinde nasıl oturduğunu değiştirir ve aynı anda çekmeyi, ütü davranışını ve dikim ayarını da değiştirir. Elastanlı bir kumaş farklı iğne, farklı dikiş ve farklı ısı ayarı ister.' },
      { kind: 'p', text: 'Alıcının sonradan devraldığı sonuçları da vardır: elastan yüksek ısı ve klorla bozunur, dolayısıyla elastanlı bir ürün elastansız olanla aynı bakım talimatını taşıyamaz. Bir kompozisyon satırında elastan görünüyorsa ve bakım etiketi bunu yansıtmıyorsa, biri spesifikasyonu okumamıştır.' },
      { kind: 'h2', text: 'Kompozisyonun anlatmadıkları' },
      { kind: 'spec', rows: [
        { label: 'Belirtilmez', value: 'İplik numarası — tuşe ve fiyatın en büyük belirleyicisi' },
        { label: 'Belirtilmez', value: 'Konstrüksiyon — dokuma mı örme mi, hangi yapıda' },
        { label: 'Belirtilmez', value: 'GSM — gramaj ve dolayısıyla kullanım alanı' },
        { label: 'Belirtilmez', value: 'Apre — yıkama, şardon, kaplama, merserizasyon' },
      ] },
      { kind: 'p', text: 'Pratik nokta budur. İki kumaş birebir aynı kompozisyon satırını paylaşıp tamamen farklı ürünler olabilir: %100 pamuk hem 90 GSM vualı hem 400 GSM kanvası tarif eder. Kompozisyon, spesifikasyonun bir satırıdır; spesifikasyonun kendisi değil.' },
      { kind: 'h2', text: 'Pratikte bir satırı okumak' },
      { kind: 'list', items: [
        'Baskın lif: karakteri ve bakımı belirler.',
        'Azınlık lifleri: her birinin ne için orada olduğunu sorun.',
        'Elastan: çekmeyi, ütüyü ve bakımı değiştirdiğini varsayın.',
        'Sonra numarayı, konstrüksiyonu, gramajı, eni ve apreyi isteyin.',
      ] },
      { kind: 'p', text: 'Beşini de tereddütsüz yanıtlayan bir tedarikçi gerçek bir ürünü tarif ediyordur. Yalnızca kompozisyonu söyleyebilen ise bir kategoriyi tarif ediyordur.' },
      { kind: 'h2', text: 'Kompozisyonun yasal beyana dönüştüğü yer' },
      { kind: 'p', text: 'Lif içeriği çoğu pazarda mevzuatla düzenlenir ve etiketteki yüzdeler pazarlama tarifi değil yasal ağırlık taşır. Toleranslar dardır, beyan kumaşta gerçekte bulunanı yansıtmak zorundadır ve lif aşamasında yanlış etiketlenmiş bir ürün, tedarikçiyi değil markayı takip eden bir sorundur. Alıcı için bunun pratik sonucu şudur: kompozisyonu bir kategori sayfasından veya geçen sezonun spesifikasyonundan değil, o spesifik ürüne ait teknik dokümantasyondan alın ve ürün yeniden sipariş edildiğinde değişmediğini teyit edin.' },
    ],
    relatedFabrics: ['cotton', 'viscose', 'wool'],
  },
}
