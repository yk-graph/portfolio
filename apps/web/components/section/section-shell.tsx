'use client'

import { ViewTransition, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'

import { SectionNav } from '@/components/common'
import { sections } from '@/constants'

const SWIPE_THRESHOLD = 80

function hrefFor(lang: string, index: number) {
  const { id } = sections[index]
  return id === 'home' ? `/${lang}` : `/${lang}/${id}`
}

export function SectionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const segments = pathname.split('/')
  const lang = segments[1]
  const current = segments[2] ?? ''
  const noteOpen = current === 'notes' && Boolean(segments[3])
  const found = sections.findIndex((section) => (section.id === 'home' ? current === '' : section.id === current))
  const index = found === -1 ? 0 : found

  const go = (next: number) => {
    if (noteOpen || next < 0 || next >= sections.length || next === index) return
    router.push(hrefFor(lang, next), { transitionTypes: [next > index ? 'nav-forward' : 'nav-back'] })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1)
      else if (e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="fixed inset-0 overflow-hidden text-white">
      {sections.map((section, i) => (
        <div
          key={section.id}
          aria-hidden
          className="animate-bg-drift absolute inset-0 bg-size-[600%_600%] transition-opacity duration-700 ease-out"
          style={{ backgroundImage: section.gradient, opacity: i === index ? 1 : 0 }}
        />
      ))}

      <motion.div
        className="absolute inset-0 flex cursor-grab flex-col items-center justify-center active:cursor-grabbing"
        drag={noteOpen ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -SWIPE_THRESHOLD) go(index + 1)
          else if (info.offset.x > SWIPE_THRESHOLD) go(index - 1)
        }}
      >
        <ViewTransition
          enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
          exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
          default="none"
        >
          {children}
        </ViewTransition>
      </motion.div>

      <SectionNav items={sections} activeIndex={index} onSelect={go} />
    </div>
  )
}
