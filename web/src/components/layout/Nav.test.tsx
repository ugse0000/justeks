import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAtRoute } from '../../test/render'
import { Nav } from './Nav'

test('ana menü brief sırasını korur', () => {
  // "Home" burada yok: marka işareti zaten ana sayfaya gidiyor ve on maddelik
  // çubuk sayfa genişliğini taşırıyordu. Kalan sıra brief'teki gibi.
  renderAtRoute(<Nav locale="en" />)
  const labels = screen.getAllByTestId('nav-link').map((l) => l.textContent)
  expect(labels).toEqual([
    'Fabrics', 'Collections', 'Industries', 'UK Origin',
    'Global Supply', 'Sourcing', 'About', 'Insights', 'Contact',
  ])
})

test('TR menüsü aynı sırada ve TR yollarına gider', () => {
  renderAtRoute(<Nav locale="tr" />, '/tr')
  const links = screen.getAllByTestId('nav-link')
  expect(links).toHaveLength(9)
  expect(links[0]).toHaveAttribute('href', '/tr/fabrics')
  expect(links[1]).toHaveAttribute('href', '/tr/collections')
  expect(links[8]).toHaveAttribute('href', '/tr/contact')
})

test('aktif sayfa aria-current taşır', () => {
  renderAtRoute(<Nav locale="en" />, '/fabrics')
  const active = screen.getAllByTestId('nav-link').find((l) => l.textContent === 'Fabrics')
  expect(active).toHaveAttribute('aria-current', 'page')
})

test('alt sayfada üst menü öğesi aktif kalır', () => {
  renderAtRoute(<Nav locale="en" />, '/fabrics/linen')
  const active = screen.getAllByTestId('nav-link').find((l) => l.textContent === 'Fabrics')
  expect(active).toHaveAttribute('aria-current', 'page')
})

test('yalnızca bulunulan sayfa aktif işaretlenir', () => {
  renderAtRoute(<Nav locale="en" />, '/fabrics')
  const links = screen.getAllByTestId('nav-link')
  const current = links.filter((l) => l.hasAttribute('aria-current'))
  expect(current).toHaveLength(1)
  expect(current[0].textContent).toBe('Fabrics')
})

test('ana sayfada hiçbir menü maddesi aktif değil', () => {
  // Kökte marka işareti bulunulan yeri temsil eder; menüde karşılığı yok.
  renderAtRoute(<Nav locale="en" />, '/')
  const links = screen.getAllByTestId('nav-link')
  expect(links.filter((l) => l.hasAttribute('aria-current'))).toHaveLength(0)
})

test('mobil menü klavyeyle açılıp kapanır', async () => {
  const user = userEvent.setup()
  renderAtRoute(<Nav locale="en" />)
  const toggle = screen.getByRole('button', { name: /menu/i })
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await user.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await user.keyboard('{Escape}')
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
})

test('menü açıkken panel aria ile bağlanır', async () => {
  const user = userEvent.setup()
  renderAtRoute(<Nav locale="en" />)
  const toggle = screen.getByRole('button', { name: /menu/i })
  await user.click(toggle)
  const panelId = toggle.getAttribute('aria-controls')
  expect(panelId).toBeTruthy()
  expect(document.getElementById(panelId!)).toBeInTheDocument()
})

test('teklif çağrısı ve arama bağlantısı bulunur', () => {
  renderAtRoute(<Nav locale="en" />)
  expect(screen.getByRole('link', { name: /Request a Quote/i }))
    .toHaveAttribute('href', '/contact?topic=SALES')
  // Faz 1'de arama motoru yok; bağlantı iletişime gider ve bunu açıklar.
  const search = screen.getByRole('link', { name: /Search fabrics/i })
  expect(search).toHaveAttribute('href', '/contact')
})
