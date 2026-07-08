'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function NoteDrawer({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 bottom-0 top-16 overflow-hidden rounded-t-[2rem] border-t border-white/15 bg-white/[0.03] shadow-[0_-24px_48px_-16px_rgba(0,0,0,0.45)] sm:top-20"
    >
      {children}
    </motion.div>
  )
}
