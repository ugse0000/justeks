# JUSTEKS

**Fabric, Perfected.**
BRITISH ORIGIN. GLOBAL REACH. — Textile Expertise Since 2004.

JUSTEKS.com kurumsal web sitesi ve B2B talep altyapısı.
Birleşik Krallık menşeli kumaşların dünya genelindeki üreticilere, moda
markalarına, toptancılara ve profesyonel satın almacılara tedariki.

---

## Faz kapsamı

Bu depo şu anda **Faz 1**'i içerir: kurumsal vitrin ve talep (enquiry)
altyapısı. Ürün katalogu, Find Your Fabric filtre motoru, RFQ sepeti ve
Trade Account hesap ekranları sonraki fazlara aittir.

- Tasarım dokümanı: [docs/superpowers/specs/2026-08-22-justeks-corporate-design.md](docs/superpowers/specs/2026-08-22-justeks-corporate-design.md)
- Implementasyon planı: [docs/superpowers/plans/2026-08-22-justeks-corporate-phase1.md](docs/superpowers/plans/2026-08-22-justeks-corporate-phase1.md)

---

## Gereksinimler

| Araç | Sürüm |
|---|---|
| Node.js | 24+ |
| Java | 25 (Temurin) |
| Maven | 3.9+ |
| Docker | Compose v2+ |

PostgreSQL'i lokale kurmanız gerekmez; Docker ile gelir.

> TypeScript sürümü **6.0.2**'dir (Vite şablonunun seçtiği sürüm). Tasarım
> dokümanında 7.0.2 öngörülmüştü; ekosistem uyumu için şablon varsayılanında
> kalındı ve  temiz geçmektedir.

---

## Kurulum

```bash
cp .env.example .env      # değerleri gözden geçir
docker compose up -d      # postgres + adminer
```

Doğrulama:

```bash
docker compose ps
docker compose exec -T postgres psql -U justeks -d justeks -c "select version();"
```

Adminer: http://localhost:8081 (sunucu `postgres`, kullanıcı `justeks`)

### Frontend

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run build      # statik HTML + sitemap + robots üretir
npm run test
```

### Backend

```bash
cd api
mvn spring-boot:run    # http://localhost:8080
mvn test               # Testcontainers kullanır, Docker gerekir
```

---

## Yayın

Site kendi sunucumuzda, nginx altında statik olarak duruyor.

- Adres: <https://justeks.com> (www da aynı yere gider)
- Sunucu: `isg-sunucu` (`~/.ssh/config` içinde tanımlı)
- Kök dizin: `/var/www/justeks`
- nginx tanımı: `infra/nginx/justeks.conf`
- Sertifika: Let's Encrypt, certbot otomatik yeniliyor

Yayınlamak için (repo kökünden):

```powershell
pwsh scripts/deploy-web.ps1
```

Betik önce derler ve testleri koşar; testler düşerse gönderim yapmaz. Yeni
sürümü sunucuda yanına açıp sonra takas eder, böylece site hiçbir an yarım
dosya setiyle servis edilmez.

**Bu sunucuda başka siteler de yayında.** nginx yapılandırmasına dokunurken
yalnızca `justeks` tanımı değiştirilmeli; `sites-enabled` altındaki diğer
dosyalara ve varsayılan sunucuya dokunulmamalı.

GitHub Actions artık yayın yapmıyor, yalnızca derleme ve testleri doğruluyor
(`.github/workflows/ci.yml`).

## Backend (api/)

Spring Boot 4.1 + PostgreSQL. Testler Testcontainers ile gerçek bir Postgres
başlatır, yani yerelde Docker çalışıyor olmalı.

```bash
cd api
mvn test              # Testcontainers Postgres 17 ayağa kaldırır
mvn spring-boot:run
```

**JDK sürümü:** Proje Java 25 hedefler. Bu makinede `JAVA_HOME` JDK 17'yi
gösteriyor ve Maven onu kullanıyor, bu yüzden derleme
`release version 25 not supported` ile düşer. Maven'i JDK 25 ile çalıştırmak
gerekiyor:

```bash
export JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-25.0.4.7-hotspot"
```

### Yayındaki kurulum

| | |
| --- | --- |
| Servis | `justeks-api.service` (systemd), port 8090 |
| Jar | `/opt/justeks-api/justeks-api.jar` |
| Yapılandırma | `/etc/justeks/api.env` (mod 640, `justeks` grubu okur) |
| Yüklenen dosyalar | `/var/lib/justeks/uploads` |
| Veritabanı | PostgreSQL 16, `justeks` veritabanı ve kullanıcısı |
| Erişim | nginx `/api/` yolunu `127.0.0.1:8090`'a iletir |

Yayınlamak için:

```powershell
pwsh scripts/deploy-api.ps1
```

Betik önce testleri koşar, sonra paketler, gönderir ve servisi yeniden
başlatır; API beklenen yanıtı vermezse hata verir.

**Sunucudaki iki incelik:**

- Varsayılan `java` bu makinede 17 ve başka servisler ona bağlı. `openjdk-25`
  yan yana kurulu; systemd unit'i yorumlayıcıyı tam yolla çağırır
  (`/usr/lib/jvm/java-25-openjdk-amd64/bin/java`). **`update-alternatives` ile
  varsayılanı değiştirmeyin** — `locqify-api-java` gibi servisler
  `/usr/bin/java` çağırıyor.
- Üretimde PostgreSQL **16**, testlerde 17 çalışır. Şema ikisinde de aynı
  şekilde migrate oluyor; sürüme özgü bir şey kullanılmıyor.

Yeni bir kurulumda `ADMIN_PASSWORD` verilmezse uygulama **başlamaz** — tahmin
edilebilir bir varsayılana düşmektense çalışmamayı tercih eder.

## Yapılmayanlar

- **Playwright uçtan uca testler.** Tarayıcı doğrulaması Chrome DevTools ile
  yapıldı: 375/768/1100/1320/1366/1440 px genişliklerde yatay taşma yok,
  mobil menü açılıp kapanıyor, altı sayfada marka ve metadata doğrulandı.
  Playwright kurulumu ayrı bir adım olarak duruyor.
- **SMTP.** `NotificationService` arayüzü hazır; Faz 1 uygulaması log yazıyor.
- **Gerçek İngiltere adresi.** `site.config.ts` içinde `provisional: true`
  işaretli; sayfada "teyit ediliyor" notuyla görünür ve yapılandırılmış veriye
  girmez.

## Yapı

```
web/     Vite + React 19 + TypeScript, kendi prerender adımıyla statik HTML
api/     Spring Boot 4 + PostgreSQL, dört talep formu ve admin listesi
docs/    Tasarım dokümanı ve implementasyon planı
```

Kurumsal sayfalar backend'e bağımlı değildir. API kapalıyken site çalışmaya
devam eder; yalnızca form gönderimi hata mesajı döner.

---

## Dil

İngilizce varsayılan ve kökte (`/about`), Türkçe `/tr` öneklidir
(`/tr/about`). Slug'lar iki dilde aynıdır.
