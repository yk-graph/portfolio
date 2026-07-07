import { notFound } from 'next/navigation'

import { HtmlLangSync } from '@/components/common'
import { locales, hasLocale } from '@/lib'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <HtmlLangSync lang={lang} />
      {children}
    </>
  )
}
