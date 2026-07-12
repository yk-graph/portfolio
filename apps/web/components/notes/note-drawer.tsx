'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { NoteClose } from './note-close'

export function NoteDrawer({ closeHref, children }: { closeHref: string; children: React.ReactNode }) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    router.prefetch(closeHref)
  }, [router, closeHref])

  const navigateAway = () => router.push(closeHref)

  return (
    <AnimatePresence>
      <motion.div
        key="note-drawer"
        initial={reduce ? false : { y: '100%' }}
        animate={{ y: closing && !reduce ? '100%' : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (closing) navigateAway()
        }}
        className="absolute inset-x-0 bottom-0 top-16 overflow-hidden rounded-t-4xl border-t border-white/15 bg-white/5 shadow-[0_-24px_48px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:top-20"
      >
        <NoteClose
          onClick={() => (reduce ? navigateAway() : setClosing(true))}
          className="absolute right-5 top-5 z-10"
        />

        <div className="h-full overflow-y-auto">{children}</div>
      </motion.div>
    </AnimatePresence>
  )
}
