import { type ReactNode } from 'react'

import { PageWrapper } from './components/page-wrapper'

export default function Template({ children }: { children: ReactNode }) {
  return <PageWrapper>{children}</PageWrapper>
}
