import type { Meta, StoryObj } from '@storybook/react-vite'

import { ThemeToggle } from './theme-toggle'

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconSize: { control: { type: 'range', min: 12, max: 32, step: 1 } },
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LargeIcon: Story = {
  args: { iconSize: 28 },
}
