export interface CartItem {
  id: number;
  quantity?: number;
}

export interface CartItems {
  [itemId: string]: CartItem;
}

export interface CartItemActions extends CartItem {
  action: "increment" | "decrement";
}

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};
