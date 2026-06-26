'use client'

import { type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

export type AnimatedButtonVariant = 'primary' | 'ghost'

export interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: AnimatedButtonVariant
}

const baseClasses =
  'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold leading-none cursor-pointer border border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses: Record<AnimatedButtonVariant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
  ghost: 'bg-transparent text-neutral-900 border-black/15 hover:bg-black/5',
}

export function AnimatedButton({
  children,
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={[baseClasses, variantClasses[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

AnimatedButton.displayName = 'AnimatedButton'
