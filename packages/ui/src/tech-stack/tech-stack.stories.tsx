import type { Meta, StoryObj } from '@storybook/react-vite'
import { SiReact, SiTypescript, SiVite } from 'react-icons/si'

import { TechStack } from './tech-stack'

const meta = {
  title: 'UI/TechStack',
  component: TechStack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    items: [
      { name: 'React', Icon: SiReact },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Vite', Icon: SiVite },
    ],
  },
} satisfies Meta<typeof TechStack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
