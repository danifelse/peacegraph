import { getCategoriesData, getProductsData } from "@/services/getData";
import CategorySection from "./CategorySection";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export default async function ProductSection() {
  const products: Product[] = await getProductsData();
  const categories: Category[] = await getCategoriesData();

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
