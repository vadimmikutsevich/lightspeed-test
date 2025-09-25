import { useGetProducts } from "../hooks/useGetProducts";
import { Loader } from "@/components/ui/loader";
import ProductListItem from "./ProductListItem";

export default function ProductList() {
  const { data, isLoading, isError } = useGetProducts();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="text-red-600">Error loading products</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.items.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
