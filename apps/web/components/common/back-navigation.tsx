import Link from 'next/link'

import { Icon } from '@repo/ui'

export function BackNavigation() {
  return (
    <nav aria-label="Sub-page">
      <Link
        href="/"
        className="flex cursor-pointer items-center gap-2 font-heading text-sm font-bold tracking-widest text-white/70 transition-colors hover:text-white"
      >
        <Icon name="arrowLeft" size={16} />
        BACK
      </Link>
    </nav>
  )
}
