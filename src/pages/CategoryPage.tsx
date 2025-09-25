import { useParams } from "react-router";

import { Loader } from "@/components/ui/loader";
import CategoryListItem from "@/features/Category/components/CategoryListItem";
import ProductList from "@/features/Product/components/ProductList";
import { useGetSubcategories } from "@/features/Category/hooks/useGetCategory";

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = Number(id);

  const {
    data: subcategories,
    isLoading: subLoading,
    isError: subError,
  } = useGetSubcategories(categoryId);

  if (subLoading) return <Loader />;
  if (subError) return <p className="text-red-600">Error loading category</p>;

  return (
    <div className="space-y-8 p-4">
      {/* Subcategories */}
      {subcategories?.items.length ? (
        <section>
          <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {subcategories.items.map((cat) => (
              <CategoryListItem key={cat.id} cat={cat} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Products */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Products</h2>
        <ProductList categoryId={categoryId} />
      </section>
    </div>
  );
}
