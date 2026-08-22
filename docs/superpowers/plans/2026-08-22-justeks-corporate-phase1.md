# JUSTEKS Faz 1 — Kurumsal Vitrin + Enquiry Backend · Implementasyon Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** JUSTEKS.com'un kurumsal vitrinini (EN/TR, 68 prerender edilmiş sayfa) ve dört talep formunu Postgres'e yazan Spring Boot API'sini çalışır hâlde teslim etmek.

**Architecture:** İki bağımsız deploy edilebilir birim. `web/` Vite + React 19 ile derlenir ve kendi prerender adımımızla her route için gerçek HTML üretir; tüm metin `src/content/{en,tr}` altında tip güvenli nesnelerde durur, JSX içinde sabit metin bulunmaz. `api/` Spring Boot 4.1.1 ile dört talep tipini ortak bir `enquiry` tablosu ve tipe özel detay tablolarına yazar. Web, API'ye yalnızca form gönderiminde bağlanır; API çökse bile site ayakta kalır.

**Tech Stack:** Vite 8.2.2 · React 19.2.8 · React Router 8.3.0 · TypeScript 7.0.2 · Vitest 4.1.11 · Playwright · Spring Boot 4.1.1 · Java 25 (Temurin) · PostgreSQL 17 (Docker) · Flyway · Testcontainers · Maven 3.9.16

**Spec:** `docs/superpowers/specs/2026-08-22-justeks-corporate-design.md`

---

## Global Constraints

Her task'ın gereksinimleri bu bölümü kapsar.

- **Marka mesajı sabittir:** `BRITISH ORIGIN. GLOBAL REACH.` / `Fabric, Perfected.` / `Textile Expertise Since 2004.` / `EST. 2004`. Bu ifadeler birebir korunur ve çevrilmez.
- **Trust strip sırası sabittir:** `EST. 2004` · `UK ORIGIN` · `B2B WHOLESALE` · `GLOBAL SUPPLY`.
- **Global tedarik bölgeleri sabittir ve bu sıradadır:** Europe · Türkiye · Middle East · North Africa · Americas · Asia.
- **Renk tokenları:** `--jt-black #0A0A0A`, `--jt-ink #141414`, `--jt-warm-white #FAF8F4`, `--jt-ivory #F4EFE6`, `--jt-cream #EDE6D9`, `--jt-gold #C8A96A`. Altın yalnızca hairline, eyebrow ve aktif menü çizgisinde kullanılır; dolgu, gradient ve glow yasaktır.
- **Sertifika kuralı:** OEKO-TEX / GOTS / GRS logoları veya adları, ürüne gerçekten ait olduğu doğrulanmadan hiçbir sayfada gösterilmez. Faz 1'de yalnızca "altyapı hazır" anlatısı yapılır, logo basılmaz.
- **Sürdürülebilirlik kuralı:** Doğrulanamayan genel çevre iddiası kullanılmaz.
- **Uydurma ürün yasağı:** Faz 1'de hiçbir yerde uydurma Article Number gerçek ürünmüş gibi gösterilmez. Article Number biçimi yalnızca Quality & Traceability sayfasında, açıkça örnek etiketiyle anlatılır.
- **Dil:** EN varsayılan ve kökte (`/about`), TR `/tr` önekli (`/tr/about`). Slug'lar iki dilde aynıdır.
- **Erişilebilirlik:** WCAG 2.2 AA. Her interaktif öğe klavye erişilebilir, görünür focus halkası var, tüm hareket `prefers-reduced-motion: reduce` ile kapanır.
- **Görseller:** Her `img` anlamlı `alt` alır; içerik şemasında `alt` alanı zorunludur. Hero dışındaki görseller `loading="lazy"` taşır.
- **Kurumsal bilgi:** Adres, telefon, e-posta ve şirket unvanı `web/site.config.ts` içinde `PLACEHOLDER_` önekli sabitlerdir ve başka hiçbir dosyada tekrarlanmaz.
- **Commit mesajları:** Conventional Commits (`feat:`, `test:`, `chore:`, `fix:`, `docs:`).
- **Testler yeşil olmadan bir sonraki task'a geçilmez.**

---

## Dosya Yapısı

### `web/`

| Dosya | Sorumluluk |
|---|---|
| `site.config.ts` | Kurumsal sabitler (isim, domain, iletişim placeholder'ları) — tek kaynak |
| `src/design/tokens.css` | Renk, boşluk, tipografi ölçeği, radius, z-index CSS değişkenleri |
| `src/design/typography.css` | Font yüklemesi, başlık/gövde/mono sınıfları |
| `src/design/base.css` | Reset, `:focus-visible`, `prefers-reduced-motion`, skip-link |
| `src/content/schema.ts` | Tüm içerik bloklarının TypeScript tipleri |
| `src/content/routes.ts` | Route tablosu — prerender, sitemap, nav ve hreflang'ın tek kaynağı |
| `src/content/en/*.ts` | EN içerik nesneleri (sayfa başına bir dosya) |
| `src/content/tr/*.ts` | TR karşılıkları (aynı tipi uygular) |
| `src/content/index.ts` | Locale'e göre içerik seçici; `getContent(locale)` |
| `src/lib/i18n.ts` | Locale çözümleme ve yol çevirme |
| `src/lib/seo.tsx` | `Seo` bileşeni: title, description, canonical, hreflang, og, JSON-LD |
| `src/lib/api.ts` | Backend istemcisi |
| `src/components/primitives/*` | `Section`, `Container`, `Eyebrow`, `Rule`, `Button`, `Field` |
| `src/components/layout/*` | `Header`, `Nav`, `Footer`, `LanguageSwitch`, `SkipLink` |
| `src/components/sections/*` | Ana sayfa bölümleri |
| `src/components/forms/*` | `EnquiryForm`, `SourcingForm`, `BulkForm`, `TradeAccountForm` |
| `src/routes/*.tsx` | Sayfa bileşenleri |
| `scripts/prerender.mts` | Route tablosunu gezip statik HTML, sitemap ve robots üretir |

### `api/`

| Dosya | Sorumluluk |
|---|---|
| `common/ReferenceNumberGenerator.java` | `JTE-2026-00001` üretimi |
| `common/ApiExceptionHandler.java` | Doğrulama ve hata yanıtı biçimi |
| `common/RateLimitFilter.java` | IP başına oran sınırı |
| `enquiry/Enquiry.java` | Kök entity; durum geçişi kuralı burada |
| `enquiry/EnquiryType.java`, `EnquiryStatus.java` | Enum'lar |
| `enquiry/EnquiryService.java` | Uygulama servisi |
| `enquiry/EnquiryController.java` | Dört POST endpoint'i |
| `enquiry/dto/*.java` | İstek ve yanıt record'ları |
| `storage/StorageService.java` | Arayüz |
| `storage/LocalStorageService.java` | Disk uygulaması |
| `notification/NotificationService.java` | Arayüz ve log uygulaması |
| `admin/AdminEnquiryController.java` | Listeleme ve durum güncelleme |
| `config/SecurityConfig.java` | Admin koruması, CORS |
| `resources/db/migration/V1__enquiry.sql` | Şema |

---

## Görev Sırası

Task 1-2 altyapı. Task 3-6 web çekirdeği; bu bittiğinde içerik az ama çalışan, prerender edilen, iki dilli bir site vardır. Task 7-12 içerik sayfaları. Task 13-18 backend. Task 19-20 entegrasyon ve kapanış.

---

### Task 1: Repo iskeleti, Docker Postgres, README

**Files:**
- Create: `docker-compose.yml`, `.gitignore`, `README.md`, `.env.example`

**Interfaces:**
- Produces: `justeks` veritabanı `localhost:5432`, kullanıcı `justeks`, parola `justeks_dev`; Adminer `localhost:8081`.

- [ ] **Step 1: `.gitignore` yaz**

Kapsam: `node_modules/`, `dist/`, `target/`, `.env`, `.DS_Store`, `*.log`, `web/test-results/`, `web/playwright-report/`, `api/uploads/`.

- [ ] **Step 2: `docker-compose.yml` yaz**

`postgres:17-alpine` servisi (`POSTGRES_DB=justeks`, `POSTGRES_USER=justeks`, `POSTGRES_PASSWORD=justeks_dev`), named volume `justeks-pgdata`, healthcheck `pg_isready -U justeks`. `adminer` servisi 8081 portunda, `depends_on: postgres`.

- [ ] **Step 3: `.env.example` yaz**

`DB_URL`, `DB_USER`, `DB_PASSWORD`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `UPLOAD_DIR`, `ALLOWED_ORIGINS`, ve Faz 1'de kullanılmayan boş `SMTP_*` anahtarları.

- [ ] **Step 4: Ayağa kaldır ve doğrula**

Run: `docker compose up -d && docker compose ps`
Expected: `postgres` servisi `healthy`.

Run: `docker compose exec -T postgres psql -U justeks -d justeks -c "select version();"`
Expected: PostgreSQL 17 sürüm satırı.

- [ ] **Step 5: `README.md` yaz**

Bölümler: proje tanımı, gereksinimler (Node 24+, Java 25, Docker), `docker compose up -d`, `cd web && npm install && npm run dev`, `cd api && mvn spring-boot:run`, spec ve plan dosyalarına bağlantı, faz kapsamı.

- [ ] **Step 6: Commit**

```bash
git add .gitignore docker-compose.yml README.md .env.example docs/
git commit -m "chore: bootstrap repo, docker postgres, spec and plan"
```

---

### Task 2: Web projesi kurulumu ve araç zinciri doğrulaması

**Files:**
- Create: `web/package.json`, `web/tsconfig.json`, `web/vite.config.ts`, `web/index.html`, `web/src/main.tsx`, `web/src/App.tsx`, `web/vitest.config.ts`, `web/src/test/setup.ts`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, `npm run test`, `npm run typecheck` script'leri.

- [ ] **Step 1: Projeyi oluştur**

Run: `cd web && npm create vite@latest . -- --template react-ts` ardından `npm install`.

- [ ] **Step 2: Sürümleri sabitle ve TypeScript kararını doğrula**

`react@19.2.8`, `react-dom@19.2.8`, `react-router@8.3.0`, `vite@8.2.2`, `typescript@7.0.2`, `vitest@4.1.11` kur.

Run: `npx tsc --noEmit`
Expected: PASS. TS 7 tooling hatası verirse `typescript@5.9.x`'e düş, `README.md`'ye tek satır not yaz ve devam et. Bu, spec risk 3'ün kapanışıdır.

- [ ] **Step 3: Vitest yapılandır**

`vitest.config.ts`: `environment: 'jsdom'`, `globals: true`, `setupFiles: ['./src/test/setup.ts']`. `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom` ve `msw` kur.

- [ ] **Step 4: Duman testi yaz ve çalıştır**

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('uygulama kök başlığı render eder', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
})
```

`App.tsx` geçici olarak tek `<h1>JUSTEKS</h1>` döner.

Run: `npm run test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/
git commit -m "chore(web): vite + react 19 + typescript toolchain"
```

---

### Task 3: Tasarım tokenları ve tipografi

**Files:**
- Create: `web/src/design/tokens.css`, `web/src/design/typography.css`, `web/src/design/base.css`, `web/src/design/contrast.ts`
- Modify: `web/src/main.tsx` (import), `web/index.html` (font preconnect)
- Test: `web/src/design/contrast.test.ts`

**Interfaces:**
- Produces: CSS değişkenleri `--jt-black`, `--jt-ink`, `--jt-warm-white`, `--jt-ivory`, `--jt-cream`, `--jt-gold`, `--jt-muted`; boşluk ölçeği `--space-1` … `--space-12`; tipografi sınıfları `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-body`, `.t-small`, `.t-eyebrow`, `.t-mono`; `contrastRatio(fg: string, bg: string): number`.

- [ ] **Step 1: Font çiftini seç ve kullanıcıya iki aday sun**

Başlık serif ve gövde sans için iki aday kombinasyon hazırla, aynı hero bloğunu iki fontla render eden tek sayfalık karşılaştırma üret, kullanıcıdan seçim al. Playfair Display aday listesine alınmaz.

- [ ] **Step 2: `tokens.css` yaz**

Renkler Global Constraints'teki değerlerle. Boşluk ölçeği 4px tabanlı: `--space-1: 4px` … `--space-12: 160px`. `--content-max: 1200px`, `--page-max: 1440px`, `--rule: 1px solid var(--jt-cream)`.

- [ ] **Step 3: `typography.css` yaz**

`clamp()` tabanlı akışkan ölçek. `.t-display` hero için `clamp(2.75rem, 7vw, 6rem)`, `line-height: 0.95`, `letter-spacing: -0.02em`. `.t-eyebrow` küçük punto, `letter-spacing: 0.18em`, `text-transform: uppercase`, renk `--jt-gold`. `.t-mono` teknik veri için.

- [ ] **Step 4: `base.css` yaz**

Reset, `body { background: var(--jt-warm-white); color: var(--jt-ink) }`, `:focus-visible` için altın 2px outline ve 2px offset, odaklanınca görünen `.skip-link`, ve:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 5: Kontrast testini yaz**

```ts
// src/design/contrast.test.ts
import { contrastRatio } from './contrast'

