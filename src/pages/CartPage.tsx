import { useCartStore } from "@/features/Cart/store/cart";
import CartItemCard from "@/features/Cart/components/CartItemCard";
import PurchaseDialog from "@/features/Cart/components/PurchaseDialog";

export default function CartPage() {
  const { items, clearCart } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <p className="text-center text-graphite-gray mt-10">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {items.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}

      <div className="flex justify-between items-center border-t border-concrete-gray pt-4">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <PurchaseDialog onConfirm={clearCart} />
      </div>
    </div>
  );
}
