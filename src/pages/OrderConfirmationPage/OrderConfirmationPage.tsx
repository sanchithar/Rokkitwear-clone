import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Header } from '../../components/Header';
import { useCart } from '../../context/CartContext';
import './OrderConfirmationPage.scss';

export const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);

  return (
    <Box className="order-confirmation-page">
      <Header cartItemCount={getItemCount()} />
      <Container sx={{ py: 6 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          
          <Typography variant="h4" gutterBottom>
            Order Placed Successfully!
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            Order ID: {orderId}
          </Typography>

          <Alert severity="success" sx={{ mt: 3, mb: 3 }}>
            Thank you for your order! A confirmation email has been sent to your email address.
          </Alert>

          <Typography variant="body1" paragraph>
            Your order is being processed and will be shipped soon.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrderConfirmationPage;
