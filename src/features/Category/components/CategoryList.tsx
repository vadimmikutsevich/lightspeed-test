import { Loader } from "@/components/ui/loader";
import { useGetRootCategories } from "../hooks/useGetRootCategories";
import CategoryListItem from "./CategoryListItem";

export default function CategoryList() {
  const { data, isLoading, isError } = useGetRootCategories();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="text-red-600">Error loading categories</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {data?.items.map((cat) => (
        <CategoryListItem cat={cat} key={cat.id} />
      ))}
    </div>
  );
}
