import { BASE_URL, TOKEN } from "@/app/constants";
import { ProductsResponseSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function getProducts(categoryId?: number) {
  const url = categoryId
    ? `${BASE_URL}/products?category=${categoryId}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return ProductsResponseSchema.parse(data);
}

export function useGetProducts(categoryId?: number) {
  return useQuery({
    queryKey: ["products", categoryId ?? "all"],
    queryFn: () => getProducts(categoryId),
  });
}
