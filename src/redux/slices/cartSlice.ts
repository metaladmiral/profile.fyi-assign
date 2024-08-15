import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { CartItem, CartItemActions } from "@/types";

interface CartItems {
  [key: string]: CartItem;
}

interface CartItemState {
  cartItems: CartItems;
}

let localCartItems = localStorage.getItem("cartItems");
if (!localCartItems) {
  localCartItems = "{}";
}
const parsedLocalCartItems = JSON.parse(localCartItems);

const initState: CartItemState = {
  cartItems: parsedLocalCartItems,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const payloadString = action.payload.toString();
      if (state.cartItems[payloadString]) {
        return;
      }
      state.cartItems[payloadString] = { id: action.payload, quantity: 1 };
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    changeItemQuantity: (state, action: PayloadAction<CartItemActions>) => {
      const payloadIdString = action.payload.id.toString();
      if (!state.cartItems[payloadIdString]) {
        return;
      }
      state.cartItems[action.payload.id].quantity +=
        action.payload.action === "increment" ? 1 : -1;

      if (state.cartItems[action.payload.id].quantity <= 0) {
        state.cartItems[action.payload.id].quantity = 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const payloadString = action.payload.toString();
      delete state.cartItems[payloadString];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// actions
export const { addItem, changeItemQuantity, removeItem } = cartSlice.actions;
export const selectItems = (state: RootState) => state.cart.cartItems;
export default cartSlice.reducer;
