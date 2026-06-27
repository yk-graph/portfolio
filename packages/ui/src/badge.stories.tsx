import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'TypeScript',
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['neutral', 'primary', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: { variant: 'neutral' },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Success: Story = {
  args: { variant: 'success' },
}

export const Warning: Story = {
  args: { variant: 'warning' },
}

/** Example of multiple tags as they might appear on the Works page. */
export const TagGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Next.js</Badge>
      <Badge variant="primary">TypeScript</Badge>
      <Badge variant="neutral">Tailwind CSS</Badge>
      <Badge variant="success">Storybook</Badge>
    </div>
  ),
}
