import { Box, Container, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

interface EmptyCartProps {
  cartItemCount: number;
}

export const EmptyCart = ({ cartItemCount }: EmptyCartProps) => {
  const navigate = useNavigate();
  
  return (
    <Box>
      <Header cartItemCount={cartItemCount} />
      <Container sx={{ py: 4 }}>
        <Alert severity="warning">
          Your cart is empty. <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </Alert>
      </Container>
    </Box>
  );
};