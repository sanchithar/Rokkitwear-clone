import type { Meta, StoryObj } from '@storybook/react-vite';
import { SchoolLandingPage } from './SchoolLandingPage';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: SchoolLandingPage,
  title: 'Pages/SchoolLandingPage',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SchoolLandingPage>;

export default meta;
type Story = StoryObj<typeof SchoolLandingPage>;

export const Default: Story = {};
