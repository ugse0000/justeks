import type { Locale, SiteContent } from './schema'

import { nav as navEn } from './en/nav'
import { nav as navTr } from './tr/nav'

import { footer as footerEn } from './en/footer'
import { footer as footerTr } from './tr/footer'

import { fabrics as fabricsEn } from './en/fabrics'
import { fabrics as fabricsTr } from './tr/fabrics'

const CONTENT: Record<Locale, SiteContent> = {
  en: { nav: navEn, footer: footerEn, fabricCategories: fabricsEn },
  tr: { nav: navTr, footer: footerTr, fabricCategories: fabricsTr },
}

/** All copy for a locale. Components read from here; they never hold strings. */
export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale]
}
