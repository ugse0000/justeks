import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { postForm } from '../../lib/api'
import { CONTACT } from '../../../site.config'
import { Button } from '../primitives'
import { Field, FileField, Honeypot } from './Field'
import { FormOutcome } from './FormOutcome'
import { useEnquiryForm } from './useEnquiryForm'
import './forms.css'

/** The sourcing desk form: the one that takes attachments. */
export function SourcingForm({ locale }: { locale: Locale }) {
  const content = getContent(locale).forms.sourcing
  const labels = content.labels

  const form = useEnquiryForm({
    companyName: '', contactName: '', email: '', phone: '', country: '', city: '',
    message: '', fabricType: '', composition: '', gsm: '', width: '', colour: '',
    application: '', requiredQuantity: '', deliveryCountry: '', requiredDate: '',
    website: '',
  })

  const { values, setValue, errors, state } = form

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    form.submit((v, files) =>
      postForm('/api/v1/sourcing-requests', { ...v, locale }, files))
  }

  if (state === 'success') {
    return <FormOutcome content={content} state={state} reference={form.reference}
                        mailto={`mailto:${CONTACT.email}`} />
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate data-testid="sourcing-form">
      <h2 className="t-h2">{content.heading}</h2>
      <p className="t-body t-measure form__lead">{content.lead}</p>

      <div className="form__row">
        <Field label={labels.contactName} name="contactName" required
               value={values.contactName} onChange={setValue('contactName')} error={errors.contactName} />
        <Field label={labels.companyName} name="companyName"
               value={values.companyName} onChange={setValue('companyName')} error={errors.companyName} />
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
        <Field label={labels.deliveryCountry} name="deliveryCountry"
               value={values.deliveryCountry} onChange={setValue('deliveryCountry')}
               error={errors.deliveryCountry} />
      </div>

      <div className="form__row">
        <Field label={labels.fabricType} name="fabricType"
               value={values.fabricType} onChange={setValue('fabricType')} error={errors.fabricType} />
        <Field label={labels.composition} name="composition"
               value={values.composition} onChange={setValue('composition')} error={errors.composition} />
      </div>

      <div className="form__row">
        <Field label={labels.gsm} name="gsm"
               value={values.gsm} onChange={setValue('gsm')} error={errors.gsm} />
        <Field label={labels.width} name="width"
               value={values.width} onChange={setValue('width')} error={errors.width} />
      </div>

      <div className="form__row">
        <Field label={labels.colour} name="colour"
               value={values.colour} onChange={setValue('colour')} error={errors.colour} />
        <Field label={labels.application} name="application"
               value={values.application} onChange={setValue('application')} error={errors.application} />
      </div>

      <div className="form__row">
        <Field label={labels.requiredQuantity} name="requiredQuantity"
               value={values.requiredQuantity} onChange={setValue('requiredQuantity')}
               error={errors.requiredQuantity} />
        <Field label={labels.requiredDate} name="requiredDate" type="date"
               value={values.requiredDate} onChange={setValue('requiredDate')} error={errors.requiredDate} />
      </div>

      <Field label={labels.message} name="message" type="textarea"
             value={values.message} onChange={setValue('message')} error={errors.message} />

      <FileField label={labels.files} name="files" hint={content.fileHint}
                 error={errors.files} onChange={form.setFiles} />

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
