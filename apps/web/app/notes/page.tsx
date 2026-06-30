import type { Metadata } from 'next'
import { NoteCard } from '@repo/ui'

import { BackNavigation } from '../components/back-navigation'

export const metadata: Metadata = {
  title: 'Notes',
}

const notes = [
  {
    title: 'Preventing FOUC with an SSR-injected script',
    date: '2026-06-29',
    description: 'How a synchronous inline script removes the splash flash before first paint.',
  },
  {
    title: 'template.tsx vs layout.tsx',
    date: '2026-06-28',
    description: 'Why a template remounts on navigation and how to use it for page transitions.',
  },
  {
    title: 'Centralizing versions with the pnpm catalog',
    date: '2026-06-20',
    description: 'Keeping dependency versions consistent across a Turborepo monorepo.',
  },
  {
    title: 'A single, controllable Icon component',
    date: '2026-06-15',
    description: 'Mapping a name prop to react-icons for a type-safe icon registry.',
  },
]

export default function NotesPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-8">
      <BackNavigation />

      <section className="flex-1 rounded-3xl bg-olive-green px-6 py-10">
        <h1 className="font-heading text-3xl font-black text-text-inverse sm:text-4xl">Notes</h1>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {notes.map((note) => (
            <li key={note.title}>
              <NoteCard
                title={note.title}
                date={note.date}
                description={note.description}
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
