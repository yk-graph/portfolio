'use client'

import { useEffect, useState, type ReactNode } from 'react'

const SESSION_KEY = 'splash-shown'
/** How long the splash stays fully visible before it starts fading out. */
const VISIBLE_MS = 1500
/** Must match the `duration-700` fade-out transition below. */
const FADE_MS = 700

interface SplashScreenProps {
  children: ReactNode
}

export function SplashScreen({ children }: SplashScreenProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    sessionStorage.setItem(SESSION_KEY, '1')

    const showFrame = requestAnimationFrame(() => setShowOverlay(true))

    const fadeTimer = setTimeout(() => setFadingOut(true), VISIBLE_MS)
    const removeTimer = setTimeout(() => setShowOverlay(false), VISIBLE_MS + FADE_MS)

    return () => {
      cancelAnimationFrame(showFrame)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  return (
    <>
      {showOverlay && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-loading-bg transition-opacity duration-700 ${
            fadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <span className="font-heading text-3xl font-black tracking-tight text-text-inverse">Portfolio</span>
        </div>
      )}
      {children}
    </>
  )
}
