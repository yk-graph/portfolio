import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { SectionNav } from './section-nav'

const items = [
  { id: 'home', label: 'Home' },
  { id: 'works', label: 'Works' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
]

const meta = {
  title: 'UI/SectionNav',
  component: SectionNav,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="relative h-64 w-full bg-neutral-800">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    items,
    activeIndex: 0,
  },
} satisfies Meta<typeof SectionNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MiddleActive: Story = {
  args: { activeIndex: 2 },
}

function InteractiveNav(args: React.ComponentProps<typeof SectionNav>) {
  const [active, setActive] = useState(0)
  return <SectionNav {...args} activeIndex={active} onSelect={setActive} />
}

export const Interactive: Story = {
  render: (args) => <InteractiveNav {...args} />,
}
