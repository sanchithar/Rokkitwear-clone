import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../services/schoolService';

export const useProductData = (productId?: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId!),
    enabled: !!productId,
  });
};
