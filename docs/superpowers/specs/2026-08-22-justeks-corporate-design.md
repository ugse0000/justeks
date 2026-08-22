# JUSTEKS.com — Faz 1 Tasarım Dokümanı
## Kurumsal Vitrin + Talep (Enquiry) Altyapısı

- **Tarih:** 2026-08-22
- **Durum:** Onaylandı
- **Faz:** 1 / 3 (Faz 2: Ürün Katalogu & RFQ · Faz 3: Trade Account & Tam Admin)

---

## 1. Amaç

JUSTEKS.com'u, 2004'ten beri faaliyet gösteren, Birleşik Krallık menşeli kumaşlarda uzmanlaşmış uluslararası bir B2B tekstil tedarikçisi olarak konumlandıran kurumsal web sitesini kurmak.

Ziyaretçi ilk saniyelerde dört mesajı almalı:
`EST. 2004` · `BRITISH ORIGIN` · `TEXTILE EXPERTISE` · `GLOBAL SUPPLY`

Marka konumu: **Fabric House + Global B2B Textile Supplier**
Ana mesaj: **BRITISH ORIGIN. GLOBAL REACH.** — *Fabric, Perfected.*

Hedef kitle bireysel tüketici değil, **profesyonel satın almacıdır**: tekstil fabrikaları, konfeksiyon üreticileri, moda markaları, kumaş toptancıları, distribütörler, private label üreticileri, kurumsal satın alma departmanları.

---

## 2. Kapsam

### 2.1 Bu fazda yapılacak

| Alan | İçerik |
|---|---|
| Kurumsal anlatı | Home, About, Heritage, UK Origin, Textile Expertise, Quality & Traceability, Responsible Textiles |
| Tedarik anlatısı | Global Supply (interaktif harita), Trade & Logistics, High-Volume Orders |
| Ürün anlatısı | 12 kumaş kategorisi + 8 JUSTEKS koleksiyonu landing sayfası |
| Sektörler | Industries index + 8 sektör landing sayfası |
| Servisler | Sourcing Desk, Sample Service, Trade Account, Resource Centre |
| İçerik | Insights index + seed makaleler |
| İletişim | Talk to a Fabric Specialist (6 konu bazlı) |
| Yasal | Privacy, Cookie, Terms |
| Dil | EN (varsayılan) + TR, hreflang altyapısı |
| Backend | 4 talep formu → Postgres, dosya yükleme, referans numarası, durum akışı |
| Admin | Korumalı basit talep listeleme + durum güncelleme |
| SEO | Sayfa başına gerçek HTML, meta, canonical, hreflang, JSON-LD, sitemap, robots |

### 2.2 Bu fazda yapılmayacak (Faz 2 / 3)

- Ürün veritabanı ve Article Number'lı ürün detay sayfaları (`/fabrics/linen/jt-ln-180-001`)
- Find Your Fabric filtre motoru (Fabric Type, Composition, GSM, Width, Colour, ...)
- JUSTEKS Colour Library (JTC-001 ...)
- BUILD YOUR RFQ sepeti ve RFQ yönetim paneli
- Sample Request takip sistemi (JTS-2026-00128 durum akışı)
- Ürün admin paneli (renk, sertifika, medya, doküman, SEO alanları)
- Trade Account kullanıcı girişi ve hesap ekranları
- Incoterms / sipariş yönetimi

### 2.3 Bilinçli sapmalar

Brief'in ana sayfa akışında iki bölüm ürün verisi gerektiriyor:

- **06 — FEATURED FABRICS** gerçek ürün ve Article Number ister. Uydurma ürün kodu markaya zarar verir. Bu slot Faz 1'de **Textile Expertise** bölümüne devredilir.
- **07 — FIND YOUR FABRIC** filtre motoru ister. Bu slot Faz 1'de **Sourcing Desk** çağrısına devredilir ("You define the requirement. We help find the fabric.").

Katalog fazında her iki bölüm kendi yerine oturur; ana sayfa bölüm sırası korunur.

---

## 3. Teknoloji

