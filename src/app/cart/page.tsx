"use client";
import Header from "@/components/header";
import CartItems from "@/components/cart/cartItems";

export default function Page() {
  return (
    <>
      <Header />
      <br />
      <br />
      <div className="flex w-[80%] h-auto mx-auto relative">
        <div className=" w-[60%] bg-gray-800 h-auto shadow-2xl rounded-lg p-7">
          <h1 className="text-white text-xl">Cart</h1>
          <br />
          <div className="text-white">
            <CartItems />
          </div>
        </div>
        <div className=" w-[35%] bg-gray-800 h-auto shadow-xl rounded-lg top-0 absolute right-0 p-8">
          <h1 className="text-white text-xl">Cart Summary</h1>
        </div>
      </div>
    </>
  );
}
