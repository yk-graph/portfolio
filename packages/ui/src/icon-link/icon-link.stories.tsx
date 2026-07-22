import type { Meta, StoryObj } from '@storybook/react-vite'

import { IconLink } from './icon-link'
import { iconNames } from '../icon'

const meta = {
  title: 'UI/IconLink',
  component: IconLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
  args: {
    icon: 'github',
    href: '#',
    'aria-label': 'GitHub',
    className: 'border border-neutral-400 text-neutral-900 hover:bg-neutral-100',
  },
} satisfies Meta<typeof IconLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Calendar: Story = {
  args: {
    icon: 'calendar',
    'aria-label': 'Calendar',
  },
}
