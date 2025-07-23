'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import PageHeader from '@/components/common/PageHeader'
import { useCategoryStore } from '@/store/categoryStore'
import { Category } from '@/types/category.type'
import CategoryForm from '@/components/forms/CategoryForm'
import { createCategory } from '@/services/category.service'
import { useMessages } from '@/context/useMessage'
import { CategoryFormData } from '@/schemas/category.schema'
// import { useAuth } from '@/context/useAuth'

export default function AddCategoryPage() {
//   const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setMessage } = useMessages()
  const { setLoading, setError } = useCategoryStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true)
    setLoading(true)

    try {
      const newCategory = await createCategory({
        name: data.name,
        parentId: data.parentId || null,
      })

      const formattedCategory: Category = {
        id: newCategory.id,
        name: newCategory.name,
        slug: newCategory.slug,
        parentId: newCategory.parentId,
        parent: newCategory.parent || null,
        children: newCategory.children || [],
        createdAt: new Date(newCategory.createdAt),
        updatedAt: new Date(newCategory.updatedAt),
      }

      // Mise à jour du cache React Query
      queryClient.setQueryData<Category[]>(['categories'], (old = []) => [
        ...old,
        formattedCategory,
      ])

      // Mise à jour du cache pour les catégories racines si c'est une catégorie racine
      if (!formattedCategory.parentId) {
        queryClient.setQueryData<Category[]>(['rootCategories'], (old = []) => [
          ...old,
          formattedCategory,
        ])
      }

      setMessage('Category created successfully', 'success')
      router.push('/dashboard/categories')
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      setMessage(errorMessage, 'error')
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className='max-w-full'>
        <PageHeader
          breadcrumb={['Category', 'Add a new category']}
          title='Category management'
        />

        <div className='bg-white rounded-lg p-6 shadow-sm'>
          <CategoryForm
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitButtonText='Add category'
          />
        </div>
      </div>
    </DashboardLayout>
  )
}