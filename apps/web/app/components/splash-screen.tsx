'use client'

import { useEffect, useState, type ReactNode } from 'react'

const SESSION_KEY = 'splash-shown'
const VISIBLE_MS = 1500
const FADE_MS = 700

interface SplashScreenProps {
  children: ReactNode
}

export function SplashScreen({ children }: SplashScreenProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      const hideFrame = requestAnimationFrame(() => setShowOverlay(false))
      return () => cancelAnimationFrame(hideFrame)
    }

    sessionStorage.setItem(SESSION_KEY, '1')

    const fadeTimer = setTimeout(() => setFadingOut(true), VISIBLE_MS)
    const removeTimer = setTimeout(() => setShowOverlay(false), VISIBLE_MS + FADE_MS)

    return () => {
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
