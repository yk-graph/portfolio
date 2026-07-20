import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { SplashScreen } from './splash-screen'

const meta = {
  title: 'UI/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    steps: ['Welcome', 'to my', 'Portfolio'],
  },
} satisfies Meta<typeof SplashScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Branded: Story = {
  args: {
    background: '#0f3b59',
    color: '#f4d35e',
  },
}

function LoopingSplash(args: React.ComponentProps<typeof SplashScreen>) {
  const [run, setRun] = useState(0)
  return <SplashScreen key={run} {...args} onFinish={() => setRun((r) => r + 1)} />
}

export const Looping: Story = {
  render: (args) => <LoopingSplash {...args} />,
}
