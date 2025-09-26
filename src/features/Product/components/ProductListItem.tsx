import { Link } from "react-router";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useCartStore } from "@/features/Cart/store/cart";
import ProductQuantityControl from "./ProductQuantityControl";

interface Props {
  className?: string;
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  const { addItem, decrementItem, items } = useCartStore();
  const inCart = items.find((i) => i.id === product.id);

  return (
    <Card key={product.id} className="bg-pure-white shadow-sm flex flex-col">
      <CardHeader>
        <CardTitle className="text-charcoal-black line-clamp-2">
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 space-y-4">
        <Link to={`/product/${product.id}`}>
          {product.thumbnailUrl && (
            <div
              className="h-56 flex items-center justify-center
              bg-[repeating-linear-gradient(90deg,#ffffff,#ffffff_8px,#e5e7eb_8px,#e5e7eb_16px)]"
            >
              <img
                src={product.thumbnailUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </Link>
        <p className="text-lg font-semibold text-accent-blue">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex-1" />

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
            className="bg-accent-blue text-pure-white hover:bg-accent-blue/90 w-full"
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
      </CardContent>
    </Card>
  );
}
