import { useParams } from "react-router";

import { useCartStore } from "@/features/Cart/store/cart";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import ProductQuantityControl from "@/features/Product/components/ProductQuantityControl";
import { useGetProduct } from "@/features/Product/hooks/useGetProduct";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useGetProduct(Number(id));
  const { addItem, decrementItem, items } = useCartStore();

  if (isLoading) return <Loader />;
  if (isError || !product)
    return <p className="text-red-600">Product not found</p>;

  const inCart = items.find((i) => i.id === product.id);

  return (
    <div className="p-6 md:p-10 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 flex items-center justify-center bg-smoke-white rounded-md p-6 max-w-md mx-auto lg:max-w-none">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-[400px] w-auto object-contain"
            />
          ) : (
            <span className="text-graphite-gray">No image</span>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold text-charcoal-black mb-4">
            {product.name}
          </h1>

          {product.description ? (
            <div
              className="prose prose-sm md:prose max-w-prose text-graphite-gray mb-6"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : (
            <p className="text-graphite-gray">No description available</p>
          )}

          <p className="text-xl md:text-2xl font-semibold text-accent-blue mb-6">
            ${product.price.toFixed(2)}
          </p>

          {inCart ? (
            <ProductQuantityControl
              quantity={inCart.quantity}
              onDecrement={() => decrementItem(product.id)}
              onIncrement={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  thumbnailUrl: product.thumbnailUrl,
                })
              }
            />
          ) : (
            <Button
              className="bg-accent-blue text-pure-white hover:bg-accent-blue/90 w-full md:w-auto"
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  thumbnailUrl: product.thumbnailUrl,
                })
              }
            >
              Buy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
