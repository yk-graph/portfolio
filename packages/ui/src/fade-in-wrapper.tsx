'use client'

import { type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

export interface FadeInWrapperProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  /** Delay before the animation starts, in seconds. */
  delay?: number
  /** Duration of the fade-in animation, in seconds. */
  duration?: number
}

export function FadeInWrapper({ children, delay = 0, duration = 0.5, ...rest }: FadeInWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
