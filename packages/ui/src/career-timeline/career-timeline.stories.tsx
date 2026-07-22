import type { Meta, StoryObj } from '@storybook/react-vite'

import { CareerTimeline } from './career-timeline'

const meta = {
  title: 'UI/CareerTimeline',
  component: CareerTimeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    items: [
      {
        id: '1',
        type: 'study',
        period: '2018 - 2022',
        title: 'B.Sc. Computer Science',
        summary: 'Studied software engineering fundamentals.',
      },
      {
        id: '2',
        type: 'work',
        period: '2022 - 2024',
        title: 'Frontend Engineer',
        summary: 'Built and shipped web applications.',
      },
      {
        id: '3',
        type: 'work',
        period: '2024 - Present',
        title: 'Software Developer',
        summary: 'Working across the full stack.',
      },
    ],
  },
} satisfies Meta<typeof CareerTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
