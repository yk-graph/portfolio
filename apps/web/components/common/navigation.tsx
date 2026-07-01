import Link from 'next/link'

import { Icon, type IconName } from './icons'
import { navLinks } from './nav-links'

const snsLinks = [
  { label: 'Calendar', href: 'https://example.com/calendar', icon: 'calendar' },
  { label: 'GitHub', href: 'https://example.com/github', icon: 'github' },
  { label: 'LinkedIn', href: 'https://example.com/linkedin', icon: 'linkedin' },
] as const satisfies ReadonlyArray<{ label: string; href: string; icon: IconName }>

export function Navigation() {
  return (
    <nav aria-label="Primary" className="flex flex-col items-center gap-6">
      <ul className="flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="font-heading text-sm font-bold tracking-widest text-foreground transition-opacity hover:opacity-60"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-6">
        {snsLinks.map(({ label, href, icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-400"
            >
              <Icon name={icon} size={20} />
            </a>
          </li>
        ))}
      </ul>

      <span aria-hidden="true" className="block h-16 w-px bg-neutral-400/40" />
    </nav>
  )
}
