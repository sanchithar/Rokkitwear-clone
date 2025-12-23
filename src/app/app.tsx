import { Route, Routes } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { SchoolLandingPage } from '../pages/SchoolLandingPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

export function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<SchoolLandingPage />} />
        <Route path="/schools" element={<SchoolLandingPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
