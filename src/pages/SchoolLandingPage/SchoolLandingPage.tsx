import { useState, useMemo, useEffect } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { HeroSection } from '../../components/HeroSection';
import { ProductFilters, SortOption, CategoryFilter } from '../../components/ProductFilters';
import { ProductGrid } from '../../components/ProductGrid';
import { Product, convertToProduct } from '../../types/product';
import { useSchoolData, useProductsData, useSchoolsData } from '../../hooks';
import { useCart } from '../../context/CartContext';
import './SchoolLandingPage.scss';

const SCHOOL_ID = '366997'; // fallback Bors House ID (not used as default anymore)

export const SchoolLandingPage = () => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | undefined>(undefined);

  // Fetch list of schools and selected school details
  const { data: schoolsList, isLoading: schoolsLoading } = useSchoolsData();
  const { data: school, isLoading: schoolLoading, error: schoolError } = useSchoolData(selectedSchoolId);

  // Fetch products for selected school (undefined => all products)
  const { data: backendProducts, isLoading: productsLoading, error: productsError } = useProductsData(selectedSchoolId);

  // Convert backend products to frontend format
  const products: Product[] = useMemo(() => {
    if (!backendProducts) return [];
    return backendProducts.map(convertToProduct);
  }, [backendProducts]);

  // If URL contains ?schoolId=..., use that as selected school. If missing or 'all', show all products.
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('schoolId');
    if (!q || q === 'all') {
      setSelectedSchoolId(undefined);
    } else {
      setSelectedSchoolId(q);
    }
  }, [location.search]);

  // Filter, search and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

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
  }, [products, selectedCategory, selectedSort, searchQuery]);

  const handleCustomize = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  // Loading state: schoolLoading only matters when a specific school is selected
  const isAnyLoading = schoolsLoading || productsLoading || (selectedSchoolId ? schoolLoading : false);

  if (isAnyLoading) {
    return (
      <Box className="school-landing-page">
        <Header cartItemCount={getItemCount()} onSearch={setSearchQuery} searchQuery={searchQuery}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // Error state: only show school error if a specific school was requested
  if ((selectedSchoolId && schoolError) || productsError) {
    return (
      <Box className="school-landing-page">
        <Header cartItemCount={getItemCount()} onSearch={setSearchQuery} searchQuery={searchQuery} />
        <Box sx={{ padding: 4 }}>
          <Alert severity="error">
            {selectedSchoolId && schoolError ? 'Failed to load school details. ' : ''}
            {productsError ? 'Failed to load products. ' : ''}
            Please make sure the backend server is running on http://localhost:3333
          </Alert>
        </Box>
      </Box>
    );
  }

  // Prepare hero content. If no specific school selected, show All Schools.
  const heroName = selectedSchoolId ? (school?.name ?? 'School') : 'All Schools';
  const heroLocation = selectedSchoolId ? (school?.location ?? '') : 'Various Locations';
  const heroBanner = selectedSchoolId ? school?.bannerUrl : undefined;

  return (
    <Box className="school-landing-page">
      <Header cartItemCount={getItemCount()} onSearch={setSearchQuery} searchQuery={searchQuery} />
      <HeroSection
        schoolName={heroName}
        location={heroLocation}
        bannerImage={heroBanner}
      />
      <ProductFilters
        onCategoryChange={setSelectedCategory}
        onSortChange={setSelectedSort}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
      />
      <ProductGrid
        products={filteredAndSortedProducts}
        onView={handleCustomize}
        buttonLabel="View"
      />
    </Box>
  );
};

export default SchoolLandingPage;
