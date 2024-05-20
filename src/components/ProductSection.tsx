import { getProductsData } from "@/services/getData";
import { Product } from "@/models/Product";
import CardProduct from "./CardProduct";

export default async function ProductSection() {
  const products = await getProductsData();
  return (
    <div className="container px-4 mb-10">
      <div className="flex flex-wrap">
        <div className="w-1/3 lg:px-4 rounded-xl  relative">
          <div className="rounded-xl overflow-hidden ">
            <img
              src="https://images.unsplash.com/photo-1617695744007-68ef55752789?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <p className="absolute top-3 -right-10 text-xl font-extrabold font-mono inline-block bg-pink-400 px-3 py-2  ">
            Our Product
          </p>
        </div>
        <div className="w-2/3">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product: Product) => (
              <CardProduct key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
