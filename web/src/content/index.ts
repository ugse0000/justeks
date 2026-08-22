import type { Locale, SiteContent } from './schema'

import { nav as navEn } from './en/nav'
import { nav as navTr } from './tr/nav'

import { footer as footerEn } from './en/footer'
import { footer as footerTr } from './tr/footer'

import { fabrics as fabricsEn } from './en/fabrics'
import { fabrics as fabricsTr } from './tr/fabrics'

import { collections as collectionsEn } from './en/collections'
import { collections as collectionsTr } from './tr/collections'

import { industries as industriesEn } from './en/industries'
import { industries as industriesTr } from './tr/industries'

import { globalSupply as globalSupplyEn } from './en/global-supply'
import { globalSupply as globalSupplyTr } from './tr/global-supply'

import { home as homeEn } from './en/home'
import { home as homeTr } from './tr/home'

const CONTENT: Record<Locale, SiteContent> = {
  en: { nav: navEn, footer: footerEn, fabricCategories: fabricsEn, collections: collectionsEn, industries: industriesEn, globalSupply: globalSupplyEn, home: homeEn },
  tr: { nav: navTr, footer: footerTr, fabricCategories: fabricsTr, collections: collectionsTr, industries: industriesTr, globalSupply: globalSupplyTr, home: homeTr },
}

/** All copy for a locale. Components read from here; they never hold strings. */
export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale]
}
