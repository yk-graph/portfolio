'use client'

import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'

export interface SplashScreenProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  visible: boolean
  label: string
  wordDuration?: number
  overlayDuration?: number
  onExitComplete?: () => void
}

export function SplashScreen({
  visible,
  label,
  wordDuration = 0.4,
  overlayDuration = 0.6,
  onExitComplete,
  className,
  ...rest
}: SplashScreenProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: overlayDuration, ease: 'easeOut' }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-neutral-800 ${className ?? ''}`}
          {...rest}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: wordDuration, ease: 'easeOut' }}
              className="font-heading text-3xl font-black tracking-tight text-white"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
