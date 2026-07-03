import { getWorks } from '@/lib'

import { WorksContent } from './works-content'

const tags = ['NextJS', 'React', 'Figma', 'TypeScript', 'NodeJS', 'Prisma', 'Docker']

const iconLinks = ['git', 'link']

export async function WorksSection() {
  const works = await getWorks()

  return (
    <div className="relative flex h-full w-full gap-10 overflow-hidden">
      <div className="flex h-full min-w-0 flex-1 flex-col py-14 pl-6">
        <h2 className="font-heading text-6xl font-black leading-none sm:text-7xl">Works</h2>

        <div className="flex flex-1 flex-col justify-center gap-5">
          <h3 className="text-2xl font-bold">Page Title</h3>
          <p className="text-sm leading-relaxed text-white/70">
            Page Description Lorem Ipsum is simply dummy text of the printing andtypesetting industry. Lorem Ipsum has
            been the industry&apos;s standard dummy text ever since 1966, when
          </p>

          <ul className="flex justify-end gap-3">
            {iconLinks.map((label) => (
              <li key={label}>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-sm text-white transition-colors hover:bg-white/10"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-brand-amber">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <WorksContent works={works} />
    </div>
  )
}
