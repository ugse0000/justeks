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

Site GitHub Pages üzerinde barınır. `main` dalına her push
`.github/workflows/deploy.yml` iş akışını çalıştırır: `web/` içinde derler,
ardından testleri koşar (bu sırayla — prerender testleri `dist/` çıktısını
okur ve derleme olmadan kendilerini atlarlar), sonra sonucu yayınlar.

- Depo: <https://github.com/ugse0000/justeks>
- Alan adı: `justeks.com` (`web/public/CNAME` dosyasından gelir)

Alan adının DNS kayıtları GitHub'a yönlendirilmelidir. Apex (`justeks.com`)
için A ve AAAA kayıtları:

```
A     185.199.108.153     AAAA  2606:50c0:8000::153
A     185.199.109.153     AAAA  2606:50c0:8001::153
A     185.199.110.153     AAAA  2606:50c0:8002::153
A     185.199.111.153     AAAA  2606:50c0:8003::153
```

`www` için: `CNAME  www  ugse0000.github.io`

DNS yayıldıktan sonra GitHub sertifikayı kendisi alır ve HTTPS zorlaması
etkinleşir; bu birkaç saat sürebilir.

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
