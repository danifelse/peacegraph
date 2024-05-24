import instance from "@/lib/axios/instance"

const getData = {
   images: () => instance.get("/api/images"),
   products: () => instance.get("/api/products"),
   categories: () => instance.get("api/categories"),
}

export async function getImages() {
   const images = await getData.images();
   return images.data.data;
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