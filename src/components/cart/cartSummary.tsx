"use client";

import { products } from "@/products";
import { Product } from "@/types";
import { useCartStorage } from "@/zustand/cartStore";

export default function CartSummary() {
  const items = useCartStorage((state) => state.cartItems);

  const renderCartSummary = Object.values(items).map((item) => (
    <div className="flex justify-between mt-2 mb-2" key={item.id}>
      <div className="block">
        <p className="font-bold">{products[item.id - 1].title}</p>
        <p className="text-xs">Quantity: {item.quantity}</p>
      </div>
      <span>${products[item.id - 1].price * item.quantity}</span>
    </div>
  ));

  let totalCartPrice = 0;
  for (const item in items) {
    const productDetails = products[items[item].id - 1] as Product;
    totalCartPrice += productDetails.price * items[item].quantity;
  }
  const totalCartPriceString = parseFloat(totalCartPrice.toString()).toFixed(2);

  return (
    <>
      {renderCartSummary}
      <div className="flex justify-between mt-5">
        <span className="font-bold">Shipping</span>
        <span className="text-xs text-green-500">Free</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold">Total</span>
        <span>${totalCartPriceString}</span>
      </div>
    </>
  );
}
