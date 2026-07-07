import { notFound } from 'next/navigation'

import { SectionPager, HomeSection, WorksSection, NotesSection, ContactSection } from '@/components'
import { hasLocale } from '@/lib'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <SectionPager
      content={{
        home: <HomeSection dict={dict.home} />,
        works: <WorksSection />,
        notes: <NotesSection />,
        contact: <ContactSection />,
      }}
    />
  )
}
