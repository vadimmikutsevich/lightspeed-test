import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { Product } from "@/types";
import { useCartStore } from "@/features/Cart/store/cart";

interface Props {
  className?: string;
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Card key={product.id} className="bg-pure-white shadow-sm flex flex-col">
      <CardHeader>
        <CardTitle className="text-charcoal-black line-clamp-2">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 space-y-4">
        {product.thumbnailUrl && (
          <div
            className="h-56 flex items-center justify-center rounded-md 
                bg-[repeating-linear-gradient(90deg,#ffffff,#ffffff_8px,#e5e7eb_8px,#e5e7eb_16px)]"
          >
            <img
              src={product.thumbnailUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}

        <p className="text-lg font-semibold text-accent-blue">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex-1" />

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
      </CardContent>
    </Card>
  );
}
