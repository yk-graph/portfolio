import type { Meta, StoryObj } from '@storybook/react-vite'

import { Marquee } from './marquee'

const meta = {
  title: 'UI/Marquee',
  component: Marquee,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    children: "I'm a Software Developer",
  },
} satisfies Meta<typeof Marquee>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Large: Story = {
  args: {
    className: 'text-6xl font-black',
  },
}

export const Fast: Story = {
  args: {
    durationSec: 8,
    className: 'text-4xl font-black',
  },
}
