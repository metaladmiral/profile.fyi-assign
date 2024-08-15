import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectItems,
  changeItemQuantity,
  removeItem,
} from "@/redux/slices/cartSlice";
import { products } from "@/products";
import Image from "next/image";
import { CartItemActions } from "@/types";

export default function CartItems() {
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
                updateItemQuantity({
                  id: item.id,
                  action: "decrement",
                  quantity: 1,
                });
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

  return <>{renderCartItems}</>;
}
