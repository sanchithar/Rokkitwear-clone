import { Grid, Container, Box } from '@mui/material';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import './ProductGrid.scss';

interface ProductGridProps {
  products: Product[];
  onCustomize?: (product: Product) => void;
  onView?: (product: Product) => void;
  buttonLabel?: string;
}

export const ProductGrid = ({
  products,
  onCustomize,
  onView,
  buttonLabel,
}: ProductGridProps) => {
  return (
    <Container className="product-grid">
      <Box className="product-grid__container">
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard
                product={product}
                onCustomize={onCustomize}
                onView={onView}
                buttonLabel={buttonLabel}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductGrid;
