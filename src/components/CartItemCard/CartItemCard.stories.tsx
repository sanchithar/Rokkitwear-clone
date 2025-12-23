import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartItemCard } from './CartItemCard';
import { CartProvider } from '../../context/CartContext';

const meta = {
  component: CartItemCard,
  title: 'Components/CartItemCard',
  decorators: [
    (Story) => (
      <CartProvider>
        <Story />
      </CartProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CartItemCard>;

export default meta;
type Story = StoryObj<typeof CartItemCard>;

const mockItem = {
  productId: 'p1',
  name: 'Fan Favorite Heavyweight Hooded Unisex Sweatshirt',
  price: 49.99,
  image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Hoodie',
  selectedColor: 'Jet Black',
  selectedSize: 'L',
  quantity: 2,
};

export const Default: Story = {
  args: {
    item: mockItem,
  },
};

export const SingleQuantity: Story = {
  args: {
    item: {
      ...mockItem,
      quantity: 1,
    },
  },
};

export const LargeName: Story = {
  args: {
    item: {
      ...mockItem,
      name: 'Super Long Product Name That Might Wrap to Multiple Lines in the Card Display',
    },
  },
};
