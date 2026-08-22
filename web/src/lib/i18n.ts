import type { Locale } from '../content/schema'

export const LOCALES: readonly Locale[] = ['en', 'tr'] as const
export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_PREFIX = '/tr'

/** Human labels for the language switch. */
export const LOCALE_LABELS: Record<Locale, string> = { en: 'EN', tr: 'TR' }

/** BCP-47 tags for <html lang> and og:locale. */
export const LOCALE_TAGS: Record<Locale, string> = { en: 'en-GB', tr: 'tr-TR' }

/**
 * Map a canonical (English-rooted) path onto a locale.
 * English lives at the root, Turkish under /tr. Slugs are identical in both.
 */
export function toLocalePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? LOCALE_PREFIX : `${LOCALE_PREFIX}${path}`
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === LOCALE_PREFIX || pathname.startsWith(`${LOCALE_PREFIX}/`)
    ? 'tr'
    : 'en'
}

/** Strip the locale prefix, returning the canonical path. */
export function stripLocale(pathname: string): string {
  if (pathname === LOCALE_PREFIX) return '/'
  if (pathname.startsWith(`${LOCALE_PREFIX}/`)) {
    return pathname.slice(LOCALE_PREFIX.length)
  }
  return pathname
}

/** The other locale — used by the language switch. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'tr' : 'en'
}
