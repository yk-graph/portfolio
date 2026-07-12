import { notFound } from 'next/navigation'

import { HomeSection } from '@/components/section'
import { hasLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return <HomeSection dict={dict.home} lang={lang} />
}
