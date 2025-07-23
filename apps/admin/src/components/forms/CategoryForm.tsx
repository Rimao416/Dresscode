'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@/types/category.type'
import { categorySchema, CategoryFormData } from '@/schemas/category.schema'
import { useTheme } from '@/context/ThemeContext'
import FormField from '../ui/formfield'
import Input from '../ui/input'
import Button from '../ui/button'

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
  const { isDarkMode } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {}
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('description', initialData.description);
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data: CategoryFormData) => {
    await onSubmit(data);
   
    if (!initialData) {
      reset();
    }
  };

  return (
    <div className={`p-6 rounded-xl transition-all duration-300 ${
      isDarkMode
        ? 'bg-slate-800/50 border-slate-700'
        : 'bg-white/70 border-slate-200'
    } border backdrop-blur-sm shadow-lg`}>
     
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
       
        {/* Category Name Field - REQUIS */}
        <FormField
          label="Category name"
          htmlFor="name"
          error={errors.name?.message}
          required={true}
        >
          <Input
            id="name"
            placeholder="Enter category name"
            {...register('name')}
          />
        </FormField>

        {/* Category Description Field - OPTIONNEL */}
        <FormField
          label="Category description"
          htmlFor="description"
          error={errors.description?.message}
          required={false}
          helpText="Optional field to provide additional details about the category"
        >
          <Input
            id="description"
            placeholder="Enter category description (optional)"
            {...register('description')}
          />
        </FormField>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  )
}