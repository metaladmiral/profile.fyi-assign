import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { CartItems } from "@/types";

interface CartState {
  cartItems: CartItems;
  addItem: (item: CartItems) => void;
}

export const useCartStorage = create<CartState>()(
  persist(
    (set) => ({
      cartItems: {},
      addItem: (cartItemData) =>
        set(
          produce((state) => {
            Object.assign(state.cartItems, cartItemData);
          })
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
