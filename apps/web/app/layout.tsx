import type { Metadata } from 'next'
import { Outfit, Fraunces } from 'next/font/google'

import { ThemeProvider } from './components/provider/theme-provider'
import { SplashProvider } from './components/provider/splash-provider'
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
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SplashProvider>
            <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</div>
          </SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
