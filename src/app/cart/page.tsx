"use client";
import Header from "@/components/header";
import CartItems from "@/components/cart/cartItems";
import CartSummary from "@/components/cart/cartSummary";

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex w-[80%] h-auto mx-auto relative mt-10">
        <div className=" w-[60%] bg-base-100 h-auto shadow-2xl rounded-lg p-7">
          <h1 className="text-white text-2xl font-bold">Cart</h1>
          <div className="text-white mt-5">
            <CartItems />
          </div>
        </div>
        <div className=" w-[35%] bg-base-100 h-auto shadow-xl rounded-lg top-0 absolute right-0 p-8">
          <h1 className="text-white text-2xl font-bold">Cart Summary</h1>
          <div className="text-white mt-5">
            <CartSummary />
            <button className="btn btn-primary w-full text-white mt-5">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
