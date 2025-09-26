import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/features/Cart/store/cart";
import ProductQuantityControl from "@/features/Product/components/ProductQuantityControl";

interface Props {
  item: CartItem;
}

export default function CartItemCard({ item }: Props) {
  const { addItem, decrementItem, removeItem } = useCartStore();

  return (
    <Card className="bg-pure-white shadow-sm">
      <CardContent className="flex gap-4 p-4">
        <Link to={`/product/${item.id}`}>
          {item.thumbnailUrl && (
            <div
              className="h-26 w-20 flex items-center justify-center
      bg-[repeating-linear-gradient(90deg,#ffffff,#ffffff_4px,#e5e7eb_4px,#e5e7eb_8px)]"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </Link>

        <div className="flex flex-1 items-baseline justify-between">
          <div className="flex flex-col">
            <Link to={`/product/${item.id}`} className="hover:underline">
              <p className="font-medium text-charcoal-black">{item.name}</p>
            </Link>
            <p className="text-sm text-graphite-gray">
              ${item.price.toFixed(2)}
            </p>
          </div>

          <Button
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50"
            onClick={() => removeItem(item.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>

      <div className="p-4 w-52">
        <ProductQuantityControl
          quantity={item.quantity}
          onDecrement={() => decrementItem(item.id)}
          onIncrement={() =>
            addItem({
              id: item.id,
              name: item.name,
              price: item.price,
              thumbnailUrl: item.thumbnailUrl,
            })
          }
        />
      </div>
    </Card>
  );
}
