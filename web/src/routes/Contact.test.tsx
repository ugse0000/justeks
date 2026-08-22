import { screen, within } from '@testing-library/react'
import { renderAtRoute } from '../test/render'
import { PAGES } from './registry'
import './pages'
import { getContent } from '../content'
import { CONTACT, LEGAL_ENTITY, OFFICES, organizationJsonLd } from '../../site.config'
import { LOCALES } from '../lib/i18n'

const Contact = PAGES.contact

test('iletişim sayfası çalışan e-posta ve telefon bağlantısı sunar', () => {
  renderAtRoute(<Contact locale="en" />, '/contact')
  const direct = screen.getByTestId('contact-direct')
  expect(within(direct).getByRole('link', { name: CONTACT.email }))
    .toHaveAttribute('href', `mailto:${CONTACT.email}`)
  expect(within(direct).getByRole('link', { name: CONTACT.phone }))
    .toHaveAttribute('href', `tel:${CONTACT.phoneHref}`)
})

test('üç ofis de listelenir', () => {
  renderAtRoute(<Contact locale="en" />, '/contact')
  const offices = screen.getByTestId('contact-offices')
  const labels = getContent('en').contact.officeLabels
  for (const office of OFFICES) {
    expect(within(offices).getByRole('heading', { name: labels[office.key] }))
      .toBeInTheDocument()
  }
})

test('teyit edilmemiş adres taşıyan ofis açıkça işaretlenir', () => {
  // İngiltere adresi şimdilik örnek. Ziyaretçinin bunu gerçek sanmaması
  // gerekiyor, aksi halde var olmayan bir ofise posta gönderir.
  renderAtRoute(<Contact locale="en" />, '/contact')
  const note = getContent('en').contact.provisionalNote
  const provisional = OFFICES.filter((o) => o.provisional)
  expect(provisional.length).toBeGreaterThan(0)
  expect(screen.getAllByText(note)).toHaveLength(provisional.length)
})

test('şirket kayıt bilgileri sayfada yer alır', () => {
  renderAtRoute(<Contact locale="tr" />, '/tr/contact')
  const reg = screen.getByTestId('contact-registration')
  expect(within(reg).getByText(LEGAL_ENTITY.name)).toBeInTheDocument()
  expect(within(reg).getByText(LEGAL_ENTITY.taxNumber)).toBeInTheDocument()
  expect(within(reg).getByText(LEGAL_ENTITY.mersis)).toBeInTheDocument()
})

test('Organization verisi teyit edilmemiş adresi taşımaz', () => {
  // Yapılandırılmış veri makine tarafından olgu olarak okunur; örnek bir
  // adresi oraya yazmak, hiç yazmamaktan kötüdür.
  const ld = organizationJsonLd()
  const serialised = JSON.stringify(ld)
  for (const office of OFFICES.filter((o) => o.provisional)) {
    for (const line of office.lines) {
      expect(serialised).not.toContain(line)
    }
    expect(serialised).not.toContain(office.postalCode)
  }
  expect(ld.legalName).toBe(LEGAL_ENTITY.name)
  expect(ld.address?.addressCountry).toBe('TR')
})

test('iletişim etiketleri iki dilde de çevrilmiş', () => {
  const en = getContent('en').contact
  const tr = getContent('tr').contact
  expect(tr.officesHeading).not.toBe(en.officesHeading)
  expect(tr.provisionalNote).not.toBe(en.provisionalNote)
  expect(tr.registration.heading).not.toBe(en.registration.heading)
  for (const locale of LOCALES) {
    const c = getContent(locale).contact
    for (const office of OFFICES) expect(c.officeLabels[office.key].length).toBeGreaterThan(2)
  }
})
