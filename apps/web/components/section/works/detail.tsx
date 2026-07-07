import { Icon } from '@/components/common'
import type { Work } from '@/lib'

export function WorksDetail({ work }: { work: Work }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 py-10 animate-rise motion-reduce:animate-none">
      <h3 className="shrink-0 text-2xl font-bold">{work.title}</h3>

      <p className="shrink-0 text-sm font-semibold leading-relaxed text-white/80">{work.summary}</p>

      {work.description && (
        <p className="min-h-0 overflow-auto text-sm leading-relaxed text-white/60">{work.description}</p>
      )}

      <ul className="flex shrink-0 justify-end gap-4">
        {work.repoUrl && (
          <li>
            <a
              href={work.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm text-white transition-colors hover:bg-white/10"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm text-white transition-colors hover:bg-white/10"
              aria-label="Live site"
            >
              <Icon name="link" size={18} />
            </a>
          </li>
        )}
      </ul>

      <ul className="flex shrink-0 flex-wrap gap-2">
        {work.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-brand-olive">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  )
}
