export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  popularity?: number;
}
