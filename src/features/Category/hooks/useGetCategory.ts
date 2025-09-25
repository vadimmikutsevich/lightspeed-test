import { useQuery } from "@tanstack/react-query";

import { BASE_URL, TOKEN } from "@/app/constants";
import { CategoryResponseSchema } from "@/types";

async function getCategory(categoryId: number) {
  const res = await fetch(`${BASE_URL}/categories?parentIds=${categoryId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  return CategoryResponseSchema.parse(data);
}

export function useGetSubcategories(categoryId: number) {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategory(categoryId),
    enabled: !!categoryId,
  });
}
