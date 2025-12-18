import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { Header } from '../../components/Header';
import { HeroSection } from '../../components/HeroSection';
import { ProductFilters, SortOption, CategoryFilter } from '../../components/ProductFilters';
import { ProductGrid } from '../../components/ProductGrid';
import { Product } from '../../types/product';
import './SchoolLandingPage.scss';

// Mock product data - replace with API call later
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bors House Classic T-Shirt',
    price: 24.99,
    image: 'https://via.placeholder.com/300x300/1976d2/ffffff?text=T-Shirt',
    category: 'Men',
    popularity: 95,
  },
  {
    id: '2',
    name: 'Bors House Hoodie',
    price: 49.99,
    image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Hoodie',
    category: 'Men',
    popularity: 90,
  },
  {
    id: '3',
    name: 'Women\'s Bors House Tee',
    price: 24.99,
    image: 'https://via.placeholder.com/300x300/f093fb/ffffff?text=Women+Tee',
    category: 'Women',
    popularity: 88,
  },
  {
    id: '4',
    name: 'Kids Bors House Jersey',
    price: 29.99,
    image: 'https://via.placeholder.com/300x300/4facfe/ffffff?text=Kids+Jersey',
    category: 'Kids',
    popularity: 85,
  },
  {
    id: '5',
    name: 'Bors House Cap',
    price: 19.99,
    image: 'https://via.placeholder.com/300x300/00f2fe/ffffff?text=Cap',
    category: 'Accessories',
    popularity: 80,
  },
  {
    id: '6',
    name: 'Premium Bors House Polo',
    price: 39.99,
    image: 'https://via.placeholder.com/300x300/43e97b/ffffff?text=Polo',
    category: 'Men',
    popularity: 92,
  },
  {
    id: '7',
    name: 'Women\'s Bors House Hoodie',
    price: 49.99,
    image: 'https://via.placeholder.com/300x300/fa709a/ffffff?text=Women+Hoodie',
    category: 'Women',
    popularity: 87,
  },
  {
    id: '8',
    name: 'Bors House Backpack',
    price: 34.99,
    image: 'https://via.placeholder.com/300x300/fee140/333333?text=Backpack',
    category: 'Accessories',
    popularity: 75,
  },
];

export const SchoolLandingPage = () => {
  const [cartItemCount] = useState(3); // Mock cart count
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('popularity');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, selectedSort]);

  const handleCustomize = (product: Product) => {
    console.log('Customize product:', product);
    // TODO: Navigate to customization page
  };

  return (
    <Box className="school-landing-page">
      <Header cartItemCount={cartItemCount} />
      <HeroSection
        schoolName="Bors House"
        location="Kansas City, Missouri"
        bannerImage="https://via.placeholder.com/1920x400/667eea/ffffff?text=Bors+House+Banner"
      />
      <ProductFilters
        onCategoryChange={setSelectedCategory}
        onSortChange={setSelectedSort}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
      />
      <ProductGrid
        products={filteredAndSortedProducts}
        onCustomize={handleCustomize}
      />
    </Box>
  );
};

export default SchoolLandingPage;