test('gövde metni varsayılan zeminde AA karşılar', () => {
  expect(contrastRatio('#141414', '#FAF8F4')).toBeGreaterThanOrEqual(4.5)
})

test('gövde metni ivory zeminde AA karşılar', () => {
  expect(contrastRatio('#141414', '#F4EFE6')).toBeGreaterThanOrEqual(4.5)
})

test('koyu zeminde warm white AA karşılar', () => {
  expect(contrastRatio('#FAF8F4', '#0A0A0A')).toBeGreaterThanOrEqual(4.5)
})
```

`contrast.ts` içinde WCAG relative luminance formülünü uygula: her kanalı 255'e böl, `c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4`, `L = 0.2126R + 0.7152G + 0.0722B`, oran `(Lmax + 0.05) / (Lmin + 0.05)`.

- [ ] **Step 6: Testleri çalıştır**

Run: `npm run test -- contrast`
Expected: 3 test PASS.

- [ ] **Step 7: Commit**

```bash
git add web/src/design web/index.html web/src/main.tsx
git commit -m "feat(web): design tokens, typography scale, accessibility base"
```

---

### Task 4: İçerik şeması, route tablosu, i18n çekirdeği

**Files:**
- Create: `web/src/content/schema.ts`, `web/src/content/routes.ts`, `web/src/content/index.ts`, `web/src/content/en/nav.ts`, `web/src/content/tr/nav.ts`, `web/src/lib/i18n.ts`
- Test: `web/src/content/integrity.test.ts`

**Interfaces:**
- Produces:
  - `type Locale = 'en' | 'tr'`
  - `type RouteGroup = 'core' | 'company' | 'supply' | 'fabrics' | 'collections' | 'industries' | 'services' | 'insights' | 'legal' | 'admin'`
  - `interface RouteDef { path: string; key: string; group: RouteGroup; priority: number }`
  - `const ROUTES: RouteDef[]`
  - `function toLocalePath(path: string, locale: Locale): string`
  - `function localeFromPathname(pathname: string): Locale`
  - `function stripLocale(pathname: string): string`
  - `function getContent(locale: Locale): SiteContent`
  - `interface SiteContent` — tüm sayfa içeriklerinin birleşimi

- [ ] **Step 1: `schema.ts` yaz**

```ts
export type Locale = 'en' | 'tr'

export interface SeoMeta {
  title: string
  description: string
}

export interface ImageRef {
  src: string
  alt: string
  width: number
  height: number
}

export interface CtaRef {
  label: string
  href: string
}

export interface PageIntro {
  eyebrow: string
  heading: string
  lead: string
}

export interface FeatureItem {
  title: string
  body: string
}

export interface FabricCategoryContent {
  slug: string
  seo: SeoMeta
  intro: PageIntro
  overview: string[]
  types: string[]
  typicalGsm: string
  typicalWidth: string
  applications: string[]
  productionNotes: string[]
  image: ImageRef
}

export interface CollectionContent {
  slug: string
  seo: SeoMeta
  intro: PageIntro
  overview: string[]
  includes: string[]
  relatedCategories: string[]
  image: ImageRef
}

export interface IndustryContent {
  slug: string
  seo: SeoMeta
  intro: PageIntro
  overview: string[]
  criticalProperties: FeatureItem[]
  recommendedFabrics: string[]
  image: ImageRef
}

export interface SiteContent {
  nav: NavContent
  footer: FooterContent
  home: HomeContent
  fabricCategories: Record<string, FabricCategoryContent>
  collections: Record<string, CollectionContent>
  industries: Record<string, IndustryContent>
  pages: Record<string, GenericPageContent>
  insights: Record<string, ArticleContent>
}
```

TR nesnesi `SiteContent` tipini uygular; eksik alan derleme hatasıdır.

- [ ] **Step 2: `routes.ts` yaz**

Spec bölüm 5'teki tüm rotalar tek dizide:

```ts
export const ROUTES: RouteDef[] = [
  { path: '/',                      key: 'home',            group: 'core',       priority: 1.0 },
  { path: '/about',                 key: 'about',           group: 'company',    priority: 0.8 },
  { path: '/heritage',              key: 'heritage',        group: 'company',    priority: 0.8 },
  { path: '/uk-origin',             key: 'ukOrigin',        group: 'company',    priority: 0.9 },
  { path: '/textile-expertise',     key: 'textileExpertise',group: 'company',    priority: 0.7 },
  { path: '/quality-traceability',  key: 'quality',         group: 'company',    priority: 0.7 },
  { path: '/responsible-textiles',  key: 'responsible',     group: 'company',    priority: 0.6 },
  { path: '/global-supply',         key: 'globalSupply',    group: 'supply',     priority: 0.9 },
  { path: '/trade-logistics',       key: 'tradeLogistics',  group: 'supply',     priority: 0.7 },
  { path: '/bulk-orders',           key: 'bulkOrders',      group: 'supply',     priority: 0.8 },
  { path: '/fabrics',               key: 'fabrics',         group: 'fabrics',    priority: 0.9 },
  // 12 kategori, 8 koleksiyon, 8 sektör, servisler, insights, yasal sayfalar aynı biçimde
]
```

Bu dizi prerender, sitemap, nav ve hreflang'ın tek kaynağıdır; başka yerde route listesi tutulmaz.

- [ ] **Step 3: `i18n.ts` yaz**

```ts
export const LOCALES: Locale[] = ['en', 'tr']
export const DEFAULT_LOCALE: Locale = 'en'

export function toLocalePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? '/tr' : `/tr${path}`
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === '/tr' || pathname.startsWith('/tr/') ? 'tr' : 'en'
}

export function stripLocale(pathname: string): string {
  if (pathname === '/tr') return '/'
  return pathname.startsWith('/tr/') ? pathname.slice(3) : pathname
}
```

- [ ] **Step 4: İçerik bütünlüğü testini yaz**

```ts
// src/content/integrity.test.ts
import { ROUTES } from './routes'
import { getContent } from './index'
import { LOCALES } from '../lib/i18n'

const walk = (obj: unknown, path: string[] = []): [string, unknown][] =>
  obj && typeof obj === 'object'
    ? Object.entries(obj).flatMap(([k, v]) => walk(v, [...path, k]))
    : [[path.join('.'), obj]]

test('EN ve TR aynı anahtar kümesine sahip', () => {
  const en = walk(getContent('en')).map(([k]) => k).sort()
  const tr = walk(getContent('tr')).map(([k]) => k).sort()
  expect(tr).toEqual(en)
})

test('hiçbir metin alanı boş değil', () => {
  for (const locale of LOCALES) {
    for (const [key, value] of walk(getContent(locale))) {
      if (typeof value === 'string') {
        expect(value.trim(), `${locale}.${key} boş`).not.toBe('')
      }
    }
  }
})

test('her görselin alt metni var', () => {
  for (const locale of LOCALES) {
    const entries = walk(getContent(locale))
    const map = new Map(entries)
    for (const [key] of entries) {
      if (key.endsWith('.src')) {
        const altKey = key.replace(/\.src$/, '.alt')
        expect(map.get(altKey), `${locale}.${altKey} eksik`).toBeTruthy()
      }
    }
  }
})

test('her route benzersiz', () => {
  const paths = ROUTES.map(r => r.path)
  expect(new Set(paths).size).toBe(paths.length)
})

test('uzun TR metinleri EN ile birebir aynı değil', () => {
  const en = new Map(walk(getContent('en')))
  const tr = new Map(walk(getContent('tr')))
  const identical = [...en.entries()].filter(
    ([k, v]) => typeof v === 'string' && v.length > 40 && tr.get(k) === v
  )
  expect(identical.map(([k]) => k)).toEqual([])
})
```

- [ ] **Step 5: Testi çalıştır ve kırmızı gör**

Run: `npm run test -- integrity`
Expected: FAIL — `getContent` henüz yok.

- [ ] **Step 6: Minimum içerikle yeşile al**

`content/en/nav.ts` ve `content/tr/nav.ts` yaz: ana menü Home, Fabrics, Collections, Industries, UK Origin, Global Supply, Sourcing, About, Insights, Contact; sağ tarafta Search ve Request a Quote etiketleri. `content/index.ts` içinde `getContent` bunları birleştirsin.

Run: `npm run test -- integrity`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add web/src/content web/src/lib/i18n.ts
git commit -m "feat(web): content schema, route table, i18n core, integrity tests"
```

