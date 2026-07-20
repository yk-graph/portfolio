'use client'

import { type ElementType, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const STATIC_AT: Record<Breakpoint, string> = {
  sm: 'block sm:hidden',
  md: 'block md:hidden',
  lg: 'block lg:hidden',
  xl: 'block xl:hidden',
  '2xl': 'block 2xl:hidden',
}

const MARQUEE_AT: Record<Breakpoint, string> = {
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  lg: 'hidden lg:block',
  xl: 'hidden xl:block',
  '2xl': 'hidden 2xl:block',
}

export interface MarqueeProps {
  children: ReactNode
  as?: ElementType
  breakpoint?: Breakpoint
  durationSec?: number
  gap?: string
  className?: string
}

export function Marquee({ children, as, breakpoint, durationSec = 50, gap = '0.3em', className }: MarqueeProps) {
  const reduce = useReducedMotion()
  const Tag = as ?? 'div'

  const track = (
    <span className={`${breakpoint ? MARQUEE_AT[breakpoint] : 'block'} w-full overflow-hidden`}>
      <motion.span
        className="flex w-max whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: durationSec, ease: 'linear', repeat: Infinity }}
      >
        <span style={{ paddingRight: gap }}>{children}</span>
        <span aria-hidden="true" style={{ paddingRight: gap }}>
          {children}
        </span>
      </motion.span>
    </span>
  )

  return (
    <Tag className={className}>
      {breakpoint && <span className={STATIC_AT[breakpoint]}>{children}</span>}
      {track}
    </Tag>
  )
}
