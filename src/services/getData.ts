import instance from "@/lib/axios/instance"

const getData = {
   banner: () => instance.get("/api/banner"),
   products: () => instance.get("/api/products"),
   categories: () => instance.get("api/categories"),
}

export async function getBannerData() {
   const banner = await getData.banner();
   return banner.data.data;
 }

 export async function getProductsData() {
   const products = await getData.products();
   return products.data.data;
 }

 export async function getCategoriesData() {
   const categories = await getData.categories();
   return categories.data.data;
 }

export default getData