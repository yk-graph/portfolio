'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { SplashScreen } from '@repo/ui'

const STORAGE_KEY = 'isFirstVisit'

const steps = ['Welcome', 'to my', 'Portfolio']

const blockingScript = `try{if(sessionStorage.getItem('${STORAGE_KEY}')){document.documentElement.classList.add('splash-dismissed')}}catch(e){}`

interface SplashProviderProps {
  children: ReactNode
}

export function SplashProvider({ children }: SplashProviderProps) {
  const [play, setPlay] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      document.documentElement.classList.add('splash-dismissed')
      const frame = requestAnimationFrame(() => setPlay(false))
      return () => cancelAnimationFrame(frame)
    }

    sessionStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  return (
    <>
      <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: blockingScript }} />
      {play && (
        <SplashScreen
          steps={steps}
          data-splash-overlay
          aria-hidden="true"
          onFinish={() => document.documentElement.classList.add('splash-dismissed')}
        />
      )}
      {children}
    </>
  )
}
