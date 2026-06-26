'use client'

import { type CSSProperties, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'

export type AnimatedButtonVariant = 'primary' | 'ghost'

export interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: AnimatedButtonVariant
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.625rem 1.25rem',
  borderRadius: '9999px',
  fontSize: '0.9375rem',
  fontWeight: 600,
  lineHeight: 1,
  cursor: 'pointer',
  border: '1px solid transparent',
  transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
}

const variantStyles: Record<AnimatedButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: '#111',
    color: '#fff',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#111',
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
}

export function AnimatedButton({
  children,
  variant = 'primary',
  style,
  type = 'button',
  ...rest
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

AnimatedButton.displayName = 'AnimatedButton'
