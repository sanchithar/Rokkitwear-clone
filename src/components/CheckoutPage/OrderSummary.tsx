import { Typography, Paper } from '@mui/material';

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export const OrderSummary = ({ itemCount, subtotal, tax, shipping, total }: OrderSummaryProps) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Order Review
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Items: {itemCount}
      </Typography>
      <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
      <Typography>Tax: ${tax.toFixed(2)}</Typography>
      <Typography>Shipping: ${shipping === 0 ? 'FREE' : shipping.toFixed(2)}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: ${total.toFixed(2)}
      </Typography>
    </Paper>
  );
};