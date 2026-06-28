import { type ElementType, type ImgHTMLAttributes } from 'react'

/**
 * Props the injected image component must accept. `next/image` and the native
 * `<img>` element are both compatible with this subset.
 */
type NoteCardImageProps = Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height' | 'className'>

export interface NoteCardProps {
  title: string
  /** Display-ready date string, e.g. "2026-06-27". Formatting is the caller's job. */
  date: string
  description: string
  imageSrc: string
  imageAlt?: string
  /**
   * Image component to render the thumbnail. Defaults to a native `<img>` so the
   * package stays framework-agnostic; apps can pass `next/image`.
   */
  imageComponent?: ElementType<NoteCardImageProps>
  className?: string
}

export function NoteCard({
  title,
  date,
  description,
  imageSrc,
  imageAlt = '',
  imageComponent: Image = 'img',
  className,
}: NoteCardProps) {
  return (
    <article
      className={[
        'flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        <Image src={imageSrc} alt={imageAlt} width={640} height={360} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <time className="text-xs font-medium text-neutral-500">{date}</time>
        <h3 className="text-base font-semibold leading-snug text-neutral-900">{title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">{description}</p>
      </div>
    </article>
  )
}
