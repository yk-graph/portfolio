import type { Meta, StoryObj } from '@storybook/react-vite'

import { NoteCard } from './note-card'

const meta = {
  title: 'UI/NoteCard',
  component: NoteCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Building a Turborepo monorepo from scratch',
    date: '2026-06-27',
    description:
      'A walkthrough of setting up a Next.js + Storybook monorepo with shared UI, centralized versions, and a clean generic/specific boundary.',
    imageSrc: 'https://picsum.photos/seed/note/640/360',
    imageAlt: 'Article thumbnail',
  },
} satisfies Meta<typeof NoteCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongText: Story = {
  args: {
    title: 'A very long article title that should wrap onto multiple lines without breaking the card layout',
    description:
      'This description is intentionally long to verify that the line-clamp keeps the card height consistent. '.repeat(
        3
      ),
  },
}

/** A grid of cards, as they might appear on the blog/notes listing page. */
export const Grid: Story = {
  render: (args) => (
    <div className="grid w-[760px] grid-cols-2 gap-6">
      <NoteCard {...args} imageSrc="https://picsum.photos/seed/a/640/360" />
      <NoteCard {...args} imageSrc="https://picsum.photos/seed/b/640/360" />
      <NoteCard {...args} imageSrc="https://picsum.photos/seed/c/640/360" />
      <NoteCard {...args} imageSrc="https://picsum.photos/seed/d/640/360" />
    </div>
  ),
}
