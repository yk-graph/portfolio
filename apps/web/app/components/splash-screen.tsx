'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const STORAGE_KEY = 'firstVisit'
const STEP_MS = 900

// FirstLoading_01-03: the three welcome lines shown in sequence.
const steps = ['Welcome', 'to my', 'Portfolio'] as const

interface SplashScreenProps {
  children: ReactNode
}

export function SplashScreen({ children }: SplashScreenProps) {
  // SSG-safe: the server renders no overlay (false), so there is no hydration
  // mismatch. The first-visit decision happens only in the effect below.
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    // sessionStorage is read inside the effect only (never during render).
    if (sessionStorage.getItem(STORAGE_KEY)) return

    sessionStorage.setItem(STORAGE_KEY, 'true')

    const showFrame = requestAnimationFrame(() => setShow(true))
    const timers = steps.map((_, i) =>
      setTimeout(
        () => {
          if (i < steps.length - 1) setStep(i + 1)
          else setShow(false)
        },
        STEP_MS * (i + 1),
      ),
    )

    return () => {
      cancelAnimationFrame(showFrame)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-loading-bg"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-heading text-3xl font-black tracking-tight text-text-inverse"
              >
                {steps[step]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