| Katman | Seçim | Sürüm | Gerekçe |
|---|---|---|---|
| Build | Vite | 8.2.2 | Kullanıcı tercihi; hızlı, sade |
| UI | React + TypeScript | 19.2.8 / 6.0.2 | React 19 native `<title>`/`<meta>` head hoisting → prerender'ı basitleştirir |
| Router | React Router | 8.3.0 | Güncel; sade route ağacı yeterli |
| Prerender | Kendi build adımımız | — | `vite-react-ssg` React Router 6'ya bağlı. Site tamamen statik içerikten üretildiği için `react-dom/server` tabanlı kendi adımımız daha az risk taşır |
| Test (web) | Vitest + Playwright | 4.1.11 | İçerik bütünlüğü + smoke |
| Backend | Spring Boot | 4.1.1 | Java 25 uyumlu (Spring Framework 7) |
| Dil | Java | 25 LTS (Temurin) | Makinede kurulu |
| DB | PostgreSQL | 17 (Docker) | Lokal kurulum yok, `docker compose up` |
| DB test | Testcontainers | güncel | Gerçek Postgres üstünde entegrasyon testi |
| Migration | Flyway | güncel | Versiyonlu şema |

> **Not (çözüldü):** TypeScript sürümü **6.0.2**'dir. Vite şablonunun seçtiği sürüm budur; 7.0.2 zorlanmadı. `tsc --noEmit` temiz geçiyor.

---

## 4. Repo yapısı

```
JUSTEKS/
├─ docker-compose.yml            postgres:17 + adminer
├─ README.md
├─ web/
│  ├─ index.html
│  ├─ vite.config.ts
│  ├─ scripts/prerender.ts       route listesini gezip statik HTML üretir
│  ├─ site.config.ts             adres/telefon/e-posta/sosyal (placeholder)
│  ├─ public/
│  └─ src/
│     ├─ content/
│     │  ├─ en/                  tüm EN metinler (tip güvenli)
│     │  ├─ tr/                  tüm TR metinler
│     │  └─ schema.ts            içerik tipleri — TR/EN eşleşmesini derlemede zorlar
│     ├─ design/
│     │  ├─ tokens.css           renk, boşluk, tipografi ölçeği
│     │  └─ typography.css
│     ├─ components/
│     │  ├─ primitives/          Button, Eyebrow, Rule, Section, Container
│     │  ├─ layout/              Header, Nav, Footer, LanguageSwitch
│     │  └─ sections/            Hero, TrustStrip, Heritage, GlobalSupplyMap, ...
│     ├─ routes/                 sayfa başına bir dosya
│     ├─ lib/                    seo.ts, i18n.ts, api.ts
│     └─ main.tsx / App.tsx
└─ api/
   ├─ pom.xml
   └─ src/main/java/com/justeks/
      ├─ JusteksApplication.java
      ├─ enquiry/                Enquiry domain modülü
      ├─ storage/                StorageService + LocalStorageService
      ├─ notification/           NotificationService (log → SMTP)
      ├─ admin/                  korumalı listeleme
      └─ common/                 hata yönetimi, referans no, rate limit
```

**Ayrıklık ilkesi:** Kurumsal sayfalar backend'e bağımlı değildir. API çökse bile site ayakta kalır; yalnızca form gönderimi hata mesajı döner.

---

## 5. Route haritası

EN kökte, TR `/tr` önekiyle. Her sayfa build anında gerçek HTML üretir.

| Grup | Rota (EN) |
|---|---|
| Ana | `/` |
| Kurumsal | `/about`, `/heritage`, `/uk-origin`, `/textile-expertise`, `/quality-traceability`, `/responsible-textiles` |
| Tedarik | `/global-supply`, `/trade-logistics`, `/bulk-orders` |
| Kumaşlar | `/fabrics` + `/fabrics/{linen, cotton, viscose, polyester, wool, denim, knitted, shirting, tailoring, fashion, performance-technical, interior}` |
| Koleksiyonlar | `/collections` + `/collections/{linen, shirting, tailoring, natural, essential, performance, workwear, interior}` |
| Sektörler | `/industries` + `/industries/{fashion-apparel, shirting, tailoring, casual-streetwear, workwear, uniforms, hospitality, interior-upholstery}` |
| Servisler | `/sourcing`, `/sample-service`, `/trade-account`, `/resources` |
| İçerik | `/insights` + `/insights/{slug}` |
| İletişim | `/contact` |
| Yasal | `/privacy`, `/cookies`, `/terms` |
| Admin | `/admin/enquiries` (prerender edilmez, korumalı SPA) |

Toplam **56 EN + 56 TR = 112 statik sayfa** (admin hariç). Route tablosu
sayıldığında ilk tahmin olan 68 rakamı düşük çıktı: 12 kumaş kategorisi,
8 koleksiyon, 8 sektör ve 6 makale alt sayfası hesaba katılınca gerçek sayı
112 oldu. Ekstra sayfaların tamamı SEO açısından değerli landing sayfalarıdır.

