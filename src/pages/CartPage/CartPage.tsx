import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import { Header } from '../../components/Header';
import { CartItemCard } from '../../components/CartItemCard';
import { useCart } from '../../context/CartContext';
import './CartPage.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, getItemCount, getSubtotal } = useCart();

  const subtotal = getSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <Box className="cart-page">
        <Header cartItemCount={getItemCount()} />
        <Container sx={{ py: 4 }}>
          <Alert severity="info">
            Your cart is empty.{' '}
            <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="cart-page">
      <Header cartItemCount={getItemCount()} />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>

        <Box className="cart-page__content">
          {/* Cart Items */}
          <Box className="cart-page__items">
            {items.map((item, index) => (
              <CartItemCard key={`${item.productId}-${item.selectedSize}-${item.selectedColor}-${index}`} item={item} />
            ))}
          </Box>

          {/* Order Summary */}
          <Paper className="cart-page__summary" elevation={2}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box className="cart-page__summary-row">
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box className="cart-page__summary-row">
              <Typography>Tax (8%):</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>

            <Box className="cart-page__summary-row">
              <Typography>Shipping:</Typography>
              <Typography>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Typography>
            </Box>

            {subtotal < 50 && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Free shipping on orders over $50
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Box className="cart-page__summary-row cart-page__summary-total">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate('/checkout')}
              sx={{ mt: 3 }}
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
