'use client'

import { motion } from 'motion/react'

import { Icon } from '@/components/common'
import type { CareerItem } from '@/lib/content'

export function CareerTimeline({ items }: { items: CareerItem[] }) {
  if (items.length === 0) return null

  return (
    <ol className="relative flex flex-col gap-8">
      <div className="pointer-events-none absolute bottom-4 left-6 top-4 w-px -translate-x-1/2 bg-white/20 sm:left-12" />

      {items.map((item) => (
        <motion.li
          key={item.id}
          className="relative flex gap-4 sm:gap-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-12 shrink-0 justify-center sm:w-24">
            <span className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[var(--color-brand-navy)] text-white">
              <Icon name="briefcase" size={16} />
            </span>
          </div>

          <div className="flex-1 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
            <p className="text-xs font-semibold tracking-widest text-white/50">{item.period}</p>
            <h3 className="mt-1 font-heading text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{item.summary}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
