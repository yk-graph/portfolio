'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'

export interface SplashScreenProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  steps: string[]
  stepMs?: number
  wordDuration?: number
  overlayDuration?: number
  background?: string
  color?: string
  onFinish?: () => void
}

export function SplashScreen({
  steps,
  stepMs = 900,
  wordDuration = 0.4,
  overlayDuration = 0.6,
  background = '#262626',
  color = '#ffffff',
  onFinish,
  className,
  style,
  ...rest
}: SplashScreenProps) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(
        () => {
          if (i < steps.length - 1) setStep(i + 1)
          else setVisible(false)
        },
        stepMs * (i + 1)
      )
    )

    return () => timers.forEach(clearTimeout)
  }, [steps, stepMs])

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: overlayDuration, ease: 'easeOut' }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${className ?? ''}`}
          style={{ backgroundColor: background, ...style }}
          {...rest}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={steps[step]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: wordDuration, ease: 'easeOut' }}
              className="font-heading text-3xl font-black tracking-tight"
              style={{ color }}
            >
              {steps[step]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
