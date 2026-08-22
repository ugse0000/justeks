import { screen } from '@testing-library/react'
import { renderAtRoute } from '../../test/render'
import { LanguageSwitch } from './LanguageSwitch'

test('EN sayfasında TR karşılığına bağlanır', () => {
  renderAtRoute(<LanguageSwitch />, '/fabrics/linen')
  expect(screen.getByRole('link', { name: /Türkçe/i }))
    .toHaveAttribute('href', '/tr/fabrics/linen')
})

test('TR sayfasında EN karşılığına bağlanır', () => {
  renderAtRoute(<LanguageSwitch />, '/tr/fabrics/linen')
  expect(screen.getByRole('link', { name: /English/i }))
    .toHaveAttribute('href', '/fabrics/linen')
})

test('ana sayfada doğru çalışır', () => {
  renderAtRoute(<LanguageSwitch />, '/')
  expect(screen.getByRole('link', { name: /Türkçe/i })).toHaveAttribute('href', '/tr')
})

test('TR ana sayfasında EN köke döner', () => {
  renderAtRoute(<LanguageSwitch />, '/tr')
  expect(screen.getByRole('link', { name: /English/i })).toHaveAttribute('href', '/')
})

test('aktif dil işaretlenir ve bağlantı değildir', () => {
  renderAtRoute(<LanguageSwitch />, '/about')
  const active = screen.getByText('EN')
  expect(active).toHaveAttribute('aria-current', 'true')
  expect(active.tagName).not.toBe('A')
})

test('sorgu parametreli yolda da doğru karşılığa gider', () => {
  renderAtRoute(<LanguageSwitch />, '/contact?topic=SALES')
  expect(screen.getByRole('link', { name: /Türkçe/i })).toHaveAttribute('href', '/tr/contact')
})