---

## 6. Ana sayfa akışı

| # | Bölüm | Not |
|---|---|---|
| 01 | Hero | Tam ekran kumaş görseli; EST. 2004 / BRITISH ORIGIN. GLOBAL REACH. / Fabric, Perfected. / CTA: Explore Fabrics + Request a Quote |
| 02 | Trust Strip | EST. 2004 · UK ORIGIN · B2B WHOLESALE · GLOBAL SUPPLY |
| 03 | Our Heritage | 2004 → Bugün zaman çizgisi |
| 04 | Fabric Categories | 12 kategori grid → landing sayfaları |
| 05 | JUSTEKS Collections | 8 koleksiyon |
| 06 | Textile Expertise | Featured Fabrics yerine (bkz. 2.3) |
| 07 | Sourcing Desk | Find Your Fabric yerine (bkz. 2.3) |
| 08 | UK Origin | Menşe yaklaşımı |
| 09 | Quality & Traceability | Ürün kimliği alanları |
| 10 | Industries We Serve | 8 sektör |
| 11 | Sample Service | Swatch / Sample / Colour Card |
| 12 | Global Supply | İnteraktif dünya haritası |
| 13 | Trade & Logistics | Factory / Warehouse / Commercial delivery |
| 14 | High-Volume Orders | Bulk requirement CTA |
| 15 | Responsible Textiles | Yalnızca doğrulanabilir bilgi |
| 16 | Insights | Son yazılar |
| 17 | Corporate CTA | Koyu zemin, LET'S TALK FABRIC. |
| 18 | Footer | Geniş kurumsal navigasyon |

---

## 7. Tasarım dili

### 7.1 Renk

| Token | Değer | Kullanım |
|---|---|---|
| `--jt-black` | `#0A0A0A` | Koyu bölümler, footer, CTA zemini |
| `--jt-ink` | `#141414` | Gövde metni |
| `--jt-warm-white` | `#FAF8F4` | Varsayılan zemin |
| `--jt-ivory` | `#F4EFE6` | Alternatif bölüm zemini |
| `--jt-cream` | `#EDE6D9` | Kart, ayırıcı yüzey |
| `--jt-gold` | `#C8A96A` | Yalnızca hairline, eyebrow etiketi, aktif menü altı çizgisi |
| `--jt-muted` | taupe tonu | İkincil metin |

**Kural:** Altın dolgu, gradient, glow, parlaklık efekti kullanılmaz. Altının toplam yüzey payı sayfa başına %1'i geçmez.

### 7.2 Tipografi

- **Başlık:** premium, zamansız serif. Klişe seçimlerden (Playfair Display) kaçınılır; implementasyon başında iki aday karşılaştırmalı sunulur.
- **Gövde:** modern, yüksek okunaklı sans serif.
- **Teknik veri:** monospace. Article Number (`JT-LN-180-001`), GSM, en (cm) ve kompozisyon değerleri monospace görünür. Bu, markayı "kumaş satıcısı"ndan "teknik tedarikçi"ye taşıyan en güçlü tipografik sinyaldir.
- Başlıklarda geniş satır aralığı ve güçlü hiyerarşi; `font-display: swap`.

### 7.3 Düzen ve ritim

- Maksimum genişlik 1440px, içerik kolonu 1200px, 12 kolon grid.
- Bölümler arasında geniş dikey boşluk; tam genişlik görsel bantlar.
- İnce yatay ayırıcılar (1px, altın veya cream).
- Bölüm numaralandırması: `01 — HERITAGE` biçiminde eyebrow.

### 7.4 Hareket

- Yalnızca scroll-reveal (opacity + 8px translate) ve harita ark animasyonu.
- `prefers-reduced-motion: reduce` tam desteklenir; tüm hareket kapanır.
- Parallax, otomatik carousel, agresif geçiş yok.

### 7.5 Global Supply Map

Harici harita kütüphanesi kullanılmaz. Kendi sadeleştirilmiş SVG dünya haritamız (yaklaşık 15KB), Birleşik Krallık merkezli 6 animasyonlu bağlantı arkı: Europe, Türkiye, Middle East, North Africa, Americas, Asia. Hover/focus ile bölge bilgisi. Klavye erişilebilir. Mobilde ark animasyonu sadeleşir.

---

## 8. İçerik ve i18n

