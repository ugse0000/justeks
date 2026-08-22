import type { ComponentType } from 'react'
import type { Locale } from '../content/schema'

export interface PageProps {
  locale: Locale
}

/**
 * Maps a route key (see content/routes.ts) to its page component.
 *
 * A route only reaches the router — and therefore the prerender step and the
 * sitemap — once it is registered here. Pages are added as they are built, so
 * this map is the honest picture of what actually exists.
 */
export const PAGES: Record<string, ComponentType<PageProps>> = {}

/** Register a page component under a route key. */
export function registerPage(key: string, component: ComponentType<PageProps>): void {
  PAGES[key] = component
}
