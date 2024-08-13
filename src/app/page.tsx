import Header from "@/components/header";
import ProductList from "@/components/product_list";

export default async function Home() {
  const res = await fetch(
    "https://dummyjson.com/products?limit=3&select=title,price,images"
  );
  const jsonResponse = await res.json();
  const products = jsonResponse.products;

  return (
    <>
      <Header />
      <br />
      <center>
        <main className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3 w-full md:w-[80%]">
          <ProductList products={products} />
        </main>
      </center>
    </>
  );
}
