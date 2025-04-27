"use client";

import { deliveryFee, getSubTotal } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatters";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import CartItem from "./CartItem";
// import { useEffect } from "react";

function CartItems() {
  const cart = useAppSelector(selectCartItems);
  const subTotal = getSubTotal(cart);

  // useEffect(() => {
  //   localStorage.setItem("cartItems", JSON.stringify(cart));
  // }, [cart]);

  return (
    <div>
      {cart && cart.length > 0 ? (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <div className="flex flex-col items-end justify-end pt-6">
            <span className="text-accent font-medium">
              Subtotal:
              <strong className="text-black ml-1">
                {formatCurrency(subTotal)}
              </strong>
            </span>
            <span className="text-accent font-medium">
              Delivery:
              <strong className="text-black ml-1">
                {formatCurrency(deliveryFee)}
              </strong>
            </span>
            <span className="text-accent font-medium">
              Total:
              <strong className="text-black ml-1">
                {formatCurrency(subTotal + deliveryFee)}
              </strong>
            </span>
          </div>
        </>
      ) : (
        <p className="text-accent">There are no items in your cart. Add some</p>
      )}
    </div>
  );
}

export default CartItems;
