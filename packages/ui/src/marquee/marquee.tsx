'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export interface MarqueeProps {
  children: ReactNode
  durationSec?: number
  gap?: string
  className?: string
}

export function Marquee({ children, durationSec = 50, gap = '0.3em', className }: MarqueeProps) {
  const reduce = useReducedMotion()

  return (
    <div className={`w-full overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: durationSec, ease: 'linear', repeat: Infinity }}
      >
        <span style={{ paddingRight: gap }}>{children}</span>
        <span aria-hidden="true" style={{ paddingRight: gap }}>
          {children}
        </span>
      </motion.div>
    </div>
  )
}
