import { BASE_URL, TOKEN } from "@/app/constants";
import { ProductsResponseSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return ProductsResponseSchema.parse(data);
}

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
