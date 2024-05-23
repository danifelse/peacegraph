import { getProductsData } from "@/services/getData";
import ProductCarousel from "./ProductCarousel";

export default async function ProductSection() {
  const products = await getProductsData();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
      <div className="flex ">
        <div className="md:w-[40%] w-[30%]  lg:px-4 rounded-xl  relative">
          <div className="rounded-xl overflow-hidden h-full  ">
            <img
              src="https://images.unsplash.com/photo-1617695744007-68ef55752789?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <p className="absolute top-3 -right-10 md:text-xl text-base font-extrabold font-mono inline-block bg-pink-400 md:px-3 md:py-2 p-1 z-10 ">
            Our Product
          </p>
        </div>
        <div className="md:w-[60%] w-[70%] ">
          <ProductCarousel products={products} />
        </div>
      </div>
    </div>
  );
}
