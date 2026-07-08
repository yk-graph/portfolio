import { PageObjectResponse } from '@notionhq/client'

export type Prop = PageObjectResponse['properties'][string]

export function getTitle(prop?: Prop): string {
  return prop?.type === 'title' ? prop.title.map((t) => t.plain_text).join('') : ''
}

export function getText(prop?: Prop): string {
  return prop?.type === 'rich_text' ? prop.rich_text.map((t) => t.plain_text).join('') : ''
}

export function getMultiSelect(prop?: Prop): string[] {
  return prop?.type === 'multi_select' ? prop.multi_select.map((s) => s.name) : []
}

export function getUrl(prop?: Prop): string | undefined {
  return prop?.type === 'url' ? (prop.url ?? undefined) : undefined
}

export function getDate(prop?: Prop): string {
  return prop?.type === 'date' ? (prop.date?.start ?? '') : ''
}

export function getFileUrl(prop?: Prop): string {
  if (prop?.type !== 'files') return ''
  const file = prop.files[0]
  if (!file) return ''
  return file.type === 'external' ? file.external.url : file.file.url
}

export function getCreatedTime(prop?: Prop): string {
  return prop?.type === 'created_time' ? prop.created_time : ''
}

export function getLastEditedTime(prop?: Prop): string {
  return prop?.type === 'last_edited_time' ? prop.last_edited_time : ''
}