---

### Task 5: SEO katmanı

**Files:**
- Create: `web/src/lib/seo.tsx`, `web/site.config.ts`
- Test: `web/src/lib/seo.test.tsx`

**Interfaces:**
- Consumes: `ROUTES`, `toLocalePath`, `Locale`, `SeoMeta` (Task 4)
- Produces: `<Seo path={string} locale={Locale} meta={SeoMeta} jsonLd?={object} />`

React 19 metadata hoisting kullanılır; `react-helmet` gibi bir kütüphane eklenmez.

- [ ] **Step 1: Testi yaz**

```tsx
test('canonical ve üç alternate üretir', () => {
  render(<Seo path="/about" locale="en" meta={{ title: 'About', description: 'd' }} />)
  const links = document.head.querySelectorAll('link[rel="alternate"]')
  const hrefs = [...links].map(l => `${l.getAttribute('hreflang')}:${l.getAttribute('href')}`)
  expect(hrefs).toContain('en:https://justeks.com/about')
  expect(hrefs).toContain('tr:https://justeks.com/tr/about')
  expect(hrefs).toContain('x-default:https://justeks.com/about')
})

test('TR sayfasında canonical TR yolunu gösterir', () => {
  render(<Seo path="/about" locale="tr" meta={{ title: 'Hakkımızda', description: 'd' }} />)
  expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'))
    .toBe('https://justeks.com/tr/about')
})

test('jsonLd verildiğinde script olarak basılır', () => {
  render(<Seo path="/" locale="en" meta={{ title: 'JUSTEKS', description: 'd' }}
              jsonLd={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'JUSTEKS' }} />)
  const script = document.head.querySelector('script[type="application/ld+json"]')!
  expect(JSON.parse(script.textContent!).name).toBe('JUSTEKS')
})
```

- [ ] **Step 2: Testi çalıştır**

Run: `npm run test -- seo`
Expected: FAIL.

- [ ] **Step 3: `site.config.ts` ve `seo.tsx` yaz**

`site.config.ts`: `SITE_URL = 'https://justeks.com'`, `SITE_NAME = 'JUSTEKS'`, `TAGLINE = 'Fabric, Perfected.'`, `PLACEHOLDER_EMAIL`, `PLACEHOLDER_PHONE`, `PLACEHOLDER_ADDRESS`, `PLACEHOLDER_LEGAL_NAME`, `FOUNDED_YEAR = 2004`.

`seo.tsx`: `<title>`, `<meta name="description">`, `<link rel="canonical">`, üç `<link rel="alternate" hreflang>`, `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`, `twitter:card`. `jsonLd` verilmişse `<script type="application/ld+json">` olarak basılır.

- [ ] **Step 4: Testi çalıştır**

Run: `npm run test -- seo`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/lib/seo.tsx web/src/lib/seo.test.tsx web/site.config.ts
git commit -m "feat(web): seo layer with hreflang, canonical and json-ld"
```

---

### Task 6: Prerender build adımı, sitemap, robots

**Files:**
- Create: `web/scripts/prerender.mts`, `web/src/entry-server.tsx`
- Modify: `web/package.json` (build script), `web/vite.config.ts`
- Test: `web/scripts/prerender.test.ts`

**Interfaces:**
- Consumes: `ROUTES`, `LOCALES`, `toLocalePath`
- Produces: `dist/**/index.html`, `dist/sitemap.xml`, `dist/robots.txt`; `render(url: string): { html: string; head: string }`

- [ ] **Step 1: `entry-server.tsx` yaz**

`renderToString` ile `<StaticRouter location={url}>` sarmalını render eder ve `{ html, head }` döner. React 19 metadata'sı head'e hoist edildiği için head etiketleri çıktıdan ayrıştırılır.

- [ ] **Step 2: `prerender.mts` yaz**

Akış: `vite build` (client), `vite build --ssr` (server), her locale × her route için `render(url)` çağır, `dist/index.html` şablonundaki `<!--app-html-->` ve `<!--app-head-->` yer tutucularını doldur, `dist/<path>/index.html` olarak yaz. `group === 'admin'` olan rotalar atlanır.

Ardından `ROUTES`'tan `sitemap.xml` üret (her URL için `xhtml:link rel="alternate" hreflang` çiftleri) ve `robots.txt` yaz (`Disallow: /admin`, `Sitemap: https://justeks.com/sitemap.xml`).

- [ ] **Step 3: Build çalıştır**

Run: `npm run build`
Expected: Hata yok; `dist/index.html` ve `dist/tr/index.html` oluşur.

- [ ] **Step 4: Çıktı testini yaz**

```ts
// scripts/prerender.test.ts — build sonrası çalışır
import { readFileSync, existsSync } from 'node:fs'
import { ROUTES } from '../src/content/routes'
import { LOCALES, toLocalePath } from '../src/lib/i18n'

const fileFor = (p: string) => (p === '/' ? 'dist/index.html' : `dist${p}/index.html`)

test('her route her dilde HTML üretti', () => {
  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      if (route.group === 'admin') continue
      const p = toLocalePath(route.path, locale)
      expect(existsSync(fileFor(p)), p).toBe(true)
    }
  }
})

test('üretilen HTML gerçek içerik taşıyor', () => {
  const html = readFileSync('dist/index.html', 'utf8')
  expect(html).toMatch(/<h1[^>]*>/)
  expect(html).toMatch(/<title>.+<\/title>/)
  expect(html).toMatch(/rel="canonical"/)
  expect(html).toMatch(/hreflang="tr"/)
  expect(html).toContain('BRITISH ORIGIN')
})

test('sitemap ve robots üretildi', () => {
  expect(existsSync('dist/sitemap.xml')).toBe(true)
  expect(readFileSync('dist/robots.txt', 'utf8')).toContain('Disallow: /admin')
})

test('admin sayfası prerender edilmedi', () => {
  expect(existsSync('dist/admin/enquiries/index.html')).toBe(false)
})
```

- [ ] **Step 5: Testi çalıştır**

Run: `npm run build && npm run test -- prerender`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/scripts web/src/entry-server.tsx web/package.json web/vite.config.ts
git commit -m "feat(web): static prerender pipeline, sitemap and robots generation"
```

---

### Task 7: Layout — Header, Nav, Footer, LanguageSwitch

**Files:**
- Create: `web/src/components/layout/{Header,Nav,Footer,LanguageSwitch,SkipLink,Layout}.tsx` ve ilgili CSS
- Create: `web/src/components/primitives/{Section,Container,Eyebrow,Rule,Button}.tsx`
- Test: `web/src/components/layout/LanguageSwitch.test.tsx`, `web/src/components/layout/Nav.test.tsx`

**Interfaces:**
- Consumes: `getContent`, `toLocalePath`, `stripLocale`, tasarım tokenları
- Produces: `<Layout locale>`, `<Section tone="light|ivory|dark" data-section>`, `<Container>`, `<Eyebrow index>`, `<Button variant="solid|outline|ghost">`

- [ ] **Step 1: LanguageSwitch testini yaz**

```tsx
test('mevcut sayfanın diğer dildeki karşılığına gider', () => {
  renderAtRoute(<LanguageSwitch />, '/fabrics/linen')
  expect(screen.getByRole('link', { name: /TR/ })).toHaveAttribute('href', '/tr/fabrics/linen')
})

test('TR sayfasındayken EN köke döner', () => {
  renderAtRoute(<LanguageSwitch />, '/tr/fabrics/linen')
  expect(screen.getByRole('link', { name: /EN/ })).toHaveAttribute('href', '/fabrics/linen')
})

test('ana sayfada doğru çalışır', () => {
  renderAtRoute(<LanguageSwitch />, '/')
  expect(screen.getByRole('link', { name: /TR/ })).toHaveAttribute('href', '/tr')
})
```

- [ ] **Step 2: Nav testini yaz**

```tsx
test('ana menü brief sırasını korur', () => {
  render(<Nav locale="en" />)
  const labels = screen.getAllByTestId('nav-link').map(l => l.textContent)
  expect(labels).toEqual([
    'Home', 'Fabrics', 'Collections', 'Industries', 'UK Origin',
    'Global Supply', 'Sourcing', 'About', 'Insights', 'Contact',
  ])
})

test('mobil menü klavyeyle açılıp kapanır', async () => {
  render(<Nav locale="en" />)
  const toggle = screen.getByRole('button', { name: /menu/i })
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await userEvent.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await userEvent.keyboard('{Escape}')
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
})
```

- [ ] **Step 3: Testleri çalıştır**

Run: `npm run test -- Nav LanguageSwitch`
Expected: FAIL.

- [ ] **Step 4: Primitive'leri yaz**

`Section` — `tone` prop'una göre zemin rengi, dikey padding `--space-11`, `data-section` özniteliğini geçirir. `Container` — `max-width: var(--content-max)` ve yatay padding. `Eyebrow` — `01 — HERITAGE` biçimi, altın renk, numara `aria-hidden`. `Rule` — 1px yatay çizgi. `Button` — üç varyant, `href` verilirse `<a>` aksi hâlde `<button>`, görünür focus halkası.

- [ ] **Step 5: Header ve Nav yaz**

Sol: JUSTEKS kelime markası. Orta: 10 maddelik ana menü. Sağ: `SEARCH` (Faz 1'de arama motoru yok; bağlantı `/contact`'a gider ve `aria-label` bunu açıklar, sahte arama kutusu konulmaz), `REQUEST A QUOTE` (solid buton, `/contact?topic=sales`), `EN | TR`. Scroll'da kompaktlaşan sticky header. Mobilde tam ekran menü paneli, `Escape` ile kapanır, focus trap uygulanır.

- [ ] **Step 6: Footer yaz**

Spec 39'daki altı kolon: FABRICS, COMPANY, SERVICES, RESOURCES, CONTACT, GLOBAL SUPPLY. Üstte `JUSTEKS`, `Fabric, Perfected.`, `Textile Expertise Since 2004.` Altta telif satırı ve Privacy, Cookie, Terms bağlantıları. Tüm bağlantılar `ROUTES` içindeki gerçek rotalara gider; ölü bağlantı bırakılmaz.

- [ ] **Step 7: Testleri çalıştır**

Run: `npm run test -- Nav LanguageSwitch`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add web/src/components
git commit -m "feat(web): layout shell, navigation, footer, language switch"
```

---

### Task 8: Global Supply Map

**Files:**
- Create: `web/src/components/sections/GlobalSupplyMap.tsx`, `GlobalSupplyMap.css`, `web/src/components/sections/world-path.ts`
- Test: `web/src/components/sections/GlobalSupplyMap.test.tsx`

**Interfaces:**
- Consumes: `getContent(locale).pages.globalSupply.regions` — altı bölge, sabit sıra
- Produces: `<GlobalSupplyMap locale={Locale} />`

