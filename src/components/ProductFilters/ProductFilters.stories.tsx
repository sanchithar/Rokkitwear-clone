import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductFilters } from './ProductFilters';

const meta = {
  component: ProductFilters,
  title: 'Components/ProductFilters',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductFilters>;

export default meta;
type Story = StoryObj<typeof ProductFilters>;

export const Default: Story = {
  args: {
    onCategoryChange: (category) => console.log('Category changed:', category),
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};

export const MenCategorySelected: Story = {
  args: {
    selectedCategory: 'Men',
    selectedSort: 'popularity',
    onCategoryChange: (category) => console.log('Category changed:', category),
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};

export const SortByPriceLowToHigh: Story = {
  args: {
    selectedCategory: 'All',
    selectedSort: 'price-asc',
    onCategoryChange: (category) => console.log('Category changed:', category),
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};

export const WomenCategorySortedByPrice: Story = {
  args: {
    selectedCategory: 'Women',
    selectedSort: 'price-desc',
    onCategoryChange: (category) => console.log('Category changed:', category),
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};
