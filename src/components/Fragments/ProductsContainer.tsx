"use client";
import { useGetData } from "@/lib/swr/hooks";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Skeleton from "./Skeleton";
import { useEffect, useState } from "react";
import CardProduct from "../Cards/CardProduct";

export default function ProductsContainer() {
  const productsData = useGetData("api/products");
  const categoriesData = useGetData("api/categories");
  const products: Product[] = productsData?.data?.data;
  const categories: Category[] = categoriesData?.data?.data;
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  useEffect(() => {
    setSelectedCategories(categories.map((category) => category.slug));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, event.target.name]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== event.target.name)
      );
    }
  };

  console.log(selectedCategories);

  if (!products || !categories) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }
  return (
    <div className="lg:-mt-28 md:-mt-40 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 relative ">
      <div className="bg-white  rounded-lg grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 ">
        <div className="lg:p-10 md:p-6 p-2 md:sticky md:top-32 md:max-w-sm w-full max-h-96 bg-white shadow-xl rounded-lg ">
          <h1 className="text-3xl text-gray-700">Category</h1>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 ">
            {categories.map((category) => (
              <div
                key={category.slug}
                className=" flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 relative"
              >
                <div className="flex items-center ">
                  <input
                    type="checkbox"
                    id={category.slug}
                    name={category.slug}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    value={category.slug}
                    defaultChecked
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={category.slug}
                    className="w-full py-4 ms-2 md:text-sm text-xs font-medium text-gray-900 dark:text-gray-300 pe-10"
                  >
                    {category.name}
                    <span className="md:absolute md:right-5 px-2 py-0.5 text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded">
                      {
                        products.filter(
                          (product) => product.category === category.slug
                        ).length
                      }
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 lg:pe-10">
          <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 ">
            {filteredProducts.map((product) => (
              <CardProduct key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
