import { z } from "zod";

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  thumbnailUrl: z.string().optional(),
});

export const ProductsResponseSchema = z.object({
  items: z.array(ProductSchema),
});

export type Product = z.infer<typeof ProductSchema>;
