"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/slices/cartSlice";
import { Product } from "@/types";
import Image from "next/image";

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
              className="flex flex-col products-center p-4 bg-base-100 rounded-lg shadow-lg justify-center items-center"
            >
              <Image
                src={items.images[0]}
                alt={items.title}
                width={200}
                height={200}
                className="w-48 h-48 object-contain rounded-lg"
              />
              <h2 className="mt-4 text-xl font-bold text-white">
                {items.title}
              </h2>
              <p className="mt-2 text-white">${items.price}</p>
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full text-white"
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
