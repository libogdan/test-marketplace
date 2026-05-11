import { Minus, Plus } from "lucide-react";
import type { Product } from "@/entities/products";

interface Props {
  product: Product;
  quantity?: number;
  onQuantityChange?: (newQuantity: number) => void;
}

export const ProductListItem = ({
  product,
  quantity = 1,
  onQuantityChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
      <div className="flex flex-1 items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full object-cover">
          <img src={product.image} alt={product.name} className="h-full w-full" />
        </div>
        <div>
          <p className="text-lg">{product.name}</p>
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
          className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => onQuantityChange?.(quantity + 1)}
          className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
