import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { CartItems, CartItemActions } from "@/types";

interface CartState {
  cartItems: CartItems;
  initCartItems: (cart: CartItems) => void;
  addItem: (itemId: number) => void;
  updateItemQuantity: (itemDetails: CartItemActions) => void;
  removeItem: (itemId: number) => void;
}

export const useCartStorage = create<CartState>()(
  persist(
    (set) => ({
      cartItems: {},
      initCartItems: (cart) => set({ cartItems: cart }),
      addItem: (itemId) =>
        set(
          produce((state) => {
            if (state.cartItems[itemId.toString()]) {
              state.cartItems[itemId.toString()].quantity += 1;
              return;
            }
            state.cartItems[itemId.toString()] = {
              id: itemId,
              quantity: 1,
            };
          })
        ),
      updateItemQuantity: (itemDetails) =>
        set(
          produce((state) => {
            if (itemDetails.action === "increment") {
              state.cartItems[itemDetails.id.toString()].quantity += 1;
              return;
            }

            //decrement logic
            if (state.cartItems[itemDetails.id.toString()].quantity === 1) {
              return;
            }

            state.cartItems[itemDetails.id.toString()].quantity -= 1;
          })
        ),

      removeItem: (itemId: number) =>
        set(
          produce((state) => {
            delete state.cartItems[itemId.toString()];
          })
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);
