import { QueryDataSourceResponse, isFullPage, isNotionClientError, APIResponseError } from '@notionhq/client'

import { DATA_SOURCE_ID, notion } from './client'
import { mapPageToWork } from './mapper'
import type { Work } from './types'

export async function getWorks(): Promise<Work[]> {
  try {
    const response: QueryDataSourceResponse = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,
      sorts: [{ property: 'Updated Time', direction: 'descending' }],
    })

    const workPages = response.results.filter(isFullPage)
    return workPages.map((page) => mapPageToWork(page))
  } catch (error) {
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