- Tüm metin `src/content/{en,tr}` altında TypeScript nesnesi olarak durur. JSX içinde sabit metin bulunmaz.
- `content/schema.ts` her içerik bloğunun tipini tanımlar; TR nesnesi aynı tipi uygulamak zorundadır, dolayısıyla **eksik çeviri derleme hatasıdır.**
- Dil değiştirici mevcut sayfanın karşılığına gider (`/fabrics/linen` ↔ `/tr/fabrics/linen`).
- Slug'lar iki dilde de aynı tutulur (tekil URL yapısı, daha az kırık link riski).

### 8.1 İçerik derinliği

Kategori ve sektör sayfaları şablon tekrarı olmayacaktır. Her biri kendi teknik metnine sahip olur (kumaş yapısı, tipik GSM aralığı, kullanım alanları, üretim notları). Aksi hâlde 112 sayfada ince içerik (thin content) SEO cezası riski doğar.

---

## 9. SEO

- Sayfa başına build zamanında üretilmiş gerçek HTML.
- `title`, `meta description`, canonical, `og:*`, `twitter:*`.
- `hreflang` çiftleri (`en`, `tr`) + `x-default` → EN.
- JSON-LD: `Organization` (kök), `BreadcrumbList` (alt sayfalar), `Article` (Insights).
- `sitemap.xml` ve `robots.txt` build sırasında route listesinden üretilir.
- Görsellerde anlamlı `alt` metni zorunlu; içerik şemasında `alt` alanı required.

---

## 10. Backend

### 10.1 Endpoint'ler

| Metot | Yol | İş |
|---|---|---|
| POST | `/api/v1/enquiries` | 6 konulu iletişim: SALES, SAMPLING, SOURCING, INTERNATIONAL_TRADE, TECHNICAL, GENERAL |
| POST | `/api/v1/sourcing-requests` | multipart; kumaş spesifikasyonu + referans dosya |
| POST | `/api/v1/bulk-requirements` | yüksek metrajlı üretim talebi |
| POST | `/api/v1/trade-account-applications` | Trade Account başvurusu |
| GET | `/api/v1/admin/enquiries` | korumalı listeleme (filtre: tip, durum, tarih) |
| PATCH | `/api/v1/admin/enquiries/{id}/status` | durum güncelleme |

### 10.2 Veri modeli

Ortak `enquiry` tablosu ve tipe özel detay tabloları:

```
enquiry
  id, reference_no (unique), type, status,
  company_name, contact_name, email, phone,
  country, city, message,
  locale, source_ip, user_agent, created_at, updated_at

sourcing_request_detail
  enquiry_id (FK), fabric_type, composition, gsm, width,
  colour, application, required_quantity, delivery_country,
  required_date

bulk_requirement_detail
  enquiry_id (FK), article_or_fabric, composition, colour,
  gsm, width, required_quantity, required_delivery_date,
  delivery_country, delivery_city, production_application

trade_account_detail
  enquiry_id (FK), company_registration, vat_number,
  business_type, website, annual_volume_estimate

enquiry_attachment
  id, enquiry_id (FK), original_filename, stored_key,
  content_type, size_bytes, created_at
```

**Referans numarası:** Postgres sequence + yıl, biçim `JTE-2026-00001`. Talep tipine göre önek: `JTE` (enquiry), `JTR` (sourcing), `JTB` (bulk), `JTA` (trade account). Faz 2'de `JTS` (sample) ve `JTQ` (RFQ) eklenecek.

**Durum akışı:** `NEW → UNDER_REVIEW → QUOTED → NEGOTIATION → CONFIRMED → CLOSED`. Geçersiz geçişler domain katmanında reddedilir.

### 10.3 Dosya yükleme

- `StorageService` arayüzü; Faz 1 uygulaması `LocalStorageService` (disk).
- Prod'da S3 / Cloudflare R2'ye geçiş tek sınıf eklemekle olur; çağıran kod değişmez.
- Whitelist: `pdf, jpg, jpeg, png, webp, heic, xlsx, docx`.
- Dosya başına maksimum 10 MB, talep başına maksimum 5 dosya.
- Dosya adı sanitize edilir, depolama anahtarı UUID'dir (orijinal ad ayrıca saklanır).
- Content-type sunucu tarafında doğrulanır; uzantıya güvenilmez.

### 10.4 Spam ve kötüye kullanım koruması