- [ ] **Step 1: Testi yaz**

```tsx
test('altı bölgeyi sabit sırada listeler', () => {
  render(<GlobalSupplyMap locale="en" />)
  const names = screen.getAllByTestId('region-button').map(b => b.textContent)
  expect(names).toEqual([
    'Europe', 'Türkiye', 'Middle East', 'North Africa', 'Americas', 'Asia',
  ])
})

test('bölge klavyeyle seçilebilir ve açıklaması görünür', async () => {
  render(<GlobalSupplyMap locale="en" />)
  const turkiye = screen.getByRole('button', { name: 'Türkiye' })
  turkiye.focus()
  await userEvent.keyboard('{Enter}')
  expect(turkiye).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('region', { name: /Türkiye/ })).toBeVisible()
})

test('harita ekran okuyucu için metin alternatifi sunar', () => {
  render(<GlobalSupplyMap locale="en" />)
  expect(screen.getByRole('img', { name: /United Kingdom/i })).toBeInTheDocument()
})

test('marka mesajı ve CTA yerinde', () => {
  render(<GlobalSupplyMap locale="en" />)
  expect(screen.getByText(/BRITISH ORIGIN\./)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /DISCUSS YOUR REQUIREMENTS/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Testi çalıştır**

Run: `npm run test -- GlobalSupplyMap`
Expected: FAIL.

- [ ] **Step 3: Sadeleştirilmiş dünya SVG'sini hazırla**

`world-path.ts` içinde tek `path` string'i (kıta siluetleri, düz projeksiyon, yaklaşık 15KB). Kaynak telifsiz sadeleştirilmiş dünya haritasıdır. Dolgu `--jt-cream`, kenar `--jt-muted` düşük opaklık.

- [ ] **Step 4: Bileşeni yaz**

UK konumunda altın nokta ve `EST. 2004` etiketi. Altı bölge hedefine quadratic Bézier arkları; `stroke-dasharray` ve `stroke-dashoffset` animasyonu ile tek seferlik çizilir, `IntersectionObserver` ile görünür olunca tetiklenir. Bölge etiketleri `<button aria-pressed>`; seçildiğinde `<div role="region" aria-label>` bölge açıklamasını gösterir. Harita `<svg role="img" aria-label>` taşır. `prefers-reduced-motion` etkinse arklar animasyonsuz, doğrudan çizili gelir.

Üstte `BRITISH ORIGIN. GLOBAL REACH.`, altta `UK-origin fabrics supplied to textile professionals across global markets.` ve `DISCUSS YOUR REQUIREMENTS` CTA'sı.

- [ ] **Step 5: Testleri çalıştır**

Run: `npm run test -- GlobalSupplyMap`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add web/src/components/sections
git commit -m "feat(web): interactive global supply map"
```

---

### Task 9: Ana sayfa

**Files:**
- Create: `web/src/components/sections/{Hero,TrustStrip,Heritage,FabricCategories,CollectionsGrid,TextileExpertise,SourcingTeaser,UkOrigin,QualityTraceability,IndustriesGrid,SampleService,TradeLogistics,BulkOrders,ResponsibleTextiles,InsightsTeaser,CorporateCta}.tsx`
- Create: `web/src/routes/Home.tsx`, `web/src/hooks/useReveal.ts`
- Create: `web/src/content/en/home.ts`, `web/src/content/tr/home.ts`
- Test: `web/src/routes/Home.test.tsx`

**Interfaces:**
- Consumes: primitive'ler, `GlobalSupplyMap`, `Seo`
- Produces: `<Home locale={Locale} />`

- [ ] **Step 1: Testi yaz**

```tsx
test('17 bölüm spec sırasında render edilir', () => {
  render(<Home locale="en" />)
  const sections = document.querySelectorAll('section[data-section]')
  expect([...sections].map(s => s.getAttribute('data-section'))).toEqual([
    'hero', 'trust', 'heritage', 'fabric-categories', 'collections',
    'textile-expertise', 'sourcing', 'uk-origin', 'quality',
    'industries', 'sample-service', 'global-supply', 'trade-logistics',
    'bulk-orders', 'responsible', 'insights', 'corporate-cta',
  ])
})

test('hero marka mesajını birebir taşır', () => {
  render(<Home locale="en" />)
  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('BRITISH ORIGIN.')
  expect(h1).toHaveTextContent('GLOBAL REACH.')
  expect(screen.getByText('Fabric, Perfected.')).toBeInTheDocument()
  expect(screen.getAllByText('EST. 2004').length).toBeGreaterThan(0)
})

test('trust strip dört öğeyi sırayla gösterir', () => {
  render(<Home locale="en" />)
  const text = screen.getByTestId('trust-strip').textContent ?? ''
  expect(text).toMatch(/EST\. 2004[\s\S]*UK ORIGIN[\s\S]*B2B WHOLESALE[\s\S]*GLOBAL SUPPLY/)
})

test('12 kumaş kategorisi kartı var ve hepsi bağlantılı', () => {
  render(<Home locale="en" />)
  const cards = screen.getAllByTestId('fabric-card')
  expect(cards).toHaveLength(12)
  cards.forEach(c => expect(c.querySelector('a')).toHaveAttribute('href', expect.stringContaining('/fabrics/')))
})

test('sayfada uydurma article number yok', () => {
  const { container } = render(<Home locale="en" />)
  expect(container.textContent).not.toMatch(/JT-[A-Z]{2}-\d{3}-\d{3}/)
})

test('sertifika adı veya logosu basılmaz', () => {
  const { container } = render(<Home locale="en" />)
  expect(container.textContent).not.toMatch(/OEKO-TEX|GOTS|GRS/)
})

test('TR ana sayfada marka sloganları çevrilmez', () => {
  render(<Home locale="tr" />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('BRITISH ORIGIN.')
  expect(screen.getByText('Fabric, Perfected.')).toBeInTheDocument()
})
```

- [ ] **Step 2: Testi çalıştır**

Run: `npm run test -- Home`
Expected: FAIL.

- [ ] **Step 3: `content/en/home.ts` yaz**

