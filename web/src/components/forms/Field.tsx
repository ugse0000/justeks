import { useId } from 'react'

type Common = {
  label: string
  name: string
  error?: string
  required?: boolean
  hint?: string
}

/**
 * One labelled control with its error message.
 *
 * The message is tied to the input through aria-describedby and the input is
 * marked aria-invalid, so a screen reader announces the problem when focus
 * lands on the field rather than only in a summary the user has moved past.
 */
export function Field({
  label, name, error, required, hint, type = 'text', rows, options, value, onChange,
}: Common & {
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select'
  rows?: number
  options?: { value: string; label: string; description?: string }[]
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean).join(' ') || undefined

  const shared = {
    id,
    name,
    value,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    onChange: (e: { target: { value: string } }) => onChange(e.target.value),
  }

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label className="field__label t-small" htmlFor={id}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>

      {type === 'textarea' && <textarea className="field__input" rows={rows ?? 5} {...shared} />}

      {type === 'select' && (
        <select className="field__input" {...shared}>
          {options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}

      {type !== 'textarea' && type !== 'select' && (
        <input className="field__input" type={type} {...shared} />
      )}

      {hint && <p className="field__hint t-small" id={hintId}>{hint}</p>}
      {error && <p className="field__error t-small" id={errorId}>{error}</p>}
    </div>
  )
}

/** File input, kept separate because its value is not a string. */
export function FileField({
  label, name, error, hint, onChange,
}: Common & { onChange: (files: File[]) => void }) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label className="field__label t-small" htmlFor={id}>{label}</label>
      <input
        className="field__input field__input--file"
        id={id}
        name={name}
        type="file"
        multiple
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined}
        onChange={(e) => onChange([...(e.target.files ?? [])])}
      />
      {hint && <p className="field__hint t-small" id={hintId}>{hint}</p>}
      {error && <p className="field__error t-small" id={errorId}>{error}</p>}
    </div>
  )
}

/**
 * The honeypot.
 *
 * Off-screen rather than display:none — some bots skip hidden inputs but fill
 * anything positioned. It is aria-hidden and not focusable, so nobody using
 * the form by keyboard or screen reader will ever reach it.
 */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="field__honeypot" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
