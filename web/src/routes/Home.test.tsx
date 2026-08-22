import { screen, within } from '@testing-library/react'
import { renderAtRoute } from '../test/render'
import { Home } from './Home'

const SECTION_ORDER = [
  'hero', 'trust', 'heritage', 'fabric-categories', 'collections',
  'textile-expertise', 'sourcing', 'uk-origin', 'quality',
  'industries', 'sample-service', 'global-supply', 'trade-logistics',
  'bulk-orders', 'responsible', 'insights', 'corporate-cta',
]

test('bölümler spec sırasında render edilir', () => {
  const { container } = renderAtRoute(<Home locale="en" />)
  const sections = [...container.querySelectorAll('section[data-section]')]
    .map((s) => s.getAttribute('data-section'))
  expect(sections).toEqual(SECTION_ORDER)
})

test('hero marka mesajını birebir taşır', () => {
  renderAtRoute(<Home locale="en" />)
  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('BRITISH ORIGIN.')
  expect(h1).toHaveTextContent('GLOBAL REACH.')
  expect(screen.getByText('Fabric, Perfected.')).toBeInTheDocument()
})

test('trust strip dört öğeyi sırayla gösterir', () => {
  renderAtRoute(<Home locale="en" />)
  const text = screen.getByTestId('trust-strip').textContent ?? ''
  expect(text).toMatch(/Est\. 2004[\s\S]*UK Origin[\s\S]*B2B Wholesale[\s\S]*Global Supply/)
})

test('12 kumaş kategorisi kartı var ve hepsi bağlantılı', () => {
  renderAtRoute(<Home locale="en" />)
  const cards = screen.getAllByTestId('home-fabric-card')
  expect(cards).toHaveLength(12)
  for (const card of cards) {
    expect(card.querySelector('a')?.getAttribute('href')).toMatch(/^\/fabrics\//)
  }
})

test('8 koleksiyon ve 8 sektör kartı var', () => {
  renderAtRoute(<Home locale="en" />)
  expect(screen.getAllByTestId('home-collection-card')).toHaveLength(8)
  expect(screen.getAllByTestId('home-industry-card')).toHaveLength(8)
})

test('sayfada uydurma article number yok', () => {
  const { container } = renderAtRoute(<Home locale="en" />)
  expect(container.textContent).not.toMatch(/JT-[A-Z]{2}-\d{3}-\d{3}/)
})

test('sertifika adı veya logosu basılmaz', () => {
  const { container } = renderAtRoute(<Home locale="en" />)
  expect(container.textContent).not.toMatch(/OEKO-TEX|GOTS|GRS/)
})

test('TR ana sayfada marka sloganları çevrilmez', () => {
  renderAtRoute(<Home locale="tr" />, '/tr')
  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('BRITISH ORIGIN.')
  expect(screen.getByText('Fabric, Perfected.')).toBeInTheDocument()
  expect(screen.getByText('Textile Expertise Since 2004.')).toBeInTheDocument()
})

test('TR ana sayfada bağlantılar TR yollarına gider', () => {
  renderAtRoute(<Home locale="tr" />, '/tr')
  const card = screen.getAllByTestId('home-fabric-card')[0]
  expect(card.querySelector('a')?.getAttribute('href')).toMatch(/^\/tr\/fabrics\//)
})

test('yalnızca tek h1 vardır', () => {
  const { container } = renderAtRoute(<Home locale="en" />)
  expect(container.querySelectorAll('h1')).toHaveLength(1)
})

test('Organization JSON-LD basılır', () => {
  renderAtRoute(<Home locale="en" />)
  const types = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => JSON.parse(s.textContent!)['@type'])
  expect(types).toContain('Organization')
})

test('kurumsal CTA koyu blok ve iki çağrı taşır', () => {
  // "Request a Quote" hem hero'da hem kapanış bandında bulunur; bu bilinçli,
  // bu yüzden arama bölüm kapsamında yapılır.
  const { container } = renderAtRoute(<Home locale="en" />)
  const band = container.querySelector('section[data-section="corporate-cta"]') as HTMLElement
  expect(band).toBeTruthy()
  const q = within(band)
  expect(q.getByRole('link', { name: /request a quote/i })).toBeInTheDocument()
  expect(q.getByRole('link', { name: /talk to a fabric specialist/i }))
    .toHaveAttribute('href', '/contact')
  expect(q.getByText('Textile Expertise Since 2004.')).toBeInTheDocument()
})
