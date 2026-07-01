'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}
