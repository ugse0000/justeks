import {
  toLocalePath, localeFromPathname, stripLocale, otherLocale, LOCALES,
} from './i18n'
import { PUBLIC_ROUTES } from '../content/routes'

test('İngilizce kökte kalır', () => {
  expect(toLocalePath('/', 'en')).toBe('/')
  expect(toLocalePath('/about', 'en')).toBe('/about')
  expect(toLocalePath('/fabrics/linen', 'en')).toBe('/fabrics/linen')
})

test('Türkçe /tr önekini alır', () => {
  expect(toLocalePath('/', 'tr')).toBe('/tr')
  expect(toLocalePath('/about', 'tr')).toBe('/tr/about')
  expect(toLocalePath('/fabrics/linen', 'tr')).toBe('/tr/fabrics/linen')
})

test('pathname den locale çözülür', () => {
  expect(localeFromPathname('/')).toBe('en')
  expect(localeFromPathname('/about')).toBe('en')
  expect(localeFromPathname('/tr')).toBe('tr')
  expect(localeFromPathname('/tr/about')).toBe('tr')
})

test('/transport gibi yollar yanlışlıkla TR sayılmaz', () => {
  expect(localeFromPathname('/transport')).toBe('en')
  expect(localeFromPathname('/trade-account')).toBe('en')
  expect(stripLocale('/trade-account')).toBe('/trade-account')
})

test('stripLocale toLocalePath in tersidir', () => {
  for (const locale of LOCALES) {
    for (const route of PUBLIC_ROUTES) {
      expect(stripLocale(toLocalePath(route.path, locale))).toBe(route.path)
    }
  }
})

test('localeFromPathname üretilen yolu doğru tanır', () => {
  for (const locale of LOCALES) {
    for (const route of PUBLIC_ROUTES) {
      expect(localeFromPathname(toLocalePath(route.path, locale))).toBe(locale)
    }
  }
})

test('otherLocale dili çevirir', () => {
  expect(otherLocale('en')).toBe('tr')
  expect(otherLocale('tr')).toBe('en')
})
