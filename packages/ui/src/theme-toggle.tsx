'use client'

import { useEffect, useState, type ButtonHTMLAttributes } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon size in px (applied to width/height). Defaults to 20. */
  iconSize?: number
}

const baseClasses =
  'inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 text-neutral-900 hover:bg-black/5 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/15 dark:text-neutral-50 dark:hover:bg-white/10'

export function ThemeToggle({ iconSize = 20, className, ...rest }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'
  const merged = [baseClasses, className].filter(Boolean).join(' ')

  if (!mounted) {
    return <button type="button" aria-label="Toggle theme" className={merged} {...rest} />
  }

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={merged}
      {...rest}
    >
      {isDark ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
    </button>
  )
}
