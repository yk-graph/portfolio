import type { Meta, StoryObj } from '@storybook/react-vite'

import { FadeInWrapper } from './fade-in-wrapper'

const meta = {
  title: 'UI/FadeInWrapper',
  component: FadeInWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    delay: { control: { type: 'number' } },
    duration: { control: { type: 'number' } },
  },
} satisfies Meta<typeof FadeInWrapper>

export default meta
type Story = StoryObj<typeof meta>

const DemoCard = () => (
  <div className="w-64 rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm">
    <p className="text-sm font-semibold text-neutral-900">Fades in on scroll</p>
    <p className="mt-2 text-xs text-neutral-500">Scroll into view to trigger the animation.</p>
  </div>
)

export const Default: Story = {
  args: { children: <DemoCard /> },
}

export const WithDelay: Story = {
  args: { delay: 0.4, duration: 0.8, children: <DemoCard /> },
}

/** Scroll down to see the wrapper fade in only once when it enters the viewport. */
export const ScrollIntoView: Story = {
  args: { children: <DemoCard /> },
  render: (args) => (
    <div>
      <div className="flex h-screen items-center justify-center text-sm text-neutral-400">
        Scroll down ↓
      </div>
      <FadeInWrapper {...args} />
    </div>
  ),
}
