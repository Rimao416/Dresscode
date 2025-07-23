// hooks/useRootCategories.ts
import { useQuery } from '@tanstack/react-query';
import { getRootCategories } from '@/services/category.service';

export const useRootCategories = () => {
  return useQuery({
    queryKey: ['categories', 'root'],
    queryFn: getRootCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
