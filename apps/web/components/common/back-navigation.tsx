'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Icon } from './icons'

export function BackNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = pathname.split('/')[1]

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(`/${locale}`)
    }
  }

  return (
    <nav aria-label="Sub-page">
      <button
        type="button"
        onClick={handleBack}
        className="flex cursor-pointer items-center gap-2 font-heading text-sm font-bold tracking-widest text-white/70 transition-colors hover:text-white"
      >
        <Icon name="arrowLeft" size={16} />
        BACK
      </button>
    </nav>
  )
}
