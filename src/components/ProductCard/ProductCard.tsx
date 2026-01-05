import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { Product } from '../../types/product';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
  onCustomize?: (product: Product) => void;
  onView?: (product: Product) => void;
  buttonLabel?: string;
}

export const ProductCard = ({
  product,
  onCustomize,
  onView,
  buttonLabel,
}: ProductCardProps) => {
  const handleAction = () => {
    if (onCustomize) {
      onCustomize(product);
    } else if (onView) {
      onView(product);
    }
  };

  const label =
    buttonLabel ?? (onCustomize ? 'Customize' : onView ? 'View' : 'Action');

  return (
    <Card className="product-card" elevation={2}>
      <CardMedia
        component="img"
        height="250"
        image={product.image}
        alt={product.name}
        className="product-card__image"
      />
      <CardContent className="product-card__content">
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          className="product-card__name"
        >
          {product.name}
        </Typography>
        <Box className="product-card__details">
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            className="product-card__price"
          >
            ${product.price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions className="product-card__actions">
        <Button
          size="medium"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAction}
          className="product-card__button"
        >
          {label}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
