import type { IconType } from 'react-icons'

export interface TechStackItem {
  name: string
  Icon: IconType
}

export function TechStack({ items }: { items: TechStackItem[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map(({ name, Icon }) => (
        <li
          key={name}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:bg-white/10"
        >
          <Icon size={18} className="text-white" aria-hidden />
          <span className="font-sans text-sm font-bold">{name}</span>
        </li>
      ))}
    </ul>
  )
}
