'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

const tags = ['NextJS', 'React', 'Figma', 'TypeScript', 'NodeJS', 'Prisma', 'Docker']

const iconLinks = ['git', 'link']

const cards = Array.from({ length: 7 }, (_, i) => `https://picsum.photos/seed/works-${i}/800/600`)

const N = cards.length

const MOBILE = { sizes: [240, 200, 160], ratio: 1, gap: 180, area: 150, xStep: 20 }
const TABLET = { sizes: [360, 320], ratio: 1, gap: 200, area: 300, xStep: 32 }
const LAPTOP = { sizes: [360, 320], ratio: 2, gap: 300, area: 560, xStep: 48 }

function sizeAt(abs: number, sizes: number[]) {
  const last = sizes.length - 1
  if (abs >= last) return sizes[last]
  const i = Math.floor(abs)
  return sizes[i] + (sizes[i + 1] - sizes[i]) * (abs - i)
}

export function WorksSection() {
  const [active, setActive] = useState(0)
  const [drag, setDrag] = useState(0)
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

  return (
    <div className="relative flex h-full w-full gap-10 overflow-hidden">
      <div className="flex h-full min-w-0 flex-1 flex-col py-14 pl-6">
        <h2 className="font-heading text-6xl font-black leading-none sm:text-7xl">Works</h2>

        <div className="flex flex-1 flex-col justify-center gap-5">
          <h3 className="text-2xl font-bold">Page Title</h3>
          <p className="text-sm leading-relaxed text-white/70">
            Page Description Lorem Ipsum is simply dummy text of the printing andtypesetting industry. Lorem Ipsum has
            been the industry&apos;s standard dummy text ever since 1966, when
          </p>

          <ul className="flex justify-end gap-3">
            {iconLinks.map((label) => (
              <li key={label}>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-sm text-white transition-colors hover:bg-white/10"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-brand-amber">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative shrink-0" style={{ width: cfg.area }}>
        {cards.map((src, i) => {
          let offset = i - active - drag
          offset = ((offset % N) + N) % N
          if (offset > N / 2) offset -= N
          const abs = Math.abs(offset)
          const height = sizeAt(abs, cfg.sizes)
          const y = Math.sign(offset) * cfg.gap * abs ** 0.62
          const opacity = Math.max(0, Math.min(1, (maxOffset + 0.6 - abs) / 0.6))
          return (
            <div
              key={src}
              className="absolute top-1/2 left-0 overflow-hidden rounded-2xl"
              style={{
                width: height * cfg.ratio,
                height,
                transform: `translate(${abs * cfg.xStep}px, calc(-50% + ${y}px))`,
                opacity,
                zIndex: Math.round(100 - abs * 10),
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="640px"
                className="object-cover"
                style={{ filter: `grayscale(${Math.min(1, abs)})` }}
              />
            </div>
          )
        })}

        <motion.div
          className="absolute inset-0 z-200 cursor-grab touch-none active:cursor-grabbing"
          onPan={(_, info) => setDrag(-info.offset.y / 120)}
          onPanEnd={(_, info) => {
            setDrag(0)
            if (info.offset.y <= -50) go(1)
            else if (info.offset.y >= 50) go(-1)
          }}
        />
      </div>
    </div>
  )
}
