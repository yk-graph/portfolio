import { Icon } from '@/components/common'
import type { Work } from '@/lib'

export function WorksDetail({ work }: { work: Work }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-5">
      <h3 className="text-2xl font-bold">{work.title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{work.description ?? work.summary}</p>

      <ul className="flex justify-end gap-3">
        {work.repoUrl && (
          <li>
            <a
              href={work.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-sm text-white transition-colors hover:bg-white/10"
              aria-label="Repository"
            >
              <Icon name="github" size={18} />
            </a>
          </li>
        )}
        {work.liveUrl && (
          <li>
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-sm text-white transition-colors hover:bg-white/10"
              aria-label="Live site"
            >
              <Icon name="link" size={18} />
            </a>
          </li>
        )}
      </ul>

      <ul className="flex flex-wrap gap-2">
        {work.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-brand-amber">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  )
}
