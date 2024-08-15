import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";

type CartItemState = {
  cartItems: Array<number>;
};

// initial state
let localCartItems = localStorage.getItem("cartItems");
if (!localCartItems) {
  localCartItems = "[]";
}
const parsedLocalCartItems = JSON.parse(localCartItems);

const initState: CartItemState = {
  cartItems: parsedLocalCartItems,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addItem: (state, action: PayloadAction<Array<number>>) => {
      if (state.cartItems.includes(action.payload[0])) {
        return;
      }
      state.cartItems.push(action.payload[0]);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // removeItem: (state, action) => {
    //   state.cartItems = state.cartItems.filter(
    //     (item) => item.id !== action.payload.id
    //   );
    // },
  },
});

// actions
export const { addItem } = cartSlice.actions;
// export const { addItem, removeItem } = cartSlice.actions;
export const selectItems = (state: RootState) => state.cart.cartItems;
export default cartSlice.reducer;
