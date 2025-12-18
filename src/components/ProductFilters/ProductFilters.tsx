import { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { Product } from '../../types/product';
import './ProductFilters.scss';

export type SortOption = 'price-asc' | 'price-desc' | 'popularity';
export type CategoryFilter = 'All' | Product['category'];

interface ProductFiltersProps {
  onCategoryChange: (category: CategoryFilter) => void;
  onSortChange: (sort: SortOption) => void;
  selectedCategory?: CategoryFilter;
  selectedSort?: SortOption;
}

export const ProductFilters = ({
  onCategoryChange,
  onSortChange,
  selectedCategory = 'All',
  selectedSort = 'popularity',
}: ProductFiltersProps) => {
  const [category, setCategory] = useState<CategoryFilter>(selectedCategory);
  const [sort, setSort] = useState<SortOption>(selectedSort);

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: CategoryFilter | null
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory);
      onCategoryChange(newCategory);
    }
  };

  const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
    const newSort = event.target.value as SortOption;
    setSort(newSort);
    onSortChange(newSort);
  };

  return (
    <Container className="product-filters">
      <Box className="product-filters__container">
        {/* Category Filter */}
        <Box className="product-filters__section">
          <Typography variant="subtitle1" className="product-filters__label">
            Filter by Category
          </Typography>
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategoryChange}
            aria-label="product category"
            className="product-filters__toggle-group"
          >
            <ToggleButton value="All" aria-label="all products">
              All
            </ToggleButton>
            <ToggleButton value="Men" aria-label="men">
              Men
            </ToggleButton>
            <ToggleButton value="Women" aria-label="women">
              Women
            </ToggleButton>
            <ToggleButton value="Kids" aria-label="kids">
              Kids
            </ToggleButton>
            <ToggleButton value="Accessories" aria-label="accessories">
              Accessories
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Sort Dropdown */}
        <Box className="product-filters__section">
          <FormControl className="product-filters__sort" size="small">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sort}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductFilters;
