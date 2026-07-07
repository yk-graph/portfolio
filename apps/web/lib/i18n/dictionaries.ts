import 'server-only'

import type { Locale } from './config'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ja: () => import('./dictionaries/ja.json').then((m) => m.default),
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
