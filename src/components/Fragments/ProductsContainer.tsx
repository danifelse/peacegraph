"use client";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Skeleton from "./Skeleton";
import { useEffect, useState } from "react";
import CardProduct from "../Cards/CardProduct";
import SkeletonCard from "./SkeletonCard";
import { getData } from "@/services/getDataClient";
import SkeletonList from "./SkeletonList";

export default function ProductsContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getData("/api/categories").then((res) => setCategories(res.data.data));
    }, 100);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      getData("/api/products").then((res) => setProducts(res.data.data));
    }, 300);
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filtered = products.filter((product) => {
        if (selectedCategories.includes(product.category)) {
          return true;
        }
        return false;
      });
      if (filtered) {
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedCategories]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, event.target.name]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== event.target.name)
      );
    }
  };

  return (
    <div className="lg:-mt-28 md:-mt-40 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 relative ">
      <div className="bg-white  rounded-lg grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 ">
        <div className="   rounded-lg ">
          <div className="lg:p-10 md:p-6 p-2 md:sticky md:top-20 md:max-w-sm w-full bg-whgite shadow-xl rounded-lg">
            <h1 className="text-3xl text-gray-700">Category</h1>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 ">
              {categories.length === 0 && <SkeletonList />}
              {categories &&
                categories.map((category) => (
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
                        // defaultChecked
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
        </div>
        <div className="col-span-3 lg:pe-10">
          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="flex justify-center items-center gap-2 pt-10">
              <p className="text-gray-700 text-xl font-light  ">
                Maaf, Product yang kamu cari belum tesedia
              </p>
              <span className="text-3xl">😔</span>
            </div>
          )}
          {filteredProducts.length === 0 && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-4 gap-2 lg:ps-8 py-4 lg:py-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
          <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 ">
            {filteredProducts &&
              filteredProducts.map((product) => (
                <CardProduct key={product.slug} {...product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
