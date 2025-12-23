import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../components/Header';
import { ColorSelector } from '../../components/ColorSelector';
import { getProduct } from '../../services/schoolService';
import { useCart } from '../../context/CartContext';
import './ProductDetailPage.scss';

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem, getItemCount } = useCart();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { data: product, isLoading, error: fetchError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId!),
    enabled: !!productId,
  });

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setError('Please select both color and size before adding to cart');
      return;
    }

    if (!product) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      selectedColor,
      selectedSize,
      quantity,
    });

    setSuccess(true);
    setError('');
    setTimeout(() => setSuccess(false), 3000);
  };

  if (isLoading) {
    return (
      <Box>
        <Header cartItemCount={getItemCount()} />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (fetchError || !product) {
    return (
      <Box>
        <Header cartItemCount={getItemCount()} />
        <Container sx={{ py: 4 }}>
          <Alert severity="error">Product not found</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="product-detail-page">
      <Header cartItemCount={getItemCount()} />
      <Container sx={{ py: 4 }}>
        <Button onClick={() => navigate(-1)} sx={{ mb: 3 }}>
          ← Back
        </Button>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              className="product-detail-page__image"
            />
          </Grid>

          {/* Product Info & Customization */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              {product.description}
            </Typography>

            {/* Color Selection */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Select Color
              </Typography>
              <ColorSelector
                colors={product.availableColors}
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
            </Box>

            {/* Size Selection */}
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>Select Size</InputLabel>
              <Select
                value={selectedSize}
                label="Select Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.availableSizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Quantity */}
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, max: 99 }}
              sx={{ mt: 3 }}
            />

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {/* Success Message */}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Item added to cart successfully!
              </Alert>
            )}

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleAddToCart}
              sx={{ mt: 3 }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
