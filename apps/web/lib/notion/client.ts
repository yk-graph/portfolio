import { Client } from '@notionhq/client'

let client: Client | undefined

export function getNotionClient(): Client {
  if (!client) {
    const token = process.env.NOTION_TOKEN
    if (!token) throw new Error('NOTION_TOKEN is not set.')
    client = new Client({ auth: token, notionVersion: '2026-03-11' })
  }
  return client
}

export function getDataSourceId(): string {
  const id = process.env.NOTION_DATA_SOURCE_ID
  if (!id) throw new Error('NOTION_DATA_SOURCE_ID is not set.')
  return id
}
