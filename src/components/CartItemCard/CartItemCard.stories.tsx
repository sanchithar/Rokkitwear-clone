import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartItemCard } from './CartItemCard';
import { CartProvider } from '../../context/CartContext';

const meta = {
  component: CartItemCard,
  title: 'Components/CartItemCard',
  decorators: [
    (Story) => (
      <CartProvider>
        <div style={{ maxWidth: '800px', padding: '20px' }}>
          <Story />
        </div>
      </CartProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: 'Cart item data',
    },
  },
} satisfies Meta<typeof CartItemCard>;

export default meta;
type Story = StoryObj<typeof CartItemCard>;

const mockItem = {
  productId: 'p1',
  name: 'Fan Favorite Heavyweight Hooded Unisex Sweatshirt',
  price: 49.99,
  image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
  selectedColor: 'Jet Black',
  selectedSize: 'L',
  quantity: 2,
};

const mockItem2 = {
  productId: 'p2',
  name: 'Oversized Crewneck Sweatshirt',
  price: 44.99,
  image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500&h=600&fit=crop',
  selectedColor: 'Grey',
  selectedSize: 'M',
  quantity: 1,
};

// Default story
export const Default: Story = {
  args: {
    item: mockItem,
  },
};

// Single quantity
export const SingleQuantity: Story = {
  args: {
    item: {
      ...mockItem,
      quantity: 1,
    },
  },
};

// Large quantity
export const LargeQuantity: Story = {
  args: {
    item: {
      ...mockItem,
      quantity: 60,
    },
  },
};

// Different color and size
export const DifferentVariant: Story = {
  args: {
    item: mockItem2,
  },
};

// Maximum quantity
export const MaxQuantity: Story = {
  args: {
    item: {
      ...mockItem,
      quantity: 99,
    },
  },
};

// Multiple items
export const MultipleItems: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CartItemCard item={mockItem} />
      <CartItemCard item={mockItem2} />
      <CartItemCard 
        item={{
          productId: 'p3',
          name: 'School Spirit Cap',
          price: 19.99,
          image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=500&h=600&fit=crop',
          selectedColor: 'Red',
          selectedSize: 'One Size',
          quantity: 1,
        }} 
      />
    </div>
  ),
};

// Interactive - Edit in Controls panel
export const Interactive: Story = {
  args: {
    item: {
      productId: 'p1',
      name: 'Edit me in Controls!',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      selectedColor: 'Black',
      selectedSize: 'M',
      quantity: 1,
    },
  },
};