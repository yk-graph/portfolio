import type { Metadata } from 'next'
import { Outfit, Fraunces } from 'next/font/google'
import { notFound } from 'next/navigation'

import { ThemeProvider, SplashProvider } from '@/components/provider'
import { locales, hasLocale } from '@/lib'
import '../globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'Engineer portfolio — selected work, writing, and background.',
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <html lang={lang} suppressHydrationWarning className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SplashProvider>{children}</SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
