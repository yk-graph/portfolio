'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { navLinks } from './nav-links'

export function BackNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = pathname.split('/')[1]

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(`/${locale}`)
    }
  }

  return (
    <nav aria-label="Sub-page" className="flex items-center justify-between gap-8">
      <button
        type="button"
        onClick={handleBack}
        className="cursor-pointer font-heading text-sm font-bold tracking-widest text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-400"
      >
        ← BACK
      </button>

      <ul className="flex items-center gap-8">
        {navLinks.map(({ label, href }) => {
          const localizedHref = `/${locale}${href}`
          const isActive = pathname === localizedHref || pathname.startsWith(`${localizedHref}/`)
          return (
            <li key={label}>
              <Link
                href={localizedHref}
                aria-current={isActive ? 'page' : undefined}
                className={`font-heading text-sm font-bold tracking-widest transition-opacity hover:opacity-60 ${
                  isActive ? 'text-foreground underline underline-offset-8' : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
