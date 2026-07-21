import type { Meta, StoryObj } from '@storybook/react-vite'

import { IconCircleLink } from './icon-circle-link'

const meta = {
  title: 'UI/IconCircleLink',
  component: IconCircleLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    href: '#',
    'aria-label': 'GitHub',
    className: 'border border-neutral-400 text-neutral-900 hover:bg-neutral-100',
    children: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
} satisfies Meta<typeof IconCircleLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
