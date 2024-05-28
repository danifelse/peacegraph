"use client";
import CategorySection from "./CategorySection";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { useGetData } from "@/lib/swr/hooks";
import Skeleton from "./Skeleton";

export default function ProductSection() {
  const productsData = useGetData("api/products");
  const categoriesData = useGetData("api/categories");

  const products: Product[] = productsData?.data?.data;
  const categories: Category[] = categoriesData?.data?.data;

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
      {categories.map((category, index) => (
        <CategorySection
          key={category.slug}
          products={products}
          category={category}
          index={index}
        />
      ))}
    </div>
  );
}
