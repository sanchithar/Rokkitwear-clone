import { useQuery } from '@tanstack/react-query';
import { getAllSchools } from '../services/schoolService';

export const useSchoolsData = () => {
  return useQuery({
    queryKey: ['schools'],
    queryFn: () => getAllSchools(),
  });
};
