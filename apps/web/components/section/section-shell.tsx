'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import { SectionNav } from '@/components/common'
import { sections } from '@/constants'

const SWIPE_THRESHOLD = 80

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

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

  const [direction, setDirection] = useState(0)

  const go = (next: number) => {
    if (noteOpen || next < 0 || next >= sections.length || next === index) return
    setDirection(next > index ? 1 : -1)
    router.push(hrefFor(lang, next))
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1)
      else if (e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const active = sections[index]

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

      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={active.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          drag={noteOpen ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) go(index + 1)
            else if (info.offset.x > SWIPE_THRESHOLD) go(index - 1)
          }}
          className="absolute inset-0 flex cursor-grab flex-col items-center justify-center active:cursor-grabbing"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <SectionNav items={sections} activeIndex={index} onSelect={go} />
    </div>
  )
}
