"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  changeItemQuantity,
  selectItems,
  removeItem,
} from "@/app/cart/cartSlice";
import Header from "@/components/header";
import { products } from "@/products";
import Image from "next/image";
import { CartItemActions } from "@/types";

export default function Page() {
  const items = useAppSelector(selectItems);

  const dispatch = useAppDispatch();

  const updateItemQuantity = (data: CartItemActions) => {
    dispatch(
      changeItemQuantity({
        id: data.id,
        action: data.action,
        quantity: data.quantity,
      })
    );
  };
  const removeCartItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const renderCartItems = Object.values(items).map((item) => (
    <div className="flex w-full bg-gray-700 h-44 relative" key={item.id}>
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
          Rs. {products[item.id - 1].price}
        </span>

        <div className="flex">
          <span>Quantity: </span>
          <div className="flex ml-4">
            <span
              className="cursor-pointer"
              onClick={() => {
                updateItemQuantity({
                  id: item.id,
                  action: "decrement",
                  quantity: 1,
                });
              }}
            >
              -
            </span>
            <span className="w-6 h-6 bg-gray-800 text-white rounded-full text-xs ml-2 mr-2 flex justify-center items-center text-center">
              {item.quantity}
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                updateItemQuantity({
                  id: item.id,
                  action: "increment",
                  quantity: 1,
                });
              }}
            >
              +
            </span>
          </div>
        </div>
      </div>

      <div className="right h-full w-[15%] flex justify-center items-center absolute right-0">
        <span
          className="text-red-600 cursor-pointer"
          onClick={() => {
            removeCartItem(item.id);
          }}
        >
          Remove
        </span>
      </div>
    </div>
  ));

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="flex w-[80%] h-auto mx-auto relative">
        <div className=" w-[60%] bg-gray-800 h-auto shadow-2xl rounded-lg p-7">
          <h1 className="text-white text-xl">Cart</h1>
          <br />
          <div className="text-white">{renderCartItems}</div>
        </div>
        <div className=" w-[35%] bg-gray-800 h-96 shadow-xl rounded-lg top-0 absolute right-0 p-8">
          <h1 className="text-white text-xl">Cart Summary</h1>
        </div>
      </div>
    </>
  );
}
