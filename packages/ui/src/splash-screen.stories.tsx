import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { SplashScreen } from './splash-screen'

const steps = ['Welcome', 'to my', 'Portfolio']

const meta = {
  title: 'UI/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    visible: true,
    label: 'Welcome',
  },
} satisfies Meta<typeof SplashScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

function AutoplaySplash(args: React.ComponentProps<typeof SplashScreen>) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 900)
    return () => clearInterval(id)
  }, [])

  return <SplashScreen {...args} label={steps[step]} />
}

export const Autoplay: Story = {
  render: (args) => <AutoplaySplash {...args} />,
}
