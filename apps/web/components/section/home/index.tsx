import Link from 'next/link'

import { Marquee } from '@repo/ui'
import { Icon, type IconName } from '@/components/common'
import type { Dictionary } from '@/lib/i18n'

const pageLinks = [
  { label: 'ABOUT', href: '/about', width: 'w-36 hover:w-40' },
  { label: 'SKILL', href: '/skill', width: 'w-44 hover:w-48' },
  { label: 'RESUME', href: '/resume', width: 'w-52 hover:w-56' },
]

const snsLinks: { label: string; href: string; icon: IconName }[] = [
  { label: 'Calendar', href: 'https://calendly.com/yokokura-tatsuya/new-meeting', icon: 'calendar' },
  { label: 'GitHub', href: 'https://github.com/yk-graph', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tatsuya-yokokura-6a8893345/', icon: 'linkedin' },
]

export function HomeSection({ dict, lang }: { dict: Dictionary['home']; lang: string }) {
  return (
    <div className="@container flex h-full w-full flex-col justify-between py-16">
      <div className="flex flex-col items-end gap-10 text-right">
        <Marquee
          as="h1"
          breakpoint="sm"
          className="w-full text-left font-heading text-[clamp(2.5rem,18cqi,5.5rem)] font-black leading-none sm:text-[clamp(6rem,15vw,10rem)]"
        >
          I&apos;m a Software Developer
        </Marquee>
        <p className="pr-6 text-lg leading-relaxed text-white/70">
          {dict.description.map((line, i) => (
            <span key={i}>
              {line}
              {i < dict.description.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <ul className="flex flex-col gap-6">
          {pageLinks.map(({ label, href, width }) => (
            <li key={label}>
              <Link
                href={`/${lang}${href}`}
                className={`block rounded-r-full bg-neutral-100 py-3 pl-8 text-sm sm:text-base font-bold tracking-widest text-brand-navy transition-[width] duration-300 ease-out ${width}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-4 pr-6">
          {snsLinks.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
              >
                <Icon name={icon} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
