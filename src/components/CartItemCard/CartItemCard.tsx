import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { CartItem } from '../../types/cart';
import { useCart } from '../../context/CartContext';
import './CartItemCard.scss';

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const { removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(item.productId, item.selectedSize, item.selectedColor, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.productId, item.selectedSize, item.selectedColor);
  };

  return (
    <Card className="cart-item-card">
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        className="cart-item-card__image"
      />
      <CardContent className="cart-item-card__content">
        <Box className="cart-item-card__info">
          <Typography variant="h6" component="h3">
            {item.name}
          </Typography>
          <Typography variant="h6" color="primary">
            ${item.price.toFixed(2)}
          </Typography>
        </Box>

        <Box className="cart-item-card__options">
          <Chip label={`Color: ${item.selectedColor}`} size="small" />
          <Chip label={`Size: ${item.selectedSize}`} size="small" />
        </Box>

        <Box className="cart-item-card__actions">
          <TextField
            type="number"
            label="Quantity"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            inputProps={{ min: 1, max: 99 }}
            size="small"
            sx={{ width: 100 }}
          />

          <Box className="cart-item-card__subtotal">
            <Typography variant="body2" color="text.secondary">
              Subtotal:
            </Typography>
            <Typography variant="h6" color="primary">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>

          <IconButton
            color="error"
            onClick={handleRemove}
            aria-label="Remove item"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
