import { PageObjectResponse } from '@notionhq/client'

import { getCreatedTime, getFileUrl, getLastEditedTime, getText, getTitle } from './props'
import type { Note } from './types'

const PROP = {
  titleEn: 'Title EN',
  titleJa: 'Title JA',
  thumbnail: 'Thumbnail',
  createdAt: 'Created Time',
  updatedAt: 'Updated Time',
} as const

export function mapPageToNote(page: PageObjectResponse, lang: string): Note {
  const props = page.properties

  return {
    id: page.id,
    title: lang === 'ja' ? getText(props[PROP.titleJa]) : getTitle(props[PROP.titleEn]),
    thumbnail: getFileUrl(props[PROP.thumbnail]),
    createdAt: getCreatedTime(props[PROP.createdAt]),
    updatedAt: getLastEditedTime(props[PROP.updatedAt]),
  }
}
