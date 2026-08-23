import { useState } from 'react'
import { ApiError, ApiUnavailableError, type FieldErrors } from '../../lib/api'

export type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'unavailable'

/**
 * Shared submit lifecycle for the four enquiry forms.
 *
 * Keeps the field values, the per-field errors the API returned, and which of
 * the five states the form is in. `unavailable` is separate from `error`: the
 * form was fine, there is nowhere to send it, and the page offers email
 * instead of asking the user to correct something.
 */
export function useEnquiryForm<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState<T>(initial)
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>('idle')
  const [reference, setReference] = useState<string | null>(null)

  const setValue = (name: keyof T) => (value: string) =>
    setValues((current) => ({ ...current, [name]: value }))

  async function submit(send: (values: T, files: File[]) => Promise<{ referenceNo?: string }>) {
    setState('submitting')
    setErrors({})
    try {
      const result = await send(values, files)
      setReference(result.referenceNo ?? null)
      setState('success')
    } catch (e) {
      if (e instanceof ApiUnavailableError) {
        setState('unavailable')
      } else if (e instanceof ApiError) {
        setErrors(e.fieldErrors)
        setState('error')
      } else {
        setState('unavailable')
      }
    }
  }

  return { values, setValue, files, setFiles, errors, state, reference, submit }
}
