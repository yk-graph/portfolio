'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import type { Work } from '@/lib'

const MOBILE = { sizes: [240, 200, 160], ratio: 1, gap: 180, area: 150, xStep: 20 }
const TABLET = { sizes: [360, 320], ratio: 1, gap: 200, area: 300, xStep: 32 }
const LAPTOP = { sizes: [360, 320], ratio: 2, gap: 300, area: 560, xStep: 48 }

function sizeAt(abs: number, sizes: number[]) {
  const last = sizes.length - 1
  if (abs >= last) return sizes[last]
  const i = Math.floor(abs)
  return sizes[i] + (sizes[i + 1] - sizes[i]) * (abs - i)
}

export function WorksContent({ works }: { works: Work[] }) {
  const items = works.filter((w) => w.thumbnail)
  const N = items.length

  const [active, setActive] = useState(0)
  const [drag, setDrag] = useState(0)
  const [smooth, setSmooth] = useState(false)
  const [tier, setTier] = useState<'mobile' | 'tablet' | 'laptop'>('mobile')

  useEffect(() => {
    const tablet = window.matchMedia('(min-width: 640px)')
    const laptop = window.matchMedia('(min-width: 1280px)')
    const update = () => setTier(laptop.matches ? 'laptop' : tablet.matches ? 'tablet' : 'mobile')
    update()
    tablet.addEventListener('change', update)
    laptop.addEventListener('change', update)
    return () => {
      tablet.removeEventListener('change', update)
      laptop.removeEventListener('change', update)
    }
  }, [])

  const cfg = tier === 'laptop' ? LAPTOP : tier === 'tablet' ? TABLET : MOBILE
  const maxOffset = cfg.sizes.length - 1

  const go = (delta: number) => setActive((a) => (a + delta + N) % N)

  const wheelAccum = useRef(0)
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleWheel = (e: React.WheelEvent) => {
    setSmooth(true)
    wheelAccum.current += e.deltaY / 400
    setDrag(wheelAccum.current)
    if (wheelTimer.current) clearTimeout(wheelTimer.current)
    wheelTimer.current = setTimeout(() => {
      go(Math.round(wheelAccum.current))
      setDrag(0)
      wheelAccum.current = 0
    }, 150)
  }

  if (N === 0) return null

  return (
    <div className="relative shrink-0" style={{ width: cfg.area }} onWheel={handleWheel}>
      {items.map((work, i) => {
        let offset = i - active - drag
        offset = ((offset % N) + N) % N
        if (offset > N / 2) offset -= N
        const abs = Math.abs(offset)
        const height = sizeAt(abs, cfg.sizes)
        const y = Math.sign(offset) * cfg.gap * abs ** 0.62
        const opacity = Math.max(0, Math.min(1, (maxOffset + 0.6 - abs) / 0.6))
        return (
          <div
            key={work.id}
            className="absolute top-1/2 left-0 cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => {
              setSmooth(true)
              setActive(i)
            }}
            style={{
              width: height * cfg.ratio,
              height,
              transform: `translate(${abs * cfg.xStep}px, calc(-50% + ${y}px))`,
              opacity,
              zIndex: Math.round(100 - abs * 10),
              transition: smooth ? 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s' : undefined,
            }}
          >
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="640px"
              className="object-cover"
              style={{ filter: `grayscale(${Math.min(1, abs)})`, transition: smooth ? 'filter 0.5s' : undefined }}
            />
          </div>
        )
      })}
    </div>
  )
}
