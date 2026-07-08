import {
  APIResponseError,
  PageObjectResponse,
  QueryDataSourceResponse,
  isFullPage,
  isNotionClientError,
} from '@notionhq/client'

import { persistImage } from '../r2'
import { getWorksDataSourceId, getNotionClient } from './client'
import { mapPageToWork } from './works-mapper'
import type { Work } from './types'

export async function getWorks(): Promise<Work[]> {
  try {
    const response: QueryDataSourceResponse = await getNotionClient().dataSources.query({
      data_source_id: getWorksDataSourceId(),
      sorts: [{ property: 'Updated Time', direction: 'descending' }],
    })

    const workPages: PageObjectResponse[] = response.results.filter(isFullPage)
    return await Promise.all(
      workPages.map(async (page) => {
        const work = mapPageToWork(page)

        if (!work.thumbnail) return work

        return {
          ...work,
          thumbnail: await persistImage(work.thumbnail, 'works', work.id, page.last_edited_time),
        }
      })
    )
  } catch (error: unknown) {
    if (error instanceof APIResponseError) {
      console.error('getWorks: Notion API error', { status: error.status, code: error.code })
    } else if (isNotionClientError(error)) {
      console.error('getWorks: Notion client error', { code: error.code })
    } else {
      console.error('getWorks: unexpected error', { error })
    }

    throw new Error('Failed to fetch works from Notion', { cause: error })
  }
}
