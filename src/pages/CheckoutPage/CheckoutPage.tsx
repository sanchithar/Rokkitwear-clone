import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import { Header } from '../../components/Header';
import { useCart } from '../../context/CartContext';
import { ShippingAddress, BillingAddress, PaymentInfo } from '../../types/cart';
import './CheckoutPage.scss';

const validationSchema = yup.object({
  shipping: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.number().integer('Please enter a valid number.').required('Please enter a number.'),
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zip: yup.string().required('ZIP code is required'),
    country: yup.string().required('Country is required'),
  }),
  payment: yup.object({
    cardNumber: yup.string().required('Card number is required').length(16, 'Invalid card number'),
    expiryDate: yup.string().required('Expiry date is required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid format (MM/YY)'),
    cvv: yup.string().required('CVV is required').length(3, 'CVV must be 3 digits'),
    cardholderName: yup.string().required('Cardholder name is required'),
  }),
});

const steps = ['Shipping Information', 'Payment', 'Review Order'];

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getItemCount, getSubtotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const subtotal = getSubtotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const formik = useFormik({
    initialValues: {
      shipping: {
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
      } as ShippingAddress,
      billing: {
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
      } as BillingAddress,
      payment: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
      } as PaymentInfo,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Mock order placement
      console.log('Order placed:', values);
      clearCart();
      navigate('/order-confirmation');
    },
  });

  const isShippingComplete = () => {
    const s = formik.values.shipping as Record<string, any>;
    const keys = ['name', 'email', 'phone', 'street', 'city', 'state', 'zip', 'country'];
    return keys.every((k) => (s[k] || '').toString().trim() !== '');
  };

  const isPaymentComplete = () => {
    const p = formik.values.payment as Record<string, any>;
    const keys = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
    return keys.every((k) => (p[k] || '').toString().trim() !== '');
  };

  const handleNext = async () => {
    // Ensure formik runs validation and update errors
    const errors = await formik.validateForm();

    if (activeStep === 0) {
      const shippingErrors = Object.keys((errors.shipping as Record<string, any>) || {});
      if (shippingErrors.length > 0) {
        shippingErrors.forEach((key) => formik.setFieldTouched(`shipping.${key}`));
        return;
      }
    } else if (activeStep === 1) {
      const paymentErrors = Object.keys((errors.payment as Record<string, any>) || {});
      if (paymentErrors.length > 0) {
        paymentErrors.forEach((key) => formik.setFieldTouched(`payment.${key}`));
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (items.length === 0) {
    return (
      <Box>
        <Header cartItemCount={getItemCount()} />
        <Container sx={{ py: 4 }}>
          <Alert severity="warning">
            Your cart is empty. <Button onClick={() => navigate('/')}>Continue Shopping</Button>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="checkout-page">
      <Header cartItemCount={getItemCount()} />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{xs : 12}}>
                  <TextField
                    fullWidth
                    name="shipping.name"
                    label="Full Name"
                    value={formik.values.shipping.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.shipping?.name && Boolean(formik.errors.shipping?.name)}
                    helperText={formik.touched.shipping?.name && formik.errors.shipping?.name}
                  />
                </Grid>
                <Grid size={{xs : 12, sm : 6}}>
                  <TextField
                    fullWidth
                    name="shipping.email"
                    label="Email"
                    type="email"
                    value={formik.values.shipping.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.shipping?.email && Boolean(formik.errors.shipping?.email)}
                    helperText={formik.touched.shipping?.email && formik.errors.shipping?.email}
                  />
                </Grid>
                <Grid size={{xs : 12, sm : 6}}>
                  <TextField
                    fullWidth
                    name="shipping.phone"
                    label="Phone"
                    type="tel"
                    value={formik.values.shipping.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      formik.setFieldValue('shipping.phone', value);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.shipping?.phone && Boolean(formik.errors.shipping?.phone)}
                    helperText={formik.touched.shipping?.phone && formik.errors.shipping?.phone}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      maxLength: 10,
                    }}
                  />
                </Grid>
                <Grid size={{xs : 12}}>
                  <TextField
                    fullWidth
                    name="shipping.street"
                    label="Street Address"
                    value={formik.values.shipping.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.shipping?.street && Boolean(formik.errors.shipping?.street)}
                    helperText={formik.touched.shipping?.street && formik.errors.shipping?.street}
                  />
                </Grid>
                <Grid size={{xs : 12, sm : 6}}>
                  <TextField
                    fullWidth
                    name="shipping.city"
                    label="City"
                    value={formik.values.shipping.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.shipping?.city && Boolean(formik.errors.shipping?.city)}
                    helperText={formik.touched.shipping?.city && formik.errors.shipping?.city}
                  />
                </Grid>
                <Grid size={{xs : 12, sm : 3}}>
                  <TextField
                    fullWidth
                    name="shipping.state"
                    label="State"
                    value={formik.values.shipping.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.shipping?.state && Boolean(formik.errors.shipping?.state)}
                    helperText={formik.touched.shipping?.state && formik.errors.shipping?.state}
                  />
                </Grid>
                <Grid size={{xs : 12, sm : 3}}>
                  <TextField
                    fullWidth
                    name="shipping.zip"
                    label="ZIP Code"
                    value={formik.values.shipping.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.shipping?.zip && Boolean(formik.errors.shipping?.zip)}
                    helperText={formik.touched.shipping?.zip && formik.errors.shipping?.zip}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeStep === 1 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{xs: 12}}>
                  <TextField
                    fullWidth
                    name="payment.cardholderName"
                    label="Cardholder Name"
                    value={formik.values.payment.cardholderName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.payment?.cardholderName && Boolean(formik.errors.payment?.cardholderName)}
                    helperText={formik.touched.payment?.cardholderName && formik.errors.payment?.cardholderName}
                  />
                </Grid>
                <Grid size={{xs : 12}}>
                  <TextField
                    fullWidth
                    name="payment.cardNumber"
                    label="Card Number"
                    value={formik.values.payment.cardNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.payment?.cardNumber && Boolean(formik.errors.payment?.cardNumber)}
                    helperText={formik.touched.payment?.cardNumber && formik.errors.payment?.cardNumber}
                    inputProps={{ maxLength: 16 }}
                  />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                  <TextField
                    fullWidth
                    name="payment.expiryDate"
                    label="Expiry Date (MM/YY)"
                    placeholder="MM/YY"
                    value={formik.values.payment.expiryDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.payment?.expiryDate && Boolean(formik.errors.payment?.expiryDate)}
                    helperText={formik.touched.payment?.expiryDate && formik.errors.payment?.expiryDate}
                  />
                </Grid>
                <Grid size={{xs : 12, sm : 6}}>
                  <TextField
                    fullWidth
                    name="payment.cvv"
                    label="CVV"
                    type="password"
                    value={formik.values.payment.cvv}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.payment?.cvv && Boolean(formik.errors.payment?.cvv)}
                    helperText={formik.touched.payment?.cvv && formik.errors.payment?.cvv}
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeStep === 2 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Review
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Items: {items.length}
              </Typography>
              <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
              <Typography>Tax: ${tax.toFixed(2)}</Typography>
              <Typography>Shipping: ${shipping === 0 ? 'FREE' : shipping.toFixed(2)}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: ${total.toFixed(2)}
              </Typography>
            </Paper>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" type="submit">
                Place Order
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !isShippingComplete()) || (activeStep === 1 && !isPaymentComplete())
                }
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
