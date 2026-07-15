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

export function getWorksDataSourceId(): string {
  const id = process.env.NOTION_WORKS_DATA_SOURCE_ID
  if (!id) throw new Error('NOTION_WORKS_DATA_SOURCE_ID is not set.')
  return id
}

export function getNotesDataSourceId(): string {
  const id = process.env.NOTION_NOTES_DATA_SOURCE_ID
  if (!id) throw new Error('NOTION_NOTES_DATA_SOURCE_ID is not set.')
  return id
}

export function getNotionWebhookSecret(): string {
  const secret = process.env.NOTION_WEBHOOK_SECRET
  if (!secret) throw new Error('NOTION_WEBHOOK_SECRET is not set.')
  return secret
}
