import { useQuery } from "@tanstack/react-query";

import { BASE_URL, TOKEN } from "@/app/constants";
import { CategoriesResponseSchema } from "@/types";

async function getRootCategories() {
  const res = await fetch(
    `${BASE_URL}/categories?parent=0&responseFields=items(id,name,thumbnailUrl,parentId)`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return CategoriesResponseSchema.parse(data);
}

export function useGetRootCategories() {
  return useQuery({
    queryKey: ["categories", "root"],
    queryFn: getRootCategories,
  });
}
