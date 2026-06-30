import { type ReactNode } from 'react'

import { PageWrapper } from './components/page-wrapper'

// A template re-renders (remounts) on every navigation, unlike a layout, so PageWrapper's mount-time fade-in replays on each page transition.
export default function Template({ children }: { children: ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>
}
