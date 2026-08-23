import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderAtRoute } from '../../test/render'
import { EnquiryForm } from './EnquiryForm'
import { getContent } from '../../content'
import { CONTACT } from '../../../site.config'

const labels = getContent('en').forms.contact.labels

test('form alanları etiketleriyle erişilebilir', () => {
  renderAtRoute(<EnquiryForm locale="en" />, '/contact')

  expect(screen.getByLabelText(new RegExp(labels.contactName, 'i'))).toBeInTheDocument()
  expect(screen.getByLabelText(new RegExp(labels.email, 'i'))).toBeInTheDocument()
  expect(screen.getByLabelText(new RegExp(labels.country, 'i'))).toBeInTheDocument()
})

test('konu sorgu dizesinden önseçilir', () => {
  // "Request a Quote" bağlantıları /contact?topic=SALES adresine iner.
  renderAtRoute(<EnquiryForm locale="en" />, '/contact?topic=SALES')

  expect(screen.getByLabelText(new RegExp(labels.type, 'i'))).toHaveValue('SALES')
})

test('bilinmeyen konu sessizce genele düşer', () => {
  renderAtRoute(<EnquiryForm locale="en" />, '/contact?topic=NONSENSE')

  expect(screen.getByLabelText(new RegExp(labels.type, 'i'))).toHaveValue('GENERAL')
})

test('honeypot erişilebilirlik ağacında görünmez', () => {
  // Formu klavyeyle veya ekran okuyucuyla dolduran kimse buraya ulaşmamalı.
  const { container } = renderAtRoute(<EnquiryForm locale="en" />, '/contact')
  const honeypot = container.querySelector('input[name="website"]')!

  expect(honeypot).toBeInTheDocument()
  expect(honeypot.closest('[aria-hidden="true"]')).not.toBeNull()
  expect(honeypot).toHaveAttribute('tabindex', '-1')
  // Rol sorgusu aria-hidden'ı dikkate alır; getByLabelText almaz, bu yüzden
  // erişilebilirlik ağacından çıkarıldığını rol üzerinden doğruluyoruz.
  expect(screen.queryByRole('textbox', { name: /website/i })).not.toBeInTheDocument()
})

test('API yapılandırılmamışken e-posta yedeği sunulur', async () => {
  // Statik dağıtımda VITE_API_BASE_URL yok: form boşluğa göndermek yerine
  // ulaşılabilir bir yol gösterir.
  const user = userEvent.setup()
  renderAtRoute(<EnquiryForm locale="en" />, '/contact')

  await user.type(screen.getByLabelText(new RegExp(labels.contactName, 'i')), 'Jane Doe')
  await user.type(screen.getByLabelText(new RegExp(labels.email, 'i')), 'jane@acme.example')
  await user.type(screen.getByLabelText(new RegExp(labels.country, 'i')), 'United Kingdom')
  await user.click(screen.getByRole('button', { name: /send enquiry/i }))

  await waitFor(() => expect(screen.getByTestId('form-unavailable')).toBeInTheDocument())
  expect(screen.getByRole('link', { name: /email us instead/i }))
    .toHaveAttribute('href', `mailto:${CONTACT.email}`)
})

test('sonuç bölgesi odağı çalmadan duyurulur', () => {
  renderAtRoute(<EnquiryForm locale="en" />, '/contact')
  const region = screen.getByRole('status')

  expect(region).toHaveAttribute('aria-live', 'polite')
})

test('TR formu Türkçe etiketlerle gelir', () => {
  const tr = getContent('tr').forms.contact.labels
  renderAtRoute(<EnquiryForm locale="tr" />, '/tr/contact')

  expect(screen.getByLabelText(new RegExp(tr.contactName, 'i'))).toBeInTheDocument()
  expect(tr.contactName).not.toBe(labels.contactName)
})
