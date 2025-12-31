import { useQuery } from '@tanstack/react-query';
import { getSchool } from '../services/schoolService';

export const useSchoolData = (schoolId?: string) => {
  return useQuery({
    queryKey: ['school', schoolId],
    queryFn: () => getSchool(schoolId as string),
    enabled: Boolean(schoolId),
  });
};
