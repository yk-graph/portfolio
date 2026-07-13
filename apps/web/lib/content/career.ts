import 'server-only'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

export type CareerType = 'work' | 'study'

export interface CareerItem {
  id: string
  type: CareerType
  period: string
  title: string
  summary: string
}

function parseHeading(line: string): { type: CareerType; period: string; title: string } {
  let text = line.replace(/^#+\s*/, '').trim()

  let type: CareerType = 'work'
  const tag = text.match(/^\[(study|work)\]\s*/i)
  if (tag) {
    type = tag[1].toLowerCase() as CareerType
    text = text.slice(tag[0].length)
  }

  const index = text.indexOf('·')
  if (index === -1) return { type, period: '', title: text }
  return { type, period: text.slice(0, index).trim(), title: text.slice(index + 1).trim() }
}

export async function getCareer(lang: string): Promise<CareerItem[]> {
  try {
    const file = path.join(process.cwd(), 'content', 'about', `career.${lang}.md`)
    const markdown = await readFile(file, 'utf8')

    const items: CareerItem[] = []
    let item: CareerItem | null = null
    let inSummary = false

    for (const raw of markdown.split('\n')) {
      const line = raw.trim()
      if (line.startsWith('## ')) {
        item = { id: `career-${items.length}`, ...parseHeading(line), summary: '' }
        items.push(item)
        inSummary = false
      } else if (line.startsWith('### ')) {
        inSummary = true
      } else if (line.startsWith('#### ') || line.startsWith('##### ')) {
        inSummary = false
      } else if (line && item && inSummary) {
        item.summary = item.summary ? `${item.summary} ${line}` : line
      }
    }

    return items
  } catch {
    return []
  }
}
