'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { navLinks } from './nav-links'

export function BackNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  // Prefer real browser-back, but fall back to the top page when this is a fresh entry (direct link / new tab) with no in-app history to return to.
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <nav aria-label="Sub-page" className="flex items-center justify-between gap-8">
      <button
        type="button"
        onClick={handleBack}
        className="cursor-pointer font-heading text-sm font-bold tracking-widest text-text-muted transition-colors hover:text-text-primary"
      >
        ← BACK
      </button>

      <ul className="flex items-center gap-8">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`font-heading text-sm font-bold tracking-widest transition-opacity hover:opacity-60 ${
                  isActive ? 'text-text-primary underline underline-offset-8' : 'text-text-muted'
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
