import {
  APIResponseError,
  PageObjectResponse,
  QueryDataSourceResponse,
  isFullPage,
  isNotionClientError,
} from '@notionhq/client'

import { getNotesDataSourceId, getNotionClient } from './client'
import { mapPageToNote } from './notes-mapper'
import type { Note } from './types'

export async function getNotes(lang: string): Promise<Note[]> {
  try {
    const response: QueryDataSourceResponse = await getNotionClient().dataSources.query({
      data_source_id: getNotesDataSourceId(),
      sorts: [{ property: 'Updated Time', direction: 'descending' }],
    })

    const pages: PageObjectResponse[] = response.results.filter(isFullPage)
    return pages.map((page) => mapPageToNote(page, lang))
  } catch (error: unknown) {
    if (error instanceof APIResponseError) {
      console.error('getNotes: Notion API error', { status: error.status, code: error.code })
    } else if (isNotionClientError(error)) {
      console.error('getNotes: Notion client error', { code: error.code })
    } else {
      console.error('getNotes: unexpected error', { error })
    }

    throw new Error('Failed to fetch notes from Notion', { cause: error })
  }
}
