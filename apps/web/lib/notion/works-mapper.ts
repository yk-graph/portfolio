import { PageObjectResponse } from '@notionhq/client'

import { getDate, getFileUrl, getMultiSelect, getText, getTitle, getUrl } from './props'
import type { Work } from './types'

const PROP = {
  titleEn: 'Title EN',
  titleJa: 'Title JA',
  summaryEn: 'Summary EN',
  sammaryJa: 'Summary JA',
  descriptionEn: 'Description EN',
  descriptionJa: 'Description JA',
  tags: 'Tags',
  thumbnail: 'Thumbnail',
  liveUrl: 'Live URL',
  repoUrl: 'Repo URL',
  createdAt: 'Created Time',
  updatedAt: 'Updated Time',
} as const

export function mapPageToWork(page: PageObjectResponse, lang: string): Work {
  const props = page.properties

  return {
    id: page.id,
    title: lang === 'ja' ? getText(props[PROP.titleJa]) : getTitle(props[PROP.titleEn]),
    summary: lang === 'ja' ? getText(props[PROP.sammaryJa]) : getText(props[PROP.summaryEn]),
    description: lang === 'ja' ? getText(props[PROP.descriptionJa]) : getText(props[PROP.descriptionEn]),
    tags: getMultiSelect(props[PROP.tags]),
    thumbnail: getFileUrl(props[PROP.thumbnail]),
    liveUrl: getUrl(props[PROP.liveUrl]),
    repoUrl: getUrl(props[PROP.repoUrl]),
    createdAt: getDate(props[PROP.createdAt]),
    updatedAt: getDate(props[PROP.updatedAt]),
  }
}
