import type { Locale, SiteContent } from './schema'

import { nav as navEn } from './en/nav'
import { nav as navTr } from './tr/nav'

import { footer as footerEn } from './en/footer'
import { footer as footerTr } from './tr/footer'

const CONTENT: Record<Locale, SiteContent> = {
  en: { nav: navEn, footer: footerEn },
  tr: { nav: navTr, footer: footerTr },
}

/** All copy for a locale. Components read from here; they never hold strings. */
export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale]
}
