'use client'

import { type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const shouldReduceMotion = useReducedMotion()
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
