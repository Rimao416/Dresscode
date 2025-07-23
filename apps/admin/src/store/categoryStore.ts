// stores/categoryStore.ts
import { create } from 'zustand';
import { Category } from '@/types/category.type';

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (updatedCategory: Category) => void;
  deleteCategory: (id: string) => void;
  selectCategory: (category: Category | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Helper methods
  getRootCategories: () => Category[];
  getCategoryChildren: (parentId: string) => Category[];
  getCategoryById: (id: string) => Category | undefined;
  getCategoryPath: (categoryId: string) => Category[];
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,

  setCategories: (categories) => set({ categories }),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  updateCategory: (updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),

  selectCategory: (category) => set({ selectedCategory: category }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Helper methods
  getRootCategories: () => {
    const { categories } = get();
    return categories.filter(category => !category.parentId);
  },

  getCategoryChildren: (parentId: string) => {
    const { categories } = get();
    return categories.filter(category => category.parentId === parentId);
  },

  getCategoryById: (id: string) => {
    const { categories } = get();
    return categories.find(category => category.id === id);
  },

  getCategoryPath: (categoryId: string) => {
    const { categories, getCategoryById } = get();
    const path: Category[] = [];
    let currentId: string | null | undefined = categoryId;

    while (currentId) {
      const category = getCategoryById(currentId);
      if (!category) break;
      path.unshift(category);
      currentId = category.parentId;
    }

    return path;
  },
}));