Brief bölüm 10-38'deki tüm metinler: hero, trust strip, heritage (2004 ve BUGÜN), 12 kategori kartı, 8 koleksiyon, textile expertise (Composition, Construction, GSM, Width, Hand Feel, Drape, Stretch, Finish, Performance, Application), sourcing teaser (`You define the requirement. We help find the fabric.`), UK origin, quality alan listesi, 8 sektör, sample service üç seçeneği, trade & logistics üç teslimat tipi ve hizmet listesi, bulk orders alan listesi, responsible textiles, insights, `LET'S TALK FABRIC.` CTA bloğu.

- [ ] **Step 4: `content/tr/home.ts` yaz**

Brief'in Türkçe karşılıkları. Marka sloganları İngilizce kalır; açıklama metinleri Türkçedir.

- [ ] **Step 5: `useReveal` hook'unu yaz**

`IntersectionObserver` ile görünürlüğü izler, `prefers-reduced-motion` etkinse animasyonu atlar ve doğrudan görünür durum döner. Her bölüm bu tek hook'u kullanır.

- [ ] **Step 6: Bölüm bileşenlerini yaz**

Her bölüm `<Section data-section tone>` sarmalıdır. Hero tam ekran görsel, koyu katman ve iki satırlık `<h1>`. TrustStrip ince koyu şerit. Heritage iki kolon: solda anlatı, sağda 2004/BUGÜN zaman çizgisi. FabricCategories 12'li grid (masaüstü 4×3, mobil 2 kolon), her kart görsel, isim ve alt tür sayısı taşır. CollectionsGrid 8'li grid. CorporateCta koyu tam genişlik blok.

- [ ] **Step 7: Testleri çalıştır**

Run: `npm run test -- Home`
Expected: PASS.

- [ ] **Step 8: Görsel doğrulama**

Run: `npm run dev`, tarayıcıda `/` ve `/tr` aç. Kontrol: altın oranı, boşluk ritmi, 375px genişlikte yatay kaydırma yok.

- [ ] **Step 9: Commit**

```bash
git add web/src
git commit -m "feat(web): homepage with all corporate sections"
```

---

### Task 10: Kumaş kategorileri ve koleksiyon sayfaları

**Files:**
- Create: `web/src/routes/{Fabrics,FabricCategory,Collections,Collection}.tsx`
- Create: `web/src/content/en/fabrics/*.ts` (12 dosya), `web/src/content/en/collections/*.ts` (8 dosya) ve TR karşılıkları
- Test: `web/src/routes/FabricCategory.test.tsx`

**Interfaces:**
- Consumes: `FabricCategoryContent`, `CollectionContent` (Task 4)
- Produces: `<FabricCategory slug={string} locale={Locale} />`, `<Collection slug={string} locale={Locale} />`

- [ ] **Step 1: Testi yaz**

```tsx
const SLUGS = ['linen','cotton','viscose','polyester','wool','denim','knitted',
               'shirting','tailoring','fashion','performance-technical','interior']

test.each(SLUGS)('%s sayfası dolu ve özgün içerik taşır', (slug) => {
  render(<FabricCategory slug={slug} locale="en" />)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect((screen.getByTestId('overview').textContent ?? '').length).toBeGreaterThan(400)
  expect(screen.getByTestId('types').children.length).toBeGreaterThan(4)
  expect(screen.getByTestId('applications')).toBeInTheDocument()
})

test('kategori metinleri birbirinin kopyası değil', () => {
  const texts = SLUGS.map(slug => {
    const { container, unmount } = render(<FabricCategory slug={slug} locale="en" />)
    const t = container.querySelector('[data-testid="overview"]')?.textContent ?? ''
    unmount()
    return t
  })
  expect(new Set(texts).size).toBe(SLUGS.length)
})

test('linen sayfası brief alt türlerini içerir', () => {
  render(<FabricCategory slug="linen" locale="en" />)
  const types = screen.getByTestId('types').textContent ?? ''
  for (const t of ['100% Linen','Linen Cotton','Washed Linen','Linen Canvas','Linen Shirting']) {
    expect(types).toContain(t)
  }
})

test('kategori sayfası teklif ve sourcing CTA taşır', () => {
  render(<FabricCategory slug="linen" locale="en" />)
  expect(screen.getByRole('link', { name: /REQUEST A QUOTE/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /SOURCING/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Testi çalıştır**

Run: `npm run test -- FabricCategory`
Expected: FAIL.

- [ ] **Step 3: 12 kategori içeriğini yaz**

Her dosya `FabricCategoryContent` uygular. `types` alanı brief bölüm 12'deki listelerin birebir kendisidir. `overview` en az iki paragraf ve kategoriye özgü teknik anlatı içerir: elyaf yapısı, dokuma veya örme davranışı, tipik gramaj aralığı, döküm ve tuşe karakteri, üretimde dikkat edilecek noktalar. Şablon cümle tekrarı yapılmaz; test bunu yakalar.

- [ ] **Step 4: Route bileşenlerini yaz**

`Fabrics` 12 kategorinin index'idir. `FabricCategory` şunları içerir: hero görseli, intro, overview paragrafları, alt tür listesi (`data-testid="types"`), teknik özet tablosu (tipik GSM ve en, mono tipografi), uygulama alanları, üretim notları, altta `REQUEST A QUOTE` ve `SOURCING DESK` CTA'ları, ilgili koleksiyonlara çapraz bağlantı.

`Collections` ve `Collection` aynı yapıdadır; koleksiyon sayfası hangi kategorileri kapsadığını gösterir ve o kategorilere bağlanır.

- [ ] **Step 5: TR içeriklerini yaz**

- [ ] **Step 6: Testleri çalıştır**

Run: `npm run test -- FabricCategory && npm run test -- integrity`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add web/src
git commit -m "feat(web): 12 fabric category and 8 collection landing pages"
```

---

### Task 11: Sektör sayfaları ve kurumsal sayfalar

**Files:**
- Create: `web/src/routes/{Industries,Industry,About,Heritage,UkOrigin,TextileExpertise,QualityTraceability,ResponsibleTextiles,GlobalSupply,TradeLogistics,BulkOrders}.tsx`
- Create: ilgili `content/en` ve `content/tr` dosyaları
- Test: `web/src/routes/Industry.test.tsx`, `web/src/routes/corporate-pages.test.tsx`

**Interfaces:**
- Produces: `<Industry slug={string} locale={Locale} />` ve on kurumsal sayfa bileşeni

- [ ] **Step 1: Testi yaz**

```tsx
const INDUSTRIES = ['fashion-apparel','shirting','tailoring','casual-streetwear',
                    'workwear','uniforms','hospitality','interior-upholstery']

test.each(INDUSTRIES)('%s sektör sayfası özgün ve dolu', (slug) => {
  render(<Industry slug={slug} locale="en" />)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect((screen.getByTestId('overview').textContent ?? '').length).toBeGreaterThan(350)
  expect(screen.getByTestId('recommended-fabrics').children.length).toBeGreaterThan(2)
})

test('her sektör sayfası ilgili kumaş kategorilerine bağlanır', () => {
  render(<Industry slug="shirting" locale="en" />)
  const links = [...screen.getByTestId('recommended-fabrics').querySelectorAll('a')]
  expect(links.some(a => a.getAttribute('href') === '/fabrics/shirting')).toBe(true)
})

test('quality sayfası article number biçimini örnek olarak etiketler', () => {
  render(<QualityTraceability locale="en" />)
  const sample = screen.getByTestId('article-format-example')
  expect(sample).toHaveAttribute('data-example', 'true')
  expect(sample.textContent).toMatch(/JT-LN-180-001/)
  expect(screen.getByText(/example format/i)).toBeInTheDocument()
})

test('responsible textiles sayfası sertifika logosu basmaz', () => {
  const { container } = render(<ResponsibleTextiles locale="en" />)
  expect(container.querySelectorAll('img[alt*="OEKO"], img[alt*="GOTS"], img[alt*="GRS"]')).toHaveLength(0)
})

test('trade logistics sayfası teslim şartı notunu taşır', () => {
  render(<TradeLogistics locale="en" />)
  expect(screen.getByText(/DELIVERY TERMS AVAILABLE UPON QUOTATION/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Testi çalıştır**

Run: `npm run test -- Industry corporate-pages`
Expected: FAIL.

- [ ] **Step 3: 8 sektör içeriğini yaz**

Her sektör için: üretim bağlamı, o sektörde kritik olan kumaş özellikleri (örneğin workwear için aşınma dayanımı ve gramaj, shirting için poplin ve oxford farkı ile en), önerilen JUSTEKS kategorileri (çapraz bağlantı), tipik satın alma soruları.

- [ ] **Step 4: Kurumsal sayfaları yaz**

`About` ve `Heritage` brief bölüm 3 ve 11'deki marka hikâyesini kullanır. `UkOrigin` brief 24'e dayanır; menşe rozetini (`UNITED KINGDOM ORIGIN`) tanıtır, ürün bulunmadığı için rozet örnek olarak gösterilir. `TextileExpertise` brief 23'teki on teknik özelliği açıklar. `QualityTraceability` brief 25'teki alan listesini ve Article Number biçimini örnek etiketiyle anlatır. `ResponsibleTextiles` brief 33'e dayanır; sertifika adı geçebilir, logo basılmaz, "ürün bazında doğrulandığında gösterilir" ifadesi yer alır. `GlobalSupply` brief 27 ve 28'e dayanır, `GlobalSupplyMap` bileşenini yeniden kullanır. `TradeLogistics` brief 29 ve 30'a dayanır; Incoterms listesi `DELIVERY TERMS AVAILABLE UPON QUOTATION` notuyla verilir. `BulkOrders` brief 31'e dayanır, formu Task 19'da bağlanır.

- [ ] **Step 5: TR içeriklerini yaz**

- [ ] **Step 6: Testleri çalıştır**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add web/src
git commit -m "feat(web): industry and corporate pages"
```

---

### Task 12: Insights, Resources, servis ve yasal sayfalar

**Files:**
- Create: `web/src/routes/{Insights,InsightArticle,Resources,Contact,Sourcing,SampleService,TradeAccount,Privacy,Cookies,Terms,NotFound}.tsx`
- Create: `web/src/content/en/insights/*.ts` (6 makale) ve TR karşılıkları
- Test: `web/src/routes/Insights.test.tsx`

**Interfaces:**
- Produces: `<InsightArticle slug={string} locale={Locale} />`; `interface ArticleContent { slug: string; seo: SeoMeta; title: string; publishedAt: string; readingMinutes: number; body: string[]; relatedFabrics: string[] }`

- [ ] **Step 1: Testi yaz**

```tsx
test('insights index makaleleri tarihe göre yeniden eskiye listeler', () => {
  render(<Insights locale="en" />)
  const dates = screen.getAllByTestId('article-date').map(d => d.getAttribute('datetime')!)
  expect(dates).toEqual([...dates].sort().reverse())
})

test('her makale ilgili kumaş sayfasına yönlendirir', () => {
  render(<InsightArticle slug="what-is-linen-fabric" locale="en" />)
  const related = screen.getByTestId('related-fabrics')
  expect(related.querySelector('a[href="/fabrics/linen"]')).toBeInTheDocument()
})

test('makale sayfası Article JSON-LD üretir', () => {
  render(<InsightArticle slug="what-is-linen-fabric" locale="en" />)
  const ld = document.head.querySelector('script[type="application/ld+json"]')!
  expect(JSON.parse(ld.textContent!)['@type']).toBe('Article')
})

test('makaleler yeterince uzun', () => {
  const SLUGS = ['what-is-linen-fabric','why-fabric-gsm-matters','poplin-vs-oxford',
                 'how-to-choose-shirting-fabric','what-is-twill-fabric','reading-fabric-composition']
  for (const slug of SLUGS) {
    const { container, unmount } = render(<InsightArticle slug={slug} locale="en" />)
    const words = (container.textContent ?? '').split(/\s+/).length
    unmount()
    expect(words, slug).toBeGreaterThan(500)
  }
})

test('resources sayfası ölü indirme bağlantısı içermez', () => {
  render(<Resources locale="en" />)
  const links = [...document.querySelectorAll('a[download], a[href$=".pdf"]')]
  expect(links).toHaveLength(0)
})
```

- [ ] **Step 2: Testi çalıştır**

Run: `npm run test -- Insights`
Expected: FAIL.

- [ ] **Step 3: Altı seed makaleyi yaz**

Slug'lar: `what-is-linen-fabric`, `why-fabric-gsm-matters`, `poplin-vs-oxford`, `how-to-choose-shirting-fabric`, `what-is-twill-fabric`, `reading-fabric-composition`. Her biri en az 600 kelime, gerçek teknik içerik ve sonunda ilgili JUSTEKS kategorilerine bağlantı taşır.

- [ ] **Step 4: Servis ve yasal sayfaları yaz**

`Sourcing` brief 21'e dayanır, formu Task 19'da bağlanır. `SampleService` brief 20'ye dayanır: swatch, sample, colour card. `TradeAccount` brief 32'ye dayanır; gelecek özellikler "yakında" olarak değil, hesap başvurusu formu olarak sunulur. `Resources` brief 35'e dayanır; belge henüz yoksa "available on request" ile `/contact`'a bağlanır, ölü indirme bağlantısı bırakılmaz. `Contact` brief 36'daki altı konuyu sunar. `Privacy`, `Cookies`, `Terms` gerçek metinlerdir ve şirket bilgisi `site.config.ts` placeholder'larından gelir. `NotFound` 404 sayfasıdır.

- [ ] **Step 5: TR içeriklerini yaz**

- [ ] **Step 6: Tam test ve build**

Run: `npm run test && npm run build && npm run test -- prerender`
Expected: PASS; prerender testi artık tüm sayfaları doğrular.

- [ ] **Step 7: Commit**

```bash
git add web/src
git commit -m "feat(web): insights, services, resources and legal pages"
```

---

### Task 13: Backend iskeleti, Flyway şeması, Testcontainers

**Files:**
- Create: `api/pom.xml`, `api/src/main/java/com/justeks/JusteksApplication.java`, `api/src/main/resources/application.yml`, `api/src/main/resources/db/migration/V1__enquiry.sql`
- Test: `api/src/test/java/com/justeks/AbstractIntegrationTest.java`, `api/src/test/java/com/justeks/SchemaMigrationTest.java`

**Interfaces:**
- Produces: `AbstractIntegrationTest` — Testcontainers Postgres 17 ile `@SpringBootTest`; tüm entegrasyon testleri bunu genişletir.

- [ ] **Step 1: `pom.xml` yaz**

`spring-boot-starter-parent` 4.1.1, `java.version` 25. Bağımlılıklar: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `spring-boot-starter-validation`, `spring-boot-starter-security`, `flyway-core`, `flyway-database-postgresql`, `postgresql`, `spring-boot-starter-test`, `spring-security-test`, `testcontainers-postgresql`, `spring-boot-testcontainers`.

- [ ] **Step 2: Derlemeyi doğrula**

Run: `cd api && mvn -q compile`
Expected: BUILD SUCCESS. Java 25 uyumsuzluğu çıkarsa `maven.compiler.release` 21'e alınır ve `README.md`'ye not düşülür. Bu, spec risk 3'ün backend tarafındaki kapanışıdır.

- [ ] **Step 3: `V1__enquiry.sql` yaz**

Spec 10.2'deki beş tablo. `enquiry.id` `bigserial primary key`, `reference_no varchar(20) not null unique`, `type varchar(32) not null`, `status varchar(32) not null`, zaman damgaları `timestamptz not null default now()`. `create sequence enquiry_reference_seq`. İndeksler: `enquiry(status)`, `enquiry(type)`, `enquiry(created_at desc)`, `enquiry_attachment(enquiry_id)`. Detay tablolarında `enquiry_id` `references enquiry(id) on delete cascade`.

- [ ] **Step 4: `AbstractIntegrationTest` yaz**

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
public abstract class AbstractIntegrationTest {
    @Container
    @ServiceConnection
    static final PostgreSQLContainer<?> POSTGRES =
        new PostgreSQLContainer<>("postgres:17-alpine");
}
```

- [ ] **Step 5: Migration testini yaz**

```java
class SchemaMigrationTest extends AbstractIntegrationTest {
    @Autowired JdbcTemplate jdbc;

    @Test
    void tablolarOlusturuldu() {
        var tables = jdbc.queryForList(
            "select table_name from information_schema.tables where table_schema = 'public'",
            String.class);
        assertThat(tables).contains("enquiry", "sourcing_request_detail",
            "bulk_requirement_detail", "trade_account_detail", "enquiry_attachment");
    }

    @Test
    void referansNumarasiTekil() {
        jdbc.update("insert into enquiry (reference_no, type, status, contact_name, email, country) " +
                    "values ('JTE-2026-00001','GENERAL','NEW','A','a@example.com','UK')");
        assertThatThrownBy(() -> jdbc.update(
            "insert into enquiry (reference_no, type, status, contact_name, email, country) " +
            "values ('JTE-2026-00001','GENERAL','NEW','B','b@example.com','UK')"))
            .isInstanceOf(DuplicateKeyException.class);
    }

    @Test
    void detayKaydiCascadeSilinir() {
        // enquiry ekle, sourcing_request_detail ekle, enquiry sil, detay sayısı 0 olmalı
    }
}
```

- [ ] **Step 6: Testi çalıştır**

Run: `mvn test -Dtest=SchemaMigrationTest`
Expected: PASS (Docker çalışıyor olmalı).

- [ ] **Step 7: Commit**

```bash
git add api/
git commit -m "feat(api): spring boot skeleton, flyway schema, testcontainers harness"
```

---

### Task 14: Enquiry domain ve referans numarası

**Files:**
- Create: `api/src/main/java/com/justeks/enquiry/{Enquiry,EnquiryType,EnquiryStatus,EnquiryRepository}.java`, `api/src/main/java/com/justeks/common/ReferenceNumberGenerator.java`
- Test: `api/src/test/java/com/justeks/enquiry/EnquiryStatusTest.java`, `api/src/test/java/com/justeks/common/ReferenceNumberGeneratorTest.java`

**Interfaces:**
- Produces:
  - `enum EnquiryType { SALES, SAMPLING, SOURCING, INTERNATIONAL_TRADE, TECHNICAL, GENERAL, BULK, TRADE_ACCOUNT }` — her biri `String prefix()` döner: `SOURCING` → `JTR`, `BULK` → `JTB`, `TRADE_ACCOUNT` → `JTA`, diğerleri → `JTE`
  - `enum EnquiryStatus { NEW, UNDER_REVIEW, QUOTED, NEGOTIATION, CONFIRMED, CLOSED }` — `boolean canTransitionTo(EnquiryStatus next)`
  - `String ReferenceNumberGenerator.next(EnquiryType type, int year)`
  - `Enquiry.updateStatus(EnquiryStatus next)` — geçersiz geçişte `IllegalStateException`

- [ ] **Step 1: Durum geçişi testini yaz**

```java
@Test void ileriGecisIzinli() {
    assertThat(EnquiryStatus.NEW.canTransitionTo(EnquiryStatus.UNDER_REVIEW)).isTrue();
    assertThat(EnquiryStatus.QUOTED.canTransitionTo(EnquiryStatus.NEGOTIATION)).isTrue();
}

@Test void geriGecisYasak() {
    assertThat(EnquiryStatus.QUOTED.canTransitionTo(EnquiryStatus.NEW)).isFalse();
}

@Test void herDurumdanClosedIzinli() {
    for (var s : EnquiryStatus.values())
        if (s != EnquiryStatus.CLOSED)
            assertThat(s.canTransitionTo(EnquiryStatus.CLOSED)).isTrue();
}

@Test void closedTerminal() {
    for (var s : EnquiryStatus.values())
        assertThat(EnquiryStatus.CLOSED.canTransitionTo(s)).isFalse();
}
```

- [ ] **Step 2: Referans numarası testini yaz**

```java
class ReferenceNumberGeneratorTest extends AbstractIntegrationTest {
    @Autowired ReferenceNumberGenerator generator;

    @Test void bicimDogru() {
        assertThat(generator.next(EnquiryType.GENERAL, 2026)).matches("JTE-2026-\\d{5}");
        assertThat(generator.next(EnquiryType.SOURCING, 2026)).matches("JTR-2026-\\d{5}");
        assertThat(generator.next(EnquiryType.BULK, 2026)).matches("JTB-2026-\\d{5}");
        assertThat(generator.next(EnquiryType.TRADE_ACCOUNT, 2026)).matches("JTA-2026-\\d{5}");
    }

    @Test void esZamanliCagrilarTekilUretir() throws Exception {
        var pool = Executors.newFixedThreadPool(16);
        var futures = IntStream.range(0, 200)
            .mapToObj(i -> pool.submit(() -> generator.next(EnquiryType.GENERAL, 2026)))
            .toList();
        var refs = new HashSet<String>();
        for (var f : futures) refs.add(f.get());
        assertThat(refs).hasSize(200);
    }
}
```

- [ ] **Step 3: Testleri çalıştır**

Run: `mvn test -Dtest='EnquiryStatusTest,ReferenceNumberGeneratorTest'`
Expected: FAIL — sınıflar yok.

- [ ] **Step 4: Uygula**

`EnquiryStatus.canTransitionTo` sıralı bir `EnumMap` ile tanımlanır; `CLOSED` terminaldir. `ReferenceNumberGenerator` Postgres sequence'inden okur (`select nextval('enquiry_reference_seq')`) ve `%s-%d-%05d` biçiminde döner; sequence kullanımı eş zamanlılık testini karşılar. `Enquiry` JPA entity'sidir ve `updateStatus` geçersiz geçişte `IllegalStateException` fırlatır.

- [ ] **Step 5: Testleri çalıştır**

Run: `mvn test -Dtest='EnquiryStatusTest,ReferenceNumberGeneratorTest'`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add api/src
git commit -m "feat(api): enquiry domain, status transitions, reference number generator"
```

---

### Task 15: `POST /api/v1/enquiries`

**Files:**
- Create: `api/src/main/java/com/justeks/enquiry/{EnquiryService,EnquiryController}.java`, `api/src/main/java/com/justeks/enquiry/dto/{CreateEnquiryRequest,EnquiryCreatedResponse}.java`, `api/src/main/java/com/justeks/common/ApiExceptionHandler.java`, `api/src/main/java/com/justeks/notification/{NotificationService,LoggingNotificationService}.java`
- Test: `api/src/test/java/com/justeks/enquiry/EnquiryControllerTest.java`

**Interfaces:**
- Produces:
  - `record CreateEnquiryRequest(EnquiryType type, String companyName, String contactName, String email, String phone, String country, String city, String message, String locale, String website)` — `website` honeypot alanıdır
  - `record EnquiryCreatedResponse(String referenceNo)`
  - Başarı: HTTP 201, gövde `{"referenceNo":"JTE-2026-00001"}`
  - Doğrulama hatası: HTTP 400, gövde `{"errors":{"email":"..."}}`

- [ ] **Step 1: Testi yaz**

```java
class EnquiryControllerTest extends AbstractIntegrationTest {
    @Autowired TestRestTemplate rest;
    @Autowired EnquiryRepository repo;

    private Map<String,Object> valid() {
        return new HashMap<>(Map.of(
            "type","SALES", "companyName","Acme Textiles",
            "contactName","Jane Doe", "email","jane@acme.example",
            "country","United Kingdom", "message","We need 5000 m linen.",
            "locale","en"));
    }

    @Test void gecerliTalepKaydedilir() {
        var res = rest.postForEntity("/api/v1/enquiries", valid(), Map.class);
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat((String) res.getBody().get("referenceNo")).matches("JTE-2026-\\d{5}");
        assertThat(repo.count()).isEqualTo(1);
        assertThat(repo.findAll().getFirst().getStatus()).isEqualTo(EnquiryStatus.NEW);
    }

    @Test void gecersizEpostaReddedilir() {
        var body = valid(); body.put("email", "not-an-email");
        var res = rest.postForEntity("/api/v1/enquiries", body, Map.class);
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat((Map<?,?>) res.getBody().get("errors")).containsKey("email");
        assertThat(repo.count()).isZero();
    }

    @Test void zorunluAlanEksikReddedilir() {
        var body = valid(); body.remove("contactName");
        assertThat(rest.postForEntity("/api/v1/enquiries", body, Map.class).getStatusCode())
            .isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test void honeypotDoluIseSessizceReddedilir() {
        var body = valid(); body.put("website", "http://spam.example");
        var res = rest.postForEntity("/api/v1/enquiries", body, Map.class);
        assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(repo.count()).isZero();
    }

    @Test void mesajUzunlukSiniriUygulanir() {
        var body = valid(); body.put("message", "x".repeat(5001));
        assertThat(rest.postForEntity("/api/v1/enquiries", body, Map.class).getStatusCode())
            .isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test void kaynakIpKaydedilir() {
        rest.postForEntity("/api/v1/enquiries", valid(), Map.class);
        assertThat(repo.findAll().getFirst().getSourceIp()).isNotBlank();
    }
}
```

- [ ] **Step 2: Testi çalıştır**

Run: `mvn test -Dtest=EnquiryControllerTest`
Expected: FAIL.

- [ ] **Step 3: Uygula**

`CreateEnquiryRequest` üzerinde Jakarta Validation: `@NotNull type`, `@NotBlank @Size(max=120) contactName`, `@NotBlank @Email @Size(max=180) email`, `@Size(max=120) companyName`, `@NotBlank @Size(max=80) country`, `@NotBlank @Size(max=5000) message`. `EnquiryService.create` honeypot doluysa kaydetmeden sahte referans döner. `ApiExceptionHandler` `MethodArgumentNotValidException`'ı `{"errors": {...}}` biçimine çevirir. `LoggingNotificationService` yeni talebi INFO seviyesinde loglar.

- [ ] **Step 4: Testi çalıştır**

Run: `mvn test -Dtest=EnquiryControllerTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add api/src
git commit -m "feat(api): enquiry endpoint with validation, honeypot and notification hook"
```

---

### Task 16: Dosya yükleme ve `POST /api/v1/sourcing-requests`

**Files:**
- Create: `api/src/main/java/com/justeks/storage/{StorageService,LocalStorageService,StoredFile,InvalidUploadException}.java`, `api/src/main/java/com/justeks/enquiry/{SourcingRequestDetail,EnquiryAttachment}.java`, `api/src/main/java/com/justeks/enquiry/dto/CreateSourcingRequest.java`
- Test: `api/src/test/java/com/justeks/storage/LocalStorageServiceTest.java`, `api/src/test/java/com/justeks/enquiry/SourcingRequestControllerTest.java`

**Interfaces:**
- Produces:
  - `record StoredFile(String storedKey, String originalFilename, String contentType, long sizeBytes)`
  - `StoredFile StorageService.store(MultipartFile file)` — geçersiz tip veya boyutta `InvalidUploadException`
  - `InputStream StorageService.read(String storedKey)`
  - `void StorageService.delete(String storedKey)`

- [ ] **Step 1: Storage testini yaz**

```java
@Test void dosyaKaydedilirVeGeriOkunur() throws Exception {
    var file = new MockMultipartFile("f", "swatch.jpg", "image/jpeg", "data".getBytes());
    var stored = storage.store(file);
    assertThat(stored.storedKey()).doesNotContain("swatch.jpg");
    assertThat(stored.originalFilename()).isEqualTo("swatch.jpg");
    assertThat(storage.read(stored.storedKey()).readAllBytes()).isEqualTo("data".getBytes());
}

@Test void izinsizUzantiReddedilir() {
    var file = new MockMultipartFile("f", "payload.exe", "application/octet-stream", "x".getBytes());
    assertThatThrownBy(() -> storage.store(file)).isInstanceOf(InvalidUploadException.class);
}

@Test void contentTypeUzantiylaTutarsizsaReddedilir() {
    var file = new MockMultipartFile("f", "photo.jpg", "application/x-msdownload", "x".getBytes());
    assertThatThrownBy(() -> storage.store(file)).isInstanceOf(InvalidUploadException.class);
}

@Test void boyutSiniriUygulanir() {
    var big = new MockMultipartFile("f", "big.pdf", "application/pdf", new byte[10 * 1024 * 1024 + 1]);
    assertThatThrownBy(() -> storage.store(big)).isInstanceOf(InvalidUploadException.class);
}

@Test void yolGecisiDenemesiTemizlenir() throws Exception {
    var file = new MockMultipartFile("f", "../../etc/passwd", "application/pdf", "x".getBytes());
    var stored = storage.store(file);
    assertThat(stored.storedKey()).doesNotContain("..");
}
```

- [ ] **Step 2: Sourcing endpoint testini yaz**

```java
@Test void dosyayla birlikteSourcingTalebiKaydedilir() {
    var body = new LinkedMultiValueMap<String,Object>();
    body.add("fabricType", "Linen");
    body.add("composition", "100% Linen");
    body.add("gsm", "180");
    body.add("requiredQuantity", "5000");
    body.add("contactName", "Jane Doe");
    body.add("email", "jane@acme.example");
    body.add("country", "United Kingdom");
    body.add("files", new ClassPathResource("test-swatch.jpg"));

    var res = rest.postForEntity("/api/v1/sourcing-requests", multipart(body), Map.class);
    assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat((String) res.getBody().get("referenceNo")).matches("JTR-2026-\\d{5}");
    assertThat(attachmentRepo.count()).isEqualTo(1);
}

@Test void besDosyadanFazlasiReddedilir() {
    // 6 dosya gönder; 400 bekle, enquiry ve attachment sayısı 0 kalmalı
}

@Test void dosyasizSourcingTalebiKabulEdilir() {
    // dosya alanı olmadan 201 bekle
}

@Test void gecersizDosyaTumIslemiGeriAlir() {
    // 1 geçerli + 1 .exe gönder; 400 bekle, enquiry kaydı oluşmamalı, disk temiz kalmalı
}
```

- [ ] **Step 3: Testleri çalıştır**

Run: `mvn test -Dtest='LocalStorageServiceTest,SourcingRequestControllerTest'`
Expected: FAIL.

- [ ] **Step 4: Uygula**

`LocalStorageService` `UPLOAD_DIR` altına `yyyy/MM/<uuid>.<ext>` yazar. Uzantı whitelist'i: `pdf, jpg, jpeg, png, webp, heic, xlsx, docx`. Content-type ile uzantı eşleşmesi sabit bir haritadan doğrulanır. Dosya adı `Path.getFileName()` ile normalize edilir. `application.yml` içinde `spring.servlet.multipart.max-file-size: 10MB`, `max-request-size: 55MB`.

`EnquiryService.createSourcingRequest` `@Transactional`'dır: önce `Enquiry` kaydeder, dosyaları saklar, `EnquiryAttachment` satırlarını yazar. Herhangi bir dosya reddedilirse işlem geri alınır ve o ana kadar diske yazılmış dosyalar silinir.

- [ ] **Step 5: Testleri çalıştır**

Run: `mvn test -Dtest='LocalStorageServiceTest,SourcingRequestControllerTest'`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add api/src
git commit -m "feat(api): file storage abstraction and sourcing request endpoint"
```

---

### Task 17: Bulk requirement, trade account, oran sınırı

**Files:**
- Create: `api/src/main/java/com/justeks/enquiry/{BulkRequirementDetail,TradeAccountDetail}.java`, `api/src/main/java/com/justeks/enquiry/dto/{CreateBulkRequirement,CreateTradeAccountApplication}.java`, `api/src/main/java/com/justeks/common/RateLimitFilter.java`
- Test: `api/src/test/java/com/justeks/enquiry/BulkAndTradeAccountControllerTest.java`, `api/src/test/java/com/justeks/common/RateLimitFilterTest.java`

**Interfaces:**
- Produces: `POST /api/v1/bulk-requirements` → `JTB-…`; `POST /api/v1/trade-account-applications` → `JTA-…`; oran sınırı aşımında HTTP 429 ve `Retry-After` başlığı.

- [ ] **Step 1: Testleri yaz**

```java
@Test void bulkTalebiTumAlanlariSaklar() {
    var body = Map.of("articleOrFabric","Premium Linen 180","composition","100% Linen",
        "colour","Natural","gsm","180","width","145","requiredQuantity","20000",
        "requiredDeliveryDate","2026-11-30","deliveryCountry","Türkiye",
        "deliveryCity","İstanbul","productionApplication","Shirting",
        "contactName","Jane Doe","email","jane@acme.example","country","Türkiye");
    var res = rest.postForEntity("/api/v1/bulk-requirements", body, Map.class);
    assertThat(res.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat((String) res.getBody().get("referenceNo")).matches("JTB-2026-\\d{5}");
    var detail = bulkRepo.findAll().getFirst();
    assertThat(detail.getDeliveryCity()).isEqualTo("İstanbul");
    assertThat(detail.getRequiredQuantity()).isEqualByComparingTo(new BigDecimal("20000"));
}

@Test void gecmisTarihliTeslimatReddedilir() {
    // requiredDeliveryDate = 2020-01-01 → 400
}

@Test void tradeAccountBasvurusuKaydedilir() {
    // JTA-2026-XXXXX; companyRegistration ve vatNumber saklanmalı
}
```

```java
@Test void ayniIpIcinSinirAsiliminda429Doner() {
    for (int i = 0; i < 10; i++)
        assertThat(post().getStatusCode()).isEqualTo(HttpStatus.CREATED);
    var blocked = post();
    assertThat(blocked.getStatusCode()).isEqualTo(HttpStatus.TOO_MANY_REQUESTS);
    assertThat(blocked.getHeaders().getFirst("Retry-After")).isNotNull();
}

@Test void farkliIpEtkilenmez() {
    // X-Forwarded-For başlığını değiştir, 201 bekle
}

@Test void adminYollariMuaf() {
    // /api/v1/admin/** oran sınırına takılmamalı
}
```

- [ ] **Step 2: Testleri çalıştır**

Run: `mvn test -Dtest='BulkAndTradeAccountControllerTest,RateLimitFilterTest'`
Expected: FAIL.

- [ ] **Step 3: Uygula**

Miktar alanları `BigDecimal`, tarih `LocalDate` ve `@FutureOrPresent`. `RateLimitFilter` IP başına kayan pencere uygular (varsayılan 10 istek / 10 dakika), yalnızca `/api/v1/**` altındaki POST yollarına etki eder, admin yolları muaftır. Bellek içi `ConcurrentHashMap` yeterlidir; sınır ve pencere `application.yml`'den okunur.

- [ ] **Step 4: Testleri çalıştır**

Run: `mvn test`
Expected: Tüm testler PASS.

- [ ] **Step 5: Commit**

```bash
git add api/src
git commit -m "feat(api): bulk requirement, trade account endpoints and rate limiting"
```

---

### Task 18: Admin API ve güvenlik

**Files:**
- Create: `api/src/main/java/com/justeks/admin/AdminEnquiryController.java`, `api/src/main/java/com/justeks/config/SecurityConfig.java`
- Test: `api/src/test/java/com/justeks/admin/AdminEnquiryControllerTest.java`

**Interfaces:**
- Produces:
  - `GET /api/v1/admin/enquiries?type=&status=&page=&size=` → sayfalı liste
  - `GET /api/v1/admin/enquiries/{id}` → detay ve ek dosya listesi
  - `PATCH /api/v1/admin/enquiries/{id}/status`, gövde `{"status":"UNDER_REVIEW"}`
  - `GET /api/v1/admin/attachments/{id}` → dosya indirme
  - Kimlik doğrulama: HTTP Basic, `ADMIN_USERNAME` ve `ADMIN_PASSWORD` ortam değişkenlerinden

- [ ] **Step 1: Testi yaz**

```java
@Test void kimliksizErisimReddedilir() {
    assertThat(rest.getForEntity("/api/v1/admin/enquiries", String.class).getStatusCode())
        .isEqualTo(HttpStatus.UNAUTHORIZED);
}

@Test void yetkiliKullaniciListeAlir() {
    var res = rest.withBasicAuth("admin","test-secret")
                  .getForEntity("/api/v1/admin/enquiries", Map.class);
    assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
}

@Test void tipVeDurumaGoreFiltrelenir() {
    // 3 SALES + 2 SOURCING kaydet; ?type=SOURCING → 2 sonuç
}

@Test void gecerliDurumGecisiUygulanir() {
    var res = rest.withBasicAuth("admin","test-secret").exchange(
        "/api/v1/admin/enquiries/{id}/status", HttpMethod.PATCH,
        new HttpEntity<>(Map.of("status","UNDER_REVIEW")), Map.class, id);
    assertThat(res.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(repo.findById(id).orElseThrow().getStatus())
        .isEqualTo(EnquiryStatus.UNDER_REVIEW);
}

@Test void gecersizDurumGecisi409Doner() {
    // QUOTED → NEW denemesi; CONFLICT dönmeli ve durum değişmemeli
}

@Test void ekDosyaIndirilebilir() {
    // sourcing talebi oluştur, attachment id ile indir, içerik eşleşsin
}

@Test void olmayanEkDosya404Doner() {
    // gövdede dosya yolu bilgisi sızmamalı
}
```

- [ ] **Step 2: Testi çalıştır**

Run: `mvn test -Dtest=AdminEnquiryControllerTest`
Expected: FAIL.

- [ ] **Step 3: Uygula**

`SecurityConfig`: `/api/v1/admin/**` için `authenticated()`, diğer `/api/v1/**` için `permitAll()`, API olduğu için CSRF kapalı, CORS `ALLOWED_ORIGINS` ortam değişkeninden okunur. `InMemoryUserDetailsManager` kimlik bilgilerini ortam değişkeninden alır ve parolayı bcrypt ile kodlar. Geçersiz durum geçişi `IllegalStateException` fırlatır; `ApiExceptionHandler` bunu HTTP 409'a çevirir.

- [ ] **Step 4: Testi çalıştır**

Run: `mvn test`
Expected: Tüm testler PASS.

- [ ] **Step 5: Commit**

```bash
git add api/src
git commit -m "feat(api): admin listing, status transitions, attachment download, security"
```

---

### Task 19: Frontend formlarını API'ye bağla

**Files:**
- Create: `web/src/lib/api.ts`, `web/src/components/forms/{Field,EnquiryForm,SourcingForm,BulkForm,TradeAccountForm,FormStatus}.tsx`
- Modify: `web/src/routes/{Contact,Sourcing,BulkOrders,TradeAccount}.tsx`
- Test: `web/src/components/forms/EnquiryForm.test.tsx`, `web/src/components/forms/SourcingForm.test.tsx`

**Interfaces:**
- Consumes: Task 15-17 endpoint sözleşmeleri
- Produces: `submitEnquiry(payload): Promise<{ referenceNo: string }>`, `submitSourcingRequest(formData)`, `submitBulkRequirement(payload)`, `submitTradeAccountApplication(payload)`; hata durumunda `class ApiError extends Error { status: number; fieldErrors: Record<string,string> }`

- [ ] **Step 1: Testi yaz**

```tsx
test('başarılı gönderimde referans numarası gösterilir', async () => {
  server.use(http.post('*/api/v1/enquiries', () =>
    HttpResponse.json({ referenceNo: 'JTE-2026-00042' }, { status: 201 })))
  render(<EnquiryForm locale="en" />)
  await fillValidForm()
  await userEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(await screen.findByText('JTE-2026-00042')).toBeInTheDocument()
})

