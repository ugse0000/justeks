import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAtRoute } from '../../test/render'
import { GlobalSupplyMap } from './GlobalSupplyMap'
import { getContent } from '../../content'

test('altı bölgeyi brief sırasında listeler', () => {
  renderAtRoute(<GlobalSupplyMap locale="en" />)
  const names = screen.getAllByTestId('region-button').map((b) => b.textContent)
  expect(names).toEqual([
    'Europe', 'Türkiye', 'Middle East', 'North Africa', 'Americas', 'Asia',
  ])
})

test('bölge klavyeyle seçilir ve açıklaması görünür', async () => {
  const user = userEvent.setup()
  renderAtRoute(<GlobalSupplyMap locale="en" />)
  const turkiye = screen.getByRole('button', { name: 'Türkiye' })
  turkiye.focus()
  await user.keyboard('{Enter}')
  expect(turkiye).toHaveAttribute('aria-pressed', 'true')
  const panel = screen.getByRole('region', { name: 'Türkiye' })
  expect(panel).toBeVisible()
  expect(panel.textContent).toContain('Türkiye')
})

// aria-pressed sabitlenmiş (pinned) durumu bildirir; hover yalnızca önizlemedir.
test('aynı anda tek bölge sabitlenir', async () => {
  const user = userEvent.setup()
  renderAtRoute(<GlobalSupplyMap locale="en" />)
  await user.click(screen.getByRole('button', { name: 'Asia' }))
  await user.click(screen.getByRole('button', { name: 'Americas' }))
  const pressed = screen.getAllByTestId('region-button')
    .filter((b) => b.getAttribute('aria-pressed') === 'true')
  expect(pressed).toHaveLength(1)
  expect(pressed[0].textContent).toBe('Americas')
})

test('harita ekran okuyucu için metin alternatifi taşır', () => {
  renderAtRoute(<GlobalSupplyMap locale="en" />)
  expect(screen.getByRole('img', { name: /United Kingdom/i })).toBeInTheDocument()
})

test('marka mesajı ve CTA yerinde', () => {
  renderAtRoute(<GlobalSupplyMap locale="en" />)
  expect(screen.getByText('BRITISH ORIGIN.')).toBeInTheDocument()
  expect(screen.getByText('GLOBAL REACH.')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /discuss your requirements/i }))
    .toHaveAttribute('href', '/contact?topic=INTERNATIONAL_TRADE')
})

test('TR de bölge adları İngilizce kalır ama açıklamalar Türkçedir', () => {
  renderAtRoute(<GlobalSupplyMap locale="tr" />, '/tr/global-supply')
  const names = screen.getAllByTestId('region-button').map((b) => b.textContent)
  expect(names).toEqual([
    'Europe', 'Türkiye', 'Middle East', 'North Africa', 'Americas', 'Asia',
  ])
  expect(getContent('tr').globalSupply.regions[0].body).toMatch(/Avrupa/)
})

test('her bölge için bir ark çizilir', () => {
  const { container } = renderAtRoute(<GlobalSupplyMap locale="en" />)
  expect(container.querySelectorAll('[data-testid="supply-arc"]')).toHaveLength(6)
})

test('UK menşe noktası işaretlenir', () => {
  renderAtRoute(<GlobalSupplyMap locale="en" />)
  expect(screen.getByTestId('origin-label').textContent).toContain('EST. 2004')
})
