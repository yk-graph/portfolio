import 'server-only'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

export interface CareerItem {
  id: string
  period: string
  title: string
  summary: string
}

function parseHeading(line: string): { period: string; title: string } {
  const text = line.replace(/^#+\s*/, '').trim()
  const index = text.indexOf('·')
  if (index === -1) return { period: '', title: text }
  return { period: text.slice(0, index).trim(), title: text.slice(index + 1).trim() }
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
