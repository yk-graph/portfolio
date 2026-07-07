import { type ReactNode } from 'react'

import { AnimationProvider } from '@/components'

export default function Template({ children }: { children: ReactNode }) {
  return <AnimationProvider>{children}</AnimationProvider>
}
