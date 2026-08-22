import { render } from '@testing-library/react'
import { Seo } from './seo'

const head = (sel: string) => document.head.querySelector(sel)
const heads = (sel: string) => [...document.head.querySelectorAll(sel)]

test('canonical ve üç alternate üretir', () => {
  render(<Seo path="/about" locale="en" meta={{ title: 'About', description: 'd' }} />)
  const pairs = heads('link[rel="alternate"]')
    .map((l) => `${l.getAttribute('hreflang')}:${l.getAttribute('href')}`)
  expect(pairs).toContain('en:https://justeks.com/about')
  expect(pairs).toContain('tr:https://justeks.com/tr/about')
  expect(pairs).toContain('x-default:https://justeks.com/about')
})

test('TR sayfasında canonical TR yolunu gösterir', () => {
  render(<Seo path="/about" locale="tr" meta={{ title: 'Hakkımızda', description: 'd' }} />)
  expect(head('link[rel="canonical"]')?.getAttribute('href'))
    .toBe('https://justeks.com/tr/about')
})

test('ana sayfada canonical sondaki eğik çizgi olmadan yazılır', () => {
  render(<Seo path="/" locale="en" meta={{ title: 'JUSTEKS', description: 'd' }} />)
  expect(head('link[rel="canonical"]')?.getAttribute('href')).toBe('https://justeks.com/')
  render(<Seo path="/" locale="tr" meta={{ title: 'JUSTEKS', description: 'd' }} />)
  expect(heads('link[rel="canonical"]').at(-1)?.getAttribute('href'))
    .toBe('https://justeks.com/tr')
})

test('başlık marka son ekiyle biter', () => {
  render(<Seo path="/about" locale="en" meta={{ title: 'About', description: 'd' }} />)
  expect(document.title).toBe('About — JUSTEKS')
})

test('marka adıyla başlayan başlık tekrarlanmaz', () => {
  render(<Seo path="/" locale="en" meta={{ title: 'JUSTEKS', description: 'd' }} />)
  expect(document.title).toBe('JUSTEKS')
})

test('description ve open graph etiketleri basılır', () => {
  render(<Seo path="/about" locale="en" meta={{ title: 'About', description: 'Corporate story' }} />)
  expect(head('meta[name="description"]')?.getAttribute('content')).toBe('Corporate story')
  expect(head('meta[property="og:title"]')?.getAttribute('content')).toBe('About — JUSTEKS')
  expect(head('meta[property="og:url"]')?.getAttribute('content')).toBe('https://justeks.com/about')
  expect(head('meta[property="og:type"]')?.getAttribute('content')).toBe('website')
  expect(head('meta[property="og:site_name"]')?.getAttribute('content')).toBe('JUSTEKS')
})

test('og:locale dile göre değişir', () => {
  render(<Seo path="/about" locale="tr" meta={{ title: 'A', description: 'd' }} />)
  expect(head('meta[property="og:locale"]')?.getAttribute('content')).toBe('tr_TR')
})

// React 19 hoists title/meta/link into <head>, but leaves an inline
// application/ld+json script where it renders. That is fine: JSON-LD is valid
// in <body> and Google reads it there, so we assert on the document, not head.
test('jsonLd verildiğinde script olarak basılır', () => {
  render(
    <Seo path="/" locale="en" meta={{ title: 'JUSTEKS', description: 'd' }}
         jsonLd={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'JUSTEKS' }} />,
  )
  const script = document.querySelector('script[type="application/ld+json"]')
  expect(JSON.parse(script!.textContent!).name).toBe('JUSTEKS')
})

test('jsonLd verilmediğinde script basılmaz', () => {
  render(<Seo path="/about" locale="en" meta={{ title: 'A', description: 'd' }} />)
  expect(document.querySelector('script[type="application/ld+json"]')).toBeNull()
})

test('noIndex verildiğinde robots meta basılır', () => {
  render(<Seo path="/admin/enquiries" locale="en" meta={{ title: 'Admin', description: 'd' }} noIndex />)
  expect(head('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow')
})
