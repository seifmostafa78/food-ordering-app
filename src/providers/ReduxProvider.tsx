"use client";

import { loadCartFromStorage } from "@/redux/features/cart/cartSlice";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      store.dispatch(loadCartFromStorage(JSON.parse(storedItems)));
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
