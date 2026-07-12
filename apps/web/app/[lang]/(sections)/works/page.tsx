import { notFound } from 'next/navigation'

import { WorksSection } from '@/components/section'
import { hasLocale } from '@/lib/i18n'

export default async function WorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return <WorksSection />
}
