import { render, screen } from '@testing-library/react'
import { Logo, type LogoVariant } from './Logo'
import {
  ICON_VIEWBOX, LOCKUP_VIEWBOX, MONOGRAM_PARTS, MONOGRAM_VIEWBOX,
  STACK_VIEWBOX, TAGLINE_PARTS, WORDMARK_PARTS, WORDMARK_VIEWBOX,
} from './paths'

const VARIANTS: readonly LogoVariant[] = ['lockup', 'stack', 'wordmark', 'monogram', 'icon']

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
  ['stack', STACK_VIEWBOX],
  ['wordmark', WORDMARK_VIEWBOX],
  ['monogram', MONOGRAM_VIEWBOX],
  ['icon', ICON_VIEWBOX],
] as const)('%s varyantı kendi sıkı viewBox değerini kullanır', (variant, viewBox) => {
  const { container } = render(<Logo variant={variant} />)
  expect(container.querySelector('svg')).toHaveAttribute('viewBox', viewBox)
})

test('wordmark yedi harfi de çizer', () => {
  const { container } = render(<Logo variant="wordmark" />)
  expect(WORDMARK_PARTS).toHaveLength(7)
  expect(container.querySelectorAll('path')).toHaveLength(WORDMARK_PARTS.length)
})

test('monogram J ve T harflerinden oluşur', () => {
  const { container } = render(<Logo variant="monogram" />)
  expect(MONOGRAM_PARTS).toHaveLength(2)
  expect(container.querySelectorAll('path')).toHaveLength(2)
})

test('kilit; kelime markası, altın çizgi ve sloganı birlikte taşır', () => {
  const { container } = render(<Logo variant="lockup" />)
  expect(container.querySelector('rect.logo__accent')).toBeInTheDocument()
  expect(container.querySelectorAll('path'))
    .toHaveLength(WORDMARK_PARTS.length + TAGLINE_PARTS.length)
})

test('dikey kilit, kilidin üstüne monogramı ekler', () => {
  const { container } = render(<Logo variant="stack" />)
  expect(container.querySelectorAll('path')).toHaveLength(
    WORDMARK_PARTS.length + TAGLINE_PARTS.length + MONOGRAM_PARTS.length)
})

test('ikon, monogramı halkanın içine alır', () => {
  const { container } = render(<Logo variant="icon" />)
  expect(container.querySelector('circle')).toHaveAttribute('stroke', 'currentColor')
  expect(container.querySelectorAll('path')).toHaveLength(MONOGRAM_PARTS.length)
})

test('tek başına kullanılan varyantlar altın taşımaz', () => {
  // Altın yalnızca kilitteki çizgi ve slogandır. Monogram, kelime markası ve
  // ikon tek mürekkeple basılır.
  for (const variant of ['wordmark', 'monogram', 'icon'] as const) {
    const { container } = render(<Logo variant={variant} />)
    expect(container.querySelector('.logo__accent')).toBeNull()
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
  expect(svg.querySelector('g')).toHaveAttribute('fill', 'currentColor')
})

test('harfler her varyantta currentColor ile boyanır', () => {
  for (const variant of VARIANTS) {
    const { container } = render(<Logo variant={variant} />)
    const letters = container.querySelector('g[fill]')!
    expect(letters, variant).toHaveAttribute('fill', 'currentColor')
  }
})

test('işaret tek mürekkeple basılabilir kalır', () => {
  // Marka kuralı: gradient, filtre, maske veya gömülü raster yok. Bunlar
  // logoyu tek renkli baskıda ve küçük boyutta bozar.
  for (const variant of VARIANTS) {
    const { container } = render(<Logo variant={variant} title="JUSTEKS" />)
    const markup = container.innerHTML
    for (const banned of ['gradient', 'filter', 'mask', 'clipPath', 'image', 'style=']) {
      expect(markup, `${variant} icinde yasak: ${banned}`).not.toContain(banned)
    }
  }
})
