import { screen } from '@testing-library/react'
import { renderAtRoute } from '../../test/render'
import { AdminEnquiries } from './AdminEnquiries'
import { PUBLIC_ROUTES } from '../../content/routes'

beforeEach(() => sessionStorage.clear())

test('oturum açılmadan giriş formu gösterilir', () => {
  renderAtRoute(<AdminEnquiries locale="en" />, '/admin/enquiries')

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(screen.queryByRole('table')).not.toBeInTheDocument()
})

test('admin sayfası indekslenmez', () => {
  renderAtRoute(<AdminEnquiries locale="en" />, '/admin/enquiries')

  expect(document.querySelector('meta[name="robots"]'))
    .toHaveAttribute('content', expect.stringContaining('noindex'))
})

test('admin rotası public rota tablosunda yok', () => {
  // Prerender, sitemap ve hreflang hepsi bu tablodan üretiliyor; admin
  // buraya girerse üçünde birden görünür.
  expect(PUBLIC_ROUTES.some((r) => r.path.startsWith('/admin'))).toBe(false)
})

test('kimlik bilgileri localStorage a yazılmaz', () => {
  // Sekme kapanınca oturum bitmeli: bu ekran her müşteri talebini listeliyor.
  renderAtRoute(<AdminEnquiries locale="en" />, '/admin/enquiries')

  expect(localStorage.getItem('justeks.admin.credentials')).toBeNull()
})
