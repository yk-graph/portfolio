import { notFound } from 'next/navigation'

import { ContactSection } from '@/components/section'
import { hasLocale } from '@/lib/i18n'

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return <ContactSection />
}
