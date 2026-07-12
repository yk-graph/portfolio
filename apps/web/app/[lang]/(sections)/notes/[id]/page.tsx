import { notFound } from 'next/navigation'

import { NoteView } from '@/components/notes'
import { NotesSection } from '@/components/section'
import { locales, hasLocale } from '@/lib/i18n'
import { getNote, getNoteIds } from '@/lib/notion'

export async function generateStaticParams() {
  try {
    const ids = await getNoteIds()
    return locales.flatMap((lang) => ids.map((id) => ({ lang, id })))
  } catch {
    return []
  }
}

export default async function NotePage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params
  if (!hasLocale(lang)) notFound()

  const note = await getNote(id, lang)
  if (!note) notFound()

  return (
    <>
      <NotesSection lang={lang} />
      <NoteView note={note} closeHref={`/${lang}/notes`} />
    </>
  )
}
