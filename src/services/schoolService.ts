import api from './api';

export interface School {
  id: string;
  name: string;
  location: string;
  bannerUrl: string;
  logoUrl: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface BackendProduct {
  id: string;
  schoolId: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  imageUrl: string;
  description: string;
  availableColors: ProductColor[];
  availableSizes: string[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface OrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentInfo: PaymentInfo;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
}

// Get school details by ID
export const getSchool = async (schoolId: string): Promise<School> => {
  const response = await api.get<School>(`/school/${schoolId}`);
  return response.data;
};

// Get all products or filter by schoolId
export const getProducts = async (schoolId?: string): Promise<BackendProduct[]> => {
  const response = await api.get<BackendProduct[]>('/products', {
    params: schoolId ? { schoolId } : {},
  });
  return response.data;
};

// Get all schools
export const getAllSchools = async (): Promise<School[]> => {
  const response = await api.get<School[]>('/schools');
  return response.data;
};

// Get single product by ID
export const getProduct = async (productId: string): Promise<BackendProduct> => {
  const response = await api.get<BackendProduct>(`/products/${productId}`);
  return response.data;
};

// Place an order
export const placeOrder = async (orderData: OrderRequest): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>('/orders', orderData);
  return response.data;
};
