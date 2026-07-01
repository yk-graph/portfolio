'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { SectionNav } from '@/components/common'
import { sections, type SectionId } from '@/constants/sections'
import { HomeSection } from './home-section'
import { WorksSection } from './works-section'
import { NotesSection } from './notes-section'
import { ContactSection } from './contact-section'

const SWIPE_THRESHOLD = 80

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

const sectionContent: Record<SectionId, ReactNode> = {
  home: <HomeSection />,
  works: <WorksSection />,
  notes: <NotesSection />,
  contact: <ContactSection />,
}

export function SectionPager() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])

  const go = (next: number) => {
    if (next < 0 || next >= sections.length) return
    setState([next, next > index ? 1 : -1])
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
    <motion.div
      className="fixed inset-0 overflow-hidden bg-brand-navy text-white"
      animate={{ backgroundColor: active.bg }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.section
          key={active.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) go(index + 1)
            else if (info.offset.x > SWIPE_THRESHOLD) go(index - 1)
          }}
          className="absolute inset-0 flex cursor-grab flex-col items-center justify-center px-6 active:cursor-grabbing"
        >
          {sectionContent[active.id]}
        </motion.section>
      </AnimatePresence>

      <SectionNav items={sections} activeIndex={index} onSelect={go} />
    </motion.div>
  )
}
