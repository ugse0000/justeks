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
 * The trade account application.
 *
 * companyWebsite is a real field here; `website` remains the honeypot. Keeping
 * them apart is what stops an applicant's own site being read as spam.
 */
export function TradeAccountForm({ locale }: { locale: Locale }) {
  const content = getContent(locale).forms.tradeAccount
  const labels = content.labels

  const form = useEnquiryForm({
    companyName: '', contactName: '', email: '', phone: '', country: '', city: '',
    message: '', companyRegistration: '', vatNumber: '', businessType: '',
    companyWebsite: '', annualVolumeEstimate: '', website: '',
  })

  const { values, setValue, errors, state } = form

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    form.submit((v) => postJson('/api/v1/trade-account-applications', { ...v, locale }))
  }

  if (state === 'success') {
    return <FormOutcome content={content} state={state} reference={form.reference}
                        mailto={`mailto:${CONTACT.email}`} />
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate data-testid="trade-account-form">
      <h2 className="t-h2">{content.heading}</h2>
      <p className="t-body t-measure form__lead">{content.lead}</p>

      <div className="form__row">
        <Field label={labels.companyName} name="companyName" required
               value={values.companyName} onChange={setValue('companyName')} error={errors.companyName} />
        <Field label={labels.contactName} name="contactName" required
               value={values.contactName} onChange={setValue('contactName')} error={errors.contactName} />
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

      <div className="form__row">
        <Field label={labels.companyRegistration} name="companyRegistration"
               value={values.companyRegistration} onChange={setValue('companyRegistration')}
               error={errors.companyRegistration} />
        <Field label={labels.vatNumber} name="vatNumber"
               value={values.vatNumber} onChange={setValue('vatNumber')} error={errors.vatNumber} />
      </div>

      <div className="form__row">
        <Field label={labels.businessType} name="businessType"
               value={values.businessType} onChange={setValue('businessType')}
               error={errors.businessType} />
        <Field label={labels.companyWebsite} name="companyWebsite"
               value={values.companyWebsite} onChange={setValue('companyWebsite')}
               error={errors.companyWebsite} />
      </div>

      <Field label={labels.annualVolumeEstimate} name="annualVolumeEstimate"
             value={values.annualVolumeEstimate} onChange={setValue('annualVolumeEstimate')}
             error={errors.annualVolumeEstimate} />

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
