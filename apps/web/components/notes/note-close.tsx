'use client'

import { useTransitionRouter } from 'next-view-transitions'

export function NoteClose({ href, className }: { href: string; className?: string }) {
  const router = useTransitionRouter()

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      aria-label="Close"
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 ${className ?? ''}`}
    >
      ✕
    </button>
  )
}
