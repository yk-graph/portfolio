import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'next-themes'

import './preview-styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    // Make next-themes' useTheme available to every story so theme-aware
    // components (e.g. ThemeToggle) render correctly.
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
