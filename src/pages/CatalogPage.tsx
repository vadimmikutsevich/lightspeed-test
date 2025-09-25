import CategoryList from "@/features/Category/components/CategoryList";
import ProductList from "@/features/Product/components/ProductList";

export default function CatalogPage() {
  return (
    <div className="space-y-12 p-4">
      <section>
        <h2 className="text-xl font-bold mb-6 text-charcoal-black">
          Categories
        </h2>
        <CategoryList />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 text-charcoal-black">Products</h2>
        <ProductList />
      </section>
    </div>
  );
}
