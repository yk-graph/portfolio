import { PageObjectResponse } from '@notionhq/client'

import { getDate, getFileUrl, getMultiSelect, getText, getTitle, getUrl } from './props'
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
