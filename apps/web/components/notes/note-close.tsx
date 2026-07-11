'use client'

import { useRouter } from 'next/navigation'

export function NoteClose({ href, className }: { href?: string; className?: string }) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => (href ? router.push(href) : router.back())}
      aria-label="Close"
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 ${className ?? ''}`}
    >
      ✕
    </button>
  )
}
