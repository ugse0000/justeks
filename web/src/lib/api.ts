/**
 * Talking to the enquiry API.
 *
 * The base URL comes from the build, so the same bundle can point at a local
 * backend in development and the real one in production. When it is not set —
 * the current static deployment — `apiConfigured` is false and forms fall back
 * to email rather than posting into the void.
 */
const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export const apiConfigured = BASE.length > 0

/** Field name to message, as the API returns validation failures. */
export type FieldErrors = Record<string, string>

export class ApiError extends Error {
  // Declared as fields rather than constructor parameter properties: the
  // project builds with erasableSyntaxOnly, which forbids the shorthand.
  readonly status: number
  readonly fieldErrors: FieldErrors

  constructor(status: number, fieldErrors: FieldErrors = {}, message = 'Request failed') {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

/** Thrown when the API is unreachable, so a caller can offer email instead. */
export class ApiUnavailableError extends Error {
  constructor() {
    super('The enquiry service is unreachable')
    this.name = 'ApiUnavailableError'
  }
}

async function parse(response: Response): Promise<{ referenceNo?: string }> {
  if (response.ok) {
    return response.json().catch(() => ({}))
  }

  // 429 carries no field errors; it is about the caller, not the form.
  if (response.status === 429) {
    throw new ApiError(429, { form: 'Too many submissions. Please try again later.' })
  }

  const body = await response.json().catch(() => ({}))
  throw new ApiError(response.status, (body as { errors?: FieldErrors }).errors ?? {})
}

async function send(path: string, init: RequestInit): Promise<{ referenceNo?: string }> {
  if (!apiConfigured) {
    throw new ApiUnavailableError()
  }
  let response: Response
  try {
    response = await fetch(`${BASE}${path}`, init)
  } catch {
    // Network-level failure: offline, DNS, CORS. Nothing the form can fix.
    throw new ApiUnavailableError()
  }
  return parse(response)
}

export function postJson(path: string, body: unknown) {
  return send(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

/** Multipart submission, for the one form that takes attachments. */
export function postForm(path: string, fields: Record<string, string>, files: File[]) {
  const data = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value) data.append(key, value)
  }
  for (const file of files) {
    data.append('files', file)
  }
  // No Content-Type header: the browser sets it with the multipart boundary.
  return send(path, { method: 'POST', body: data })
}
