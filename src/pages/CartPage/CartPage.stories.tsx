// CartPage.stories.tsx
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CartPage } from './CartPage';
import { CartProvider } from '../../context/CartContext';
import { CartItem } from '../../types/cart';

export default {
  title: 'Pages/CartPage',
  component: CartPage,
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </CartProvider>
);

export const EmptyCart = () => {
  // Clear localStorage so CartProvider sees an empty cart
  localStorage.removeItem('rokkitwear_cart');

  return (
    <Wrapper>
      <CartPage />
    </Wrapper>
  );
};


export const FilledCart = () => {
  const mockItems: CartItem[] = [
    {
        productId: 'p2',
        name: 'Oversized Crewneck Sweatshirt',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500&h=600&fit=crop',
        selectedColor: 'Grey',
        selectedSize: 'M',
        quantity: 1,
        },
    {
        productId: 'p1',
        name: 'Fan Favorite Heavyweight Hooded Unisex Sweatshirt',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
        selectedColor: 'Jet Black',
        selectedSize: 'L',
        quantity: 2,
    },
  ];

  // Preload localStorage so CartProvider picks them up
  localStorage.setItem('rokkitwear_cart', JSON.stringify(mockItems));

  return (
    <Wrapper>
      <CartPage />
    </Wrapper>
  );
};
