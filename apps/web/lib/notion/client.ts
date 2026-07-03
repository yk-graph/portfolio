import { Client } from '@notionhq/client'

if (!process.env.NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN is not set.')
}
if (!process.env.NOTION_DATA_SOURCE_ID) {
  throw new Error('NOTION_DATA_SOURCE_ID is not set.')
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2026-03-11',
})

export const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID
