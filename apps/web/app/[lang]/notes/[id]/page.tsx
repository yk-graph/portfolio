import { notFound } from 'next/navigation'

import { NoteView } from '@/components/notes'
import { NotesSection, SectionSync } from '@/components/section'
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
      <SectionSync id="notes" />
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden text-white">
        <NotesSection lang={lang} />
      </div>
      <NoteView note={note} closeHref={`/${lang}`} />
    </>
  )
}
