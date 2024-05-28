"use client";
import { Product } from "@/models/Product";
import ProductCarousel from "./ProductCarousel";
import { Category } from "@/models/Category";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { AOSInit } from "@/lib/aos/aos";
export default function CategorySection({
  products,
  category,
  index,
}: {
  products: Product[];
  category: Category;
  index: number;
}) {
  AOSInit();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 my-10">
      <div className="flex ">
        <div
          className={`md:w-[40%] w-[30%]  lg:px-4 rounded-xl  relative z-0 ${
            index % 2 === 1 ? "order-1" : "order-0"
          }`}
        >
          <div className="rounded-xl overflow-hidden h-full  ">
            <img
              src={category.imageUrl}
              alt=""
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div
            className={`absolute top-3  bg-pink-400 bg-opacity-50 backdrop-blur-sm md:px-3 md:py-2 p-1 z-10 flex items-center gap-2 hover:scale-125 transition duration-300 cursor-pointer ${
              index % 2 ? "left-0" : "right-0  "
            }`}
          >
            {(index + 1) % 2 ? null : (
              <FaArrowLeftLong className="text-white" />
            )}
            <p className=" text-white  md:text-xl text-base font-extrabold font-mono">
              {category.name}
            </p>
            {(index + 1) % 2 ? (
              <FaArrowRightLong className="text-white" />
            ) : null}
          </div>
        </div>
        <div
          className="md:w-[60%] w-[70%] relative z-10"
          data-aos={`${index % 2 === 0 ? "fade-left" : "fade-right"}`}
          data-aos-delay="500"
        >
          <ProductCarousel
            products={products.filter(
              (product) => product.category === category.slug
            )}
            index={index}
          />
        </div>
      </div>
    </div>
  );
}
