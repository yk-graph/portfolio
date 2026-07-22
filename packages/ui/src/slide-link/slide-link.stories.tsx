import type { Meta, StoryObj } from '@storybook/react-vite'

import { SlideLink } from './slide-link'

const meta = {
  title: 'UI/SlideLink',
  component: SlideLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    href: '#',
    children: 'ABOUT',
    className: 'bg-neutral-100 text-neutral-900 w-36 hover:w-40',
  },
} satisfies Meta<typeof SlideLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Wide: Story = {
  args: {
    children: 'RESUME',
    className: 'bg-neutral-100 text-neutral-900 w-52 hover:w-56',
  },
}
