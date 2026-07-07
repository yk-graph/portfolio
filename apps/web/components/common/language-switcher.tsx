'use client'

import { usePathname, useRouter } from 'next/navigation'

import { locales, type Locale } from '@/lib/i18n/config'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const ONE_YEAR = 60 * 60 * 24 * 365

function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${ONE_YEAR}`
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const current = pathname.split('/')[1]

  function switchTo(locale: Locale) {
    if (locale === current) return
    persistLocale(locale)
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/') || `/${locale}`)
  }

  return (
    <div role="group" aria-label="Language" className="flex items-center gap-2 text-xs font-bold tracking-widest">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-current={locale === current ? 'true' : undefined}
          className={
            locale === current
              ? 'text-foreground'
              : 'text-foreground/40 transition-colors hover:text-foreground/70'
          }
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