test('alan hatası ilgili input a bağlanır', async () => {
  server.use(http.post('*/api/v1/enquiries', () =>
    HttpResponse.json({ errors: { email: 'must be a well-formed email address' } }, { status: 400 })))
  render(<EnquiryForm locale="en" />)
  await fillValidForm()
  await userEvent.click(screen.getByRole('button', { name: /send/i }))
  const input = screen.getByLabelText(/email/i)
  expect(input).toHaveAttribute('aria-invalid', 'true')
  expect(input).toHaveAccessibleDescription(/well-formed email/)
})

test('API çöktüğünde kullanıcıya alternatif iletişim sunulur', async () => {
  server.use(http.post('*/api/v1/enquiries', () => HttpResponse.error()))
  render(<EnquiryForm locale="en" />)
  await fillValidForm()
  await userEvent.click(screen.getByRole('button', { name: /send/i }))
  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent(/could not be sent/i)
  expect(screen.getByRole('link', { name: /email/i }).getAttribute('href')).toContain('mailto:')
})

test('honeypot alanı ekran okuyuculardan gizli', () => {
  render(<EnquiryForm locale="en" />)
  const hp = document.querySelector('input[name="website"]')!
  expect(hp).toHaveAttribute('tabindex', '-1')
  expect(hp).toHaveAttribute('aria-hidden', 'true')
})

