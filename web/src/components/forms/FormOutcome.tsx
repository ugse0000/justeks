import type { FormContent } from '../../content/schema'
import type { FormState } from './useEnquiryForm'

/**
 * What the form says after a submit.
 *
 * The region is aria-live so the outcome is announced without moving focus,
 * which would otherwise throw a keyboard user back to the top of the page.
 */
export function FormOutcome({
  content, state, reference, mailto, formError,
}: {
  content: FormContent
  state: FormState
  reference: string | null
  mailto: string
  formError?: string
}) {
  return (
    <div className="form__outcome" role="status" aria-live="polite">
      {state === 'success' && (
        <div className="form__success" data-testid="form-success">
          <p className="t-h3">{content.successHeading}</p>
          <p className="t-body">
            {content.successBody}{' '}
            {reference && <strong className="t-mono">{reference}</strong>}
          </p>
        </div>
      )}

      {state === 'error' && (
        <div className="form__error-summary" data-testid="form-error">
          <p className="t-h3">{content.errorHeading}</p>
          <p className="t-body">{formError ?? content.errorBody}</p>
        </div>
      )}

      {state === 'unavailable' && (
        <div className="form__error-summary" data-testid="form-unavailable">
          <p className="t-h3">{content.errorHeading}</p>
          {/* Nothing the sender can fix, so give them the way through. */}
          <p className="t-body">
            <a href={mailto}>{content.fallbackLinkLabel}</a>
          </p>
        </div>
      )}
    </div>
  )
}
