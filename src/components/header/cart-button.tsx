"use client";
import { ShoppingCartIcon } from "lucide-react";
import Link from "../link";
import { Routes } from "@/constants/enums";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { getCartQuantity } from "@/lib/cart";

function CartButton() {
  const cart = useAppSelector(selectCartItems);
  const cartQuantity = getCartQuantity(cart);
  return (
    <Link href={Routes.CART} className="block relative group">
      <span className="absolute top-[-8] start-4 bg-primary text-sm text-white w-5 h-5 rounded-full text-center">
        {cartQuantity}
      </span>
      <ShoppingCartIcon className="text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6" />
    </Link>
  );
}

export default CartButton;
