"use client";

import { ManagementPageConfig } from "@/types/management.type";
import { Category } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ManagementPage from "@/components/common/ManagementPage";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useCategories } from "@/hooks/categories/useCategories";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";

export default function CategoriesPage() {
  const router = useRouter();
  const { data: categories, isLoading, isFetching, error, refetch } = useCategories();
  const { mutate: deleteCategories, isPending: isDeleting } = useDeleteCategory();

  // État pour le modal de suppression
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    categoryIds: number[];
    categoryName: string;
  }>({
    isOpen: false,
    categoryIds: [],
    categoryName: ''
  });

  // Ouvrir le modal de suppression
  const handleDeleteClick = useCallback((id: string) => {
    const categoryId = parseInt(id);
    const category = categories?.find(c => c.id === categoryId.toString());
    const categoryName = category?.name || 'category';

    setDeleteModal({
      isOpen: true,
      categoryIds: [categoryId],
      categoryName,
    });
  }, [categories]);

  // Confirmer suppression
//   const handleConfirmDelete = () => {
//     deleteCategories(deleteModal.categoryIds, {
//       onSuccess: () => {
//         setDeleteModal({ isOpen: false, categoryIds: [], categoryName: '' });
//         console.log('Category deleted successfully');
//       },
//       onError: (error) => {
//         console.error('Error deleting category:', error);
//         setDeleteModal({ isOpen: false, categoryIds: [], categoryName: '' });
//       },
//     });
//   };

  // Fermer le modal
  const handleCloseModal = () => {
    if (!isDeleting) {
      setDeleteModal({ isOpen: false, categoryIds: [], categoryName: '' });
    }
  };

  // Filtres
  const filterOptions = useMemo(() => [
    // {
    //   key: 'createdAt',
    //   label: 'Date',
    //   options: [],
    // },
  ], []);

  // Config de la page de gestion
  const categoriesConfig: ManagementPageConfig<Category> = useMemo(() => ({
    title: 'Category Management',
    useDataHook: () => ({
      data: categories,
      isLoading,
      isFetching,
      error: error ?? undefined,
      refetch,
    }),
    columns: [
      {
        accessorKey: 'id',
        header: 'Id',
        cell: ({ getValue }) => (
          <span className="text-gray-500">{getValue() as number}</span>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Category Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ getValue }) => (
          <span className="text-gray-500">{getValue() as string}</span>
        ),
      },
    //   {
    //     accessorKey: 'createdAt',
    //     header: 'Date Created',
    //     cell: ({ getValue }) => {
    //       const value = getValue() as string;
    //       const date = format(new Date(value), 'dd/MM/yyyy');
    //       return <span className="text-gray-500">{date}</span>;
    //     },
    //   },
    ] as ColumnDef<Category>[],
    addNewButton: {
      label: 'Add new category',
      onClick: () => router.push('/dashboard/categories/add'),
    },
    actions: [
      {
        label: 'Edit',
        variant: 'secondary',
        onClick: (id) => router.push(`/dashboard/settings/categories/${id}/edit-category`),
      },
      {
        label: 'Delete',
        variant: 'danger',
        onClick: (id) => handleDeleteClick(id),
      },
    ],
    filters: filterOptions,
  }), [categories, isLoading, isFetching, error, refetch, router, filterOptions, handleDeleteClick]);

  return (
    <DashboardLayout>
      <ManagementPage config={categoriesConfig} />

      {/* Modal de confirmation de suppression */}
      {/* <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        itemName={deleteModal.categoryName}
        itemCount={deleteModal.categoryIds.length}
        isProcessing={isDeleting}
        actionType="delete"
      /> */}
    </DashboardLayout>
  );
}
