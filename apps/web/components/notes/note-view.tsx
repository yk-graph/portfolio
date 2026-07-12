import Image from 'next/image'

import { sections } from '@/constants'
import type { NoteDetail } from '@/lib/notion'

import { NoteBody } from './note-body'
import { NoteDrawer } from './note-drawer'

const NOTES_GRADIENT = sections.find((section) => section.id === 'notes')?.gradient

export function NoteView({ note, closeHref }: { note: NoteDetail; closeHref?: string }) {
  const standalone = Boolean(closeHref)

  return (
    <div className="fixed inset-0 overflow-hidden text-white">
      {standalone && (
        <div
          aria-hidden
          className="animate-bg-drift absolute inset-0 -z-10 bg-size-[600%_600%]"
          style={{ backgroundImage: NOTES_GRADIENT }}
        />
      )}

      <NoteDrawer closeHref={closeHref}>
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16 sm:py-20">
          <header className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-4xl font-black leading-[1.05] sm:text-6xl">{note.title}</h1>
            <time className="text-sm font-semibold tracking-widest text-white/60">{note.updatedAt.slice(0, 10)}</time>
          </header>

          {note.thumbnail && (
            <Image
              src={note.thumbnail}
              alt=""
              width={1200}
              height={720}
              priority
              className="w-full rounded-3xl object-cover"
            />
          )}

          <NoteBody blocks={note.blocks} />
        </article>
      </NoteDrawer>
    </div>
  )
}
