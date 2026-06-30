import Image from 'next/image'
import type { Metadata } from 'next'

import { BackNavigation } from '../components/back-navigation'
import { Icon, type IconName } from '../components/icons'

export const metadata: Metadata = {
  title: 'About',
}

const snsLinks = [
  { label: 'Calendar', href: 'https://example.com/calendar', icon: 'calendar' },
  { label: 'GitHub', href: 'https://example.com/github', icon: 'github' },
  { label: 'LinkedIn', href: 'https://example.com/linkedin', icon: 'linkedin' },
] as const satisfies ReadonlyArray<{ label: string; href: string; icon: IconName }>

export default function AboutPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-10">
      <BackNavigation />

      <section className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <Image
          src="/placeholder.svg"
          alt="Illustration of Tatsuya"
          width={240}
          height={240}
          className="h-40 w-40 rounded-full object-cover"
          priority
        />

        <h1 className="font-heading text-4xl font-black leading-tight sm:text-5xl">Hello, I&apos;m Tatsuya</h1>

        <p className="max-w-xl text-base leading-relaxed text-text-muted">
          A software developer focused on front-end architecture and clean, accessible UI.
        </p>

        <ul className="flex items-center gap-6">
          {snsLinks.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex text-text-muted transition-colors hover:text-text-primary"
              >
                <Icon name={icon} size={22} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