test('gönderim sırasında buton kilitlenir', async () => {
  // çift gönderim koruması: tıklandıktan sonra disabled olmalı
})

test('topic sorgu parametresi konu seçimini önceden doldurur', () => {
  renderAtRoute(<Contact locale="en" />, '/contact?topic=sales')
  expect(screen.getByLabelText(/topic/i)).toHaveValue('SALES')
})
```

- [ ] **Step 2: Testi çalıştır**

Run: `npm run test -- forms`
Expected: FAIL.

- [ ] **Step 3: Uygula**

`Field` bileşeni `<label>`, input ve `aria-describedby` ile bağlı hata metni üretir. `FormStatus` başarıda `role="status"`, hatada `role="alert"` kullanır. `EnquiryForm` brief 36'daki altı konuyu `<select>` olarak sunar; `/contact?topic=sales` sorgu parametresi ön seçim yapar. `SourcingForm` brief 21 alanlarını ve çoklu dosya yüklemeyi içerir (`accept` ile whitelist, istemcide de boyut kontrolü, seçilen dosyalar listelenir ve kaldırılabilir). `BulkForm` brief 31 alanlarını, `TradeAccountForm` brief 32 alanlarını içerir.

API tabanı `import.meta.env.VITE_API_BASE_URL`'den gelir; tanımsızsa `/api` kullanılır.

- [ ] **Step 4: Testleri çalıştır**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 5: Uçtan uca elle doğrula**

`docker compose up -d`, `cd api && mvn spring-boot:run`, `cd web && npm run dev`. `/contact` formunu doldur, gönder, referans numarasını gör.

Run: `docker compose exec -T postgres psql -U justeks -d justeks -c "select reference_no, type, status, email from enquiry order by id desc limit 5;"`
Expected: Yeni kayıt listede.

- [ ] **Step 6: Commit**

```bash
git add web/src
git commit -m "feat(web): connect contact, sourcing, bulk and trade account forms to api"
```

---

### Task 20: Admin arayüzü, uçtan uca test, kapanış

**Files:**
- Create: `web/src/routes/AdminEnquiries.tsx`, `web/e2e/smoke.spec.ts`, `web/playwright.config.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 18 admin endpoint'leri

