// schemas/categorySchema.ts
import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string()
    .min(1, 'Category name is required')
    .min(2, 'Category name must be at least 2 characters')
    .max(100, 'Category name must not exceed 100 characters'),
  description: z.string().optional().nullable(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;