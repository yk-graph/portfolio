'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const STORAGE_KEY = 'isFirstVisit'
const STEP_MS = 900

const steps = ['Welcome', 'to my', 'Portfolio'] as const

const blockingScript = `try{if(sessionStorage.getItem('${STORAGE_KEY}')){document.documentElement.classList.add('splash-dismissed')}}catch(e){}`

interface SplashScreenProps {
  children: ReactNode
}

export function SplashScreen({ children }: SplashScreenProps) {
  const [show, setShow] = useState(true)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      const hideFrame = requestAnimationFrame(() => setShow(false))
      return () => cancelAnimationFrame(hideFrame)
    }

    sessionStorage.setItem(STORAGE_KEY, 'true')

    const timers = steps.map((_, i) =>
      setTimeout(
        () => {
          if (i < steps.length - 1) setStep(i + 1)
          else setShow(false)
        },
        STEP_MS * (i + 1)
      )
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: blockingScript }} />
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            data-splash-overlay
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-heading text-3xl font-black tracking-tight text-white"
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
