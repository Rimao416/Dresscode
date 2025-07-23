// hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getCategories } from '@/services/category.service';
import { useCategoryStore } from '@/store/categoryStore';

export const useCategories = () => {
  const { categories, setCategories, setError, setLoading } = useCategoryStore();

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handle loading state
  useEffect(() => {
    setLoading(isLoading || isFetching);
  }, [isLoading, isFetching, setLoading]);

  // Handle data updates
  useEffect(() => {
    if (data) {
      const formattedData = data.map(category => ({
        ...category,
        createdAt: category.createdAt instanceof Date ? category.createdAt.toISOString() : category.createdAt,
        updatedAt: category.updatedAt instanceof Date ? category.updatedAt.toISOString() : category.updatedAt,
      }));
      setCategories(formattedData);
    }
  }, [data, setCategories]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    }
  }, [error, setError]);

  return {
    data: categories,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};

// hooks/useCategory.ts


