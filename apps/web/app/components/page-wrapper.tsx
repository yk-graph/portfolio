'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'

interface PageWrapperProps {
  children: ReactNode
}

// Mount-time fade-in for page content. Children are passed in from a server
// component and only rendered here, so they stay server components.
export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
