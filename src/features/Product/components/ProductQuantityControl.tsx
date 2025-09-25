import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export default function ProductQuantityControl({
  quantity,
  onDecrement,
  onIncrement,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="outline"
        size="icon"
        className="bg-concrete-gray text-charcoal-black hover:bg-concrete-gray/80 w-1/4"
        onClick={onDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="w-10 text-center font-medium">{quantity}</span>

      <Button
        variant="outline"
        size="icon"
        className="bg-accent-blue text-pure-white hover:bg-accent-blue/90 w-1/4"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
