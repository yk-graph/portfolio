import { type ReactNode } from 'react'

import { AnimationProvider } from './components/provider/animation-provider'

export default function Template({ children }: { children: ReactNode }) {
  return <AnimationProvider>{children}</AnimationProvider>
}
