import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { CartItems } from "@/types";

interface CartState {
  cartItems: CartItems;
  addItem: (itemId: number) => void;
}

export const useCartStorage = create<CartState>()(
  persist(
    (set) => ({
      cartItems: {},
      addItem: (itemId) =>
        set(
          produce((state) => {
            state.cartItems[itemId.toString()] = { id: itemId, quantity: 1 };
          })
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
