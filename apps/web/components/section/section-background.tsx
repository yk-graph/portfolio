'use client'

import { usePathname } from 'next/navigation'

import { sections, isSectionPath, sectionIndexFromPath } from '@/constants'

export function SectionBackground() {
  const pathname = usePathname()
  if (!isSectionPath(pathname)) return null

  const index = sectionIndexFromPath(pathname)

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {sections.map((section, i) => (
        <div
          key={section.id}
          className="animate-bg-drift absolute inset-0 bg-size-[600%_600%] transition-opacity duration-700 ease-out"
          style={{ backgroundImage: section.gradient, opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
