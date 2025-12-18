import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductGrid } from './ProductGrid';
import { Product } from '../../types/product';

const meta = {
  component: ProductGrid,
  title: 'Components/ProductGrid',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof ProductGrid>;

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    price: 24.99,
    image: 'https://via.placeholder.com/300x300/1976d2/ffffff?text=T-Shirt',
    category: 'Men',
    popularity: 95,
  },
  {
    id: '2',
    name: 'Premium Hoodie',
    price: 49.99,
    image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Hoodie',
    category: 'Men',
    popularity: 90,
  },
  {
    id: '3',
    name: "Women's Tee",
    price: 24.99,
    image: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=Women+Tee',
    category: 'Women',
    popularity: 88,
  },
  {
    id: '4',
    name: 'Kids Jersey',
    price: 29.99,
    image: 'https://via.placeholder.com/300x300/4facfe/ffffff?text=Kids+Jersey',
    category: 'Kids',
    popularity: 85,
  },
  {
    id: '5',
    name: 'School Cap',
    price: 19.99,
    image: 'https://via.placeholder.com/300x300/00f2fe/ffffff?text=Cap',
    category: 'Accessories',
    popularity: 80,
  },
  {
    id: '6',
    name: 'Premium Polo',
    price: 39.99,
    image: 'https://via.placeholder.com/300x300/43e97b/ffffff?text=Polo',
    category: 'Men',
    popularity: 92,
  },
  {
    id: '7',
    name: "Women's Hoodie",
    price: 49.99,
    image: 'https://via.placeholder.com/300x300/fa709a/ffffff?text=Women+Hoodie',
    category: 'Women',
    popularity: 87,
  },
  {
    id: '8',
    name: 'Backpack',
    price: 34.99,
    image: 'https://via.placeholder.com/300x300/fee140/333333?text=Backpack',
    category: 'Accessories',
    popularity: 75,
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const FewProducts: Story = {
  args: {
    products: mockProducts.slice(0, 3),
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const SingleProduct: Story = {
  args: {
    products: [mockProducts[0]],
    onCustomize: (product) => console.log('Customize:', product),
  },
};

export const EmptyGrid: Story = {
  args: {
    products: [],
  },
};

export const WithViewAction: Story = {
  args: {
    products: mockProducts,
    onView: (product) => console.log('View:', product),
  },
};
