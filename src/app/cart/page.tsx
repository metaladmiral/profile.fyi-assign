import Header from "@/components/header";
import CartItems from "@/components/cart/cartItems";
import CartSummary from "@/components/cart/cartSummary";

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex w-[95%] h-auto mx-auto relative mt-10 flex-col justify-center items-center lg:justify-between lg:items-baseline lg:w-[90%] lg:flex-row xl:w-[80%] *:flex-grow-0">
        <div className=" w-[98%] bg-base-100 h-auto shadow-2xl rounded-lg p-7 lg:w-[60%]">
          <h1 className="text-white text-2xl font-bold">Cart</h1>
          <div className="text-white mt-5">
            <CartItems />
          </div>
        </div>
        <div className=" w-[98%] bg-base-100 h-auto shadow-xl rounded-lg p-8 mt-10 lg:w-[35%]">
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
