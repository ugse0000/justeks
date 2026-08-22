import type { Locale } from '../../content/schema'
import { getContent } from '../../content'
import { CONTACT, LEGAL_ENTITY, OFFICES } from '../../../site.config'
import './ContactDetails.css'

/**
 * Reachable contact details for the contact page.
 *
 * Addresses come from site.config.ts and the words around them from content,
 * so an office reads the same in both languages and exists in exactly one
 * place. Rendered inside GenericPage's Container, so it adds no wrapper.
 */
export function ContactDetails({ locale }: { locale: Locale }) {
  const c = getContent(locale).contact

  return (
    <>
      <section className="contact__direct" data-testid="contact-direct">
        <dl className="contact__pairs">
          <div className="contact__pair">
            <dt className="t-eyebrow">{c.emailLabel}</dt>
            <dd className="t-h3">
              <a className="contact__link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
          </div>
          <div className="contact__pair">
            <dt className="t-eyebrow">{c.phoneLabel}</dt>
            <dd className="t-h3">
              <a className="contact__link" href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="contact__offices-block" data-testid="contact-offices">
        <h2 className="t-h2 t-measure-head">{c.officesHeading}</h2>

        <ul role="list" className="contact__offices">
          {OFFICES.map((office) => (
            <li key={office.key} className="contact__office">
              <h3 className="t-h3 contact__office-name">{c.officeLabels[office.key]}</h3>

              <address className="t-body contact__address">
                {office.lines.map((line) => <span key={line}>{line}</span>)}
                <span>{office.postalCode} {office.city}</span>
                <span>{office.country}</span>
              </address>

              {office.phone && (
                <a className="contact__link t-body" href={`tel:${office.phoneHref}`}>
                  {office.phone}
                </a>
              )}

              {office.provisional && (
                <p className="t-small contact__provisional">{c.provisionalNote}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="contact__registration" data-testid="contact-registration">
        <h2 className="t-h2 t-measure-head">{c.registration.heading}</h2>
        <dl className="contact__pairs contact__pairs--compact">
          {[
            [c.registration.entityLabel, LEGAL_ENTITY.name],
            [c.registration.taxOfficeLabel, LEGAL_ENTITY.taxOffice],
            [c.registration.taxNumberLabel, LEGAL_ENTITY.taxNumber],
            [c.registration.mersisLabel, LEGAL_ENTITY.mersis],
          ].map(([label, value]) => (
            <div key={label} className="contact__pair">
              <dt className="t-eyebrow">{label}</dt>
              <dd className="t-body contact__value">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
