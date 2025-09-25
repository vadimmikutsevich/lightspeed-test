import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  thumbnailUrl: z.string().optional(),
});

export const CategoriesResponseSchema = z.object({
  items: z.array(CategorySchema),
});

export const CategoryResponseSchema = z.object({
  items: z.array(CategorySchema),
});

export type Category = z.infer<typeof CategorySchema>;
