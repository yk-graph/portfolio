import type { Metadata } from 'next'
import { Outfit, Fraunces } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import { LanguageSwitcher } from '@/components/common'
import { ThemeProvider, SplashProvider } from '@/components/provider'
import './globals.css'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ViewTransitions>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SplashProvider>{children}</SplashProvider>
            <div data-splash-gate className="fixed right-4 top-4 z-50">
              <LanguageSwitcher />
            </div>
          </ThemeProvider>
        </ViewTransitions>
      </body>
    </html>
  )
}
