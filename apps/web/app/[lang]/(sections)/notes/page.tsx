import { notFound } from 'next/navigation'

import { NotesSection } from '@/components/section'
import { hasLocale } from '@/lib/i18n'

export default async function NotesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return <NotesSection lang={lang} />
}
