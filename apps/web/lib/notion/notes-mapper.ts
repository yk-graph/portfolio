import { PageObjectResponse } from '@notionhq/client'

import type { Note } from './types'

const PROP = {
  titleEn: 'Title EN',
  titleJa: 'Title JA',
  thumbnail: 'Thumbnail',
  createdAt: 'Created Time',
  updatedAt: 'Updated Time',
} as const

type Prop = PageObjectResponse['properties'][string]

function getTitle(prop?: Prop): string {
  return prop?.type === 'title' ? prop.title.map((t) => t.plain_text).join('') : ''
}
function getText(prop?: Prop): string {
  return prop?.type === 'rich_text' ? prop.rich_text.map((t) => t.plain_text).join('') : ''
}
function getFileUrl(prop?: Prop): string {
  if (prop?.type !== 'files') return ''
  const file = prop.files[0]
  if (!file) return ''
  return file.type === 'external' ? file.external.url : file.file.url
}
function getCreatedTime(prop?: Prop): string {
  return prop?.type === 'created_time' ? prop.created_time : ''
}
function getLastEditedTime(prop?: Prop): string {
  return prop?.type === 'last_edited_time' ? prop.last_edited_time : ''
}

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
