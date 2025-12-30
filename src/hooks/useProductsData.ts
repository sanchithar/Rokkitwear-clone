import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/schoolService';

export const useProductsData = (schoolId?: string) => {
  return useQuery({
    queryKey: ['products', schoolId],
    queryFn: () => getProducts(schoolId),
  });
};
