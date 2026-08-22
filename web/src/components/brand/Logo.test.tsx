import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'
import {
  LOCKUP_VIEWBOX, MONOGRAM_TIGHT_VIEWBOX, WORDMARK_PATHS, WORDMARK_VIEWBOX,
} from './paths'

test('anlamlı kullanımda erişilebilir ad taşır', () => {
  render(<Logo title="JUSTEKS" />)
  const svg = screen.getByRole('img', { name: 'JUSTEKS' })
  expect(svg).toBeInTheDocument()
  expect(svg).not.toHaveAttribute('aria-hidden')
})

test('dekoratif kullanımda erişilebilirlik ağacından çıkarılır', () => {
  // Ad verilmediğinde işaret gizlenir; yanındaki metin işi görür. Boş adlı
  // bir role="img" bırakmak ekran okuyucuda adsız bir düğüm üretirdi.
  const { container } = render(<Logo />)
  const svg = container.querySelector('svg')!
  expect(svg).toHaveAttribute('aria-hidden', 'true')
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
  expect(svg.querySelector('title')).toBeNull()
})

test.each([
  ['lockup', LOCKUP_VIEWBOX],
  ['monogram', MONOGRAM_TIGHT_VIEWBOX],
  ['wordmark', WORDMARK_VIEWBOX],
] as const)('%s varyantı kendi sıkı viewBox değerini kullanır', (variant, viewBox) => {
  const { container } = render(<Logo variant={variant} />)
  expect(container.querySelector('svg')).toHaveAttribute('viewBox', viewBox)
})

test('wordmark yedi harfi de çizer', () => {
  const { container } = render(<Logo variant="wordmark" />)
  expect(container.querySelectorAll('path')).toHaveLength(WORDMARK_PATHS.length)
  expect(WORDMARK_PATHS).toHaveLength(7)
})

test('kilit, monogram ve wordmark arasına altın çizgiyi koyar', () => {
  const { container } = render(<Logo variant="lockup" />)
  expect(container.querySelector('rect.logo__rule')).toBeInTheDocument()
  // Monogram tek path, wordmark yedi path.
  expect(container.querySelectorAll('path')).toHaveLength(1 + WORDMARK_PATHS.length)
})

test('monogram ve wordmark tek başlarına çizgi taşımaz', () => {
  for (const variant of ['monogram', 'wordmark'] as const) {
    const { container } = render(<Logo variant={variant} />)
    expect(container.querySelector('rect.logo__rule')).toBeNull()
  }
})

test('zemin tonu sınıf olarak uygulanır', () => {
  const { container: light } = render(<Logo tone="light" />)
  expect(light.querySelector('svg')).toHaveClass('logo--light')
  const { container: dark } = render(<Logo tone="dark" />)
  expect(dark.querySelector('svg')).toHaveClass('logo--dark')
})

test('ton verilmezse renk devralınır', () => {
  // currentColor, işaretin rengini sıradan CSS ile verilebilir kılar; header
  // ve footer bunun üzerine kuruludur.
  const { container } = render(<Logo variant="monogram" />)
  const svg = container.querySelector('svg')!
  expect(svg.className.baseVal).not.toMatch(/logo--(light|dark)/)
  expect(svg.querySelector('path')).toHaveAttribute('stroke', 'currentColor')
})

test('kilitte de her çizim currentColor kullanır', () => {
  const { container } = render(<Logo variant="lockup" />)
  const strokes = [...container.querySelectorAll('[stroke]')]
  expect(strokes.length).toBeGreaterThan(0)
  for (const el of strokes) expect(el).toHaveAttribute('stroke', 'currentColor')
})

test('işaret tek mürekkeple basılabilir kalır', () => {
  // Marka kuralı: gradient, filtre, maske veya gömülü raster yok. Bunlar
  // logoyu tek renkli baskıda ve küçük boyutta bozar.
  const { container } = render(<Logo variant="lockup" title="JUSTEKS" />)
  const markup = container.innerHTML
  for (const banned of ['gradient', 'filter', 'mask', 'clipPath', 'image', 'style=']) {
    expect(markup, `yasak: ${banned}`).not.toContain(banned)
  }
})
