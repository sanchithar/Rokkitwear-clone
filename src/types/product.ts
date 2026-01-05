export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  popularity?: number;
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

// Helper to convert backend product to frontend product
export const convertToProduct = (backendProduct: BackendProduct): Product => ({
  id: backendProduct.id,
  name: backendProduct.name,
  price: backendProduct.price,
  image: backendProduct.imageUrl,
  category: backendProduct.category,
  popularity: 0,
});

