'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type SectionId = 'home' | 'works' | 'notes' | 'contact'

const sections: { id: SectionId; label: string; bg: string }[] = [
  { id: 'home', label: 'Home', bg: '#0f3b59' },
  { id: 'works', label: 'Works', bg: '#332f03' },
  { id: 'notes', label: 'Notes', bg: '#1f580e' },
  { id: 'contact', label: 'Contact', bg: '#7b790c' },
]

const SWIPE_THRESHOLD = 80

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
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
      className="fixed inset-0 overflow-hidden text-text-inverse"
      animate={{ backgroundColor: active.bg }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.section
          key={active.id}
          custom={direction}
          variants={variants}
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
          <SectionContent id={active.id} />
        </motion.section>
      </AnimatePresence>

      <nav aria-label="Sections" className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-3">
        {sections.map((section, i) => (
          <button
            key={section.id}
            type="button"
            onClick={() => go(i)}
            aria-label={section.label}
            aria-current={i === index ? 'true' : undefined}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-text-inverse' : 'w-2 bg-text-inverse/40 hover:bg-text-inverse/70'
            }`}
          />
        ))}
      </nav>
    </motion.div>
  )
}

function SectionContent({ id }: { id: SectionId }) {
  if (id === 'home') {
    return (
      <div className="flex h-full w-full max-w-5xl flex-col py-12">
        <div className="flex flex-1 flex-col justify-center gap-6">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-text-inverse/70">Portfolio</p>
          <h1 className="font-heading text-4xl font-black leading-tight sm:text-6xl">
            I&apos;m a<br />
            Software Developer
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-text-inverse/80">
            Building web products with a focus on clear UI and maintainable front-end architecture.
          </p>
        </div>
      </div>
    )
  }

  if (id === 'contact') {
    return (
      <div className="flex w-full max-w-md flex-col gap-5">
        <h2 className="font-heading text-4xl font-black sm:text-5xl">Contact</h2>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <select
            aria-label="Subject"
            defaultValue=""
            className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-text-inverse"
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="job">Job opportunity</option>
            <option value="project">Project inquiry</option>
            <option value="hi">Just saying hi</option>
          </select>
          <input
            type="email"
            aria-label="Email"
            placeholder="you@example.com"
            className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-text-inverse placeholder:text-text-inverse/50"
          />
          <textarea
            aria-label="Message"
            rows={3}
            placeholder="Write your message..."
            className="resize-none rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-text-inverse placeholder:text-text-inverse/50"
          />
          <button
            type="submit"
            className="rounded-full bg-text-inverse px-6 py-3 text-sm font-semibold text-text-primary transition-opacity hover:opacity-90"
          >
            Send
          </button>
        </form>
      </div>
    )
  }

  const label = id === 'works' ? 'Works' : 'Notes'
  return <h2 className="font-heading text-5xl font-black sm:text-7xl">{label}</h2>
}
