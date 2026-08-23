import { useSearchParams } from 'react-router'
import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { postJson } from '../../lib/api'
import { CONTACT } from '../../../site.config'
import { Button } from '../primitives'
import { Field, Honeypot } from './Field'
import { FormOutcome } from './FormOutcome'
import { useEnquiryForm } from './useEnquiryForm'
import './forms.css'

/**
 * The contact form.
 *
 * The subject can be preselected from the query string, so "Request a Quote"
 * links can land on /contact?topic=SALES with the right desk already chosen.
 */
export function EnquiryForm({ locale }: { locale: Locale }) {
  const content = getContent(locale).forms.contact
  const [params] = useSearchParams()

  const topics = content.topics ?? []
  const requested = params.get('topic')
  const initialType = topics.some((t) => t.value === requested) ? requested! : 'GENERAL'

  const form = useEnquiryForm({
    type: initialType,
    companyName: '', contactName: '', email: '', phone: '',
    country: '', city: '', message: '', website: '',
  })

  const { values, setValue, errors, state } = form
  const labels = content.labels

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    form.submit((v) => postJson('/api/v1/enquiries', { ...v, locale }))
  }

  if (state === 'success') {
    return <FormOutcome content={content} state={state} reference={form.reference}
                        mailto={`mailto:${CONTACT.email}`} />
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate data-testid="enquiry-form">
      <h2 className="t-h2">{content.heading}</h2>
      <p className="t-body t-measure form__lead">{content.lead}</p>

      <Field label={labels.type} name="type" type="select" required
             options={topics} value={values.type} onChange={setValue('type')}
             error={errors.type} />

      <div className="form__row">
        <Field label={labels.contactName} name="contactName" required
               value={values.contactName} onChange={setValue('contactName')}
               error={errors.contactName} />
        <Field label={labels.companyName} name="companyName"
               value={values.companyName} onChange={setValue('companyName')}
               error={errors.companyName} />
      </div>

      <div className="form__row">
        <Field label={labels.email} name="email" type="email" required
               value={values.email} onChange={setValue('email')} error={errors.email} />
        <Field label={labels.phone} name="phone" type="tel"
               value={values.phone} onChange={setValue('phone')} error={errors.phone} />
      </div>

      <div className="form__row">
        <Field label={labels.country} name="country" required
               value={values.country} onChange={setValue('country')} error={errors.country} />
        <Field label={labels.city} name="city"
               value={values.city} onChange={setValue('city')} error={errors.city} />
      </div>

      <Field label={labels.message} name="message" type="textarea"
             value={values.message} onChange={setValue('message')} error={errors.message} />

      <Honeypot value={values.website} onChange={setValue('website')} />

      <FormOutcome content={content} state={state} reference={form.reference}
                   mailto={`mailto:${CONTACT.email}`} formError={errors.form} />

      <div className="form__actions">
        <Button type="submit" disabled={state === 'submitting'}>
          {state === 'submitting' ? content.submittingLabel : content.submitLabel}
        </Button>
      </div>
    </form>
  )
}