- [ ] **Step 1: Playwright kur ve yapılandır**

Run: `cd web && npm i -D @playwright/test && npx playwright install chromium`

`playwright.config.ts`: `webServer` ile `npm run preview`, `baseURL: http://localhost:4173`.

- [ ] **Step 2: Smoke testini yaz**

```ts
test('ana sayfa marka mesajını gösterir', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('BRITISH ORIGIN.')
  await expect(page.getByText('EST. 2004').first()).toBeVisible()
})

test('dil değişimi aynı sayfada kalır', async ({ page }) => {
  await page.goto('/fabrics/linen')
  await page.getByRole('link', { name: 'TR' }).click()
  await expect(page).toHaveURL('/tr/fabrics/linen')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('mobilde yatay kaydırma yok', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)
})

test('klavyeyle ana içeriğe atlanabilir', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: /skip to content/i })).toBeFocused()
})

test('iletişim formu gerçek referans numarası döndürür', async ({ page }) => {
  await page.goto('/contact')
  await page.getByLabel('Company').fill('Acme Textiles')
  await page.getByLabel('Name').fill('Jane Doe')
  await page.getByLabel('Email').fill('jane@acme.example')
  await page.getByLabel('Country').fill('United Kingdom')
  await page.getByLabel('Message').fill('We need 5000 metres of linen.')
  await page.getByRole('button', { name: /send/i }).click()
  await expect(page.getByText(/JT[A-Z]-\d{4}-\d{5}/)).toBeVisible()
})
```

- [ ] **Step 3: Testi çalıştır**

Run: `docker compose up -d`, ayrı terminalde `cd api && mvn spring-boot:run`, sonra `cd web && npm run build && npx playwright test`
Expected: PASS.

- [ ] **Step 4: Admin arayüzünü yaz**

`/admin/enquiries` — HTTP Basic kimlik bilgisiyle listeleme tablosu (referans, tarih, tip, firma, ülke, durum), tip ve duruma göre filtre, satıra tıklayınca detay paneli, durum güncelleme `<select>` ve ek dosya indirme bağlantıları. Prerender edilmez ve `robots.txt` ile dışlanır (Task 6'da yapıldı).

- [ ] **Step 5: Lighthouse ölçümü**

Run: `npm run build && npm run preview` ve ayrı terminalde `npx lighthouse http://localhost:4173 --quiet --chrome-flags="--headless"`
Expected: Performance ≥ 90, Accessibility ≥ 95. Altında kalırsa görsel boyutları ve font yüklemesi optimize edilir, ölçüm tekrarlanır.

- [ ] **Step 6: README'yi tamamla ve bitti tanımını doğrula**

Spec bölüm 15'teki on iki maddenin her birini gerçek komut çıktısıyla teyit et ve README'ye "Faz 1 durumu" bölümü olarak ekle.

- [ ] **Step 7: Commit**

```bash
git add web/ README.md
git commit -m "feat(web): admin enquiry console, e2e smoke tests, phase 1 completion"
```

---

## Self-Review Notları

**Spec kapsam denetimi:** Spec 2.1'deki her satırın karşılığı vardır — kurumsal anlatı Task 11, tedarik anlatısı Task 8 ve 11, ürün anlatısı Task 10, sektörler Task 11, servisler Task 12, içerik Task 12, iletişim Task 19, yasal Task 12, dil Task 4, backend Task 13-17, admin Task 18 ve 20, SEO Task 5 ve 6. Spec 12 performans hedefi Task 20 Step 5'te ölçülür. Spec 13 erişilebilirlik Task 3, 7, 8 ve Task 20 Step 2'de doğrulanır.

**Tip tutarlılığı:** `Locale`, `RouteDef`, `RouteGroup`, `SiteContent`, `SeoMeta`, `ImageRef` Task 4'te tanımlanır ve sonraki tüm task'larda aynı adla kullanılır. `EnquiryType`, `EnquiryStatus`, `StoredFile`, `CreateEnquiryRequest` Task 14-16'da tanımlanır; Task 18 ve 19 bunlara aynı imzalarla bağlanır. `toLocalePath` Task 4'te tanımlanıp Task 5, 6 ve 7'de kullanılır. `contrastRatio` yalnızca Task 3'te kullanılır.

**Bilinen açık karar:** Task 3 Step 1'de font çifti kullanıcı seçimine bırakılmıştır; tasarım tercihi olduğu için plan içinde sabitlenmemiştir. Seçim yapılana kadar sonraki task'lar bloke olmaz — geçici olarak sistem serif ve sans yığını kullanılır, seçim sonrası yalnızca `typography.css` değişir.
