// types/category.type.ts
// import { Product } from '@/types/product.type';

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
//   products?: Product[];
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CategoryFormData = {
  name: string;
  parentId?: string;
};

export type CreateCategoryData = {
  name: string;
  parentId?: string | null;
};

export type UpdateCategoryData = {
  id: string;
  name: string;
  parentId?: string | null;
};