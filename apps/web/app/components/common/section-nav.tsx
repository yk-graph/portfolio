'use client'

interface SectionNavItem {
  id: string
  label: string
}

interface SectionNavProps {
  items: SectionNavItem[]
  activeIndex: number
  onSelect: (index: number) => void
  label?: string
}

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
