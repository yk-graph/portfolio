'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navLinks } from './nav-links'

interface BackNavigationProps {
  // Where the BACK link points. Defaults to the top page; note-detail pages
  // can override it (e.g. back to the notes list).
  backHref?: string
}

export function BackNavigation({ backHref = '/' }: BackNavigationProps) {
  const pathname = usePathname()

  return (
    <nav aria-label="Sub-page" className="flex items-center justify-between gap-8">
      <Link
        href={backHref}
        className="font-heading text-sm font-bold tracking-widest text-text-muted transition-colors hover:text-text-primary"
      >
        ← BACK
      </Link>

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
