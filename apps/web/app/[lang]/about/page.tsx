import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BackNavigation, Icon, type IconName } from '@/components'
import { hasLocale } from '@/lib'
import { getDictionary } from '@/lib/i18n/dictionaries'

export const metadata: Metadata = {
  title: 'About',
}

const snsLinks = [
  { key: 'calendar', href: 'https://example.com/calendar', icon: 'calendar' },
  { key: 'github', href: 'https://example.com/github', icon: 'github' },
  { key: 'linkedin', href: 'https://example.com/linkedin', icon: 'linkedin' },
] as const satisfies ReadonlyArray<{ key: 'calendar' | 'github' | 'linkedin'; href: string; icon: IconName }>

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = (await getDictionary(lang)).about

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

        <h1 className="font-heading text-4xl font-black leading-tight sm:text-5xl">{t.greeting}</h1>

        <p className="max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">{t.bio}</p>

        <ul className="flex items-center gap-6">
          {snsLinks.map(({ key, href, icon }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.links[key]}
                className="inline-flex text-neutral-600 transition-colors hover:text-foreground dark:text-neutral-400"
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
