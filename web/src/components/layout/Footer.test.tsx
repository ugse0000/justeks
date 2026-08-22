import { screen, within } from '@testing-library/react'
import { renderAtRoute } from '../../test/render'
import { Footer } from './Footer'
import { getContent } from '../../content'
import { ROUTES } from '../../content/routes'
import { LOCALES } from '../../lib/i18n'
import { CONTACT } from '../../../site.config'

const KNOWN = new Set(ROUTES.map((r) => r.path))

test('footer altı bölümü brief sırasında gösterir', () => {
  renderAtRoute(<Footer locale="en" />)
  const headings = screen.getAllByTestId('footer-heading').map((h) => h.textContent)
  expect(headings).toEqual([
    'Fabrics', 'Company', 'Services', 'Resources', 'Contact', 'Global Supply',
  ])
})

test('marka bloğu tagline ve since satırını taşır', () => {
  renderAtRoute(<Footer locale="en" />)
  expect(screen.getByText('Fabric, Perfected.')).toBeInTheDocument()
  expect(screen.getByText('Textile Expertise Since 2004.')).toBeInTheDocument()
})

test('altı tedarik bölgesi sabit sırada listelenir', () => {
  renderAtRoute(<Footer locale="en" />)
  const regions = screen.getByTestId('footer-regions').textContent ?? ''
  expect(regions).toMatch(
    /Europe[\s\S]*Türkiye[\s\S]*Middle East[\s\S]*North Africa[\s\S]*Americas[\s\S]*Asia/,
  )
})

test('HİÇBİR footer bağlantısı ölü değil', () => {
  // Bu testin varlık sebebi: footer 40+ bağlantı taşıyor ve elle kontrol
  // edilemez. Route tablosunda olmayan bir yol eklenirse burada patlar.
  for (const locale of LOCALES) {
    const { footer } = getContent(locale)
    const hrefs = [
      ...footer.columns.flatMap((c) => c.links.map((l) => l.href)),
      ...footer.legal.map((l) => l.href),
    ]
    for (const href of hrefs) {
      const path = href.split('?')[0]
      expect(KNOWN.has(path), `${locale}: bilinmeyen yol ${href}`).toBe(true)
    }
  }
})

test('TR footer bağlantıları TR yollarına gider', () => {
  renderAtRoute(<Footer locale="tr" />, '/tr')
  const link = screen.getByRole('link', { name: 'Keten' })
  expect(link).toHaveAttribute('href', '/tr/fabrics/linen')
})

test('yasal bağlantılar bulunur', () => {
  renderAtRoute(<Footer locale="en" />)
  expect(screen.getByRole('link', { name: /Privacy Policy/i })).toHaveAttribute('href', '/privacy')
  expect(screen.getByRole('link', { name: /Cookie Policy/i })).toHaveAttribute('href', '/cookies')
  expect(screen.getByRole('link', { name: /Terms/i })).toHaveAttribute('href', '/terms')
})

test('telif satırı içinde bulunulan yılı gösterir', () => {
  renderAtRoute(<Footer locale="en" />)
  const year = new Date().getFullYear().toString()
  expect(screen.getByTestId('footer-copyright').textContent).toContain(year)
})

test('altbilgi doğrudan iletişim bağlantıları taşır', () => {
  renderAtRoute(<Footer locale="en" />, '/')
  const contact = screen.getByTestId('footer-contact')
  expect(within(contact).getByRole('link', { name: CONTACT.email }))
    .toHaveAttribute('href', `mailto:${CONTACT.email}`)
  expect(within(contact).getByRole('link', { name: CONTACT.phone }))
    .toHaveAttribute('href', `tel:${CONTACT.phoneHref}`)
})
