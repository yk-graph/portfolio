import { PageObjectResponse } from '@notionhq/client'

import type { Work } from './types'

const PROP = {
  titleEn: 'Title EN',
  summaryEn: 'Summary EN',
  descriptionEn: 'Description EN',
  tags: 'Tags',
  thumbnail: 'Thumbnail',
  liveUrl: 'Live URL',
  repoUrl: 'Repo URL',
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
function getMultiSelect(prop?: Prop): string[] {
  return prop?.type === 'multi_select' ? prop.multi_select.map((s) => s.name) : []
}
function getUrl(prop?: Prop): string | undefined {
  return prop?.type === 'url' ? (prop.url ?? undefined) : undefined
}
function getDate(prop?: Prop): string {
  return prop?.type === 'date' ? (prop.date?.start ?? '') : ''
}
function getFileUrl(prop?: Prop): string {
  if (prop?.type !== 'files') return ''
  const file = prop.files[0]
  if (!file) return ''
  return file.type === 'external' ? file.external.url : file.file.url
}

export function mapPageToWork(page: PageObjectResponse): Work {
  const props = page.properties

  return {
    id: page.id,
    title: getTitle(props[PROP.titleEn]),
    summary: getText(props[PROP.summaryEn]),
    description: getText(props[PROP.descriptionEn]) || undefined,
    tags: getMultiSelect(props[PROP.tags]),
    thumbnail: getFileUrl(props[PROP.thumbnail]),
    liveUrl: getUrl(props[PROP.liveUrl]),
    repoUrl: getUrl(props[PROP.repoUrl]),
    createdAt: getDate(props[PROP.createdAt]),
    updatedAt: getDate(props[PROP.updatedAt]),
  }
}
