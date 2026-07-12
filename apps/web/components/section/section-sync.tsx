'use client'

import { useEffect } from 'react'

import { useSection } from '@/components/provider'
import { type SectionId } from '@/constants'

export function SectionSync({ id }: { id: SectionId }) {
  const { goTo } = useSection()

  useEffect(() => {
    goTo(id)
  }, [id, goTo])

  return null
}
