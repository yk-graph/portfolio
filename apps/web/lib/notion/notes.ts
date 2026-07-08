import {
  APIResponseError,
  BlockObjectResponse,
  PageObjectResponse,
  QueryDataSourceResponse,
  isFullBlock,
  isFullPage,
  isNotionClientError,
} from '@notionhq/client'

import { persistImage } from '../r2'
import { getNotesDataSourceId, getNotionClient } from './client'
import { mapPageToNote } from './notes-mapper'
import type { Note } from './types'

export type NoteBlock = BlockObjectResponse & { children?: NoteBlock[] }
export type NoteDetail = Note & { blocks: NoteBlock[] }

export async function getNotes(lang: string): Promise<Note[]> {
  try {
    const response: QueryDataSourceResponse = await getNotionClient().dataSources.query({
      data_source_id: getNotesDataSourceId(),
      sorts: [{ property: 'Updated Time', direction: 'descending' }],
    })

    const pages: PageObjectResponse[] = response.results.filter(isFullPage)
    return await Promise.all(
      pages.map(async (page) => {
        const note = mapPageToNote(page, lang)

        if (!note.thumbnail) return note

        return {
          ...note,
          thumbnail: await persistImage(note.thumbnail, 'notes', note.id, page.last_edited_time),
        }
      })
    )
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

// POST https://api.notion.com/v1/data_sources/{data_source_id}/query
// Return: Array of page IDs
export async function getNoteIds(): Promise<string[]> {
  const response = await getNotionClient().dataSources.query({
    data_source_id: getNotesDataSourceId(),
  })
  return response.results.filter(isFullPage).map((page) => page.id)
}

// GET https://api.notion.com/v1/blocks/{block_id}/children
// 1. Get Top Level Blocks | Toggle Block with Heading 1 matching the language code | blockId = pageId
// 2. Get Children of the Toggle Block | blockId = blockId
async function listChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const out: BlockObjectResponse[] = []
  let cursor: string | undefined

  do {
    const res = await getNotionClient().blocks.children.list({ block_id: blockId, start_cursor: cursor })
    out.push(...res.results.filter(isFullBlock))
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)

  return out
}

async function fetchTree(blockId: string): Promise<NoteBlock[]> {
  const blocks = await listChildren(blockId)
  return Promise.all(
    blocks.map(async (block): Promise<NoteBlock> => {
      if (!block.has_children) return block
      return { ...block, children: await fetchTree(block.id) }
    })
  )
}

async function fetchLocaleBody(pageId: string, lang: string): Promise<NoteBlock[]> {
  const top = await listChildren(pageId)
  const marker = lang.toUpperCase()
  const toggle = top.find(
    (block) =>
      block.type === 'heading_1' &&
      block.heading_1.rich_text
        .map((t) => t.plain_text)
        .join('')
        .trim() === marker
  )
  if (!toggle) return []
  return fetchTree(toggle.id)
}

// GET https://api.notion.com/v1/pages/{page_id}
export async function getNote(id: string, lang: string): Promise<NoteDetail | null> {
  try {
    const page = await getNotionClient().pages.retrieve({ page_id: id })
    if (!isFullPage(page)) return null

    const note = mapPageToNote(page, lang)
    const thumbnail = note.thumbnail
      ? await persistImage(note.thumbnail, 'notes', note.id, page.last_edited_time)
      : note.thumbnail
    const blocks = await fetchLocaleBody(id, lang)

    return { ...note, thumbnail, blocks }
  } catch (error: unknown) {
    if (error instanceof APIResponseError) {
      console.error('getNote: Notion API error', { status: error.status, code: error.code })
    } else if (isNotionClientError(error)) {
      console.error('getNote: Notion client error', { code: error.code })
    } else {
      console.error('getNote: unexpected error', { error })
    }
    return null
  }
}
