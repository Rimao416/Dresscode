// services/category.service.ts
import { Category, CreateCategoryData, UpdateCategoryData } from '@/types/category.type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
   
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
   
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
   
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }
   
    return await response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Create new category
export const createCategory = async (data: CreateCategoryData): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
   
    if (!response.ok) {
      throw new Error(`Failed to create category: ${response.statusText}`);
    }
   
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Update category
export const updateCategory = async (data: UpdateCategoryData): Promise<Category> => {
  try {
    const { id, ...updateData } = data;
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
   
    if (!response.ok) {
      throw new Error(`Failed to update category: ${response.statusText}`);
    }
   
    return await response.json();
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Delete category
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
   
    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};