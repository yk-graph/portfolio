'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { SplashScreen } from '@repo/ui'

const STORAGE_KEY = 'isFirstVisit'
const STEP_MS = 900

const steps = ['Welcome', 'to my', 'Portfolio'] as const

const blockingScript = `try{if(sessionStorage.getItem('${STORAGE_KEY}')){document.documentElement.classList.add('splash-dismissed')}}catch(e){}`

interface SplashProviderProps {
  children: ReactNode
}

export function SplashProvider({ children }: SplashProviderProps) {
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
      <SplashScreen
        visible={show}
        label={steps[step]}
        data-splash-overlay
        aria-hidden="true"
        onExitComplete={() => document.documentElement.classList.add('splash-dismissed')}
      />
      {children}
    </>
  )
}
