// hooks/useCategoryChildren.ts
import { useQuery } from '@tanstack/react-query';
import { getCategoryChildren } from '@/services/category.service';

export const useCategoryChildren = (parentId: string) => {
  const isValidId = !!parentId && parentId.trim() !== '';

  return useQuery({
    queryKey: ['categories', 'children', parentId],
    queryFn: () => getCategoryChildren(parentId),
    enabled: isValidId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};