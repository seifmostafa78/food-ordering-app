import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { CartItem as CartItemType, removeItemFromCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";

function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useAppDispatch();
  return (
    <li className="border-b border-gray-200 pb-4">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-24 h-24">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold md:text-lg">{item.name}</h4>
            <div className="relative">
              {item.size && (
                <span className="text-sm text-accent">
                  Size: {item.size.name}
                </span>
              )}

              <div className="flex gap-1">
                <span>Extras:</span>
                {item.extras && item.extras.length > 0 ? (
                  <ul>
                    {item.extras.map((extra) => (
                      <li key={extra.id}>
                        <span className="text-sm text-accent">
                          {extra.name} {formatCurrency(extra.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-accent">____</p>
                )}
              </div>

              <span className="absolute right-0 top-0 text-sm text-black">
                x{item.quantity}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 justify-end">
          <strong className="text-black ">
            {formatCurrency(item.basePrice + (item.size?.price || 0))}
          </strong>
          <Button
            onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
            variant="secondary"
            className="border"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
