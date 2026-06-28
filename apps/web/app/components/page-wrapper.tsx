import { type ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
}
