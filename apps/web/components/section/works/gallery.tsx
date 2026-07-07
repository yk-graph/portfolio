'use client'

import { useState } from 'react'

import type { Work } from '@/lib/notion'

import { WorksCarousel } from './carousel'
import { WorksDetail } from './detail'

export function WorksGallery({ works }: { works: Work[] }) {
  const items = works.filter((w) => w.thumbnail)
  const [active, setActive] = useState(0)

  return (
    <>
      {items[active] ? (
        <WorksDetail key={items[active].id} work={items[active]} />
      ) : (
        <p className="flex flex-1 items-center text-white/70">No works yet.</p>
      )}

      <WorksCarousel works={items} active={active} onActive={setActive} />
    </>
  )
}
