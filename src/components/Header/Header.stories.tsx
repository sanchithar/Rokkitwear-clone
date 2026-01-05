import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: Header,
  title: 'Components/Header',
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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    cartItemCount: 0,
  },
};

export const WithCartItems: Story = {
  args: {
    cartItemCount: 5,
  },
};

export const WithManyCartItems: Story = {
  args: {
    cartItemCount: 99,
  },
};
