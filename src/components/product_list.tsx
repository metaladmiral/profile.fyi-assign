"use client";

import { Product } from "@/types";
import Image from "next/image";
import Alert from "./alert";
import { useState } from "react";
import { useCartStorage } from "@/zustand/cartStore";
import { addItemToCartAction } from "@/app/cart/addItemToCartAction";

export default function ProductList({
  products,
}: {
  products: Array<Product>;
}) {
  const [showSuccessAlert, setSuccessAlert] = useState("hidden");
  const [showErrorAlert, setErrorAlert] = useState("hidden");

  const addItemToCart = async (itemId: number) => {
    useCartStorage.getState().addItem(itemId);

    let response;
    if (localStorage.getItem("jwt") !== null) {
      try {
        response = await addItemToCartAction(
          itemId,
          localStorage.getItem("jwt") || "TEST_JWT"
        );
      } catch (err) {
        setErrorAlert("");
        setTimeout(() => {
          setErrorAlert("hidden");
        }, 4000);
      }
    }

    setSuccessAlert("");
    setTimeout(() => {
      setSuccessAlert("hidden");
    }, 4000);
  };
  return (
    <>
      <Alert type="success" display={showSuccessAlert}>
        Product Added to Cart
      </Alert>
      <Alert type="error" display={showErrorAlert}>
        Error in Adding Product to Cart
      </Alert>
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
