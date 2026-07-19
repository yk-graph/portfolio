'use client'

export interface SectionNavItem {
  id: string
  label: string
}

export interface SectionNavProps {
  /** Ordered list of sections to render as dots. */
  items: SectionNavItem[]
  /** Index of the currently active section. */
  activeIndex: number
  /** Called with the index of the section the user selects. */
  onSelect: (index: number) => void
  /** Accessible label for the nav landmark. */
  label?: string
}

/**
 * A row of dot indicators for paged sections. The active dot is widened;
 * clicking a dot reports its index via `onSelect`. Fully controlled and
 * dependency-free.
 */
export function SectionNav({ items, activeIndex, onSelect, label = 'Sections' }: SectionNavProps) {
  return (
    <nav aria-label={label} className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-3">
      {items.map((item, i) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={item.label}
          aria-current={i === activeIndex ? 'true' : undefined}
          className={`h-2 rounded-full transition-all ${
            i === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
          }`}
        />
      ))}
    </nav>
  )
}
