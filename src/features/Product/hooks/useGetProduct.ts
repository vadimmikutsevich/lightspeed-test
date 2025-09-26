import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { BASE_URL, TOKEN } from "@/app/constants";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  thumbnailUrl: z.string().optional(),
  hdThumbnailUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});

async function getProduct(id: number) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return ProductSchema.parse(data);
}

export function useGetProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}
