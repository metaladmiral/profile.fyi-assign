"use client";
import { products } from "@/products";
import Image from "next/image";
import { CartItemActions } from "@/types";
import Alert from "@/components/alert";
import { useState } from "react";
import { useCartStorage } from "@/zustand/cartStore";

export default function CartItems() {
  const [alertState, setAlertState] = useState("hidden");

  const updateItemQuantity = (itemDetails: CartItemActions) => {
    useCartStorage.getState().updateItemQuantity(itemDetails);
  };

  const removeCartItem = (itemId: number) => {
    useCartStorage.getState().removeItem(itemId);
    // setAlertState("show");
    // setTimeout(() => {
    //   setAlertState("hidden");
    // }, 4000);
  };

  const items = useCartStorage((state) => state.cartItems);

  const renderCartItems = Object.values(items).map((item) => (
    <div
      className="flex w-full bg-base-200 h-44 relative mt-1 mb-1"
      key={item.id}
    >
      <div className="left h-full w-[20%] flex justify-center items-center">
        <Image
          src={`` + products[item.id - 1].images[0]}
          alt=""
          width={100}
          height={100}
        />
      </div>

      <div className="center h-full w-[65%] flex justify-center items-start flex-col">
        <h2 className="text-md">{products[item.id - 1].title}</h2>
        <span className="text-sm text-gray-400">
          ${products[item.id - 1].price}
        </span>

        <div className="flex">
          <span>Quantity: </span>
          <div className="flex ml-4">
            <span
              className="cursor-pointer"
              onClick={() => {
                updateItemQuantity({ id: item.id, action: "decrement" });
              }}
            >
              -
            </span>
            <span className="w-6 h-6 bg-primary text-white rounded-full text-xs ml-2 mr-2 flex justify-center items-center text-center">
              {item.quantity}
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                updateItemQuantity({ id: item.id, action: "decrement" });
              }}
            >
              +
            </span>
          </div>
        </div>
      </div>

      <div className="right h-full w-[15%] flex justify-center items-center absolute right-0">
        <button
          className="btn btn-square bg-red-500 text-white border-red-500"
          onClick={() => {
            removeCartItem(item.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <Alert type="error" display={alertState}>
        Successfully Removed Item from the Cart!
      </Alert>
      {renderCartItems}
    </>
  );
}
