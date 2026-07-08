'use client'

import { useRouter } from 'next/navigation'

export function NoteClose({ fallback, className }: { fallback: string; className?: string }) {
  const router = useRouter()

  const handleClose = () => {
    if (window.history.length > 1) router.back()
    else router.push(fallback)
  }

  return (
    <button
      type="button"
      onClick={handleClose}
      aria-label="Close"
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 ${className ?? ''}`}
    >
      ✕
    </button>
  )
}