- Honeypot alanı (görünmez; dolu gelirse sessizce reddet).
- IP başına oran sınırı (form endpoint'lerinde).
- Sunucu tarafı doğrulama: e-posta biçimi, alan uzunluk sınırları.
- CAPTCHA kullanılmaz; B2B dönüşümünü düşürür.

### 10.5 Bildirim

`NotificationService` arayüzü baştan yazılır. Faz 1'de `LoggingNotificationService` kullanılır. SMTP bilgisi geldiğinde `SmtpNotificationService` bean olarak eklenir; çağıran kod değişmez.

### 10.6 Admin

`/admin/enquiries` Spring Security ile korumalıdır (Faz 1: HTTP Basic, kimlik bilgisi ortam değişkeninden). Liste, filtre, detay, durum güncelleme, ek dosya indirme. Faz 3'te gerçek kullanıcı yönetimine dönüşecek.

---

## 11. Test stratejisi

### Backend
- Testcontainers ile gerçek PostgreSQL üstünde entegrasyon testleri.
- Her endpoint için: geçerli istek, doğrulama hatası, dosya boyut/tip ihlali, oran sınırı, referans numarası tekilliği.
- Durum geçişi domain testleri.

### Frontend
- **İçerik bütünlüğü testi (kritik):** her EN içerik anahtarının TR karşılığı var mı, her route'un title/description/hreflang'ı dolu mu, her görselin alt'ı var mı. Bu test 112 sayfada elle kontrolü ortadan kaldırır.
- Bileşen testleri: form doğrulama, dil değiştirici, navigasyon.
- Prerender çıktısı testi: üretilen HTML'de `h1` ve meta etiketleri gerçekten var mı.

### Uçtan uca
- Playwright: ana sayfa yüklenmesi, dil değişimi, bir form gönderimi (API ayakta).

---

## 12. Performans

- Görseller WebP/AVIF, responsive `srcset`, `loading="lazy"` (hero hariç).
- Hero görseli `preload`.
- Kritik CSS satır içi, gerisi ertelenmiş.
- Font `preconnect` + `font-display: swap`, yalnızca kullanılan ağırlıklar.
- Hedef: Lighthouse Performance ≥ 90 (mobil), LCP < 2.5s.
- Prerender sayesinde ilk boya JS'e bağımlı değil.

---

## 13. Erişilebilirlik

- WCAG 2.2 AA hedefi.
- Metin/zemin kontrastı token seviyesinde doğrulanır. Altın yalnızca dekoratif çizgide kullanıldığı için kontrast riski oluşmaz.
- Klavye ile tam gezinme, görünür focus halkası, skip-to-content bağlantısı.
- Harita klavye erişilebilir; hareket `prefers-reduced-motion` ile kapanır.

---

## 14. Riskler

| # | Risk | Azaltma |
|---|---|---|
| 1 | Stock görselle "premium British textile house" hissi zayıf kalabilir | Az sayıda ama büyük görsel; tipografi ve boşluk öne çıkar. Görseller tek klasörde toplanır, gerçek fotoğraf gelince kod değişmeden değişir |
| 2 | 112 sayfada ince içerik SEO cezası | Kategori/sektör sayfaları şablon değil, her biri kendi teknik metnine sahip (8.1) |
| 3 | TypeScript 7 yeni derleyici, tooling uyumsuzluğu | Kurulumun ilk adımında doğrulanır; sorun çıkarsa TS 5.9 |
| 4 | Kendi prerender adımımızın bakım yükü | Kapsamı dar tutulur (route listesi → HTML). Çıktı testle doğrulanır |
| 5 | Faz 2 katalogu geldiğinde kurumsal yapının yeniden yazılması | İçerik/tasarım/veri katmanları baştan ayrık; ana sayfa 06 ve 07 slotları katalog için ayrılmış |

---

## 15. Bitti tanımı

- [ ] `docker compose up` ile Postgres ayağa kalkar
- [ ] `npm run dev` ile site çalışır, `npm run build` 112 statik HTML üretir
- [ ] Her sayfa EN ve TR'de dolu, hreflang doğru
- [ ] 4 form gerçekten Postgres'e kayıt yazar, referans numarası döner
- [ ] Sourcing formunda dosya yüklenir ve admin'den indirilebilir
- [ ] `/admin/enquiries` korumalı ve çalışır
- [ ] Backend testleri Testcontainers ile geçer
- [ ] İçerik bütünlüğü testi geçer
- [ ] Playwright smoke testi geçer
- [ ] `sitemap.xml` ve `robots.txt` üretilir
- [ ] Lighthouse mobil Performance ≥ 90, Accessibility ≥ 95
