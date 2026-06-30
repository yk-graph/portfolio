import type { Metadata } from 'next'
import { WorkCard } from '@repo/ui'

import { BackNavigation } from '../components/back-navigation'

export const metadata: Metadata = {
  title: 'Works',
}

const works = [
  {
    title: 'Design System',
    description: 'A component library and tokens powering a multi-app product suite.',
    tags: ['React', 'TypeScript', 'Storybook'],
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time charts and filtering over a large event dataset.',
    tags: ['Next.js', 'D3', 'SSR'],
  },
  {
    title: 'E-commerce Storefront',
    description: 'A fast, accessible storefront with ISR product pages.',
    tags: ['Next.js', 'Stripe', 'ISR'],
  },
  {
    title: 'Internal Tooling',
    description: 'Operational tools that cut a manual workflow from hours to minutes.',
    tags: ['React', 'Node', 'GraphQL'],
  },
]

export default function WorksPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-8">
      <BackNavigation />

      <section className="flex-1 rounded-3xl bg-olive-green px-6 py-10">
        <h1 className="font-heading text-3xl font-black text-text-inverse sm:text-4xl">Works</h1>

        <ul className="mt-8 grid max-h-[70vh] grid-cols-1 gap-6 overflow-y-auto pr-1 sm:grid-cols-2">
          {works.map((work) => (
            <li key={work.title}>
              <WorkCard
                title={work.title}
                description={work.description}
                tags={work.tags}
                imageSrc="/placeholder.svg"
                imageAlt=""
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
