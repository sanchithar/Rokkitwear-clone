import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';

const meta = {
  component: ProductCard,
  title: 'Components/ProductCard',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof ProductCard>;

const sampleProduct: Product = {
  id: '1',
  name: 'Classic T-Shirt',
  price: 24.99,
  image: 'https://via.placeholder.com/300x300/1976d2/ffffff?text=T-Shirt',
  category: 'Men',
  popularity: 95,
};

export const Default: Story = {
  args: {
    product: sampleProduct,
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const WithViewButton: Story = {
  args: {
    product: sampleProduct,
    onView: (product) => console.log('View:', product),
  },
};

export const WomenProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      id: '2',
      name: "Women's Premium Hoodie",
      price: 49.99,
      image: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=Hoodie',
      category: 'Women',
    },
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const KidsProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      id: '3',
      name: 'Kids Jersey',
      price: 29.99,
      image: 'https://via.placeholder.com/300x300/4facfe/ffffff?text=Jersey',
      category: 'Kids',
    },
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const Accessory: Story = {
  args: {
    product: {
      ...sampleProduct,
      id: '4',
      name: 'School Cap',
      price: 19.99,
      image: 'https://via.placeholder.com/300x300/00f2fe/ffffff?text=Cap',
      category: 'Accessories',
    },
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const ExpensiveProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      id: '5',
      name: 'Premium Limited Edition Jacket',
      price: 199.99,
      image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Jacket',
      category: 'Men',
    },
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const LongProductName: Story = {
  args: {
    product: {
      ...sampleProduct,
      id: '6',
      name: 'Super Long Product Name That Should Wrap to Multiple Lines in the Card',
      price: 34.99,
      image: 'https://via.placeholder.com/300x300/43e97b/ffffff?text=Product',
      category: 'Men',
    },
    onCustomize: (product) => console.log('Customize:', product),
  },
};
