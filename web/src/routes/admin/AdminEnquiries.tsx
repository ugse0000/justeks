import { useCallback, useEffect, useState } from 'react'
import type { Locale } from '../../content/schema'
import { Seo } from '../../lib/seo'
import { Section, Container, Button } from '../../components/primitives'
import { useAdminApi } from './useAdminApi'
import './admin.css'

interface Row {
  referenceNo: string
  type: string
  status: string
  companyName: string | null
  contactName: string
  email: string
  country: string
  createdAt: string
}

const STATUSES = ['NEW', 'UNDER_REVIEW', 'QUOTED', 'NEGOTIATION', 'CONFIRMED', 'CLOSED']

/**
 * The enquiry list.
 *
 * Deliberately plain: this is an internal tool, and the time is better spent on
 * the site the customers see. It is noindex and excluded from the sitemap and
 * the prerender, so it never enters search results.
 */
export function AdminEnquiries({ locale }: { locale: Locale }) {
  const api = useAdminApi()
  // null means "not loaded yet", which is also what shows the loading line.
  // A separate `busy` flag would have to be set synchronously at the top of
  // the effect, and starting a second render from inside one is what the
  // set-state-in-effect rule is warning about.
  const [rows, setRows] = useState<Row[] | null>(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const query = status ? `?status=${status}` : ''
      const page = await api.request(`/api/v1/admin/enquiries${query}`)
      setRows(page?.content ?? [])
      setError(null)
    } catch (e) {
      setRows([])
      setError(e instanceof Error ? e.message : 'Request failed')
    }
  }, [api, status])

  useEffect(() => {
    // Fetching on sign-in is exactly what an effect is for: synchronising with
    // an external system. The rule flags load() because it can see setState
    // inside it, but every one of those runs after an await, so nothing sets
    // state synchronously during this render.
    // eslint-disable-next-line react/set-state-in-effect
    if (api.signedIn) load()
  }, [api.signedIn, load])

  function reload() {
    setRows(null)
    load()
  }

  async function advance(reference: string, next: string) {
    try {
      await api.request(`/api/v1/admin/enquiries/${reference}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      reload()
    } catch {
      setError(`Could not move ${reference} to ${next}`)
    }
  }

  return (
    <>
      <Seo path="/admin/enquiries" locale={locale} noIndex
           meta={{ title: 'Enquiries', description: 'Internal enquiry list.' }} />

      <Section tone="light">
        <Container>
          <h1 className="t-h1">Enquiries</h1>

          {!api.apiConfigured && (
            <p className="t-body admin__note">
              VITE_API_BASE_URL is not set, so this build has no API to talk to.
            </p>
          )}

          {!api.signedIn ? (
            <SignIn onSubmit={api.signIn} />
          ) : (
            <>
              <div className="admin__toolbar">
                <label className="t-small" htmlFor="status-filter">Status</label>
                <select id="status-filter" className="admin__select"
                        value={status}
                        onChange={(e) => { setRows(null); setStatus(e.target.value) }}>
                  <option value="">All</option>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <Button variant="outline" onClick={api.signOut}>Sign out</Button>
              </div>

              {error && <p className="admin__error t-body" role="alert">{error}</p>}
              {rows === null && <p className="t-small">Loading…</p>}

              <table className="admin__table">
                <caption className="t-small">Newest first</caption>
                <thead>
                  <tr>
                    <th scope="col">Reference</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">From</th>
                    <th scope="col">Country</th>
                    <th scope="col">Received</th>
                    <th scope="col">Move to</th>
                  </tr>
                </thead>
                <tbody>
                  {(rows ?? []).map((row) => (
                    <tr key={row.referenceNo}>
                      <td className="t-mono">{row.referenceNo}</td>
                      <td>{row.type}</td>
                      <td>{row.status}</td>
                      <td>{row.companyName ?? row.contactName}<br />
                        <a href={`mailto:${row.email}`}>{row.email}</a></td>
                      <td>{row.country}</td>
                      <td className="t-mono">{row.createdAt?.slice(0, 10)}</td>
                      <td>
                        <select className="admin__select" value=""
                                aria-label={`Change status of ${row.referenceNo}`}
                                onChange={(e) => e.target.value && advance(row.referenceNo, e.target.value)}>
                          <option value="">…</option>
                          {STATUSES.filter((s) => s !== row.status)
                            .map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {rows?.length === 0 && (
                    <tr><td colSpan={7}>No enquiries.</td></tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </Container>
      </Section>
    </>
  )
}

function SignIn({ onSubmit }: { onSubmit: (user: string, password: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className="admin__signin" onSubmit={(e) => { e.preventDefault(); onSubmit(username, password) }}>
      <div className="field">
        <label className="field__label t-small" htmlFor="admin-user">Username</label>
        <input className="field__input" id="admin-user" autoComplete="username"
               value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="field">
        <label className="field__label t-small" htmlFor="admin-password">Password</label>
        <input className="field__input" id="admin-password" type="password"
               autoComplete="current-password"
               value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form__actions">
        <Button type="submit">Sign in</Button>
      </div>
    </form>
  )
}
