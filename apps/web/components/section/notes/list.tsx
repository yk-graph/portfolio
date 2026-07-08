import Image from 'next/image'
import Link from 'next/link'

import type { Note } from '@/lib/notion'

export function NotesList({ notes, lang }: { notes: Note[]; lang: string }) {
  if (notes.length === 0) {
    return <p className="text-white/60">No notes yet.</p>
  }

  return (
    <ul className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
      {notes.map((note) => (
        <li key={note.id}>
          <Link
            href={`/${lang}/notes/${note.id}`}
            className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:px-6"
          >
            <div className="min-w-0 flex-1">
              <time className="text-xs font-semibold tracking-widest text-white/50">{note.updatedAt.slice(0, 10)}</time>
              <h3 className="mt-1 font-heading text-xl font-bold leading-snug">{note.title}</h3>
            </div>

            {note.thumbnail && (
              <Image
                src={note.thumbnail}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
