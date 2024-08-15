"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/app/cart/cartSlice";
import { Product } from "@/types";

export default function ProductList({
  products,
}: {
  products: Array<Product>;
}) {
  const dispatch = useAppDispatch();

  const addItemToCart = (itemId: number) => {
    dispatch(addItem(itemId));
  };
  return (
    <>
      {products.map(
        (items: Product) => (
          (items.id = parseInt(items.id.toString())),
          (
            <div
              key={items.title}
              className="flex flex-col products-center p-4 bg-gray-800 rounded-lg shadow-lg"
            >
              <img
                src={items.images[0]}
                alt={items.title}
                className="w-48 h-48 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-xl font-bold text-white">
                {items.title}
              </h2>
              <p className="mt-2 text-white">${items.price}</p>
              <button
                type="submit"
                className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
                onClick={() => {
                  addItemToCart(parseInt(items.id.toString()));
                }}
              >
                Add to Cart
              </button>
            </div>
          )
        )
      )}
    </>
  );
}
