import { useCallback, useState } from 'react'

const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

const STORAGE_KEY = 'justeks.admin.credentials'

/**
 * Admin API access with HTTP Basic.
 *
 * The encoded credentials live in sessionStorage, not localStorage: closing
 * the tab ends the session, which is the right default for a screen that lists
 * every customer enquiry. They are never put in a URL, where they would end up
 * in browser history and server logs.
 */
export function useAdminApi() {
  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem(STORAGE_KEY))

  const signIn = useCallback((username: string, password: string) => {
    const encoded = btoa(`${username}:${password}`)
    sessionStorage.setItem(STORAGE_KEY, encoded)
    setToken(encoded)
  }, [])

  const signOut = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    setToken(null)
  }, [])

  const request = useCallback(async (path: string, init: RequestInit = {}) => {
    if (!token) throw new Error('Not signed in')

    const response = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Basic ${token}`,
      },
    })

    if (response.status === 401) {
      // Stale or wrong credentials: drop them so the form comes back rather
      // than the screen silently failing every request.
      signOut()
      throw new Error('Sign-in failed')
    }
    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`)
    }
    return response.status === 204 ? null : response.json()
  }, [token, signOut])

  return { signedIn: token !== null, signIn, signOut, request, apiConfigured: BASE.length > 0 }
}
