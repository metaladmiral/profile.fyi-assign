"use client";
import { useEffect, useState } from "react";

type CartItem = {
  id: string;
};

type Product = {
  id: string;
  title: string;
  price: string;
  images: string[];
};

export default function ProductList({ products }: { products: Product[] }) {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

  useEffect(() => {
    let cartItemStr = localStorage.getItem("cartItems") || null;
    if (!cartItemStr) {
      cartItemStr = "[]";
    }
    let cartItemsObj: CartItem[] = JSON.parse(cartItemStr);
    setCartItems(cartItemsObj);
  }, []);

  const addItemToCart = (itemId: string) => {
    let currentCartItemsJson = localStorage.getItem("cartItems");
    if (currentCartItemsJson) {
      const currentCartItemsObj: CartItem[] = JSON.parse(currentCartItemsJson);
      if (currentCartItemsJson.includes(itemId)) return;
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...currentCartItemsObj, itemId])
      );
      return;
    }
    localStorage.setItem("cartItems", JSON.stringify([itemId]));
  };

  return (
    <>
      {products.map((items: Product) => (
        <div
          key={items.title}
          className="flex flex-col products-center p-4 bg-gray-800 rounded-lg shadow-lg"
        >
          <img
            src={items.images[0]}
            alt={items.title}
            className="w-48 h-48 object-cover rounded-lg"
          />
          <h2 className="mt-4 text-xl font-bold text-white">{items.title}</h2>
          <p className="mt-2 text-white">${items.price}</p>
          <button
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={() => addItemToCart(items.id)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  );
}
