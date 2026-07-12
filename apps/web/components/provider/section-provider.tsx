'use client'

import { createContext, useCallback, useContext, useState } from 'react'

import { sections, type SectionId } from '@/constants'

interface SectionState {
  index: number
  direction: number
  go: (next: number) => void
  goTo: (id: SectionId) => void
}

const SectionContext = createContext<SectionState | null>(null)

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])

  const go = useCallback((next: number) => {
    setState((prev) => {
      const [current] = prev
      if (next < 0 || next >= sections.length || next === current) return prev
      return [next, next > current ? 1 : -1]
    })
  }, [])

  const goTo = useCallback((id: SectionId) => go(sections.findIndex((section) => section.id === id)), [go])

  return <SectionContext.Provider value={{ index, direction, go, goTo }}>{children}</SectionContext.Provider>
}

export function useSection(): SectionState {
  const value = useContext(SectionContext)
  if (!value) throw new Error('useSection must be used within a SectionProvider')
  return value
}
