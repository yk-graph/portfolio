import Link from 'next/link'

import { Icon, type IconName } from '@/components/common'

const pageLinks = [
  { label: 'ABOUT', href: '/about', width: 'w-36 hover:w-40' },
  { label: 'SKILL', href: '/skill', width: 'w-44 hover:w-48' },
  { label: 'RESUME', href: '/resume', width: 'w-52 hover:w-56' },
]

const snsLinks: { label: string; href: string; icon: IconName }[] = [
  { label: 'Calendar', href: 'https://example.com/calendar', icon: 'calendar' },
  { label: 'GitHub', href: 'https://example.com/github', icon: 'github' },
  { label: 'LinkedIn', href: 'https://example.com/linkedin', icon: 'linkedin' },
]

export function HomeSection() {
  return (
    <div className="@container flex h-full w-full flex-col justify-between py-16">
      <div className="flex flex-col items-end gap-10 text-right">
        <h1 className="w-full font-heading font-black leading-[0.95]">
          <span className="block text-[clamp(2.5rem,18cqi,5.5rem)] sm:hidden">
            I&apos;m a
            <br />
            Software
            <br />
            Developer
          </span>
          <span className="hidden w-full overflow-hidden sm:flex">
            <span className="flex w-max animate-marquee whitespace-nowrap text-left text-[clamp(6rem,15vw,10rem)] leading-none motion-reduce:animate-none">
              <span className="pr-[0.3em]">I&apos;m a Software Developer</span>
              <span aria-hidden="true" className="pr-[0.3em]">
                I&apos;m a Software Developer
              </span>
            </span>
          </span>
        </h1>
        <p className="pr-6 text-lg leading-relaxed text-white/70">
          Page Description
          <br />
          Lorem Ipsum is simply
          <br />
          dummy text of the printing
        </p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <ul className="flex flex-col gap-6">
          {pageLinks.map(({ label, href, width }) => (
            <li key={label}>
              <Link
                href={href}
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
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
