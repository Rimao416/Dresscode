'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@/types/category.type'
import { categorySchema,CategoryFormData } from '@/schemas/category.schema'
import { useRootCategories } from '@/hooks/useRootCategories'
import { useCategoryStore } from '@/store/categoryStore'
import FormField from '../ui/formfield'
import Input from '../ui/input'
import Button from '../ui/button'
import Select from '../ui/select'

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  initialData?: Category;
  isSubmitting: boolean;
  submitButtonText: string;
}

export default function CategoryForm({
  onSubmit,
  initialData,
  isSubmitting,
  submitButtonText,
}: CategoryFormProps) {
  const { data: rootCategories = [], isLoading: isRootCategoriesLoading } = useRootCategories();
  const { categories } = useCategoryStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {}
  });

  const currentParentId = watch('parentId');

  // Get available parent categories (exclude current category and its children if editing)
  const getAvailableParentCategories = () => {
    if (!initialData) return categories;
    
    const getAllDescendants = (categoryId: string): string[] => {
      const descendants: string[] = [];
      const children = categories.filter(cat => cat.parentId === categoryId);
      
      children.forEach(child => {
        descendants.push(child.id);
        descendants.push(...getAllDescendants(child.id));
      });
      
      return descendants;
    };

    const excludedIds = [initialData.id, ...getAllDescendants(initialData.id)];
    return categories.filter(cat => !excludedIds.includes(cat.id));
  };

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('parentId', initialData.parentId || '');
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data: CategoryFormData) => {
    // Convert empty string to null for parentId
    const formattedData = {
      ...data,
      parentId: data.parentId === '' ? null : data.parentId
    };

    await onSubmit(formattedData);
    
    if (!initialData) {
      reset();
    }
  };

  const availableCategories = getAvailableParentCategories();

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <FormField
        label="Category name"
        htmlFor="name"
        error={errors.name?.message}
      >
        <Input
          id="name"
          placeholder="Enter category name"
          {...register('name')}
        />
      </FormField>

      <FormField
        label="Parent Category"
        htmlFor="parentId"
        error={errors.parentId?.message}
      >
        <Select
          id="parentId"
          {...register("parentId")}
        >
          <option value="">No parent (Root category)</option>
          {isRootCategoriesLoading ? (
            <option disabled>Loading...</option>
          ) : (
            availableCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.parent ? `${category.parent.name} > ${category.name}` : category.name}
              </option>
            ))
          )}
        </Select>
      </FormField>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitButtonText}
        </Button>
      </div>
    </form>
  )
}