'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const STORAGE_KEY = 'isFirstVisit'
const STEP_MS = 900

// FirstLoading_01-03: the three welcome lines shown in sequence.
const steps = ['Welcome', 'to my', 'Portfolio'] as const

// Runs synchronously during HTML parse, before React hydrates: for returning
// visitors it marks <html> so CSS hides the overlay before the first paint —
// no splash flash. Keep the key in sync with STORAGE_KEY.
const blockingScript = `try{if(sessionStorage.getItem('${STORAGE_KEY}')){document.documentElement.classList.add('splash-dismissed')}}catch(e){}`

interface SplashScreenProps {
  children: ReactNode
}

export function SplashScreen({ children }: SplashScreenProps) {
  // Start shown so the overlay is in the SSR HTML and covers content on the
  // very first paint (no content flash on first visit). Returning visitors are
  // hidden pre-paint by the blocking script + CSS, then unmounted below.
  const [show, setShow] = useState(true)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      // Returning visitor: the overlay is already hidden by CSS; just unmount.
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
        STEP_MS * (i + 1),
      ),
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
