import type { Meta, StoryObj } from '@storybook/react-vite'

import { WorkCard } from './work-card'

const meta = {
  title: 'UI/WorkCard',
  component: WorkCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Portfolio Monorepo',
    description:
      'An engineer portfolio site built as a Turborepo monorepo with a shared UI library, Storybook catalog, and centralized tooling.',
    imageSrc: 'https://picsum.photos/seed/work/640/360',
    imageAlt: 'Project thumbnail',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Storybook'],
  },
} satisfies Meta<typeof WorkCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoTags: Story = {
  args: { tags: [] },
}

/** A grid of cards, as they might appear on the Works listing page. */
export const Grid: Story = {
  render: (args) => (
    <div className="grid w-[760px] grid-cols-2 gap-6">
      <WorkCard {...args} imageSrc="https://picsum.photos/seed/w1/640/360" />
      <WorkCard {...args} imageSrc="https://picsum.photos/seed/w2/640/360" />
      <WorkCard {...args} imageSrc="https://picsum.photos/seed/w3/640/360" />
      <WorkCard {...args} imageSrc="https://picsum.photos/seed/w4/640/360" />
    </div>
  ),
}
