'use client'

import { usePathname } from 'next/navigation'

import { useSection } from '@/components/provider'
import { sections } from '@/constants'

const NOTES_INDEX = sections.findIndex((section) => section.id === 'notes')

export function SectionBackground() {
  const pathname = usePathname()
  const { index } = useSection()

  const segment = pathname.split('/')[2] ?? ''
  const onPager = segment === ''
  const onNote = segment === 'notes'
  if (!onPager && !onNote) return null

  const activeIndex = onNote ? NOTES_INDEX : index

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {sections.map((section, i) => (
        <div
          key={section.id}
          className="animate-bg-drift absolute inset-0 bg-size-[600%_600%] transition-opacity duration-700 ease-out"
          style={{ backgroundImage: section.gradient, opacity: i === activeIndex ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
