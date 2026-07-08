import { getNotes, type Note } from '@/lib/notion'

import { NotesError } from './error'
import { NotesList } from './list'

export async function NotesData({ lang }: { lang: string }) {
  let notes: Note[]

  try {
    notes = await getNotes(lang)
  } catch {
    return <NotesError />
  }

  return <NotesList notes={notes} lang={lang} />
}
