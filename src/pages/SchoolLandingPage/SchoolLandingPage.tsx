import { useState, useMemo } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { HeroSection } from '../../components/HeroSection';
import { ProductFilters, SortOption, CategoryFilter } from '../../components/ProductFilters';
import { ProductGrid } from '../../components/ProductGrid';
import { Product, convertToProduct } from '../../types/product';
import { useSchoolData, useProductsData } from '../../hooks';
import { useCart } from '../../context/CartContext';
import './SchoolLandingPage.scss';

const SCHOOL_ID = '366997'; // Bors House ID

export const SchoolLandingPage = () => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('popularity');

  // Fetch school details
  const { data: school, isLoading: schoolLoading, error: schoolError } = useSchoolData(SCHOOL_ID);

  // Fetch products
  const { data: backendProducts, isLoading: productsLoading, error: productsError } = useProductsData(SCHOOL_ID);

  // Convert backend products to frontend format
  const products: Product[] = useMemo(() => {
    if (!backendProducts) return [];
    return backendProducts.map(convertToProduct);
  }, [backendProducts]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

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
  }, [products, selectedCategory, selectedSort]);

  const handleCustomize = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  // Loading state
  if (schoolLoading || productsLoading) {
    return (
      <Box className="school-landing-page">
        <Header cartItemCount={getItemCount()} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // Error state
  if (schoolError || productsError) {
    return (
      <Box className="school-landing-page">
        <Header cartItemCount={getItemCount()} />
        <Box sx={{ padding: 4 }}>
          <Alert severity="error">
            {schoolError ? 'Failed to load school details. ' : ''}
            {productsError ? 'Failed to load products. ' : ''}
            Please make sure the backend server is running on http://localhost:3333
          </Alert>
        </Box>
      </Box>
    );
  }

  // No school data
  if (!school) {
    return (
      <Box className="school-landing-page">
        <Header cartItemCount={getItemCount()} />
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5">School not found</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="school-landing-page">
      <Header cartItemCount={getItemCount()} />
      <HeroSection
        schoolName={school.name}
        location={school.location}
        bannerImage={school.bannerUrl}
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
