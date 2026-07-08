import { Fragment, type ReactNode } from 'react'
import type { RichTextItemResponse } from '@notionhq/client'

import type { NoteBlock } from '@/lib/notion'

function RichText({ rich }: { rich: RichTextItemResponse[] }) {
  return rich.map((token, i) => {
    const a = token.annotations
    let node: ReactNode = token.plain_text
    if (a.code) node = <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.9em]">{node}</code>
    if (a.bold) node = <strong className="font-bold">{node}</strong>
    if (a.italic) node = <em>{node}</em>
    if (a.strikethrough) node = <s>{node}</s>
    if (a.underline) node = <u>{node}</u>
    if (token.href) {
      node = (
        <a
          href={token.href}
          className="text-white underline underline-offset-4 hover:opacity-70"
          target="_blank"
          rel="noopener noreferrer"
        >
          {node}
        </a>
      )
    }
    return <Fragment key={i}>{node}</Fragment>
  })
}

function renderBlock(block: NoteBlock): ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-lg leading-relaxed text-white/80">{<RichText rich={block.paragraph.rich_text} />}</p>
    case 'heading_1':
      return (
        <h2 className="mt-8 font-heading text-3xl font-black text-white">{<RichText rich={block.heading_1.rich_text} />}</h2>
      )
    case 'heading_2':
      return (
        <h3 className="mt-6 font-heading text-2xl font-bold text-white">{<RichText rich={block.heading_2.rich_text} />}</h3>
      )
    case 'heading_3':
      return (
        <h4 className="mt-4 font-heading text-xl font-bold text-white/90">{<RichText rich={block.heading_3.rich_text} />}</h4>
      )
    case 'quote':
      return (
        <blockquote className="border-l-2 border-white/30 pl-4 text-lg text-white/60 italic">
          {<RichText rich={block.quote.rich_text} />}
        </blockquote>
      )
    case 'code':
      return (
        <pre className="overflow-x-auto rounded-xl bg-black/30 p-4 text-sm text-white/90">
          <code>{block.code.rich_text.map((t) => t.plain_text).join('')}</code>
        </pre>
      )
    case 'divider':
      return <hr className="border-white/15" />
    default:
      return null
  }
}

export function NoteBody({ blocks }: { blocks: NoteBlock[] }) {
  const out: ReactNode[] = []

  for (let i = 0; i < blocks.length; ) {
    const block = blocks[i]

    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const type = block.type
      const items: NoteBlock[] = []
      while (i < blocks.length && blocks[i].type === type) {
        items.push(blocks[i])
        i++
      }
      const ordered = type === 'numbered_list_item'
      const ListTag = ordered ? 'ol' : 'ul'
      out.push(
        <ListTag
          key={items[0].id}
          className={`flex flex-col gap-2 pl-6 text-lg text-white/80 ${ordered ? 'list-decimal' : 'list-disc'}`}
        >
          {items.map((item) => (
            <li key={item.id} className="leading-relaxed">
              <RichText
                rich={
                  item.type === 'numbered_list_item'
                    ? item.numbered_list_item.rich_text
                    : item.type === 'bulleted_list_item'
                      ? item.bulleted_list_item.rich_text
                      : []
                }
              />
              {item.children && <NoteBody blocks={item.children} />}
            </li>
          ))}
        </ListTag>
      )
      continue
    }

    out.push(<Fragment key={block.id}>{renderBlock(block)}</Fragment>)
    i++
  }

  return <div className="flex flex-col gap-6">{out}</div>
}
